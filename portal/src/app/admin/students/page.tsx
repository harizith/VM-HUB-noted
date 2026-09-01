"use client";

import React, { useState } from "react";
import { initialAdminStudents, AdminStudentRecord } from "@/lib/adminMockData";
import { Branch } from "@/lib/studentMockData";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<AdminStudentRecord[]>(initialAdminStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string>("ALL");

  // Modal State for Registering Student
  const [showAddModal, setShowAddModal] = useState(false);
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState<Branch>("CSE");
  const [section, setSection] = useState("CSE-A");
  const [semester, setSemester] = useState(6);
  const [mentor, setMentor] = useState("Dr. K. Senthil Kumar");
  const [email, setEmail] = useState("");

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNo.trim() || !name.trim()) return;

    const newStudent: AdminStudentRecord = {
      id: `DIR-${Date.now()}`,
      regNo: regNo.trim(),
      name: name.trim(),
      email: email.trim() || `${regNo.trim().toLowerCase()}@veltech.edu.in`,
      branch,
      section: section.trim() || `${branch}-A`,
      year: "3rd Year",
      semester: Number(semester),
      attendancePercent: 85.0,
      cgpa: 8.0,
      mentor: mentor.trim() || "Assigned Mentor",
      status: "Active",
    };

    setStudents([newStudent, ...students]);
    setShowAddModal(false);
    setRegNo("");
    setName("");
    setEmail("");
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.mentor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch =
      selectedBranch === "ALL" || s.branch === selectedBranch;

    return matchesSearch && matchesBranch;
  });

  const totalCount = students.length;
  const activeCount = students.filter((s) => s.status === "Active").length;
  const reviewCount = students.filter((s) => s.attendancePercent < 75).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
            Student Information & Enrollment System
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Master student registry across all autonomous engineering disciplines.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
        >
          <span>+ Register New Student</span>
        </button>
      </div>

      {/* 2. Top Metric Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600">Total Enrolled Records</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">{totalCount}</p>
        </div>

        <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#026466]">Active / Good Standing</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">{activeCount}</p>
        </div>

        <div className="rounded-xl border border-[#AF0606]/30 bg-[#FDE8E8] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#AF0606]">Under Condonation Review (&lt; 75%)</span>
          <p className="text-2xl font-bold text-[#AF0606] font-mono mt-0.5">{reviewCount}</p>
        </div>
      </div>

      {/* 3. Search and Branch Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by student name, reg number, or mentor..."
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

      {/* 4. Student Records Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Reg Number</th>
                <th className="py-3 px-3">Student Full Name</th>
                <th className="py-3 px-3 text-center">Branch</th>
                <th className="py-3 px-3 text-center">Section</th>
                <th className="py-3 px-3 text-center">Semester</th>
                <th className="py-3 px-3 text-center">Attendance %</th>
                <th className="py-3 px-3 text-center">CGPA</th>
                <th className="py-3 px-3">Mentor Professor</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-mono text-slate-800 font-medium">
                    {s.regNo}
                  </td>
                  <td className="py-3 px-3 font-semibold text-black">
                    <div>{s.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono font-normal">
                      {s.email}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466]">
                      {s.branch}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-black font-semibold">
                    {s.section}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-800">
                    Sem {s.semester}
                  </td>
                  <td className="py-3 px-3 text-center font-mono">
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-xs font-bold ${
                        s.attendancePercent >= 75
                          ? "text-[#026466] bg-[#E6F1F1] border border-[#026466]/30"
                          : "text-[#AF0606] bg-[#FDE8E8] border border-[#AF0606]/30"
                      }`}
                    >
                      {s.attendancePercent.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-black">
                    {s.cgpa.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-slate-800">
                    {s.mentor}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466]">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Register Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-black">Enroll New Student</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">
                    Register Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 22104109"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-black mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">
                    Branch
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
                    Section
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CSE-A"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-black mb-1">
                    Semester
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">
                  Mentor Professor
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. K. Senthil Kumar"
                  value={mentor}
                  onChange={(e) => setMentor(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. 22104109@veltech.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
