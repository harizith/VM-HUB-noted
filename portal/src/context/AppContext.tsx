"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { triggerConfetti } from "@/lib/confetti";
import { REAL_STUDENTS_BATCH_2025_2029, RealStudentData } from "@/data/realStudents";

// ----------------------------------------------------
// Core Types & Interfaces
// ----------------------------------------------------

export type Role = "ADMIN" | "HOD" | "TEACHER" | "STUDENT";
export type AttendanceStatus = "Present" | "Absent" | "Late" | "OD";
export type LeaveType = "On-Duty (OD)" | "Medical" | "Event" | "Casual";
export type PetitionStatus = "Pending" | "Approved" | "Rejected";
export type CircularCategory = "General" | "Academic" | "Exam" | "Event" | "Admin";
export type UrgencyLevel = "Standard" | "Important" | "Urgent";
export type TargetAudience =
  | "All Department"
  | "All Students"
  | "Faculty Only"
  | "CSE-A"
  | "CSE-B"
  | "Mentees Only";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  designation?: string;
  rollNo?: string;
  regNo?: string;
  section?: string;
  semester?: number;
  year?: number;
  batch?: string;
  degree?: string;
  mentor?: string;
  mentorName?: string;
  mentorEmail?: string;
  mentorPhone?: string;
  mentorCabin?: string;
  cabin?: string;
  staffId?: string;
  cgpa?: number;
  attendancePercent?: number;
  creditsEarned?: number;
  totalCredits?: number;
  arrearsCount?: number;
  phone?: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  emergencyContact?: string;
  joiningDate?: string;
  qualifications?: string;
  experience?: string;
  researchAreas?: string[];
  bio?: string;
  avatarUrl?: string;
  status: "Active" | "Inactive";
}

export interface SyllabusTopic {
  id: string;
  unit: number;
  topicName: string;
  targetLectures: number;
  completedLectures: number;
  isCompleted: boolean;
  targetDate: string;
}

export interface CourseRecord {
  id: string;
  code: string;
  title: string;
  department: string;
  credits: number;
  section: string;
  instructorName: string;
  instructorId: string;
  totalPlannedHours: number;
  completedHours: number;
  avgAttendance: number;
  syllabus: SyllabusTopic[];
}

export interface AttendanceStudentEntry {
  studentId: string;
  regNo: string;
  name: string;
  status: AttendanceStatus;
}

export interface AttendanceSessionRecord {
  id: string;
  courseCode: string;
  courseTitle: string;
  section: string;
  date: string;
  period: number;
  periodLabel: string;
  instructorName: string;
  records: AttendanceStudentEntry[];
  presentCount: number;
  absentCount: number;
  lateCount: number;
  odCount: number;
  totalCount: number;
  timestamp: string;
}

export interface CircularRecord {
  id: string;
  title: string;
  content: string;
  category: CircularCategory;
  urgency: UrgencyLevel;
  targetAudience: TargetAudience;
  publishedBy: string;
  publisherRole: Role;
  department: string;
  date: string;
  timestamp: string;
  readBy: string[]; // List of user emails who acknowledged/read
}

export interface LeavePetitionRecord {
  id: string;
  studentId: string;
  studentName: string;
  regNo: string;
  section: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  documentRef?: string;
  status: PetitionStatus;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  facultyRemarks?: string;
}

export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  category: "ACADEMIC" | "ATTENDANCE" | "CIRCULAR" | "LEAVE" | "SYSTEM";
  timestamp: string;
  read: boolean;
  targetRole?: Role;
  targetEmail?: string;
}

export interface AuditLogRecord {
  id: string;
  action: string;
  performedBy: string;
  role: Role;
  details: string;
  timestamp: string;
}

// ----------------------------------------------------
// Initial Default Seed Data
// ----------------------------------------------------

const defaultUsers: UserRecord[] = [
  {
    id: "USR-ADM-01",
    name: "Dr. Rajesh Kumar",
    email: "admin@veltech.edu.in",
    role: "ADMIN",
    department: "Institutional Administration",
    designation: "Dean of Academic Affairs & Super Administrator",
    staffId: "VMT-ADM-001",
    cabin: "Academic Administrative Block, Room 101",
    phone: "+91 98840 55555",
    dob: "1972-08-19",
    gender: "Male",
    bloodGroup: "O+",
    address: "Administrative Quarters, Vel Tech Campus, Avadi, Chennai - 600062",
    joiningDate: "2008-01-10",
    qualifications: "Ph.D. Academic Governance, M.Tech, MBA Educational Management",
    experience: "22+ Years in Higher Education Administration",
    researchAreas: ["Institutional Quality Benchmarking", "Outcome-Based Education (OBE)", "Autonomous Systems Governance"],
    emergencyContact: "+91 98840 88888",
    bio: "Executive administrator managing autonomous college operations, curriculum regulations, and institutional NAAC/NBA compliance.",
    status: "Active",
  },
  {
    id: "USR-HOD-01",
    name: "Dr. K. Senthil Kumar",
    email: "hod@veltech.edu.in",
    role: "HOD",
    department: "Computer Science & Engineering",
    designation: "Professor & Head of Department",
    staffId: "VMT-CSE-001",
    cabin: "CSE-HOD-Block-2, Ground Floor",
    phone: "+91 94440 12345",
    dob: "1976-03-08",
    gender: "Male",
    bloodGroup: "B+",
    address: "No. 7, Temple View Enclave, Mogappair East, Chennai - 600037",
    joiningDate: "2012-07-01",
    qualifications: "Ph.D. (IIT Madras), M.Tech. CSE (NIT Trichy), B.E. CSE",
    experience: "19+ Years (Academic Leadership & Industry Collaboration)",
    researchAreas: ["Big Data Architectures", "High Performance Computing", "Distributed AI Systems"],
    emergencyContact: "+91 94440 99999",
    bio: "Department Head leading faculty development, autonomous curriculum frameworks, and industry R&D initiatives.",
    status: "Active",
  },
  {
    id: "USR-TCH-01",
    name: "Prof. Sample Teacher",
    email: "teacher@veltech.edu.in",
    role: "TEACHER",
    department: "Computer Science & Engineering",
    designation: "Associate Professor & Senior Proctor",
    staffId: "VMT-CSE-014",
    cabin: "Staff Room 304, Tech Park",
    phone: "+91 98401 23456",
    dob: "1988-11-20",
    gender: "Female",
    bloodGroup: "A+",
    address: "Plot 18, Anna Nagar West Extension, Chennai - 600101",
    joiningDate: "2018-06-15",
    qualifications: "Ph.D. in Cloud Computing (Anna University), M.E. CSE (CEG Anna University)",
    experience: "8+ Years in Teaching & Research",
    researchAreas: ["Distributed Systems", "Cloud Security", "Edge AI & IoT Networks"],
    emergencyContact: "+91 98401 99999 (Spouse)",
    bio: "Faculty mentor specializing in high-concurrency systems, cloud infrastructure engineering, and proctoring student cohorts.",
    status: "Active",
  },
  {
    id: "USR-MTR-A01",
    name: "Mr. R. Prabhakaran",
    email: "prabhakaran.r@veltechmultitech.org",
    role: "TEACHER",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor & Official Mentor (Section A)",
    staffId: "MTR-CSE-A01",
    cabin: "CSE Section A (Room N 201)",
    phone: "+91 9043636580",
    mentorCabin: "CSE Section A (Room N 201)",
    mentorPhone: "+91 9043636580",
    mentorEmail: "prabhakaran.r@veltechmultitech.org",
    qualifications: "M.E. Computer Science and Engineering",
    experience: "7+ Years in Academic Mentorship",
    status: "Active",
  },
  {
    id: "USR-MTR-A02",
    name: "Mr. S. Vinod",
    email: "vinod.s@veltechmultitech.org",
    role: "TEACHER",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor & Official Mentor (Section A)",
    staffId: "MTR-CSE-A02",
    cabin: "CSE Section A (Room N 201)",
    phone: "+91 9500551142",
    mentorCabin: "CSE Section A (Room N 201)",
    mentorPhone: "+91 9500551142",
    mentorEmail: "vinod.s@veltechmultitech.org",
    qualifications: "M.E. Computer Science and Engineering",
    experience: "6+ Years in Academic Mentorship",
    status: "Active",
  },
  {
    id: "USR-MTR-A03",
    name: "Ms. C.H. Yerakkamma",
    email: "yerakkamma.ch@veltechmultitech.org",
    role: "TEACHER",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor & Official Mentor (Section A)",
    staffId: "MTR-CSE-A03",
    cabin: "CSE Section A (Room N 201)",
    phone: "+91 9059474039",
    mentorCabin: "CSE Section A (Room N 201)",
    mentorPhone: "+91 9059474039",
    mentorEmail: "yerakkamma.ch@veltechmultitech.org",
    qualifications: "M.Tech CSE",
    experience: "5+ Years in Academic Mentorship",
    status: "Active",
  },
  {
    id: "USR-MTR-B01",
    name: "Ms. P. Selvarathinam",
    email: "selvarathinam.p@veltechmultitech.org",
    role: "TEACHER",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor & Official Mentor (Section B)",
    staffId: "MTR-CSE-B01",
    cabin: "CSE Section B (Room N 201)",
    phone: "+91 9629252119",
    mentorCabin: "CSE Section B (Room N 201)",
    mentorPhone: "+91 9629252119",
    mentorEmail: "selvarathinam.p@veltechmultitech.org",
    qualifications: "M.E. CSE",
    experience: "8+ Years in Academic Mentorship",
    status: "Active",
  },
  {
    id: "USR-MTR-B02",
    name: "Mr. V. Nehru",
    email: "nehru.v@veltechmultitech.org",
    role: "TEACHER",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor & Official Mentor (Section B)",
    staffId: "MTR-CSE-B02",
    cabin: "CSE Section B (Room N 201)",
    phone: "+91 9884026041",
    mentorCabin: "CSE Section B (Room N 201)",
    mentorPhone: "+91 9884026041",
    mentorEmail: "nehru.v@veltechmultitech.org",
    qualifications: "M.E. CSE",
    experience: "7+ Years in Academic Mentorship",
    status: "Active",
  },
  {
    id: "USR-MTR-B03",
    name: "Ms. D. Parkavi",
    email: "parkavi.d@veltechmultitech.org",
    role: "TEACHER",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor & Official Mentor (Section B)",
    staffId: "MTR-CSE-B03",
    cabin: "CSE Section B (Room N 201)",
    phone: "+91 9677145455",
    mentorCabin: "CSE Section B (Room N 201)",
    mentorPhone: "+91 9677145455",
    mentorEmail: "parkavi.d@veltechmultitech.org",
    qualifications: "M.E. CSE",
    experience: "6+ Years in Academic Mentorship",
    status: "Active",
  },
  {
    id: "USR-MTR-C01",
    name: "Ms. C.S. Sandhiya Sri",
    email: "sandhiyasri.cs@veltechmultitech.org",
    role: "TEACHER",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor & Official Mentor (Section C)",
    staffId: "MTR-CSE-C01",
    cabin: "CSE Section C (Room N 203)",
    phone: "+91 9791084403",
    mentorCabin: "CSE Section C (Room N 203)",
    mentorPhone: "+91 9791084403",
    mentorEmail: "sandhiyasri.cs@veltechmultitech.org",
    qualifications: "M.E. CSE",
    experience: "6+ Years in Academic Mentorship",
    status: "Active",
  },
  {
    id: "USR-MTR-C02",
    name: "Ms. J. Bebitha",
    email: "bebitha.j@veltechmultitech.org",
    role: "TEACHER",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor & Official Mentor (Section C)",
    staffId: "MTR-CSE-C02",
    cabin: "CSE Section C (Room N 203)",
    phone: "+91 9840152580",
    mentorCabin: "CSE Section C (Room N 203)",
    mentorPhone: "+91 9840152580",
    mentorEmail: "bebitha.j@veltechmultitech.org",
    qualifications: "M.E. CSE",
    experience: "7+ Years in Academic Mentorship",
    status: "Active",
  },
  {
    id: "USR-MTR-C03",
    name: "Ms. R. Harini",
    email: "harini.r@veltechmultitech.org",
    role: "TEACHER",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor & Official Mentor (Section C)",
    staffId: "MTR-CSE-C03",
    cabin: "CSE Section C (Room N 203)",
    phone: "+91 7305100205",
    mentorCabin: "CSE Section C (Room N 203)",
    mentorPhone: "+91 7305100205",
    mentorEmail: "harini.r@veltechmultitech.org",
    qualifications: "M.E. CSE",
    experience: "5+ Years in Academic Mentorship",
    status: "Active",
  },
  // All 180 Official Students (Batch 2025-2029)
  ...REAL_STUDENTS_BATCH_2025_2029.map((s) => ({
    id: `USR-STU-${s.vmNo}`,
    name: s.name,
    email: s.email,
    role: "STUDENT" as Role,
    department: "Computer Science & Engineering",
    degree: s.degree || "B.E.",
    rollNo: s.vmNo,
    regNo: s.regNo,
    section: `CSE-${s.section}`,
    year: 2,
    semester: 3,
    batch: "2025-2029",
    cgpa: s.vmNo === "17433" ? 8.85 : 8.5,
    attendancePercent: s.vmNo === "17433" ? 92.5 : 88.0,
    creditsEarned: 44,
    totalCredits: 160,
    arrearsCount: 0,
    mentor: s.mentorName,
    mentorName: s.mentorName,
    mentorPhone: `+91 ${s.mentorMobile}`,
    mentorEmail: `${s.mentorName.toLowerCase().replace(/[^a-z]/g, "")}@veltechmultitech.org`,
    mentorCabin: `CSE Section ${s.section} Room ${s.roomNo}`,
    phone: "+91 98765 43210",
    address: "Vel Tech Multi Tech Dr. RSR Engineering College, Avadi, Chennai - 600062",
    status: "Active" as const,
  })),
];

const defaultCourses: CourseRecord[] = [
  {
    id: "CRS-231CS321",
    code: "231CS321",
    title: "Data Structures",
    department: "CSE",
    credits: 3,
    section: "CSE-A",
    instructorName: "Mr. R. Prabhakaran",
    instructorId: "USR-MTR-A01",
    totalPlannedHours: 45,
    completedHours: 32,
    avgAttendance: 88.5,
    syllabus: [
      { id: "TOP-1", unit: 1, topicName: "Linear Data Structures - Stacks, Queues, Linked Lists", targetLectures: 9, completedLectures: 9, isCompleted: true, targetDate: "2026-07-20" },
      { id: "TOP-2", unit: 2, topicName: "Tree Structures - Binary Trees, BST, AVL Trees", targetLectures: 10, completedLectures: 10, isCompleted: true, targetDate: "2026-08-05" },
      { id: "TOP-3", unit: 3, topicName: "Graph Algorithms - BFS, DFS, Dijkstra, Minimum Spanning Trees", targetLectures: 9, completedLectures: 9, isCompleted: true, targetDate: "2026-08-22" },
      { id: "TOP-4", unit: 4, topicName: "Hashing & Priority Queues (Heaps)", targetLectures: 9, completedLectures: 4, isCompleted: false, targetDate: "2026-09-15" },
      { id: "TOP-5", unit: 5, topicName: "Advanced Sorting & Search Structures", targetLectures: 8, completedLectures: 0, isCompleted: false, targetDate: "2026-09-30" },
    ],
  },
  {
    id: "CRS-231CS323",
    code: "231CS323",
    title: "Object Oriented Programming",
    department: "CSE",
    credits: 3,
    section: "CSE-A",
    instructorName: "Mr. S. Vinod",
    instructorId: "USR-MTR-A02",
    totalPlannedHours: 45,
    completedHours: 30,
    avgAttendance: 86.2,
    syllabus: [
      { id: "TOP-201", unit: 1, topicName: "Java Fundamentals, Classes & Objects", targetLectures: 9, completedLectures: 9, isCompleted: true, targetDate: "2026-07-22" },
      { id: "TOP-202", unit: 2, topicName: "Inheritance, Interfaces & Packages", targetLectures: 10, completedLectures: 10, isCompleted: true, targetDate: "2026-08-10" },
      { id: "TOP-203", unit: 3, topicName: "Exception Handling & Multithreading", targetLectures: 9, completedLectures: 9, isCompleted: true, targetDate: "2026-08-28" },
      { id: "TOP-204", unit: 4, topicName: "Generic Programming & Collections Framework", targetLectures: 9, completedLectures: 2, isCompleted: false, targetDate: "2026-09-18" },
      { id: "TOP-205", unit: 5, topicName: "Event-Driven Programming & Java Streams", targetLectures: 8, completedLectures: 0, isCompleted: false, targetDate: "2026-10-02" },
    ],
  },
  {
    id: "CRS-231CS324",
    code: "231CS324",
    title: "Operating Systems",
    department: "CSE",
    credits: 3,
    section: "CSE-A",
    instructorName: "Ms. C.H. Yerakkamma",
    instructorId: "USR-MTR-A03",
    totalPlannedHours: 40,
    completedHours: 28,
    avgAttendance: 91.0,
    syllabus: [
      { id: "TOP-301", unit: 1, topicName: "Operating System Overview & Process Management", targetLectures: 8, completedLectures: 8, isCompleted: true, targetDate: "2026-07-25" },
      { id: "TOP-302", unit: 2, topicName: "CPU Scheduling Algorithms & Synchronization", targetLectures: 8, completedLectures: 8, isCompleted: true, targetDate: "2026-08-12" },
      { id: "TOP-303", unit: 3, topicName: "Deadlocks & Memory Management Strategies", targetLectures: 8, completedLectures: 8, isCompleted: true, targetDate: "2026-08-30" },
      { id: "TOP-304", unit: 4, topicName: "Virtual Memory, Page Replacement & Storage Systems", targetLectures: 8, completedLectures: 4, isCompleted: false, targetDate: "2026-09-20" },
      { id: "TOP-305", unit: 5, topicName: "File System Interface, Protection & Security", targetLectures: 8, completedLectures: 0, isCompleted: false, targetDate: "2026-10-05" },
    ],
  },
];

const defaultAttendanceSessions: AttendanceSessionRecord[] = [
  {
    id: "SESS-20260901-P1",
    courseCode: "231CS321",
    courseTitle: "Data Structures",
    section: "CSE-A",
    date: "2026-09-01",
    period: 1,
    periodLabel: "08:05 - 08:55",
    instructorName: "Mr. R. Prabhakaran",
    records: [
      { studentId: "USR-STU-17521", regNo: "113125UG03005", name: "ACHUDAN. B", status: "Present" },
      { studentId: "USR-STU-17435", regNo: "113125UG03008", name: "AGNEL ROHAN. J", status: "Present" },
      { studentId: "USR-STU-17516", regNo: "113125UG03009", name: "AKSHAYA. V", status: "Present" },
      { studentId: "USR-STU-17433", regNo: "113125UG03049", name: "HARIZITH. K", status: "Present" },
      { studentId: "USR-STU-17514", regNo: "113125UG03056", name: "JANSI RANI. S", status: "Present" },
    ],
    presentCount: 5,
    absentCount: 0,
    lateCount: 0,
    odCount: 0,
    totalCount: 5,
    timestamp: "2026-09-01T08:55:00Z",
  },
  {
    id: "SESS-20260902-P2",
    courseCode: "231CS323",
    courseTitle: "Object Oriented Programming",
    section: "CSE-A",
    date: "2026-09-02",
    period: 2,
    periodLabel: "08:55 - 09:45",
    instructorName: "Mr. S. Vinod",
    records: [
      { studentId: "USR-STU-17521", regNo: "113125UG03005", name: "ACHUDAN. B", status: "Present" },
      { studentId: "USR-STU-17435", regNo: "113125UG03008", name: "AGNEL ROHAN. J", status: "Present" },
      { studentId: "USR-STU-17516", regNo: "113125UG03009", name: "AKSHAYA. V", status: "OD" },
      { studentId: "USR-STU-17433", regNo: "113125UG03049", name: "HARIZITH. K", status: "Present" },
      { studentId: "USR-STU-17514", regNo: "113125UG03056", name: "JANSI RANI. S", status: "Late" },
    ],
    presentCount: 3,
    absentCount: 0,
    lateCount: 1,
    odCount: 1,
    totalCount: 5,
    timestamp: "2026-09-02T09:45:00Z",
  },
];

const defaultCirculars: CircularRecord[] = [
  {
    id: "CIRC-2026-01",
    title: "End Semester Autonomous Practical Examination Schedule (Nov 2026)",
    content: "All B.Tech 3rd and 4th year students are hereby informed that the lab exams will commence on November 15, 2026. Hall tickets will be issued by your proctors subject to 75% attendance compliance.",
    category: "Exam",
    urgency: "Urgent",
    targetAudience: "All Department",
    publishedBy: "Dr. Official Admin (Academic Dean)",
    publisherRole: "ADMIN",
    department: "Institutional Administration",
    date: "2026-09-02",
    timestamp: "2026-09-02T10:00:00Z",
    readBy: ["student@veltech.edu.in"],
  },
  {
    id: "CIRC-2026-02",
    title: "Department Symposium 'TECHFEST 2026' - Call for Student Organizers & Papers",
    content: "The Department of CSE is organizing its Annual National Symposium. Students with zero arrears and >80% attendance are eligible to apply as core student coordinators. On-Duty (OD) will be granted for all authorized event activities.",
    category: "Event",
    urgency: "Important",
    targetAudience: "All Students",
    publishedBy: "Dr. K. Senthil Kumar (HOD / CSE)",
    publisherRole: "HOD",
    department: "Computer Science & Engineering",
    date: "2026-09-01",
    timestamp: "2026-09-01T14:30:00Z",
    readBy: ["student@veltech.edu.in", "22104102@veltech.edu.in"],
  },
  {
    id: "CIRC-2026-03",
    title: "Continuous Assessment Test (CAT-2) Submission Deadlines & Review",
    content: "Faculty members must finalize CAT-2 answer scripts evaluation and upload scores to the Exam Cell portal before September 8th, 5:00 PM.",
    category: "Academic",
    urgency: "Standard",
    targetAudience: "Faculty Only",
    publishedBy: "Dr. K. Senthil Kumar (HOD / CSE)",
    publisherRole: "HOD",
    department: "Computer Science & Engineering",
    date: "2026-08-30",
    timestamp: "2026-08-30T11:00:00Z",
    readBy: ["teacher@veltech.edu.in"],
  },
  {
    id: "CIRC-2026-04",
    title: "Mandatory Proctor Counseling Session for Section CSE-A Mentees",
    content: "All mentees assigned to Prof. Sample Teacher are requested to assemble in Cabin 304 on Thursday at 3:30 PM for midterm academic & attendance review.",
    category: "General",
    urgency: "Important",
    targetAudience: "Mentees Only",
    publishedBy: "Prof. Sample Teacher",
    publisherRole: "TEACHER",
    department: "Computer Science & Engineering",
    date: "2026-08-28",
    timestamp: "2026-08-28T09:15:00Z",
    readBy: [],
  },
];

const defaultLeavePetitions: LeavePetitionRecord[] = [
  {
    id: "LEV-2026-01",
    studentId: "USR-STU-01",
    studentName: "Sample Student",
    regNo: "22104101",
    section: "CSE-A",
    type: "On-Duty (OD)",
    startDate: "2026-09-10",
    endDate: "2026-09-11",
    totalDays: 2,
    reason: "Representing Vel Tech Multitech in Smart India Hackathon 2026 Regional Finals (Hardware Edition) at IIT Madras.",
    documentRef: "SIH2026_Selection_Letter_VelTech.pdf",
    status: "Approved",
    submittedAt: "2026-08-29T11:20:00Z",
    reviewedBy: "Prof. Sample Teacher",
    reviewedAt: "2026-08-30T09:40:00Z",
    facultyRemarks: "Approved with full On-Duty attendance credit. Best wishes for the hackathon!",
  },
  {
    id: "LEV-2026-02",
    studentId: "USR-STU-03",
    studentName: "Rahul Sharma",
    regNo: "22104103",
    section: "CSE-A",
    type: "Medical",
    startDate: "2026-09-04",
    endDate: "2026-09-05",
    totalDays: 2,
    reason: "Severe viral fever and physician recommended bed rest.",
    documentRef: "Medical_Certificate_Apollo_Sep04.pdf",
    status: "Pending",
    submittedAt: "2026-09-03T16:00:00Z",
  },
  {
    id: "LEV-2026-03",
    studentId: "USR-STU-05",
    studentName: "Deepak Raj",
    regNo: "22104105",
    section: "CSE-A",
    type: "Event",
    startDate: "2026-09-12",
    endDate: "2026-09-12",
    totalDays: 1,
    reason: "Participating in Inter-Collegiate Basketball Tournament at Anna University.",
    documentRef: "AnnaUniv_Sports_Invitation.pdf",
    status: "Pending",
    submittedAt: "2026-09-04T10:15:00Z",
  },
];

const defaultNotifications: NotificationRecord[] = [
  {
    id: "NOTIF-01",
    title: "Exam Circular Issued",
    message: "End Semester Practical Examination circular has been published by Academic Dean.",
    category: "EXAM" as any,
    timestamp: "10 mins ago",
    read: false,
  },
  {
    id: "NOTIF-02",
    title: "OD Request Submitted",
    message: "Rahul Sharma submitted a Medical leave petition for Sep 04-05.",
    category: "LEAVE",
    timestamp: "1 hour ago",
    read: false,
    targetRole: "TEACHER",
  },
  {
    id: "NOTIF-03",
    title: "Syllabus Milestone Reached",
    message: "Cloud Computing Unit 3 completed ahead of schedule.",
    category: "ACADEMIC",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "NOTIF-04",
    title: "Attendance Session Committed",
    message: "Period 1 (Cloud Computing) attendance session logged into audit ledger.",
    category: "ATTENDANCE",
    timestamp: "Yesterday",
    read: true,
  },
];

const defaultAuditLogs: AuditLogRecord[] = [
  {
    id: "AUD-01",
    action: "ATTENDANCE_COMMITTED",
    performedBy: "Prof. Sample Teacher",
    role: "TEACHER",
    details: "Logged attendance for 21CS601 (CSE-A) Period 1 on 2026-09-01 (4 Present, 1 Absent)",
    timestamp: "2026-09-01 09:35:00",
  },
  {
    id: "AUD-02",
    action: "CIRCULAR_PUBLISHED",
    performedBy: "Dr. Official Admin",
    role: "ADMIN",
    details: "Issued Urgent Circular: Practical Examination Schedule (Nov 2026)",
    timestamp: "2026-09-02 10:00:00",
  },
  {
    id: "AUD-03",
    action: "LEAVE_APPROVED",
    performedBy: "Prof. Sample Teacher",
    role: "TEACHER",
    details: "Approved On-Duty petition for Sample Student (22104101) for SIH 2026 Hackathon",
    timestamp: "2026-08-30 09:40:00",
  },
];

// ----------------------------------------------------
// Context State Interface
// ----------------------------------------------------

interface AppContextType {
  // Current Active Persona & Theme
  currentUser: UserRecord;
  activeRole: Role;
  theme: "light" | "dark";
  toggleTheme: () => void;
  switchPersona: (role: Role, email?: string) => void;

  // Users Management
  users: UserRecord[];
  addUser: (user: Omit<UserRecord, "id">) => void;
  deleteUser: (userId: string) => boolean;
  reassignMentor: (studentId: string, mentorName: string) => void;
  updateUserProfile: (userId: string, updates: Partial<UserRecord>) => void;
  updateCurrentUserProfile: (updates: Partial<UserRecord>) => void;

  // Course & Syllabus Management
  courses: CourseRecord[];
  addCourse: (course: Omit<CourseRecord, "id">) => void;
  deleteCourse: (courseId: string) => void;
  toggleTopicCompletion: (courseId: string, topicId: string) => void;

  // Attendance Management
  attendanceSessions: AttendanceSessionRecord[];
  commitAttendanceSession: (session: Omit<AttendanceSessionRecord, "id" | "timestamp">) => void;

  // Circulars & Broadcasts
  circulars: CircularRecord[];
  publishCircular: (circular: Omit<CircularRecord, "id" | "timestamp" | "readBy">) => void;
  acknowledgeCircular: (circularId: string) => void;

  // Leave & OD Petitions
  leavePetitions: LeavePetitionRecord[];
  submitLeavePetition: (petition: Omit<LeavePetitionRecord, "id" | "submittedAt" | "status">) => void;
  adjudicateLeavePetition: (petitionId: string, status: "Approved" | "Rejected", remarks: string) => void;

  // Notifications
  notifications: NotificationRecord[];
  markNotificationAsRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;

  // Audit Logs & System Reset
  auditLogs: AuditLogRecord[];
  resetDatabase: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ----------------------------------------------------
// Provider Implementation
// ----------------------------------------------------

export function AppProvider({ children }: { children: ReactNode }) {
  // Theme State
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Multi-Persona Current User
  const [currentUser, setCurrentUser] = useState<UserRecord>(defaultUsers[0]);
  const [activeRole, setActiveRole] = useState<Role>("ADMIN");

  // Core Data Stores
  const [users, setUsers] = useState<UserRecord[]>(defaultUsers);
  const [courses, setCourses] = useState<CourseRecord[]>(defaultCourses);
  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSessionRecord[]>(defaultAttendanceSessions);
  const [circulars, setCirculars] = useState<CircularRecord[]>(defaultCirculars);
  const [leavePetitions, setLeavePetitions] = useState<LeavePetitionRecord[]>(defaultLeavePetitions);
  const [notifications, setNotifications] = useState<NotificationRecord[]>(defaultNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(defaultAuditLogs);

  // Initialize from LocalStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("vm_theme") as "light" | "dark" | null;
      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }

      const savedRole = localStorage.getItem("vm_active_role") as Role | null;
      const savedUserEmail = localStorage.getItem("vm_user_email");

      const savedUsers = localStorage.getItem("vm_users");
      if (savedUsers) setUsers(JSON.parse(savedUsers));

      const loadedUsers = savedUsers ? JSON.parse(savedUsers) : defaultUsers;

      if (savedUserEmail) {
        const found = loadedUsers.find((u: UserRecord) => u.email.toLowerCase() === savedUserEmail.toLowerCase());
        if (found) {
          setCurrentUser(found);
          setActiveRole(found.role);
        }
      } else if (savedRole) {
        setActiveRole(savedRole);
        const match = loadedUsers.find((u: UserRecord) => u.role === savedRole);
        if (match) setCurrentUser(match);
      }

      const savedCourses = localStorage.getItem("vm_courses");
      if (savedCourses) setCourses(JSON.parse(savedCourses));

      const savedSessions = localStorage.getItem("vm_attendance_sessions");
      if (savedSessions) setAttendanceSessions(JSON.parse(savedSessions));

      const savedCirculars = localStorage.getItem("vm_circulars");
      if (savedCirculars) setCirculars(JSON.parse(savedCirculars));

      const savedPetitions = localStorage.getItem("vm_leave_petitions");
      if (savedPetitions) setLeavePetitions(JSON.parse(savedPetitions));

      const savedNotifs = localStorage.getItem("vm_notifications");
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));

      const savedLogs = localStorage.getItem("vm_audit_logs");
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs));
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // Save to LocalStorage helpers
  const persistUsers = (data: UserRecord[]) => {
    setUsers(data);
    try { localStorage.setItem("vm_users", JSON.stringify(data)); } catch {}
  };

  const persistCourses = (data: CourseRecord[]) => {
    setCourses(data);
    try { localStorage.setItem("vm_courses", JSON.stringify(data)); } catch {}
  };

  const persistSessions = (data: AttendanceSessionRecord[]) => {
    setAttendanceSessions(data);
    try { localStorage.setItem("vm_attendance_sessions", JSON.stringify(data)); } catch {}
  };

  const persistCirculars = (data: CircularRecord[]) => {
    setCirculars(data);
    try { localStorage.setItem("vm_circulars", JSON.stringify(data)); } catch {}
  };

  const persistPetitions = (data: LeavePetitionRecord[]) => {
    setLeavePetitions(data);
    try { localStorage.setItem("vm_leave_petitions", JSON.stringify(data)); } catch {}
  };

  const persistNotifications = (data: NotificationRecord[]) => {
    setNotifications(data);
    try { localStorage.setItem("vm_notifications", JSON.stringify(data)); } catch {}
  };

  const persistAuditLogs = (data: AuditLogRecord[]) => {
    setAuditLogs(data);
    try { localStorage.setItem("vm_audit_logs", JSON.stringify(data)); } catch {}
  };

  // 1. Theme Switcher
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
      localStorage.setItem("vm_theme", nextTheme);
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {}
  };

  // 2. Persona Switcher
  const switchPersona = (role: Role, email?: string) => {
    let targetUser: UserRecord | undefined;
    if (email) {
      targetUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    }
    if (!targetUser) {
      targetUser = users.find((u) => u.role === role);
    }
    if (!targetUser) return;

    setCurrentUser(targetUser);
    setActiveRole(targetUser.role);
    try {
      localStorage.setItem("vm_active_role", targetUser.role);
      localStorage.setItem("vm_user_email", targetUser.email);
    } catch {}

    triggerConfetti();
  };

  // 3. User Management
  const addUser = (userData: Omit<UserRecord, "id">) => {
    const newUser: UserRecord = {
      ...userData,
      id: `USR-${Date.now()}`,
    };
    const updated = [newUser, ...users];
    persistUsers(updated);

    const log: AuditLogRecord = {
      id: `AUD-${Date.now()}`,
      action: "USER_PROVISIONED",
      performedBy: currentUser.name,
      role: activeRole,
      details: `Provisioned new ${userData.role}: ${userData.name} (${userData.email})`,
      timestamp: new Date().toLocaleString(),
    };
    persistAuditLogs([log, ...auditLogs]);

    triggerConfetti();
  };

  const deleteUser = (userId: string): boolean => {
    // Root protection for primary accounts
    const target = users.find((u) => u.id === userId);
    if (!target) return false;
    if (["admin@veltech.edu.in", "hod@veltech.edu.in"].includes(target.email)) {
      alert("Institutional Root Account cannot be deleted.");
      return false;
    }

    const updated = users.filter((u) => u.id !== userId);
    persistUsers(updated);

    const log: AuditLogRecord = {
      id: `AUD-${Date.now()}`,
      action: "USER_DELETED",
      performedBy: currentUser.name,
      role: activeRole,
      details: `Removed user account: ${target.name} (${target.email})`,
      timestamp: new Date().toLocaleString(),
    };
    persistAuditLogs([log, ...auditLogs]);
    return true;
  };

  const reassignMentor = (studentId: string, mentorName: string) => {
    const updated = users.map((u) => (u.id === studentId ? { ...u, mentor: mentorName, mentorName } : u));
    persistUsers(updated);

    const log: AuditLogRecord = {
      id: `AUD-${Date.now()}`,
      action: "MENTOR_REASSIGNED",
      performedBy: currentUser.name,
      role: activeRole,
      details: `Reassigned student mentor to: ${mentorName}`,
      timestamp: new Date().toLocaleString(),
    };
    persistAuditLogs([log, ...auditLogs]);
  };

  const updateUserProfile = (userId: string, updates: Partial<UserRecord>) => {
    const updatedUsers = users.map((u) => (u.id === userId ? { ...u, ...updates } : u));
    persistUsers(updatedUsers);

    if (currentUser.id === userId) {
      const updatedCurrent = { ...currentUser, ...updates };
      setCurrentUser(updatedCurrent);
      try {
        localStorage.setItem("vm_user_email", updatedCurrent.email);
      } catch {}
    }

    const log: AuditLogRecord = {
      id: `AUD-${Date.now()}`,
      action: "PROFILE_UPDATED",
      performedBy: currentUser.name,
      role: activeRole,
      details: `Updated profile attributes for user ID: ${userId}`,
      timestamp: new Date().toLocaleString(),
    };
    persistAuditLogs([log, ...auditLogs]);

    const notif: NotificationRecord = {
      id: `NOTIF-${Date.now()}`,
      title: "Profile Updated",
      message: "Your profile details have been saved successfully.",
      category: "SYSTEM",
      timestamp: "Just now",
      read: false,
    };
    persistNotifications([notif, ...notifications]);

    triggerConfetti();
  };

  const updateCurrentUserProfile = (updates: Partial<UserRecord>) => {
    updateUserProfile(currentUser.id, updates);
  };

  // 4. Course Management
  const addCourse = (courseData: Omit<CourseRecord, "id">) => {
    const newCourse: CourseRecord = {
      ...courseData,
      id: `CRS-${Date.now()}`,
    };
    const updated = [newCourse, ...courses];
    persistCourses(updated);

    const log: AuditLogRecord = {
      id: `AUD-${Date.now()}`,
      action: "COURSE_CREATED",
      performedBy: currentUser.name,
      role: activeRole,
      details: `Created new course ${newCourse.code}: ${newCourse.title} assigned to ${newCourse.instructorName}`,
      timestamp: new Date().toLocaleString(),
    };
    persistAuditLogs([log, ...auditLogs]);
    triggerConfetti();
  };

  const deleteCourse = (courseId: string) => {
    const target = courses.find((c) => c.id === courseId);
    const updated = courses.filter((c) => c.id !== courseId);
    persistCourses(updated);

    if (target) {
      const log: AuditLogRecord = {
        id: `AUD-${Date.now()}`,
        action: "COURSE_DELETED",
        performedBy: currentUser.name,
        role: activeRole,
        details: `Deleted course: ${target.code} (${target.title})`,
        timestamp: new Date().toLocaleString(),
      };
      persistAuditLogs([log, ...auditLogs]);
    }
  };

  const toggleTopicCompletion = (courseId: string, topicId: string) => {
    const updatedCourses = courses.map((course) => {
      if (course.id !== courseId) return course;

      let newlyCompletedHours = 0;
      const updatedSyllabus = course.syllabus.map((topic) => {
        if (topic.id === topicId) {
          const nextCompleted = !topic.isCompleted;
          const completedLectures = nextCompleted ? topic.targetLectures : 0;
          return { ...topic, isCompleted: nextCompleted, completedLectures };
        }
        return topic;
      });

      newlyCompletedHours = updatedSyllabus.reduce((acc, curr) => acc + curr.completedLectures, 0);

      return {
        ...course,
        syllabus: updatedSyllabus,
        completedHours: newlyCompletedHours,
      };
    });

    persistCourses(updatedCourses);
  };

  // 5. Attendance Management
  const commitAttendanceSession = (sessionData: Omit<AttendanceSessionRecord, "id" | "timestamp">) => {
    const newSession: AttendanceSessionRecord = {
      ...sessionData,
      id: `SESS-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    const updatedSessions = [newSession, ...attendanceSessions];
    persistSessions(updatedSessions);

    // Update individual students' aggregate attendance
    const updatedUsers = users.map((user) => {
      const entry = sessionData.records.find((r) => r.studentId === user.id || r.regNo === user.regNo);
      if (entry && user.attendancePercent !== undefined) {
        // Adjust percentage dynamically based on status
        const isPresentOrOD = entry.status === "Present" || entry.status === "OD";
        const currentAtt = user.attendancePercent;
        const delta = isPresentOrOD ? +0.5 : -1.2;
        const newPercent = Math.min(100, Math.max(20, +(currentAtt + delta).toFixed(1)));
        return { ...user, attendancePercent: newPercent };
      }
      return user;
    });
    persistUsers(updatedUsers);

    // Increment completed hours in course
    const matchingCourse = courses.find((c) => c.code === sessionData.courseCode && c.section === sessionData.section);
    if (matchingCourse) {
      const updatedCourses = courses.map((c) => (c.id === matchingCourse.id ? { ...c, completedHours: c.completedHours + 1 } : c));
      persistCourses(updatedCourses);
    }

    const log: AuditLogRecord = {
      id: `AUD-${Date.now()}`,
      action: "ATTENDANCE_COMMITTED",
      performedBy: currentUser.name,
      role: activeRole,
      details: `Committed Session for ${sessionData.courseCode} (${sessionData.section}) Period ${sessionData.period} on ${sessionData.date} (${sessionData.presentCount} Present, ${sessionData.absentCount} Absent, ${sessionData.lateCount} Late, ${sessionData.odCount} OD)`,
      timestamp: new Date().toLocaleString(),
    };
    persistAuditLogs([log, ...auditLogs]);

    const notif: NotificationRecord = {
      id: `NOTIF-${Date.now()}`,
      title: "Attendance Session Finalized",
      message: `${sessionData.courseCode} (${sessionData.section}) period ${sessionData.period} attendance was successfully committed.`,
      category: "ATTENDANCE",
      timestamp: "Just now",
      read: false,
    };
    persistNotifications([notif, ...notifications]);

    triggerConfetti();
  };

  // 6. Circulars & Broadcasts
  const publishCircular = (circData: Omit<CircularRecord, "id" | "timestamp" | "readBy">) => {
    const newCircular: CircularRecord = {
      ...circData,
      id: `CIRC-${Date.now()}`,
      timestamp: new Date().toISOString(),
      readBy: [],
    };

    const updated = [newCircular, ...circulars];
    persistCirculars(updated);

    const log: AuditLogRecord = {
      id: `AUD-${Date.now()}`,
      action: "CIRCULAR_PUBLISHED",
      performedBy: currentUser.name,
      role: activeRole,
      details: `Broadcasted [${circData.urgency}] ${circData.category} notice: "${circData.title}" to ${circData.targetAudience}`,
      timestamp: new Date().toLocaleString(),
    };
    persistAuditLogs([log, ...auditLogs]);

    const notif: NotificationRecord = {
      id: `NOTIF-${Date.now()}`,
      title: `New Circular: ${circData.title}`,
      message: `Issued by ${circData.publishedBy} (${circData.targetAudience})`,
      category: "CIRCULAR",
      timestamp: "Just now",
      read: false,
    };
    persistNotifications([notif, ...notifications]);

    triggerConfetti();
  };

  const acknowledgeCircular = (circularId: string) => {
    const userEmail = currentUser.email;
    const updated = circulars.map((c) => {
      if (c.id === circularId) {
        if (!c.readBy.includes(userEmail)) {
          return { ...c, readBy: [...c.readBy, userEmail] };
        }
      }
      return c;
    });
    persistCirculars(updated);
  };

  // 7. Leave & OD Petitions
  const submitLeavePetition = (petitionData: Omit<LeavePetitionRecord, "id" | "submittedAt" | "status">) => {
    const newPetition: LeavePetitionRecord = {
      ...petitionData,
      id: `LEV-${Date.now()}`,
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    const updated = [newPetition, ...leavePetitions];
    persistPetitions(updated);

    const log: AuditLogRecord = {
      id: `AUD-${Date.now()}`,
      action: "LEAVE_PETITION_SUBMITTED",
      performedBy: currentUser.name,
      role: activeRole,
      details: `${petitionData.studentName} (${petitionData.regNo}) submitted ${petitionData.type} request for ${petitionData.totalDays} day(s)`,
      timestamp: new Date().toLocaleString(),
    };
    persistAuditLogs([log, ...auditLogs]);

    const notif: NotificationRecord = {
      id: `NOTIF-${Date.now()}`,
      title: `New ${petitionData.type} Petition Submitted`,
      message: `From ${petitionData.studentName} (${petitionData.regNo}) for ${petitionData.startDate} to ${petitionData.endDate}`,
      category: "LEAVE",
      timestamp: "Just now",
      read: false,
      targetRole: "TEACHER",
    };
    persistNotifications([notif, ...notifications]);

    triggerConfetti();
  };

  const adjudicateLeavePetition = (petitionId: string, status: "Approved" | "Rejected", remarks: string) => {
    const updated = leavePetitions.map((p) => {
      if (p.id === petitionId) {
        return {
          ...p,
          status,
          facultyRemarks: remarks,
          reviewedBy: currentUser.name,
          reviewedAt: new Date().toISOString(),
        };
      }
      return p;
    });
    persistPetitions(updated);

    const target = leavePetitions.find((p) => p.id === petitionId);
    const log: AuditLogRecord = {
      id: `AUD-${Date.now()}`,
      action: status === "Approved" ? "LEAVE_APPROVED" : "LEAVE_REJECTED",
      performedBy: currentUser.name,
      role: activeRole,
      details: `${status} ${target?.type || "Leave"} petition for ${target?.studentName || "Student"} with remarks: "${remarks}"`,
      timestamp: new Date().toLocaleString(),
    };
    persistAuditLogs([log, ...auditLogs]);

    const notif: NotificationRecord = {
      id: `NOTIF-${Date.now()}`,
      title: `Leave Petition ${status}`,
      message: `Your petition for ${target?.startDate || "requested dates"} has been ${status.toLowerCase()} by ${currentUser.name}.`,
      category: "LEAVE",
      timestamp: "Just now",
      read: false,
      targetRole: "STUDENT",
    };
    persistNotifications([notif, ...notifications]);

    triggerConfetti();
  };

  // 8. Notifications
  const markNotificationAsRead = (notifId: string) => {
    const updated = notifications.map((n) => (n.id === notifId ? { ...n, read: true } : n));
    persistNotifications(updated);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    persistNotifications(updated);
  };

  // 9. Reset to Default Database
  const resetDatabase = () => {
    persistUsers(defaultUsers);
    persistCourses(defaultCourses);
    persistSessions(defaultAttendanceSessions);
    persistCirculars(defaultCirculars);
    persistPetitions(defaultLeavePetitions);
    persistNotifications(defaultNotifications);
    persistAuditLogs(defaultAuditLogs);
    setCurrentUser(defaultUsers[0]);
    setActiveRole("ADMIN");
    try {
      localStorage.setItem("vm_active_role", "ADMIN");
      localStorage.setItem("vm_user_email", "admin@veltech.edu.in");
    } catch {}
    triggerConfetti();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRole,
        theme,
        toggleTheme,
        switchPersona,

        users,
        addUser,
        deleteUser,
        reassignMentor,
        updateUserProfile,
        updateCurrentUserProfile,

        courses,
        addCourse,
        deleteCourse,
        toggleTopicCompletion,

        attendanceSessions,
        commitAttendanceSession,

        circulars,
        publishCircular,
        acknowledgeCircular,

        leavePetitions,
        submitLeavePetition,
        adjudicateLeavePetition,

        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,

        auditLogs,
        resetDatabase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ----------------------------------------------------
// Custom Hook
// ----------------------------------------------------
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
