import {
  getFacultyTeachingSchedule,
  getAllFacultyNames,
  FacultySlotAssignment,
} from "@/data/realTimetables";

export interface TeacherProfile {
  name: string;
  staffId: string;
  email: string;
  department: string;
  designation: string;
  cabin: string;
  phone: string;
  assignedSections: string[];
  totalStudents: number;
  mentorWardsCount: number;
}

export interface TeacherCourse {
  code: string;
  title: string;
  section: string;
  branch: string;
  type: "Theory" | "Practical" | "Integrated";
  studentsCount: number;
  avgAttendance: number;
  classroom: string;
}

export interface StudentRosterItem {
  id: string;
  regNo: string;
  name: string;
  section: string;
  branch: string;
  attendancePercent: number;
  cat1Score?: number;
  cat2Score?: number;
  modelScore?: number;
  assignmentScore?: number;
  cgpa: number;
  status: "Present" | "Absent" | "OD";
}

export interface FacultyTimetableSlot {
  period: number;
  time: string;
  courseCode: string;
  courseTitle: string;
  section: string;
  room: string;
  type: "theory" | "lab" | "free";
}

export interface FacultyDaySchedule {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  slots: FacultyTimetableSlot[];
}

export interface ClassAnnouncement {
  id: string;
  title: string;
  category: "Assignment Deadline" | "Lab Submission" | "Test Alert" | "Study Material" | "General";
  targetSection: string;
  courseCode: string;
  date: string;
  content: string;
  priority: "High" | "Normal";
}

export const teacherProfile: TeacherProfile = {
  name: "Mr. R. Prabhakaran",
  staffId: "VMT-CSE-014",
  email: "teacher@veltech.edu.in",
  department: "Computer Science and Engineering",
  designation: "Assistant Professor & Class Incharge",
  cabin: "Staff Room 201, CS Block",
  phone: "+91 98401 23456",
  assignedSections: ["Year II - Sec A (N 201)", "Year III - Sec A (N 204)"],
  totalStudents: 120,
  mentorWardsCount: 24,
};

export const teacherCourses: TeacherCourse[] = [
  {
    code: "231CS323",
    title: "Object Oriented Programming",
    section: "Year II - Sec A",
    branch: "CSE",
    type: "Theory",
    studentsCount: 60,
    avgAttendance: 91.2,
    classroom: "Room N 201",
  },
  {
    code: "231CS32B",
    title: "Object Oriented Programming Laboratory",
    section: "Year II - Sec A",
    branch: "CSE",
    type: "Practical",
    studentsCount: 60,
    avgAttendance: 94.6,
    classroom: "BAY 3 LAB",
  },
  {
    code: "231CBV73",
    title: "Entrepreneurship Development (PE-II)",
    section: "Year III - Sec A",
    branch: "CSE",
    type: "Theory",
    studentsCount: 45,
    avgAttendance: 88.5,
    classroom: "Room N 204",
  },
];

const rawSchedule = getFacultyTeachingSchedule("Mr. R. Prabhakaran");
const days: Array<FacultyDaySchedule["day"]> = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const facultyTimetable: FacultyDaySchedule[] = days.map((day) => {
  const assignments: FacultySlotAssignment[] = rawSchedule[day] || [];
  return {
    day,
    slots: assignments.map((s) => ({
      period: s.periodNo,
      time: s.timeSlot,
      courseCode: s.subjectCode,
      courseTitle: s.shortCode || s.subjectName,
      section: `${s.year} - Sec ${s.section}`,
      room: s.room,
      type: s.isLab ? "lab" : "theory",
    })),
  };
});

import { REAL_STUDENTS_BATCH_2025_2029 } from "@/data/realStudents";

export const studentRoster: StudentRosterItem[] = REAL_STUDENTS_BATCH_2025_2029.map((s) => ({
  id: `s-${s.vmNo}`,
  regNo: s.regNo,
  name: s.name,
  section: `Year II - Sec ${s.section}`,
  branch: "CSE",
  attendancePercent: s.vmNo === "17433" ? 92.5 : (s.sNo % 5 === 0 ? 71.5 : 88.0),
  cat1Score: s.vmNo === "17433" ? 48 : 44,
  cat2Score: s.vmNo === "17433" ? 47 : 42,
  modelScore: s.vmNo === "17433" ? 95 : 86,
  assignmentScore: 10,
  cgpa: s.vmNo === "17433" ? 8.85 : 8.5,
  status: (s.sNo % 10 === 0 ? "OD" : s.sNo % 7 === 0 ? "Absent" : "Present") as "Present" | "Absent" | "OD",
}));

export const initialStudentRoster = studentRoster;

export const classAnnouncements: ClassAnnouncement[] = [
  {
    id: "ca-1",
    title: "Odd Semester Timetable (July 2026 – November 2026) Published",
    category: "General",
    targetSection: "All Handled Classes",
    courseCode: "ALL",
    date: "Sep 05, 2026",
    content: "Please check your 8-period weekly schedule on the portal. Practical lab sessions for Bay 3 & Bay 4 will commence as per timetable.",
    priority: "High",
  },
  {
    id: "ca-2",
    title: "OOP Java Lab Exercise 3 Submission Deadline",
    category: "Lab Submission",
    targetSection: "Year II - Sec A",
    courseCode: "231CS32B",
    date: "Sep 03, 2026",
    content: "Complete and push your Polymorphism and Interface implementations to the lab repository before Thursday 05:00 PM.",
    priority: "High",
  },
];
