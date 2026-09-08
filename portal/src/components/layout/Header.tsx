"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp, Role } from "@/context/AppContext";
import UserProfileModal from "@/components/profile/UserProfileModal";

interface HeaderProps {
  onMenuToggle: () => void;
  portalTitle?: string;
  portalSubtitle?: string;
}

export default function Header({
  onMenuToggle,
  portalTitle = "Vel Tech Multitech Autonomous Portal",
  portalSubtitle = "Academic ERP & Management System",
}: HeaderProps) {
  const router = useRouter();
  const {
    currentUser,
    activeRole,
    theme,
    toggleTheme,
    switchPersona,
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    resetDatabase,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read);

  const handlePersonaSelect = (role: Role, route: string) => {
    switchPersona(role);
    setShowPersonaMenu(false);
    router.push(route);
  };

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return { label: "Super Admin", color: "bg-[#AF0606] text-white" };
      case "HOD":
        return { label: "HOD / Dept Head", color: "bg-[#026466] text-white" };
      case "TEACHER":
        return { label: "Faculty / Proctor", color: "bg-[#026466] text-white" };
      case "STUDENT":
        return { label: "Student", color: "bg-[#FECDA5] text-black font-bold" };
    }
  };

  const currentBadge = getRoleBadge(activeRole);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 md:px-8 shadow-xs transition-colors">
      {/* Left: Mobile Drawer Button & Portal Brand */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onMenuToggle}
          aria-label="Toggle Navigation Drawer"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#FFF6EE] dark:hover:bg-slate-700 hover:text-[#AF0606] lg:hidden transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {portalTitle}
            </span>
            <span className="rounded-md bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/30 dark:border-[#026466]/60 px-2 py-0.5 text-[10px] font-bold text-[#026466] dark:text-teal-400">
              Autonomous
            </span>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            {portalSubtitle}
          </span>
        </div>
      </div>

      {/* Right Controls: Persona Switcher, Dark/Light Mode, Notifications, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* 1. Live Persona Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowPersonaMenu(!showPersonaMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-amber-950/30 px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-amber-200 hover:bg-[#FECDA5]/40 transition shadow-xs"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden md:inline font-mono text-[11px] text-slate-500 dark:text-slate-400">Switch:</span>
            <span className="font-bold">{currentBadge.label}</span>
            <svg className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showPersonaMenu && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-xl z-50 animate-fadeIn space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 px-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Switch Active Persona</span>
                <span className="text-[10px] font-mono text-[#AF0606] dark:text-rose-400 font-bold">1-Click Fast Access</span>
              </div>

              <div className="space-y-1 text-xs">
                {/* Super Admin */}
                <button
                  onClick={() => handlePersonaSelect("ADMIN", "/admin")}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition ${
                    activeRole === "ADMIN"
                      ? "bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/40 font-bold text-[#026466] dark:text-teal-400"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>🛡️ Super Admin</span>
                      {activeRole === "ADMIN" && <span className="text-[10px] text-[#026466] dark:text-teal-400 font-mono font-normal">(Current)</span>}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">admin@veltech.edu.in</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Dean</span>
                </button>

                {/* HOD */}
                <button
                  onClick={() => handlePersonaSelect("HOD", "/hod")}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition ${
                    activeRole === "HOD"
                      ? "bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/40 font-bold text-[#026466] dark:text-teal-400"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>👔 HOD Portal</span>
                      {activeRole === "HOD" && <span className="text-[10px] text-[#026466] dark:text-teal-400 font-mono font-normal">(Current)</span>}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">hod@veltech.edu.in</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">CSE Head</span>
                </button>

                {/* Faculty / Proctor */}
                <button
                  onClick={() => handlePersonaSelect("TEACHER", "/teacher")}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition ${
                    activeRole === "TEACHER"
                      ? "bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/40 font-bold text-[#026466] dark:text-teal-400"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>👨‍🏫 Faculty / Mentor</span>
                      {activeRole === "TEACHER" && <span className="text-[10px] text-[#026466] dark:text-teal-400 font-mono font-normal">(Current)</span>}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">teacher@veltech.edu.in</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">Staff</span>
                </button>

                {/* Student */}
                <button
                  onClick={() => handlePersonaSelect("STUDENT", "/student")}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition ${
                    activeRole === "STUDENT"
                      ? "bg-[#E6F1F1] dark:bg-slate-800 border border-[#026466]/40 font-bold text-[#026466] dark:text-teal-400"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <span>🧑‍🎓 Student Portal</span>
                      {activeRole === "STUDENT" && <span className="text-[10px] text-[#026466] dark:text-teal-400 font-mono font-normal">(Current)</span>}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">student@veltech.edu.in</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">CSE-A</span>
                </button>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => {
                    if (confirm("Reset database to initial seed data?")) {
                      resetDatabase();
                      setShowPersonaMenu(false);
                      router.push("/");
                    }
                  }}
                  className="text-xs text-[#AF0606] hover:underline font-semibold"
                >
                  🔄 Reset DB
                </button>
                <Link
                  href="/login"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  Login Screen →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 2. Theme Toggle (Dark / Light) */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#FFF6EE] dark:hover:bg-slate-700 transition"
        >
          {theme === "dark" ? (
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* 3. Notifications Drawer */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowPersonaMenu(false);
            }}
            aria-label="Open notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#FFF6EE] dark:hover:bg-slate-700 hover:text-[#AF0606] transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadNotifs.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#AF0606] text-[10px] font-bold text-white shadow">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-xl z-50 animate-fadeIn space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Institutional Notifications</span>
                  {unreadNotifs.length > 0 && (
                    <span className="rounded-full bg-[#AF0606]/10 text-[#AF0606] px-2 py-0.5 text-[10px] font-bold">
                      {unreadNotifs.length} New
                    </span>
                  )}
                </div>
                {unreadNotifs.length > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-[#026466] dark:text-teal-400 font-semibold hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">No notifications</div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`cursor-pointer rounded-lg p-2.5 border transition ${
                        !notif.read
                          ? "bg-[#E6F1F1] dark:bg-slate-800/80 border-[#026466]/30 dark:border-teal-800"
                          : "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 opacity-80"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[#026466] dark:text-teal-400 font-mono">
                          {notif.category}
                        </span>
                        <span className="text-slate-500 font-mono">{notif.timestamp}</span>
                      </div>
                      <h4 className="mt-1 text-xs font-bold text-slate-900 dark:text-white">
                        {notif.title}
                      </h4>
                      <p className="mt-0.5 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* 4. Active Profile Pill (Click to open full profile) */}
        <button
          onClick={() => setShowProfileModal(true)}
          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-1.5 pr-3 hover:border-[#026466] dark:hover:border-teal-400 hover:bg-slate-100 dark:hover:bg-slate-750 transition cursor-pointer text-left shadow-2xs group"
          title="Click to view full profile & academic details"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#026466] text-xs font-bold text-white shadow-xs group-hover:scale-105 transition">
            {currentUser.name.charAt(0)}
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[120px] group-hover:text-[#026466] dark:group-hover:text-teal-400 transition">
              {currentUser.name}
            </span>
            <span className="block text-[10px] text-[#AF0606] dark:text-rose-400 font-semibold truncate max-w-[120px]">
              {currentUser.designation || currentUser.section || currentBadge.label}
            </span>
          </div>
        </button>
      </div>

      {/* Full User Profile Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </header>
  );
}
