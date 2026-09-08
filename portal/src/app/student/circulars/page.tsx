"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function StudentCircularsPage() {
  const { circulars, acknowledgeCircular, currentUser, users } = useApp();

  const student = currentUser.role === "STUDENT"
    ? currentUser
    : users.find((u) => u.role === "STUDENT") || currentUser;

  const [filterSource, setFilterSource] = useState<"ALL" | "COUNSELOR" | "FACULTY" | "HOD">("ALL");

  const filteredCirculars = circulars.filter((c) => {
    if (filterSource === "COUNSELOR") {
      return c.targetAudience === "Mentees Only" || c.publishedBy.includes(student.mentor || "Sample");
    }
    if (filterSource === "HOD") {
      return c.publisherRole === "HOD" || c.publisherRole === "ADMIN";
    }
    if (filterSource === "FACULTY") {
      return c.publisherRole === "TEACHER" && c.targetAudience !== "Mentees Only";
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Unified Circulars &amp; Counselor Feed
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Official circulars, proctor directives, exam cell notifications, and 1-click read receipt acknowledgments.
        </p>
      </div>

      {/* 2. Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "ALL", label: "All Circulars" },
          { id: "COUNSELOR", label: "🔒 Counselor Direct (Mentees)" },
          { id: "FACULTY", label: "📢 Course Instructors" },
          { id: "HOD", label: "🏛️ HOD & Dean Circulars" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterSource(tab.id as any)}
            className={`rounded-xl border px-4 py-2 text-xs font-semibold transition ${
              filterSource === tab.id
                ? "border-[#026466] dark:border-teal-400 bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-400 font-bold shadow-xs"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Circular Feed Cards */}
      <div className="space-y-4">
        {filteredCirculars.map((c) => {
          const isAcknowledged = c.readBy.includes(student.email);

          return (
            <div
              key={c.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-3 hover:border-[#026466]/40 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      c.urgency === "Urgent"
                        ? "bg-[#FDE8E8] dark:bg-rose-950 text-[#AF0606] dark:text-rose-400 border border-[#AF0606]/30"
                        : "bg-[#E6F1F1] dark:bg-teal-950 text-[#026466] dark:text-teal-400 border border-[#026466]/30"
                    }`}
                  >
                    {c.urgency}
                  </span>
                  <span className="rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300">
                    Category: {c.category}
                  </span>
                  <span className="rounded bg-amber-50 dark:bg-amber-950/50 border border-[#FECDA5] px-2 py-0.5 text-[10px] font-mono text-slate-800 dark:text-amber-200">
                    Target: {c.targetAudience}
                  </span>
                </div>

                <span className="text-[10px] text-slate-500 font-mono">{c.date}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {c.title}
              </h3>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                {c.content}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Published by: <strong className="text-slate-900 dark:text-white">{c.publishedBy}</strong>
                </div>

                <div>
                  {isAcknowledged ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 px-3 py-1.5 text-xs font-bold text-[#026466] dark:text-teal-400">
                      ✓ Acknowledged Read
                    </span>
                  ) : (
                    <button
                      onClick={() => acknowledgeCircular(c.id)}
                      className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-4 py-1.5 text-xs font-bold text-white shadow-xs transition"
                    >
                      Acknowledge &amp; Mark Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
