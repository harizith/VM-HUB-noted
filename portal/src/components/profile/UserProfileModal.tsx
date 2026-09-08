"use client";

import React, { useState, useEffect } from "react";
import { useApp, Role, UserRecord } from "@/context/AppContext";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserRecord; // Optional: if viewing another user's profile, else currentUser
}

export default function UserProfileModal({ isOpen, onClose, user }: UserProfileModalProps) {
  const { currentUser, updateCurrentUserProfile, updateUserProfile, activeRole } = useApp();
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

  useEffect(() => {
    setFormData({
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
    setIsEditing(false);
  }, [profileUser, isOpen]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Banner */}
        <div className="relative bg-gradient-to-r from-[#026466] via-[#014B4D] to-slate-900 p-6 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white flex items-center justify-center transition"
          >
            ✕
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-2xl font-black text-white shadow-inner font-mono">
              {profileUser.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold truncate text-white">{profileUser.name}</h2>
                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${roleBadge.color}`}>
                  {roleBadge.label}
                </span>
                <span className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 text-[10px] font-bold">
                  ● {profileUser.status}
                </span>
              </div>

              <p className="mt-1 text-xs text-teal-100/80 truncate">
                {profileUser.department} • Vel Tech Multi Tech
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-teal-100/90 font-mono">
                {profileUser.regNo && (
                  <span className="bg-black/20 px-2 py-0.5 rounded border border-white/10">
                    Reg No: <strong className="text-white">{profileUser.regNo}</strong>
                  </span>
                )}
                {profileUser.staffId && (
                  <span className="bg-black/20 px-2 py-0.5 rounded border border-white/10">
                    Staff ID: <strong className="text-white">{profileUser.staffId}</strong>
                  </span>
                )}
                {profileUser.section && (
                  <span className="bg-black/20 px-2 py-0.5 rounded border border-white/10">
                    Section: <strong className="text-white">{profileUser.section}</strong>
                  </span>
                )}
                <span className="bg-black/20 px-2 py-0.5 rounded border border-white/10 truncate max-w-[200px]">
                  {profileUser.email}
                </span>
              </div>
            </div>

            {/* Edit / Actions */}
            {isOwnProfile && (
              <div className="shrink-0 mt-2 sm:mt-0">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-lg bg-white/15 hover:bg-white/25 border border-white/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition shadow-xs flex items-center gap-1.5"
                  >
                    <span>✎ Edit Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg bg-rose-500/30 hover:bg-rose-500/50 border border-rose-300/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition shadow-xs"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Success Alert Toast */}
        {savedSuccess && (
          <div className="bg-emerald-500 text-white px-4 py-2 text-xs font-bold text-center animate-fadeIn shrink-0">
            ✓ Profile details updated and saved successfully!
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-4 pt-2 shrink-0 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab("academic")}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === "academic"
                ? "border-[#026466] text-[#026466] dark:text-teal-400 dark:border-teal-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            🎓 {profileUser.role === "STUDENT" ? "Academic Standing" : "Institutional Portfolio"}
          </button>
          <button
            onClick={() => setActiveTab("personal")}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === "personal"
                ? "border-[#026466] text-[#026466] dark:text-teal-400 dark:border-teal-400"
                : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            👤 Personal & Contact
          </button>
          {profileUser.role === "STUDENT" && (
            <button
              onClick={() => setActiveTab("mentorship")}
              className={`px-3.5 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === "mentorship"
                  ? "border-[#026466] text-[#026466] dark:text-teal-400 dark:border-teal-400"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🤝 Faculty Mentor
            </button>
          )}
          {profileUser.role === "STUDENT" && (
            <button
              onClick={() => setActiveTab("guardian")}
              className={`px-3.5 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap ${
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
              className={`px-3.5 py-2 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === "faculty"
                  ? "border-[#026466] text-[#026466] dark:text-teal-400 dark:border-teal-400"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              💼 Research & Teaching
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* TAB 1: ACADEMIC STANDING / INSTITUTIONAL PORTFOLIO */}
          {activeTab === "academic" && (
            <div className="space-y-6 animate-fadeIn">
              {profileUser.role === "STUDENT" ? (
                <>
                  {/* Quick Scorecards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] dark:bg-[#026466]/20 p-3.5 text-center">
                      <span className="text-[10px] font-bold uppercase text-[#026466] dark:text-teal-400 tracking-wider">Cumulative GPA</span>
                      <p className="text-xl font-extrabold text-[#026466] dark:text-teal-300 font-mono mt-0.5">
                        {profileUser.cgpa ? profileUser.cgpa.toFixed(2) : "8.74"}
                      </p>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">Scale of 10.0</span>
                    </div>

                    <div className="rounded-xl border border-[#026466]/20 bg-slate-50 dark:bg-slate-800 p-3.5 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider">Attendance Rate</span>
                      <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
                        {profileUser.attendancePercent ? `${profileUser.attendancePercent}%` : "88.5%"}
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Safe Target</span>
                    </div>

                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-3.5 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider">Credits Earned</span>
                      <p className="text-xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
                        {profileUser.creditsEarned || 112} <span className="text-xs text-slate-400 font-normal">/ {profileUser.totalCredits || 160}</span>
                      </p>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">70% Completed</span>
                    </div>

                    <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/20 p-3.5 text-center">
                      <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">Arrears Status</span>
                      <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono mt-0.5">
                        {profileUser.arrearsCount || 0} Active
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400">All Clear</span>
                    </div>
                  </div>

                  {/* Academic Identity Details Matrix */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 p-5 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Curriculum & Program Registration
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Degree & Program:</span>
                        <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                          {profileUser.degree || "B.Tech"} - {profileUser.department}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Current Academic Standing:</span>
                        <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                          Year {profileUser.year || 3}, Semester {profileUser.semester || 6} ({profileUser.section || "CSE-A"})
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Batch / Admission Year:</span>
                        <p className="font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                          {profileUser.batch || "2025-2029"}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Regulation:</span>
                        <p className="font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                          VTMT Regulation 2023 (CBCS)
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Roll Number:</span>
                        <p className="font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                          {profileUser.rollNo || profileUser.regNo}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Campus & Classroom:</span>
                        <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                          Main Tech Park • LH-304
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Faculty / Admin Institutional Details */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] dark:bg-[#026466]/20 p-4 text-center">
                      <span className="text-[10px] font-bold uppercase text-[#026466] dark:text-teal-400 tracking-wider">Designation</span>
                      <p className="text-base font-bold text-[#026466] dark:text-teal-300 mt-1">
                        {profileUser.designation || "Academic Faculty"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider">Staff ID</span>
                      <p className="text-base font-bold text-slate-900 dark:text-white font-mono mt-1">
                        {profileUser.staffId || "VMT-001"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-4 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider">Cabin / Office</span>
                      <p className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        {profileUser.cabin || "Room 304, Tech Park"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 p-5 space-y-3 text-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Professional Background
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Educational Qualifications:</span>
                        <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                          {profileUser.qualifications || "Ph.D. Computer Science, M.E. CSE"}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Total Experience:</span>
                        <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                          {profileUser.experience || "8+ Years"}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Date of Joining:</span>
                        <p className="font-semibold text-slate-900 dark:text-white font-mono mt-0.5">
                          {profileUser.joiningDate || "2018-06-15"}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Institution:</span>
                        <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                          Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College
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
            <form onSubmit={handleSave} className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Personal Demographics & Official Contacts
                </h3>
                {isEditing && (
                  <span className="text-xs text-[#026466] dark:text-teal-400 font-semibold">
                    Editing Enabled
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Primary Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                      placeholder="+91 98765 43210"
                    />
                  ) : (
                    <p className="font-bold text-slate-900 dark:text-white font-mono p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      {profileUser.phone || "+91 98765 43210"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Institutional Email
                  </label>
                  <p className="font-bold text-slate-900 dark:text-white font-mono p-2 bg-slate-50 dark:bg-slate-800 rounded-lg truncate">
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
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                    />
                  ) : (
                    <p className="font-bold text-slate-900 dark:text-white font-mono p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
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
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
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
                    <p className="font-bold text-slate-900 dark:text-white font-mono p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      {profileUser.bloodGroup || "O+"}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Permanent Communication Address
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                      placeholder="Street address, City, District, State, Pincode"
                    />
                  ) : (
                    <p className="font-semibold text-slate-900 dark:text-white p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      {profileUser.address || "No. 42, Green Avenue, Avadi, Chennai - 600062"}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    Profile Bio / Academic Statement
                  </label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-900 dark:text-white focus:border-[#026466] focus:outline-none"
                      placeholder="Brief research interest or statement"
                    />
                  ) : (
                    <p className="text-slate-700 dark:text-slate-300 italic p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      "{profileUser.bio || "Enthusiastic member of the Vel Tech Multi Tech academic community."}"
                    </p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#026466] hover:bg-[#014B4D] px-5 py-2 text-xs font-bold text-white shadow-xs transition flex items-center gap-1.5"
                  >
                    <span>✓ Save Changes</span>
                  </button>
                </div>
              )}
            </form>
          )}

          {/* TAB 3: MENTORSHIP & PROCTOR DETAILS (STUDENTS ONLY) */}
          {activeTab === "mentorship" && profileUser.role === "STUDENT" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-xl border border-[#026466]/30 bg-[#E6F1F1] dark:bg-[#026466]/20 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#026466] dark:text-teal-400">
                      Assigned Faculty Mentor / Proctor
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {profileUser.mentorName || profileUser.mentor || "Prof. Sample Teacher"}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Associate Professor • Department of Computer Science & Engineering
                    </p>
                  </div>
                  <span className="rounded-lg bg-white dark:bg-slate-900 border border-[#026466]/30 px-2.5 py-1 text-xs font-bold text-[#026466] dark:text-teal-300">
                    Proctor Cabin: {profileUser.mentorCabin || "Tech Park 304"}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-[#026466]/20 dark:border-teal-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Direct Email:</span>
                    <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {profileUser.mentorEmail || "teacher@veltech.edu.in"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Direct Contact:</span>
                    <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {profileUser.mentorPhone || "+91 98401 23456"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Office Counseling Hours:</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                      Monday - Friday (03:30 PM - 04:30 PM)
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Mentorship Standing:</span>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      ✓ Active Regular Proctoring Logged
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GUARDIAN & EMERGENCY INFO (STUDENTS ONLY) */}
          {activeTab === "guardian" && profileUser.role === "STUDENT" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Primary Guardian & Emergency Notification Contact
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Guardian Name:</span>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {profileUser.guardianName || "Rajesh Sharma"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Relationship:</span>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                      Father / Primary Legal Guardian
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Guardian Phone:</span>
                    <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {profileUser.guardianPhone || "+91 94441 98765"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Guardian Email:</span>
                    <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                      {profileUser.guardianEmail || "guardian@example.com"}
                    </p>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Emergency Medical Contact:</span>
                    <p className="font-mono font-bold text-[#AF0606] dark:text-rose-400 mt-0.5">
                      {profileUser.emergencyContact || "+91 94441 98765 (Immediate Family)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FACULTY / LEADERSHIP RESEARCH (TEACHERS/HOD/ADMIN ONLY) */}
          {activeTab === "faculty" && profileUser.role !== "STUDENT" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Research Specializations & Key Topics
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(profileUser.researchAreas || ["Distributed Systems", "Cloud Computing", "AI/ML Systems"]).map((area, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-[#E6F1F1] dark:bg-[#026466]/30 border border-[#026466]/30 px-3 py-1 text-xs font-bold text-[#026466] dark:text-teal-300"
                    >
                      🔬 {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-3">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Scopus Publications</span>
                  <p className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">14 Papers</p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-3">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Mentees Assigned</span>
                  <p className="text-xl font-bold text-[#026466] dark:text-teal-400 font-mono mt-0.5">24 Students</p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 p-3 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Teaching Sections</span>
                  <p className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">CSE-A & CSE-B</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 p-4 px-6 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Account Status: <strong className="text-slate-900 dark:text-white">Active Verified Identity</strong>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 px-4 py-2 text-xs font-bold text-white transition"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
