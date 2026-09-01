"use client";

import React, { useState } from "react";
import HODSidebar from "./HODSidebar";
import HODHeader from "./HODHeader";

interface HODShellProps {
  children: React.ReactNode;
}

export default function HODShell({ children }: HODShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <HODSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <HODHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
