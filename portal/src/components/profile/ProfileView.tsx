"use client";

import React, { useState } from "react";
import { useApp, Role, UserRecord } from "@/context/AppContext";

interface ProfileViewProps {
  user?: UserRecord;
}

export default function ProfileView({ user }: ProfileViewProps) {
  const { currentUser, updateCurrentUserProfile, updateUserProfile } = useApp();
  const profileUser = user || currentUser;
  const isOwnProfile = profileUser.id === currentUser.id;

  const [activeTab, setActiveTab] = useState<"academic" | "personal" | "mentorship" | "guardian" | "faculty">("academic");
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: profileUser.name || "",
    email: profileUser.email || "",
    phone: profileUser.phone || "",
    dob: profileUser.dob || "",
    gender: profileUser.gender || "Male",
    bloodGroup: profileUser.bloodGroup || "O+",
    address: profileUser.address || "",
    guardianName: profileUser.guardianName || "",
    guardianPhone: profileUser.guardianPhone || "",
    guardianEmail: profileUser.guardianEmail || "",
    emergencyContact: profileUser.emergencyContact || "",
    bio: profileUser.bio || "",
    qualifications: profileUser.qualifications || "",
    cabin: profileUser.cabin || "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOwnProfile) {
      updateCurrentUserProfile(formData);
    } else {
      updateUserProfile(profileUser.id, formData);
    }
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return { label: "Super Admin", color: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/40" };
      case "HOD":
        return { label: "Head of Department", color: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/40" };
      case "TEACHER":
        return { label: "Faculty Proctor", color: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/40" };
      case "STUDENT":
        return { label: "Undergraduate Scholar", color: "bg-[#E6F1F1] text-[#026466] border-[#026466]/30 dark:bg-[#026466]/20 dark:text-teal-300 dark:border-teal-500/30" };
    }
  };

  const roleBadge = getRoleBadge(profileUser.role);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Profile Header Hero */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="relative bg-gradient-to-r from-[#026466] via-[#014B4D] to-slate-900 p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-3xl font-black text-white shadow-inner font-mono">
                {profileUser.name.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-bold tracking-tight text-white">{profileUser.name}</h1>
                  <span className={`rounded-md border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${roleBadge.color}`}>
                    {roleBadge.label}
                  </span>
                  <span className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 text-xs font-bold">
                    ● {profileUser.status}
                  </span>
                </div>

                <p className="mt-1 text-xs sm:text-sm text-teal-100/90">
                  {profileUser.department} • Vel Tech Multi Tech Autonomous Institute
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-teal-100/90 font-mono">
                  {profileUser.regNo && (
                    <span className="bg-black/20 px-2.5 py-0.5 rounded border border-white/10">
                      Reg No: <strong className="text-white">{profileUser.regNo}</strong>
                    </span>
                  )}
                  {profileUser.staffId && (
                    <span className="bg-black/20 px-2.5 py-0.5 rounded border border-white/10">
                      Staff ID: <strong className="text-white">{profileUser.staffId}</strong>
                    </span>
                  )}
                  {profileUser.section && (
                    <span className="bg-black/20 px-2.5 py-0.5 rounded border border-white/10">
                      Section: <strong className="text-white">{profileUser.section}</strong>
                    </span>
                  )}
                  <span className="bg-black/20 px-2.5 py-0.5 rounded border border-white/10">
                    {profileUser.email}
                  </span>
                </div>
              </div>
            </div>

            {isOwnProfile && (
              <div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition shadow-sm flex items-center gap-2"
                  >
                    <span>✎ Edit Profile Information</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl bg-rose-500/30 hover:bg-rose-500/50 border border-rose-300/40 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition shadow-sm"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold text-center animate-fadeIn">
            ✓ Profile details updated and saved successfully!
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-6 pt-3 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab("academic")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === "academic"
                ? "border-[#026466] text-[#026466] dark:text-teal-400 dark:border-teal-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            🎓 {profileUser.role === "STUDENT" ? "Academic Standing & Program" : "Institutional Portfolio"}
          </button>
          <button
            onClick={() => setActiveTab("personal")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === "personal"
                ? "border-[#026466] text-[#026466] dark:text-teal-400 dark:border-teal-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            👤 Personal Demographics & Contact
          </button>
          {profileUser.role === "STUDENT" && (
            <button
              onClick={() => setActiveTab("mentorship")}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === "mentorship"
                  ? "border-[#026466] text-[#026466] dark:text-teal-400 dark:border-teal-400"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🤝 Faculty Mentor / Proctor
            </button>
          )}
          {profileUser.role === "STUDENT" && (
            <button
              onClick={() => setActiveTab("guardian")}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === "guardian"
                  ? "border-[#026466] text-[#026466] dark:text-teal-400 dark:border-teal-400"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🛡️ Guardian & Emergency
            </button>
          )}
          {profileUser.role !== "STUDENT" && (
            <button
              onClick={() => setActiveTab("faculty")}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === "faculty"
                  ? "border-[#026466] text-[#026466] dark:text-teal-400 dark:border-teal-400"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              💼 Research & Teaching Load
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* TAB 1: ACADEMIC STANDING */}
          {activeTab === "academic" && (
            <div className="space-y-6 animate-fadeIn">
              {profileUser.role === "STUDENT" ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] dark:bg-[#026466]/20 p-4 text-center">
                      <span className="text-[10px] font-bold uppercase text-[#026466] dark:text-teal-400 tracking-wider">Cumulative GPA</span>
                      <p className="text-2xl font-extrabold text-[#026466] dark:text-teal-300 font-mono mt-1">
                        {profileUser.cgpa ? profileUser.cgpa.toFixed(2) : "8.74"}
                      </p>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Scale of 10.0</span>
                    </div>

                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider">Overall Attendance</span>
                      <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
                        {profileUser.attendancePercent ? `${profileUser.attendancePercent}%` : "88.5%"}
                      </p>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">✓ Safe Limit (&gt; 75%)</span>
                    </div>

                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider">Total Credits</span>
                      <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
                        {profileUser.creditsEarned || 112} <span className="text-xs text-slate-400 font-normal">/ {profileUser.totalCredits || 160}</span>
                      </p>
                      <span className="text-xs text-slate-500 dark:text-slate-400">70% Earned</span>
                    </div>

                    <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/20 p-4 text-center">
                      <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">Arrears Standing</span>
                      <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono mt-1">
                        {profileUser.arrearsCount || 0} Active
                      </p>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Distinction Candidate</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 p-6 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Official Curriculum & Degree Registry
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Degree & Specialization:</span>
                        <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                          {profileUser.degree || "B.Tech"} - {profileUser.department}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Class & Section:</span>
                        <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                          Year {profileUser.year || 3} • Semester {profileUser.semester || 6} • Section {profileUser.section || "CSE-A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Academic Batch:</span>
                        <p className="font-bold text-slate-900 dark:text-white font-mono text-sm mt-0.5">
                          {profileUser.batch || "2025-2029"}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Curriculum Scheme:</span>
                        <p className="font-bold text-slate-900 dark:text-white font-mono text-sm mt-0.5">
                          Regulation 2023 (CBCS)
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] dark:bg-[#026466]/20 p-5 text-center">
                      <span className="text-[10px] font-bold uppercase text-[#026466] dark:text-teal-400 tracking-wider">Designation</span>
                      <p className="text-lg font-bold text-[#026466] dark:text-teal-300 mt-1">
                        {profileUser.designation || "Senior Academic Member"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-5 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider">Staff ID</span>
                      <p className="text-lg font-bold text-slate-900 dark:text-white font-mono mt-1">
                        {profileUser.staffId || "VMT-001"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-5 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider">Office / Cabin</span>
                      <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                        {profileUser.cabin || "Room 304, Tech Park"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 p-6 space-y-4 text-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Academic Credentials
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Qualifications:</span>
                        <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                          {profileUser.qualifications || "Ph.D. Computer Science, M.E. CSE"}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Experience:</span>
                        <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                          {profileUser.experience || "8+ Years"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PERSONAL & CONTACT INFO (EDITABLE) */}
          {activeTab === "personal" && (
            <form onSubmit={handleSave} className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Primary Contact Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none font-mono"
                      placeholder="+91 98765 43210"
                    />
                  ) : (
                    <p className="font-bold text-slate-900 dark:text-white font-mono p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      {profileUser.phone || "+91 98765 43210"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Institutional Email Address
                  </label>
                  <p className="font-bold text-slate-900 dark:text-white font-mono p-3 bg-slate-50 dark:bg-slate-800 rounded-xl truncate">
                    {profileUser.email}
                  </p>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                    />
                  ) : (
                    <p className="font-bold text-slate-900 dark:text-white font-mono p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      {profileUser.dob || "2004-05-14"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Blood Group
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none font-semibold"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  ) : (
                    <p className="font-bold text-slate-900 dark:text-white font-mono p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      {profileUser.bloodGroup || "O+"}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Permanent Residential Address
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                      placeholder="Door No, Street Name, Area, City, Pincode"
                    />
                  ) : (
                    <p className="font-medium text-slate-900 dark:text-white p-3 bg-slate-50 dark:bg-slate-800 rounded-xl leading-relaxed">
                      {profileUser.address || "No. 42, Green Avenue, Avadi, Chennai - 600062"}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Profile Statement / Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                    />
                  ) : (
                    <p className="text-slate-700 dark:text-slate-300 italic p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      "{profileUser.bio || "Active scholar at Vel Tech Multi Tech."}"
                    </p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="pt-3 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#026466] hover:bg-[#014B4D] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          )}

          {/* TAB 3: MENTORSHIP */}
          {activeTab === "mentorship" && profileUser.role === "STUDENT" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] dark:bg-[#026466]/20 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#026466] dark:text-teal-400">
                      Assigned Faculty Mentor
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {profileUser.mentorName || profileUser.mentor || "Prof. Sample Teacher"}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Associate Professor • Dept of Computer Science & Engineering
                    </p>
                  </div>
                  <span className="rounded-lg bg-white dark:bg-slate-900 border border-[#026466]/30 px-3 py-1.5 text-xs font-bold text-[#026466] dark:text-teal-300">
                    Cabin: {profileUser.mentorCabin || "Tech Park 304"}
                  </span>
                </div>

                <div className="mt-5 pt-5 border-t border-[#026466]/20 dark:border-teal-500/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Direct Email:</span>
                    <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {profileUser.mentorEmail || "teacher@veltech.edu.in"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Direct Phone:</span>
                    <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {profileUser.mentorPhone || "+91 98401 23456"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GUARDIAN */}
          {activeTab === "guardian" && profileUser.role === "STUDENT" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 p-6 space-y-4 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Guardian & Emergency Contact Matrix
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Primary Guardian:</span>
                    <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                      {profileUser.guardianName || "Rajesh Sharma"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Guardian Phone:</span>
                    <p className="font-mono font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                      {profileUser.guardianPhone || "+91 94441 98765"}
                    </p>
                  </div>
                  <div className="sm:col-span-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Emergency Medical Contact:</span>
                    <p className="font-mono font-bold text-[#AF0606] dark:text-rose-400 text-sm mt-0.5">
                      {profileUser.emergencyContact || "+91 94441 98765 (Immediate Family)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FACULTY RESEARCH */}
          {activeTab === "faculty" && profileUser.role !== "STUDENT" && (
            <div className="space-y-5 animate-fadeIn">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 p-6 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Research Specializations
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(profileUser.researchAreas || ["Distributed Systems", "Cloud Security", "IoT"]).map((area, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-[#E6F1F1] dark:bg-[#026466]/30 border border-[#026466]/30 px-3.5 py-1.5 text-xs font-bold text-[#026466] dark:text-teal-300"
                    >
                      🔬 {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
