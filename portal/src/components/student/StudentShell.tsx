"use client";

import React, { useState } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentHeader from "./StudentHeader";
import { studentProfile } from "@/lib/studentMockData";

interface StudentShellProps {
  children: React.ReactNode;
  userEmail?: string | null;
  userName?: string | null;
}

export default function StudentShell({ children, userEmail, userName }: StudentShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const displayName = userName || studentProfile.name;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar Navigation */}
      <StudentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        studentName={displayName}
        registerNumber={studentProfile.registerNumber}
      />

      {/* Main Layout Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <StudentHeader
          onMenuClick={() => setSidebarOpen(true)}
          studentName={displayName}
          department={studentProfile.department}
          semester={studentProfile.semester}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
