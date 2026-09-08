"use client";

import React from "react";
import { useApp } from "@/context/AppContext";

export default function HODCurriculumPerformancePage() {
  const { courses } = useApp();

  const deptCourses = courses.filter((c) => c.department === "CSE" || c.section.includes("CSE"));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Curriculum Delivery & Syllabus Health Ledger
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Continuous monitoring of lecture hours conducted, module coverage, and pacing across all semester courses.
        </p>
      </div>

      {/* 2. Detailed Delivery Ledger */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Department Course Delivery Matrix
        </h3>

        <div className="space-y-6">
          {deptCourses.map((course) => {
            const completedTopics = course.syllabus.filter((t) => t.isCompleted).length;
            const progressPercent =
              course.syllabus.length > 0 ? ((completedTopics / course.syllabus.length) * 100).toFixed(0) : "0";

            return (
              <div
                key={course.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-5 space-y-4"
              >
                {/* Course Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466] dark:text-teal-400 font-mono">
                        {course.code}
                      </span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{course.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Instructor: <strong className="text-slate-900 dark:text-white">{course.instructorName}</strong> • Section: <span className="font-mono font-bold text-slate-900 dark:text-white">{course.section}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500">Lecture Delivery</span>
                      <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                        {course.completedHours} / {course.totalPlannedHours} Hours
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500">Avg Attendance</span>
                      <p className="text-xs font-mono font-bold text-[#026466] dark:text-teal-400">
                        {course.avgAttendance}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Syllabus Completion ({completedTopics} of {course.syllabus.length} Units)</span>
                    <span className="font-mono font-bold text-[#026466] dark:text-teal-400">{progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#026466] dark:bg-teal-500 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 pt-2">
                  {course.syllabus.map((topic) => (
                    <div
                      key={topic.id}
                      className={`p-2.5 rounded-lg border text-xs transition flex flex-col justify-between ${
                        topic.isCompleted
                          ? "border-[#026466]/40 bg-[#E6F1F1] dark:bg-teal-950/40 text-slate-900 dark:text-teal-200"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="font-bold">Unit {topic.unit}</span>
                          <span className={topic.isCompleted ? "text-[#026466] dark:text-teal-400 font-bold" : "text-slate-400"}>
                            {topic.isCompleted ? "✓ Completed" : "In Progress"}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] font-medium leading-snug line-clamp-2">
                          {topic.topicName}
                        </p>
                      </div>

                      <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        Target: {topic.targetDate || "Sep 2026"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
