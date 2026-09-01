"use client";

import React, { useState } from "react";
import { masterCourseCatalog, AdminCourseRecord } from "@/lib/adminMockData";
import { Branch } from "@/lib/studentMockData";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<AdminCourseRecord[]>(masterCourseCatalog);
  const [selectedBranch, setSelectedBranch] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Course Form
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [branch, setBranch] = useState<Branch>("CSE");
  const [semester, setSemester] = useState(6);
  const [credits, setCredits] = useState(3);
  const [type, setType] = useState<"Theory" | "Practical" | "Integrated">("Theory");
  const [facultyInCharge, setFacultyInCharge] = useState("");

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    const newCourse: AdminCourseRecord = {
      code,
      title,
      branch,
      semester,
      credits,
      type,
      facultyInCharge: facultyInCharge || "Staff Appointed",
      enrolledStudents: 64,
    };

    setCourses([newCourse, ...courses]);
    setShowAddModal(false);
    setCode("");
    setTitle("");
    setFacultyInCharge("");
  };

  const filteredCourses = courses.filter((c) => {
    const matchesBranch = selectedBranch === "ALL" || c.branch === selectedBranch;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.facultyInCharge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
            Department Course Catalog & Curricula
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Autonomous curriculum master syllabus, credit structures, and professor in-charge allotments.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
        >
          <span>+ Add Curriculum Subject</span>
        </button>
      </div>

      {/* 2. Search & Branch Filter */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by course code, title, or professor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["ALL", "CSE", "IT", "ECE", "AIDS", "MECH"].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`rounded-lg border px-3 py-1 text-xs font-semibold font-mono transition ${
                selectedBranch === b
                  ? "border-[#026466] bg-[#E6F1F1] text-[#026466] font-bold"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Course Catalog Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Course Code</th>
                <th className="py-3 px-3">Course Title</th>
                <th className="py-3 px-3 text-center">Branch</th>
                <th className="py-3 px-3 text-center">Semester</th>
                <th className="py-3 px-3 text-center">Credits</th>
                <th className="py-3 px-3 text-center">Type</th>
                <th className="py-3 px-3">Faculty In-Charge</th>
                <th className="py-3 px-3 text-center">Enrolled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-mono text-[#026466] font-bold">
                    {c.code}
                  </td>
                  <td className="py-3 px-3 font-semibold text-black">
                    {c.title}
                  </td>
                  <td className="py-3 px-3 text-center font-mono">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466]">
                      {c.branch}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-black">
                    Sem {c.semester}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-black">
                    {c.credits}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        c.type === "Practical"
                          ? "bg-[#FFF6EE] text-black border border-[#FECDA5]"
                          : c.type === "Integrated"
                          ? "bg-[#FDE8E8] text-[#AF0606] border border-[#AF0606]/30"
                          : "bg-[#E6F1F1] text-[#026466] border border-[#026466]/30"
                      }`}
                    >
                      {c.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-800">
                    {c.facultyInCharge}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-black font-semibold">
                    {c.enrolledStudents}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-black">Add Curriculum Course</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 21CS605"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-black mb-1">
                    Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as Branch)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none font-bold"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="AIDS">AIDS</option>
                    <option value="MECH">MECH</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Computing & Microservices"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-black mb-1">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        Sem {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-black mb-1">
                    Credits
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-black mb-1">
                    Course Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "Theory" | "Practical" | "Integrated")}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                  >
                    <option value="Theory">Theory</option>
                    <option value="Practical">Practical</option>
                    <option value="Integrated">Integrated</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">
                  Faculty In-Charge
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. M. Anandhan"
                  value={facultyInCharge}
                  onChange={(e) => setFacultyInCharge(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-black hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 font-bold text-white shadow-xs"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
