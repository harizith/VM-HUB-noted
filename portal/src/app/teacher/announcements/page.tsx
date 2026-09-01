"use client";

import React, { useState } from "react";
import {
  initialClassAnnouncements,
  ClassAnnouncement,
  teacherCourses,
} from "@/lib/teacherMockData";

export default function TeacherAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<ClassAnnouncement[]>(
    initialClassAnnouncements
  );

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetSection, setTargetSection] = useState("CSE-A");
  const [courseCode, setCourseCode] = useState("21CS601");
  const [category, setCategory] = useState<ClassAnnouncement["category"]>(
    "Assignment Deadline"
  );
  const [priority, setPriority] = useState<"High" | "Normal">("Normal");
  const [successToast, setSuccessToast] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newAnn: ClassAnnouncement = {
      id: `cann-${Date.now()}`,
      title,
      content,
      targetSection,
      courseCode,
      category,
      priority,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setAnnouncements([newAnn, ...announcements]);
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
            Class Announcements & Broadcasts
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Publish targeted academic notices, assignment updates, and lab instructions to your students.
          </p>
        </div>

        {successToast && (
          <div className="flex items-center gap-2 rounded-lg bg-[#E6F1F1] border border-[#026466]/30 px-3.5 py-1.5 text-xs font-bold text-[#026466] animate-fadeIn">
            <span>Broadcast Sent Directly to Students!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Create New Announcement Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-black">
              Create Targeted Notice
            </h3>
          </div>

          <form onSubmit={handlePublish} className="space-y-3.5 text-xs">
            {/* Target Section */}
            <div>
              <label className="block font-semibold text-black mb-1">
                Target Audience
              </label>
              <select
                value={targetSection}
                onChange={(e) => setTargetSection(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none font-medium"
              >
                <option value="CSE-A">CSE-A (3rd Year)</option>
                <option value="CSE-B">CSE-B (3rd Year)</option>
                <option value="All Handled Classes">All Handled Classes (CSE-A & CSE-B)</option>
              </select>
            </div>

            {/* Course Code */}
            <div>
              <label className="block font-semibold text-black mb-1">
                Associated Subject
              </label>
              <select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
              >
                {teacherCourses.map((c) => (
                  <option key={`${c.code}-${c.section}`} value={c.code}>
                    {c.code} - {c.title}
                  </option>
                ))}
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
                    setCategory(e.target.value as ClassAnnouncement["category"])
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
                >
                  <option value="Assignment Deadline">Assignment</option>
                  <option value="Lab Submission">Lab Task</option>
                  <option value="Test Alert">Test Alert</option>
                  <option value="Study Material">Material</option>
                  <option value="General">General</option>
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
                  <option value="Normal">Normal</option>
                  <option value="High">Urgent</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block font-semibold text-black mb-1">
                Notice Title
              </label>
              <input
                type="text"
                placeholder="e.g. CAT-2 Revision Notes & Assignment 4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none"
              />
            </div>

            {/* Content Body */}
            <div>
              <label className="block font-semibold text-black mb-1">
                Announcement Details
              </label>
              <textarea
                rows={4}
                placeholder="Type your message, deadlines, drive links, or instructions here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black focus:border-[#026466] focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#AF0606] hover:bg-[#8C0505] py-2.5 text-xs font-bold text-white shadow-xs transition"
            >
              Broadcast Notice
            </button>
          </form>
        </div>

        {/* Right 2 Columns: Live Feed of Broadcasts */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-black">
                Active Student Broadcasts ({announcements.length})
              </h3>
              <p className="text-xs text-slate-500">
                These notices appear on the dashboards of students in the designated sections.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="rounded-lg border border-[#FECDA5]/50 bg-[#FFF6EE]/40 p-4 hover:bg-[#FFF6EE] transition space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-xs font-bold text-[#026466]">
                      {ann.category}
                    </span>
                    <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-mono font-medium text-black">
                      {ann.targetSection}
                    </span>
                    <span className="rounded bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-mono text-slate-700">
                      {ann.courseCode}
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
                      title="Delete Announcement"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-black">{ann.title}</h4>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
