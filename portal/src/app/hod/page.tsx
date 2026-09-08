"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import StatCard from "@/components/student/StatCard";

export default function HODDashboardPage() {
  const { users, courses, circulars } = useApp();

  const deptStudents = users.filter((u) => u.role === "STUDENT");
  const deptFaculty = users.filter((u) => u.role === "TEACHER");
  const deptCourses = courses.filter((c) => c.department === "CSE" || c.section.includes("CSE"));

  const cseAStudents = deptStudents.filter((s) => s.section === "CSE-A");
  const cseBStudents = deptStudents.filter((s) => s.section === "CSE-B");

  const avgAttCseA =
    cseAStudents.length > 0
      ? (cseAStudents.reduce((acc, s) => acc + (s.attendancePercent || 0), 0) / cseAStudents.length).toFixed(1)
      : "88.2";

  const avgAttCseB =
    cseBStudents.length > 0
      ? (cseBStudents.reduce((acc, s) => acc + (s.attendancePercent || 0), 0) / cseBStudents.length).toFixed(1)
      : "85.8";

  const totalPlannedHrs = deptCourses.reduce((acc, c) => acc + c.totalPlannedHours, 0);
  const totalCompletedHrs = deptCourses.reduce((acc, c) => acc + c.completedHours, 0);
  const syllabusDeliveryPercent = totalPlannedHrs > 0 ? ((totalCompletedHrs / totalPlannedHrs) * 100).toFixed(0) : "75";

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. HOD Hero Banner */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/30 px-2.5 py-0.5 text-xs font-semibold text-[#026466] dark:text-teal-400">
              <span>Department of Computer Science & Engineering</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              HOD Executive Dashboard & Academic Quality Console
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Department curriculum health, section attendance indices, faculty deployment, and circular broadcasts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/hod/announcements"
              className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
            >
              + Department Broadcast
            </Link>
            <Link
              href="/hod/performance"
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#FFF6EE] dark:hover:bg-slate-700 px-4 py-2 text-xs font-medium text-slate-900 dark:text-white transition"
            >
              Curriculum Delivery →
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Department Key KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="CSE Student Strength"
          value={deptStudents.length.toString()}
          subtitle="CSE-A & CSE-B Batches"
          badge={{
            text: "100% Enrolled",
            type: "bluestone",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />

        <StatCard
          title="Department Faculty"
          value={deptFaculty.length.toString()}
          subtitle="Designated Course Handlers"
          badge={{
            text: "All Staff Active",
            type: "info",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />

        <StatCard
          title="Syllabus Delivery Index"
          value={`${syllabusDeliveryPercent}%`}
          subtitle={`${totalCompletedHrs} / ${totalPlannedHrs} Lecture Hours`}
          badge={{
            text: "On Schedule",
            type: "bluestone",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatCard
          title="Critical Attendance Risk"
          value={deptStudents.filter((s) => (s.attendancePercent || 0) < 75).length.toString()}
          subtitle="Students Below 75% Statutory Limit"
          badge={{
            text: "Counseling Due",
            type: "danger",
          }}
          icon={
            <svg className="w-5 h-5 text-[#AF0606]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </div>

      {/* 3. Section Health & Attendance Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CSE-A Health */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#026466] dark:text-teal-400 font-mono">SECTION CSE-A</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">3rd Year Semester VI</h3>
            </div>
            <span className="rounded bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 text-[#026466] dark:text-teal-400 px-2 py-0.5 text-xs font-bold font-mono">
              Avg {avgAttCseA}%
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500 text-[10px]">Headcount</span>
              <p className="font-bold text-slate-900 dark:text-white font-mono mt-0.5">{cseAStudents.length}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500 text-[10px]">Good Standing</span>
              <p className="font-bold text-[#026466] dark:text-teal-400 font-mono mt-0.5">
                {cseAStudents.filter((s) => (s.attendancePercent || 0) >= 75).length}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500 text-[10px]">Shortage (&lt;75%)</span>
              <p className="font-bold text-[#AF0606] dark:text-rose-400 font-mono mt-0.5">
                {cseAStudents.filter((s) => (s.attendancePercent || 0) < 75).length}
              </p>
            </div>
          </div>
        </div>

        {/* CSE-B Health */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-[#026466] dark:text-teal-400 font-mono">SECTION CSE-B</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">3rd Year Semester VI</h3>
            </div>
            <span className="rounded bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 text-[#026466] dark:text-teal-400 px-2 py-0.5 text-xs font-bold font-mono">
              Avg {avgAttCseB}%
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500 text-[10px]">Headcount</span>
              <p className="font-bold text-slate-900 dark:text-white font-mono mt-0.5">{cseBStudents.length}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500 text-[10px]">Good Standing</span>
              <p className="font-bold text-[#026466] dark:text-teal-400 font-mono mt-0.5">
                {cseBStudents.filter((s) => (s.attendancePercent || 0) >= 75).length}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span className="text-slate-500 text-[10px]">Shortage (&lt;75%)</span>
              <p className="font-bold text-[#AF0606] dark:text-rose-400 font-mono mt-0.5">
                {cseBStudents.filter((s) => (s.attendancePercent || 0) < 75).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Curriculum Delivery Summary Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Curriculum Delivery & Syllabus Completion
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tracking lecture hours conducted vs planned syllabus modules across department courses.
            </p>
          </div>
          <Link href="/hod/performance" className="text-xs font-semibold text-[#026466] dark:text-teal-400 hover:underline">
            Detailed Breakdown →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Subject</th>
                <th className="py-3 px-3">Instructor</th>
                <th className="py-3 px-3 text-center">Section</th>
                <th className="py-3 px-3 text-center">Delivered / Planned</th>
                <th className="py-3 px-3">Syllabus Progress</th>
                <th className="py-3 px-3 text-center">Avg Att %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {deptCourses.map((c) => {
                const completedTopics = c.syllabus.filter((t) => t.isCompleted).length;
                const percent = c.syllabus.length > 0 ? ((completedTopics / c.syllabus.length) * 100).toFixed(0) : "0";

                return (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                      <div>{c.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{c.code}</div>
                    </td>

                    <td className="py-3 px-3 text-slate-800 dark:text-slate-200">
                      {c.instructorName}
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 dark:text-white">
                      {c.section}
                    </td>

                    <td className="py-3 px-3 text-center font-mono text-slate-800 dark:text-slate-200">
                      {c.completedHours} / {c.totalPlannedHours} hrs
                    </td>

                    <td className="py-3 px-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-500">{completedTopics} of {c.syllabus.length} units</span>
                          <span className="font-mono font-bold text-[#026466] dark:text-teal-400">{percent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#026466] dark:bg-teal-500 rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-bold text-[#026466] dark:text-teal-400">
                      {c.avgAttendance}%
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
