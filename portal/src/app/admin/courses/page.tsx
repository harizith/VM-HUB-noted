"use client";

import React, { useState } from "react";
import { useApp, CourseRecord, SyllabusTopic } from "@/context/AppContext";

export default function AdminCoursesPage() {
  const { courses, users, addCourse, deleteCourse } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("CSE");
  const [credits, setCredits] = useState(4);
  const [section, setSection] = useState("CSE-A");
  const [instructorName, setInstructorName] = useState("Prof. Sample Teacher");
  const [totalPlannedHours, setTotalPlannedHours] = useState(45);
  const [unit1, setUnit1] = useState("Unit 1: Introduction & Fundamentals");
  const [unit2, setUnit2] = useState("Unit 2: Core Concepts & Architecture");
  const [unit3, setUnit3] = useState("Unit 3: Design & Advanced Mechanisms");
  const [unit4, setUnit4] = useState("Unit 4: Implementation & Tooling");
  const [unit5, setUnit5] = useState("Unit 5: Case Studies & Industry Applications");

  const facultyMembers = users.filter((u) => u.role === "TEACHER" || u.role === "HOD");

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    const assignedInstructor = facultyMembers.find((f) => f.name === instructorName);

    const syllabus: SyllabusTopic[] = [
      { id: `TOP-${Date.now()}-1`, unit: 1, topicName: unit1.trim(), targetLectures: 9, completedLectures: 0, isCompleted: false, targetDate: "2026-08-01" },
      { id: `TOP-${Date.now()}-2`, unit: 2, topicName: unit2.trim(), targetLectures: 9, completedLectures: 0, isCompleted: false, targetDate: "2026-08-20" },
      { id: `TOP-${Date.now()}-3`, unit: 3, topicName: unit3.trim(), targetLectures: 9, completedLectures: 0, isCompleted: false, targetDate: "2026-09-10" },
      { id: `TOP-${Date.now()}-4`, unit: 4, topicName: unit4.trim(), targetLectures: 9, completedLectures: 0, isCompleted: false, targetDate: "2026-09-30" },
      { id: `TOP-${Date.now()}-5`, unit: 5, topicName: unit5.trim(), targetLectures: 9, completedLectures: 0, isCompleted: false, targetDate: "2026-10-15" },
    ];

    const courseData: Omit<CourseRecord, "id"> = {
      code: code.trim().toUpperCase(),
      title: title.trim(),
      department,
      credits: Number(credits),
      section,
      instructorName,
      instructorId: assignedInstructor?.id || "USR-TCH-01",
      totalPlannedHours: Number(totalPlannedHours),
      completedHours: 0,
      avgAttendance: 85.0,
      syllabus,
    };

    addCourse(courseData);
    setShowAddModal(false);
    setCode("");
    setTitle("");
  };

  const filteredCourses = courses.filter((c) => {
    return (
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Academic Course Catalog & Curricula
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Autonomous course syllabi, assigned instructors, and syllabus topic delivery trackers.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
        >
          <span>+ Provision New Course</span>
        </button>
      </div>

      {/* 2. Top Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Total Courses</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">{courses.length}</p>
        </div>
        <div className="rounded-xl border border-[#026466]/30 dark:border-teal-800 bg-[#E6F1F1] dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#026466] dark:text-teal-400">Theory Credits</span>
          <p className="text-2xl font-bold text-[#026466] dark:text-teal-400 font-mono mt-0.5">
            {courses.reduce((acc, c) => acc + c.credits, 0)} Credits
          </p>
        </div>
        <div className="rounded-xl border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-slate-900 dark:text-amber-300">Total Lecture Topics</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-amber-300 font-mono mt-0.5">
            {courses.reduce((acc, c) => acc + c.syllabus.length, 0)} Units
          </p>
        </div>
      </div>

      {/* 3. Search */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search course by code, title, or assigned faculty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
        />
      </div>

      {/* 4. Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((c) => {
          const completedTopicsCount = c.syllabus.filter((t) => t.isCompleted).length;
          const progressPercent =
            c.syllabus.length > 0 ? ((completedTopicsCount / c.syllabus.length) * 100).toFixed(0) : "0";

          return (
            <div
              key={c.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#026466]/40 transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#026466] dark:text-teal-400 bg-[#E6F1F1] dark:bg-teal-950 px-2 py-0.5 rounded border border-[#026466]/30">
                      {c.code}
                    </span>
                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300">
                      {c.credits} Credits
                    </span>
                    <span className="rounded bg-[#FECDA5] text-black px-2 py-0.5 text-[10px] font-bold">
                      {c.section}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Delete course ${c.code} (${c.title})?`)) {
                        deleteCourse(c.id);
                      }
                    }}
                    className="text-slate-400 hover:text-[#AF0606] transition p-1"
                    title="Delete Course"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Instructor: <strong className="text-slate-900 dark:text-white">{c.instructorName}</strong>
                </p>

                {/* Progress Bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Syllabus Completion:</span>
                    <span className="font-mono font-bold text-[#026466] dark:text-teal-400">{progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#026466] dark:bg-teal-500 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Syllabus Topics Accordion-like snippet */}
                <div className="mt-3 space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Modular Topics ({c.syllabus.length})</span>
                  {c.syllabus.slice(0, 3).map((top) => (
                    <div key={top.id} className="flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-300">
                      <span className="truncate max-w-[260px]">Unit {top.unit}: {top.topicName}</span>
                      <span className={`font-mono text-[10px] font-bold ${top.isCompleted ? "text-[#026466] dark:text-teal-400" : "text-slate-400"}`}>
                        {top.isCompleted ? "✓ Done" : "Pending"}
                      </span>
                    </div>
                  ))}
                  {c.syllabus.length > 3 && (
                    <span className="text-[10px] text-slate-400 italic">+ {c.syllabus.length - 3} more modules</span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Lecture Hours: <strong className="text-slate-900 dark:text-white font-mono">{c.completedHours} / {c.totalPlannedHours} hrs</strong></span>
                <span>Avg Att: <strong className="text-[#026466] dark:text-teal-400 font-mono">{c.avgAttendance}%</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Course Creation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Provision Academic Course & Syllabi
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-900 dark:text-white mb-1">Subject Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 21CS605"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-900 dark:text-white mb-1">Credits</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    required
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-900 dark:text-white mb-1">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. Full Stack Web Development & Microservices"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-900 dark:text-white mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="AIDS">AIDS</option>
                    <option value="MECH">MECH</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-900 dark:text-white mb-1">Section</label>
                  <input
                    type="text"
                    placeholder="CSE-A"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-900 dark:text-white mb-1">Planned Hrs</label>
                  <input
                    type="number"
                    value={totalPlannedHours}
                    onChange={(e) => setTotalPlannedHours(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-900 dark:text-white mb-1">Assigned Faculty Instructor</label>
                <select
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                >
                  {facultyMembers.map((fac) => (
                    <option key={fac.id} value={fac.name}>
                      {fac.name} ({fac.department})
                    </option>
                  ))}
                </select>
              </div>

              {/* 5 Topic Units */}
              <div className="space-y-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
                <span className="text-[11px] font-bold text-[#026466] dark:text-teal-400 font-mono">Curriculum Units (5 Modules)</span>
                <input
                  type="text"
                  value={unit1}
                  onChange={(e) => setUnit1(e.target.value)}
                  className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={unit2}
                  onChange={(e) => setUnit2(e.target.value)}
                  className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={unit3}
                  onChange={(e) => setUnit3(e.target.value)}
                  className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={unit4}
                  onChange={(e) => setUnit4(e.target.value)}
                  className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={unit5}
                  onChange={(e) => setUnit5(e.target.value)}
                  className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-5 py-2 font-bold text-white shadow-xs"
                >
                  Provision Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
