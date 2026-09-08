"use client";

import React, { useState } from "react";
import { useApp, CircularCategory, UrgencyLevel, TargetAudience } from "@/context/AppContext";

export default function HODAnnouncementsPage() {
  const { circulars, publishCircular, currentUser } = useApp();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<CircularCategory>("Academic");
  const [urgency, setUrgency] = useState<UrgencyLevel>("Important");
  const [targetAudience, setTargetAudience] = useState<TargetAudience>("All Department");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    publishCircular({
      title: title.trim(),
      content: content.trim(),
      category,
      urgency,
      targetAudience,
      publishedBy: `${currentUser.name} (HOD / CSE)`,
      publisherRole: "HOD",
      department: "Computer Science & Engineering",
      date: new Date().toISOString().split("T")[0],
    });

    setTitle("");
    setContent("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const deptCirculars = circulars.filter(
    (c) => c.publisherRole === "HOD" || c.department.includes("Computer") || c.targetAudience === "All Department"
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Department Broadcast Center
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Issue departmental notices, symposia circulars, and academic instructions to CSE faculty and student cohorts.
          </p>
        </div>

        {success && (
          <div className="rounded-lg bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/40 px-3.5 py-1.5 text-xs font-bold text-[#026466] dark:text-teal-400 animate-fadeIn">
            ✓ Department Broadcast Issued Successfully!
          </div>
        )}
      </div>

      {/* 2. Composer */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Compose Department Notice
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-900 dark:text-white mb-1">Notice Title</label>
            <input
              type="text"
              placeholder="e.g. Department Symposium Organizing Committee & On-Duty Guidelines"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Audience Scope */}
            <div>
              <label className="block font-semibold text-slate-900 dark:text-white mb-1">Audience Scope</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as TargetAudience)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
              >
                <option value="All Department">All Department (Faculty + Students)</option>
                <option value="All Students">All Students (CSE-A & CSE-B)</option>
                <option value="Faculty Only">Faculty Members Only</option>
                <option value="CSE-A">CSE-A Section</option>
                <option value="CSE-B">CSE-B Section</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold text-slate-900 dark:text-white mb-1">Notice Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CircularCategory)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
              >
                <option value="Academic">Academic / Syllabi</option>
                <option value="Exam">Exam Cell & CAT Review</option>
                <option value="Event">Department Symposium / Event</option>
                <option value="Admin">Administrative Circular</option>
                <option value="General">General Notice</option>
              </select>
            </div>

            {/* Urgency */}
            <div>
              <label className="block font-semibold text-slate-900 dark:text-white mb-1">Urgency Level</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
              >
                <option value="Standard">Standard Notice</option>
                <option value="Important">Important Action Required</option>
                <option value="Urgent">Urgent Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-900 dark:text-white mb-1">Notice Body & Instructions</label>
            <textarea
              rows={4}
              placeholder="Enter comprehensive notice body, event dates, reporting venues, and designated coordinator names..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-6 py-2.5 font-bold text-white shadow-xs transition"
            >
              Broadcast Notice
            </button>
          </div>
        </form>
      </div>

      {/* 3. Broadcast History */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Department Circular Ledger ({deptCirculars.length})
        </h3>

        <div className="space-y-3">
          {deptCirculars.map((circ) => (
            <div
              key={circ.id}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 space-y-2 hover:bg-slate-100/70 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466] dark:text-teal-400">
                    {circ.category}
                  </span>
                  <span className="rounded bg-slate-200 dark:bg-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-800 dark:text-slate-200">
                    Scope: {circ.targetAudience}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      circ.urgency === "Urgent"
                        ? "bg-[#FDE8E8] dark:bg-rose-950 text-[#AF0606] dark:text-rose-400 border border-[#AF0606]/30"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {circ.urgency}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{circ.date}</span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{circ.title}</h4>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{circ.content}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 dark:border-slate-700">
                <span>Published by: <strong className="text-slate-800 dark:text-slate-200">{circ.publishedBy}</strong></span>
                <span>Acknowledged by {circ.readBy.length} recipients</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
