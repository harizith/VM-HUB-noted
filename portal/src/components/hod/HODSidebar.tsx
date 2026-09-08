"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useApp } from "@/context/AppContext";

interface HODSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    label: "Department Overview",
    href: "/hod",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: "Broadcast Circular Center",
    href: "/hod/announcements",
    badge: "Urgent",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    label: "Curriculum Delivery Health",
    href: "/hod/performance",
    badge: "Coverage",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Faculty & Proctor Rosters",
    href: "/hod/faculty",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: "Student Department Roster",
    href: "/hod/students",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: "Department Timetable",
    href: "/hod/timetable",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "My Profile",
    href: "/hod/profile",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function HODSidebar({ isOpen, onClose }: HODSidebarProps) {
  const pathname = usePathname();
  const { currentUser, users } = useApp();

  // Always resolve the HOD profile to prevent metadata leakage
  const hod = currentUser.role === "HOD"
    ? currentUser
    : users.find((u) => u.role === "HOD") || currentUser;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header Branding */}
          <div className="flex items-center justify-between px-2 py-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Link href="/hod" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#026466] text-white font-bold text-base shadow-sm">
                VM
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  Vel Tech Multitech
                </span>
                <span className="text-[11px] font-semibold text-[#AF0606] dark:text-rose-400">
                  HOD / Dept Suite
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              aria-label="Close sidebar"
              className="lg:hidden rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* HOD Profile Summary Card */}
          <div className="p-3 my-3 rounded-xl border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-amber-950/20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#026466] text-white font-bold text-xs">
                {hod.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-amber-100 truncate">
                  {hod.name}
                </h4>
                <p className="text-[10px] text-slate-600 dark:text-amber-200/70 font-mono truncate font-medium">
                  {hod.designation || "Head of Department (CSE)"}
                </p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-300 border-t border-[#FECDA5]/60 dark:border-amber-900/40 pt-2">
              <span>Cabin: <strong className="text-slate-900 dark:text-white font-mono">{hod.cabin || "CSE-HOD-Block-2"}</strong></span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E6F1F1] dark:bg-teal-950/50 text-[#026466] dark:text-teal-400 border border-[#026466]/30">
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
                      ? "bg-[#E6F1F1] dark:bg-slate-800 text-[#026466] dark:text-teal-400 font-bold border-l-3 border-[#026466] dark:border-teal-400"
                      : "text-slate-800 dark:text-slate-200 hover:bg-[#FFF6EE] dark:hover:bg-slate-800 hover:text-[#AF0606] dark:hover:text-rose-400 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${isActive ? "text-[#026466] dark:text-teal-400" : "text-slate-500 dark:text-slate-400 group-hover:text-[#AF0606] dark:group-hover:text-rose-400"}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="rounded-full bg-[#AF0606] dark:bg-rose-700 px-2 py-0.5 text-[9px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sign-out */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 transition hover:bg-[#FDE8E8] dark:hover:bg-rose-950/40 hover:text-[#AF0606] dark:hover:text-rose-400 hover:border-[#AF0606]/40"
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
