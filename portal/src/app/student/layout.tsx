import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import StudentShell from "@/components/student/StudentShell";

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

  const role = (session.user as any)?.role;
  if (role && role !== "STUDENT") {
    redirect("/");
  }

  return (
    <StudentShell
      userEmail={session.user?.email}
      userName={session.user?.name}
    >
      {children}
    </StudentShell>
  );
}
