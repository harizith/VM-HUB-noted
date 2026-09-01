import { Branch } from "./studentMockData";

export interface BranchStat {
  code: Branch;
  name: string;
  fullName: string;
  hodName: string;
  studentsCount: number;
  facultyCount: number;
  avgAttendance: number;
  avgCgpa: number;
  classroom: string;
}

export interface AdminHODRecord {
  id: string;
  staffId: string;
  name: string;
  email: string;
  branch: Branch;
  department: string;
  qualification: string;
  experienceYears: number;
  cabin: string;
  phone: string;
  facultyCount: number;
  studentCount: number;
  researchPublications: number;
  dateAppointed: string;
  status: "Active" | "On Duty";
}

export interface AdminStudentRecord {
  id: string;
  regNo: string;
  name: string;
  email: string;
  branch: Branch;
  section: string;
  year: string;
  semester: number;
  attendancePercent: number;
  cgpa: number;
  mentor: string;
  status: "Active" | "Condonation Review" | "Suspended";
}

export interface AdminFacultyRecord {
  id: string;
  staffId: string;
  name: string;
  email: string;
  branch: Branch;
  designation: string;
  cabin: string;
  phone: string;
  assignedSubjects: string[];
  weeklyHours: number;
  status: "Active" | "On Leave";
}

export interface AdminCourseRecord {
  code: string;
  title: string;
  branch: Branch;
  semester: number;
  credits: number;
  type: "Theory" | "Practical" | "Integrated";
  facultyInCharge: string;
  enrolledStudents: number;
}

export interface CollegeAnnouncement {
  id: string;
  title: string;
  category: "Exam Cell" | "Dean's Office" | "Emergency Alert" | "Symposium / Event" | "Academic";
  targetAudience: "All College" | "Students Only" | "Faculty Only" | Branch;
  date: string;
  content: string;
  priority: "High" | "Normal";
  publishedBy: string;
}

export const institutionalStats = {
  totalStudents: 3420,
  totalFaculty: 148,
  totalHods: 5,
  activeCourses: 92,
  collegeAvgAttendance: 86.8,
  placedStudentsCount: 780,
  totalClassrooms: 48,
  academicYear: "2026 - 2027 (Even Semester)",
};

export const branchStats: Record<Branch, BranchStat> = {
  CSE: {
    code: "CSE",
    name: "Computer Science",
    fullName: "Computer Science and Engineering",
    hodName: "Dr. K. Senthil Kumar",
    studentsCount: 960,
    facultyCount: 42,
    avgAttendance: 88.4,
    avgCgpa: 8.42,
    classroom: "LH-304",
  },
  IT: {
    code: "IT",
    name: "Information Tech",
    fullName: "Information Technology",
    hodName: "Dr. G. Ramesh",
    studentsCount: 640,
    facultyCount: 28,
    avgAttendance: 86.2,
    avgCgpa: 8.25,
    classroom: "LH-308",
  },
  ECE: {
    code: "ECE",
    name: "Electronics & Comm",
    fullName: "Electronics and Communication Engineering",
    hodName: "Dr. V. Karthik",
    studentsCount: 720,
    facultyCount: 32,
    avgAttendance: 85.9,
    avgCgpa: 8.31,
    classroom: "EC-201",
  },
  AIDS: {
    code: "AIDS",
    name: "AI & Data Science",
    fullName: "Artificial Intelligence and Data Science",
    hodName: "Dr. S. Arvind",
    studentsCount: 540,
    facultyCount: 24,
    avgAttendance: 89.1,
    avgCgpa: 8.58,
    classroom: "AI-102",
  },
  MECH: {
    code: "MECH",
    name: "Mechanical",
    fullName: "Mechanical Engineering",
    hodName: "Dr. J. Kumar",
    studentsCount: 560,
    facultyCount: 22,
    avgAttendance: 84.5,
    avgCgpa: 7.95,
    classroom: "ME-105",
  },
};

export const initialAdminHODs: AdminHODRecord[] = [
  {
    id: "hod-1",
    staffId: "VT-HOD-101",
    name: "Dr. K. Senthil Kumar",
    email: "hod.cse@veltech.edu.in",
    branch: "CSE",
    department: "Computer Science and Engineering",
    qualification: "Ph.D. (IIT Madras), M.Tech, B.E.",
    experienceYears: 19,
    cabin: "CS Block Room 101 - HOD Suite",
    phone: "+91 98401 11223",
    facultyCount: 42,
    studentCount: 960,
    researchPublications: 38,
    dateAppointed: "Jun 2021",
    status: "Active",
  },
  {
    id: "hod-2",
    staffId: "VT-HOD-102",
    name: "Dr. G. Ramesh",
    email: "hod.it@veltech.edu.in",
    branch: "IT",
    department: "Information Technology",
    qualification: "Ph.D. (Anna University), M.E., B.Tech",
    experienceYears: 17,
    cabin: "IT Block Room 201 - HOD Suite",
    phone: "+91 98401 33445",
    facultyCount: 28,
    studentCount: 640,
    researchPublications: 26,
    dateAppointed: "Aug 2022",
    status: "Active",
  },
  {
    id: "hod-3",
    staffId: "VT-HOD-103",
    name: "Dr. V. Karthik",
    email: "hod.ece@veltech.edu.in",
    branch: "ECE",
    department: "Electronics and Communication Engineering",
    qualification: "Ph.D. (NIT Trichy), M.E., B.E.",
    experienceYears: 18,
    cabin: "ECE Block Room 101 - HOD Suite",
    phone: "+91 98401 55667",
    facultyCount: 32,
    studentCount: 720,
    researchPublications: 31,
    dateAppointed: "Jan 2020",
    status: "Active",
  },
  {
    id: "hod-4",
    staffId: "VT-HOD-104",
    name: "Dr. S. Arvind",
    email: "hod.aids@veltech.edu.in",
    branch: "AIDS",
    department: "Artificial Intelligence & Data Science",
    qualification: "Ph.D. (IISc Bangalore), M.Tech, B.Tech",
    experienceYears: 14,
    cabin: "AI Block Room 101 - HOD Suite",
    phone: "+91 98401 77889",
    facultyCount: 24,
    studentCount: 540,
    researchPublications: 42,
    dateAppointed: "Jul 2023",
    status: "Active",
  },
  {
    id: "hod-5",
    staffId: "VT-HOD-105",
    name: "Dr. J. Kumar",
    email: "hod.mech@veltech.edu.in",
    branch: "MECH",
    department: "Mechanical Engineering",
    qualification: "Ph.D. (IIT Delhi), M.E., B.E.",
    experienceYears: 21,
    cabin: "ME Block Room 101 - HOD Suite",
    phone: "+91 98401 99001",
    facultyCount: 22,
    studentCount: 560,
    researchPublications: 29,
    dateAppointed: "May 2019",
    status: "Active",
  },
];

export const initialAdminStudents: AdminStudentRecord[] = [
  {
    id: "adm-stu-1",
    regNo: "22104101",
    name: "Sample Student",
    email: "student@veltech.edu.in",
    branch: "CSE",
    section: "CSE-A",
    year: "3rd Year",
    semester: 6,
    attendancePercent: 88.1,
    cgpa: 8.74,
    mentor: "Dr. K. Senthil Kumar",
    status: "Active",
  },
  {
    id: "adm-stu-2",
    regNo: "22104102",
    name: "Abhinav Ramesh",
    email: "abhinav@veltech.edu.in",
    branch: "CSE",
    section: "CSE-A",
    year: "3rd Year",
    semester: 6,
    attendancePercent: 91.5,
    cgpa: 9.12,
    mentor: "Prof. S. Divya",
    status: "Active",
  },
  {
    id: "adm-stu-3",
    regNo: "22104103",
    name: "Bhavana Krishnan",
    email: "bhavana@veltech.edu.in",
    branch: "CSE",
    section: "CSE-A",
    year: "3rd Year",
    semester: 6,
    attendancePercent: 72.4,
    cgpa: 6.85,
    mentor: "Dr. A. Murugan",
    status: "Condonation Review",
  },
  {
    id: "adm-stu-4",
    regNo: "22105101",
    name: "Dharun Kumar",
    email: "dharun@veltech.edu.in",
    branch: "IT",
    section: "IT-A",
    year: "3rd Year",
    semester: 6,
    attendancePercent: 85.0,
    cgpa: 8.35,
    mentor: "Prof. K. Priya",
    status: "Active",
  },
  {
    id: "adm-stu-5",
    regNo: "22105102",
    name: "Gokul Prasad",
    email: "gokul@veltech.edu.in",
    branch: "IT",
    section: "IT-A",
    year: "3rd Year",
    semester: 6,
    attendancePercent: 68.5,
    cgpa: 6.20,
    mentor: "Dr. G. Ramesh",
    status: "Condonation Review",
  },
  {
    id: "adm-stu-6",
    regNo: "22106101",
    name: "Harini Sundaram",
    email: "harini@veltech.edu.in",
    branch: "ECE",
    section: "ECE-A",
    year: "3rd Year",
    semester: 6,
    attendancePercent: 95.0,
    cgpa: 9.68,
    mentor: "Prof. B. Anitha",
    status: "Active",
  },
  {
    id: "adm-stu-7",
    regNo: "22107101",
    name: "Karthik Varadhan",
    email: "karthik@veltech.edu.in",
    branch: "AIDS",
    section: "AIDS-A",
    year: "3rd Year",
    semester: 6,
    attendancePercent: 89.0,
    cgpa: 8.95,
    mentor: "Dr. S. Arvind",
    status: "Active",
  },
  {
    id: "adm-stu-8",
    regNo: "22108101",
    name: "Lavanya Mohan",
    email: "lavanya@veltech.edu.in",
    branch: "MECH",
    section: "MECH-A",
    year: "3rd Year",
    semester: 6,
    attendancePercent: 82.5,
    cgpa: 7.90,
    mentor: "Prof. T. Balan",
    status: "Active",
  },
];

export const initialAdminFaculty: AdminFacultyRecord[] = [
  {
    id: "adm-fac-1",
    staffId: "VT-FAC-1042",
    name: "Prof. Sample Teacher",
    email: "teacher@veltech.edu.in",
    branch: "CSE",
    designation: "Associate Professor",
    cabin: "CS-302",
    phone: "+91 98401 23456",
    assignedSubjects: ["21CS601 Cloud Computing", "21CS611 Cloud & Security Lab"],
    weeklyHours: 16,
    status: "Active",
  },
  {
    id: "adm-fac-2",
    staffId: "VT-FAC-1011",
    name: "Dr. K. Senthil Kumar",
    email: "senthilkumar@veltech.edu.in",
    branch: "CSE",
    designation: "Professor & HOD",
    cabin: "CS-101",
    phone: "+91 98401 11223",
    assignedSubjects: ["21CS604 AI & Machine Learning"],
    weeklyHours: 12,
    status: "Active",
  },
  {
    id: "adm-fac-3",
    staffId: "VT-FAC-1025",
    name: "Dr. G. Ramesh",
    email: "ramesh@veltech.edu.in",
    branch: "IT",
    designation: "Professor & HOD",
    cabin: "IT-201",
    phone: "+91 98401 33445",
    assignedSubjects: ["21IT601 Full Stack Web Dev", "21IT611 Web Lab"],
    weeklyHours: 18,
    status: "Active",
  },
  {
    id: "adm-fac-4",
    staffId: "VT-FAC-1033",
    name: "Dr. V. Karthik",
    email: "karthik@veltech.edu.in",
    branch: "ECE",
    designation: "Professor & HOD",
    cabin: "EC-101",
    phone: "+91 98401 55667",
    assignedSubjects: ["21EC601 VLSI Design", "21EC611 VLSI CAD Lab"],
    weeklyHours: 16,
    status: "Active",
  },
  {
    id: "adm-fac-5",
    staffId: "VT-FAC-1050",
    name: "Dr. S. Arvind",
    email: "arvind@veltech.edu.in",
    branch: "AIDS",
    designation: "Professor & HOD",
    cabin: "AI-101",
    phone: "+91 98401 77889",
    assignedSubjects: ["21AD601 Deep Learning Foundations", "21AD611 PyTorch Lab"],
    weeklyHours: 16,
    status: "Active",
  },
  {
    id: "adm-fac-6",
    staffId: "VT-FAC-1062",
    name: "Dr. J. Kumar",
    email: "jkumar@veltech.edu.in",
    branch: "MECH",
    designation: "Professor & HOD",
    cabin: "ME-101",
    phone: "+91 98401 99001",
    assignedSubjects: ["21ME601 Thermal Engineering", "21ME612 Fluids Lab"],
    weeklyHours: 14,
    status: "Active",
  },
];

export const masterCourseCatalog: AdminCourseRecord[] = [
  {
    code: "21CS601",
    title: "Cloud Computing & Virtualization",
    branch: "CSE",
    semester: 6,
    credits: 3,
    type: "Theory",
    facultyInCharge: "Prof. Sample Teacher",
    enrolledStudents: 128,
  },
  {
    code: "21CS602",
    title: "Compiler Design & Code Generation",
    branch: "CSE",
    semester: 6,
    credits: 4,
    type: "Theory",
    facultyInCharge: "Prof. S. Divya",
    enrolledStudents: 128,
  },
  {
    code: "21CS603",
    title: "Cryptography & Network Security",
    branch: "CSE",
    semester: 6,
    credits: 3,
    type: "Theory",
    facultyInCharge: "Dr. R. Rajesh",
    enrolledStudents: 128,
  },
  {
    code: "21CS604",
    title: "Artificial Intelligence & Machine Learning",
    branch: "CSE",
    semester: 6,
    credits: 4,
    type: "Integrated",
    facultyInCharge: "Dr. P. Sharmila",
    enrolledStudents: 128,
  },
  {
    code: "21CS611",
    title: "Cloud & Security Laboratory",
    branch: "CSE",
    semester: 6,
    credits: 2,
    type: "Practical",
    facultyInCharge: "Prof. Sample Teacher / Mr. V. Anand",
    enrolledStudents: 128,
  },
  {
    code: "21IT601",
    title: "Full Stack Web Development",
    branch: "IT",
    semester: 6,
    credits: 3,
    type: "Theory",
    facultyInCharge: "Dr. G. Ramesh",
    enrolledStudents: 96,
  },
  {
    code: "21EC601",
    title: "VLSI Design & Architecture",
    branch: "ECE",
    semester: 6,
    credits: 3,
    type: "Theory",
    facultyInCharge: "Dr. V. Karthik",
    enrolledStudents: 110,
  },
  {
    code: "21AD601",
    title: "Deep Learning Foundations & Neural Nets",
    branch: "AIDS",
    semester: 6,
    credits: 4,
    type: "Integrated",
    facultyInCharge: "Dr. S. Arvind",
    enrolledStudents: 85,
  },
  {
    code: "21ME601",
    title: "Thermal Engineering & Heat Transfer",
    branch: "MECH",
    semester: 6,
    credits: 3,
    type: "Theory",
    facultyInCharge: "Dr. J. Kumar",
    enrolledStudents: 90,
  },
];

export const initialCollegeAnnouncements: CollegeAnnouncement[] = [
  {
    id: "col-ann-1",
    title: "End Semester Theory & Practical Examination Time Table (Apr/May 2026)",
    category: "Exam Cell",
    targetAudience: "All College",
    date: "Sep 01, 2026",
    content: "The Autonomous End Semester Examination schedule has been ratified by the Academic Council. Hall tickets will be downloadable from the student portal starting next Monday.",
    priority: "High",
    publishedBy: "Controller of Examinations (COE)",
  },
  {
    id: "col-ann-2",
    title: "Call for Research Proposals: Veltech Innovation Seed Grant 2026",
    category: "Dean's Office",
    targetAudience: "Faculty Only",
    date: "Aug 29, 2026",
    content: "Faculty members are invited to submit interdisciplinary research proposals for the Innovation Seed Grant (up to ₹5,00,000 per project) through the Dean R&D portal.",
    priority: "Normal",
    publishedBy: "Office of the Dean (R&D)",
  },
  {
    id: "col-ann-3",
    title: "Campus Placement Drive: Top Tier-1 Tech MNCs Visiting Next Week",
    category: "Symposium / Event",
    targetAudience: "Students Only",
    date: "Aug 27, 2026",
    content: "Placement training and mock technical rounds will be conducted in Audi-1 and Audi-2. Eligible 3rd and 4th-year students must carry their updated resumes and ID cards.",
    priority: "High",
    publishedBy: "Centre for Placement & Training",
  },
];
