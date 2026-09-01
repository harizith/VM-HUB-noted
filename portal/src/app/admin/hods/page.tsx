"use client";

import React, { useState } from "react";
import { initialAdminHODs, AdminHODRecord } from "@/lib/adminMockData";
import { branches, Branch } from "@/lib/studentMockData";

export default function AdminHODsPage() {
  const [hods, setHods] = useState<AdminHODRecord[]>(initialAdminHODs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string>("ALL");

  // Modal State for Adding/Editing HOD
  const [showAddModal, setShowAddModal] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState<Branch>("CSE");
  const [qualification, setQualification] = useState("");
  const [experienceYears, setExperienceYears] = useState(15);
  const [cabin, setCabin] = useState("");
  const [phone, setPhone] = useState("");
  const [researchPublications, setResearchPublications] = useState(10);
  const [successToast, setSuccessToast] = useState(false);

  const handleBranchChange = (newBranch: Branch) => {
    setBranch(newBranch);
    setCabin(`${newBranch}-Block HOD Suite (${branches[newBranch].classroom})`);
  };

  const handleAddHOD = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId.trim() || !name.trim()) return;

    const newRecord: AdminHODRecord = {
      id: `HOD-REC-${Date.now()}`,
      staffId: staffId.trim(),
      name: name.trim(),
      department: branches[branch].fullName,
      branch: branch,
      qualification: qualification.trim() || "Ph.D., M.Tech.",
      experienceYears: Number(experienceYears),
      cabin: cabin.trim() || `${branch}-HOD Suite`,
      email: `${branch.toLowerCase()}.hod@veltech.edu.in`,
      phone: phone.trim() || "+91 94440 00000",
      dateAppointed: new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      facultyCount: branch === "CSE" ? 42 : 30,
      studentCount: branch === "CSE" ? 960 : 720,
      researchPublications: Number(researchPublications),
      status: "Active",
    };

    setHods([newRecord, ...hods]);
    setShowAddModal(false);
    setStaffId("");
    setName("");
    setQualification("");
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  const filteredHods = hods.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.qualification.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch =
      selectedBranch === "ALL" || h.branch === selectedBranch;

    return matchesSearch && matchesBranch;
  });

  const avgExp = (
    hods.reduce((acc, curr) => acc + curr.experienceYears, 0) / hods.length
  ).toFixed(1);

  const totalPubs = hods.reduce(
    (acc, curr) => acc + curr.researchPublications,
    0
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
              Head of Department (HOD) Records
            </h1>
            <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-0.5 text-xs font-bold text-[#026466]">
              Academic Leadership
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Executive profiles, department leadership tenures, qualifications, and direct contacts for all 5 engineering branches.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
        >
          <span>+ Appoint / Update HOD</span>
        </button>
      </div>

      {/* Success Banner */}
      {successToast && (
        <div className="rounded-lg border border-[#026466]/30 bg-[#E6F1F1] p-3 text-xs font-bold text-[#026466] flex items-center justify-between">
          <span>HOD record successfully created and linked to institutional registry.</span>
          <button onClick={() => setSuccessToast(false)} className="text-[#026466] hover:text-black">✕</button>
        </div>
      )}

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600">Appointed HODs</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">{hods.length}</p>
          <span className="text-[10px] text-slate-400">Across 5 Departments</span>
        </div>

        <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#026466]">Avg Leadership Experience</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">{avgExp} yrs</p>
          <span className="text-[10px] text-[#026466]">Senior Professorship</span>
        </div>

        <div className="rounded-xl border border-[#FECDA5] bg-[#FFF6EE] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-black">Research Publications</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">{totalPubs}</p>
          <span className="text-[10px] text-slate-600">Scopus / SCI Indexed</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600">Total Faculty Managed</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">148</p>
          <span className="text-[10px] text-slate-400">Full-Time Faculty</span>
        </div>
      </div>

      {/* 3. Search and Department Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by HOD name, staff ID, qualifications, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["ALL", "CSE", "IT", "ECE", "AIDS", "MECH"].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`rounded-lg border px-3 py-1 text-xs font-semibold font-mono transition ${
                selectedBranch === b
                  ? "border-[#026466] bg-[#E6F1F1] text-[#026466] font-bold"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* 4. HOD Executive Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHods.map((hod) => (
          <div
            key={hod.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between hover:border-[#026466]/40 transition"
          >
            <div>
              {/* Top Row: Branch & Staff ID */}
              <div className="flex items-center justify-between">
                <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466] font-mono">
                  {hod.branch}
                </span>
                <span className="font-mono text-xs text-slate-600 font-bold">
                  {hod.staffId}
                </span>
              </div>

              {/* HOD Name & Title */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#026466] text-white font-bold text-sm">
                  {hod.name.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-black">
                    {hod.name}
                  </h3>
                  <p className="text-[11px] text-[#AF0606] font-semibold">
                    Head of Department
                  </p>
                </div>
              </div>

              {/* Department & Qualification */}
              <div className="mt-2.5 space-y-0.5 text-xs">
                <p className="text-black font-semibold">{hod.department}</p>
                <p className="text-[11px] text-slate-600 font-mono">{hod.qualification}</p>
              </div>

              {/* Cabin & Contact */}
              <div className="mt-3 space-y-1 rounded-lg border border-[#FECDA5]/50 bg-[#FFF6EE]/40 p-2.5 text-[11px]">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-600">Cabin:</span>
                  <strong className="text-black font-mono">{hod.cabin}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-600">Email:</span>
                  <strong className="text-black font-mono text-[10px]">{hod.email}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-600">Phone:</span>
                  <strong className="text-black font-mono">{hod.phone}</strong>
                </div>
              </div>
            </div>

            {/* Bottom Row Stats */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-500">Experience</span>
                <p className="font-mono font-bold text-black mt-0.5">{hod.experienceYears} yrs</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500">Faculty</span>
                <p className="font-mono font-bold text-[#026466] mt-0.5">{hod.facultyCount}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500">Papers</span>
                <p className="font-mono font-bold text-[#AF0606] mt-0.5">{hod.researchPublications}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Detailed Leadership Table View */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-black">
            Academic Leadership Directory Summary
          </h3>
          <span className="text-xs text-[#026466] font-bold">5 Appointed Heads</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Staff ID</th>
                <th className="py-3 px-3">HOD Full Name</th>
                <th className="py-3 px-3 text-center">Department</th>
                <th className="py-3 px-3">Qualifications</th>
                <th className="py-3 px-3">Cabin Suite</th>
                <th className="py-3 px-3 text-center">Experience</th>
                <th className="py-3 px-3 text-center">Faculty</th>
                <th className="py-3 px-3 text-center">Students</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHods.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-mono text-[#026466] font-bold">
                    {h.staffId}
                  </td>
                  <td className="py-3 px-3 font-semibold text-black">
                    <div>{h.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono font-normal">
                      {h.email} • {h.phone}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466]">
                      {h.branch}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-mono text-[11px]">
                    {h.qualification}
                  </td>
                  <td className="py-3 px-3 text-black font-medium font-mono">
                    {h.cabin}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-black">
                    {h.experienceYears} yrs
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-[#026466] font-bold">
                    {h.facultyCount}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-800 font-semibold">
                    {h.studentCount}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466]">
                      {h.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Add / Appoint HOD Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-black">Appoint / Update Head of Department</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddHOD} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">
                    Staff ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VT-HOD-106"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-black mb-1">
                    Department / Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => handleBranchChange(e.target.value as Branch)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none font-bold"
                  >
                    <option value="CSE">CSE (Computer Science)</option>
                    <option value="IT">IT (Information Tech)</option>
                    <option value="ECE">ECE (Electronics & Comm)</option>
                    <option value="AIDS">AIDS (AI & Data Science)</option>
                    <option value="MECH">MECH (Mechanical)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">
                  HOD Full Name (with Title)
                </label>
                <input
                  type="text"
                  placeholder="Dr. Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">
                  Academic Qualifications
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ph.D. (IIT Madras), M.E., B.E."
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-black mb-1">
                    Research Papers
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={researchPublications}
                    onChange={(e) => setResearchPublications(Number(e.target.value))}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">
                    Cabin Office
                  </label>
                  <input
                    type="text"
                    value={cabin}
                    onChange={(e) => setCabin(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-black mb-1">
                    Direct Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-black hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 font-bold text-white shadow-xs"
                >
                  Save HOD Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
