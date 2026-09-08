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

export default function AdminTimetablePage() {
  const [activeTab, setActiveTab] = useState<"section" | "faculty">("section");
  const [selectedYear, setSelectedYear] = useState<string>("Year III");
  const [selectedSection, setSelectedSection] = useState<string>("A");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("Mr R Harini");
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [viewMode, setViewMode] = useState<"week" | "day">("week");

  const timetable: SectionTimetableData = getTimetableByYearAndSection(
    selectedYear,
    selectedSection
  );
  const facultyNames = getAllFacultyNames();
  const facultySchedule = getFacultyTeachingSchedule(selectedFaculty);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Master Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-0.5 text-xs font-bold text-[#026466] font-mono">
                {timetable.regulation}
              </span>
              <span className="rounded bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                Odd Semester July 2026 – Nov 2026
              </span>
              <span className="rounded bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-xs font-bold text-teal-800">
                Institutional Academic Master
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black pt-1">
              Institutional Master Timetable &amp; Workload Manager
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College • Department of Computer Science &amp; Engineering
            </p>
          </div>

          {/* Master View Switcher (Section Matrix vs Faculty Workload) */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1 shadow-xs">
            <button
              onClick={() => setActiveTab("section")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                activeTab === "section"
                  ? "bg-[#026466] text-white shadow-xs"
                  : "text-slate-600 hover:text-black"
              }`}
            >
              Class Section View
            </button>
            <button
              onClick={() => setActiveTab("faculty")}
              className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                activeTab === "faculty"
                  ? "bg-[#026466] text-white shadow-xs"
                  : "text-slate-600 hover:text-black"
              }`}
            >
              Faculty Workload View
            </button>
          </div>
        </div>
      </div>

      {/* SECTION VIEW */}
      {activeTab === "section" && (
        <>
          {/* Year & Section Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Year Selector */}
            <div className="md:col-span-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
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

            {/* Section Selector */}
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

          {/* Section Metadata Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Class Incharge
                </span>
                <p className="mt-1 font-bold text-black text-sm">{timetable.classIncharge}</p>
              </div>

              <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3 md:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Assigned Student Mentors
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
                  Classroom Location
                </span>
                <p className="mt-1 font-mono font-bold text-[#026466] text-sm">
                  Room {timetable.roomNo}
                </p>
              </div>
            </div>
          </div>

          {/* 8-Period Weekly Matrix */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-black">
                Official 8-Period Timetable Matrix ({timetable.year} — Section {timetable.section})
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#E6F1F1] border border-[#026466]/30"></span>
                  Theory
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#FFF6EE] border border-[#FECDA5]"></span>
                  Lab / Project
                </span>
              </div>
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
                    FN Break
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
                    AN Break
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

          {/* Subjects Table */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-black">
                  Subject Allocation &amp; Contact Hours ({timetable.year} — Section {timetable.section})
                </h3>
                <p className="text-xs text-slate-500">
                  L-T-P-C Curriculum Allocation Breakdown
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#026466]">
                Total: 40 Hours / Week
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider bg-slate-50">
                    <th className="py-2.5 px-3">Subject Code</th>
                    <th className="py-2.5 px-3">Subject Name</th>
                    <th className="py-2.5 px-2 text-center">Abb</th>
                    <th className="py-2.5 px-2 text-center">L</th>
                    <th className="py-2.5 px-2 text-center">T</th>
                    <th className="py-2.5 px-2 text-center">P</th>
                    <th className="py-2.5 px-2 text-center">C</th>
                    <th className="py-2.5 px-2 text-center">Hrs/Wk</th>
                    <th className="py-2.5 px-3">Allocated Faculty</th>
                    <th className="py-2.5 px-3">Dept</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {timetable.subjects.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#026466]">
                        {sub.code}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-black">
                        {sub.name}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-600 font-bold">
                        {sub.shortName}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-600">{sub.l}</td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-600">{sub.t}</td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-600">{sub.p}</td>
                      <td className="py-2.5 px-2 text-center font-mono font-bold text-black">{sub.c}</td>
                      <td className="py-2.5 px-2 text-center font-mono font-bold text-[#AF0606]">
                        {sub.totalHours}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        {sub.facultyName}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 font-mono">
                          {sub.department}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* FACULTY WORKLOAD VIEW */}
      {activeTab === "faculty" && (
        <div className="space-y-6">
          {/* Faculty Selector */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Teaching Faculty:
              </label>
              <span className="text-xs text-slate-500 font-mono">
                {facultyNames.length} Registered Faculty
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {facultyNames.map((name) => {
                const isSelected = selectedFaculty === name;
                return (
                  <button
                    key={name}
                    onClick={() => setSelectedFaculty(name)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                      isSelected
                        ? "border-[#026466] bg-[#E6F1F1] text-[#026466] font-bold ring-1 ring-[#026466]"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Faculty Schedule Matrix */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-black">
                  Teaching Schedule for {selectedFaculty}
                </h3>
                <p className="text-xs text-slate-500">
                  Aggregated across all 9 sections in Year II, Year III, and Year IV
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {days.map((d) => {
                const assigned = facultySchedule[d] || [];
                return (
                  <div
                    key={d}
                    className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-xs text-black">{d}</span>
                      <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-[#026466] font-mono">
                        {assigned.length} Periods
                      </span>
                    </div>

                    {assigned.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400 italic">
                        No assigned classes
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {assigned.map((slot, idx) => (
                          <div
                            key={idx}
                            className={`rounded-lg border p-2.5 text-xs space-y-1 ${
                              slot.isLab
                                ? "border-[#FECDA5] bg-[#FFF6EE] text-[#AF0606]"
                                : "border-[#026466]/20 bg-white text-[#026466]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold font-mono text-[10px]">
                                Period {slot.periodNo}
                              </span>
                              <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[9px] font-mono text-slate-700">
                                {slot.room}
                              </span>
                            </div>
                            <div className="font-bold text-[11px] text-black line-clamp-1">
                              {slot.shortCode || slot.subjectName}
                            </div>
                            <div className="text-[10px] text-slate-600 font-medium">
                              {slot.year} — Sec {slot.section}
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
        </div>
      )}
    </div>
  );
}
