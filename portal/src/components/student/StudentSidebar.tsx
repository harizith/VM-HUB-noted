"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface StudentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  registerNumber?: string;
}

const navItems = [
  {
    name: "Dashboard",
    href: "/student",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Attendance",
    href: "/student/attendance",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Courses & Marks",
    href: "/student/courses",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: "Timetable",
    href: "/student/timetable",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function StudentSidebar({
  isOpen,
  onClose,
  studentName = "Sample Student",
  registerNumber = "22104101",
}: StudentSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-slate-200 bg-white p-4 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between px-2 py-3 border-b border-slate-200 pb-4">
            <Link href="/student" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#AF0606] text-white font-bold text-base shadow-sm">
                VM
              </div>
              <div>
                <h1 className="text-sm font-bold text-black leading-tight">
                  Vel Tech Multitech
                </h1>
                <p className="text-[11px] font-semibold text-[#026466]">Student Portal</p>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-black lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs transition-colors duration-150 ${
                    isActive
                      ? "bg-[#E6F1F1] text-[#026466] font-bold border-l-3 border-[#026466]"
                      : "text-black hover:bg-[#FFF6EE] hover:text-[#AF0606] font-medium"
                  }`}
                >
                  <span className={`${isActive ? "text-[#026466]" : "text-slate-500 group-hover:text-[#AF0606]"}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile and Logout Section */}
        <div className="space-y-3 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-3 rounded-lg bg-[#FFF6EE] p-2.5 border border-[#FECDA5]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#AF0606] text-white font-bold text-xs">
              {studentName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-bold text-black leading-snug">{studentName}</p>
              <p className="truncate text-[10px] text-slate-600 font-mono font-medium">{registerNumber}</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-black transition hover:bg-[#FDE8E8] hover:text-[#AF0606] hover:border-[#AF0606]/40"
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
