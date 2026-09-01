"use client";

import React, { useState } from "react";
import {
  initialCollegeAnnouncements,
  CollegeAnnouncement,
} from "@/lib/adminMockData";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<CollegeAnnouncement[]>(
    initialCollegeAnnouncements
  );

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetAudience, setTargetAudience] =
    useState<CollegeAnnouncement["targetAudience"]>("All College");
  const [category, setCategory] =
    useState<CollegeAnnouncement["category"]>("Academic");
  const [priority, setPriority] = useState<"High" | "Normal">("Normal");
  const [publishedBy, setPublishedBy] = useState("Dean Academic Affairs");
  const [successToast, setSuccessToast] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNotice: CollegeAnnouncement = {
      id: `COLL-ANN-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      targetAudience,
      category,
      priority,
      publishedBy: publishedBy.trim() || "Dean's Office",
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    setAnnouncements([newNotice, ...announcements]);
    setTitle("");
    setContent("");
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
            Institutional Circulars & Broadcast Hub
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Publish university circulars, COE exam schedules, and emergency notices to Student & Faculty portals.
          </p>
        </div>

        {successToast && (
          <div className="flex items-center gap-2 rounded-lg bg-[#E6F1F1] border border-[#026466]/30 px-3.5 py-1.5 text-xs font-bold text-[#026466] animate-fadeIn">
            <span>Circular Published Across All Portals!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Publish Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-black">Issue Official Circular</h3>
          </div>

          <form onSubmit={handlePublish} className="space-y-3.5 text-xs">
            {/* Target Audience */}
            <div>
              <label className="block font-semibold text-black mb-1">
                Target Audience
              </label>
              <select
                value={targetAudience}
                onChange={(e) =>
                  setTargetAudience(
                    e.target.value as CollegeAnnouncement["targetAudience"]
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none font-medium"
              >
                <option value="All College">All College (Students + Faculty + Staff)</option>
                <option value="Students Only">Students Only</option>
                <option value="Faculty Only">Faculty Only</option>
                <option value="CSE">CSE Department Only</option>
                <option value="IT">IT Department Only</option>
                <option value="ECE">ECE Department Only</option>
                <option value="AIDS">AIDS Department Only</option>
                <option value="MECH">MECH Department Only</option>
              </select>
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-black mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as CollegeAnnouncement["category"])
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                >
                  <option value="Exam Cell">Exam Cell</option>
                  <option value="Dean's Office">Dean&apos;s Office</option>
                  <option value="Emergency Alert">Emergency Alert</option>
                  <option value="Symposium / Event">Symposium</option>
                  <option value="Academic">Academic</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-black mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as "High" | "Normal")
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                >
                  <option value="High">Urgent</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
            </div>

            {/* Issuing Authority */}
            <div>
              <label className="block font-semibold text-black mb-1">
                Issuing Authority
              </label>
              <input
                type="text"
                value={publishedBy}
                onChange={(e) => setPublishedBy(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block font-semibold text-black mb-1">
                Circular Heading
              </label>
              <input
                type="text"
                placeholder="e.g. End Semester Theory Examination Schedule"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block font-semibold text-black mb-1">
                Notice Instructions
              </label>
              <textarea
                rows={4}
                placeholder="Write full circular instructions, deadlines, or schedules..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#AF0606] hover:bg-[#8C0505] py-2.5 text-xs font-bold text-white shadow-xs transition"
            >
              Broadcast Circular
            </button>
          </form>
        </div>

        {/* Right 2 Columns: Live Circulars Feed */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-black">
                Active College Circulars ({announcements.length})
              </h3>
              <p className="text-xs text-slate-500">
                Official institutional notifications visible across the campus.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="rounded-lg border border-[#FECDA5]/50 bg-[#FFF6EE]/40 p-4 hover:bg-[#FFF6EE] transition space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466]">
                      {ann.category}
                    </span>
                    <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-mono font-medium text-black">
                      {ann.targetAudience}
                    </span>
                    {ann.priority === "High" && (
                      <span className="rounded bg-[#FDE8E8] border border-[#AF0606]/30 px-2 py-0.5 text-[10px] font-bold text-[#AF0606]">
                        URGENT
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {ann.date}
                    </span>
                    <button
                      onClick={() => handleDelete(ann.id)}
                      className="rounded p-1 text-slate-400 hover:text-[#AF0606] hover:bg-[#FDE8E8] transition"
                      title="Archive Notice"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-black">{ann.title}</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {ann.content}
                </p>
                <div className="text-[10px] text-[#AF0606] font-semibold">
                  Issued by: {ann.publishedBy}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
