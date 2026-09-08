const NEON_API_KEY = "napi_la3z7sr3wcqrfcp8z4ph7e1hhfw9spsd3cdclgrcdp581fl4r5t1x7it6f24ohj7";

async function neonFetch(endpoint, options = {}) {
  const url = `https://console.neon.tech/api/v2${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${NEON_API_KEY}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Neon API Error (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

async function main() {
  console.log("=== Fetching Existing Neon Projects ===");
  const { projects } = await neonFetch("/projects");
  console.log(`Found ${projects.length} existing project(s):`);
  for (const p of projects) {
    console.log(`- Project ID: ${p.id}, Name: ${p.name}, Region: ${p.region_id}`);
  }

  let project = projects.find(p => p.name === "vm-hub-enterprise" || p.name === "VM-HUB");

  if (!project) {
    if (projects.length > 0) {
      console.log(`Using existing project: ${projects[0].name} (${projects[0].id})`);
      project = projects[0];
    } else {
      console.log("Creating new project: vm-hub-enterprise...");
      const newProjRes = await neonFetch("/projects", {
        method: "POST",
        body: JSON.stringify({
          project: {
            name: "vm-hub-enterprise",
            region_id: "aws-ap-southeast-1", // Singapore / Asia region
            pg_version: 16,
          },
        }),
      });
      project = newProjRes.project;
      console.log(`Created project: ${project.name} (${project.id})`);
    }
  }

  console.log(`\n=== Listing Branches for Project ${project.id} ===`);
  const { branches } = await neonFetch(`/projects/${project.id}/branches`);
  console.log(`Found ${branches.length} branch(es):`);
  for (const b of branches) {
    console.log(`- Branch ID: ${b.id}, Name: ${b.name}, Primary: ${b.primary}`);
  }

  const mainBranch = branches.find(b => b.primary) || branches[0];

  // Check or create timetable-branch
  let timetableBranch = branches.find(b => b.name === "timetable-branch");
  if (!timetableBranch) {
    console.log("\nCreating dedicated branch: 'timetable-branch'...");
    try {
      const branchRes = await neonFetch(`/projects/${project.id}/branches`, {
        method: "POST",
        body: JSON.stringify({
          branch: {
            name: "timetable-branch",
            parent_id: mainBranch.id,
          },
        }),
      });
      timetableBranch = branchRes.branch;
      console.log(`Created 'timetable-branch' (${timetableBranch.id})`);
    } catch (err) {
      console.log("Could not create branch (might be on free tier limit or already existing):", err.message);
    }
  }

  console.log("\n=== Fetching / Creating Endpoints ===");
  const { endpoints } = await neonFetch(`/projects/${project.id}/endpoints`);
  console.log(`Found ${endpoints.length} endpoint(s):`);
  for (const ep of endpoints) {
    console.log(`- Endpoint ID: ${ep.id}, Branch: ${ep.branch_id}, Host: ${ep.host}`);
  }

  let timetableEndpoint = endpoints.find(ep => ep.branch_id === timetableBranch?.id);
  if (!timetableEndpoint && timetableBranch && timetableBranch.id !== mainBranch.id) {
    console.log("Creating compute endpoint for 'timetable-branch'...");
    try {
      const epRes = await neonFetch(`/projects/${project.id}/endpoints`, {
        method: "POST",
        body: JSON.stringify({
          endpoint: {
            branch_id: timetableBranch.id,
            type: "read_write",
          },
        }),
      });
      timetableEndpoint = epRes.endpoint;
      console.log(`Created endpoint for timetable branch: ${timetableEndpoint.id}`);
    } catch (e) {
      console.log("Endpoint creation error:", e.message);
    }
  }

  console.log("\n=== Fetching Connection URIs ===");
  // Get connection uri for main branch
  const mainUriRes = await neonFetch(`/projects/${project.id}/connection_uri?branch_id=${mainBranch.id}&database_name=neondb&role_name=neondb_owner&pooled=true`);
  console.log("\nMain Database URL (Pooled):");
  console.log(mainUriRes.uri);

  const directMainUriRes = await neonFetch(`/projects/${project.id}/connection_uri?branch_id=${mainBranch.id}&database_name=neondb&role_name=neondb_owner&pooled=false`);
  console.log("\nDirect Main Database URL:");
  console.log(directMainUriRes.uri);

  let timetableUri = mainUriRes.uri;
  if (timetableBranch) {
    try {
      const tbUriRes = await neonFetch(`/projects/${project.id}/connection_uri?branch_id=${timetableBranch.id}&database_name=neondb&role_name=neondb_owner&pooled=true`);
      timetableUri = tbUriRes.uri;
      console.log("\nTimetable Branch Database URL (Pooled):");
      console.log(timetableUri);
    } catch (e) {
      console.log("Error getting timetable branch URI:", e.message);
    }
  }

  console.log("\n=== SUCCESS ===");
  console.log(JSON.stringify({
    projectId: project.id,
    projectName: project.name,
    mainDatabaseUrl: mainUriRes.uri,
    directDatabaseUrl: directMainUriRes.uri,
    timetableDatabaseUrl: timetableUri,
    mainBranch: mainBranch.name,
    timetableBranch: timetableBranch ? timetableBranch.name : mainBranch.name,
  }, null, 2));
}

main().catch(err => {
  console.error("Setup script failed:", err);
  process.exit(1);
});
