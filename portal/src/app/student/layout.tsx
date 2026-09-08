import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import StudentShell from "@/components/student/StudentShell";
import { getStudentProfile } from "@/app/actions/user";

export const metadata = {
  title: "Student Portal | Veltech Multitech",
  description: "Academic student portal for Veltech Multitech students",
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "STUDENT") {
    redirect("/");
  }

  let studentProfile = null;
  if (session.user.email) {
    const res = await getStudentProfile(session.user.email);
    if (res.success && res.data) {
      studentProfile = res.data;
    }
  }

  // Allow authenticated users to access student portal seamlessly

  return (
    <StudentShell studentProfile={studentProfile}>
      {children}
    </StudentShell>
  );
}
