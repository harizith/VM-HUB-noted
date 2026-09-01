"use client";

import React, { useState } from "react";
import {
  teacherCourses,
  initialStudentRoster,
  StudentRosterItem,
} from "@/lib/teacherMockData";

export default function TeacherAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState(teacherCourses[0].code);
  const [selectedSection, setSelectedSection] = useState("CSE-A");
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [selectedDate, setSelectedDate] = useState("2026-09-01");
  const [students, setStudents] = useState<StudentRosterItem[]>(initialStudentRoster);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Toggle status for a student
  const handleStatusChange = (
    studentId: string,
    newStatus: "Present" | "Absent" | "OD"
  ) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status: newStatus } : s))
    );
  };

  // Quick Action: Mark All Present
  const handleMarkAll = (status: "Present" | "Absent") => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  // Metrics
  const totalCount = students.length;
  const presentCount = students.filter((s) => s.status === "Present").length;
  const absentCount = students.filter((s) => s.status === "Absent").length;
  const odCount = students.filter((s) => s.status === "OD").length;
  const sessionPercent = totalCount > 0 ? ((presentCount + odCount) / totalCount) * 100 : 0;

  const handleSaveAttendance = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
            Daily Attendance Entry
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Record, toggle, and log period-wise attendance for your assigned sections.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 rounded-lg bg-[#E6F1F1] border border-[#026466]/30 px-3.5 py-1.5 text-xs font-bold text-[#026466] animate-fadeIn">
            <span>Attendance Logged Successfully!</span>
          </div>
        )}
      </div>

      {/* 2. Selection & Filter Toolbar */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Course Selector */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Subject
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none"
            >
              {teacherCourses.map((c) => (
                <option key={`${c.code}-${c.section}`} value={c.code}>
                  {c.code} - {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Section Selector */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none"
            >
              <option value="CSE-A">CSE-A (3rd Year)</option>
              <option value="CSE-B">CSE-B (3rd Year)</option>
            </select>
          </div>

          {/* Period Selector */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Period Slot
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none"
            >
              <option value={1}>Period 1 (08:45 - 09:35)</option>
              <option value={2}>Period 2 (09:35 - 10:25)</option>
              <option value={3}>Period 3 (10:45 - 11:35)</option>
              <option value={4}>Period 4 (11:35 - 12:25)</option>
              <option value={5}>Period 5 (01:15 - 02:05)</option>
              <option value={6}>Period 6 (02:05 - 02:55)</option>
              <option value={7}>Period 7 (03:05 - 03:55)</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Session Attendance Live Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-[11px] font-semibold text-slate-600">Total Enrolled</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">{totalCount}</p>
        </div>

        <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-[#026466]">Present</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">{presentCount}</p>
        </div>

        <div className="rounded-xl border border-[#AF0606]/30 bg-[#FDE8E8] p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-[#AF0606]">Absent</span>
          <p className="text-2xl font-bold text-[#AF0606] font-mono mt-0.5">{absentCount}</p>
        </div>

        <div className="rounded-xl border border-[#FECDA5] bg-[#FFF6EE] p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-black">Session Rate</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">
            {sessionPercent.toFixed(0)}%
          </p>
        </div>
      </div>

      {/* 4. Student Roster Attendance Marking Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-black">
              Student Attendance Roster • {selectedSection}
            </h3>
            <p className="text-xs text-slate-500">
              Click individual status buttons or use the batch shortcuts below.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMarkAll("Present")}
              className="rounded-lg border border-[#026466]/40 bg-[#E6F1F1] px-3 py-1.5 text-xs font-semibold text-[#026466] hover:bg-[#026466] hover:text-white transition"
            >
              Mark All Present
            </button>
            <button
              onClick={() => handleMarkAll("Absent")}
              className="rounded-lg border border-[#AF0606]/40 bg-[#FDE8E8] px-3 py-1.5 text-xs font-semibold text-[#AF0606] hover:bg-[#AF0606] hover:text-white transition"
            >
              Clear / Mark Absent
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Reg No</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3 text-center">Aggregate Att %</th>
                <th className="py-3 px-3 text-center">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-mono text-slate-800 font-medium">
                    {student.regNo}
                  </td>
                  <td className="py-3 px-3 font-semibold text-black">
                    {student.name}
                  </td>
                  <td className="py-3 px-3 text-center font-mono">
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-xs font-bold ${
                        student.attendancePercent >= 75
                          ? "text-[#026466] bg-[#E6F1F1] border border-[#026466]/30"
                          : "text-[#AF0606] bg-[#FDE8E8] border border-[#AF0606]/30"
                      }`}
                    >
                      {student.attendancePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleStatusChange(student.id, "Present")}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                          student.status === "Present"
                            ? "bg-[#026466] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Present
                      </button>

                      <button
                        onClick={() => handleStatusChange(student.id, "Absent")}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                          student.status === "Absent"
                            ? "bg-[#AF0606] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Absent
                      </button>

                      <button
                        onClick={() => handleStatusChange(student.id, "OD")}
                        className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                          student.status === "OD"
                            ? "bg-[#FECDA5] text-black font-bold border border-[#FECDA5] shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        OD
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Attendance Button */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
          <button
            onClick={handleSaveAttendance}
            className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition"
          >
            Submit & Finalize Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
