"use client";

import React, { useState } from "react";
import { initialAdminStudents, AdminStudentRecord } from "@/lib/adminMockData";
import { hodProfile } from "@/lib/hodMockData";

export default function HODStudentsPage() {
  const [students] = useState<AdminStudentRecord[]>(
    initialAdminStudents.filter((s) => s.branch === "CSE")
  );
  const [selectedSection, setSelectedSection] = useState<string>("ALL");
  const [filterType, setFilterType] = useState<"all" | "at-risk" | "top">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter((s) => {
    const matchesSection = selectedSection === "ALL" || s.section === selectedSection;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.regNo.includes(searchQuery) ||
      s.mentor.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSection || !matchesSearch) return false;

    if (filterType === "at-risk") {
      return s.attendancePercent < 75 || s.status === "Condonation Review";
    }
    if (filterType === "top") {
      return s.cgpa >= 8.5;
    }
    return true;
  });

  const totalCount = students.length;
  const atRiskCount = students.filter((s) => s.attendancePercent < 75).length;
  const topCount = students.filter((s) => s.cgpa >= 8.5).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
              Department Students & Proctoring Oversight
            </h1>
            <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-0.5 text-xs font-bold text-[#026466] font-mono">
              {hodProfile.branch} Students
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Monitor cohort academic health, low-attendance condonation lists (&lt; 75%), and mentor counseling logs.
          </p>
        </div>
      </div>

      {/* 2. Top Cohort Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600">Active Cohort Records</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">{totalCount}</p>
          <span className="text-[10px] text-slate-400">CSE Department Wards</span>
        </div>

        <div className="rounded-xl border border-[#AF0606]/30 bg-[#FDE8E8] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#AF0606]">Condonation Risk (&lt; 75% Att)</span>
          <p className="text-2xl font-bold text-[#AF0606] font-mono mt-0.5">{atRiskCount}</p>
          <span className="text-[10px] text-[#AF0606]">Proctor Intervention Mandated</span>
        </div>

        <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#026466]">High Performers (CGPA &gt; 8.5)</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">{topCount}</p>
          <span className="text-[10px] text-[#026466]">Distinction / Honours Candidates</span>
        </div>
      </div>

      {/* 3. Search and Section Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search student name, reg number, or mentor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["ALL", "CSE-A", "CSE-B", "CSE-C", "CSE-D"].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`rounded-lg border px-3 py-1 text-xs font-semibold font-mono transition ${
                selectedSection === sec
                  ? "border-[#026466] bg-[#E6F1F1] text-[#026466] font-bold"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Student List Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-black">
            CSE Student Proctoring Roster
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                filterType === "all" ? "bg-[#E6F1F1] text-[#026466] font-bold" : "text-slate-600 hover:text-black"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("at-risk")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                filterType === "at-risk"
                  ? "bg-[#FDE8E8] text-[#AF0606] border border-[#AF0606]/30 font-bold"
                  : "text-slate-600 hover:text-[#AF0606]"
              }`}
            >
              At-Risk ({atRiskCount})
            </button>
            <button
              onClick={() => setFilterType("top")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                filterType === "top"
                  ? "bg-[#E6F1F1] text-[#026466] border border-[#026466]/30 font-bold"
                  : "text-slate-600 hover:text-[#026466]"
              }`}
            >
              Top CGPA ({topCount})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Reg Number</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3 text-center">Section</th>
                <th className="py-3 px-3 text-center">Attendance %</th>
                <th className="py-3 px-3 text-center">CGPA</th>
                <th className="py-3 px-3">Assigned Mentor</th>
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
                    <div className="text-[10px] text-slate-500 font-normal font-mono">
                      {s.email}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-black text-[11px]">
                      {s.section}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono">
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-xs font-bold ${
                        s.attendancePercent >= 75
                          ? "text-[#026466] bg-[#E6F1F1] border border-[#026466]/30"
                          : "text-[#AF0606] bg-[#FDE8E8] border border-[#AF0606]/30"
                      }`}
                    >
                      {s.attendancePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-black">
                    {s.cgpa.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-slate-800">
                    {s.mentor}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold ${
                        s.status === "Active"
                          ? "bg-[#E6F1F1] text-[#026466] border border-[#026466]/30"
                          : "bg-[#FDE8E8] text-[#AF0606] border border-[#AF0606]/30"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
