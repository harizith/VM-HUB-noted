"use client";

import React, { useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import TeacherHeader from "./TeacherHeader";

interface TeacherShellProps {
  children: React.ReactNode;
}

export default function TeacherShell({ children }: TeacherShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <TeacherSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TeacherHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
