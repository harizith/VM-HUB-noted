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
    classroom: "LH-304",
  },
  IT: {
    code: "IT",
    name: "Information Tech",
    fullName: "Information Technology",
    classroom: "LH-308",
  },
  ECE: {
    code: "ECE",
    name: "Electronics & Comm",
    fullName: "Electronics and Communication Engineering",
    classroom: "EC-201",
  },
  AIDS: {
    code: "AIDS",
    name: "AI & Data Science",
    fullName: "Artificial Intelligence and Data Science",
    classroom: "AI-102",
  },
  MECH: {
    code: "MECH",
    name: "Mechanical",
    fullName: "Mechanical Engineering",
    classroom: "ME-105",
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
  name: "Sample Student",
  registerNumber: "22104101",
  email: "student@veltech.edu.in",
  branch: "CSE",
  department: "Computer Science and Engineering",
  degree: "B.Tech",
  year: "3rd Year",
  semester: 6,
  section: "CSE-A",
  mentor: "Dr. K. Senthil Kumar (Assoc. Prof / CSE)",
  cgpa: 8.74,
  totalCredits: 165,
  completedCredits: 118,
};

// Branch-specific weekly timetables
export const branchTimetables: Record<Branch, DaySchedule[]> = {
  CSE: [
    {
      day: "Monday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21CS601", courseTitle: "Cloud Computing", room: "LH-304", faculty: "Dr. A. Murugan", type: "theory", branch: "CSE" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21CS602", courseTitle: "Compiler Design", room: "LH-304", faculty: "Prof. S. Divya", type: "theory", branch: "CSE" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21CS604", courseTitle: "AI & Machine Learning", room: "LH-304", faculty: "Dr. P. Sharmila", type: "theory", branch: "CSE" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21CS603", courseTitle: "Crypto & Security", room: "LH-304", faculty: "Dr. R. Rajesh", type: "theory", branch: "CSE" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21CS611", courseTitle: "Cloud & Security Lab", room: "Lab-4 (CS)", faculty: "Dr. A. Murugan", type: "lab", branch: "CSE" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21CS611", courseTitle: "Cloud & Security Lab", room: "Lab-4 (CS)", faculty: "Mr. V. Anand", type: "lab", branch: "CSE" },
        { period: 7, time: "03:05 - 03:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "LH-304", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "CSE" },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21CS604", courseTitle: "AI & Machine Learning", room: "LH-304", faculty: "Dr. P. Sharmila", type: "theory", branch: "CSE" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21CS601", courseTitle: "Cloud Computing", room: "LH-304", faculty: "Dr. A. Murugan", type: "theory", branch: "CSE" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21CS603", courseTitle: "Crypto & Security", room: "LH-304", faculty: "Dr. R. Rajesh", type: "theory", branch: "CSE" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21CS602", courseTitle: "Compiler Design", room: "LH-304", faculty: "Prof. S. Divya", type: "theory", branch: "CSE" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21CS612", courseTitle: "AI & Data Science Lab", room: "Lab-2 (AI)", faculty: "Dr. P. Sharmila", type: "lab", branch: "CSE" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21CS612", courseTitle: "AI & Data Science Lab", room: "Lab-2 (AI)", faculty: "Ms. M. Kavitha", type: "lab", branch: "CSE" },
        { period: 7, time: "03:05 - 03:55", courseCode: "LIB", courseTitle: "Library / Seminar", room: "Central Lib", faculty: "Staff", type: "library", branch: "CSE" },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21CS602", courseTitle: "Compiler Design", room: "LH-304", faculty: "Prof. S. Divya", type: "theory", branch: "CSE" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21CS603", courseTitle: "Crypto & Security", room: "LH-304", faculty: "Dr. R. Rajesh", type: "theory", branch: "CSE" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21CS601", courseTitle: "Cloud Computing", room: "LH-304", faculty: "Dr. A. Murugan", type: "theory", branch: "CSE" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21CS604", courseTitle: "AI & Machine Learning", room: "LH-304", faculty: "Dr. P. Sharmila", type: "theory", branch: "CSE" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "LH-304", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "CSE" },
        { period: 6, time: "02:05 - 02:55", courseCode: "TUT", courseTitle: "Compiler Tutorial", room: "LH-304", faculty: "Prof. S. Divya", type: "theory", branch: "CSE" },
        { period: 7, time: "03:05 - 03:55", courseCode: "SPO", courseTitle: "Sports / Extra-Curricular", room: "Ground", faculty: "PED", type: "library", branch: "CSE" },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21CS603", courseTitle: "Crypto & Security", room: "LH-304", faculty: "Dr. R. Rajesh", type: "theory", branch: "CSE" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21CS604", courseTitle: "AI & Machine Learning", room: "LH-304", faculty: "Dr. P. Sharmila", type: "theory", branch: "CSE" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21CS602", courseTitle: "Compiler Design", room: "LH-304", faculty: "Prof. S. Divya", type: "theory", branch: "CSE" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21CS601", courseTitle: "Cloud Computing", room: "LH-304", faculty: "Dr. A. Murugan", type: "theory", branch: "CSE" },
        { period: 5, time: "01:15 - 02:05", courseCode: "PROJ", courseTitle: "Mini Project Mentoring", room: "Lab-3", faculty: "Dr. K. Senthil Kumar", type: "lab", branch: "CSE" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PROJ", courseTitle: "Mini Project Mentoring", room: "Lab-3", faculty: "Dr. K. Senthil Kumar", type: "lab", branch: "CSE" },
        { period: 7, time: "03:05 - 03:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "LH-304", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "CSE" },
      ],
    },
    {
      day: "Friday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21CS601", courseTitle: "Cloud Computing", room: "LH-304", faculty: "Dr. A. Murugan", type: "theory", branch: "CSE" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21CS604", courseTitle: "AI & Machine Learning", room: "LH-304", faculty: "Dr. P. Sharmila", type: "theory", branch: "CSE" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21CS603", courseTitle: "Crypto & Security", room: "LH-304", faculty: "Dr. R. Rajesh", type: "theory", branch: "CSE" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21CS602", courseTitle: "Compiler Design", room: "LH-304", faculty: "Prof. S. Divya", type: "theory", branch: "CSE" },
        { period: 5, time: "01:15 - 02:05", courseCode: "PLM", courseTitle: "Placement Soft Skills", room: "Audi-2", faculty: "Trainer Team", type: "theory", branch: "CSE" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PLM", courseTitle: "Placement Coding", room: "Lab-1", faculty: "Trainer Team", type: "lab", branch: "CSE" },
        { period: 7, time: "03:05 - 03:55", courseCode: "CLB", courseTitle: "Student Club Activity", room: "Hall 1", faculty: "Staff", type: "library", branch: "CSE" },
      ],
    },
  ],
  IT: [
    {
      day: "Monday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21IT601", courseTitle: "Full Stack Web Development", room: "LH-308", faculty: "Dr. G. Ramesh", type: "theory", branch: "IT" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21IT602", courseTitle: "Distributed & Cloud Systems", room: "LH-308", faculty: "Prof. K. Priya", type: "theory", branch: "IT" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21IT603", courseTitle: "Cyber Forensics & Security", room: "LH-308", faculty: "Dr. M. Suresh", type: "theory", branch: "IT" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21IT604", courseTitle: "Data Warehousing & Mining", room: "LH-308", faculty: "Prof. N. Deepa", type: "theory", branch: "IT" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21IT611", courseTitle: "Full Stack Web Lab", room: "Lab-5 (IT)", faculty: "Dr. G. Ramesh", type: "lab", branch: "IT" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21IT611", courseTitle: "Full Stack Web Lab", room: "Lab-5 (IT)", faculty: "Prof. K. Priya", type: "lab", branch: "IT" },
        { period: 7, time: "03:05 - 03:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "LH-308", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "IT" },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21IT603", courseTitle: "Cyber Forensics & Security", room: "LH-308", faculty: "Dr. M. Suresh", type: "theory", branch: "IT" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21IT601", courseTitle: "Full Stack Web Development", room: "LH-308", faculty: "Dr. G. Ramesh", type: "theory", branch: "IT" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21IT604", courseTitle: "Data Warehousing & Mining", room: "LH-308", faculty: "Prof. N. Deepa", type: "theory", branch: "IT" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21IT602", courseTitle: "Distributed & Cloud Systems", room: "LH-308", faculty: "Prof. K. Priya", type: "theory", branch: "IT" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21IT612", courseTitle: "Data Mining & Analytics Lab", room: "Lab-6 (IT)", faculty: "Prof. N. Deepa", type: "lab", branch: "IT" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21IT612", courseTitle: "Data Mining & Analytics Lab", room: "Lab-6 (IT)", faculty: "Prof. N. Deepa", type: "lab", branch: "IT" },
        { period: 7, time: "03:05 - 03:55", courseCode: "LIB", courseTitle: "Library / Seminar", room: "Central Lib", faculty: "Staff", type: "library", branch: "IT" },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21IT602", courseTitle: "Distributed & Cloud Systems", room: "LH-308", faculty: "Prof. K. Priya", type: "theory", branch: "IT" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21IT604", courseTitle: "Data Warehousing & Mining", room: "LH-308", faculty: "Prof. N. Deepa", type: "theory", branch: "IT" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21IT601", courseTitle: "Full Stack Web Development", room: "LH-308", faculty: "Dr. G. Ramesh", type: "theory", branch: "IT" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21IT603", courseTitle: "Cyber Forensics & Security", room: "LH-308", faculty: "Dr. M. Suresh", type: "theory", branch: "IT" },
        { period: 5, time: "01:15 - 02:05", courseCode: "PLM", courseTitle: "Placement Coding", room: "Lab-5", faculty: "Trainer Team", type: "lab", branch: "IT" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PLM", courseTitle: "Placement Soft Skills", room: "Audi-2", faculty: "Trainer Team", type: "theory", branch: "IT" },
        { period: 7, time: "03:05 - 03:55", courseCode: "SPO", courseTitle: "Sports Hour", room: "Ground", faculty: "PED", type: "library", branch: "IT" },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21IT604", courseTitle: "Data Warehousing & Mining", room: "LH-308", faculty: "Prof. N. Deepa", type: "theory", branch: "IT" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21IT603", courseTitle: "Cyber Forensics & Security", room: "LH-308", faculty: "Dr. M. Suresh", type: "theory", branch: "IT" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21IT602", courseTitle: "Distributed & Cloud Systems", room: "LH-308", faculty: "Prof. K. Priya", type: "theory", branch: "IT" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21IT601", courseTitle: "Full Stack Web Development", room: "LH-308", faculty: "Dr. G. Ramesh", type: "theory", branch: "IT" },
        { period: 5, time: "01:15 - 02:05", courseCode: "PROJ", courseTitle: "IT Mini Project Lab", room: "Lab-6", faculty: "Dr. G. Ramesh", type: "lab", branch: "IT" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PROJ", courseTitle: "IT Mini Project Lab", room: "Lab-6", faculty: "Dr. G. Ramesh", type: "lab", branch: "IT" },
        { period: 7, time: "03:05 - 03:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "LH-308", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "IT" },
      ],
    },
    {
      day: "Friday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21IT601", courseTitle: "Full Stack Web Development", room: "LH-308", faculty: "Dr. G. Ramesh", type: "theory", branch: "IT" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21IT602", courseTitle: "Distributed & Cloud Systems", room: "LH-308", faculty: "Prof. K. Priya", type: "theory", branch: "IT" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21IT603", courseTitle: "Cyber Forensics & Security", room: "LH-308", faculty: "Dr. M. Suresh", type: "theory", branch: "IT" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21IT604", courseTitle: "Data Warehousing & Mining", room: "LH-308", faculty: "Prof. N. Deepa", type: "theory", branch: "IT" },
        { period: 5, time: "01:15 - 02:05", courseCode: "TUT", courseTitle: "Full Stack Web Tutorial", room: "LH-308", faculty: "Dr. G. Ramesh", type: "theory", branch: "IT" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "LH-308", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "IT" },
        { period: 7, time: "03:05 - 03:55", courseCode: "CLB", courseTitle: "Coding Club / Hackathon", room: "Lab-5", faculty: "Staff", type: "lab", branch: "IT" },
      ],
    },
  ],
  ECE: [
    {
      day: "Monday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21EC601", courseTitle: "VLSI Design & Architecture", room: "EC-201", faculty: "Dr. V. Karthik", type: "theory", branch: "ECE" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21EC602", courseTitle: "Digital Signal Processing", room: "EC-201", faculty: "Prof. B. Anitha", type: "theory", branch: "ECE" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21EC603", courseTitle: "Antennas & Microwave Engg", room: "EC-201", faculty: "Dr. S. Praveen", type: "theory", branch: "ECE" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21EC604", courseTitle: "Embedded Systems & IoT", room: "EC-201", faculty: "Prof. T. Vignesh", type: "theory", branch: "ECE" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21EC611", courseTitle: "VLSI CAD Design Lab", room: "VLSI Lab", faculty: "Dr. V. Karthik", type: "lab", branch: "ECE" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21EC611", courseTitle: "VLSI CAD Design Lab", room: "VLSI Lab", faculty: "Dr. V. Karthik", type: "lab", branch: "ECE" },
        { period: 7, time: "03:05 - 03:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "EC-201", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "ECE" },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21EC603", courseTitle: "Antennas & Microwave Engg", room: "EC-201", faculty: "Dr. S. Praveen", type: "theory", branch: "ECE" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21EC601", courseTitle: "VLSI Design & Architecture", room: "EC-201", faculty: "Dr. V. Karthik", type: "theory", branch: "ECE" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21EC604", courseTitle: "Embedded Systems & IoT", room: "EC-201", faculty: "Prof. T. Vignesh", type: "theory", branch: "ECE" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21EC602", courseTitle: "Digital Signal Processing", room: "EC-201", faculty: "Prof. B. Anitha", type: "theory", branch: "ECE" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21EC612", courseTitle: "DSP & Communication Lab", room: "DSP Lab", faculty: "Prof. B. Anitha", type: "lab", branch: "ECE" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21EC612", courseTitle: "DSP & Communication Lab", room: "DSP Lab", faculty: "Prof. B. Anitha", type: "lab", branch: "ECE" },
        { period: 7, time: "03:05 - 03:55", courseCode: "LIB", courseTitle: "Library / Technical Seminar", room: "Central Lib", faculty: "Staff", type: "library", branch: "ECE" },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21EC602", courseTitle: "Digital Signal Processing", room: "EC-201", faculty: "Prof. B. Anitha", type: "theory", branch: "ECE" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21EC604", courseTitle: "Embedded Systems & IoT", room: "EC-201", faculty: "Prof. T. Vignesh", type: "theory", branch: "ECE" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21EC601", courseTitle: "VLSI Design & Architecture", room: "EC-201", faculty: "Dr. V. Karthik", type: "theory", branch: "ECE" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21EC603", courseTitle: "Antennas & Microwave Engg", room: "EC-201", faculty: "Dr. S. Praveen", type: "theory", branch: "ECE" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "EC-201", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "ECE" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PLM", courseTitle: "Core Hardware Aptitude", room: "Audi-2", faculty: "Trainer Team", type: "theory", branch: "ECE" },
        { period: 7, time: "03:05 - 03:55", courseCode: "SPO", courseTitle: "Sports / Extra-Curricular", room: "Ground", faculty: "PED", type: "library", branch: "ECE" },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21EC604", courseTitle: "Embedded Systems & IoT", room: "EC-201", faculty: "Prof. T. Vignesh", type: "theory", branch: "ECE" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21EC603", courseTitle: "Antennas & Microwave Engg", room: "EC-201", faculty: "Dr. S. Praveen", type: "theory", branch: "ECE" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21EC602", courseTitle: "Digital Signal Processing", room: "EC-201", faculty: "Prof. B. Anitha", type: "theory", branch: "ECE" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21EC601", courseTitle: "VLSI Design & Architecture", room: "EC-201", faculty: "Dr. V. Karthik", type: "theory", branch: "ECE" },
        { period: 5, time: "01:15 - 02:05", courseCode: "PROJ", courseTitle: "ECE Design Project Review", room: "IoT Lab", faculty: "Prof. T. Vignesh", type: "lab", branch: "ECE" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PROJ", courseTitle: "ECE Design Project Review", room: "IoT Lab", faculty: "Prof. T. Vignesh", type: "lab", branch: "ECE" },
        { period: 7, time: "03:05 - 03:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "EC-201", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "ECE" },
      ],
    },
    {
      day: "Friday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21EC601", courseTitle: "VLSI Design & Architecture", room: "EC-201", faculty: "Dr. V. Karthik", type: "theory", branch: "ECE" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21EC602", courseTitle: "Digital Signal Processing", room: "EC-201", faculty: "Prof. B. Anitha", type: "theory", branch: "ECE" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21EC603", courseTitle: "Antennas & Microwave Engg", room: "EC-201", faculty: "Dr. S. Praveen", type: "theory", branch: "ECE" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21EC604", courseTitle: "Embedded Systems & IoT", room: "EC-201", faculty: "Prof. T. Vignesh", type: "theory", branch: "ECE" },
        { period: 5, time: "01:15 - 02:05", courseCode: "TUT", courseTitle: "VLSI Tutorial", room: "EC-201", faculty: "Dr. V. Karthik", type: "theory", branch: "ECE" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PLM", courseTitle: "Embedded Coding", room: "IoT Lab", faculty: "Trainer Team", type: "lab", branch: "ECE" },
        { period: 7, time: "03:05 - 03:55", courseCode: "CLB", courseTitle: "Robotics Club", room: "Robotics Lab", faculty: "Staff", type: "lab", branch: "ECE" },
      ],
    },
  ],
  AIDS: [
    {
      day: "Monday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21AD601", courseTitle: "Deep Learning Foundations", room: "AI-102", faculty: "Dr. S. Arvind", type: "theory", branch: "AIDS" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21AD602", courseTitle: "Big Data & Hadoop Ecosystem", room: "AI-102", faculty: "Prof. R. Geetha", type: "theory", branch: "AIDS" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21AD603", courseTitle: "Natural Language Processing", room: "AI-102", faculty: "Dr. C. Harish", type: "theory", branch: "AIDS" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21AD604", courseTitle: "Computer Vision & OpenCV", room: "AI-102", faculty: "Prof. L. Nithya", type: "theory", branch: "AIDS" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21AD611", courseTitle: "Deep Learning & PyTorch Lab", room: "GPU Lab-1", faculty: "Dr. S. Arvind", type: "lab", branch: "AIDS" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21AD611", courseTitle: "Deep Learning & PyTorch Lab", room: "GPU Lab-1", faculty: "Dr. S. Arvind", type: "lab", branch: "AIDS" },
        { period: 7, time: "03:05 - 03:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "AI-102", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "AIDS" },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21AD603", courseTitle: "Natural Language Processing", room: "AI-102", faculty: "Dr. C. Harish", type: "theory", branch: "AIDS" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21AD601", courseTitle: "Deep Learning Foundations", room: "AI-102", faculty: "Dr. S. Arvind", type: "theory", branch: "AIDS" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21AD604", courseTitle: "Computer Vision & OpenCV", room: "AI-102", faculty: "Prof. L. Nithya", type: "theory", branch: "AIDS" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21AD602", courseTitle: "Big Data & Hadoop Ecosystem", room: "AI-102", faculty: "Prof. R. Geetha", type: "theory", branch: "AIDS" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21AD612", courseTitle: "Big Data Analytics Lab", room: "BigData Lab", faculty: "Prof. R. Geetha", type: "lab", branch: "AIDS" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21AD612", courseTitle: "Big Data Analytics Lab", room: "BigData Lab", faculty: "Prof. R. Geetha", type: "lab", branch: "AIDS" },
        { period: 7, time: "03:05 - 03:55", courseCode: "LIB", courseTitle: "Research Paper Seminar", room: "Central Lib", faculty: "Staff", type: "library", branch: "AIDS" },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21AD602", courseTitle: "Big Data & Hadoop Ecosystem", room: "AI-102", faculty: "Prof. R. Geetha", type: "theory", branch: "AIDS" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21AD604", courseTitle: "Computer Vision & OpenCV", room: "AI-102", faculty: "Prof. L. Nithya", type: "theory", branch: "AIDS" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21AD601", courseTitle: "Deep Learning Foundations", room: "AI-102", faculty: "Dr. S. Arvind", type: "theory", branch: "AIDS" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21AD603", courseTitle: "Natural Language Processing", room: "AI-102", faculty: "Dr. C. Harish", type: "theory", branch: "AIDS" },
        { period: 5, time: "01:15 - 02:05", courseCode: "PLM", courseTitle: "AI Placement Coding", room: "GPU Lab-1", faculty: "Trainer Team", type: "lab", branch: "AIDS" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PLM", courseTitle: "Placement Soft Skills", room: "Audi-2", faculty: "Trainer Team", type: "theory", branch: "AIDS" },
        { period: 7, time: "03:05 - 03:55", courseCode: "SPO", courseTitle: "Sports Hour", room: "Ground", faculty: "PED", type: "library", branch: "AIDS" },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21AD604", courseTitle: "Computer Vision & OpenCV", room: "AI-102", faculty: "Prof. L. Nithya", type: "theory", branch: "AIDS" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21AD603", courseTitle: "Natural Language Processing", room: "AI-102", faculty: "Dr. C. Harish", type: "theory", branch: "AIDS" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21AD602", courseTitle: "Big Data & Hadoop Ecosystem", room: "AI-102", faculty: "Prof. R. Geetha", type: "theory", branch: "AIDS" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21AD601", courseTitle: "Deep Learning Foundations", room: "AI-102", faculty: "Dr. S. Arvind", type: "theory", branch: "AIDS" },
        { period: 5, time: "01:15 - 02:05", courseCode: "PROJ", courseTitle: "AI Capstone Project", room: "GPU Lab-2", faculty: "Dr. S. Arvind", type: "lab", branch: "AIDS" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PROJ", courseTitle: "AI Capstone Project", room: "GPU Lab-2", faculty: "Dr. S. Arvind", type: "lab", branch: "AIDS" },
        { period: 7, time: "03:05 - 03:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "AI-102", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "AIDS" },
      ],
    },
    {
      day: "Friday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21AD601", courseTitle: "Deep Learning Foundations", room: "AI-102", faculty: "Dr. S. Arvind", type: "theory", branch: "AIDS" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21AD602", courseTitle: "Big Data & Hadoop Ecosystem", room: "AI-102", faculty: "Prof. R. Geetha", type: "theory", branch: "AIDS" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21AD603", courseTitle: "Natural Language Processing", room: "AI-102", faculty: "Dr. C. Harish", type: "theory", branch: "AIDS" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21AD604", courseTitle: "Computer Vision & OpenCV", room: "AI-102", faculty: "Prof. L. Nithya", type: "theory", branch: "AIDS" },
        { period: 5, time: "01:15 - 02:05", courseCode: "TUT", courseTitle: "NLP Transformers Tutorial", room: "AI-102", faculty: "Dr. C. Harish", type: "theory", branch: "AIDS" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "AI-102", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "AIDS" },
        { period: 7, time: "03:05 - 03:55", courseCode: "CLB", courseTitle: "Kaggle / AI Club", room: "GPU Lab-1", faculty: "Staff", type: "lab", branch: "AIDS" },
      ],
    },
  ],
  MECH: [
    {
      day: "Monday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21ME601", courseTitle: "Thermal Engineering & Heat Transfer", room: "ME-105", faculty: "Dr. J. Kumar", type: "theory", branch: "MECH" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21ME602", courseTitle: "Design of Transmission Systems", room: "ME-105", faculty: "Prof. T. Balan", type: "theory", branch: "MECH" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21ME603", courseTitle: "CAD / CAM & CIM", room: "ME-105", faculty: "Dr. N. Saravanan", type: "theory", branch: "MECH" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21ME604", courseTitle: "Finite Element Analysis (FEA)", room: "ME-105", faculty: "Prof. P. Mani", type: "theory", branch: "MECH" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21ME611", courseTitle: "CAD / CAM Simulation Lab", room: "CAD Lab", faculty: "Dr. N. Saravanan", type: "lab", branch: "MECH" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21ME611", courseTitle: "CAD / CAM Simulation Lab", room: "CAD Lab", faculty: "Dr. N. Saravanan", type: "lab", branch: "MECH" },
        { period: 7, time: "03:05 - 03:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "ME-105", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "MECH" },
      ],
    },
    {
      day: "Tuesday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21ME603", courseTitle: "CAD / CAM & CIM", room: "ME-105", faculty: "Dr. N. Saravanan", type: "theory", branch: "MECH" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21ME601", courseTitle: "Thermal Engineering & Heat Transfer", room: "ME-105", faculty: "Dr. J. Kumar", type: "theory", branch: "MECH" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21ME604", courseTitle: "Finite Element Analysis (FEA)", room: "ME-105", faculty: "Prof. P. Mani", type: "theory", branch: "MECH" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21ME602", courseTitle: "Design of Transmission Systems", room: "ME-105", faculty: "Prof. T. Balan", type: "theory", branch: "MECH" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21ME612", courseTitle: "Thermal & Fluids Lab", room: "Thermal Lab", faculty: "Dr. J. Kumar", type: "lab", branch: "MECH" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21ME612", courseTitle: "Thermal & Fluids Lab", room: "Thermal Lab", faculty: "Dr. J. Kumar", type: "lab", branch: "MECH" },
        { period: 7, time: "03:05 - 03:55", courseCode: "LIB", courseTitle: "Library / Mech Seminar", room: "Central Lib", faculty: "Staff", type: "library", branch: "MECH" },
      ],
    },
    {
      day: "Wednesday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21ME602", courseTitle: "Design of Transmission Systems", room: "ME-105", faculty: "Prof. T. Balan", type: "theory", branch: "MECH" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21ME604", courseTitle: "Finite Element Analysis (FEA)", room: "ME-105", faculty: "Prof. P. Mani", type: "theory", branch: "MECH" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21ME601", courseTitle: "Thermal Engineering & Heat Transfer", room: "ME-105", faculty: "Dr. J. Kumar", type: "theory", branch: "MECH" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21ME603", courseTitle: "CAD / CAM & CIM", room: "ME-105", faculty: "Dr. N. Saravanan", type: "theory", branch: "MECH" },
        { period: 5, time: "01:15 - 02:05", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "ME-105", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "MECH" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PLM", courseTitle: "Core Mechanical Aptitude", room: "Audi-2", faculty: "Trainer Team", type: "theory", branch: "MECH" },
        { period: 7, time: "03:05 - 03:55", courseCode: "SPO", courseTitle: "Sports Hour", room: "Ground", faculty: "PED", type: "library", branch: "MECH" },
      ],
    },
    {
      day: "Thursday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21ME604", courseTitle: "Finite Element Analysis (FEA)", room: "ME-105", faculty: "Prof. P. Mani", type: "theory", branch: "MECH" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21ME603", courseTitle: "CAD / CAM & CIM", room: "ME-105", faculty: "Dr. N. Saravanan", type: "theory", branch: "MECH" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21ME602", courseTitle: "Design of Transmission Systems", room: "ME-105", faculty: "Prof. T. Balan", type: "theory", branch: "MECH" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21ME601", courseTitle: "Thermal Engineering & Heat Transfer", room: "ME-105", faculty: "Dr. J. Kumar", type: "theory", branch: "MECH" },
        { period: 5, time: "01:15 - 02:05", courseCode: "PROJ", courseTitle: "Automotive / Mech Project", room: "Mech Workshop", faculty: "Prof. T. Balan", type: "lab", branch: "MECH" },
        { period: 6, time: "02:05 - 02:55", courseCode: "PROJ", courseTitle: "Automotive / Mech Project", room: "Mech Workshop", faculty: "Prof. T. Balan", type: "lab", branch: "MECH" },
        { period: 7, time: "03:05 - 03:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "ME-105", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "MECH" },
      ],
    },
    {
      day: "Friday",
      slots: [
        { period: 1, time: "08:45 - 09:35", courseCode: "21ME601", courseTitle: "Thermal Engineering & Heat Transfer", room: "ME-105", faculty: "Dr. J. Kumar", type: "theory", branch: "MECH" },
        { period: 2, time: "09:35 - 10:25", courseCode: "21ME602", courseTitle: "Design of Transmission Systems", room: "ME-105", faculty: "Prof. T. Balan", type: "theory", branch: "MECH" },
        { period: 3, time: "10:45 - 11:35", courseCode: "21ME603", courseTitle: "CAD / CAM & CIM", room: "ME-105", faculty: "Dr. N. Saravanan", type: "theory", branch: "MECH" },
        { period: 4, time: "11:35 - 12:25", courseCode: "21ME604", courseTitle: "Finite Element Analysis (FEA)", room: "ME-105", faculty: "Prof. P. Mani", type: "theory", branch: "MECH" },
        { period: 5, time: "01:15 - 02:05", courseCode: "TUT", courseTitle: "FEA Ansys Tutorial", room: "CAD Lab", faculty: "Prof. P. Mani", type: "lab", branch: "MECH" },
        { period: 6, time: "02:05 - 02:55", courseCode: "21HS601", courseTitle: "Professional Ethics", room: "ME-105", faculty: "Prof. M. Vijayalakshmi", type: "theory", branch: "MECH" },
        { period: 7, time: "03:05 - 03:55", courseCode: "CLB", courseTitle: "SAE / Go-Kart Club", room: "Auto Lab", faculty: "Staff", type: "lab", branch: "MECH" },
      ],
    },
  ],
};

// Helper to get timetable slots for any branch
export function getTimetableForBranch(branch: Branch): DaySchedule[] {
  return branchTimetables[branch] || branchTimetables["CSE"];
}

// Helper to get today's periods for any branch
export function getTodayPeriodsForBranch(branch: Branch, dayName: string = "Monday"): TimetableSlot[] {
  const schedule = getTimetableForBranch(branch).find((d) => d.day === dayName);
  return schedule?.slots || [];
}

// Legacy export for backward compatibility
export const weeklyTimetable = branchTimetables.CSE;

export const attendanceData: AttendanceRecord[] = [
  {
    id: "att-1",
    branch: "CSE",
    courseCode: "21CS601",
    courseTitle: "Cloud Computing & Virtualization",
    facultyName: "Dr. A. Murugan",
    totalHours: 42,
    attendedHours: 37,
    percentage: 88.1,
    category: "Theory",
  },
  {
    id: "att-2",
    branch: "CSE",
    courseCode: "21CS602",
    courseTitle: "Compiler Design",
    facultyName: "Prof. S. Divya",
    totalHours: 40,
    attendedHours: 34,
    percentage: 85.0,
    category: "Theory",
  },
  {
    id: "att-3",
    branch: "CSE",
    courseCode: "21CS603",
    courseTitle: "Cryptography & Network Security",
    facultyName: "Dr. R. Rajesh",
    totalHours: 38,
    attendedHours: 32,
    percentage: 84.2,
    category: "Theory",
  },
  {
    id: "att-4",
    branch: "CSE",
    courseCode: "21CS604",
    courseTitle: "Artificial Intelligence & Machine Learning",
    facultyName: "Dr. P. Sharmila",
    totalHours: 44,
    attendedHours: 39,
    percentage: 88.6,
    category: "Integrated",
  },
  {
    id: "att-5",
    branch: "CSE",
    courseCode: "21CS611",
    courseTitle: "Cloud & Security Laboratory",
    facultyName: "Dr. A. Murugan / Mr. V. Anand",
    totalHours: 30,
    attendedHours: 28,
    percentage: 93.3,
    category: "Practical",
  },
  {
    id: "att-6",
    branch: "CSE",
    courseCode: "21CS612",
    courseTitle: "AI & Data Science Lab",
    facultyName: "Dr. P. Sharmila / Ms. M. Kavitha",
    totalHours: 28,
    attendedHours: 26,
    percentage: 92.8,
    category: "Practical",
  },
  {
    id: "att-7",
    branch: "CSE",
    courseCode: "21HS601",
    courseTitle: "Professional Ethics & Human Values",
    facultyName: "Prof. M. Vijayalakshmi",
    totalHours: 24,
    attendedHours: 17,
    percentage: 70.8,
    category: "Theory",
  },
];

export const internalMarksData: InternalMark[] = [
  {
    id: "mark-1",
    branch: "CSE",
    courseCode: "21CS601",
    courseTitle: "Cloud Computing & Virtualization",
    credits: 3,
    facultyName: "Dr. A. Murugan",
    cat1: { score: 44, max: 50 },
    cat2: { score: 46, max: 50 },
    modelExam: { score: 88, max: 100 },
    assignment: { score: 10, max: 10 },
    totalInternal: 46.2,
    maxInternal: 50,
    grade: "A+",
  },
  {
    id: "mark-2",
    branch: "CSE",
    courseCode: "21CS602",
    courseTitle: "Compiler Design",
    credits: 4,
    facultyName: "Prof. S. Divya",
    cat1: { score: 41, max: 50 },
    cat2: { score: 43, max: 50 },
    modelExam: { score: 82, max: 100 },
    assignment: { score: 9, max: 10 },
    totalInternal: 42.8,
    maxInternal: 50,
    grade: "A",
  },
  {
    id: "mark-3",
    branch: "CSE",
    courseCode: "21CS603",
    courseTitle: "Cryptography & Network Security",
    credits: 3,
    facultyName: "Dr. R. Rajesh",
    cat1: { score: 39, max: 50 },
    cat2: { score: 42, max: 50 },
    modelExam: { score: 84, max: 100 },
    assignment: { score: 10, max: 10 },
    totalInternal: 42.1,
    maxInternal: 50,
    grade: "A",
  },
  {
    id: "mark-4",
    branch: "CSE",
    courseCode: "21CS604",
    courseTitle: "Artificial Intelligence & Machine Learning",
    credits: 4,
    facultyName: "Dr. P. Sharmila",
    cat1: { score: 48, max: 50 },
    cat2: { score: 47, max: 50 },
    modelExam: { score: 94, max: 100 },
    assignment: { score: 10, max: 10 },
    totalInternal: 48.5,
    maxInternal: 50,
    grade: "O",
  },
  {
    id: "mark-5",
    branch: "CSE",
    courseCode: "21CS611",
    courseTitle: "Cloud & Security Laboratory",
    credits: 2,
    facultyName: "Dr. A. Murugan / Mr. V. Anand",
    cat1: { score: 48, max: 50 },
    cat2: { score: 50, max: 50 },
    modelExam: { score: 96, max: 100 },
    assignment: { score: 10, max: 10 },
    totalInternal: 49.0,
    maxInternal: 50,
    grade: "O",
  },
  {
    id: "mark-6",
    branch: "CSE",
    courseCode: "21HS601",
    courseTitle: "Professional Ethics & Human Values",
    credits: 2,
    facultyName: "Prof. M. Vijayalakshmi",
    cat1: { score: 38, max: 50 },
    cat2: { score: 40, max: 50 },
    modelExam: { score: 78, max: 100 },
    assignment: { score: 8, max: 10 },
    totalInternal: 39.4,
    maxInternal: 50,
    grade: "B+",
  },
];

export const announcementsData: Announcement[] = [
  {
    id: "ann-1",
    title: "Continuous Assessment Test-2 (CAT-2) Schedule Released",
    category: "Exam Cell",
    date: "Sep 04, 2026",
    content: "The CAT-2 Examinations for 3rd Year B.Tech students will commence from Sep 14, 2026. Hall tickets and seating arrangements will be published on the portal 3 days prior.",
    important: true,
  },
  {
    id: "ann-2",
    title: "National Level Technical Symposium 'TECHFEST 2026' Registration",
    category: "Department",
    date: "Sep 02, 2026",
    content: "Department of CSE invites project registrations for TECHFEST 2026. Cash prizes worth ₹1,50,000 to be won across 8 competitive tracks.",
    important: false,
  },
  {
    id: "ann-3",
    title: "Academic Attendance Notice: 75% Requirement for End Semesters",
    category: "Academic",
    date: "Aug 28, 2026",
    content: "Students with less than 75% aggregate attendance in any subject will be placed on the proctor review list. Please check your subject-wise attendance dashboard regularly.",
    important: true,
  },
];
