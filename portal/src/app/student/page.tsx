import React from "react";
import Link from "next/link";
import {
  studentProfile,
  attendanceData,
  internalMarksData,
  getTodayPeriodsForBranch,
  announcementsData,
} from "@/lib/studentMockData";
import StatCard from "@/components/student/StatCard";
import AttendanceMeter from "@/components/student/AttendanceMeter";

export default function StudentDashboardPage() {
  // Calculate average attendance
  const totalClasses = attendanceData.reduce((acc, curr) => acc + curr.totalHours, 0);
  const totalAttended = attendanceData.reduce((acc, curr) => acc + curr.attendedHours, 0);
  const overallAttendance = (totalAttended / totalClasses) * 100;

  // Subjects below 75%
  const criticalSubjects = attendanceData.filter((s) => s.percentage < 75);

  // Today's timetable dynamically fetched from student's branch
  const todayDay = "Monday";
  const todaySchedule = getTodayPeriodsForBranch(studentProfile.branch, todayDay);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Student Hero Profile Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-0.5 text-xs font-semibold text-[#026466]">
              <span>{studentProfile.degree} {studentProfile.department}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
              Welcome back, {studentProfile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span>
                Reg No: <strong className="text-black font-mono">{studentProfile.registerNumber}</strong>
              </span>
              <span>•</span>
              <span>
                Semester: <strong className="text-black">{studentProfile.semester} ({studentProfile.section})</strong>
              </span>
              <span>•</span>
              <span>
                Mentor: <strong className="text-black">{studentProfile.mentor}</strong>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/student/attendance"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-black hover:bg-[#FFF6EE] hover:border-[#FECDA5] transition"
            >
              View Attendance
            </Link>
            <Link
              href="/student/courses"
              className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
            >
              Internal Marks
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Academic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Attendance"
          value={`${overallAttendance.toFixed(1)}%`}
          subtitle={`${totalAttended} of ${totalClasses} total hours`}
          badge={{
            text: overallAttendance >= 75 ? "Eligible for Exams" : "Warning: Below 75%",
            type: overallAttendance >= 75 ? "bluestone" : "danger",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatCard
          title="Cumulative GPA"
          value={studentProfile.cgpa.toFixed(2)}
          subtitle="Out of 10.0 scale"
          badge={{
            text: "First Class with Distinction",
            type: "peach",
          }}
          icon={
            <svg className="w-5 h-5 text-[#AF0606]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
        />

        <StatCard
          title="Degree Credits"
          value={`${studentProfile.completedCredits} / ${studentProfile.totalCredits}`}
          subtitle={`${((studentProfile.completedCredits / studentProfile.totalCredits) * 100).toFixed(0)}% Completion`}
          badge={{
            text: "On Track",
            type: "info",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />

        <StatCard
          title="Active Courses"
          value={attendanceData.length}
          subtitle="Semester VI Registered"
          badge={{
            text: "5 Theory • 2 Labs",
            type: "info",
          }}
          icon={
            <svg className="w-5 h-5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />
      </div>

      {/* 3. Main Two-Column Section: Today's Schedule & Attendance Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Class Schedule */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-black">Today&apos;s Class Schedule</h3>
                <p className="text-xs text-slate-500">Monday • 7 Periods</p>
              </div>
              <Link
                href="/student/timetable"
                className="text-xs font-semibold text-[#026466] hover:underline"
              >
                Full Week Timetable →
              </Link>
            </div>

            {/* Schedule List */}
            <div className="mt-4 space-y-2">
              {todaySchedule.slice(0, 5).map((slot) => (
                <div
                  key={slot.period}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 hover:bg-slate-100/70 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white border border-slate-200 text-xs font-bold font-mono text-black">
                      P{slot.period}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-black">
                          {slot.courseTitle}
                        </span>
                        <span className="text-[10px] font-mono text-[#026466] font-semibold">
                          ({slot.courseCode})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        {slot.faculty} • <span className="text-black font-semibold">{slot.room}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="text-xs font-mono text-slate-700 font-medium">
                      {slot.time}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        slot.type === "lab"
                          ? "bg-[#FFF6EE] text-[#AF0606] border border-[#FECDA5]"
                          : slot.type === "theory"
                          ? "bg-[#E6F1F1] text-[#026466] border border-[#026466]/30"
                          : "bg-slate-100 text-slate-800 border border-slate-200"
                      }`}
                    >
                      {slot.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Next break: 12:25 PM (Lunch Break)</span>
            <span>Classes end at 03:55 PM</span>
          </div>
        </div>

        {/* Right Col: Quick Attendance Health Meter & Alerts */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-black">Attendance Meter</h3>
              <Link href="/student/attendance" className="text-xs font-semibold text-[#026466] hover:underline">
                Details →
              </Link>
            </div>

            <div className="my-4">
              <AttendanceMeter percentage={overallAttendance} size={140} strokeWidth={10} />
            </div>

            {/* Critical alert banner if any subject < 75% */}
            {criticalSubjects.length > 0 ? (
              <div className="rounded-lg border border-[#AF0606]/30 bg-[#FDE8E8] p-3 text-xs text-[#AF0606]">
                <div className="flex items-start gap-2">
                  <div>
                    <p className="font-bold text-[#AF0606]">Attendance Warning</p>
                    <p className="mt-0.5 text-[11px] text-black leading-relaxed">
                      You are below 75% in <strong className="text-[#AF0606]">{criticalSubjects[0].courseTitle}</strong> ({criticalSubjects[0].percentage}%).
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-[#026466]/30 bg-[#E6F1F1] p-3 text-xs text-[#026466]">
                <p className="font-bold text-[#026466]">All Subjects Above 75%</p>
                <p className="text-[11px] text-slate-800 mt-0.5">
                  You are eligible for all end-semester examinations without proctor condonation.
                </p>
              </div>
            )}
          </div>

          {/* Quick Summary of All Courses */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Quick Subject Breakdown
            </p>
            {attendanceData.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <span className="text-black truncate max-w-[160px]">{item.courseTitle}</span>
                <span
                  className={`font-mono font-bold ${
                    item.percentage >= 75 ? "text-[#026466]" : "text-[#AF0606]"
                  }`}
                >
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Announcements & Recent Assessment Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Latest Internal Marks */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-black">Internal Assessment Highlights</h3>
              <p className="text-xs text-slate-500">Continuous Assessment Tests (CAT-1 & CAT-2)</p>
            </div>
            <Link href="/student/courses" className="text-xs font-semibold text-[#026466] hover:underline">
              All Courses & Marks →
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Subject</th>
                  <th className="pb-3 text-center">CAT-1 (/50)</th>
                  <th className="pb-3 text-center">CAT-2 (/50)</th>
                  <th className="pb-3 text-center">Model (/100)</th>
                  <th className="pb-3 text-center">Internal (/50)</th>
                  <th className="pb-3 text-center pr-2">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {internalMarksData.slice(0, 5).map((mark) => (
                  <tr key={mark.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 pl-2 font-semibold text-black">
                      <div>{mark.courseTitle}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{mark.courseCode}</div>
                    </td>
                    <td className="py-3 text-center font-mono text-slate-800">{mark.cat1.score}</td>
                    <td className="py-3 text-center font-mono text-slate-800">{mark.cat2.score}</td>
                    <td className="py-3 text-center font-mono text-slate-800">{mark.modelExam.score}</td>
                    <td className="py-3 text-center font-mono font-bold text-black">
                      {mark.totalInternal.toFixed(1)}
                    </td>
                    <td className="py-3 text-center pr-2">
                      <span className="inline-flex rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 font-bold text-[#026466] font-mono text-[11px]">
                        {mark.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Announcements */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-black">Academic Circulars</h3>
            <span className="text-[10px] font-bold text-[#AF0606] uppercase">Notices</span>
          </div>

          <div className="space-y-3">
            {announcementsData.map((ann) => (
              <div
                key={ann.id}
                className="rounded-lg border border-[#FECDA5]/50 bg-[#FFF6EE]/40 p-3 hover:bg-[#FFF6EE] transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466]">
                    {ann.category}
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono">{ann.date}</span>
                </div>
                <h4 className="mt-2 text-xs font-bold text-black leading-snug">{ann.title}</h4>
                <p className="mt-1 text-[11px] text-slate-700 line-clamp-2 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
