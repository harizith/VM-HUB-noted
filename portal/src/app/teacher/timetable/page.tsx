"use client";

import React, { useState } from "react";
import {
  getAllFacultyNames,
  getFacultyTeachingSchedule,
  PERIOD_SLOTS,
} from "@/data/realTimetables";

export default function TeacherTimetablePage() {
  const facultyNames = getAllFacultyNames();
  const [selectedFaculty, setSelectedFaculty] = useState<string>(
    facultyNames[0] || "Mr. R. Prabhakaran"
  );
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [viewMode, setViewMode] = useState<"week" | "day">("week");

  const facultySchedule = getFacultyTeachingSchedule(selectedFaculty);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Calculate total weekly periods for selected faculty
  const totalWeeklyPeriods = days.reduce(
    (acc, d) => acc + (facultySchedule[d]?.length || 0),
    0
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#E6F1F1] dark:bg-[#026466]/30 border border-[#026466]/30 px-2.5 py-0.5 text-xs font-bold text-[#026466] dark:text-teal-300 font-mono">
                Faculty Schedule
              </span>
              <span className="rounded bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Department of Computer Science &amp; Engineering
              </span>
              <span className="rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/40 px-2.5 py-0.5 text-xs font-bold text-teal-800 dark:text-teal-300">
                Odd Semester July 2026 – Nov 2026
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white pt-1">
              Teaching Timetable &amp; Laboratory Workload
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Current Faculty: <strong className="text-slate-900 dark:text-white">{selectedFaculty}</strong> • Total Contact Hours:{" "}
              <strong className="text-[#026466] dark:text-teal-400 font-mono">{totalWeeklyPeriods} Periods / Week</strong>
            </p>
          </div>

          <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-1 shadow-xs">
            <button
              onClick={() => setViewMode("week")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                viewMode === "week"
                  ? "bg-[#026466] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Full Week Overview
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                viewMode === "day"
                  ? "bg-[#026466] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Day-by-Day View
            </button>
          </div>
        </div>
      </div>

      {/* 2. Faculty Switcher Bar */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 md:p-5 shadow-sm space-y-3">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
          Select Faculty Profile to Inspect Workload:
        </label>
        <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
          {facultyNames.map((fName) => {
            const isSelected = selectedFaculty === fName;
            return (
              <button
                key={fName}
                onClick={() => setSelectedFaculty(fName)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  isSelected
                    ? "border-[#026466] bg-[#E6F1F1] dark:bg-[#026466]/30 text-[#026466] dark:text-teal-300 font-bold ring-1 ring-[#026466]"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {fName}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Day Selector Tabs (if Day View) */}
      {viewMode === "day" && (
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`rounded-lg border px-4 py-2 text-xs font-bold transition ${
                selectedDay === day
                  ? "border-[#026466] bg-[#026466] text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {/* 4. Week Schedule vs Day View */}
      {viewMode === "week" ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Weekly Class Allocation for {selectedFaculty}
              </h3>
              <p className="text-xs text-slate-500">
                Official Department Timetable distribution across Year II, III, &amp; IV
              </p>
            </div>
            <span className="rounded bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-bold font-mono text-[#026466] dark:text-teal-300">
              {totalWeeklyPeriods} Total Slots
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {days.map((d) => {
              const assigned = facultySchedule[d] || [];
              return (
                <div
                  key={d}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-3.5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{d}</span>
                    <span className="rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 text-[10px] font-bold text-[#026466] dark:text-teal-300 font-mono">
                      {assigned.length} Periods
                    </span>
                  </div>

                  {assigned.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400 italic">
                      No classes scheduled
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {assigned.map((slot, idx) => (
                        <div
                          key={idx}
                          className={`rounded-lg border p-2.5 text-xs space-y-1 transition hover:shadow-xs ${
                            slot.isLab
                              ? "border-[#FECDA5] dark:border-amber-800/40 bg-[#FFF6EE] dark:bg-amber-950/30 text-[#AF0606] dark:text-amber-300"
                              : "border-[#026466]/20 dark:border-teal-500/30 bg-white dark:bg-slate-900 text-[#026466] dark:text-teal-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold font-mono text-[10px] text-slate-900 dark:text-white">
                              Period {slot.periodNo} ({slot.timeSlot})
                            </span>
                            <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 text-[9px] font-mono font-bold text-slate-700 dark:text-slate-300">
                              {slot.room}
                            </span>
                          </div>
                          <div className="font-bold text-[11px] text-slate-900 dark:text-white line-clamp-1">
                            {slot.shortCode || slot.subjectName}
                          </div>
                          <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium flex items-center justify-between">
                            <span>{slot.year} — Sec {slot.section}</span>
                            <span className="font-mono text-[9px]">{slot.subjectCode}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Day View */
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedDay}&apos;s Class Schedule for {selectedFaculty}
              </h3>
              <p className="text-xs text-slate-500">
                Detailed timeline view for the selected day
              </p>
            </div>
            <span className="rounded bg-[#E6F1F1] dark:bg-[#026466]/30 text-[#026466] dark:text-teal-300 font-bold px-2.5 py-1 text-xs">
              {facultySchedule[selectedDay]?.length || 0} Teaching Sessions
            </span>
          </div>

          <div className="space-y-3">
            {PERIOD_SLOTS.map((period) => {
              const matched = (facultySchedule[selectedDay] || []).find(
                (s) => s.periodNo === period.periodNo
              );

              return (
                <div
                  key={period.periodNo}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-4 transition ${
                    matched?.isLab
                      ? "border-[#FECDA5] dark:border-amber-800/40 bg-[#FFF6EE]/60 dark:bg-amber-950/20"
                      : matched
                      ? "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
                      : "border-dashed border-slate-200 dark:border-slate-800 bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold font-mono text-slate-900 dark:text-white">
                      P{period.periodNo}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {matched?.subjectName || "No Class Scheduled (Free / Research)"}
                        </span>
                        {matched?.subjectCode && (
                          <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300 font-semibold">
                            {matched.subjectCode}
                          </span>
                        )}
                      </div>
                      {matched ? (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Target: <strong className="text-slate-800 dark:text-slate-200">{matched.year} (Section {matched.section})</strong> • Room:{" "}
                          <strong className="text-slate-800 dark:text-slate-200 font-mono">{matched.room}</strong>
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 mt-0.5">
                          Available for proctoring / student consultations / grading
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
                      {period.startTime} – {period.endTime}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        matched?.isLab
                          ? "bg-[#FFF6EE] dark:bg-amber-950 text-[#AF0606] dark:text-amber-300 border border-[#FECDA5]"
                          : matched
                          ? "bg-[#E6F1F1] dark:bg-[#026466]/30 text-[#026466] dark:text-teal-300 border border-[#026466]/30"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {matched?.isLab ? "Lab" : matched ? "Theory" : "Available"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
