export interface HODProfile {
  name: string;
  staffId: string;
  email: string;
  department: string;
  branch: string;
  qualification: string;
  experienceYears: number;
  cabin: string;
  phone: string;
  totalStudents: number;
  totalFaculty: number;
  avgAttendance: number;
  avgCgpa: number;
  publicationsCount: number;
}

export interface DepartmentFacultyWorkload {
  id: string;
  staffId: string;
  name: string;
  email: string;
  designation: string;
  cabin: string;
  assignedSubjects: string[];
  weeklyHours: number;
  mentorWardsCount: number;
  status: "Optimal" | "Overloaded" | "Underloaded";
}

export interface DepartmentStudentBatch {
  year: string;
  semester: number;
  sections: {
    section: string;
    classAdvisor: string;
    studentCount: number;
    avgAttendance: number;
    avgCgpa: number;
    atRiskCount: number;
  }[];
}

export interface SubjectCATPerformance {
  courseCode: string;
  courseTitle: string;
  facultyName: string;
  section: string;
  cat1Avg: number;
  cat2Avg: number;
  passPercentage: number;
  oGradeCount: number;
  raGradeCount: number;
  status: "Excellent" | "Satisfactory" | "Needs Review";
}

export interface DepartmentAnnouncement {
  id: string;
  title: string;
  category: "Department Symposium" | "Lab Submission" | "Proctor Meeting" | "Guest Lecture" | "Academic";
  targetAudience: "All CSE Students" | "CSE Faculty Only" | "CSE-3A" | "CSE-3B" | "Final Year Students";
  date: string;
  content: string;
  priority: "High" | "Normal";
  postedBy?: string;
}

export type FacultyMember = DepartmentFacultyWorkload;

export interface LiveRoomStatus {
  room: string;
  name: string;
  currentClass: string;
  faculty: string;
  period: string;
  occupancy: "In Session" | "Vacant" | "Maintenance";
}

export const hodProfile: HODProfile = {
  name: "Dr. K. Senthil Kumar",
  staffId: "VT-HOD-101",
  email: "hod.cse@veltech.edu.in",
  department: "Computer Science and Engineering",
  branch: "CSE",
  qualification: "Ph.D. (IIT Madras), M.Tech, B.E.",
  experienceYears: 19,
  cabin: "CS Block Room 101 - HOD Suite",
  phone: "+91 98401 11223",
  totalStudents: 960,
  totalFaculty: 42,
  avgAttendance: 88.4,
  avgCgpa: 8.42,
  publicationsCount: 38,
};

export const departmentFacultyRoster: DepartmentFacultyWorkload[] = [
  {
    id: "dfac-1",
    staffId: "VT-FAC-1042",
    name: "Prof. Sample Teacher",
    email: "teacher@veltech.edu.in",
    designation: "Associate Professor",
    cabin: "CS-302",
    assignedSubjects: ["21CS601 Cloud Computing (CSE-A)", "21CS611 Cloud Lab (CSE-A)"],
    weeklyHours: 16,
    mentorWardsCount: 22,
    status: "Optimal",
  },
  {
    id: "dfac-2",
    staffId: "VT-FAC-1014",
    name: "Prof. S. Divya",
    email: "divya.cs@veltech.edu.in",
    designation: "Associate Professor",
    cabin: "CS-304",
    assignedSubjects: ["21CS602 Compiler Design (CSE-A)", "21CS602 Compiler Design (CSE-B)"],
    weeklyHours: 18,
    mentorWardsCount: 24,
    status: "Optimal",
  },
  {
    id: "dfac-3",
    staffId: "VT-FAC-1018",
    name: "Dr. R. Rajesh",
    email: "rajesh.cs@veltech.edu.in",
    designation: "Professor",
    cabin: "CS-201",
    assignedSubjects: ["21CS603 Cryptography (CSE-A)", "21CS603 Cryptography (CSE-B)"],
    weeklyHours: 14,
    mentorWardsCount: 20,
    status: "Optimal",
  },
  {
    id: "dfac-4",
    staffId: "VT-FAC-1022",
    name: "Dr. P. Sharmila",
    email: "sharmila.cs@veltech.edu.in",
    designation: "Professor",
    cabin: "CS-205",
    assignedSubjects: ["21CS604 AI & ML (CSE-A)", "21CS612 AI Lab (CSE-A)"],
    weeklyHours: 20,
    mentorWardsCount: 26,
    status: "Overloaded",
  },
  {
    id: "dfac-5",
    staffId: "VT-FAC-1035",
    name: "Mr. V. Anand",
    email: "anand.cs@veltech.edu.in",
    designation: "Assistant Professor",
    cabin: "CS-308",
    assignedSubjects: ["21CS611 Cloud & Security Lab"],
    weeklyHours: 10,
    mentorWardsCount: 18,
    status: "Underloaded",
  },
  {
    id: "dfac-6",
    staffId: "VT-FAC-1039",
    name: "Ms. M. Kavitha",
    email: "kavitha.cs@veltech.edu.in",
    designation: "Assistant Professor",
    cabin: "CS-310",
    assignedSubjects: ["21CS612 AI & Data Science Lab"],
    weeklyHours: 12,
    mentorWardsCount: 16,
    status: "Optimal",
  },
];

export const departmentBatches: DepartmentStudentBatch[] = [
  {
    year: "3rd Year (Batch 2023 - 2027)",
    semester: 6,
    sections: [
      {
        section: "CSE-A",
        classAdvisor: "Prof. S. Divya",
        studentCount: 64,
        avgAttendance: 88.1,
        avgCgpa: 8.45,
        atRiskCount: 2,
      },
      {
        section: "CSE-B",
        classAdvisor: "Prof. Sample Teacher",
        studentCount: 64,
        avgAttendance: 86.4,
        avgCgpa: 8.32,
        atRiskCount: 3,
      },
      {
        section: "CSE-C",
        classAdvisor: "Dr. R. Rajesh",
        studentCount: 62,
        avgAttendance: 89.2,
        avgCgpa: 8.51,
        atRiskCount: 1,
      },
      {
        section: "CSE-D",
        classAdvisor: "Dr. P. Sharmila",
        studentCount: 60,
        avgAttendance: 87.5,
        avgCgpa: 8.28,
        atRiskCount: 2,
      },
    ],
  },
  {
    year: "2nd Year (Batch 2024 - 2028)",
    semester: 4,
    sections: [
      {
        section: "CSE-A",
        classAdvisor: "Mr. V. Anand",
        studentCount: 64,
        avgAttendance: 90.1,
        avgCgpa: 8.60,
        atRiskCount: 1,
      },
      {
        section: "CSE-B",
        classAdvisor: "Ms. M. Kavitha",
        studentCount: 64,
        avgAttendance: 88.0,
        avgCgpa: 8.40,
        atRiskCount: 2,
      },
    ],
  },
];

export const subjectPerformanceData: SubjectCATPerformance[] = [
  {
    courseCode: "21CS601",
    courseTitle: "Cloud Computing & Virtualization",
    facultyName: "Prof. Sample Teacher",
    section: "CSE-A",
    cat1Avg: 42.4,
    cat2Avg: 44.1,
    passPercentage: 96.8,
    oGradeCount: 14,
    raGradeCount: 2,
    status: "Excellent",
  },
  {
    courseCode: "21CS602",
    courseTitle: "Compiler Design & Automation",
    facultyName: "Prof. S. Divya",
    section: "CSE-A",
    cat1Avg: 38.6,
    cat2Avg: 40.2,
    passPercentage: 92.2,
    oGradeCount: 8,
    raGradeCount: 5,
    status: "Satisfactory",
  },
  {
    courseCode: "21CS603",
    courseTitle: "Cryptography & Network Security",
    facultyName: "Dr. R. Rajesh",
    section: "CSE-A",
    cat1Avg: 37.9,
    cat2Avg: 39.5,
    passPercentage: 90.6,
    oGradeCount: 9,
    raGradeCount: 6,
    status: "Satisfactory",
  },
  {
    courseCode: "21CS604",
    courseTitle: "Artificial Intelligence & ML",
    facultyName: "Dr. P. Sharmila",
    section: "CSE-A",
    cat1Avg: 45.2,
    cat2Avg: 46.8,
    passPercentage: 98.4,
    oGradeCount: 22,
    raGradeCount: 1,
    status: "Excellent",
  },
  {
    courseCode: "21CS611",
    courseTitle: "Cloud & Security Laboratory",
    facultyName: "Prof. Sample Teacher / Mr. V. Anand",
    section: "CSE-A (Batch 1)",
    cat1Avg: 47.5,
    cat2Avg: 48.2,
    passPercentage: 100.0,
    oGradeCount: 30,
    raGradeCount: 0,
    status: "Excellent",
  },
];

export const liveRoomStatuses: LiveRoomStatus[] = [
  {
    room: "LH-304",
    name: "3rd Year CSE-A Classroom",
    currentClass: "21CS601 Cloud Computing",
    faculty: "Prof. Sample Teacher",
    period: "Period 1 (08:45 - 09:35)",
    occupancy: "In Session",
  },
  {
    room: "LH-305",
    name: "3rd Year CSE-B Classroom",
    currentClass: "21CS602 Compiler Design",
    faculty: "Prof. S. Divya",
    period: "Period 1 (08:45 - 09:35)",
    occupancy: "In Session",
  },
  {
    room: "Lab-4",
    name: "Cloud Computing & Security Lab",
    currentClass: "21CS611 Lab Batch 1",
    faculty: "Mr. V. Anand",
    period: "Period 1 (08:45 - 09:35)",
    occupancy: "In Session",
  },
  {
    room: "Lab-2",
    name: "AI & Data Science GPU Lab",
    currentClass: "Free / Lab Prep",
    faculty: "-",
    period: "Next at 10:45 AM",
    occupancy: "Vacant",
  },
];

export const initialDepartmentAnnouncements: DepartmentAnnouncement[] = [
  {
    id: "dann-1",
    title: "CSE Department Board of Studies (BOS) Curriculum Review",
    category: "Academic",
    targetAudience: "CSE Faculty Only",
    date: "Sep 01, 2026",
    content: "All CSE professors handling 3rd and 4th-year autonomous subjects are requested to submit draft lesson plans and syllabus revisions for the upcoming BOS meeting next Thursday.",
    priority: "High",
  },
  {
    id: "dann-2",
    title: "National Hackathon 2026: Team Registration & Lab Access",
    category: "Department Symposium",
    targetAudience: "All CSE Students",
    date: "Aug 30, 2026",
    content: "Computer Science department will keep Lab-3 and Lab-4 open 24/7 during the hackathon weekend. Student teams must get their project mentors' sign-off.",
    priority: "Normal",
  },
  {
    id: "dann-3",
    title: "Mandatory Monthly Proctoring Review for Students < 75% Attendance",
    category: "Proctor Meeting",
    targetAudience: "CSE Faculty Only",
    date: "Aug 28, 2026",
    content: "Class advisors must schedule parent-mentor counseling calls for all students on the condonation warning list before CAT-2 results submission.",
    priority: "High",
  },
];
