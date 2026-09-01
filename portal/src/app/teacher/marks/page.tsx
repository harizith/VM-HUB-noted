"use client";

import React, { useState } from "react";
import {
  teacherCourses,
  initialStudentRoster,
  StudentRosterItem,
} from "@/lib/teacherMockData";

export default function TeacherMarksPage() {
  const [selectedCourse, setSelectedCourse] = useState(teacherCourses[0].code);
  const [selectedSection, setSelectedSection] = useState("CSE-A");
  const [assessmentType, setAssessmentType] = useState<
    "cat1" | "cat2" | "model" | "assignment"
  >("cat2");
  const [students, setStudents] = useState<StudentRosterItem[]>(initialStudentRoster);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const maxScores = {
    cat1: 50,
    cat2: 50,
    model: 100,
    assignment: 10,
  };

  const maxScore = maxScores[assessmentType];

  const handleScoreChange = (studentId: string, value: string) => {
    const numeric = Math.min(Math.max(0, Number(value) || 0), maxScore);
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        if (assessmentType === "cat1") return { ...s, cat1Score: numeric };
        if (assessmentType === "cat2") return { ...s, cat2Score: numeric };
        if (assessmentType === "model") return { ...s, modelScore: numeric };
        return { ...s, assignmentScore: numeric };
      })
    );
  };

  const getScore = (student: StudentRosterItem): number => {
    if (assessmentType === "cat1") return student.cat1Score ?? 0;
    if (assessmentType === "cat2") return student.cat2Score ?? 0;
    if (assessmentType === "model") return student.modelScore ?? 0;
    return student.assignmentScore ?? 0;
  };

  const getGrade = (score: number, max: number): { text: string; color: string } => {
    const pct = (score / max) * 100;
    if (pct >= 90) return { text: "O", color: "text-[#026466] bg-[#E6F1F1] border-[#026466]/40" };
    if (pct >= 80) return { text: "A+", color: "text-[#026466] bg-[#E6F1F1]/50 border-[#026466]/30" };
    if (pct >= 70) return { text: "A", color: "text-black bg-slate-100 border-slate-300" };
    if (pct >= 60) return { text: "B+", color: "text-black bg-[#FFF6EE] border-[#FECDA5]" };
    if (pct >= 50) return { text: "B", color: "text-black bg-[#FFF6EE] border-[#FECDA5]" };
    return { text: "RA", color: "text-[#AF0606] bg-[#FDE8E8] border-[#AF0606]/40" };
  };

  // Metrics
  const scores = students.map((s) => getScore(s));
  const classAvg =
    scores.length > 0
      ? scores.reduce((a, b) => a + b, 0) / scores.length
      : 0;
  const highest = scores.length > 0 ? Math.max(...scores) : 0;
  const lowest = scores.length > 0 ? Math.min(...scores) : 0;
  const passCount = scores.filter((s) => s >= maxScore * 0.5).length;
  const passPercent = scores.length > 0 ? (passCount / scores.length) * 100 : 0;

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
            Internal Marks & Assessment Entry
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Enter test marks for CAT-1, CAT-2, Model Exams, and internal assignments.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 rounded-lg bg-[#E6F1F1] border border-[#026466]/30 px-3.5 py-1.5 text-xs font-bold text-[#026466] animate-fadeIn">
            <span>Marks Saved and Published to Exam Cell!</span>
          </div>
        )}
      </div>

      {/* 2. Selection Toolbar */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Subject
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none"
            >
              {teacherCourses.map((c) => (
                <option key={`${c.code}-${c.section}`} value={c.code}>
                  {c.code} - {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none"
            >
              <option value="CSE-A">CSE-A (64 Students)</option>
              <option value="CSE-B">CSE-B (64 Students)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Exam Component
            </label>
            <select
              value={assessmentType}
              onChange={(e) =>
                setAssessmentType(
                  e.target.value as "cat1" | "cat2" | "model" | "assignment"
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none font-semibold"
            >
              <option value="cat1">CAT-1 Examination (Max: 50)</option>
              <option value="cat2">CAT-2 Examination (Max: 50)</option>
              <option value="model">Model Examination (Max: 100)</option>
              <option value="assignment">Assignment & Quiz (Max: 10)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Real-Time Performance Analytics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-[11px] font-semibold text-slate-600">Class Average</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">
            {classAvg.toFixed(1)}{" "}
            <span className="text-xs text-slate-400 font-normal">/ {maxScore}</span>
          </p>
        </div>

        <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-[#026466]">Highest Score</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">
            {highest}{" "}
            <span className="text-xs text-[#026466] font-normal">/ {maxScore}</span>
          </p>
        </div>

        <div className="rounded-xl border border-[#AF0606]/30 bg-[#FDE8E8] p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-[#AF0606]">Lowest Score</span>
          <p className="text-2xl font-bold text-[#AF0606] font-mono mt-0.5">
            {lowest}{" "}
            <span className="text-xs text-[#AF0606] font-normal">/ {maxScore}</span>
          </p>
        </div>

        <div className="rounded-xl border border-[#FECDA5] bg-[#FFF6EE] p-4 text-center shadow-sm">
          <span className="text-[11px] font-bold text-black">Pass Percentage</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">
            {passPercent.toFixed(0)}%
          </p>
        </div>
      </div>

      {/* 4. Gradebook Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-black">
              Mark Entry Roster • {selectedCourse} ({selectedSection})
            </h3>
            <p className="text-xs text-slate-500">
              Editing: <strong className="text-[#026466] uppercase">{assessmentType}</strong> (Max: {maxScore} Marks)
            </p>
          </div>

          <button
            onClick={handleSave}
            className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-5 py-2 text-xs font-bold text-white shadow-xs transition"
          >
            Save & Publish Marks
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Reg No</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3 text-center">Score Input (/{maxScore})</th>
                <th className="py-3 px-3 text-center">Percentage</th>
                <th className="py-3 px-3 text-center">Projected Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => {
                const score = getScore(student);
                const gradeInfo = getGrade(score, maxScore);
                const pct = ((score / maxScore) * 100).toFixed(1);

                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-mono text-slate-750 font-medium">
                      {student.regNo}
                    </td>
                    <td className="py-3 px-3 font-semibold text-black">
                      {student.name}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          max={maxScore}
                          value={score}
                          onChange={(e) => handleScoreChange(student.id, e.target.value)}
                          className="w-16 rounded border border-slate-300 bg-white px-2.5 py-1 text-center font-mono text-xs font-bold text-black focus:border-[#026466] focus:outline-none"
                        />
                        <span className="text-slate-400 font-mono text-xs">/ {maxScore}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-slate-700">
                      {pct}%
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-flex rounded border px-2 py-0.5 text-xs font-bold font-mono ${gradeInfo.color}`}
                      >
                        {gradeInfo.text}
                      </span>
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
