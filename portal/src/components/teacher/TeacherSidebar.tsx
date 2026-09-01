"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { teacherProfile } from "@/lib/teacherMockData";

interface TeacherSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    label: "Dashboard",
    href: "/teacher",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Mark Attendance",
    href: "/teacher/attendance",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Internal Marks",
    href: "/teacher/marks",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Class Announcements",
    href: "/teacher/announcements",
    badge: "Active",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    label: "Teaching Schedule",
    href: "/teacher/timetable",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Students & Proctors",
    href: "/teacher/students",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function TeacherSidebar({ isOpen, onClose }: TeacherSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 flex flex-col justify-between border-r border-slate-200 bg-white p-4 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        }`}
      >
        {/* Top Branding Section */}
        <div>
          <div className="flex items-center justify-between px-2 py-3 border-b border-slate-200 pb-4">
            <Link href="/teacher" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#026466] text-white font-bold text-base shadow-sm">
                VM
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black leading-tight">
                  Vel Tech Multitech
                </span>
                <span className="text-[11px] font-semibold text-[#AF0606]">
                  Faculty Portal
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="lg:hidden rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-black"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Faculty Profile Summary Card */}
          <div className="p-3 my-3 rounded-xl border border-[#FECDA5] bg-[#FFF6EE]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#026466] text-white font-bold text-xs">
                {teacherProfile.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-black truncate">
                  {teacherProfile.name}
                </h4>
                <p className="text-[10px] text-slate-600 font-mono truncate font-medium">
                  {teacherProfile.staffId} • {teacherProfile.designation}
                </p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-700 border-t border-[#FECDA5]/60 pt-2">
              <span>Cabin: <strong className="text-black font-mono">{teacherProfile.cabin}</strong></span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E6F1F1] text-[#026466] border border-[#026466]/30">
                Active
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 mt-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group relative flex items-center justify-between rounded-lg px-3 py-2.5 text-xs transition-colors duration-150 ${
                    isActive
                      ? "bg-[#E6F1F1] text-[#026466] font-bold border-l-3 border-[#026466]"
                      : "text-black hover:bg-[#FFF6EE] hover:text-[#AF0606] font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${isActive ? "text-[#026466]" : "text-slate-500 group-hover:text-[#AF0606]"}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="rounded-full bg-[#AF0606] px-2 py-0.5 text-[9px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sign-out */}
        <div className="pt-3 border-t border-slate-200 space-y-2.5">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-black transition hover:bg-[#FDE8E8] hover:text-[#AF0606] hover:border-[#AF0606]/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
