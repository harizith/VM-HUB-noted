"use client";

import React, { useState } from "react";
import { internalMarksData } from "@/lib/studentMockData";

export default function CoursesMarksPage() {
  const [selectedCourse] = useState<string | null>(null);

  const totalCredits = internalMarksData.reduce((acc, curr) => acc + curr.credits, 0);
  const avgInternal =
    internalMarksData.reduce((acc, curr) => acc + curr.totalInternal, 0) /
    internalMarksData.length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
            Courses & Internal Assessment Marks
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Semester VI • Continuous Assessment Test (CAT) scores, Model exams, and internal weightages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-right shadow-xs">
            <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Total Credits</span>
            <p className="text-lg font-bold text-black font-mono">{totalCredits}</p>
          </div>
          <div className="rounded-lg border border-[#026466]/30 bg-[#E6F1F1] px-3.5 py-2 text-right shadow-xs">
            <span className="text-[10px] uppercase font-bold text-[#026466] tracking-wider">Average Internal</span>
            <p className="text-lg font-bold text-[#026466] font-mono">{avgInternal.toFixed(1)} / 50</p>
          </div>
        </div>
      </div>

      {/* 2. Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {internalMarksData.map((course) => {
          const isExpanded = selectedCourse === course.id;
          const cat1Percent = (course.cat1.score / course.cat1.max) * 100;
          const cat2Percent = (course.cat2.score / course.cat2.max) * 100;
          const modelPercent = (course.modelExam.score / course.modelExam.max) * 100;

          return (
            <div
              key={course.id}
              className={`rounded-xl border bg-white p-5 flex flex-col justify-between shadow-sm transition ${
                isExpanded ? "border-[#026466] ring-1 ring-[#026466]" : "border-slate-200 hover:border-[#026466]/40"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466] font-mono">
                        {course.courseCode}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                        {course.credits} Credits
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-black leading-snug">
                      {course.courseTitle}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">Instructor: {course.facultyName}</p>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex rounded-lg bg-[#FFF6EE] border border-[#FECDA5] px-2.5 py-1 font-mono text-sm font-bold text-[#AF0606]">
                      {course.grade}
                    </span>
                    <p className="text-[10px] text-slate-600 mt-1 font-mono font-bold">
                      {course.totalInternal.toFixed(1)} / 50
                    </p>
                  </div>
                </div>

                {/* Marks Breakdown Grid */}
                <div className="grid grid-cols-3 gap-2.5 mt-3.5">
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5 text-center">
                    <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">CAT-1</span>
                    <p className="text-sm font-bold text-black font-mono mt-0.5">
                      {course.cat1.score} <span className="text-[10px] text-slate-400">/{course.cat1.max}</span>
                    </p>
                    <span className="text-[10px] text-[#026466] font-mono font-bold">
                      {cat1Percent.toFixed(0)}%
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5 text-center">
                    <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">CAT-2</span>
                    <p className="text-sm font-bold text-black font-mono mt-0.5">
                      {course.cat2.score} <span className="text-[10px] text-slate-400">/{course.cat2.max}</span>
                    </p>
                    <span className="text-[10px] text-[#026466] font-mono font-bold">
                      {cat2Percent.toFixed(0)}%
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5 text-center">
                    <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">Model Exam</span>
                    <p className="text-sm font-bold text-black font-mono mt-0.5">
                      {course.modelExam.score} <span className="text-[10px] text-slate-400">/{course.modelExam.max}</span>
                    </p>
                    <span className="text-[10px] text-[#026466] font-mono font-bold">
                      {modelPercent.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Additional Assignment & Converted Internal */}
                <div className="mt-3 flex items-center justify-between rounded-lg bg-[#FFF6EE]/40 px-3 py-1.5 text-xs text-slate-700 border border-[#FECDA5]/50">
                  <span>Assignment & Seminar: <strong className="text-black">{course.assignment.score}/{course.assignment.max}</strong></span>
                  <span className="font-bold text-[#026466]">
                    Weightage: {((course.totalInternal / course.maxInternal) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Grading Scale & Internal Assessment Formula Reference */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-black">Evaluation Formula</h3>
        <p className="text-xs text-slate-700 leading-relaxed">
          Internal assessment weightage is computed as:
          <br />
          <code className="inline-block my-1.5 rounded-md bg-[#E6F1F1] border border-[#026466]/20 px-2.5 py-1 font-mono text-[#026466] font-bold text-xs">
            Internal (50 Marks) = (CAT-1 [50] × 0.15) + (CAT-2 [50] × 0.15) + (Model [100] × 0.25) + Assignment [10]
          </code>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2 border-t border-slate-100">
          <div className="rounded-lg border border-[#026466]/30 bg-[#E6F1F1] p-2 text-center">
            <span className="text-xs font-bold text-[#026466] font-mono">Grade O</span>
            <p className="text-[10px] text-slate-600 mt-0.5">90 - 100%</p>
          </div>
          <div className="rounded-lg border border-[#026466]/20 bg-[#E6F1F1]/50 p-2 text-center">
            <span className="text-xs font-bold text-[#026466] font-mono">Grade A+</span>
            <p className="text-[10px] text-slate-600 mt-0.5">80 - 89%</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-center">
            <span className="text-xs font-bold text-black font-mono">Grade A</span>
            <p className="text-[10px] text-slate-600 mt-0.5">70 - 79%</p>
          </div>
          <div className="rounded-lg border border-[#FECDA5] bg-[#FFF6EE] p-2 text-center">
            <span className="text-xs font-bold text-black font-mono">Grade B+</span>
            <p className="text-[10px] text-slate-600 mt-0.5">60 - 69%</p>
          </div>
          <div className="rounded-lg border border-[#FECDA5] bg-[#FFF6EE] p-2 text-center">
            <span className="text-xs font-bold text-black font-mono">Grade B</span>
            <p className="text-[10px] text-slate-600 mt-0.5">50 - 59%</p>
          </div>
          <div className="rounded-lg border border-[#AF0606]/30 bg-[#FDE8E8] p-2 text-center">
            <span className="text-xs font-bold text-[#AF0606] font-mono">Grade RA</span>
            <p className="text-[10px] text-[#AF0606] mt-0.5">&lt; 50% (Re-appear)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
