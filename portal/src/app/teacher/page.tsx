"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { facultyTimetable } from "@/lib/teacherMockData";
import StatCard from "@/components/student/StatCard";

export default function TeacherDashboardPage() {
  const { currentUser, courses, users, leavePetitions, circulars } = useApp();

  const myCourses = courses.filter(
    (c) => c.department === "CSE" || c.instructorName.includes(currentUser.name)
  );
  const activeCourseList = myCourses.length > 0 ? myCourses : courses;

  // Proctor wards count
  const myWards = users.filter((u) => u.mentor === currentUser.name || u.mentor?.includes(currentUser.name.split(" ")[1] || "Sample"));
  const criticalWards = myWards.filter((w) => (w.attendancePercent || 0) < 75);

  const pendingLeaves = leavePetitions.filter((l) => l.status === "Pending");

  // Today's schedule (Monday)
  const todayDay = "Monday";
  const todaySchedule = facultyTimetable.find((d) => d.day === todayDay)?.slots || [];
  const teachingPeriodsToday = todaySchedule.filter((s) => s.type !== "free");

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Faculty Hero Profile Banner */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/30 px-2.5 py-0.5 text-xs font-semibold text-[#026466] dark:text-teal-400">
              <span>
                {currentUser.designation || "Associate Professor"} • {currentUser.department}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome, {currentUser.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
              <span>
                Staff ID: <strong className="text-slate-900 dark:text-white font-mono">{currentUser.staffId || "VMT-CSE-014"}</strong>
              </span>
              <span>•</span>
              <span>
                Cabin: <strong className="text-slate-900 dark:text-white">{currentUser.cabin || "Cabin 304, Tech Park"}</strong>
              </span>
              <span>•</span>
              <span>
                Assigned Classes: <strong className="text-slate-900 dark:text-white">CSE-A, CSE-B</strong>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/teacher/attendance"
              className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
            >
              Mark Today&apos;s Attendance
            </Link>
            <Link
              href="/teacher/leave"
              className="rounded-lg border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-amber-950/20 hover:bg-[#FECDA5]/40 px-4 py-2 text-xs font-bold text-slate-900 dark:text-amber-200 transition"
            >
              OD Queue ({pendingLeaves.length})
            </Link>
            <Link
              href="/teacher/announcements"
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#FFF6EE] dark:hover:bg-slate-700 px-4 py-2 text-xs font-medium text-slate-900 dark:text-white transition"
            >
              + Broadcast
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Faculty Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Handled Courses"
          value={activeCourseList.length.toString()}
          subtitle="Autonomous Curriculum Modules"
          badge={{
            text: "Active Semester",
            type: "info",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />

        <StatCard
          title="Classes Today"
          value={`${teachingPeriodsToday.length} Periods`}
          subtitle="Monday Teaching Schedule"
          badge={{
            text: "Next: P1 at 08:45",
            type: "bluestone",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatCard
          title="Avg Class Attendance"
          value="88.5%"
          subtitle="21CS601 Cloud Computing"
          badge={{
            text: "High Engagement",
            type: "bluestone",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatCard
          title="Proctor Mentees"
          value={`${myWards.length} Students`}
          subtitle="Assigned Mentorship List"
          badge={{
            text: criticalWards.length > 0 ? `${criticalWards.length} Critical (<75%)` : "All Compliant",
            type: criticalWards.length > 0 ? "danger" : "bluestone",
          }}
          icon={
            <svg className="w-5 h-5 text-[#AF0606]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
      </div>

      {/* 3. Today's Teaching Schedule & Handled Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Period Schedule */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Today&apos;s Teaching Schedule
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Monday • 7 Periods</p>
              </div>
              <Link
                href="/teacher/timetable"
                className="text-xs font-semibold text-[#026466] dark:text-teal-400 hover:underline"
              >
                Full Week Schedule →
              </Link>
            </div>

            <div className="mt-4 space-y-2">
              {todaySchedule.map((slot) => {
                const isFree = slot.type === "free";
                return (
                  <div
                    key={slot.period}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-3 transition ${
                      isFree
                        ? "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 opacity-60"
                        : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100/70 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-bold font-mono ${
                          isFree
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-400"
                            : "bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 text-[#026466] dark:text-teal-400"
                        }`}
                      >
                        P{slot.period}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold ${
                              isFree ? "text-slate-400" : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {slot.courseTitle}
                          </span>
                          {!isFree && (
                            <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300">
                              {slot.section}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                          {slot.time} • Room:{" "}
                          <span className="text-slate-900 dark:text-white font-semibold font-mono">
                            {slot.room}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      {!isFree ? (
                        <Link
                          href={`/teacher/attendance?section=${slot.section}&period=${slot.period}`}
                          className="rounded-md bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 px-2.5 py-1 text-xs font-semibold text-[#026466] dark:text-teal-400 hover:bg-[#026466] hover:text-white transition"
                        >
                          Mark Attendance →
                        </Link>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400">
                          Free Slot
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Handled Courses Overview & Syllabus shortcuts */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Handled Courses</h3>
              <Link
                href="/teacher/syllabus"
                className="text-xs font-semibold text-[#026466] dark:text-teal-400 hover:underline"
              >
                Syllabus Ledger →
              </Link>
            </div>

            <div className="mt-3 space-y-2.5">
              {activeCourseList.map((course) => (
                <div
                  key={`${course.code}-${course.section}`}
                  className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3 hover:bg-slate-100/70 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#026466] dark:text-teal-400">
                      {course.code}
                    </span>
                    <span className="rounded bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 px-1.5 py-0.5 text-[10px] font-bold text-[#026466] dark:text-teal-400">
                      {course.section}
                    </span>
                  </div>

                  <h4 className="mt-1 text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {course.title}
                  </h4>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700 pt-2">
                    <span>
                      Hours: <strong className="text-slate-900 dark:text-white font-mono">{course.completedHours}/{course.totalPlannedHours}</strong>
                    </span>
                    <span>
                      Avg Att: <strong className="text-[#026466] dark:text-teal-400 font-mono">{course.avgAttendance}%</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/teacher/announcements"
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-amber-950/30 py-2 text-xs font-semibold text-slate-900 dark:text-amber-200 hover:bg-[#FECDA5] transition"
            >
              <span>Broadcast Announcement</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Class Announcements & Pending Leave Petitions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Broadcasts */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Class Announcements &amp; Broadcasts
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Notices visible only to your enrolled students &amp; mentees
              </p>
            </div>
            <Link
              href="/teacher/announcements"
              className="text-xs font-semibold text-[#026466] dark:text-teal-400 hover:underline"
            >
              Manage All →
            </Link>
          </div>

          <div className="mt-4 space-y-2.5">
            {circulars.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="rounded-lg border border-[#FECDA5]/50 dark:border-amber-900/30 bg-[#FFF6EE]/40 dark:bg-amber-950/10 p-3 hover:bg-[#FFF6EE] dark:hover:bg-amber-950/20 transition space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466] dark:text-teal-400">
                      {ann.category}
                    </span>
                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300">
                      Target: {ann.targetAudience}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{ann.date}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ann.title}</h4>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Pending Leave Adjudication Quick Queue */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Leave / OD Queue</h3>
            <Link href="/teacher/leave" className="text-[10px] text-[#AF0606] dark:text-rose-400 font-bold uppercase hover:underline">
              {pendingLeaves.length} Action Due →
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            {pendingLeaves.length === 0 ? (
              <div className="py-4 text-center text-slate-500 text-[11px]">All student petitions adjudicated.</div>
            ) : (
              pendingLeaves.slice(0, 2).map((p) => (
                <div
                  key={p.id}
                  className="rounded-lg border border-[#FECDA5] dark:border-amber-900/40 bg-[#FFF6EE] dark:bg-amber-950/20 p-3 space-y-1"
                >
                  <div className="flex items-center justify-between text-[#AF0606] dark:text-rose-400 font-bold text-[11px]">
                    <span>{p.studentName} ({p.type})</span>
                    <span className="font-mono text-[10px]">{p.totalDays}d</span>
                  </div>
                  <p className="text-[11px] text-slate-800 dark:text-slate-200 line-clamp-2">
                    {p.reason}
                  </p>
                  <div className="pt-1 flex justify-end">
                    <Link
                      href="/teacher/leave"
                      className="text-[10px] font-bold text-[#026466] dark:text-teal-400 hover:underline"
                    >
                      Review &amp; Approve →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
