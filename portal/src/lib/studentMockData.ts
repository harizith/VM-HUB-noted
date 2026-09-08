import {
  OFFICIAL_TIMETABLES,
  getTimetableByYearAndSection,
  DayPeriodAssignment,
} from "@/data/realTimetables";

export type Branch = "CSE" | "IT" | "ECE" | "AIDS" | "MECH";

export interface BranchInfo {
  code: Branch;
  name: string;
  fullName: string;
  classroom: string;
}

export const branches: Record<Branch, BranchInfo> = {
  CSE: {
    code: "CSE",
    name: "Computer Science",
    fullName: "Computer Science and Engineering",
    classroom: "Room N 204",
  },
  IT: {
    code: "IT",
    name: "Information Tech",
    fullName: "Information Technology",
    classroom: "Room N 205",
  },
  ECE: {
    code: "ECE",
    name: "Electronics & Comm",
    fullName: "Electronics and Communication Engineering",
    classroom: "Room N 206",
  },
  AIDS: {
    code: "AIDS",
    name: "AI & Data Science",
    fullName: "Artificial Intelligence and Data Science",
    classroom: "Room N 201",
  },
  MECH: {
    code: "MECH",
    name: "Mechanical",
    fullName: "Mechanical Engineering",
    classroom: "Room I 305",
  },
};

export interface StudentProfile {
  name: string;
  registerNumber: string;
  email: string;
  branch: Branch;
  department: string;
  degree: string;
  year: string;
  semester: number;
  section: string;
  mentor: string;
  cgpa: number;
  avatarUrl?: string;
  totalCredits: number;
  completedCredits: number;
}

export interface AttendanceRecord {
  id: string;
  branch: Branch;
  courseCode: string;
  courseTitle: string;
  facultyName: string;
  totalHours: number;
  attendedHours: number;
  percentage: number;
  category: "Theory" | "Practical" | "Integrated";
}

export interface InternalMark {
  id: string;
  branch: Branch;
  courseCode: string;
  courseTitle: string;
  credits: number;
  facultyName: string;
  cat1: { score: number; max: number };
  cat2: { score: number; max: number };
  modelExam: { score: number; max: number };
  assignment: { score: number; max: number };
  totalInternal: number;
  maxInternal: number;
  grade: string;
}

export interface TimetableSlot {
  period: number;
  time: string;
  courseCode: string;
  courseTitle: string;
  room: string;
  faculty: string;
  type: "theory" | "lab" | "break" | "library";
  branch?: Branch;
}

export interface DaySchedule {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  slots: TimetableSlot[];
}

export interface Announcement {
  id: string;
  title: string;
  category: "Academic" | "Exam Cell" | "Department" | "Event";
  date: string;
  content: string;
  important?: boolean;
}

export const studentProfile: StudentProfile = {
  name: "HARIZITH. K",
  registerNumber: "113125UG03049",
  email: "113125ug03049@veltechmultitech.org",
  branch: "CSE",
  department: "Computer Science and Engineering",
  degree: "B.E.",
  year: "Year II",
  semester: 3,
  section: "A",
  mentor: "Mr. R. Prabhakaran",
  cgpa: 8.85,
  totalCredits: 160,
  completedCredits: 44,
};

// Map real official timetable from Year II Section A for default student schedule (Batch 2025-2029)
function getRealDaySchedule(day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"): DaySchedule {
  const tt = getTimetableByYearAndSection("Year II", "A");
  const dayAssignments: DayPeriodAssignment[] = tt.schedule[day] || [];

  return {
    day,
    slots: dayAssignments.map((slot) => ({
      period: slot.periodNo,
      time: slot.timeSlot,
      courseCode: slot.subjectCode,
      courseTitle: slot.subjectName,
      room: slot.room,
      faculty: slot.faculty,
      type: slot.isLab ? "lab" : "theory",
      branch: "CSE",
    })),
  };
}

export const branchTimetables: Record<Branch, DaySchedule[]> = {
  CSE: [
    getRealDaySchedule("Monday"),
    getRealDaySchedule("Tuesday"),
    getRealDaySchedule("Wednesday"),
    getRealDaySchedule("Thursday"),
    getRealDaySchedule("Friday"),
  ],
  IT: [
    getRealDaySchedule("Monday"),
    getRealDaySchedule("Tuesday"),
    getRealDaySchedule("Wednesday"),
    getRealDaySchedule("Thursday"),
    getRealDaySchedule("Friday"),
  ],
  ECE: [
    getRealDaySchedule("Monday"),
    getRealDaySchedule("Tuesday"),
    getRealDaySchedule("Wednesday"),
    getRealDaySchedule("Thursday"),
    getRealDaySchedule("Friday"),
  ],
  AIDS: [
    getRealDaySchedule("Monday"),
    getRealDaySchedule("Tuesday"),
    getRealDaySchedule("Wednesday"),
    getRealDaySchedule("Thursday"),
    getRealDaySchedule("Friday"),
  ],
  MECH: [
    getRealDaySchedule("Monday"),
    getRealDaySchedule("Tuesday"),
    getRealDaySchedule("Wednesday"),
    getRealDaySchedule("Thursday"),
    getRealDaySchedule("Friday"),
  ],
};

// Helper to get timetable slots for any branch
export function getTimetableForBranch(branch: Branch): DaySchedule[] {
  return branchTimetables[branch] || branchTimetables["CSE"];
}

// Helper to get today's periods for any branch
export function getTodayPeriodsForBranch(
  branch: Branch,
  dayName: string = "Monday"
): TimetableSlot[] {
  const schedule = getTimetableForBranch(branch).find((d) => d.day === dayName);
  return schedule?.slots || [];
}

// Legacy export for backward compatibility
export const weeklyTimetable = branchTimetables.CSE;

// Real courses from Year III Semester V (Batch 2024-2028, Regulation 2023)
export const attendanceData: AttendanceRecord[] = [
  {
    id: "att-1",
    branch: "CSE",
    courseCode: "231IT521",
    courseTitle: "Artificial Intelligence and Machine Learning (Lab Integrated)",
    facultyName: "Mr R Harini",
    totalHours: 45,
    attendedHours: 41,
    percentage: 91.1,
    category: "Integrated",
  },
  {
    id: "att-2",
    branch: "CSE",
    courseCode: "231CS521",
    courseTitle: "Compiler Design",
    facultyName: "Ms V Vijayashanthi",
    totalHours: 38,
    attendedHours: 34,
    percentage: 89.5,
    category: "Theory",
  },
  {
    id: "att-3",
    branch: "CSE",
    courseCode: "231CS522",
    courseTitle: "Embedded Systems and IoT",
    facultyName: "Mr. V. Nehru",
    totalHours: 36,
    attendedHours: 32,
    percentage: 88.9,
    category: "Theory",
  },
  {
    id: "att-4",
    branch: "CSE",
    courseCode: "231CSV44",
    courseTitle: "Ethical Hacking (Program Elective - I)",
    facultyName: "Mr P Karthick",
    totalHours: 30,
    attendedHours: 26,
    percentage: 86.7,
    category: "Theory",
  },
  {
    id: "att-5",
    branch: "CSE",
    courseCode: "231ITV64",
    courseTitle: "Software Testing and Automation (Program Elective - II)",
    facultyName: "Mr N Insozhan",
    totalHours: 30,
    attendedHours: 27,
    percentage: 90.0,
    category: "Theory",
  },
  {
    id: "att-6",
    branch: "CSE",
    courseCode: "231ECV43",
    courseTitle: "Industrial IoT & Industry 4.0 (Open Elective - I)",
    facultyName: "Ms V Lavanya",
    totalHours: 28,
    attendedHours: 24,
    percentage: 85.7,
    category: "Theory",
  },
  {
    id: "att-7",
    branch: "CSE",
    courseCode: "231CS52A",
    courseTitle: "Compiler Design Laboratory",
    facultyName: "Ms V Vijayashanthi",
    totalHours: 24,
    attendedHours: 23,
    percentage: 95.8,
    category: "Practical",
  },
  {
    id: "att-8",
    branch: "CSE",
    courseCode: "231CS52B",
    courseTitle: "Embedded Systems and IoT Laboratory",
    facultyName: "Mr. V. Nehru",
    totalHours: 24,
    attendedHours: 22,
    percentage: 91.7,
    category: "Practical",
  },
];

export const internalMarksData: InternalMark[] = [
  {
    id: "mark-1",
    branch: "CSE",
    courseCode: "231IT521",
    courseTitle: "Artificial Intelligence and Machine Learning (Lab Integrated)",
    credits: 4,
    facultyName: "Mr R Harini",
    cat1: { score: 45, max: 50 },
    cat2: { score: 47, max: 50 },
    modelExam: { score: 92, max: 100 },
    assignment: { score: 10, max: 10 },
    totalInternal: 47.1,
    maxInternal: 50,
    grade: "O",
  },
  {
    id: "mark-2",
    branch: "CSE",
    courseCode: "231CS521",
    courseTitle: "Compiler Design",
    credits: 3,
    facultyName: "Ms V Vijayashanthi",
    cat1: { score: 42, max: 50 },
    cat2: { score: 44, max: 50 },
    modelExam: { score: 85, max: 100 },
    assignment: { score: 9, max: 10 },
    totalInternal: 43.5,
    maxInternal: 50,
    grade: "A+",
  },
  {
    id: "mark-3",
    branch: "CSE",
    courseCode: "231CS522",
    courseTitle: "Embedded Systems and IoT",
    credits: 3,
    facultyName: "Mr. V. Nehru",
    cat1: { score: 40, max: 50 },
    cat2: { score: 43, max: 50 },
    modelExam: { score: 86, max: 100 },
    assignment: { score: 10, max: 10 },
    totalInternal: 43.0,
    maxInternal: 50,
    grade: "A+",
  },
  {
    id: "mark-4",
    branch: "CSE",
    courseCode: "231CSV44",
    courseTitle: "Ethical Hacking (Program Elective - I)",
    credits: 3,
    facultyName: "Mr P Karthick",
    cat1: { score: 44, max: 50 },
    cat2: { score: 46, max: 50 },
    modelExam: { score: 90, max: 100 },
    assignment: { score: 10, max: 10 },
    totalInternal: 46.0,
    maxInternal: 50,
    grade: "A+",
  },
  {
    id: "mark-5",
    branch: "CSE",
    courseCode: "231ITV64",
    courseTitle: "Software Testing and Automation (Program Elective - II)",
    credits: 3,
    facultyName: "Mr N Insozhan",
    cat1: { score: 43, max: 50 },
    cat2: { score: 45, max: 50 },
    modelExam: { score: 88, max: 100 },
    assignment: { score: 10, max: 10 },
    totalInternal: 44.8,
    maxInternal: 50,
    grade: "A+",
  },
  {
    id: "mark-6",
    branch: "CSE",
    courseCode: "231CS52A",
    courseTitle: "Compiler Design Laboratory",
    credits: 1,
    facultyName: "Ms V Vijayashanthi",
    cat1: { score: 49, max: 50 },
    cat2: { score: 50, max: 50 },
    modelExam: { score: 98, max: 100 },
    assignment: { score: 10, max: 10 },
    totalInternal: 49.5,
    maxInternal: 50,
    grade: "O",
  },
];

export const announcementsData: Announcement[] = [
  {
    id: "ann-1",
    title: "Odd Semester Timetable (July 2026 – November 2026) Official Release",
    category: "Academic",
    date: "Sep 05, 2026",
    content: "Official Odd Semester timetable for Regulation 2023 (Batches 2025-2029, 2024-2028, 2023-2027) is now live on the VM-HUB portal across all 9 sections.",
    important: true,
  },
  {
    id: "ann-2",
    title: "Continuous Assessment Test-2 (CAT-2) Schedule Released",
    category: "Exam Cell",
    date: "Sep 04, 2026",
    content: "The CAT-2 Examinations for 3rd Year B.Tech students will commence from Sep 14, 2026. Hall tickets and seating arrangements will be published on the portal 3 days prior.",
    important: true,
  },
  {
    id: "ann-3",
    title: "National Level Technical Symposium 'TECHFEST 2026' Registration",
    category: "Department",
    date: "Sep 02, 2026",
    content: "Department of CSE invites project registrations for TECHFEST 2026. Cash prizes worth ₹1,50,000 to be won across 8 competitive tracks.",
    important: false,
  },
  {
    id: "ann-4",
    title: "Academic Attendance Notice: 75% Requirement for End Semesters",
    category: "Academic",
    date: "Aug 28, 2026",
    content: "Students with less than 75% aggregate attendance in any subject will be placed on the proctor review list. Please check your subject-wise attendance dashboard regularly.",
    important: true,
  },
];
