"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import ProfileView from "@/components/profile/ProfileView";

export default function StudentProfilePage() {
  const { currentUser, users } = useApp();
  const student = currentUser.role === "STUDENT"
    ? currentUser
    : users.find((u) => u.role === "STUDENT") || currentUser;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Student Academic Identity & Profile
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Institutional records, degree credentials, mentor details, and communication contacts.
          </p>
        </div>
      </div>

      <ProfileView user={student} />
    </div>
  );
}
