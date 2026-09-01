"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (loginEmail: string, loginPass: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: loginEmail.trim().toLowerCase(),
        password: loginPass,
      });

      if (res?.error) {
        setError("Invalid email or password. Please verify your credentials.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred during sign-in.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const quickLogin = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword("password123");
    handleLogin(roleEmail, "password123");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] px-4 py-8">
      {/* College Institutional Header Brand */}
      <div className="w-full max-w-md mb-6 text-center space-y-1">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#AF0606] text-white font-bold text-lg shadow-sm mb-2">
          VM
        </div>
        <h1 className="text-xl font-bold text-black tracking-tight">
          Vel Tech Multitech
        </h1>
        <p className="text-xs text-slate-600 font-medium">
          Autonomous Engineering College Portal (VM-HUB)
        </p>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-black">Sign in to your account</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter your institutional email address to continue
          </p>
        </div>

        {/* 1-Click Quick Demo Login Cards */}
        <div className="rounded-xl border border-[#FECDA5] bg-[#FFF6EE] p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-black">
            <span>Quick Demo Switcher</span>
            <span className="text-[10px] text-[#AF0606] font-mono font-bold">Default: password123</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("hod@veltech.edu.in")}
              className="flex flex-col text-left p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-[#E6F1F1] hover:border-[#026466]/40 transition text-xs disabled:opacity-50"
            >
              <span className="font-bold text-black">HOD Mode</span>
              <span className="text-[10px] text-slate-500 font-mono truncate">hod@veltech.edu.in</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("admin@veltech.edu.in")}
              className="flex flex-col text-left p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-[#E6F1F1] hover:border-[#026466]/40 transition text-xs disabled:opacity-50"
            >
              <span className="font-bold text-black">Admin Mode</span>
              <span className="text-[10px] text-slate-500 font-mono truncate">admin@veltech.edu.in</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("teacher@veltech.edu.in")}
              className="flex flex-col text-left p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-[#E6F1F1] hover:border-[#026466]/40 transition text-xs disabled:opacity-50"
            >
              <span className="font-bold text-black">Teacher Mode</span>
              <span className="text-[10px] text-slate-500 font-mono truncate">teacher@veltech.edu.in</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => quickLogin("student@veltech.edu.in")}
              className="flex flex-col text-left p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-[#E6F1F1] hover:border-[#026466]/40 transition text-xs disabled:opacity-50"
            >
              <span className="font-bold text-black">Student Mode</span>
              <span className="text-[10px] text-slate-500 font-mono truncate">student@veltech.edu.in</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
          <span className="relative bg-white px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Or credentials
          </span>
        </div>

        {/* Manual Sign-in Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-black mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-black placeholder:text-slate-400 focus:outline-none focus:border-[#026466] focus:ring-1 focus:ring-[#026466]"
              placeholder="e.g. student@veltech.edu.in"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-black">Password</label>
              <span className="text-[10px] text-slate-500 font-mono">Demo: password123</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-black placeholder:text-slate-400 focus:outline-none focus:border-[#026466] focus:ring-1 focus:ring-[#026466] font-mono"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-[#FDE8E8] border border-[#AF0606]/30 text-[#AF0606] px-3.5 py-2.5 rounded-lg text-xs flex items-center gap-2 font-medium">
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
            {loading ? "Verifying Credentials..." : "Sign In"}
          </button>
        </form>
      </div>

      {/* Footer Note */}
      <p className="mt-6 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Vel Tech Multitech Autonomous Institute. All rights reserved.
      </p>
    </div>
  );
}
