"use client";

import React, { useState } from "react";
import { initialAdminFaculty, AdminFacultyRecord } from "@/lib/adminMockData";
import { Branch } from "@/lib/studentMockData";

export default function AdminFacultyPage() {
  const [facultyList, setFacultyList] = useState<AdminFacultyRecord[]>(initialAdminFaculty);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string>("ALL");

  // Add Faculty Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState<Branch>("CSE");
  const [designation, setDesignation] = useState("Associate Professor");
  const [cabin, setCabin] = useState("CS-204");
  const [phone, setPhone] = useState("+91 94440 00000");
  const [subject, setSubject] = useState("");

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId.trim() || !name.trim()) return;

    const newFaculty: AdminFacultyRecord = {
      id: `FAC-${Date.now()}`,
      staffId: staffId.trim(),
      name: name.trim(),
      email: `${name.toLowerCase().replace(/[^a-z]/g, "")}@veltech.edu.in`,
      phone: phone.trim(),
      branch,
      designation,
      cabin: cabin.trim(),
      assignedSubjects: subject.trim() ? [subject.trim()] : ["21CS601 Cloud Computing"],
      weeklyHours: 16,
      status: "Active",
    };

    setFacultyList([newFaculty, ...facultyList]);
    setShowAddModal(false);
    setStaffId("");
    setName("");
    setSubject("");
  };

  const filteredFaculty = facultyList.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.assignedSubjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBranch =
      selectedBranch === "ALL" || f.branch === selectedBranch;

    return matchesSearch && matchesBranch;
  });

  const totalTeachingHours = facultyList.reduce((acc, curr) => acc + curr.weeklyHours, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
            Faculty Directory & Deployment
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Teaching staff allocation, designations, cabin offices, and course workload distribution.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
        >
          <span>+ Register New Faculty</span>
        </button>
      </div>

      {/* 2. Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600">Registered Faculty Staff</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">{facultyList.length}</p>
          <span className="text-[10px] text-slate-400">Across 5 Departments</span>
        </div>

        <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#026466]">Total Teaching Hours / Week</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">{totalTeachingHours} hrs</p>
          <span className="text-[10px] text-[#026466]">
            Avg {(totalTeachingHours / facultyList.length).toFixed(1)} hrs / faculty
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600">Active Faculty Strength</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">100%</p>
          <span className="text-[10px] text-[#026466] font-semibold">0 on Extended Leave</span>
        </div>
      </div>

      {/* 3. Search and Department Filter */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by faculty name, staff ID, or handled subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Branch Filter Tabs */}
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

      {/* 4. Faculty Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Staff ID</th>
                <th className="py-3 px-3">Faculty Name</th>
                <th className="py-3 px-3 text-center">Department</th>
                <th className="py-3 px-3">Designation</th>
                <th className="py-3 px-3">Cabin Room</th>
                <th className="py-3 px-3">Assigned Courses</th>
                <th className="py-3 px-3 text-center">Workload (hrs/wk)</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFaculty.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-mono text-[#026466] font-bold">
                    {f.staffId}
                  </td>
                  <td className="py-3 px-3 font-semibold text-black">
                    <div>{f.name}</div>
                    <div className="text-[10px] text-slate-500 font-normal font-mono">
                      {f.email} • {f.phone}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466]">
                      {f.branch}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {f.designation}
                  </td>
                  <td className="py-3 px-3 text-black font-medium font-mono">
                    {f.cabin}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    <div className="flex flex-wrap gap-1">
                      {f.assignedSubjects.map((sub, i) => (
                        <span
                          key={i}
                          className="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[10px] font-mono text-black"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-black">
                    {f.weeklyHours} hrs
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466]">
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-black">Register Faculty Staff</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFaculty} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">
                    Staff ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VT-CSE-099"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-black mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. / Prof. Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">
                    Department
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as Branch)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="AIDS">AIDS</option>
                    <option value="MECH">MECH</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-black mb-1">
                    Designation
                  </label>
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  >
                    <option value="Professor & Dean">Professor & Dean</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">
                    Cabin Room
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
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">
                  Assigned Subject / Course Module
                </label>
                <input
                  type="text"
                  placeholder="e.g. 21CS601 Cloud Computing"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                />
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
                  Save Faculty Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
