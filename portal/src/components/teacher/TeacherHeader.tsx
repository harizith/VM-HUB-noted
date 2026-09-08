"use client";

import React from "react";
import Header from "@/components/layout/Header";

interface TeacherHeaderProps {
  onMenuToggle: () => void;
}

export default function TeacherHeader({ onMenuToggle }: TeacherHeaderProps) {
  return (
    <Header
      onMenuToggle={onMenuToggle}
      portalTitle="Vel Tech Multitech Faculty & Mentor Suite"
      portalSubtitle="Attendance Ledger • Proctor Wards • Course Delivery"
    />
  );
}
