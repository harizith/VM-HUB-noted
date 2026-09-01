"use client";

import React, { useState } from "react";
import Link from "next/link";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8 shadow-xs">
      {/* Left: Mobile Drawer Button & Title */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-[#FFF6EE] hover:text-[#AF0606] lg:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-black">Veltech Multitech Higher Administration</span>
            <span className="rounded-md bg-[#E6F1F1] border border-[#026466]/30 px-2 py-0.5 text-[10px] font-bold text-[#026466]">
              Autonomous
            </span>
          </div>
          <span className="text-xs text-slate-600 font-mono">
            Dean of Academic Affairs • Master Oversight Suite
          </span>
        </div>
      </div>

      {/* Right: Quick Actions + Notifications + Admin Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Broadcast Button */}
        <Link
          href="/admin/announcements"
          className="hidden md:flex items-center gap-2 rounded-lg bg-[#AF0606] hover:bg-[#8C0505] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition"
        >
          <span>Issue Circular</span>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-[#FFF6EE] hover:text-[#AF0606] transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#AF0606] text-[10px] font-bold text-white shadow">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-lg z-50 animate-fadeIn space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-black">System Notifications</span>
                <span className="text-[10px] text-[#026466] font-bold">3 New</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="rounded-lg bg-[#E6F1F1] p-2.5 border border-[#026466]/20">
                  <div className="flex items-center justify-between text-[10px] text-[#026466] font-bold">
                    <span>ACADEMIC AUDIT</span>
                    <span className="text-slate-600 font-mono">15m ago</span>
                  </div>
                  <p className="mt-1 text-black font-medium">
                    All 5 engineering branches completed internal syllabus verification.
                  </p>
                </div>

                <div className="rounded-lg bg-[#FFF6EE] p-2.5 border border-[#FECDA5]">
                  <div className="flex items-center justify-between text-[10px] text-[#AF0606] font-bold">
                    <span>ENROLLMENT</span>
                    <span className="text-slate-600 font-mono">2h ago</span>
                  </div>
                  <p className="mt-1 text-black font-medium">
                    New student registrations finalized for Academic Year 2026-27.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill */}
        <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-1.5 pr-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#026466] text-xs font-bold text-white shadow-xs">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-black leading-tight">Dr. Official Admin</span>
            <span className="block text-[10px] text-[#AF0606] font-semibold">Academic Dean</span>
          </div>
        </div>
      </div>
    </header>
  );
}
