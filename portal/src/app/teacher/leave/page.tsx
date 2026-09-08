"use client";

import React, { useState } from "react";
import { useApp, LeavePetitionRecord } from "@/context/AppContext";

export default function TeacherLeaveAdjudicationPage() {
  const { leavePetitions, adjudicateLeavePetition } = useApp();

  const [selectedPetition, setSelectedPetition] = useState<LeavePetitionRecord | null>(null);
  const [remarks, setRemarks] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const handleAction = (status: "Approved" | "Rejected") => {
    if (!selectedPetition) return;
    adjudicateLeavePetition(
      selectedPetition.id,
      status,
      remarks.trim() || (status === "Approved" ? "Approved with full On-Duty / attendance credit." : "Rejected due to academic schedule conflict.")
    );
    setSelectedPetition(null);
    setRemarks("");
  };

  const filteredPetitions = leavePetitions.filter((p) => {
    if (filterStatus === "ALL") return true;
    return p.status === filterStatus;
  });

  const pendingCount = leavePetitions.filter((p) => p.status === "Pending").length;
  const approvedCount = leavePetitions.filter((p) => p.status === "Approved").length;
  const rejectedCount = leavePetitions.filter((p) => p.status === "Rejected").length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Leave & On-Duty (OD) Adjudication Queue
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Review student absence petitions, verify attached proofs (hackathons, medical, symposiums), and log official decisions.
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="flex items-center gap-2 rounded-lg bg-[#FDE8E8] dark:bg-rose-950/40 border border-[#AF0606]/30 px-3 py-1.5 text-xs font-bold text-[#AF0606] dark:text-rose-400 animate-pulse">
            <span>⚠️ {pendingCount} Petition(s) Pending Review</span>
          </div>
        )}
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Total Petitions</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">{leavePetitions.length}</p>
        </div>
        <div className="rounded-xl border border-[#AF0606]/30 dark:border-rose-900/50 bg-[#FDE8E8] dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#AF0606] dark:text-rose-400">Action Pending</span>
          <p className="text-2xl font-bold text-[#AF0606] dark:text-rose-400 font-mono mt-0.5">{pendingCount}</p>
        </div>
        <div className="rounded-xl border border-[#026466]/30 dark:border-teal-800 bg-[#E6F1F1] dark:bg-slate-900 p-4 text-center shadow-sm">
          <span className="text-xs font-bold text-[#026466] dark:text-teal-400">Approved</span>
          <p className="text-2xl font-bold text-[#026466] dark:text-teal-400 font-mono mt-0.5">{approvedCount}</p>
        </div>
      </div>

      {/* 3. Filter Tabs */}
      <div className="flex items-center gap-2">
        {["ALL", "Pending", "Approved", "Rejected"].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              filterStatus === st
                ? "border-[#026466] dark:border-teal-400 bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-400 font-bold"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
            }`}
          >
            {st} ({st === "ALL" ? leavePetitions.length : leavePetitions.filter((l) => l.status === st).length})
          </button>
        ))}
      </div>

      {/* 4. Petitions List */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Student Absence Applications
        </h3>

        <div className="space-y-3">
          {filteredPetitions.map((petition) => (
            <div
              key={petition.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 space-y-3 hover:border-[#026466]/40 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    {petition.studentName}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 font-bold">
                    ({petition.regNo} • {petition.section})
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      petition.type === "On-Duty (OD)"
                        ? "bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-400 border border-[#026466]/30"
                        : "bg-[#FFF6EE] dark:bg-amber-950 text-[#AF0606] dark:text-amber-300 border border-[#FECDA5]"
                    }`}
                  >
                    {petition.type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      petition.status === "Approved"
                        ? "bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-400"
                        : petition.status === "Rejected"
                        ? "bg-[#FDE8E8] dark:bg-rose-950 text-[#AF0606] dark:text-rose-400"
                        : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                    }`}
                  >
                    {petition.status}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(petition.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Justification & Dates */}
              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
                  <span>Duration: <strong className="text-slate-800 dark:text-slate-200">{petition.startDate} to {petition.endDate}</strong></span>
                  <span>•</span>
                  <span>Days: <strong className="text-[#026466] dark:text-teal-400">{petition.totalDays} Day(s)</strong></span>
                </div>
                <p className="mt-1 leading-relaxed text-slate-800 dark:text-slate-200">
                  <strong className="text-slate-900 dark:text-white">Reason:</strong> {petition.reason}
                </p>

                {petition.documentRef && (
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[#026466] dark:text-teal-400 font-medium">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span>Attached Reference: <strong>{petition.documentRef}</strong></span>
                  </div>
                )}
              </div>

              {/* Remarks if reviewed */}
              {petition.facultyRemarks && (
                <div className="text-[11px] bg-slate-100 dark:bg-slate-800/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Reviewer ({petition.reviewedBy}):</span>{" "}
                  <span className="text-slate-600 dark:text-slate-300 italic">{petition.facultyRemarks}</span>
                </div>
              )}

              {/* Action Buttons if Pending */}
              {petition.status === "Pending" && (
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setSelectedPetition(petition);
                      setRemarks("");
                    }}
                    className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-1.5 text-xs font-bold text-white shadow-xs transition"
                  >
                    Adjudicate Petition →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Adjudication Modal */}
      {selectedPetition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Adjudicate {selectedPetition.type}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedPetition.studentName} ({selectedPetition.regNo})
                </span>
              </div>
              <button
                onClick={() => setSelectedPetition(null)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <div><strong>Dates:</strong> {selectedPetition.startDate} to {selectedPetition.endDate} ({selectedPetition.totalDays} days)</div>
              <div><strong>Justification:</strong> {selectedPetition.reason}</div>
              {selectedPetition.documentRef && (
                <div className="text-[#026466] dark:text-teal-400"><strong>Document Proof:</strong> {selectedPetition.documentRef}</div>
              )}
            </div>

            <div className="space-y-1 text-xs">
              <label className="block font-semibold text-slate-900 dark:text-white">
                Faculty Review Remarks
              </label>
              <textarea
                rows={3}
                placeholder="Enter remarks (e.g. Approved with full attendance credit, Best wishes for the event)..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleAction("Rejected")}
                className="rounded-lg border border-[#AF0606]/40 bg-[#FDE8E8] dark:bg-rose-950 px-4 py-2 text-xs font-bold text-[#AF0606] dark:text-rose-400 hover:bg-[#AF0606] hover:text-white transition"
              >
                ✕ Reject Petition
              </button>
              <button
                type="button"
                onClick={() => handleAction("Approved")}
                className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-5 py-2 text-xs font-bold text-white shadow-xs transition"
              >
                ✓ Approve & Grant OD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
