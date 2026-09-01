import React from "react";
import Link from "next/link";
import {
  teacherProfile,
  teacherCourses,
  facultyTimetable,
  initialClassAnnouncements,
} from "@/lib/teacherMockData";
import StatCard from "@/components/student/StatCard";

export default function TeacherDashboardPage() {
  // Today's schedule (Monday)
  const todayDay = "Monday";
  const todaySchedule =
    facultyTimetable.find((d) => d.day === todayDay)?.slots || [];
  const teachingPeriodsToday = todaySchedule.filter((s) => s.type !== "free");

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Faculty Hero Profile Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-0.5 text-xs font-semibold text-[#026466]">
              <span>
                {teacherProfile.designation} • {teacherProfile.department}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
              Welcome, {teacherProfile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span>
                Staff ID:{" "}
                <strong className="text-black font-mono">
                  {teacherProfile.staffId}
                </strong>
              </span>
              <span>•</span>
              <span>
                Cabin:{" "}
                <strong className="text-black">{teacherProfile.cabin}</strong>
              </span>
              <span>•</span>
              <span>
                Handled Classes:{" "}
                <strong className="text-black">
                  {teacherProfile.assignedSections.join(", ")}
                </strong>
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
              href="/teacher/announcements"
              className="rounded-lg border border-slate-300 bg-white hover:bg-[#FFF6EE] px-4 py-2 text-xs font-medium text-black transition"
            >
              + Post Announcement
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Faculty Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={teacherProfile.totalStudents}
          subtitle="Across CSE-A & CSE-B"
          badge={{
            text: "2 Theory • 1 Lab",
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <StatCard
          title="Avg Class Attendance"
          value="88.1%"
          subtitle="21CS601 Cloud Computing"
          badge={{
            text: "High Engagement",
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
          title="Proctor Mentees"
          value={`${teacherProfile.mentorWardsCount} Students`}
          subtitle="3rd Year Ward List"
          badge={{
            text: "2 Need Counseling",
            type: "danger",
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
        />
      </div>

      {/* 3. Today's Teaching Schedule & Handled Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Period Schedule */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-black">
                  Today&apos;s Teaching Schedule
                </h3>
                <p className="text-xs text-slate-500">Monday • 7 Periods</p>
              </div>
              <Link
                href="/teacher/timetable"
                className="text-xs font-semibold text-[#026466] hover:underline"
              >
                Full Week Schedule →
              </Link>
            </div>

            {/* Teaching Slots List */}
            <div className="mt-4 space-y-2">
              {todaySchedule.map((slot) => {
                const isFree = slot.type === "free";
                return (
                  <div
                    key={slot.period}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-3 transition ${
                      isFree
                        ? "border-slate-100 bg-slate-50/50 opacity-60"
                        : "border-slate-100 bg-slate-50 hover:bg-slate-100/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-bold font-mono ${
                          isFree
                            ? "bg-slate-100 text-slate-400"
                            : "bg-[#E6F1F1] border border-[#026466]/30 text-[#026466]"
                        }`}
                      >
                        P{slot.period}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold ${
                              isFree ? "text-slate-400" : "text-black"
                            }`}
                          >
                            {slot.courseTitle}
                          </span>
                          {!isFree && (
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-700">
                              {slot.section}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {slot.time} • Room:{" "}
                          <span className="text-black font-semibold font-mono">
                            {slot.room}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      {!isFree ? (
                        <Link
                          href={`/teacher/attendance?section=${slot.section}&period=${slot.period}`}
                          className="rounded-md bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-1 text-xs font-semibold text-[#026466] hover:bg-[#026466] hover:text-white transition"
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

        {/* Right Col: Handled Courses Overview */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-black">Handled Courses</h3>
              <Link
                href="/teacher/marks"
                className="text-xs font-semibold text-[#026466] hover:underline"
              >
                Gradebook →
              </Link>
            </div>

            <div className="mt-3 space-y-2.5">
              {teacherCourses.map((course) => (
                <div
                  key={`${course.code}-${course.section}`}
                  className="rounded-lg border border-slate-100 bg-slate-50 p-3 hover:bg-slate-100/70 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#026466]">
                      {course.code}
                    </span>
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-1.5 py-0.5 text-[10px] font-bold text-[#026466]">
                      {course.section}
                    </span>
                  </div>

                  <h4 className="mt-1 text-xs font-bold text-black leading-snug">
                    {course.title}
                  </h4>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-200/60 pt-2">
                    <span>
                      Students:{" "}
                      <strong className="text-black">{course.studentsCount}</strong>
                    </span>
                    <span>
                      Avg Att:{" "}
                      <strong className="text-[#026466]">
                        {course.avgAttendance}%
                      </strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/teacher/announcements"
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#FECDA5] bg-[#FFF6EE] py-2 text-xs font-semibold text-black hover:bg-[#FECDA5] transition"
            >
              <span>Broadcast Announcement</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Class Announcements & Pending Grading Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Class Announcements */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-black">
                Class Announcements & Broadcasts
              </h3>
              <p className="text-xs text-slate-500">
                Notices visible only to your enrolled students
              </p>
            </div>
            <Link
              href="/teacher/announcements"
              className="text-xs font-semibold text-[#026466] hover:underline"
            >
              Manage All →
            </Link>
          </div>

          <div className="mt-4 space-y-2.5">
            {initialClassAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="rounded-lg border border-[#FECDA5]/50 bg-[#FFF6EE]/40 p-3 hover:bg-[#FFF6EE] transition space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466]">
                      {ann.category}
                    </span>
                    <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-mono text-slate-700">
                      Target: {ann.targetSection}
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
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Academic Calendar & Deadlines */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-black">Faculty Reminders</h3>
            <span className="text-[10px] text-[#AF0606] font-bold uppercase">
              Action Due
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="rounded-lg border border-[#FECDA5] bg-[#FFF6EE] p-3 space-y-1">
              <div className="flex items-center justify-between text-[#AF0606] font-bold text-[11px]">
                <span>CAT-2 Mark Entry</span>
                <span className="font-mono">Sep 08</span>
              </div>
              <p className="text-[11px] text-black">
                Submit CAT-2 Cloud Computing (CSE-A & CSE-B) marks to the Exam
                Cell before 5:00 PM.
              </p>
            </div>

            <div className="rounded-lg border border-[#026466]/30 bg-[#E6F1F1] p-3 space-y-1">
              <div className="flex items-center justify-between text-[#026466] font-bold text-[11px]">
                <span>Proctor Review Meeting</span>
                <span className="font-mono">Sep 10</span>
              </div>
              <p className="text-[11px] text-black">
                Conduct monthly counseling for mentees with attendance &lt; 75%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
