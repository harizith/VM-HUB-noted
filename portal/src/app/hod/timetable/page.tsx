"use client";

import React, { useState } from "react";
import {
  OFFICIAL_TIMETABLES,
  YEARS_LIST,
  SECTIONS_LIST,
  PERIOD_SLOTS,
  getTimetableByYearAndSection,
  getAllFacultyNames,
  getFacultyTeachingSchedule,
  SectionTimetableData,
} from "@/data/realTimetables";

const liveFacilityStatus = [
  { room: "Room N 201", type: "Lecture Hall", assignedTo: "Year II - Sec A & B", status: "In Session", subject: "OOPS (Mr. R. Prabhakaran)" },
  { room: "Room N 203", type: "Lecture Hall", assignedTo: "Year II - Sec C", status: "In Session", subject: "DS (Dr. E. Mercy Beulah)" },
  { room: "Room N 204", type: "Lecture Hall", assignedTo: "Year III - Sec A", status: "In Session", subject: "AI&ML (Mr. R. Harini)" },
  { room: "Room N 205", type: "Lecture Hall", assignedTo: "Year III - Sec B", status: "In Session", subject: "Compiler Design (Ms. R. Chandra)" },
  { room: "Room N 206", type: "Lecture Hall", assignedTo: "Year III - Sec C", status: "In Session", subject: "ES&IoT (Dr. R. Saravanan)" },
  { room: "Room I 305", type: "Lecture Hall", assignedTo: "Year IV - Sec A", status: "In Session", subject: "PEHV (Dr. M. Buvana)" },
  { room: "Room I 306", type: "Lecture Hall", assignedTo: "Year IV - Sec B", status: "In Session", subject: "SPM (Dr. E. Mercy Beulah)" },
  { room: "Room J 301", type: "Lecture Hall", assignedTo: "Year IV - Sec C", status: "In Session", subject: "PEHV (Ms. M. Aswin Rani)" },
  { room: "BAY 3 LAB", type: "Computer Lab", assignedTo: "Year II / IV Labs", status: "Active Lab Session", subject: "DS/DPCO & Project Labs" },
  { room: "BAY 4 LAB", type: "Computer Lab", assignedTo: "Year II / III Labs", status: "Active Lab Session", subject: "PQT / PE Labs" },
];

export default function HODTimetablePage() {
  const [selectedYear, setSelectedYear] = useState<string>("Year III");
  const [selectedSection, setSelectedSection] = useState<string>("A");
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [viewMode, setViewMode] = useState<"week" | "facility">("week");

  const timetable: SectionTimetableData = getTimetableByYearAndSection(
    selectedYear,
    selectedSection
  );

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. HOD Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-0.5 text-xs font-bold text-[#026466] font-mono">
                Department of CSE
              </span>
              <span className="rounded bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                Odd Semester July 2026 – Nov 2026
              </span>
              <span className="rounded bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-xs font-bold text-purple-800">
                HOD Governance &amp; Facilities Control
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black pt-1">
              Department Master Timetable &amp; Lab Allocations
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              Real-time schedule monitoring across 9 class sections and dedicated computer laboratory bays.
            </p>
          </div>

          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1 shadow-xs">
            <button
              onClick={() => setViewMode("week")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                viewMode === "week"
                  ? "bg-[#026466] text-white shadow-xs"
                  : "text-slate-600 hover:text-black"
              }`}
            >
              Academic Timetable
            </button>
            <button
              onClick={() => setViewMode("facility")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                viewMode === "facility"
                  ? "bg-[#026466] text-white shadow-xs"
                  : "text-slate-600 hover:text-black"
              }`}
            >
              Facility &amp; Lab Live Tracker
            </button>
          </div>
        </div>
      </div>

      {/* 2. Live Facility Status Strip */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-black flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CSE Department Facilities &amp; Lecture Halls Live Status</span>
          </h4>
          <span className="text-[11px] text-slate-500 font-mono">10 Active Locations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {liveFacilityStatus.slice(0, 5).map((f) => (
            <div
              key={f.room}
              className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#026466]">{f.room}</span>
                <span className="rounded bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 text-[9px] font-bold">
                  {f.status}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-black truncate">{f.subject}</p>
              <p className="text-[10px] text-slate-500">{f.assignedTo}</p>
            </div>
          ))}
        </div>
      </div>

      {viewMode === "week" ? (
        <>
          {/* Year & Section Selector */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Year / Semester:
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
                          ? "border-[#026466] bg-[#E6F1F1] text-[#026466] ring-1 ring-[#026466]"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold text-xs">{y.label}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Batch: {y.batch}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
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
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-xs"
                      }`}
                    >
                      <span className="text-sm">Sec {sec}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section Incharge & Room Banner */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Class Incharge
                </span>
                <p className="mt-1 font-bold text-black text-sm">{timetable.classIncharge}</p>
              </div>

              <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Assigned Mentors
                </span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {timetable.mentors.map((m, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-white border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-800"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Designated Hall
                </span>
                <p className="mt-1 font-mono font-bold text-[#026466] text-sm">
                  Room {timetable.roomNo}
                </p>
              </div>
            </div>
          </div>

          {/* Weekly 8-Period Matrix */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-black">
                {timetable.year} — Section {timetable.section} (Room {timetable.roomNo}) Matrix
              </h3>
            </div>

            <table className="w-full min-w-[1050px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3 w-28 bg-slate-50">Day</th>
                  <th className="py-3 px-2 text-center bg-slate-50/50">
                    <div>1</div>
                    <div className="text-[10px] text-slate-400 font-normal">08:05-08:55</div>
                  </th>
                  <th className="py-3 px-2 text-center bg-slate-50/50">
                    <div>2</div>
                    <div className="text-[10px] text-slate-400 font-normal">08:55-09:45</div>
                  </th>
                  <th className="py-3 px-1 text-center bg-slate-100 text-[10px] font-bold text-slate-500 w-12">
                    FN
                  </th>
                  <th className="py-3 px-2 text-center bg-slate-50/50">
                    <div>3</div>
                    <div className="text-[10px] text-slate-400 font-normal">10:00-10:50</div>
                  </th>
                  <th className="py-3 px-2 text-center bg-slate-50/50">
                    <div>4</div>
                    <div className="text-[10px] text-slate-400 font-normal">10:50-11:40</div>
                  </th>
                  <th className="py-3 px-1 text-center bg-slate-100 text-[10px] font-bold text-slate-500 w-14">
                    Lunch
                  </th>
                  <th className="py-3 px-2 text-center bg-slate-50/50">
                    <div>5</div>
                    <div className="text-[10px] text-slate-400 font-normal">12:20-01:05</div>
                  </th>
                  <th className="py-3 px-2 text-center bg-slate-50/50">
                    <div>6</div>
                    <div className="text-[10px] text-slate-400 font-normal">01:05-01:50</div>
                  </th>
                  <th className="py-3 px-1 text-center bg-slate-100 text-[10px] font-bold text-slate-500 w-12">
                    AN
                  </th>
                  <th className="py-3 px-2 text-center bg-slate-50/50">
                    <div>7</div>
                    <div className="text-[10px] text-slate-400 font-normal">02:00-02:45</div>
                  </th>
                  <th className="py-3 px-2 text-center bg-slate-50/50">
                    <div>8</div>
                    <div className="text-[10px] text-slate-400 font-normal">02:45-03:30</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
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
                        <div className="h-full min-h-[76px] rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-[10px] text-slate-400">
                          Free
                        </div>
                      );
                    }
                    return (
                      <div
                        className={`h-full min-h-[76px] rounded-lg border p-2 flex flex-col justify-between transition hover:shadow-xs ${
                          slot.isLab
                            ? "border-[#FECDA5] bg-[#FFF6EE] text-[#AF0606]"
                            : "border-[#026466]/20 bg-[#E6F1F1] text-[#026466]"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-[11px] leading-tight line-clamp-1">
                            {slot.shortCode || slot.subjectName}
                          </div>
                          <div className="text-[10px] text-slate-600 font-mono mt-0.5 truncate">
                            {slot.subjectCode}
                          </div>
                        </div>

                        <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate-500 border-t border-slate-200/60 pt-1">
                          <span className="truncate max-w-[65px] font-medium" title={slot.faculty}>
                            {slot.faculty}
                          </span>
                          <span className="font-bold text-black font-mono shrink-0">
                            {slot.room}
                          </span>
                        </div>
                      </div>
                    );
                  };

                  return (
                    <tr key={dayName} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3 font-bold text-black align-middle bg-slate-50/40">
                        <span className="inline-block rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs shadow-2xs font-semibold">
                          {dayName}
                        </span>
                      </td>

                      <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p1)}</td>
                      <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p2)}</td>
                      <td className="py-2.5 px-1 text-center align-middle bg-slate-100/70 text-[10px] text-slate-400 font-mono">
                        FN
                      </td>
                      <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p3)}</td>
                      <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p4)}</td>
                      <td className="py-2.5 px-1 text-center align-middle bg-slate-100/70 text-[10px] text-slate-400 font-mono">
                        LUNCH
                      </td>
                      <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p5)}</td>
                      <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p6)}</td>
                      <td className="py-2.5 px-1 text-center align-middle bg-slate-100/70 text-[10px] text-slate-400 font-mono">
                        AN
                      </td>
                      <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p7)}</td>
                      <td className="py-2.5 px-1 text-center align-top w-28">{renderSlotCell(p8)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Full Facility & Lab Overview */
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-black pb-3 border-b border-slate-100">
            All CSE Department Lecture Halls &amp; Laboratory Facilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveFacilityStatus.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#026466]">{f.room}</span>
                    <span className="rounded bg-slate-200 px-1.5 py-0.2 text-[10px] font-bold text-slate-700">
                      {f.type}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-black">{f.subject}</p>
                  <p className="text-[11px] text-slate-500">Assigned: {f.assignedTo}</p>
                </div>

                <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-1 text-xs font-bold text-emerald-800">
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
