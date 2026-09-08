"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function AdminMentorAllocationPage() {
  const { users, reassignMentor } = useApp();

  const facultyMembers = users.filter((u) => u.role === "TEACHER" || u.role === "HOD");
  const students = users.filter((u) => u.role === "STUDENT");

  const [selectedFaculty, setSelectedFaculty] = useState(
    facultyMembers[0]?.name || "Prof. Sample Teacher"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleToggleMentee = (studentId: string, isCurrentlyAssigned: boolean) => {
    if (isCurrentlyAssigned) {
      reassignMentor(studentId, "Unassigned / General Pool");
      setSuccessMsg("Mentee unassigned from proctor.");
    } else {
      reassignMentor(studentId, selectedFaculty);
      setSuccessMsg(`Mentee assigned to ${selectedFaculty}!`);
    }
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.rollNo && s.rollNo.includes(searchQuery)) ||
      (s.mentor && s.mentor.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const selectedFacultyObject = facultyMembers.find((f) => f.name === selectedFaculty);
  const assignedMenteesCount = students.filter((s) => s.mentor === selectedFaculty).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Mentee-Mentor Allocation Matrix
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Real-time mapping of undergraduate wards to designated faculty counselors with instant global sync.
          </p>
        </div>

        {successMsg && (
          <div className="rounded-lg bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/40 px-3.5 py-1.5 text-xs font-bold text-[#026466] dark:text-teal-400 animate-fadeIn">
            ✓ {successMsg}
          </div>
        )}
      </div>

      {/* 2. Faculty Proctor Selector & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
          <label className="block text-xs font-bold text-slate-900 dark:text-white">
            Select Active Faculty Proctor / Mentor
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {facultyMembers.map((fac) => {
              const menteeCount = students.filter((s) => s.mentor === fac.name).length;
              const isSelected = selectedFaculty === fac.name;

              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFaculty(fac.name)}
                  className={`p-3 rounded-xl border text-left transition ${
                    isSelected
                      ? "border-[#026466] dark:border-teal-400 bg-[#E6F1F1] dark:bg-teal-950/40 shadow-xs"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-[130px]">
                      {fac.name}
                    </span>
                    <span className="rounded bg-[#026466] text-white px-1.5 py-0.2 text-[10px] font-mono font-bold">
                      {menteeCount}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{fac.designation || fac.department}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Faculty Profile Summary */}
        <div className="rounded-xl border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-amber-950/20 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#AF0606] dark:text-rose-400 uppercase font-mono">Selected Counselor</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-amber-100 mt-1">{selectedFaculty}</h3>
            <p className="text-xs text-slate-600 dark:text-amber-200/70 mt-0.5">{selectedFacultyObject?.cabin || "Tech Park Cabin"}</p>
          </div>

          <div className="pt-3 border-t border-[#FECDA5]/60 dark:border-amber-900/40 flex items-center justify-between text-xs">
            <span className="text-slate-700 dark:text-slate-300">Assigned Wards:</span>
            <span className="text-base font-bold text-[#026466] dark:text-teal-400 font-mono">{assignedMenteesCount} Students</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Student Assignment Matrix */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Student Ward Roster & Proctor Assignment Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Check/uncheck students below to dynamically assign or release them from <strong className="text-slate-900 dark:text-white">{selectedFaculty}</strong>.
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search student by name, roll no, current mentor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
            />
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3 text-center w-12">Assign</th>
                <th className="py-3 px-3">Roll / Reg No</th>
                <th className="py-3 px-3">Student Full Name</th>
                <th className="py-3 px-3">Section & Term</th>
                <th className="py-3 px-3">Current Mentor Assignment</th>
                <th className="py-3 px-3 text-center">Att %</th>
                <th className="py-3 px-3 text-center">CGPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((s) => {
                const isAssignedToThisFaculty = s.mentor === selectedFaculty;

                return (
                  <tr
                    key={s.id}
                    className={`transition ${
                      isAssignedToThisFaculty
                        ? "bg-[#E6F1F1]/50 dark:bg-teal-950/20"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isAssignedToThisFaculty}
                        onChange={() => handleToggleMentee(s.id, isAssignedToThisFaculty)}
                        className="h-4 w-4 rounded text-[#026466] focus:ring-[#026466] cursor-pointer"
                      />
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      {s.rollNo}
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white">{s.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{s.email}</div>
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-800 dark:text-slate-300">
                      {s.section} • Sem {s.semester || 6}
                    </td>

                    <td className="py-3 px-3">
                      {isAssignedToThisFaculty ? (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#026466] text-white px-2.5 py-1 text-[11px] font-bold">
                          ✓ Assigned to {selectedFaculty}
                        </span>
                      ) : (
                        <span className="text-slate-700 dark:text-slate-300 text-xs">
                          {s.mentor || "Unassigned"}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-center font-mono">
                      <span
                        className={`inline-flex rounded px-2 py-0.5 text-xs font-bold ${
                          (s.attendancePercent || 0) >= 75
                            ? "text-[#026466] bg-[#E6F1F1] dark:bg-teal-950/60 dark:text-teal-400"
                            : "text-[#AF0606] bg-[#FDE8E8] dark:bg-rose-950/60 dark:text-rose-400"
                        }`}
                      >
                        {s.attendancePercent?.toFixed(1) || "85.0"}%
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 dark:text-white">
                      {s.cgpa?.toFixed(2) || "8.50"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
