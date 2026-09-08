"use client";

import React, { useState } from "react";
import {
  OFFICIAL_TIMETABLES,
  YEARS_LIST,
  SECTIONS_LIST,
  PERIOD_SLOTS,
  getTimetableByYearAndSection,
  SectionTimetableData,
} from "@/data/realTimetables";

export default function StudentTimetablePage() {
  const [selectedYear, setSelectedYear] = useState<string>("Year III");
  const [selectedSection, setSelectedSection] = useState<string>("A");
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [viewMode, setViewMode] = useState<"week" | "day">("week");

  const timetable: SectionTimetableData = getTimetableByYearAndSection(
    selectedYear,
    selectedSection
  );

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const currentDaySlots = timetable.schedule[selectedDay] || [];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Official College Timetable Header */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#E6F1F1] dark:bg-[#026466]/30 border border-[#026466]/30 px-2.5 py-0.5 text-xs font-bold text-[#026466] dark:text-teal-300 font-mono">
                {timetable.regulation}
              </span>
              <span className="rounded bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                Batch {timetable.batch}
              </span>
              <span className="rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                Odd Semester: {timetable.academicYear}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white pt-1">
              Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Department of Computer Science and Engineering •{" "}
              <span className="text-[#026466] dark:text-teal-400 font-bold">
                {timetable.year} ({timetable.semester}) — Section {timetable.section}
              </span>{" "}
              • Room:{" "}
              <strong className="text-slate-900 dark:text-white font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                {timetable.roomNo}
              </strong>
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center self-start lg:self-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-1 shadow-xs">
            <button
              onClick={() => setViewMode("week")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                viewMode === "week"
                  ? "bg-[#026466] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Full Week Matrix
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

      {/* 2. Year & Section Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Year Selector */}
        <div className="md:col-span-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
            Select Academic Year &amp; Semester:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {YEARS_LIST.map((y) => {
              const isSelected = selectedYear === y.key;
              return (
                <button
                  key={y.key}
                  onClick={() => setSelectedYear(y.key)}
                  className={`rounded-lg border p-2.5 text-left transition ${
                    isSelected
                      ? "border-[#026466] bg-[#E6F1F1] dark:bg-[#026466]/30 text-[#026466] dark:text-teal-300 ring-1 ring-[#026466]"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="font-bold text-xs">{y.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    Batch: {y.batch}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Selector */}
        <div className="md:col-span-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
            Select Section:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {SECTIONS_LIST.map((sec) => {
              const isSelected = selectedSection === sec;
              return (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  className={`rounded-lg border py-3 text-center transition ${
                    isSelected
                      ? "border-[#026466] bg-[#026466] text-white font-bold shadow-xs"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs"
                  }`}
                >
                  <span className="text-sm">Sec {sec}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Class Incharge & Mentors Card */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 md:p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Class Incharge
            </span>
            <p className="mt-1 font-bold text-slate-900 dark:text-white text-sm">
              {timetable.classIncharge}
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Allocated Mentors
            </span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {timetable.mentors.map((m, idx) => (
                <span
                  key={idx}
                  className="rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Designated Room &amp; Department
            </span>
            <p className="mt-1 font-mono font-bold text-[#026466] dark:text-teal-400 text-sm">
              Room {timetable.roomNo} • CSE Department
            </p>
          </div>
        </div>
      </div>

      {/* 4. Day Selector Tabs (if Day View) */}
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

      {/* 5. Matrix or Day Schedule */}
      {viewMode === "week" ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm overflow-x-auto">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Official 8-Period Weekly Matrix ({timetable.year} — Section {timetable.section})
            </h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="h-2.5 w-2.5 rounded-xs bg-[#E6F1F1] dark:bg-[#026466]/40 border border-[#026466]/30"></span>
                Theory
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="h-2.5 w-2.5 rounded-xs bg-[#FFF6EE] dark:bg-amber-950/40 border border-[#FECDA5]"></span>
                Laboratory / Project
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="h-2.5 w-2.5 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-300"></span>
                Break
              </span>
            </div>
          </div>

          <table className="w-full min-w-[1050px] text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-3 w-28 bg-slate-50 dark:bg-slate-800/50">Day</th>
                
                {/* Period 1 & 2 */}
                <th className="py-3 px-2 text-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div>1</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">08:05-08:55</div>
                </th>
                <th className="py-3 px-2 text-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div>2</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">08:55-09:45</div>
                </th>

                {/* FN Break Column */}
                <th className="py-3 px-1 text-center bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 w-12">
                  <div>FN</div>
                  <div>Break</div>
                </th>

                {/* Period 3 & 4 */}
                <th className="py-3 px-2 text-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div>3</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">10:00-10:50</div>
                </th>
                <th className="py-3 px-2 text-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div>4</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">10:50-11:40</div>
                </th>

                {/* Lunch Break Column */}
                <th className="py-3 px-1 text-center bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 w-14">
                  <div>Lunch</div>
                  <div>11:40-12:20</div>
                </th>

                {/* Period 5 & 6 */}
                <th className="py-3 px-2 text-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div>5</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">12:20-01:05</div>
                </th>
                <th className="py-3 px-2 text-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div>6</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">01:05-01:50</div>
                </th>

                {/* AN Break Column */}
                <th className="py-3 px-1 text-center bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 w-12">
                  <div>AN</div>
                  <div>Break</div>
                </th>

                {/* Period 7 & 8 */}
                <th className="py-3 px-2 text-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div>7</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">02:00-02:45</div>
                </th>
                <th className="py-3 px-2 text-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div>8</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">02:45-03:30</div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {days.map((dayName) => {
                const slots = timetable.schedule[dayName] || [];
                const p1 = slots.find((s) => s.periodNo === 1);
                const p2 = slots.find((s) => s.periodNo === 2);
                const p3 = slots.find((s) => s.periodNo === 3);
                const p4 = slots.find((s) => s.periodNo === 4);
                const p5 = slots.find((s) => s.periodNo === 5);
                const p6 = slots.find((s) => s.periodNo === 6);
                const p7 = slots.find((s) => s.periodNo === 7);
                const p8 = slots.find((s) => s.periodNo === 8);

                const renderSlotCell = (slot?: typeof p1) => {
                  if (!slot) {
                    return (
                      <div className="h-full min-h-[76px] rounded-lg border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                        Free
                      </div>
                    );
                  }
                  return (
                    <div
                      className={`h-full min-h-[76px] rounded-lg border p-2 flex flex-col justify-between transition hover:shadow-xs ${
                        slot.isLab
                          ? "border-[#FECDA5] dark:border-amber-800/50 bg-[#FFF6EE] dark:bg-amber-950/30 text-[#AF0606] dark:text-amber-300"
                          : "border-[#026466]/20 dark:border-teal-500/30 bg-[#E6F1F1] dark:bg-[#026466]/20 text-[#026466] dark:text-teal-300"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-[11px] leading-tight line-clamp-1">
                          {slot.shortCode || slot.subjectName}
                        </div>
                        <div className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mt-0.5 truncate">
                          {slot.subjectCode}
                        </div>
                      </div>

                      <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-1">
                        <span className="truncate max-w-[65px] font-medium" title={slot.faculty}>
                          {slot.faculty}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white font-mono shrink-0">
                          {slot.room}
                        </span>
                      </div>
                    </div>
                  );
                };

                return (
                  <tr
                    key={dayName}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition"
                  >
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white align-middle bg-slate-50/40 dark:bg-slate-800/20">
                      <span className="inline-block rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs shadow-2xs font-semibold">
                        {dayName}
                      </span>
                    </td>

                    {/* Periods 1 & 2 */}
                    <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p1)}</td>
                    <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p2)}</td>

                    {/* FN Break */}
                    <td className="py-2.5 px-1 text-center align-middle bg-slate-100/70 dark:bg-slate-800/70 text-[10px] text-slate-400 font-mono">
                      FN
                    </td>

                    {/* Periods 3 & 4 */}
                    <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p3)}</td>
                    <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p4)}</td>

                    {/* Lunch Break */}
                    <td className="py-2.5 px-1 text-center align-middle bg-slate-100/70 dark:bg-slate-800/70 text-[10px] text-slate-400 font-mono">
                      LUNCH
                    </td>

                    {/* Periods 5 & 6 */}
                    <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p5)}</td>
                    <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p6)}</td>

                    {/* AN Break */}
                    <td className="py-2.5 px-1 text-center align-middle bg-slate-100/70 dark:bg-slate-800/70 text-[10px] text-slate-400 font-mono">
                      AN
                    </td>

                    {/* Periods 7 & 8 */}
                    <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p7)}</td>
                    <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p8)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Single Day Detailed View */
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedDay}&apos;s Schedule
              </h3>
              <p className="text-xs text-slate-500">
                {timetable.year} • Section {timetable.section} • Room {timetable.roomNo}
              </p>
            </div>
            <span className="rounded bg-[#E6F1F1] dark:bg-[#026466]/30 text-[#026466] dark:text-teal-300 font-bold px-2.5 py-1 text-xs">
              8 Scheduled Periods
            </span>
          </div>

          <div className="space-y-3">
            {PERIOD_SLOTS.map((slot) => {
              const matchedAssignment = currentDaySlots.find(
                (s) => s.periodNo === slot.periodNo
              );

              return (
                <div
                  key={slot.periodNo}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-4 transition ${
                    matchedAssignment?.isLab
                      ? "border-[#FECDA5] dark:border-amber-800/40 bg-[#FFF6EE]/60 dark:bg-amber-950/20"
                      : matchedAssignment
                      ? "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40"
                      : "border-dashed border-slate-200 dark:border-slate-800 bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold font-mono text-slate-900 dark:text-white">
                      P{slot.periodNo}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {matchedAssignment?.subjectName || "Free / Independent Study"}
                        </span>
                        {matchedAssignment?.subjectCode && (
                          <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300 font-semibold">
                            {matchedAssignment.subjectCode}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Faculty:{" "}
                        <strong className="text-slate-800 dark:text-slate-200">
                          {matchedAssignment?.faculty || "N/A"}
                        </strong>{" "}
                        • Room:{" "}
                        <strong className="text-slate-800 dark:text-slate-200 font-mono">
                          {matchedAssignment?.room || timetable.roomNo}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
                      {slot.startTime} – {slot.endTime}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        matchedAssignment?.isLab
                          ? "bg-[#FFF6EE] dark:bg-amber-950 text-[#AF0606] dark:text-amber-300 border border-[#FECDA5]"
                          : matchedAssignment
                          ? "bg-[#E6F1F1] dark:bg-[#026466]/30 text-[#026466] dark:text-teal-300 border border-[#026466]/30"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {matchedAssignment?.isLab ? "Lab" : matchedAssignment ? "Theory" : "Free"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Official Subject & Faculty Reference Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Course &amp; Faculty Master Allocation List
            </h3>
            <p className="text-xs text-slate-500">
              Department of Computer Science and Engineering — {timetable.year} ({timetable.semester})
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#026466] dark:text-teal-400">
            Total Contact Hours: 40 Hrs / Week
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-800/40">
                <th className="py-2.5 px-3">Subject Code</th>
                <th className="py-2.5 px-3">Subject Name</th>
                <th className="py-2.5 px-2 text-center">Abb</th>
                <th className="py-2.5 px-2 text-center">L</th>
                <th className="py-2.5 px-2 text-center">T</th>
                <th className="py-2.5 px-2 text-center">P</th>
                <th className="py-2.5 px-2 text-center">C</th>
                <th className="py-2.5 px-2 text-center">Hrs/Wk</th>
                <th className="py-2.5 px-3">Name of the Faculty</th>
                <th className="py-2.5 px-3">Dept</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {timetable.subjects.map((sub, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-[#026466] dark:text-teal-300">
                    {sub.code}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                    {sub.name}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-slate-600 dark:text-slate-400 font-bold">
                    {sub.shortName}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-slate-600 dark:text-slate-400">{sub.l}</td>
                  <td className="py-2.5 px-2 text-center font-mono text-slate-600 dark:text-slate-400">{sub.t}</td>
                  <td className="py-2.5 px-2 text-center font-mono text-slate-600 dark:text-slate-400">{sub.p}</td>
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-900 dark:text-white">
                    {sub.c}
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-[#AF0606] dark:text-amber-400">
                    {sub.totalHours}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                    {sub.facultyName}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 font-mono">
                      {sub.department}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
