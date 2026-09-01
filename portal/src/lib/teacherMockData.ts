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
  targetSection: string; // e.g. "CSE-A", "CSE-B", "All Handled Classes"
  courseCode: string;
  date: string;
  content: string;
  priority: "High" | "Normal";
}

export const teacherProfile: TeacherProfile = {
  name: "Prof. Sample Teacher",
  staffId: "VT-FAC-1042",
  email: "teacher@veltech.edu.in",
  department: "Computer Science and Engineering",
  designation: "Associate Professor",
  cabin: "CS-Block Room 302",
  phone: "+91 98401 23456",
  assignedSections: ["CSE-A (3rd Year)", "CSE-B (3rd Year)"],
  totalStudents: 128,
  mentorWardsCount: 22,
};

export const teacherCourses: TeacherCourse[] = [
  {
    code: "21CS601",
    title: "Cloud Computing & Virtualization",
    section: "CSE-A",
    branch: "CSE",
    type: "Theory",
    studentsCount: 64,
    avgAttendance: 88.1,
    classroom: "LH-304",
  },
  {
    code: "21CS601",
    title: "Cloud Computing & Virtualization",
    section: "CSE-B",
    branch: "CSE",
    type: "Theory",
    studentsCount: 64,
    avgAttendance: 84.6,
    classroom: "LH-305",
  },
  {
    code: "21CS611",
    title: "Cloud & Security Laboratory",
    section: "CSE-A (Batch 1 & 2)",
    branch: "CSE",
    type: "Practical",
    studentsCount: 64,
    avgAttendance: 93.3,
    classroom: "Lab-4 (CS Block)",
  },
];

export const initialStudentRoster: StudentRosterItem[] = [
  {
    id: "stu-1",
    regNo: "22104101",
    name: "Sample Student",
    section: "CSE-A",
    branch: "CSE",
    attendancePercent: 88.1,
    cat1Score: 44,
    cat2Score: 46,
    modelScore: 88,
    assignmentScore: 10,
    cgpa: 8.74,
    status: "Present",
  },
  {
    id: "stu-2",
    regNo: "22104102",
    name: "Abhinav Ramesh",
    section: "CSE-A",
    branch: "CSE",
    attendancePercent: 91.5,
    cat1Score: 48,
    cat2Score: 49,
    modelScore: 94,
    assignmentScore: 10,
    cgpa: 9.12,
    status: "Present",
  },
  {
    id: "stu-3",
    regNo: "22104103",
    name: "Bhavana Krishnan",
    section: "CSE-A",
    branch: "CSE",
    attendancePercent: 72.4, // At-risk attendance
    cat1Score: 32,
    cat2Score: 35,
    modelScore: 68,
    assignmentScore: 8,
    cgpa: 6.85,
    status: "Absent",
  },
  {
    id: "stu-4",
    regNo: "22104104",
    name: "Dharun Kumar",
    section: "CSE-A",
    branch: "CSE",
    attendancePercent: 85.0,
    cat1Score: 42,
    cat2Score: 45,
    modelScore: 82,
    assignmentScore: 9,
    cgpa: 8.35,
    status: "Present",
  },
  {
    id: "stu-5",
    regNo: "22104105",
    name: "Gokul Prasad",
    section: "CSE-A",
    branch: "CSE",
    attendancePercent: 68.5, // Critical attendance
    cat1Score: 24,
    cat2Score: 28,
    modelScore: 54,
    assignmentScore: 7,
    cgpa: 6.20,
    status: "Absent",
  },
  {
    id: "stu-6",
    regNo: "22104106",
    name: "Harini Sundaram",
    section: "CSE-A",
    branch: "CSE",
    attendancePercent: 95.0,
    cat1Score: 50,
    cat2Score: 49,
    modelScore: 98,
    assignmentScore: 10,
    cgpa: 9.68,
    status: "Present",
  },
  {
    id: "stu-7",
    regNo: "22104107",
    name: "Karthik Varadhan",
    section: "CSE-A",
    branch: "CSE",
    attendancePercent: 82.0,
    cat1Score: 39,
    cat2Score: 41,
    modelScore: 80,
    assignmentScore: 9,
    cgpa: 7.95,
    status: "OD",
  },
  {
    id: "stu-8",
    regNo: "22104108",
    name: "Lavanya Mohan",
    section: "CSE-A",
    branch: "CSE",
    attendancePercent: 89.2,
    cat1Score: 46,
    cat2Score: 47,
    modelScore: 90,
    assignmentScore: 10,
    cgpa: 8.90,
    status: "Present",
  },
];

export const facultyTimetable: FacultyDaySchedule[] = [
  {
    day: "Monday",
    slots: [
      { period: 1, time: "08:45 - 09:35", courseCode: "21CS601", courseTitle: "Cloud Computing", section: "CSE-A", room: "LH-304", type: "theory" },
      { period: 2, time: "09:35 - 10:25", courseCode: "FREE", courseTitle: "Research / Cabin Hour", section: "-", room: "CS-302", type: "free" },
      { period: 3, time: "10:45 - 11:35", courseCode: "21CS601", courseTitle: "Cloud Computing", section: "CSE-B", room: "LH-305", type: "theory" },
      { period: 4, time: "11:35 - 12:25", courseCode: "FREE", courseTitle: "Student Mentoring & Doubt Clearing", section: "-", room: "CS-302", type: "free" },
      { period: 5, time: "01:15 - 02:05", courseCode: "21CS611", courseTitle: "Cloud & Security Lab", section: "CSE-A (Batch 1)", room: "Lab-4", type: "lab" },
      { period: 6, time: "02:05 - 02:55", courseCode: "21CS611", courseTitle: "Cloud & Security Lab", section: "CSE-A (Batch 1)", room: "Lab-4", type: "lab" },
      { period: 7, time: "03:05 - 03:55", courseCode: "FREE", courseTitle: "Department Meeting / Prep", section: "-", room: "Conf Hall", type: "free" },
    ],
  },
  {
    day: "Tuesday",
    slots: [
      { period: 1, time: "08:45 - 09:35", courseCode: "FREE", courseTitle: "Office Hours", section: "-", room: "CS-302", type: "free" },
      { period: 2, time: "09:35 - 10:25", courseCode: "21CS601", courseTitle: "Cloud Computing", section: "CSE-A", room: "LH-304", type: "theory" },
      { period: 3, time: "10:45 - 11:35", courseCode: "FREE", courseTitle: "Proctor Counseling", section: "-", room: "CS-302", type: "free" },
      { period: 4, time: "11:35 - 12:25", courseCode: "21CS601", courseTitle: "Cloud Computing", section: "CSE-B", room: "LH-305", type: "theory" },
      { period: 5, time: "01:15 - 02:05", courseCode: "FREE", courseTitle: "Paper Evaluation", section: "-", room: "CS-302", type: "free" },
      { period: 6, time: "02:05 - 02:55", courseCode: "21CS611", courseTitle: "Cloud & Security Lab", section: "CSE-B (Batch 1)", room: "Lab-4", type: "lab" },
      { period: 7, time: "03:05 - 03:55", courseCode: "21CS611", courseTitle: "Cloud & Security Lab", section: "CSE-B (Batch 1)", room: "Lab-4", type: "lab" },
    ],
  },
  {
    day: "Wednesday",
    slots: [
      { period: 1, time: "08:45 - 09:35", courseCode: "21CS601", courseTitle: "Cloud Computing", section: "CSE-B", room: "LH-305", type: "theory" },
      { period: 2, time: "09:35 - 10:25", courseCode: "FREE", courseTitle: "Course Prep", section: "-", room: "CS-302", type: "free" },
      { period: 3, time: "10:45 - 11:35", courseCode: "21CS601", courseTitle: "Cloud Computing", section: "CSE-A", room: "LH-304", type: "theory" },
      { period: 4, time: "11:35 - 12:25", courseCode: "FREE", courseTitle: "Cabin Hour", section: "-", room: "CS-302", type: "free" },
      { period: 5, time: "01:15 - 02:05", courseCode: "21CS611", courseTitle: "Cloud & Security Lab", section: "CSE-A (Batch 2)", room: "Lab-4", type: "lab" },
      { period: 6, time: "02:05 - 02:55", courseCode: "21CS611", courseTitle: "Cloud & Security Lab", section: "CSE-A (Batch 2)", room: "Lab-4", type: "lab" },
      { period: 7, time: "03:05 - 03:55", courseCode: "FREE", courseTitle: "Student Project Guidance", section: "-", room: "Lab-4", type: "free" },
    ],
  },
  {
    day: "Thursday",
    slots: [
      { period: 1, time: "08:45 - 09:35", courseCode: "FREE", courseTitle: "Office Hours", section: "-", room: "CS-302", type: "free" },
      { period: 2, time: "09:35 - 10:25", courseCode: "21CS601", courseTitle: "Cloud Computing", section: "CSE-B", room: "LH-305", type: "theory" },
      { period: 3, time: "10:45 - 11:35", courseCode: "FREE", courseTitle: "Curriculum Committee", section: "-", room: "Conf Room", type: "free" },
      { period: 4, time: "11:35 - 12:25", courseCode: "21CS601", courseTitle: "Cloud Computing", section: "CSE-A", room: "LH-304", type: "theory" },
      { period: 5, time: "01:15 - 02:05", courseCode: "PROJ", courseTitle: "Mini Project Review Committee", section: "CSE-A", room: "Lab-3", type: "lab" },
      { period: 6, time: "02:05 - 02:55", courseCode: "PROJ", courseTitle: "Mini Project Review Committee", section: "CSE-A", room: "Lab-3", type: "lab" },
      { period: 7, time: "03:05 - 03:55", courseCode: "FREE", courseTitle: "Cabin Hour", section: "-", room: "CS-302", type: "free" },
    ],
  },
  {
    day: "Friday",
    slots: [
      { period: 1, time: "08:45 - 09:35", courseCode: "21CS601", courseTitle: "Cloud Computing", section: "CSE-A", room: "LH-304", type: "theory" },
      { period: 2, time: "09:35 - 10:25", courseCode: "FREE", courseTitle: "Office Hours", section: "-", room: "CS-302", type: "free" },
      { period: 3, time: "10:45 - 11:35", courseCode: "21CS601", courseTitle: "Cloud Computing", section: "CSE-B", room: "LH-305", type: "theory" },
      { period: 4, time: "11:35 - 12:25", courseCode: "TUT", courseTitle: "Cloud Computing Tutorial / Quiz", section: "CSE-A", room: "LH-304", type: "theory" },
      { period: 5, time: "01:15 - 02:05", courseCode: "FREE", courseTitle: "Research Lab Work", section: "-", room: "Lab-4", type: "free" },
      { period: 6, time: "02:05 - 02:55", courseCode: "FREE", courseTitle: "Research Lab Work", section: "-", room: "Lab-4", type: "free" },
      { period: 7, time: "03:05 - 03:55", courseCode: "FREE", courseTitle: "Weekly Department Wrap-up", section: "-", room: "CS-302", type: "free" },
    ],
  },
];

export const initialClassAnnouncements: ClassAnnouncement[] = [
  {
    id: "cann-1",
    title: "AWS Hands-on Lab Assignment 3 Due Date Extension",
    category: "Assignment Deadline",
    targetSection: "CSE-A",
    courseCode: "21CS601",
    date: "Sep 01, 2026",
    content: "The deadline for submitting the CloudFormation YAML script for Assignment 3 has been extended to Friday, Sep 05, 2026 at 11:59 PM. Please verify your S3 bucket permissions before submitting.",
    priority: "High",
  },
  {
    id: "cann-2",
    title: "CAT-2 Unit 3 & Unit 4 Question Bank & Formula Sheet",
    category: "Study Material",
    targetSection: "All Handled Classes",
    courseCode: "21CS601",
    date: "Aug 30, 2026",
    content: "Uploaded revision slides and 2-mark question banks covering Virtualization Architecture, Hypervisor Types, and Storage Area Networks. Available on the shared course drive.",
    priority: "Normal",
  },
  {
    id: "cann-3",
    title: "Docker Containerization Lab Observation Notebook Verification",
    category: "Lab Submission",
    targetSection: "CSE-A",
    courseCode: "21CS611",
    date: "Aug 26, 2026",
    content: "All Batch 1 and Batch 2 students must bring their completed observation notebooks for Exercise 4 (Multi-tier Docker Compose) during next week's lab session for spot grading.",
    priority: "Normal",
  },
];
