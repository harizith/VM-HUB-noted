"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import AttendanceMeter from "@/components/student/AttendanceMeter";

export default function StudentAttendancePage() {
  const { currentUser, courses } = useApp();

  // Subject-wise student records
  const initialSubjects = [
    { id: "S1", code: "21CS601", title: "Cloud Computing & Virtualization", category: "Theory", totalHours: 32, attendedHours: 29, faculty: "Prof. Sample Teacher" },
    { id: "S2", code: "21CS602", title: "Compiler Design & Optimization", category: "Theory", totalHours: 30, attendedHours: 26, faculty: "Dr. S. Radhakrishnan" },
    { id: "S3", code: "21CS603", title: "Artificial Intelligence & Neural Systems", category: "Theory", totalHours: 28, attendedHours: 26, faculty: "Dr. K. Senthil Kumar" },
    { id: "S4", code: "21CS604", title: "Cryptography & Network Security", category: "Theory", totalHours: 26, attendedHours: 22, faculty: "Prof. M. Priya" },
    { id: "S5", code: "21CS605", title: "Full Stack Web Development", category: "Theory", totalHours: 24, attendedHours: 17, faculty: "Prof. Sample Teacher" }, // <75%
    { id: "S6", code: "21CS611", title: "Cloud & Virtualization Lab", category: "Practical", totalHours: 16, attendedHours: 16, faculty: "Prof. Sample Teacher" },
    { id: "S7", code: "21CS612", title: "Compiler Engineering Lab", category: "Practical", totalHours: 16, attendedHours: 14, faculty: "Dr. S. Radhakrishnan" },
  ];

  const [subjects] = useState(initialSubjects);

  // What-If Simulator State
  const [selectedSubjectCode, setSelectedSubjectCode] = useState(subjects[0].code);
  const [futureAttended, setFutureAttended] = useState(5);
  const [futureMissed, setFutureMissed] = useState(0);

  // Overall totals
  const totalConducted = subjects.reduce((acc, curr) => acc + curr.totalHours, 0);
  const totalAttended = subjects.reduce((acc, curr) => acc + curr.attendedHours, 0);
  const totalMissed = totalConducted - totalAttended;
  const overallPercentage = totalConducted > 0 ? (totalAttended / totalConducted) * 100 : 88.5;

  // Active Subject for Simulator
  const activeSubject = subjects.find((s) => s.code === selectedSubjectCode) || subjects[0];
  const simTotalHours = activeSubject.totalHours + Number(futureAttended) + Number(futureMissed);
  const simAttendedHours = activeSubject.attendedHours + Number(futureAttended);
  const simPercentage = simTotalHours > 0 ? (simAttendedHours / simTotalHours) * 100 : 0;
  const isSimEligible = simPercentage >= 75;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Academic Attendance Forecaster & 75% Bunk Simulator
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Semester VI • Real-time statutory attendance health, safety margin bunk calculators, and predictive What-If simulation.
        </p>
      </div>

      {/* 2. Overall Aggregate Attendance Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center md:border-r border-slate-100 dark:border-slate-800 md:pr-6">
          <AttendanceMeter percentage={overallPercentage} size={150} strokeWidth={12} />
        </div>

        <div className="md:col-span-2 flex flex-col justify-center space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 text-center">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Conducted</span>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 font-mono">{totalConducted}</p>
              <span className="text-[10px] text-slate-500">Lecture Hours</span>
            </div>

            <div className="rounded-lg border border-[#026466]/30 dark:border-teal-800 bg-[#E6F1F1] dark:bg-slate-800/50 p-4 text-center">
              <span className="text-[11px] font-bold text-[#026466] dark:text-teal-400 uppercase tracking-wider">Attended</span>
              <p className="text-2xl font-bold text-[#026466] dark:text-teal-400 mt-1 font-mono">{totalAttended}</p>
              <span className="text-[10px] text-[#026466] dark:text-teal-400">Hours</span>
            </div>

            <div className="rounded-lg border border-[#AF0606]/30 dark:border-rose-900/50 bg-[#FDE8E8] dark:bg-slate-800/50 p-4 text-center">
              <span className="text-[11px] font-bold text-[#AF0606] dark:text-rose-400 uppercase tracking-wider">Absences</span>
              <p className="text-2xl font-bold text-[#AF0606] dark:text-rose-400 mt-1 font-mono">{totalMissed}</p>
              <span className="text-[10px] text-[#AF0606] dark:text-rose-400">Hours</span>
            </div>
          </div>

          <div className="rounded-lg border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-amber-950/20 p-3.5 text-xs flex items-start gap-3">
            <div>
              <p className="font-bold text-slate-900 dark:text-amber-200">Autonomous University Regulation (75% Statutory Rule)</p>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed text-[11px]">
                Under Vel Tech Multitech Autonomous Academic Regulations, students must maintain ≥75% attendance in each individual course to appear for End-Semester Examinations without condonation review.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive "What-If" Attendance Simulator */}
      <div className="rounded-xl border border-[#026466]/30 dark:border-teal-800 bg-linear-to-br from-[#E6F1F1]/50 to-white dark:from-slate-900 dark:to-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#026466]/20 dark:border-slate-800">
          <div>
            <span className="rounded bg-[#026466] text-white px-2 py-0.5 text-[10px] font-bold uppercase font-mono">
              🔮 Interactive Predictor
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              &quot;What-If&quot; Attendance Simulator &amp; Exam Eligibility Projector
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Simulate attending or missing upcoming lecture sessions and forecast your projected percentage in real-time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Select Course to Simulate
              </label>
              <select
                value={selectedSubjectCode}
                onChange={(e) => setSelectedSubjectCode(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.code}>
                    {s.code} - {s.title} (Currently: {((s.attendedHours / s.totalHours) * 100).toFixed(1)}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Slider: Classes to Attend */}
            <div className="space-y-1.5 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Future Classes to <strong className="text-[#026466] dark:text-teal-400">ATTEND</strong>:
                </span>
                <span className="font-mono font-bold text-base text-[#026466] dark:text-teal-400">
                  +{futureAttended} Hours
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                value={futureAttended}
                onChange={(e) => setFutureAttended(Number(e.target.value))}
                className="w-full accent-[#026466] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 hrs</span>
                <span>10 hrs</span>
                <span>25 hrs</span>
              </div>
            </div>

            {/* Slider: Classes to Miss */}
            <div className="space-y-1.5 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Future Classes to <strong className="text-[#AF0606] dark:text-rose-400">MISS / BUNK</strong>:
                </span>
                <span className="font-mono font-bold text-base text-[#AF0606] dark:text-rose-400">
                  +{futureMissed} Hours
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                value={futureMissed}
                onChange={(e) => setFutureMissed(Number(e.target.value))}
                className="w-full accent-[#AF0606] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 hrs</span>
                <span>5 hrs</span>
                <span>15 hrs</span>
              </div>
            </div>
          </div>

          {/* Dynamic Projection Result Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 flex flex-col justify-between space-y-4 shadow-sm">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wider">
                Projected Outcome
              </span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                {activeSubject.title}
              </h4>
              <p className="text-[11px] text-slate-500">
                Baseline: {((activeSubject.attendedHours / activeSubject.totalHours) * 100).toFixed(1)}% ({activeSubject.attendedHours}/{activeSubject.totalHours} hrs)
              </p>
            </div>

            <div className="text-center py-2 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Simulated Attendance</span>
              <p className={`text-4xl font-extrabold font-mono ${isSimEligible ? "text-[#026466] dark:text-teal-400" : "text-[#AF0606] dark:text-rose-400"}`}>
                {simPercentage.toFixed(1)}%
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                {simAttendedHours} attended of {simTotalHours} total
              </p>
            </div>

            <div className={`p-3 rounded-lg text-center font-bold text-xs ${
              isSimEligible
                ? "bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-300 border border-[#026466]/40"
                : "bg-[#FDE8E8] dark:bg-rose-950 text-[#AF0606] dark:text-rose-300 border border-[#AF0606]/40"
            }`}>
              {isSimEligible ? "✓ Eligible for End-Semester Exam" : "⚠️ Condonation Review Required (<75%)"}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Subject Breakdown with Safe Bunk & Recovery Calculators */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Subject-wise Ledger & Statutory 75% Bunk Forecaster
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Precise calculation of safe bunkable classes vs consecutive classes required to recover eligibility.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Course Code & Title</th>
                <th className="py-3 px-3 text-center">Type</th>
                <th className="py-3 px-3 text-center">Total Hrs</th>
                <th className="py-3 px-3 text-center">Attended</th>
                <th className="py-3 px-3 text-center">Absent</th>
                <th className="py-3 px-3 text-center">Percentage</th>
                <th className="py-3 px-3 text-right">Statutory Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {subjects.map((record) => {
                const currentPct = (record.attendedHours / record.totalHours) * 100;
                const isSafe = currentPct >= 75;

                // Safe bunk calculation: floor((attended - 0.75 * total) / 0.75)
                const safeBunks = Math.floor((record.attendedHours - 0.75 * record.totalHours) / 0.75);

                // Recovery calculation: ceil((0.75 * total - attended) / 0.25)
                const recoveryNeeded = Math.ceil((0.75 * record.totalHours - record.attendedHours) / 0.25);

                return (
                  <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white text-xs">{record.title}</div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-mono text-[#026466] dark:text-teal-400 font-bold">{record.code}</span>
                        <span>•</span>
                        <span>{record.faculty}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                        {record.category}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-medium text-slate-800 dark:text-slate-200">{record.totalHours}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-[#026466] dark:text-teal-400">{record.attendedHours}</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-[#AF0606] dark:text-rose-400">
                      {record.totalHours - record.attendedHours}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isSafe ? "text-[#026466] dark:text-teal-400" : "text-[#AF0606] dark:text-rose-400"
                          }`}
                        >
                          {currentPct.toFixed(1)}%
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isSafe ? "bg-[#026466] dark:bg-teal-500" : "bg-[#AF0606] dark:bg-rose-500"
                            }`}
                            style={{ width: `${Math.min(100, currentPct)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right">
                      {isSafe ? (
                        <span className="inline-flex items-center rounded-md bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 px-2.5 py-1 text-[11px] font-bold text-[#026466] dark:text-teal-400">
                          🛡️ Can safe-bunk {Math.max(0, safeBunks)} class(es)
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-[#FDE8E8] dark:bg-rose-950 border border-[#AF0606]/30 px-2.5 py-1 text-[11px] font-bold text-[#AF0606] dark:text-rose-400 animate-pulse">
                          ⚠️ Attend next {Math.max(1, recoveryNeeded)} class(es)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
