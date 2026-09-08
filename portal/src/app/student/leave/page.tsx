"use client";

import React, { useState } from "react";
import { useApp, LeaveType } from "@/context/AppContext";

export default function StudentLeavePage() {
  const { currentUser, users, leavePetitions, submitLeavePetition } = useApp();

  const student = currentUser.role === "STUDENT"
    ? currentUser
    : users.find((u) => u.role === "STUDENT") || currentUser;

  const [type, setType] = useState<LeaveType>("On-Duty (OD)");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [totalDays, setTotalDays] = useState(1);
  const [reason, setReason] = useState("");
  const [documentRef, setDocumentRef] = useState("");
  const [success, setSuccess] = useState(false);

  // Filter my petitions
  const myPetitions = leavePetitions.filter(
    (p) => p.studentId === student.id || p.regNo === student.rollNo || p.regNo === student.regNo || p.studentName === student.name
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    submitLeavePetition({
      studentId: student.id,
      studentName: student.name,
      regNo: student.rollNo || student.regNo || "113022104001",
      section: student.section || "CSE-A",
      type,
      startDate,
      endDate,
      totalDays: Number(totalDays),
      reason: reason.trim(),
      documentRef: documentRef.trim() || undefined,
    });

    setReason("");
    setDocumentRef("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Digital Leave &amp; On-Duty (OD) Petitions
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Submit formal absence justifications (Hackathons, Medical, Symposia, Sports) and track proctor review remarks in real time.
          </p>
        </div>

        {success && (
          <div className="rounded-lg bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/40 px-3.5 py-1.5 text-xs font-bold text-[#026466] dark:text-teal-400 animate-fadeIn">
            ✓ Petition Dispatched to Proctor Review Queue!
          </div>
        )}
      </div>

      {/* 2. Petition Submission Form */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Submit Absence / On-Duty Request
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold text-slate-900 dark:text-white mb-1">Petition Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as LeaveType)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
              >
                <option value="On-Duty (OD)">On-Duty (OD - Hackathon / Symposium)</option>
                <option value="Medical">Medical Leave (Doctor Certificate)</option>
                <option value="Event">Institutional Sports / Cultural Event</option>
                <option value="Casual">Casual / Family Emergency</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-900 dark:text-white mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-900 dark:text-white mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-900 dark:text-white mb-1">Total Days</label>
              <input
                type="number"
                min={1}
                max={30}
                value={totalDays}
                onChange={(e) => setTotalDays(Number(e.target.value))}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-900 dark:text-white mb-1">Detailed Justification & Event Reference</label>
            <textarea
              rows={3}
              placeholder="State clear purpose of absence, event name, hosting institution, or medical reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-900 dark:text-white mb-1">
              Document Reference / File Name (Proof)
            </label>
            <input
              type="text"
              placeholder="e.g. SIH2026_Selection_Letter.pdf or Apollo_Medical_Certificate.pdf"
              value={documentRef}
              onChange={(e) => setDocumentRef(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-6 py-2.5 font-bold text-white shadow-xs transition"
            >
              Submit Petition to Proctor
            </button>
          </div>
        </form>
      </div>

      {/* 3. My Submissions & Live Status Tracker */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          My Petition Status Tracker ({myPetitions.length})
        </h3>

        <div className="space-y-3">
          {myPetitions.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-500">No petitions submitted yet.</div>
          ) : (
            myPetitions.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 space-y-3 hover:border-[#026466]/40 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-bold ${
                        p.type === "On-Duty (OD)"
                          ? "bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-400 border border-[#026466]/30"
                          : "bg-[#FFF6EE] dark:bg-amber-950 text-[#AF0606] dark:text-amber-300 border border-[#FECDA5]"
                      }`}
                    >
                      {p.type}
                    </span>
                    <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                      {p.startDate} to {p.endDate} ({p.totalDays} Day)
                    </span>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      p.status === "Approved"
                        ? "bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-400 border border-[#026466]/40"
                        : p.status === "Rejected"
                        ? "bg-[#FDE8E8] dark:bg-rose-950 text-[#AF0606] dark:text-rose-400 border border-[#AF0606]/40"
                        : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300"
                    }`}
                  >
                    ● {p.status}
                  </span>
                </div>

                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white">Reason:</strong> {p.reason}
                </p>

                {p.documentRef && (
                  <div className="text-[11px] text-[#026466] dark:text-teal-400 flex items-center gap-1.5 font-mono">
                    <span>📎 Proof:</span>
                    <span>{p.documentRef}</span>
                  </div>
                )}

                {p.facultyRemarks && (
                  <div className="text-[11px] p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Proctor Remark ({p.reviewedBy}):
                    </span>{" "}
                    <span className="text-slate-600 dark:text-slate-300 italic">{p.facultyRemarks}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
