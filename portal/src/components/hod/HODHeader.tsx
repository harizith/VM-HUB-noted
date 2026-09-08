"use client";

import React from "react";
import Header from "@/components/layout/Header";

interface HODHeaderProps {
  onMenuToggle: () => void;
}

export default function HODHeader({ onMenuToggle }: HODHeaderProps) {
  return (
    <Header
      onMenuToggle={onMenuToggle}
      portalTitle="Department of Computer Science & Engineering"
      portalSubtitle="Head of Department Console • Academic Quality Assurance"
    />
  );
}
