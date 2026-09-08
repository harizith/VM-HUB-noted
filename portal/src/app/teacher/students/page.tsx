"use client";

import React, { useState } from "react";
import { initialStudentRoster, StudentRosterItem, teacherProfile } from "@/lib/teacherMockData";

export default function TeacherStudentsPage() {
  const [filterType, setFilterType] = useState<"all" | "at-risk" | "top">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [students] = useState<StudentRosterItem[]>(initialStudentRoster);
  const [counseledIds, setCounseledIds] = useState<string[]>([]);

  const handleLogCounseling = (id: string) => {
    if (!counseledIds.includes(id)) {
      setCounseledIds([...counseledIds, id]);
    }
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.regNo.includes(searchQuery);

    if (!matchesSearch) return false;

    if (filterType === "at-risk") {
      return s.attendancePercent < 75 || (s.cat2Score ?? 0) < 30;
    }
    if (filterType === "top") {
      return s.cgpa >= 8.5;
    }
    return true;
  });

  const atRiskCount = students.filter((s) => s.attendancePercent < 75).length;
  const topCount = students.filter((s) => s.cgpa >= 8.5).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Student Roster & Proctor Watchlist
            </h1>
            <span className="rounded bg-[#E6F1F1] dark:bg-[#026466]/30 border border-[#026466]/30 px-2.5 py-0.5 text-xs font-bold text-[#026466] dark:text-teal-300">
              {teacherProfile.assignedSections.join(" & ")}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Monitor academic standing, low-attendance warnings (&lt; 75%), and mentor counseling logs.
          </p>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Enrolled Students</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">{students.length}</p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">Across 2 Sections</span>
        </div>

        <div className="rounded-xl border border-[#AF0606]/30 bg-[#FDE8E8] dark:bg-rose-950/30 p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#AF0606] dark:text-rose-400">Attendance At-Risk (&lt; 75%)</span>
          <p className="text-2xl font-bold text-[#AF0606] dark:text-rose-400 font-mono mt-0.5">{atRiskCount}</p>
          <span className="text-[10px] text-[#AF0606] dark:text-rose-400">Requires Proctor Action</span>
        </div>

        <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] dark:bg-[#026466]/20 p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#026466] dark:text-teal-400">High Performers (CGPA &gt; 8.5)</span>
          <p className="text-2xl font-bold text-[#026466] dark:text-teal-400 font-mono mt-0.5">{topCount}</p>
          <span className="text-[10px] text-[#026466] dark:text-teal-400">Distinction Candidates</span>
        </div>
      </div>

      {/* 3. Search and Quick Filters */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search student name or register number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType("all")}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              filterType === "all"
                ? "border-[#026466] bg-[#E6F1F1] dark:bg-[#026466]/30 text-[#026466] dark:text-teal-300 font-bold"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            All Students ({students.length})
          </button>
          <button
            onClick={() => setFilterType("at-risk")}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              filterType === "at-risk"
                ? "border-[#AF0606] bg-[#FDE8E8] dark:bg-rose-950/40 text-[#AF0606] dark:text-rose-400 font-bold"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            ⚠️ At-Risk Only ({atRiskCount})
          </button>
          <button
            onClick={() => setFilterType("top")}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              filterType === "top"
                ? "border-[#026466] bg-[#E6F1F1] dark:bg-[#026466]/30 text-[#026466] dark:text-teal-300 font-bold"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            🌟 Top Performers ({topCount})
          </button>
        </div>
      </div>

      {/* 4. Students Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3 px-3">Reg No</th>
              <th className="py-3 px-3">Student Name</th>
              <th className="py-3 px-3 text-center">Section</th>
              <th className="py-3 px-3 text-center">Attendance %</th>
              <th className="py-3 px-3 text-center">CGPA</th>
              <th className="py-3 px-3 text-center">CAT-2 Mark</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredStudents.map((student) => {
              const isLowAtt = student.attendancePercent < 75;
              const isCounseled = counseledIds.includes(student.id);

              return (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300 font-medium">
                    {student.regNo}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    {student.name}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {student.section}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold">
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-xs ${
                        isLowAtt
                          ? "bg-[#FDE8E8] dark:bg-rose-950/40 text-[#AF0606] dark:text-rose-400 border border-[#AF0606]/30"
                          : "text-[#026466] dark:text-teal-400"
                      }`}
                    >
                      {student.attendancePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 dark:text-white">
                    {student.cgpa.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-700 dark:text-slate-300">
                    {student.cat2Score ? `${student.cat2Score}/50` : "—"}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {isLowAtt ? (
                      <span className="inline-flex items-center gap-1 rounded bg-[#FDE8E8] dark:bg-rose-950/40 border border-[#AF0606]/30 px-2 py-0.5 text-[10px] font-bold text-[#AF0606] dark:text-rose-400">
                        Shortage
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-[#E6F1F1] dark:bg-[#026466]/30 border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466] dark:text-teal-300">
                        Regular
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {isCounseled ? (
                      <span className="inline-flex rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/40 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        ✓ Counseled
                      </span>
                    ) : isLowAtt ? (
                      <button
                        onClick={() => handleLogCounseling(student.id)}
                        className="rounded bg-[#FDE8E8] dark:bg-rose-950/40 border border-[#AF0606]/30 px-2.5 py-1 text-xs font-bold text-[#AF0606] dark:text-rose-400 hover:bg-[#AF0606] hover:text-white transition"
                      >
                        Schedule Meeting
                      </button>
                    ) : (
                      <button
                        onClick={() => handleLogCounseling(student.id)}
                        className="rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-[#026466] hover:text-[#026466] transition shadow-2xs"
                      >
                        Log Counseling
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
  );
}
