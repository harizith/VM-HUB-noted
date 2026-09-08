"use client";

import React from "react";
import Header from "@/components/layout/Header";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  return (
    <Header
      onMenuToggle={onMenuToggle}
      portalTitle="Vel Tech Multitech Higher Administration"
      portalSubtitle="Dean of Academic Affairs • Master Oversight Suite"
    />
  );
}
