import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin & Dean Console | Veltech Multitech VM-HUB",
  description: "Veltech Multitech Executive Institutional Admin Portal - Students, Faculty, Curriculum, and Timetable Oversight.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  // Allow authenticated users to access admin console seamlessly

  return <AdminShell>{children}</AdminShell>;
}
