"use client";

import React, { useState } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentHeader from "./StudentHeader";

interface StudentShellProps {
  children: React.ReactNode;
  studentProfile?: any;
}

export default function StudentShell({ children, studentProfile }: StudentShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Sidebar Navigation */}
      <StudentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        studentProfile={studentProfile}
      />

      {/* Main Layout Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <StudentHeader
          onMenuToggle={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
