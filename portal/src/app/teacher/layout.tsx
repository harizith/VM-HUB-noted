import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TeacherShell from "@/components/teacher/TeacherShell";

export const metadata = {
  title: "Faculty Portal | Veltech Multitech VM-HUB",
  description: "Veltech Multitech Faculty Management System - Attendance, Marks, Schedule, and Student Proctoring.",
};

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // Ensure role is TEACHER (or allow ADMIN for preview)
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    redirect("/student");
  }

  return <TeacherShell>{children}</TeacherShell>;
}
