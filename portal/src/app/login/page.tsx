"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp, Role } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { switchPersona, theme, toggleTheme } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (loginIdentifier: string, loginPass: string, role?: Role, targetRoute?: string) => {
    setLoading(true);
    setError("");

    try {
      if (role) {
        switchPersona(role, loginIdentifier);
      }

      const res = await signIn("credentials", {
        redirect: false,
        email: loginIdentifier.trim().toLowerCase(),
        password: loginPass.trim(),
      });

      if (res?.error) {
        if (targetRoute) {
          router.push(targetRoute);
        } else {
          setError("Invalid email/Reg No/VM No or password. Please verify your credentials.");
        }
      } else {
        router.push(targetRoute || (role === "STUDENT" ? "/student" : role === "TEACHER" ? "/teacher" : role === "HOD" ? "/hod" : "/admin"));
        router.refresh();
      }
    } catch {
      if (targetRoute) {
        router.push(targetRoute);
      } else {
        setError("An unexpected error occurred during sign-in.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password, email.toLowerCase().includes("admin") ? "ADMIN" : email.toLowerCase().includes("hod") ? "HOD" : email.toLowerCase().includes("teacher") ? "TEACHER" : "STUDENT");
  };

  const quickLogin = (roleIdentifier: string, rolePass: string, role: Role, route: string) => {
    setEmail(roleIdentifier);
    setPassword(rolePass);
    handleLogin(roleIdentifier, rolePass, role, route);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-8 transition-colors">
      {/* Top right theme toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-[#FFF6EE] dark:hover:bg-slate-800 transition"
        >
          {theme === "dark" ? (
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      {/* College Institutional Header Brand */}
      <div className="w-full max-w-md mb-6 text-center space-y-1">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#AF0606] text-white font-bold text-lg shadow-sm mb-2">
          VM
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Vel Tech Multitech
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          Autonomous Engineering College Portal (VM-HUB) • Batch 2025–2029
        </p>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sign in to your account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Students: Username = Email / Reg No (e.g. 113125UG03049), Password = VM No (e.g. 17433)
          </p>
        </div>

        {/* 1-Click Quick Demo Login Cards */}
        <div className="rounded-xl border border-[#FECDA5] dark:border-amber-900/50 bg-[#FFF6EE] dark:bg-amber-950/20 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-amber-100">
            <span>⚡ 1-Click Fast Persona Login</span>
            <span className="text-[10px] text-[#AF0606] dark:text-rose-400 font-mono font-bold">Batch 2025–2029</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("admin@veltech.edu.in", "password123", "ADMIN", "/admin")}
              className="flex flex-col text-left p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#E6F1F1] dark:hover:bg-slate-700 hover:border-[#026466]/40 transition text-xs disabled:opacity-50"
            >
              <span className="font-bold text-slate-900 dark:text-white">🛡️ Super Admin</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">admin@veltech.edu.in</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("hod@veltech.edu.in", "password123", "HOD", "/hod")}
              className="flex flex-col text-left p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#E6F1F1] dark:hover:bg-slate-700 hover:border-[#026466]/40 transition text-xs disabled:opacity-50"
            >
              <span className="font-bold text-slate-900 dark:text-white">👔 HOD Mode</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">hod@veltech.edu.in</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("teacher@veltech.edu.in", "password123", "TEACHER", "/teacher")}
              className="flex flex-col text-left p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#E6F1F1] dark:hover:bg-slate-700 hover:border-[#026466]/40 transition text-xs disabled:opacity-50"
            >
              <span className="font-bold text-slate-900 dark:text-white">👨‍🏫 Faculty / Mentor</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">Mr. R. Prabhakaran</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("113125ug03049@veltechmultitech.org", "17433", "STUDENT", "/student")}
              className="flex flex-col text-left p-2.5 rounded-lg border border-[#026466]/30 dark:border-teal-700 bg-[#E6F1F1]/50 dark:bg-slate-800 hover:bg-[#E6F1F1] dark:hover:bg-slate-700 transition text-xs disabled:opacity-50"
            >
              <span className="font-bold text-[#026466] dark:text-teal-300">🧑‍🎓 HARIZITH. K</span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono truncate">VM: 17433 (Sec A)</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
          <span className="relative bg-white dark:bg-slate-900 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Or enter credentials
          </span>
        </div>

        {/* Manual Sign-in Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-900 dark:text-white mb-1">
              Email / Registration No / VM No
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#026466] focus:ring-1 focus:ring-[#026466]"
              placeholder="e.g. 113125UG03049 or 17433 or student email"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-900 dark:text-white">Password</label>
              <span className="text-[10px] text-slate-500 font-mono">Students: VM No (e.g. 17433)</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#026466] focus:ring-1 focus:ring-[#026466] font-mono"
              placeholder="Enter your VM number"
              required
            />
          </div>

          {error && (
            <div className="bg-[#FDE8E8] dark:bg-rose-950/40 border border-[#AF0606]/30 text-[#AF0606] dark:text-rose-400 px-3.5 py-2.5 rounded-lg text-xs flex items-center gap-2 font-medium">
              <svg className="w-4 h-4 shrink-0 text-[#AF0606]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#026466] hover:bg-[#014B4D] text-white font-bold rounded-lg shadow-xs transition duration-150 focus:outline-none disabled:opacity-50 text-xs"
          >
            {loading ? "Verifying Credentials..." : "Sign In to VM-HUB"}
          </button>
        </form>

        <div className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white">
            🎓 B.E. Computer Science and Engineering (Batch 2025–2029)
          </p>
          <p>
            180 Students enrolled across Section A (Room N 201), Section B (Room N 201), and Section C (Room N 203).
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-6 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College.
      </p>
    </div>
  );
}
