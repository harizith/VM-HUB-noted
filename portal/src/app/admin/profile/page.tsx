"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import ProfileView from "@/components/profile/ProfileView";

export default function AdminProfilePage() {
  const { currentUser, users } = useApp();
  const admin = currentUser.role === "ADMIN"
    ? currentUser
    : users.find((u) => u.role === "ADMIN") || currentUser;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Super Administrator Institutional Profile
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            System governance privileges, institutional credentials, and administrative contact records.
          </p>
        </div>
      </div>

      <ProfileView user={admin} />
    </div>
  );
}
