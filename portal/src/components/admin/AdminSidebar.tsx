"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    label: "Overview",
    href: "/admin",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: "Student Records",
    href: "/admin/students",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: "HOD Records",
    href: "/admin/hods",
    badge: "5 Heads",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Faculty Directory",
    href: "/admin/faculty",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: "Courses & Curricula",
    href: "/admin/courses",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: "Master Timetable",
    href: "/admin/timetable",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "College Circulars",
    href: "/admin/announcements",
    badge: "Broadcast",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
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
        <div>
          {/* Header Branding */}
          <div className="flex items-center justify-between px-2 py-3 border-b border-slate-200 pb-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#026466] text-white font-bold text-base shadow-sm">
                VM
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black leading-tight">
                  Vel Tech Multitech
                </span>
                <span className="text-[11px] font-semibold text-[#AF0606]">
                  Academic Dean Portal
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

          {/* Admin Identity Card */}
          <div className="p-3 my-3 rounded-xl border border-[#FECDA5] bg-[#FFF6EE]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#026466] text-white font-bold text-xs">
                AD
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-black truncate">
                  Dr. Official Admin
                </h4>
                <p className="text-[10px] text-slate-600 font-mono truncate font-medium">
                  Dean of Academics • VT-ADM-01
                </p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-700 border-t border-[#FECDA5]/60 pt-2">
              <span>Access: <strong className="text-black">Superadmin</strong></span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E6F1F1] text-[#026466] border border-[#026466]/30">
                Live
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
          <div className="flex items-center justify-between text-[11px] text-slate-600 px-1">
            <span>Admin Console</span>
            <span className="font-mono text-[10px] text-[#026466] font-semibold">Secure</span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-black transition hover:bg-[#FDE8E8] hover:text-[#AF0606] hover:border-[#AF0606]/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out Admin
          </button>
        </div>
      </aside>
    </>
  );
}
