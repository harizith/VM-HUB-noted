"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import ProfileView from "@/components/profile/ProfileView";

export default function TeacherProfilePage() {
  const { currentUser, users } = useApp();
  const teacher = currentUser.role === "TEACHER"
    ? currentUser
    : users.find((u) => u.role === "TEACHER") || currentUser;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Faculty Profile & Academic Portfolio
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Teaching qualifications, proctor cabin, research specializations, and departmental records.
          </p>
        </div>
      </div>

      <ProfileView user={teacher} />
    </div>
  );
}
