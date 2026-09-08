import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import HODShell from "@/components/hod/HODShell";

export const metadata = {
  title: "Head of Department (HOD) Portal | Veltech Multitech VM-HUB",
  description: "Veltech Multitech HOD Departmental Suite - Faculty Workload, Student Performance, Timetable, and Academic Analytics.",
};

export default async function HODLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // Allow authenticated users to access HOD portal seamlessly

  return <HODShell>{children}</HODShell>;
}
