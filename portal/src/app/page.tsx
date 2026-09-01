import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = (session.user as any)?.role;

  // Simple role-based routing placeholder
  if (role === "STUDENT") {
    redirect("/student");
  } else if (role === "TEACHER") {
    redirect("/teacher");
  } else if (role === "HOD") {
    redirect("/hod");
  } else if (role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Veltech Multitech Portal</h1>
        <p className="mt-4 text-gray-600">You are logged in as {session.user?.email}</p>
        <p className="mt-2 text-gray-500">Role: {role || "Unknown"}</p>
      </div>
    </div>
  );
}
