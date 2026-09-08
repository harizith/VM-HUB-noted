"use client";

import React, { useState } from "react";
import { useApp, AttendanceStatus } from "@/context/AppContext";

export default function TeacherAttendancePage() {
  const { courses, users, commitAttendanceSession, currentUser } = useApp();

  const myCourses = courses.filter((c) => c.department === "CSE" || c.instructorName.includes(currentUser.name));
  const activeCourseList = myCourses.length > 0 ? myCourses : courses;

  const [selectedCourseCode, setSelectedCourseCode] = useState(activeCourseList[0]?.code || "21CS601");
  const [selectedSection, setSelectedSection] = useState("CSE-A");
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter students for section
  const sectionStudents = users.filter(
    (u) => u.role === "STUDENT" && (u.section === selectedSection || !u.section)
  );

  // Local state for attendance records
  const [attendanceRecords, setAttendanceRecords] = useState<{ [studentId: string]: AttendanceStatus }>(() => {
    const initial: { [studentId: string]: AttendanceStatus } = {};
    sectionStudents.forEach((s) => {
      initial[s.id] = "Present";
    });
    return initial;
  });

  const handleStatusToggle = (studentId: string, status: AttendanceStatus) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const updated: { [studentId: string]: AttendanceStatus } = {};
    sectionStudents.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceRecords(updated);
  };

  // Metrics
  const totalCount = sectionStudents.length;
  const presentCount = sectionStudents.filter((s) => (attendanceRecords[s.id] || "Present") === "Present").length;
  const absentCount = sectionStudents.filter((s) => attendanceRecords[s.id] === "Absent").length;
  const lateCount = sectionStudents.filter((s) => attendanceRecords[s.id] === "Late").length;
  const odCount = sectionStudents.filter((s) => attendanceRecords[s.id] === "OD").length;
  const effectivePresent = presentCount + odCount + lateCount;
  const sessionRate = totalCount > 0 ? ((effectivePresent / totalCount) * 100).toFixed(0) : "0";

  // Period time slots
  const periodSlots: { [key: number]: string } = {
    1: "08:45 - 09:35",
    2: "09:35 - 10:25",
    3: "10:45 - 11:35",
    4: "11:35 - 12:25",
    5: "01:15 - 02:05",
    6: "02:05 - 02:55",
    7: "03:05 - 03:55",
  };

  // Commit session to persistent ledger
  const handleCommitSession = () => {
    const currentCourse = activeCourseList.find((c) => c.code === selectedCourseCode) || activeCourseList[0];

    const records = sectionStudents.map((s) => ({
      studentId: s.id,
      regNo: s.rollNo || s.regNo || "22104101",
      name: s.name,
      status: attendanceRecords[s.id] || "Present",
    }));

    commitAttendanceSession({
      courseCode: currentCourse?.code || selectedCourseCode,
      courseTitle: currentCourse?.title || "Cloud Computing",
      section: selectedSection,
      date: selectedDate,
      period: Number(selectedPeriod),
      periodLabel: periodSlots[selectedPeriod] || "Period Slot",
      instructorName: currentUser.name,
      records,
      presentCount,
      absentCount,
      lateCount,
      odCount,
      totalCount,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 5000);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const currentCourse = activeCourseList.find((c) => c.code === selectedCourseCode);
    const headers = ["Register Number", "Student Name", "Section", "Subject Code", "Subject Title", "Date", "Period", "Status"];
    const rows = sectionStudents.map((s) => [
      s.rollNo || s.regNo || "22104101",
      `"${s.name}"`,
      selectedSection,
      currentCourse?.code || selectedCourseCode,
      `"${currentCourse?.title || "Course"}"`,
      selectedDate,
      `Period ${selectedPeriod} (${periodSlots[selectedPeriod]})`,
      attendanceRecords[s.id] || "Present",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Attendance_${selectedCourseCode}_${selectedSection}_${selectedDate}_P${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Fast Roll Call & Period Attendance Ledger
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            One-tap status logging (Present, Absent, Late, OD), instant CSV export, and permanent session commitment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 transition"
          >
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export to CSV
          </button>

          <button
            onClick={handleCommitSession}
            className="flex items-center gap-1.5 rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
          >
            <span>✓ Commit Session</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="rounded-xl border border-[#026466]/40 bg-[#E6F1F1] dark:bg-teal-950 p-4 text-xs font-bold text-[#026466] dark:text-teal-400 flex items-center justify-between animate-fadeIn shadow-xs">
          <span>✓ Period {selectedPeriod} session committed to institutional audit ledger and student records!</span>
          <span className="text-[10px] font-mono">Synced</span>
        </div>
      )}

      {/* 2. Selection & Filter Toolbar */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1">Subject</label>
            <select
              value={selectedCourseCode}
              onChange={(e) => setSelectedCourseCode(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
            >
              {activeCourseList.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.code} - {c.title} ({c.section})
                </option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
            >
              <option value="CSE-A">CSE-A (3rd Year)</option>
              <option value="CSE-B">CSE-B (3rd Year)</option>
            </select>
          </div>

          {/* Period Slot */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1">Period Hour</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none font-mono"
            >
              {Object.entries(periodSlots).map(([p, label]) => (
                <option key={p} value={p}>
                  Period {p} ({label})
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-900 dark:text-white mb-1">Session Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3. Live Session Metrics Counter */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Total Enrolled</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">{totalCount}</p>
        </div>

        <div className="rounded-xl border border-[#026466]/30 dark:border-teal-800 bg-[#E6F1F1] dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-[#026466] dark:text-teal-400">Present</span>
          <p className="text-2xl font-bold text-[#026466] dark:text-teal-400 font-mono mt-0.5">{presentCount}</p>
        </div>

        <div className="rounded-xl border border-[#AF0606]/30 dark:border-rose-900/50 bg-[#FDE8E8] dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-[#AF0606] dark:text-rose-400">Absent</span>
          <p className="text-2xl font-bold text-[#AF0606] dark:text-rose-400 font-mono mt-0.5">{absentCount}</p>
        </div>

        <div className="rounded-xl border border-amber-300 dark:border-amber-900/50 bg-amber-50 dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">Late / OD</span>
          <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 font-mono mt-0.5">{lateCount + odCount}</p>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-slate-900 dark:text-amber-200">Session Rate</span>
          <p className="text-2xl font-bold text-[#026466] dark:text-teal-400 font-mono mt-0.5">{sessionRate}%</p>
        </div>
      </div>

      {/* 4. Student Roster Roll Call Matrix */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Roll Call Roster • {selectedSection}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              1-tap buttons to set Present, Absent, Late, or On-Duty (OD).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMarkAll("Present")}
              className="rounded-lg border border-[#026466]/40 bg-[#E6F1F1] dark:bg-teal-950 px-3 py-1.5 text-xs font-bold text-[#026466] dark:text-teal-400 hover:bg-[#026466] hover:text-white transition"
            >
              ✓ Mark All Present
            </button>
            <button
              onClick={() => handleMarkAll("Absent")}
              className="rounded-lg border border-[#AF0606]/40 bg-[#FDE8E8] dark:bg-rose-950 px-3 py-1.5 text-xs font-bold text-[#AF0606] dark:text-rose-400 hover:bg-[#AF0606] hover:text-white transition"
            >
              ✕ Mark All Absent
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Reg No</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3 text-center">Aggregate Att %</th>
                <th className="py-3 px-3 text-center">1-Tap Roll Call Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sectionStudents.map((student) => {
                const currentStatus = attendanceRecords[student.id] || "Present";

                return (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="py-3 px-3 font-mono text-slate-800 dark:text-slate-200 font-bold">
                      {student.rollNo || student.regNo}
                    </td>

                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                      <div>{student.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{student.email}</div>
                    </td>

                    <td className="py-3 px-3 text-center font-mono">
                      <span
                        className={`inline-flex rounded px-2 py-0.5 text-xs font-bold ${
                          (student.attendancePercent || 0) >= 75
                            ? "text-[#026466] bg-[#E6F1F1] dark:bg-teal-950 dark:text-teal-400"
                            : "text-[#AF0606] bg-[#FDE8E8] dark:bg-rose-950 dark:text-rose-400"
                        }`}
                      >
                        {student.attendancePercent?.toFixed(1) || "85.0"}%
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student.id, "Present")}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                            currentStatus === "Present"
                              ? "bg-[#026466] text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          Present
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student.id, "Absent")}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                            currentStatus === "Absent"
                              ? "bg-[#AF0606] text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          Absent
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student.id, "Late")}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                            currentStatus === "Late"
                              ? "bg-amber-500 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          Late
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusToggle(student.id, "OD")}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                            currentStatus === "OD"
                              ? "bg-[#FECDA5] text-black border border-[#FECDA5] shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          OD
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Submit Bottom Bar */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleCommitSession}
            className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition"
          >
            ✓ Commit & Finalize Attendance Session
          </button>
        </div>
      </div>
    </div>
  );
}
