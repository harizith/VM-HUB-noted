"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import ProfileView from "@/components/profile/ProfileView";

export default function HODProfilePage() {
  const { currentUser, users } = useApp();
  const hod = currentUser.role === "HOD"
    ? currentUser
    : users.find((u) => u.role === "HOD") || currentUser;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Head of Department Leadership Profile
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Executive leadership tenure, departmental oversight, qualifications, and direct contacts.
          </p>
        </div>
      </div>

      <ProfileView user={hod} />
    </div>
  );
}
