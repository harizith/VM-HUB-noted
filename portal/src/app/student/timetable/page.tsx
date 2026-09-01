"use client";

import React, { useState } from "react";
import {
  branches,
  Branch,
  studentProfile,
  getTimetableForBranch,
  DaySchedule,
} from "@/lib/studentMockData";

export default function TimetablePage() {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(studentProfile.branch);
  const [selectedDay, setSelectedDay] = useState<DaySchedule["day"]>("Monday");
  const [viewMode, setViewMode] = useState<"week" | "day">("week");

  const activeBranchInfo = branches[selectedBranch];
  const activeTimetable = getTimetableForBranch(selectedBranch);
  const currentDayData = activeTimetable.find((d) => d.day === selectedDay);

  const days: Array<DaySchedule["day"]> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const branchKeys = Object.keys(branches) as Branch[];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
              Class Timetable
            </h1>
            <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466] font-mono">
              {activeBranchInfo.code}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {activeBranchInfo.fullName} • Classroom: <strong className="text-black font-mono">{activeBranchInfo.classroom}</strong>
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1 shadow-xs">
          <button
            onClick={() => setViewMode("week")}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
              viewMode === "week"
                ? "bg-[#026466] text-white shadow-xs"
                : "text-slate-600 hover:text-black"
            }`}
          >
            Full Week View
          </button>
          <button
            onClick={() => setViewMode("day")}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
              viewMode === "day"
                ? "bg-[#026466] text-white shadow-xs"
                : "text-slate-600 hover:text-black"
            }`}
          >
            Day-by-Day View
          </button>
        </div>
      </div>

      {/* 2. Branch Filter Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-black">
          <span>Select Branch:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {branchKeys.map((b) => {
            const isSelected = selectedBranch === b;
            return (
              <button
                key={b}
                onClick={() => setSelectedBranch(b)}
                className={`rounded-lg border px-3 py-1 text-xs font-bold font-mono transition ${
                  isSelected
                    ? "border-[#026466] bg-[#E6F1F1] text-[#026466]"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-black"
                }`}
              >
                {b}
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
              className={`rounded-lg border px-4 py-1.5 text-xs font-semibold transition ${
                selectedDay === day
                  ? "border-[#026466] bg-[#026466] text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {/* 4. Full Week Matrix View */}
      {viewMode === "week" ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3 w-28">Day</th>
                <th className="py-3 px-2 text-center">
                  <div>Period 1</div>
                  <div className="text-[10px] text-slate-400 font-normal">08:45-09:35</div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div>Period 2</div>
                  <div className="text-[10px] text-slate-400 font-normal">09:35-10:25</div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div>Period 3</div>
                  <div className="text-[10px] text-slate-400 font-normal">10:45-11:35</div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div>Period 4</div>
                  <div className="text-[10px] text-slate-400 font-normal">11:35-12:25</div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div>Period 5</div>
                  <div className="text-[10px] text-slate-400 font-normal">01:15-02:05</div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div>Period 6</div>
                  <div className="text-[10px] text-slate-400 font-normal">02:05-02:55</div>
                </th>
                <th className="py-3 px-2 text-center">
                  <div>Period 7</div>
                  <div className="text-[10px] text-slate-400 font-normal">03:05-03:55</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTimetable.map((schedule) => (
                <tr key={schedule.day} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-3 font-bold text-black align-middle">
                    <span className="inline-block rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs">
                      {schedule.day}
                    </span>
                  </td>

                  {schedule.slots.map((slot) => (
                    <td key={slot.period} className="py-2.5 px-1 text-center align-top">
                      <div
                        className={`h-full min-h-[76px] rounded-lg border p-2 flex flex-col justify-between transition ${
                          slot.type === "lab"
                            ? "border-[#FECDA5] bg-[#FFF6EE] text-[#AF0606]"
                            : slot.type === "theory"
                            ? "border-[#026466]/20 bg-[#E6F1F1] text-[#026466]"
                            : "border-slate-200 bg-slate-50 text-black"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-[11px] leading-tight truncate">
                            {slot.courseTitle}
                          </div>
                          <div className="text-[10px] text-slate-600 font-mono mt-0.5">
                            {slot.courseCode}
                          </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[9px] text-slate-500 border-t border-slate-200/60 pt-1">
                          <span className="truncate max-w-[55px]">{slot.faculty}</span>
                          <span className="font-bold text-black font-mono">{slot.room}</span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* 5. Single Day Detailed View */
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-black">
                {selectedBranch} • {selectedDay} Schedule
              </h3>
              <p className="text-xs text-slate-500">{activeBranchInfo.fullName}</p>
            </div>
            <span className="text-xs text-[#026466] font-bold">7 Periods</span>
          </div>

          <div className="space-y-2.5">
            {currentDayData?.slots.map((slot) => (
              <div
                key={slot.period}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-slate-100 bg-slate-50 p-3.5 hover:bg-slate-100/70 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 font-mono text-sm font-bold text-black">
                    P{slot.period}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-black">{slot.courseTitle}</h4>
                      <span className="text-xs font-mono text-[#026466] font-bold">
                        ({slot.courseCode})
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Faculty: <span className="text-black font-medium">{slot.faculty}</span> • Room:{" "}
                      <span className="font-bold text-black font-mono">{slot.room}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className="rounded bg-white border border-slate-200 px-2.5 py-1 text-xs font-mono text-slate-700">
                    {slot.time}
                  </span>
                  <span
                    className={`rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                      slot.type === "lab"
                        ? "bg-[#FFF6EE] text-[#AF0606] border border-[#FECDA5]"
                        : "bg-[#E6F1F1] text-[#026466] border border-[#026466]/30"
                    }`}
                  >
                    {slot.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
