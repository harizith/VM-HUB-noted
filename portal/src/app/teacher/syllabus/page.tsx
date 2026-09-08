"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function TeacherSyllabusLedgerPage() {
  const { courses, toggleTopicCompletion, currentUser } = useApp();

  const myCourses = courses.filter(
    (c) => c.department === "CSE" || c.instructorName.includes(currentUser.name)
  );
  const activeCourseList = myCourses.length > 0 ? myCourses : courses;

  const [selectedCourseId, setSelectedCourseId] = useState(activeCourseList[0]?.id || courses[0]?.id);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const completedTopicsCount = selectedCourse?.syllabus.filter((t) => t.isCompleted).length || 0;
  const totalTopicsCount = selectedCourse?.syllabus.length || 5;
  const progressPercent =
    totalTopicsCount > 0 ? ((completedTopicsCount / totalTopicsCount) * 100).toFixed(0) : "0";

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Course Syllabus Progress Ledger
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Interactive modular topic checklists, target lecture milestones, and syllabus coverage trackers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 px-3 py-1 text-xs font-bold text-[#026466] dark:text-teal-400 font-mono">
            {progressPercent}% Delivered
          </span>
        </div>
      </div>

      {/* 2. Course Tab Selectors */}
      <div className="flex flex-wrap gap-2">
        {activeCourseList.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourseId(c.id)}
            className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition text-left ${
              selectedCourseId === c.id
                ? "border-[#026466] dark:border-teal-400 bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-400 font-bold shadow-xs"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="font-mono text-[10px] text-slate-500">{c.code} ({c.section})</div>
            <div className="font-bold text-xs truncate max-w-[200px]">{c.title}</div>
          </button>
        ))}
      </div>

      {/* 3. Course Details & Progress Bar */}
      {selectedCourse && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#026466] text-white px-2 py-0.5 text-xs font-mono font-bold">
                  {selectedCourse.code}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedCourse.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Section: <strong className="text-slate-800 dark:text-slate-200 font-mono">{selectedCourse.section}</strong> • Handled by: <span className="font-medium text-slate-800 dark:text-slate-200">{selectedCourse.instructorName}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="text-right">
                <span className="text-[10px] text-slate-500">Delivered</span>
                <p className="font-bold text-slate-900 dark:text-white">{selectedCourse.completedHours} / {selectedCourse.totalPlannedHours} hrs</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500">Units Covered</span>
                <p className="font-bold text-[#026466] dark:text-teal-400">{completedTopicsCount} / {selectedCourse.syllabus.length}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Course Syllabus Completion</span>
              <span className="font-mono font-bold text-[#026466] dark:text-teal-400">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#026466] dark:bg-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Modular Topic Checklist */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Interactive Unit & Module Topic Checklist
            </h4>

            <div className="space-y-2">
              {selectedCourse.syllabus.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => toggleTopicCompletion(selectedCourse.id, topic.id)}
                  className={`cursor-pointer rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                    topic.isCompleted
                      ? "border-[#026466]/40 bg-[#E6F1F1]/60 dark:bg-teal-950/40"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5">
                      <input
                        type="checkbox"
                        checked={topic.isCompleted}
                        onChange={() => {}} // handled by parent div
                        className="h-4 w-4 rounded text-[#026466] focus:ring-[#026466] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#026466] dark:text-teal-400">
                          Unit {topic.unit}
                        </span>
                        <h5 className={`text-xs font-bold ${topic.isCompleted ? "text-slate-900 dark:text-white line-through opacity-80" : "text-slate-900 dark:text-white"}`}>
                          {topic.topicName}
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                        Target Hours: {topic.targetLectures} hrs • Completed: {topic.completedLectures} hrs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Target: {topic.targetDate || "Sep 2026"}
                    </span>
                    <span
                      className={`rounded px-2.5 py-1 text-[10px] font-bold ${
                        topic.isCompleted
                          ? "bg-[#026466] text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {topic.isCompleted ? "✓ Completed" : "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
