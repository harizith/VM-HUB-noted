"use client";

import React, { useState } from "react";
import { subjectPerformanceData, SubjectCATPerformance } from "@/lib/hodMockData";

export default function HODPerformancePage() {
  const [data] = useState<SubjectCATPerformance[]>(subjectPerformanceData);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const filteredData = data.filter((item) => {
    if (selectedStatus === "ALL") return true;
    return item.status === selectedStatus;
  });

  const overallPassPct =
    data.length > 0
      ? (data.reduce((acc, curr) => acc + curr.passPercentage, 0) / data.length).toFixed(1)
      : "0";
  const totalOGrades = data.reduce((acc, curr) => acc + curr.oGradeCount, 0);
  const totalRAGrades = data.reduce((acc, curr) => acc + curr.raGradeCount, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
              Continuous Assessment (CAT) & Exam Analytics
            </h1>
            <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-0.5 text-xs font-bold text-[#026466] font-mono">
              CAT-1 & CAT-2 Audit
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Subject-wise pass percentages, class score averages, and grade distributions across CSE semester courses.
          </p>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#026466]">Department Pass Percentage</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">{overallPassPct}%</p>
          <span className="text-[10px] text-[#026466]">Benchmark Target: &gt; 90%</span>
        </div>

        <div className="rounded-xl border border-[#FECDA5] bg-[#FFF6EE] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-black">&quot;O&quot; Distinction Grades</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">{totalOGrades}</p>
          <span className="text-[10px] text-slate-600">Score &ge; 90%</span>
        </div>

        <div className="rounded-xl border border-[#AF0606]/30 bg-[#FDE8E8] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#AF0606]">Remedial Candidates (RA)</span>
          <p className="text-2xl font-bold text-[#AF0606] font-mono mt-0.5">{totalRAGrades}</p>
          <span className="text-[10px] text-[#AF0606]">Special Coaching Mandated</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600">Audited CSE Subjects</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">{data.length}</p>
          <span className="text-[10px] text-slate-400">Theory & Lab Modules</span>
        </div>
      </div>

      {/* 3. Performance Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs font-semibold text-black">
          Filter by Performance Standing:
        </div>

        <div className="flex flex-wrap gap-2">
          {["ALL", "Excellent", "Satisfactory", "Needs Review"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`rounded-lg border px-3.5 py-1 text-xs font-semibold transition ${
                selectedStatus === st
                  ? "border-[#026466] bg-[#E6F1F1] text-[#026466] font-bold"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Performance Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Course Code</th>
                <th className="py-3 px-3">Course Title</th>
                <th className="py-3 px-3">Section</th>
                <th className="py-3 px-3">Faculty Professor</th>
                <th className="py-3 px-3 text-center">CAT-1 Avg (/50)</th>
                <th className="py-3 px-3 text-center">CAT-2 Avg (/50)</th>
                <th className="py-3 px-3 text-center">Pass %</th>
                <th className="py-3 px-3 text-center">O Grades</th>
                <th className="py-3 px-3 text-center">RA Count</th>
                <th className="py-3 px-3 text-center">Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={`${item.courseCode}-${item.section}`} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-mono text-[#026466] font-bold">
                    {item.courseCode}
                  </td>
                  <td className="py-3 px-3 font-semibold text-black">
                    {item.courseTitle}
                  </td>
                  <td className="py-3 px-3 font-mono text-black">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-black text-[11px]">
                      {item.section}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {item.facultyName}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-800">
                    {item.cat1Avg}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-800">
                    {item.cat2Avg}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-[#026466]">
                    {item.passPercentage}%
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-black">
                    {item.oGradeCount}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-[#AF0606]">
                    {item.raGradeCount}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        item.status === "Excellent"
                          ? "bg-[#E6F1F1] text-[#026466] border border-[#026466]/30"
                          : "bg-[#FFF6EE] text-black border border-[#FECDA5]"
                      }`}
                    >
                      {item.status}
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
