"use client";

import React, { useState } from "react";
import {
  departmentFacultyRoster,
  DepartmentFacultyWorkload,
  hodProfile,
} from "@/lib/hodMockData";

export default function HODFacultyPage() {
  const [faculty, setFaculty] = useState<DepartmentFacultyWorkload[]>(departmentFacultyRoster);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Allocation Modal State
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>(
    departmentFacultyRoster[0]?.id || ""
  );
  const [newSubject, setNewSubject] = useState("");
  const [newHours, setNewHours] = useState(4);
  const [successToast, setSuccessToast] = useState(false);

  // Filter logic
  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.staffId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.assignedSubjects.some((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL" || f.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalTeachingHours = faculty.reduce((acc, curr) => acc + curr.weeklyHours, 0);
  const overloadedCount = faculty.filter((f) => f.status === "Overloaded").length;
  const underloadedCount = faculty.filter((f) => f.status === "Underloaded").length;

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    setFaculty((prev) =>
      prev.map((f) => {
        if (f.id === selectedFacultyId) {
          const updatedHours = f.weeklyHours + Number(newHours);
          const updatedStatus: DepartmentFacultyWorkload["status"] =
            updatedHours > 18
              ? "Overloaded"
              : updatedHours < 12
              ? "Underloaded"
              : "Optimal";

          return {
            ...f,
            assignedSubjects: [...f.assignedSubjects, newSubject],
            weeklyHours: updatedHours,
            status: updatedStatus,
          };
        }
        return f;
      })
    );

    setShowAllocateModal(false);
    setNewSubject("");
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
              Faculty Workload & Course Allocation
            </h1>
            <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-0.5 text-xs font-bold text-[#026466]">
              Department Operations
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Teaching staff allocation, contact hours, cabin offices, and course workload distribution for CSE.
          </p>
        </div>

        <button
          onClick={() => setShowAllocateModal(true)}
          className="flex items-center gap-2 rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 text-xs font-bold text-white shadow-xs transition"
        >
          <span>+ Allocate / Reassign Subject</span>
        </button>
      </div>

      {/* Success Banner */}
      {successToast && (
        <div className="rounded-lg border border-[#026466]/30 bg-[#E6F1F1] p-3.5 text-xs font-semibold text-[#026466] flex items-center justify-between animate-fadeIn">
          <span>Subject assigned successfully and weekly contact hours updated in Department Master Schedule.</span>
          <button onClick={() => setSuccessToast(false)} className="text-[#026466] hover:text-black">✕</button>
        </div>
      )}

      {/* 2. Department Workload KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600">Total Department Faculty</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">{faculty.length}</p>
          <span className="text-[10px] text-slate-400">1:23 Staff-to-Student Ratio</span>
        </div>

        <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#026466]">Weekly Teaching Load</span>
          <p className="text-2xl font-bold text-[#026466] font-mono mt-0.5">{totalTeachingHours} hrs</p>
          <span className="text-[10px] text-[#026466]">
            Avg {(totalTeachingHours / faculty.length).toFixed(1)} hrs / faculty
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-700">Optimal Load (14-18 hrs)</span>
          <p className="text-2xl font-bold text-black font-mono mt-0.5">
            {faculty.length - overloadedCount - underloadedCount}
          </p>
          <span className="text-[10px] text-slate-500">Balanced Workload</span>
        </div>

        <div className="rounded-xl border border-[#AF0606]/30 bg-[#FDE8E8] p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#AF0606]">Overloaded (&gt; 18 hrs)</span>
          <p className="text-2xl font-bold text-[#AF0606] font-mono mt-0.5">{overloadedCount}</p>
          <span className="text-[10px] text-[#AF0606]">Reallocation Required</span>
        </div>
      </div>

      {/* 3. Search & Status Filter Toolbar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by faculty name, staff ID, or assigned subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-black focus:border-[#026466] focus:outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["ALL", "Optimal", "Overloaded", "Underloaded"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                statusFilter === status
                  ? "border-[#026466] bg-[#E6F1F1] text-[#026466] font-bold"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Faculty Workload Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-black">Department Faculty Deployment List</h3>
            <p className="text-xs text-slate-500">
              Department: {hodProfile.department} ({faculty.length} Faculty Members)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Staff ID</th>
                <th className="py-3 px-3">Faculty Name</th>
                <th className="py-3 px-3">Designation</th>
                <th className="py-3 px-3">Cabin Office</th>
                <th className="py-3 px-3">Assigned Curricula</th>
                <th className="py-3 px-3 text-center">Weekly Hours</th>
                <th className="py-3 px-3 text-center">Mentees</th>
                <th className="py-3 px-3 text-center">Workload Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFaculty.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-mono text-[#026466] font-bold">
                    {f.staffId}
                  </td>
                  <td className="py-3 px-3 font-semibold text-black">
                    {f.name}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {f.designation}
                  </td>
                  <td className="py-3 px-3 font-mono text-black font-semibold">
                    {f.cabin}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1.5 max-w-sm">
                      {f.assignedSubjects.map((c: string, idx: number) => (
                        <span
                          key={idx}
                          className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-black"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-black">
                    {f.weeklyHours} hrs
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-700">
                    {f.mentorWardsCount}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        f.status === "Overloaded"
                          ? "bg-[#FDE8E8] border border-[#AF0606]/30 text-[#AF0606]"
                          : f.status === "Underloaded"
                          ? "bg-[#FFF6EE] border border-[#FECDA5] text-black"
                          : "bg-[#E6F1F1] border border-[#026466]/30 text-[#026466]"
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Subject Allocation Modal */}
      {showAllocateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-black">Allocate Subject</h3>
              <button
                onClick={() => setShowAllocateModal(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAllocate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-black mb-1">
                  Select Faculty Member
                </label>
                <select
                  value={selectedFacultyId}
                  onChange={(e) => setSelectedFacultyId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                >
                  {faculty.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.staffId} • Current: {f.weeklyHours} hrs)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">
                  Course Code & Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. 21CS603 - Artificial Intelligence (CSE-A)"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">
                  Weekly Contact Hours
                </label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={newHours}
                  onChange={(e) => setNewHours(Number(e.target.value))}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAllocateModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-black hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-2 font-bold text-white shadow-xs"
                >
                  Confirm Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
