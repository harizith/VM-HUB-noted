import React from "react";
import Link from "next/link";
import {
  institutionalStats,
  branchStats,
  initialCollegeAnnouncements,
} from "@/lib/adminMockData";
import { Branch } from "@/lib/studentMockData";
import StatCard from "@/components/student/StatCard";

export default function AdminDashboardPage() {
  const branchKeys = Object.keys(branchStats) as Branch[];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Dean / Executive Hero Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-0.5 text-xs font-semibold text-[#026466]">
              <span>Vel Tech Multitech Autonomous Institute</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
              Academic Dean & Institutional Console
            </h1>
            <p className="text-xs text-slate-500">
              Executive oversight across 5 engineering departments, student records, faculty workloads, and examination readiness.
            </p>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/students"
              className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
            >
              + Register Student
            </Link>
            <Link
              href="/admin/announcements"
              className="rounded-lg border border-slate-300 bg-white hover:bg-[#FFF6EE] px-4 py-2 text-xs font-medium text-black transition"
            >
              Issue Circular
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Institutional KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={institutionalStats.totalStudents.toLocaleString()}
          subtitle="Across 5 Engineering Branches"
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
          title="Faculty Members"
          value={institutionalStats.totalFaculty}
          subtitle="1:23 Staff-to-Student Ratio"
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
          value={institutionalStats.activeCourses}
          subtitle="Autonomous Syllabus Modules"
          badge={{
            text: "Odd & Even Terms",
            type: "info",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />

        <StatCard
          title="Institute Attendance"
          value={`${institutionalStats.collegeAvgAttendance}%`}
          subtitle="Target Benchmark: > 85.0%"
          badge={{
            text: "Above Target",
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
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-black">
              Department Performance Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Real-time student headcount, faculty strength, and attendance health across all branches.
            </p>
          </div>
          <Link
            href="/admin/courses"
            className="text-xs font-semibold text-[#026466] hover:underline"
          >
            Course Catalog & Syllabi →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {branchKeys.map((code) => {
            const branch = branchStats[code];
            return (
              <div
                key={code}
                className="rounded-lg border border-slate-100 bg-slate-50 p-4 flex flex-col justify-between hover:bg-slate-100/70 transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466] font-mono">
                      {branch.code}
                    </span>
                    <span className="text-[10px] font-mono text-black font-bold">
                      {branch.classroom}
                    </span>
                  </div>

                  <h4 className="mt-2 text-xs font-bold text-black leading-snug">
                    {branch.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1">
                    HOD: <span className="text-black font-medium">{branch.hodName}</span>
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Students:</span>
                    <strong className="text-black font-mono">{branch.studentsCount}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Faculty:</span>
                    <strong className="text-black font-mono">{branch.facultyCount}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Avg Att:</span>
                    <strong className="text-[#026466] font-mono">{branch.avgAttendance}%</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Section: Official College Circulars & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Official Campus Circulars */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-black">
                Official Institutional Circulars & Notices
              </h3>
              <p className="text-xs text-slate-500">
                Broadcasting to Students, Faculty, and Exam Cell
              </p>
            </div>
            <Link
              href="/admin/announcements"
              className="text-xs font-semibold text-[#026466] hover:underline"
            >
              Manage & Publish →
            </Link>
          </div>

          <div className="space-y-3">
            {initialCollegeAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="rounded-lg border border-[#FECDA5]/50 bg-[#FFF6EE]/40 p-4 hover:bg-[#FFF6EE] transition space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466]">
                      {ann.category}
                    </span>
                    <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-mono text-black">
                      Audience: {ann.targetAudience}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {ann.date}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-black">{ann.title}</h4>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {ann.content}
                </p>
                <div className="text-[10px] text-[#AF0606] font-semibold">
                  Issued by: {ann.publishedBy}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Admin System Operations */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-black">System Modules</h3>
            <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466]">
              Live
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <Link
              href="/admin/hods"
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 hover:bg-[#FFF6EE] transition text-black"
            >
              <span>HOD Master Records & Appointees</span>
              <span className="text-[#026466] font-bold">5 Heads →</span>
            </Link>

            <Link
              href="/admin/students"
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 hover:bg-[#FFF6EE] transition text-black"
            >
              <span>Student Registry & Enrollment</span>
              <span className="text-[#026466] font-bold">4,800 Active →</span>
            </Link>

            <Link
              href="/admin/faculty"
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 hover:bg-[#FFF6EE] transition text-black"
            >
              <span>Faculty Workload & Deployment</span>
              <span className="text-[#026466] font-bold">210 Staff →</span>
            </Link>

            <Link
              href="/admin/courses"
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 hover:bg-[#FFF6EE] transition text-black"
            >
              <span>Autonomous Curriculum Catalog</span>
              <span className="text-[#026466] font-bold">64 Courses →</span>
            </Link>

            <Link
              href="/admin/timetable"
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 hover:bg-[#FFF6EE] transition text-black"
            >
              <span>Master Schedule & Lecture Halls</span>
              <span className="text-[#026466] font-bold">5 Timetables →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
