"use client";

import React, { useState } from "react";
import { announcementsData } from "@/lib/studentMockData";

interface StudentHeaderProps {
  onMenuClick: () => void;
  studentName?: string;
  department?: string;
  semester?: number;
}

export default function StudentHeader({
  onMenuClick,
  studentName = "Sample Student",
  department = "Computer Science and Engineering",
  semester = 6,
}: StudentHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8 shadow-xs">
      {/* Left section: mobile hamburger & breadcrumb info */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-[#FFF6EE] hover:text-[#AF0606] lg:hidden"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-[11px] font-bold text-[#026466] uppercase tracking-wider">
              Semester {semester}
            </span>
            <span className="hidden sm:inline-block text-xs text-black font-medium">
              {department}
            </span>
          </div>
        </div>
      </div>

      {/* Right section: Date, Notifications, and Profile */}
      <div className="flex items-center gap-3">
        {/* Date badge */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-black font-medium">
          <svg className="w-3.5 h-3.5 text-[#026466]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {currentDate}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-[#FFF6EE] hover:text-[#AF0606] transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#AF0606] text-[10px] font-bold text-white shadow">
              {announcementsData.length}
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-xl border border-slate-200 bg-white p-4 shadow-lg z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold text-black">Announcements & Notices</h4>
                <span className="text-[10px] font-bold text-[#026466]">{announcementsData.length} Active</span>
              </div>
              <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                {announcementsData.map((ann) => (
                  <div
                    key={ann.id}
                    className="rounded-lg border border-slate-100 bg-[#FFF6EE]/40 p-2.5 hover:bg-[#FFF6EE] transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded bg-[#E6F1F1] border border-[#026466]/30 px-1.5 py-0.5 text-[9px] font-bold text-[#026466]">
                        {ann.category}
                      </span>
                      <span className="text-[10px] text-slate-600 font-mono">{ann.date}</span>
                    </div>
                    <h5 className="mt-1 text-xs font-bold text-black">{ann.title}</h5>
                    <p className="mt-0.5 text-[11px] text-slate-700 line-clamp-2">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF6EE] border border-[#FECDA5] text-[#AF0606] font-bold text-xs">
            {studentName.charAt(0)}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-black leading-tight">{studentName}</span>
            <span className="text-[10px] text-[#026466] font-semibold">Student Ward</span>
          </div>
        </div>
      </div>
    </header>
  );
}
