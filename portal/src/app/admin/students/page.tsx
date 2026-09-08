"use client";

import React, { useState, useEffect } from "react";
import { Role } from "@prisma/client";
import { getUsers, provisionUser, deleteUserAction } from "@/app/actions/user";

export default function AdminUsersDirectoryPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRole, setSelectedRole] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for User Provisioning
  const [role, setRole] = useState<Role>("STUDENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [designation, setDesignation] = useState("Assistant Professor");
  const [rollNo, setRollNo] = useState("");
  const [section, setSection] = useState("CSE-A");
  const [semester, setSemester] = useState(6);
  const [mentor, setMentor] = useState("Prof. Sample Teacher");
  const [cabin, setCabin] = useState("Staff Room 304");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await getUsers();
    if (res.success && res.data) {
      // Map Prisma data to match existing UI properties
      const mappedUsers = res.data.map((u: any) => ({
        ...u,
        rollNo: u.profile?.rollNumber,
        regNo: u.profile?.registerNumber,
        section: u.profile?.section,
        batch: u.profile?.batch,
        mentor: u.profile?.mentorName || u.profile?.mentorEmail,
        designation: u.profile?.designation,
        staffId: u.profile?.staffId,
        cabin: u.profile?.mentorCabin,
        status: "Active", // simplified status
      }));
      setUsers(mappedUsers);
    }
    setLoading(false);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const userEmail =
      email.trim() ||
      (role === "STUDENT"
        ? `${(rollNo || "22104199").trim().toLowerCase()}@veltech.edu.in`
        : `${name.toLowerCase().replace(/\s+/g, ".")}@veltech.edu.in`);

    const res = await provisionUser({
      name: name.trim(),
      email: userEmail,
      role,
      department: department.trim(),
      designation: role === "TEACHER" || role === "HOD" || role === "ADMIN" ? designation : undefined,
      rollNo: role === "STUDENT" ? (rollNo.trim() || "22104199") : undefined,
      section: role === "STUDENT" ? section : undefined,
      semester: role === "STUDENT" ? Number(semester) : undefined,
      mentor: role === "STUDENT" ? mentor : undefined,
      cabin: role === "TEACHER" || role === "HOD" ? cabin : undefined,
      staffId: role === "TEACHER" || role === "HOD" ? `VMT-${department.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}` : undefined,
    });

    if (res.success) {
      setShowAddModal(false);
      setName("");
      setEmail("");
      setRollNo("");
      fetchUsers();
    } else {
      alert("Failed to provision user: " + res.error);
    }
  };

  const handleDeleteUser = async (id: string, userName: string) => {
    if (confirm(`Are you sure you want to remove user "${userName}"?`)) {
      const res = await deleteUserAction(id);
      if (res.success) {
        fetchUsers();
      } else {
        alert("Failed to delete user: " + res.error);
      }
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = selectedRole === "ALL" || u.role === selectedRole;
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.rollNo && u.rollNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.regNo && u.regNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.section && u.section.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.batch && u.batch.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.mentor && u.mentor.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.mentorName && u.mentorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.designation && u.designation.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesRole && matchesSearch;
  });

  const studentCount = users.filter((u) => u.role === "STUDENT").length;
  const facultyCount = users.filter((u) => u.role === "TEACHER").length;
  const hodCount = users.filter((u) => u.role === "HOD").length;
  const adminCount = users.filter((u) => u.role === "ADMIN").length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Institutional User Directory & Provisioning
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Master database of all administrators, heads of departments, faculty members, and enrolled students.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
        >
          <span>+ Provision New User</span>
        </button>
      </div>

      {/* 2. Stat Counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Students</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">{studentCount}</p>
        </div>
        <div className="rounded-xl border border-[#026466]/30 dark:border-teal-800 bg-[#E6F1F1] dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#026466] dark:text-teal-400">Faculty</span>
          <p className="text-2xl font-bold text-[#026466] dark:text-teal-400 font-mono mt-0.5">{facultyCount}</p>
        </div>
        <div className="rounded-xl border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-slate-900 dark:text-amber-300">Department Heads</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-amber-300 font-mono mt-0.5">{hodCount}</p>
        </div>
        <div className="rounded-xl border border-[#AF0606]/30 dark:border-rose-900/50 bg-[#FDE8E8] dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#AF0606] dark:text-rose-400">Super Admins</span>
          <p className="text-2xl font-bold text-[#AF0606] dark:text-rose-400 font-mono mt-0.5">{adminCount}</p>
        </div>
      </div>

      {/* 3. Filter Toolbar & Search */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name, email, roll number, or mentor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-[#026466] focus:outline-none"
          />
        </div>

        {/* Role Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "ALL", label: "All Roles" },
            { id: "ADMIN", label: "Admins" },
            { id: "HOD", label: "HODs" },
            { id: "TEACHER", label: "Faculty" },
            { id: "STUDENT", label: "Students" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRole(tab.id)}
              className={`rounded-lg border px-3 py-1 text-xs font-semibold transition ${
                selectedRole === tab.id
                  ? "border-[#026466] dark:border-teal-400 bg-[#E6F1F1] dark:bg-teal-950/40 text-[#026466] dark:text-teal-400 font-bold"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Users Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">User & Email</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Identifier / Section</th>
                <th className="py-3 px-3">Mentor / Cabin</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => {
                const isRoot = ["admin@veltech.edu.in", "hod@veltech.edu.in"].includes(u.email);

                return (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                          u.role === "ADMIN"
                            ? "bg-[#AF0606] text-white"
                            : u.role === "HOD"
                            ? "bg-[#026466] text-white"
                            : u.role === "TEACHER"
                            ? "bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-400 border border-[#026466]/30"
                            : "bg-[#FFF6EE] dark:bg-amber-950 text-slate-900 dark:text-amber-200 border border-[#FECDA5]"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white">{u.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{u.email}</div>
                    </td>

                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                      <div>{u.department}</div>
                      {u.designation && <div className="text-[10px] text-slate-500">{u.designation}</div>}
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-800 dark:text-slate-200">
                      {u.role === "STUDENT" ? (
                        <div>
                          <span className="font-bold">{u.rollNo}</span>
                          <span className="ml-1 text-[10px] text-slate-500">({u.section})</span>
                        </div>
                      ) : (
                        <span>{u.staffId || "Faculty"}</span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                      {u.role === "STUDENT" ? (
                        <div className="text-[11px] font-medium text-[#026466] dark:text-teal-400">
                          {u.mentor || "Not Assigned"}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500">{u.cabin || "Tech Park"}</div>
                      )}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="rounded bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466] dark:text-teal-400">
                        {u.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      {isRoot ? (
                        <span className="text-[10px] text-slate-400 italic">Protected</span>
                      ) : (
                        <button
                          onClick={() => {
                            handleDeleteUser(u.id, u.name);
                          }}
                          className="rounded p-1 text-slate-400 hover:text-[#AF0606] hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                          title="Delete User"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. User Provisioning Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Provision Institutional User Account
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3.5 text-xs">
              {/* Role Picker */}
              <div>
                <label className="block font-semibold text-slate-900 dark:text-white mb-1">
                  Account Persona Role
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["STUDENT", "TEACHER", "HOD", "ADMIN"] as Role[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`p-2 rounded-lg border text-xs font-bold transition ${
                        role === r
                          ? "border-[#026466] dark:border-teal-400 bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-400"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-900 dark:text-white mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-900 dark:text-white mb-1">Institutional Email</label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh@veltech.edu.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block font-semibold text-slate-900 dark:text-white mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Electronics & Communication Engineering">Electronics & Communication (ECE)</option>
                  <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science (AIDS)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering (MECH)</option>
                </select>
              </div>

              {/* Role-Specific Fields: Student */}
              {role === "STUDENT" && (
                <div className="space-y-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[11px] font-bold text-[#026466] dark:text-teal-400 font-mono">Student Specifics</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">Roll / Reg No</label>
                      <input
                        type="text"
                        placeholder="22104199"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">Section</label>
                      <input
                        type="text"
                        placeholder="CSE-A"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">Semester</label>
                      <input
                        type="number"
                        min={1}
                        max={8}
                        value={semester}
                        onChange={(e) => setSemester(Number(e.target.value))}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">Mentor Faculty</label>
                    <input
                      type="text"
                      placeholder="e.g. Prof. Sample Teacher"
                      value={mentor}
                      onChange={(e) => setMentor(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Role-Specific Fields: Faculty / HOD */}
              {(role === "TEACHER" || role === "HOD" || role === "ADMIN") && (
                <div className="space-y-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[11px] font-bold text-[#026466] dark:text-teal-400 font-mono">Staff Specifics</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">Designation</label>
                      <input
                        type="text"
                        placeholder="Associate Professor"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">Cabin Location</label>
                      <input
                        type="text"
                        placeholder="Room 304, Tech Park"
                        value={cabin}
                        onChange={(e) => setCabin(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-5 py-2 font-bold text-white shadow-xs"
                >
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
