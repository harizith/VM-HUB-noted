"use client";

import React from "react";
import Header from "@/components/layout/Header";

interface StudentHeaderProps {
  onMenuToggle: () => void;
}

export default function StudentHeader({ onMenuToggle }: StudentHeaderProps) {
  return (
    <Header
      onMenuToggle={onMenuToggle}
      portalTitle="Vel Tech Multitech Student Academic Suite"
      portalSubtitle="Attendance Forecaster • Circulars • OD Petitions"
    />
  );
}
