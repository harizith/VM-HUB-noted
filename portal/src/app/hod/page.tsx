import React from "react";
import Link from "next/link";
import {
  hodProfile,
  departmentFacultyRoster,
  departmentBatches,
  liveRoomStatuses,
} from "@/lib/hodMockData";
import StatCard from "@/components/student/StatCard";

export default function HODDashboardPage() {
  const overloadedFaculty = departmentFacultyRoster.filter(
    (f) => f.status === "Overloaded"
  );
  const underloadedFaculty = departmentFacultyRoster.filter(
    (f) => f.status === "Underloaded"
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. HOD Hero Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-0.5 text-xs font-semibold text-[#026466]">
              <span>
                Department of {hodProfile.department} ({hodProfile.branch})
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
              Welcome, {hodProfile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span>
                Staff ID:{" "}
                <strong className="text-black font-mono">
                  {hodProfile.staffId}
                </strong>
              </span>
              <span>•</span>
              <span>
                Office:{" "}
                <strong className="text-black">{hodProfile.cabin}</strong>
              </span>
              <span>•</span>
              <span>
                Qualifications:{" "}
                <strong className="text-black">{hodProfile.qualification}</strong>
              </span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/hod/faculty"
              className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
            >
              Faculty Workloads
            </Link>
            <Link
              href="/hod/announcements"
              className="rounded-lg border border-slate-300 bg-white hover:bg-[#FFF6EE] px-4 py-2 text-xs font-medium text-black transition"
            >
              Issue Circular
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Department KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Department Students"
          value={hodProfile.totalStudents}
          subtitle="Across 4 Academic Years"
          badge={{
            text: "16 Sections",
            type: "info",
          }}
          icon={
            <svg
              className="w-5 h-5 text-[#026466]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
        />

        <StatCard
          title="Department Faculty"
          value={hodProfile.totalFaculty}
          subtitle="Full-Time Professors"
          badge={{
            text: "1:23 Student Ratio",
            type: "bluestone",
          }}
          icon={
            <svg
              className="w-5 h-5 text-[#026466]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          }
        />

        <StatCard
          title="Department Attendance"
          value={`${hodProfile.avgAttendance}%`}
          subtitle="CSE Aggregate Benchmark"
          badge={{
            text: "Highest in Institute",
            type: "bluestone",
          }}
          icon={
            <svg
              className="w-5 h-5 text-[#026466]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <StatCard
          title="Research Papers"
          value={hodProfile.publicationsCount}
          subtitle="Scopus / SCI Indexed"
          badge={{
            text: "4 Grants Active",
            type: "peach",
          }}
          icon={
            <svg
              className="w-5 h-5 text-[#AF0606]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          }
        />
      </div>

      {/* 3. Live Lecture Hall & Lab In-Session Tracker */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#026466]" />
              <h3 className="text-sm font-bold text-black">
                Department Classroom & Laboratory Occupancy
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Current Period 1 Session status for CSE lecture halls and specialized computer labs.
            </p>
          </div>

          <Link
            href="/hod/timetable"
            className="text-xs font-semibold text-[#026466] hover:underline"
          >
            Master Timetable Matrix →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {liveRoomStatuses.map((room) => (
            <div
              key={room.room}
              className="rounded-lg border border-slate-100 bg-slate-50 p-4 flex flex-col justify-between space-y-2.5 hover:bg-slate-100/70 transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#026466]">
                    {room.room}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      room.occupancy === "In Session"
                        ? "bg-[#E6F1F1] border border-[#026466]/30 text-[#026466]"
                        : "bg-slate-100 border border-slate-200 text-slate-600"
                    }`}
                  >
                    {room.occupancy}
                  </span>
                </div>

                <h4 className="mt-1.5 text-xs font-bold text-black">
                  {room.name}
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                  {room.currentClass}
                </p>
              </div>

              <div className="border-t border-slate-200/60 pt-2 flex items-center justify-between text-[10px] text-slate-500">
                <span>Faculty: {room.faculty}</span>
                <span className="font-mono">{room.period.split(" ")[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Cohort Section Health & Faculty Workload Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Student Cohort Section Performance */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-black">
                Student Cohorts & Class Advisor Tracking
              </h3>
              <p className="text-xs text-slate-500">
                Attendance health and at-risk count per section
              </p>
            </div>
            <Link
              href="/hod/students"
              className="text-xs font-semibold text-[#026466] hover:underline"
            >
              All Sections & Proctoring →
            </Link>
          </div>

          <div className="space-y-3">
            {departmentBatches.map((batch) => (
              <div key={batch.year} className="space-y-2">
                <div className="text-xs font-bold text-black px-1">
                  {batch.year}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {batch.sections.map((sec) => (
                    <div
                      key={sec.section}
                      className="rounded-lg border border-slate-100 bg-slate-50 p-3.5 hover:bg-slate-100/70 transition space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-black">
                          Section {sec.section}
                        </span>
                        <span className="rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-mono text-black font-semibold">
                          {sec.studentCount} Students
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-600">
                        Advisor: <strong className="text-black">{sec.classAdvisor}</strong>
                      </div>

                      <div className="border-t border-slate-200/60 pt-2 flex items-center justify-between text-[11px]">
                        <span>
                          Avg Att:{" "}
                          <strong className="text-[#026466] font-mono">
                            {sec.avgAttendance}%
                          </strong>
                        </span>
                        <span>
                          At-Risk (&lt;75%):{" "}
                          <strong
                            className={
                              sec.atRiskCount > 0
                                ? "text-[#AF0606] font-mono font-bold"
                                : "text-slate-500 font-mono"
                            }
                          >
                            {sec.atRiskCount}
                          </strong>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Faculty Workload Optimization & Circulars */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-black">Workload Alerts</h3>
            <Link
              href="/hod/faculty"
              className="text-xs text-[#026466] hover:underline"
            >
              Manage →
            </Link>
          </div>

          <div className="space-y-2.5 text-xs">
            {overloadedFaculty.map((f) => (
              <div
                key={f.id}
                className="rounded-lg border border-[#FECDA5] bg-[#FFF6EE] p-3 space-y-1"
              >
                <div className="flex items-center justify-between text-[#AF0606] font-bold text-[11px]">
                  <span>Overloaded Faculty</span>
                  <span className="font-mono">{f.weeklyHours} hrs/wk</span>
                </div>
                <p className="text-black font-bold">{f.name}</p>
                <p className="text-[10px] text-slate-700">
                  Handling 2 Theory + 1 Lab. Exceeds standard 18 hr cap.
                </p>
              </div>
            ))}

            {underloadedFaculty.map((f) => (
              <div
                key={f.id}
                className="rounded-lg border border-[#026466]/30 bg-[#E6F1F1] p-3 space-y-1"
              >
                <div className="flex items-center justify-between text-[#026466] font-bold text-[11px]">
                  <span>Capacity Available</span>
                  <span className="font-mono">{f.weeklyHours} hrs/wk</span>
                </div>
                <p className="text-black font-bold">{f.name}</p>
                <p className="text-[10px] text-slate-700">
                  Can be assigned additional tutorial or mini-project review slot.
                </p>
              </div>
            ))}

            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/hod/performance"
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2 text-xs font-semibold text-black hover:bg-[#FFF6EE] transition"
              >
                <span>View CAT-2 Pass Analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
