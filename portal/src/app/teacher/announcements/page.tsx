"use client";

import React, { useState } from "react";
import { useApp, CircularCategory, UrgencyLevel, TargetAudience } from "@/context/AppContext";

export default function TeacherBroadcastPage() {
  const { circulars, publishCircular, currentUser } = useApp();

  const [channel, setChannel] = useState<"CLASS" | "MENTEES">("CLASS");
  const [targetSection, setTargetSection] = useState<"CSE-A" | "CSE-B">("CSE-A");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<CircularCategory>("Academic");
  const [urgency, setUrgency] = useState<UrgencyLevel>("Standard");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const audience: TargetAudience = channel === "MENTEES" ? "Mentees Only" : targetSection;

    publishCircular({
      title: title.trim(),
      content: content.trim(),
      category,
      urgency,
      targetAudience: audience,
      publishedBy: currentUser.name,
      publisherRole: "TEACHER",
      department: "Computer Science & Engineering",
      date: new Date().toISOString().split("T")[0],
    });

    setTitle("");
    setContent("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const myBroadcasts = circulars.filter(
    (c) => c.publishedBy.includes(currentUser.name) || c.publisherRole === "TEACHER"
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dual-Channel Broadcast Composer
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Publish course updates to enrolled classroom sections or send private counselor directives to your assigned mentees.
          </p>
        </div>

        {success && (
          <div className="rounded-lg bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/40 px-3.5 py-1.5 text-xs font-bold text-[#026466] dark:text-teal-400 animate-fadeIn">
            ✓ Broadcast Published Successfully!
          </div>
        )}
      </div>

      {/* 2. Channel Selector & Composer */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        {/* Dual Channel Switcher */}
        <div className="grid grid-cols-2 gap-3 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setChannel("CLASS")}
            className={`py-2.5 px-4 rounded-lg font-bold text-xs transition flex items-center justify-center gap-2 ${
              channel === "CLASS"
                ? "bg-white dark:bg-slate-900 text-[#026466] dark:text-teal-400 shadow-xs border border-slate-200 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <span>📢 Class Enrollment Channel</span>
            <span className="text-[10px] font-mono text-slate-400">(Section Broadcaster)</span>
          </button>

          <button
            type="button"
            onClick={() => setChannel("MENTEES")}
            className={`py-2.5 px-4 rounded-lg font-bold text-xs transition flex items-center justify-center gap-2 ${
              channel === "MENTEES"
                ? "bg-white dark:bg-slate-900 text-[#AF0606] dark:text-rose-400 shadow-xs border border-slate-200 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            <span>🔒 Proctor Mentee Private Channel</span>
            <span className="text-[10px] font-mono text-slate-400">(My Wards Only)</span>
          </button>
        </div>

        {/* Composer Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {channel === "CLASS" ? (
              <div>
                <label className="block font-semibold text-slate-900 dark:text-white mb-1">Target Section</label>
                <select
                  value={targetSection}
                  onChange={(e) => setTargetSection(e.target.value as "CSE-A" | "CSE-B")}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                >
                  <option value="CSE-A">CSE-A Section (Enrolled)</option>
                  <option value="CSE-B">CSE-B Section (Enrolled)</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block font-semibold text-slate-900 dark:text-white mb-1">Channel Audience</label>
                <div className="p-2 rounded-lg bg-[#FFF6EE] dark:bg-amber-950/40 border border-[#FECDA5] dark:border-amber-900/50 text-[#AF0606] dark:text-amber-200 font-bold font-mono">
                  🔒 Restricted to Assigned Mentees
                </div>
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-900 dark:text-white mb-1">Notice Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CircularCategory)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
              >
                <option value="Academic">Academic / Assignment</option>
                <option value="Exam">CAT Exam Prep</option>
                <option value="General">Proctor Review / Counseling</option>
                <option value="Event">Hackathon / Lab Submissions</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-900 dark:text-white mb-1">Urgency</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
              >
                <option value="Standard">Standard Information</option>
                <option value="Important">Important Action Due</option>
                <option value="Urgent">Urgent Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-900 dark:text-white mb-1">Notice Heading</label>
            <input
              type="text"
              placeholder={channel === "MENTEES" ? "e.g. Midterm Attendance Counseling & Progress Check" : "e.g. Cloud Computing Lab Assignment 3 Submission Deadline"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-900 dark:text-white mb-1">Detailed Message</label>
            <textarea
              rows={4}
              placeholder="Enter instructions, syllabus references, deadlines, and action items..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              className={`rounded-lg px-6 py-2.5 font-bold text-white shadow-xs transition ${
                channel === "MENTEES"
                  ? "bg-[#AF0606] hover:bg-[#8C0505]"
                  : "bg-[#026466] hover:bg-[#014B4D]"
              }`}
            >
              {channel === "MENTEES" ? "🔒 Dispatch to Mentees Only" : "📢 Broadcast to Section"}
            </button>
          </div>
        </form>
      </div>

      {/* 3. Broadcast History */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          My Published Announcements ({myBroadcasts.length})
        </h3>

        <div className="space-y-3">
          {myBroadcasts.map((circ) => (
            <div
              key={circ.id}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 space-y-2 hover:bg-slate-100/70 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#E6F1F1] dark:bg-teal-950 border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466] dark:text-teal-400">
                    {circ.category}
                  </span>
                  <span className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold ${
                    circ.targetAudience === "Mentees Only"
                      ? "bg-[#FFF6EE] dark:bg-amber-950 text-[#AF0606] dark:text-amber-200 border border-[#FECDA5]"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                  }`}>
                    {circ.targetAudience === "Mentees Only" ? "🔒 Mentees Private" : `📢 Target: ${circ.targetAudience}`}
                  </span>
                  <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    {circ.urgency}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{circ.date}</span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{circ.title}</h4>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">{circ.content}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 dark:border-slate-700">
                <span>By: <strong className="text-slate-800 dark:text-slate-200">{circ.publishedBy}</strong></span>
                <span>{circ.readBy.length} Acknowledged Read</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
