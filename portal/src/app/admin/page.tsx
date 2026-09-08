"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import StatCard from "@/components/student/StatCard";

export default function AdminDashboardPage() {
  const { users, courses, attendanceSessions, circulars, auditLogs, resetDatabase } = useApp();

  const totalStudents = users.filter((u) => u.role === "STUDENT").length;
  const totalFaculty = users.filter((u) => u.role === "TEACHER").length;
  const totalHODs = users.filter((u) => u.role === "HOD").length;
  const activeCoursesCount = courses.length;

  // Aggregate student attendance
  const studentUsers = users.filter((u) => u.role === "STUDENT" && u.attendancePercent !== undefined);
  const avgAttendance =
    studentUsers.length > 0
      ? (studentUsers.reduce((acc, u) => acc + (u.attendancePercent || 0), 0) / studentUsers.length).toFixed(1)
      : "88.0";

  // Branch summaries
  const branches = [
    { code: "CSE", name: "Computer Science & Engineering", hod: "Dr. K. Senthil Kumar", room: "TP-301", students: users.filter((u) => u.department.includes("Computer") || u.section?.includes("CSE")).length || 60, att: "88.5%" },
    { code: "IT", name: "Information Technology", hod: "Dr. M. Sridhar", room: "MB-204", students: 48, att: "89.2%" },
    { code: "ECE", name: "Electronics & Communication", hod: "Dr. G. Revathi", room: "EC-101", students: 54, att: "86.7%" },
    { code: "AIDS", name: "Artificial Intelligence & Data Science", hod: "Dr. P. Rajesh", room: "TP-402", students: 42, att: "90.1%" },
    { code: "MECH", name: "Mechanical Engineering", hod: "Dr. T. Natarajan", room: "MB-108", students: 38, att: "84.5%" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Dean / Executive Hero Banner */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/30 px-2.5 py-0.5 text-xs font-semibold text-[#026466] dark:text-teal-400">
              <span>Vel Tech Multitech Autonomous Institute</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Academic Dean & Institutional Console
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Executive oversight across 5 engineering departments, student records, faculty workloads, mentee allocation matrix, and examination readiness.
            </p>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/students"
              className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
            >
              + Provision User
            </Link>
            <Link
              href="/admin/mentors"
              className="rounded-lg border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-amber-950/20 hover:bg-[#FECDA5]/40 px-4 py-2 text-xs font-bold text-slate-900 dark:text-amber-200 transition"
            >
              Mentor Matrix
            </Link>
            <button
              onClick={() => {
                if (confirm("Restore institutional database to factory seed state?")) {
                  resetDatabase();
                }
              }}
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#FDE8E8] dark:hover:bg-rose-950/30 hover:text-[#AF0606] px-4 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 transition"
            >
              🔄 Reset DB
            </button>
          </div>
        </div>
      </div>

      {/* 2. Institutional KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Students"
          value={totalStudents.toString()}
          subtitle="Enrolled in Autonomous Batches"
          badge={{
            text: "100% Active",
            type: "bluestone",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />

        <StatCard
          title="Faculty Members"
          value={`${totalFaculty} Faculty • ${totalHODs} HODs`}
          subtitle="Staff-to-Student Ratio ~ 1:20"
          badge={{
            text: "Fully Staffed",
            type: "info",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />

        <StatCard
          title="Curriculum Courses"
          value={activeCoursesCount.toString()}
          subtitle="Autonomous Syllabus Modules"
          badge={{
            text: "Active Terms",
            type: "info",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />

        <StatCard
          title="Institute Average Attendance"
          value={`${avgAttendance}%`}
          subtitle="Target Statutory Benchmark: > 75.0%"
          badge={{
            text: "Compliant",
            type: "bluestone",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* 3. Five Engineering Departments Breakdown */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Department Performance Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Head of Departments, classrooms, and attendance health indices across disciplines.
            </p>
          </div>
          <Link
            href="/admin/courses"
            className="text-xs font-semibold text-[#026466] dark:text-teal-400 hover:underline"
          >
            Course Catalog & Syllabi →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {branches.map((b) => (
            <div
              key={b.code}
              className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 flex flex-col justify-between hover:bg-slate-100/70 dark:hover:bg-slate-800 transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466] dark:text-teal-400 font-mono">
                    {b.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-800 dark:text-slate-300 font-bold">
                    {b.room}
                  </span>
                </div>

                <h4 className="mt-2 text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  {b.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  HOD: <span className="text-slate-800 dark:text-slate-200 font-medium">{b.hod}</span>
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700 space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Batch Strength:</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{b.students}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Avg Attendance:</span>
                  <strong className="text-[#026466] dark:text-teal-400 font-mono">{b.att}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Grid: Official Circulars & System Audit Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Institutional Circulars */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Official Institutional Circulars & Notices
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Broadcasting to Students, Faculty, and Exam Cell
              </p>
            </div>
            <Link
              href="/admin/announcements"
              className="text-xs font-semibold text-[#026466] dark:text-teal-400 hover:underline"
            >
              Manage & Issue Circulars →
            </Link>
          </div>

          <div className="space-y-3">
            {circulars.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="rounded-lg border border-[#FECDA5]/50 dark:border-amber-900/30 bg-[#FFF6EE]/40 dark:bg-amber-950/10 p-4 hover:bg-[#FFF6EE] dark:hover:bg-amber-950/20 transition space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466] dark:text-teal-400">
                      {ann.category}
                    </span>
                    <span className="rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-800 dark:text-slate-300">
                      Audience: {ann.targetAudience}
                    </span>
                    <span className="rounded bg-[#AF0606]/10 text-[#AF0606] dark:text-rose-400 px-2 py-0.5 text-[10px] font-bold">
                      {ann.urgency}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{ann.date}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ann.title}</h4>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  {ann.content}
                </p>
                <div className="text-[10px] text-[#AF0606] dark:text-rose-400 font-semibold">
                  Issued by: {ann.publishedBy}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: System Audit Ledger & Database Operations */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Real-Time Audit Trail</h3>
            <span className="rounded bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466] dark:text-teal-400">
              Live Ledger
            </span>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {auditLogs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-3 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#026466] dark:text-teal-400 font-mono">{log.action}</span>
                  <span className="text-slate-500 font-mono">{log.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-800 dark:text-slate-200 leading-snug">{log.details}</p>
                <div className="text-[10px] text-slate-500">By: <span className="font-semibold text-slate-700 dark:text-slate-300">{log.performedBy}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
