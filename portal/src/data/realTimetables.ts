export interface PeriodTimeSlot {
  periodNo: number;
  label: string;
  startTime: string;
  endTime: string;
  isBreak?: boolean;
}

export const PERIOD_SLOTS: PeriodTimeSlot[] = [
  { periodNo: 1, label: "Period 1", startTime: "08:05", endTime: "08:55" },
  { periodNo: 2, label: "Period 2", startTime: "08:55", endTime: "09:45" },
  // FN Break: 09:45 - 10:00
  { periodNo: 3, label: "Period 3", startTime: "10:00", endTime: "10:50" },
  { periodNo: 4, label: "Period 4", startTime: "10:50", endTime: "11:40" },
  // Lunch Break: 11:40 - 12:20
  { periodNo: 5, label: "Period 5", startTime: "12:20", endTime: "01:05" },
  { periodNo: 6, label: "Period 6", startTime: "01:05", endTime: "01:50" },
  // AN Break: 01:50 - 02:00
  { periodNo: 7, label: "Period 7", startTime: "02:00", endTime: "02:45" },
  { periodNo: 8, label: "Period 8", startTime: "02:45", endTime: "03:30" },
];

export interface SubjectFacultyEntry {
  code: string;
  name: string;
  shortName: string;
  l: number;
  t: number;
  p: number;
  c: number;
  totalHours: number;
  facultyName: string;
  department: string;
}

export interface DayPeriodAssignment {
  periodNo: number;
  timeSlot: string;
  subjectCode: string;
  subjectName: string;
  shortCode: string;
  faculty: string;
  room: string;
  isLab?: boolean;
}

export interface SectionTimetableData {
  id: string;
  year: string;
  semester: string;
  semesterNum: number;
  section: string;
  roomNo: string;
  regulation: string;
  batch: string;
  academicYear: string;
  classIncharge: string;
  mentors: string[];
  subjects: SubjectFacultyEntry[];
  schedule: Record<string, DayPeriodAssignment[]>;
}

export const OFFICIAL_TIMETABLES: SectionTimetableData[] = [
  // ==========================================
  // 1. YEAR II / SEM III / SECTION A (Page 1)
  // ==========================================
  {
    id: "CSE-2-A",
    year: "Year II",
    semester: "Semester III",
    semesterNum: 3,
    section: "A",
    roomNo: "N 201",
    regulation: "Regulation 2023",
    batch: "2025-2029",
    academicYear: "July 2026 - November 2026",
    classIncharge: "Mr. R. Prabhakaran",
    mentors: ["Mr. R. Prabhakaran", "Mr. S. Vinod", "Ms. C.H. Yerakkamma"],
    subjects: [
      { code: "231MA302", name: "Probability and Queuing Theory (Lab Integrated)", shortName: "PQT", l: 2, t: 0, p: 2, c: 3, totalHours: 5, facultyName: "Dr. Mattuvarkuzhali", department: "MATHS" },
      { code: "231CS323", name: "Object Oriented Programming", shortName: "OOPS", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Mr. R. Prabhakaran", department: "CSE" },
      { code: "231CS321", name: "Data Structures", shortName: "DS", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. A. Vinothini", department: "CSE" },
      { code: "231CS322", name: "Digital Principles and Computer Organization (Lab Integrated)", shortName: "DP&CO", l: 3, t: 0, p: 2, c: 4, totalHours: 6, facultyName: "Ms. R. Kokilapriya", department: "ECE" },
      { code: "231CS325", name: "Software Engineering (Lab Integrated)", shortName: "SE", l: 3, t: 0, p: 2, c: 4, totalHours: 6, facultyName: "Ms. S. Alfiya", department: "CSE" },
      { code: "231CS324", name: "Operating Systems", shortName: "OS", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Mr. C. Pandi", department: "CSE" },
      { code: "231CS32A", name: "Data Structures and Algorithms Laboratory", shortName: "DS LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Ms. A. Vinothini", department: "CSE" },
      { code: "231CS32B", name: "Object Oriented Programming Laboratory", shortName: "OOPS LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Mr. R. Prabhakaran", department: "CSE" },
      { code: "231CS32C", name: "Operating Systems Laboratory", shortName: "OS LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Mr. C. Pandi", department: "CSE" },
      { code: "SPORTS", name: "Sports & Physical Education", shortName: "SPORTS", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Mr. Sathish Kumar", department: "CSE" },
      { code: "LIBRARY", name: "Library & Self Learning", shortName: "LIB", l: 0, t: 0, p: 0, c: 0, totalHours: 1, facultyName: "Mr. R. Prabhakaran", department: "CSE" },
      { code: "PPT", name: "Placement & Personality Training", shortName: "PPT", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Placement Trainer", department: "CSE" },
    ],
    schedule: {
      Monday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Ms. A. Vinothini", room: "BAY 3", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Ms. A. Vinothini", room: "BAY 3", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Mr. R. Prabhakaran", room: "N 201" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. S. Alfiya", room: "N 201" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS325", subjectName: "SE LAB", shortCode: "SE LAB", faculty: "Ms. S. Alfiya", room: "BAY 3", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS325", subjectName: "SE LAB", shortCode: "SE LAB", faculty: "Ms. S. Alfiya", room: "BAY 3", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Ms. R. Kokilapriya", room: "N 201" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Mr. C. Pandi", room: "N 201" },
      ],
      Tuesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Ms. A. Vinothini", room: "N 201" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Mr. R. Prabhakaran", room: "N 201" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Ms. A. Vinothini", room: "BAY 3", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Ms. A. Vinothini", room: "BAY 3", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231MA302", subjectName: "Probability and Queuing Theory", shortCode: "PQT", faculty: "Dr. Mattuvarkuzhali", room: "N 201" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "LIBRARY", subjectName: "Library", shortCode: "LIB", faculty: "Mr. R. Prabhakaran", room: "Library" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Mr. C. Pandi", room: "N 201" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. S. Alfiya", room: "N 201" },
      ],
      Wednesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231MA302", subjectName: "Probability and Queuing Theory", shortCode: "PQT", faculty: "Dr. Mattuvarkuzhali", room: "N 201" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Mr. R. Prabhakaran", room: "N 201" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Ms. R. Kokilapriya", room: "N 201" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. S. Alfiya", room: "N 201" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS32C", subjectName: "OS/OOPS LAB", shortCode: "OS/OOPS LAB", faculty: "Mr. C. Pandi", room: "BAY 3", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS32C", subjectName: "OS/OOPS LAB", shortCode: "OS/OOPS LAB", faculty: "Mr. C. Pandi", room: "BAY 3", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. Sathish Kumar", room: "Ground" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. Sathish Kumar", room: "Ground" },
      ],
      Thursday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 201" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 201" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. S. Alfiya", room: "N 201" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Mr. R. Prabhakaran", room: "N 201" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Ms. A. Vinothini", room: "N 201" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Ms. R. Kokilapriya", room: "N 201" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231MA302", subjectName: "Probability and Queuing Theory", shortCode: "PQT", faculty: "Dr. Mattuvarkuzhali", room: "N 201" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Mr. C. Pandi", room: "N 201" },
      ],
      Friday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Ms. R. Kokilapriya", room: "N 201" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Ms. A. Vinothini", room: "N 201" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS32C", subjectName: "OS/OOPS LAB", shortCode: "OS/OOPS LAB", faculty: "Mr. C. Pandi", room: "BAY 3", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS32C", subjectName: "OS/OOPS LAB", shortCode: "OS/OOPS LAB", faculty: "Mr. C. Pandi", room: "BAY 3", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Mr. C. Pandi", room: "N 201" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Ms. A. Vinothini", room: "N 201" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231MA302", subjectName: "PQT LAB", shortCode: "PQT LAB", faculty: "Dr. Mattuvarkuzhali", room: "BAY 4", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231MA302", subjectName: "PQT LAB", shortCode: "PQT LAB", faculty: "Dr. Mattuvarkuzhali", room: "BAY 4", isLab: true },
      ],
    },
  },

  // ==========================================
  // 2. YEAR II / SEM III / SECTION B (Page 2)
  // ==========================================
  {
    id: "CSE-2-B",
    year: "Year II",
    semester: "Semester III",
    semesterNum: 3,
    section: "B",
    roomNo: "N 201",
    regulation: "Regulation 2023",
    batch: "2025-2029",
    academicYear: "July 2026 - November 2026",
    classIncharge: "Mrs. V. Divya",
    mentors: ["Ms. P. Selvarathinam", "Mr. V. Nehru", "Ms. D. Parkavi"],
    subjects: [
      { code: "231MA302", name: "Probability and Queuing Theory (Lab Integrated)", shortName: "PQT", l: 2, t: 0, p: 2, c: 3, totalHours: 5, facultyName: "Ms. Anugathi", department: "MATHS" },
      { code: "231CS323", name: "Object Oriented Programming", shortName: "OOPS", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Mr. V. Nehru", department: "CSE" },
      { code: "231CS321", name: "Data Structures", shortName: "DS", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. D. Parkavi", department: "CSE" },
      { code: "231CS322", name: "Digital Principles and Computer Organization (Lab Integrated)", shortName: "DP&CO", l: 3, t: 0, p: 2, c: 4, totalHours: 6, facultyName: "Mr. V. Senthilkumar", department: "CSE" },
      { code: "231CS325", name: "Software Engineering (Lab Integrated)", shortName: "SE", l: 3, t: 0, p: 2, c: 4, totalHours: 6, facultyName: "Ms. V. Divya", department: "CSE" },
      { code: "231CS324", name: "Operating Systems", shortName: "OS", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. Alfiya", department: "CSE" },
      { code: "231CS32A", name: "Data Structures and Algorithms Laboratory", shortName: "DS LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Ms. D. Parkavi", department: "CSE" },
      { code: "231CS32B", name: "Object Oriented Programming Laboratory", shortName: "OOPS LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Ms. P. Selvarathinam", department: "CSE" },
      { code: "231CS32C", name: "Operating Systems Laboratory", shortName: "OS LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Ms. Alfiya", department: "CSE" },
      { code: "SPORTS", name: "Sports", shortName: "SPORTS", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Mr. Sathish Kumar", department: "CSE" },
      { code: "LIBRARY", name: "Library", shortName: "LIB", l: 0, t: 0, p: 0, c: 0, totalHours: 1, facultyName: "Ms. Alfiya", department: "CSE" },
      { code: "PPT", name: "Placement Training", shortName: "PPT", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Placement Trainer", department: "CSE" },
    ],
    schedule: {
      Monday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Ms. D. Parkavi", room: "N 201" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Ms. Alfiya", room: "N 201" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231MA302", subjectName: "PQT LAB", shortCode: "PQT LAB", faculty: "Ms. Anugathi", room: "BAY 4", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231MA302", subjectName: "PQT LAB", shortCode: "PQT LAB", faculty: "Ms. Anugathi", room: "BAY 4", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. V. Divya", room: "N 201" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Mr. V. Nehru", room: "N 201" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231MA302", subjectName: "Probability and Queuing Theory", shortCode: "PQT", faculty: "Ms. Anugathi", room: "N 201" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Mr. V. Senthilkumar", room: "N 201" },
      ],
      Tuesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. V. Divya", room: "N 201" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231MA302", subjectName: "Probability and Queuing Theory", shortCode: "PQT", faculty: "Ms. Anugathi", room: "N 201" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS32C", subjectName: "OS/OOPS LAB", shortCode: "OS/OOPS LAB", faculty: "Ms. Alfiya", room: "BAY 4", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS32C", subjectName: "OS/OOPS LAB", shortCode: "OS/OOPS LAB", faculty: "Ms. Alfiya", room: "BAY 4", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Mr. V. Nehru", room: "N 201" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Ms. D. Parkavi", room: "N 201" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS325", subjectName: "SE LAB", shortCode: "SE LAB", faculty: "Ms. V. Divya", room: "BAY 3", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS325", subjectName: "SE LAB", shortCode: "SE LAB", faculty: "Ms. V. Divya", room: "BAY 3", isLab: true },
      ],
      Wednesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Ms. Alfiya", room: "N 201" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231MA302", subjectName: "Probability and Queuing Theory", shortCode: "PQT", faculty: "Ms. Anugathi", room: "N 201" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Mr. V. Senthilkumar", room: "N 201" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Ms. D. Parkavi", room: "N 201" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Ms. D. Parkavi", room: "BAY 4", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Ms. D. Parkavi", room: "BAY 4", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. Sathish Kumar", room: "Ground" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. Sathish Kumar", room: "Ground" },
      ],
      Thursday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 201" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 201" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Mr. V. Nehru", room: "N 201" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Mr. V. Senthilkumar", room: "N 201" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Ms. D. Parkavi", room: "BAY 4", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Ms. D. Parkavi", room: "BAY 4", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Ms. Alfiya", room: "N 201" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. V. Divya", room: "N 201" },
      ],
      Friday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS32C", subjectName: "OS/OOPS LAB", shortCode: "OS/OOPS LAB", faculty: "Ms. Alfiya", room: "BAY 4", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS32C", subjectName: "OS/OOPS LAB", shortCode: "OS/OOPS LAB", faculty: "Ms. Alfiya", room: "BAY 4", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Ms. D. Parkavi", room: "N 201" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "LIBRARY", subjectName: "Library", shortCode: "LIB", faculty: "Ms. Alfiya", room: "Library" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Mr. V. Senthilkumar", room: "N 201" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. V. Divya", room: "N 201" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Ms. Alfiya", room: "N 201" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Mr. V. Nehru", room: "N 201" },
      ],
    },
  },

  // ==========================================
  // 3. YEAR II / SEM III / SECTION C (Page 3)
  // ==========================================
  {
    id: "CSE-2-C",
    year: "Year II",
    semester: "Semester III",
    semesterNum: 3,
    section: "C",
    roomNo: "N 203",
    regulation: "Regulation 2023",
    batch: "2025-2029",
    academicYear: "July 2026 - November 2026",
    classIncharge: "Mr. P. Sathish Kumar",
    mentors: ["Ms. Sandhiya Sree", "Ms. R. Harini", "Ms. J. Bebitha"],
    subjects: [
      { code: "231MA302", name: "Probability and Queuing Theory (Lab Integrated)", shortName: "PQT", l: 2, t: 0, p: 2, c: 3, totalHours: 5, facultyName: "Dr. T. Mary Shalin", department: "MATHS" },
      { code: "231CS323", name: "Object Oriented Programming with Java", shortName: "OOPS", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. R. Harini", department: "CSE" },
      { code: "231CS321", name: "Data Structures", shortName: "DS", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Dr. E. Mercy Beulah", department: "CSE" },
      { code: "231CS322", name: "Digital Principles and Computer Organization (Lab Integrated)", shortName: "DP&CO", l: 3, t: 0, p: 2, c: 4, totalHours: 6, facultyName: "Mr. P. Sathish Kumar", department: "ECE" },
      { code: "231CS325", name: "Software Engineering (Lab Integrated)", shortName: "SE", l: 3, t: 0, p: 2, c: 4, totalHours: 6, facultyName: "Ms. D. Parkavi", department: "CSE" },
      { code: "231CS324", name: "Operating Systems", shortName: "OS", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. J. Bebitha", department: "CSE" },
      { code: "231CS32A", name: "Data Structures and Algorithms Laboratory", shortName: "DS LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Dr. E. Mercy Beulah", department: "CSE" },
      { code: "231CS32B", name: "Object Oriented Programming with Java Laboratory", shortName: "OOPS LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Ms. Sandhiya Sree", department: "CSE" },
      { code: "231CS32C", name: "Operating Systems Laboratory", shortName: "OS LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Ms. J. Bebitha", department: "CSE" },
      { code: "SPORTS", name: "Sports", shortName: "SPORTS", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Mr. Sathish Kumar", department: "CSE" },
      { code: "LIBRARY", name: "Library", shortName: "LIB", l: 0, t: 0, p: 0, c: 0, totalHours: 1, facultyName: "Ms. Sandhiya Sree", department: "CSE" },
      { code: "PPT", name: "Placement Training", shortName: "PPT", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Placement Trainer", department: "CSE" },
    ],
    schedule: {
      Monday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Dr. E. Mercy Beulah", room: "N 203" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Mr. P. Sathish Kumar", room: "N 203" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. D. Parkavi", room: "N 203" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Ms. J. Bebitha", room: "N 203" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Dr. E. Mercy Beulah", room: "BAY 4", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Dr. E. Mercy Beulah", room: "BAY 4", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS325", subjectName: "SE LAB", shortCode: "SE LAB", faculty: "Ms. D. Parkavi", room: "BAY 4", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS325", subjectName: "SE LAB", shortCode: "SE LAB", faculty: "Ms. D. Parkavi", room: "BAY 4", isLab: true },
      ],
      Tuesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS32B", subjectName: "OOPS/OS LAB", shortCode: "OOPS/OS LAB", faculty: "Ms. Sandhiya Sree", room: "BAY 3", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS32B", subjectName: "OOPS/OS LAB", shortCode: "OOPS/OS LAB", faculty: "Ms. Sandhiya Sree", room: "BAY 3", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Dr. E. Mercy Beulah", room: "N 203" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Mr. P. Sathish Kumar", room: "N 203" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231MA302", subjectName: "Probability and Queuing Theory", shortCode: "PQT", faculty: "Dr. T. Mary Shalin", room: "N 203" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Ms. R. Harini", room: "N 203" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Dr. E. Mercy Beulah", room: "BAY 4", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS32A", subjectName: "DS/DPCO LAB", shortCode: "DS/DPCO LAB", faculty: "Dr. E. Mercy Beulah", room: "BAY 4", isLab: true },
      ],
      Wednesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Ms. J. Bebitha", room: "N 203" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. D. Parkavi", room: "N 203" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Ms. R. Harini", room: "N 203" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "LIBRARY", subjectName: "Library", shortCode: "LIB", faculty: "Ms. Sandhiya Sree", room: "Library" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Dr. E. Mercy Beulah", room: "N 203" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Mr. P. Sathish Kumar", room: "N 203" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. Sathish Kumar", room: "Ground" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. Sathish Kumar", room: "Ground" },
      ],
      Thursday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Ms. R. Harini", room: "N 203" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231MA302", subjectName: "Probability and Queuing Theory", shortCode: "PQT", faculty: "Dr. T. Mary Shalin", room: "N 203" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Ms. J. Bebitha", room: "N 203" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. D. Parkavi", room: "N 203" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS32B", subjectName: "OOPS/OS LAB", shortCode: "OOPS/OS LAB", faculty: "Ms. Sandhiya Sree", room: "BAY 3", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS32B", subjectName: "OOPS/OS LAB", shortCode: "OOPS/OS LAB", faculty: "Ms. Sandhiya Sree", room: "BAY 3", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 203" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 203" },
      ],
      Friday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS325", subjectName: "Software Engineering", shortCode: "SE", faculty: "Ms. D. Parkavi", room: "N 203" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS322", subjectName: "Digital Principles & Computer Org", shortCode: "DPCO", faculty: "Mr. P. Sathish Kumar", room: "N 203" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231MA302", subjectName: "PQT LAB RL", shortCode: "PQT LAB RL", faculty: "Dr. T. Mary Shalin", room: "RL", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231MA302", subjectName: "PQT LAB RL", shortCode: "PQT LAB RL", faculty: "Dr. T. Mary Shalin", room: "RL", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS321", subjectName: "Data Structures", shortCode: "DS", faculty: "Dr. E. Mercy Beulah", room: "N 203" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231MA302", subjectName: "Probability and Queuing Theory", shortCode: "PQT", faculty: "Dr. T. Mary Shalin", room: "N 203" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS324", subjectName: "Operating Systems", shortCode: "OS", faculty: "Ms. J. Bebitha", room: "N 203" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS323", subjectName: "Object Oriented Programming", shortCode: "OOPS", faculty: "Ms. R. Harini", room: "N 203" },
      ],
    },
  },

  // ==========================================
  // 4. YEAR III / SEM V / SECTION A (Page 4)
  // ==========================================
  {
    id: "CSE-3-A",
    year: "Year III",
    semester: "Semester V",
    semesterNum: 5,
    section: "A",
    roomNo: "N 204",
    regulation: "Regulation 2023",
    batch: "2024-2028",
    academicYear: "July 2026 - November 2026",
    classIncharge: "Mrs. Vijayashanthi",
    mentors: ["Mrs. M. Aswin Rani", "Mr. P. Sathishkumar", "Mr. N. Insozhan"],
    subjects: [
      { code: "231IT521", name: "Artificial Intelligence and Machine Learning - Lab Integrated", shortName: "AI&ML", l: 3, t: 0, p: 2, c: 4, totalHours: 5, facultyName: "Mr. R. Harini", department: "CSE" },
      { code: "231CS521", name: "Compiler Design", shortName: "CD", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. V. Vijayashanthi", department: "CSE" },
      { code: "231CS522", name: "Embedded Systems and IoT", shortName: "ES&IOT", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Mr. V. Nehru", department: "CSE" },
      { code: "PE-1", name: "Professional Elective - I (Ethical Hacking / Web App Sec / Social Net Sec)", shortName: "PE-1", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Mr. P. Karthick / Ms. S. Vaitheeswari / Ms. K. Dhanalakshmi", department: "CSE" },
      { code: "PE-2", name: "Program Elective - II (Software Testing / Entrepreneurship / Knowledge Engg)", shortName: "PE-2", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Mr. N. Insozhan / Mr. R. Prabhakaran / Mr. P. Karthick", department: "CSE" },
      { code: "OE-1", name: "Open Elective - I (Industrial IoT / Image Processing / Computer Vision)", shortName: "OE-1", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. V. Lavanya / Dr. K. Muthukannan / Ms. P. Selvarathinam", department: "ECE/CSE" },
      { code: "231CS52A", name: "Compiler Design Laboratory", shortName: "CD LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Ms. V. Vijayashanthi", department: "CSE" },
      { code: "231CS52B", name: "Embedded Systems and IoT Laboratory", shortName: "ES&IOT LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Mr. V. Nehru", department: "CSE" },
      { code: "231MC56A", name: "Standards for Engineering", shortName: "Seminar", l: 1, t: 0, p: 0, c: 1, totalHours: 2, facultyName: "Dr. Victor Jose", department: "CSE" },
      { code: "SPORTS", name: "Sports", shortName: "SPORTS", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Mr. V. Nehru", department: "CSE" },
      { code: "LIBRARY", name: "Library", shortName: "LIB", l: 0, t: 0, p: 0, c: 0, totalHours: 1, facultyName: "Ms. V. Vijayashanthi", department: "CSE" },
      { code: "PPT", name: "Placement Training", shortName: "PPT", l: 0, t: 0, p: 0, c: 0, totalHours: 4, facultyName: "Placement Trainer", department: "CSE" },
    ],
    schedule: {
      Monday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231IT521", subjectName: "AI and Machine Learning", shortCode: "AI&ML", faculty: "Mr. R. Harini", room: "N 204" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. V. Vijayashanthi", room: "N 204" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS52B", subjectName: "ES&IOT/CD LAB", shortCode: "ES&IOT/CD LAB", faculty: "Mr. V. Nehru", room: "BAY 4", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS52B", subjectName: "ES&IOT/CD LAB", shortCode: "ES&IOT/CD LAB", faculty: "Mr. V. Nehru", room: "BAY 4", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-2", subjectName: "Program Elective - II", shortCode: "PE-II", faculty: "Elective Faculty", room: "N 204" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "OE-1", subjectName: "Open Elective - I", shortCode: "OE-1", faculty: "Elective Faculty", room: "N 204" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231MC56A", subjectName: "Standards for Engineering", shortCode: "Seminar", faculty: "Dr. Victor Jose", room: "N 204" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231MC56A", subjectName: "Standards for Engineering", shortCode: "Seminar", faculty: "Dr. Victor Jose", room: "N 204" },
      ],
      Tuesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-1", subjectName: "Professional Elective - I", shortCode: "PE-I", faculty: "Elective Faculty", room: "N 204" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ES&IOT", faculty: "Mr. V. Nehru", room: "N 204" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 204" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 204" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-1", subjectName: "PE-I LAB", shortCode: "PE-I LAB", faculty: "Elective Faculty", room: "BAY 4", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "PE-1", subjectName: "PE-I LAB", shortCode: "PE-I LAB", faculty: "Elective Faculty", room: "BAY 4", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PE-2", subjectName: "Program Elective - II", shortCode: "PE-II", faculty: "Elective Faculty", room: "N 204" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. V. Vijayashanthi", room: "N 204" },
      ],
      Wednesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS52B", subjectName: "ES&IOT/CD LAB", shortCode: "ES&IOT/CD LAB", faculty: "Mr. V. Nehru", room: "BAY 4", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS52B", subjectName: "ES&IOT/CD LAB", shortCode: "ES&IOT/CD LAB", faculty: "Mr. V. Nehru", room: "BAY 4", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-1", subjectName: "Open Elective - I", shortCode: "OE-1", faculty: "Elective Faculty", room: "N 204" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ES&IOT", faculty: "Mr. V. Nehru", room: "N 204" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "LIBRARY", subjectName: "Library", shortCode: "LIB", faculty: "Ms. V. Vijayashanthi", room: "Library" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231IT521", subjectName: "AI and Machine Learning", shortCode: "AI&ML", faculty: "Mr. R. Harini", room: "N 204" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. V. Nehru", room: "Ground" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. V. Nehru", room: "Ground" },
      ],
      Thursday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 204" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 204" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-1", subjectName: "OE-1 LAB", shortCode: "OE-1 LAB", faculty: "Elective Faculty", room: "Lab", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "OE-1", subjectName: "OE-1 LAB", shortCode: "OE-1 LAB", faculty: "Elective Faculty", room: "Lab", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-1", subjectName: "Professional Elective - I", shortCode: "PE-I", faculty: "Elective Faculty", room: "N 204" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ES&IOT", faculty: "Mr. V. Nehru", room: "N 204" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PE-2", subjectName: "PE-II LAB", shortCode: "PE-II LAB", faculty: "Elective Faculty", room: "BAY 4", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "PE-2", subjectName: "PE-II LAB", shortCode: "PE-II LAB", faculty: "Elective Faculty", room: "BAY 4", isLab: true },
      ],
      Friday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-2", subjectName: "Program Elective - II", shortCode: "PE-II", faculty: "Elective Faculty", room: "N 204" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. V. Vijayashanthi", room: "N 204" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231IT521", subjectName: "AI and Machine Learning", shortCode: "AIML", faculty: "Mr. R. Harini", room: "N 204" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ES&IOT", faculty: "Mr. V. Nehru", room: "N 204" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231IT521", subjectName: "AI&ML LAB", shortCode: "AI&ML LAB", faculty: "Mr. R. Harini", room: "BAY 4", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231IT521", subjectName: "AI&ML LAB", shortCode: "AI&ML LAB", faculty: "Mr. R. Harini", room: "BAY 4", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PE-1", subjectName: "Professional Elective - I", shortCode: "PE-I", faculty: "Elective Faculty", room: "N 204" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. V. Vijayashanthi", room: "N 204" },
      ],
    },
  },

  // ==========================================
  // 5. YEAR III / SEM V / SECTION B (Page 5)
  // ==========================================
  {
    id: "CSE-3-B",
    year: "Year III",
    semester: "Semester V",
    semesterNum: 5,
    section: "B",
    roomNo: "N 205",
    regulation: "Regulation 2023",
    batch: "2024-2028",
    academicYear: "July 2026 - November 2026",
    classIncharge: "Mrs. R. Chandra",
    mentors: ["Mrs. K. Dhanalakshmi", "Mrs. R. Chandra", "Dr. K. Muthukannan"],
    subjects: [
      { code: "231IT521", name: "Artificial Intelligence and Machine Learning - Lab Integrated", shortName: "AI&ML", l: 3, t: 0, p: 2, c: 4, totalHours: 5, facultyName: "Dr. K. Muthukannan", department: "CSE" },
      { code: "231CS521", name: "Compiler Design", shortName: "CD", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. R. Chandra", department: "CSE" },
      { code: "231CS522", name: "Embedded Systems and IoT", shortName: "ES&IOT", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. M. Aswin Rani", department: "CSE" },
      { code: "PE-1", name: "Professional Elective - I (Ethical Hacking / Web App Sec / Social Net Sec)", shortName: "PE-1", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Mr. P. Karthick / Ms. S. Vaitheeswari / Ms. K. Dhanalakshmi", department: "CSE" },
      { code: "PE-2", name: "Program Elective - II (Software Testing / Entrepreneurship / Knowledge Engg)", shortName: "PE-2", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Mr. N. Insozhan / Mr. R. Prabhakaran / Mr. P. Karthick", department: "CSE" },
      { code: "OE-1", name: "Open Elective - I (Industrial IoT / Image Processing / Computer Vision)", shortName: "OE-1", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. V. Lavanya / Dr. K. Muthukannan / Ms. P. Selvarathinam", department: "ECE/CSE" },
      { code: "231CS52A", name: "Compiler Design Laboratory", shortName: "CD LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Ms. Chandra", department: "CSE" },
      { code: "231CS52B", name: "Embedded Systems and IoT Laboratory", shortName: "ES&IOT LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Ms. M. Aswin Rani", department: "CSE" },
      { code: "231MC56A", name: "Standards for Engineering", shortName: "Seminar", l: 1, t: 0, p: 0, c: 1, totalHours: 2, facultyName: "Dr. K. Muthukannan", department: "CSE" },
      { code: "SPORTS", name: "Sports", shortName: "SPORTS", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Mr. V. Nehru", department: "CSE" },
      { code: "LIBRARY", name: "Library", shortName: "LIB", l: 0, t: 0, p: 0, c: 0, totalHours: 1, facultyName: "Ms. Chandra", department: "CSE" },
      { code: "PPT", name: "Placement Training", shortName: "PPT", l: 0, t: 0, p: 0, c: 0, totalHours: 4, facultyName: "Placement Trainer", department: "CSE" },
    ],
    schedule: {
      Monday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231IT521", subjectName: "AI&ML LAB", shortCode: "AI&ML LAB", faculty: "Dr. K. Muthukannan", room: "RLAB", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231IT521", subjectName: "AI&ML LAB", shortCode: "AI&ML LAB", faculty: "Dr. K. Muthukannan", room: "RLAB", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "LIBRARY", subjectName: "Library", shortCode: "LIB", faculty: "Ms. Chandra", room: "Library" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ES&IOT", faculty: "Ms. M. Aswin Rani", room: "N 205" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-2", subjectName: "Program Elective - II", shortCode: "PE-II", faculty: "Elective Faculty", room: "N 205" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "OE-1", subjectName: "Open Elective - I", shortCode: "OE-1", faculty: "Elective Faculty", room: "N 205" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS52B", subjectName: "ES&IOT/CD LAB", shortCode: "ES&IOT/CD LAB", faculty: "Ms. M. Aswin Rani", room: "R Lab", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS52B", subjectName: "ES&IOT/CD LAB", shortCode: "ES&IOT/CD LAB", faculty: "Ms. M. Aswin Rani", room: "R Lab", isLab: true },
      ],
      Tuesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-1", subjectName: "Professional Elective - I", shortCode: "PE-I", faculty: "Elective Faculty", room: "N 205" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ES&IOT", faculty: "Ms. M. Aswin Rani", room: "N 205" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 205" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 205" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-1", subjectName: "PE-I LAB", shortCode: "PE-I LAB", faculty: "Elective Faculty", room: "Bay 3", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "PE-1", subjectName: "PE-I LAB", shortCode: "PE-I LAB", faculty: "Elective Faculty", room: "Bay 3", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PE-2", subjectName: "Program Elective - II", shortCode: "PE-II", faculty: "Elective Faculty", room: "N 205" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231IT521", subjectName: "AI and Machine Learning", shortCode: "AI&ML", faculty: "Dr. K. Muthukannan", room: "N 205" },
      ],
      Wednesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231IT521", subjectName: "AI and Machine Learning", shortCode: "AI&ML", faculty: "Dr. K. Muthukannan", room: "N 205" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ES&IOT", faculty: "Ms. M. Aswin Rani", room: "N 205" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-1", subjectName: "Open Elective - I", shortCode: "OE-1", faculty: "Elective Faculty", room: "N 205" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ES&IOT", faculty: "Ms. M. Aswin Rani", room: "N 205" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. R. Chandra", room: "N 205" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231IT521", subjectName: "AI and Machine Learning", shortCode: "AI&ML", faculty: "Dr. K. Muthukannan", room: "N 205" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. V. Nehru", room: "Ground" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. V. Nehru", room: "Ground" },
      ],
      Thursday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 205" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 205" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-1", subjectName: "OE-I LAB", shortCode: "OE-I LAB", faculty: "Elective Faculty", room: "Lab", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "OE-1", subjectName: "OE-I LAB", shortCode: "OE-I LAB", faculty: "Elective Faculty", room: "Lab", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-1", subjectName: "Professional Elective - I", shortCode: "PE-I", faculty: "Elective Faculty", room: "N 205" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. R. Chandra", room: "N 205" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PE-2", subjectName: "PE-II LAB", shortCode: "PE-II LAB", faculty: "Elective Faculty", room: "Bay 3", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "PE-2", subjectName: "PE-II LAB", shortCode: "PE-II LAB", faculty: "Elective Faculty", room: "Bay 3", isLab: true },
      ],
      Friday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-2", subjectName: "Program Elective - II", shortCode: "PE-II", faculty: "Elective Faculty", room: "N 205" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. R. Chandra", room: "N 205" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231MC56A", subjectName: "Standards for Engineering", shortCode: "SEMINAR", faculty: "Dr. K. Muthukannan", room: "N 205" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231MC56A", subjectName: "Standards for Engineering", shortCode: "SEMINAR", faculty: "Dr. K. Muthukannan", room: "N 205" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231CS52B", subjectName: "ES&IOT/CD LAB", shortCode: "ES&IOT/CD LAB", faculty: "Ms. M. Aswin Rani", room: "Bay 3", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS52B", subjectName: "ES&IOT/CD LAB", shortCode: "ES&IOT/CD LAB", faculty: "Ms. M. Aswin Rani", room: "Bay 3", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PE-1", subjectName: "Professional Elective - I", shortCode: "PE-I", faculty: "Elective Faculty", room: "N 205" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. R. Chandra", room: "N 205" },
      ],
    },
  },

  // ==========================================
  // 6. YEAR III / SEM V / SECTION C (Page 6)
  // ==========================================
  {
    id: "CSE-3-C",
    year: "Year III",
    semester: "Semester V",
    semesterNum: 5,
    section: "C",
    roomNo: "N 206",
    regulation: "Regulation 2023",
    batch: "2024-2028",
    academicYear: "July 2026 - November 2026",
    classIncharge: "Mrs. D. Parkavi",
    mentors: ["Mrs. M.K. Geetha", "Mrs. Lavanya V", "Mrs. R. Kokila Priya"],
    subjects: [
      { code: "231IT521", name: "Artificial Intelligence and Machine Learning - Lab Integrated", shortName: "AI&ML", l: 3, t: 0, p: 2, c: 4, totalHours: 5, facultyName: "Ms. R. Kokila Priya", department: "CSE" },
      { code: "231CS521", name: "Compiler Design", shortName: "CD", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. V. Divya", department: "CSE" },
      { code: "231CS522", name: "Embedded Systems and IoT", shortName: "ES&IOT", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Dr. R. Saravanan", department: "CSE" },
      { code: "PE-1", name: "Professional Elective - I (Ethical Hacking / Web App Sec / Social Net Sec)", shortName: "PE-1", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Mr. P. Karthick / Ms. S. Vaitheeswari / Ms. K. Dhanalakshmi", department: "CSE" },
      { code: "PE-2", name: "Program Elective - II (Software Testing / Entrepreneurship / Knowledge Engg)", shortName: "PE-2", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Mr. N. Insozhan / Mr. R. Prabhakaran / Mr. P. Karthick", department: "CSE" },
      { code: "OE-1", name: "Open Elective - I (Industrial IoT / Image Processing / Computer Vision)", shortName: "OE-1", l: 3, t: 0, p: 0, c: 3, totalHours: 4, facultyName: "Ms. V. Lavanya / Dr. K. Muthukannan / Ms. P. Selvarathinam", department: "ECE/CSE" },
      { code: "231CS52A", name: "Compiler Design Laboratory", shortName: "CD LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Ms. V. Divya", department: "CSE" },
      { code: "231CS52B", name: "Embedded Systems and IoT Laboratory", shortName: "ES&IOT LAB", l: 0, t: 0, p: 2, c: 1, totalHours: 2, facultyName: "Mrs. Chandra", department: "CSE" },
      { code: "231MC56A", name: "Standards for Engineering", shortName: "Seminar", l: 1, t: 0, p: 0, c: 1, totalHours: 2, facultyName: "Mr. P. Karthick", department: "CSE" },
      { code: "SPORTS", name: "Sports", shortName: "SPORTS", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Mr. Nehru", department: "CSE" },
      { code: "LIBRARY", name: "Library", shortName: "LIB", l: 0, t: 0, p: 0, c: 0, totalHours: 1, facultyName: "Ms. R. Kokila Priya", department: "CSE" },
      { code: "PPT", name: "Placement Training", shortName: "PPT", l: 0, t: 0, p: 0, c: 0, totalHours: 4, facultyName: "Placement Trainer", department: "CSE" },
    ],
    schedule: {
      Monday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS52B", subjectName: "CD/ES&IOT LAB", shortCode: "CD/ES&IOT LAB", faculty: "Ms. V. Divya", room: "BAY 4", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS52B", subjectName: "CD/ES&IOT LAB", shortCode: "CD/ES&IOT LAB", faculty: "Ms. V. Divya", room: "BAY 4", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231IT521", subjectName: "AI and Machine Learning", shortCode: "AIML", faculty: "Ms. R. Kokila Priya", room: "N 206" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ESIOT", faculty: "Dr. R. Saravanan", room: "N 206" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-2", subjectName: "Program Elective - II", shortCode: "PE-II", faculty: "Elective Faculty", room: "N 206" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "OE-1", subjectName: "Open Elective - I", shortCode: "OE-1", faculty: "Elective Faculty", room: "N 206" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. V. Divya", room: "N 206" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "LIBRARY", subjectName: "Library", shortCode: "LIB", faculty: "Ms. R. Kokila Priya", room: "Library" },
      ],
      Tuesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-1", subjectName: "Professional Elective - I", shortCode: "PE-I", faculty: "Elective Faculty", room: "N 206" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ESIOT", faculty: "Dr. R. Saravanan", room: "N 206" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 206" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 206" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-1", subjectName: "PE-I LAB", shortCode: "PE-I LAB", faculty: "Elective Faculty", room: "R Lab", isLab: true },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "PE-1", subjectName: "PE-I LAB", shortCode: "PE-I LAB", faculty: "Elective Faculty", room: "R Lab", isLab: true },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PE-2", subjectName: "Program Elective - II", shortCode: "PE-II", faculty: "Elective Faculty", room: "N 206" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231IT521", subjectName: "AI and Machine Learning", shortCode: "AI&ML", faculty: "Ms. R. Kokila Priya", room: "N 206" },
      ],
      Wednesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231IT521", subjectName: "AI&ML LAB", shortCode: "AI&ML LAB", faculty: "Ms. R. Kokila Priya", room: "BAY 3", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231IT521", subjectName: "AI&ML LAB", shortCode: "AI&ML LAB", faculty: "Ms. R. Kokila Priya", room: "BAY 3", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-1", subjectName: "Open Elective - I", shortCode: "OE-1", faculty: "Elective Faculty", room: "N 206" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. V. Divya", room: "N 206" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231IT521", subjectName: "AI and Machine Learning", shortCode: "AIML", faculty: "Ms. R. Kokila Priya", room: "N 206" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. V. Divya", room: "N 206" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. Nehru", room: "Ground" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. Nehru", room: "Ground" },
      ],
      Thursday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 206" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "N 206" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-1", subjectName: "OE-I LAB", shortCode: "OE-I LAB", faculty: "Elective Faculty", room: "Lab", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "OE-1", subjectName: "OE-I LAB", shortCode: "OE-I LAB", faculty: "Elective Faculty", room: "Lab", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-1", subjectName: "Professional Elective - I", shortCode: "PE-I", faculty: "Elective Faculty", room: "N 206" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ESIOT", faculty: "Dr. R. Saravanan", room: "N 206" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PE-2", subjectName: "PE-II LAB", shortCode: "PE-II LAB", faculty: "Elective Faculty", room: "R Lab", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "PE-2", subjectName: "PE-II LAB", shortCode: "PE-II LAB", faculty: "Elective Faculty", room: "R Lab", isLab: true },
      ],
      Friday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-2", subjectName: "Program Elective - II", shortCode: "PE-II", faculty: "Elective Faculty", room: "N 206" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS522", subjectName: "Embedded Systems and IoT", shortCode: "ESIOT", faculty: "Dr. R. Saravanan", room: "N 206" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "231CS52B", subjectName: "CD/ES&IOT LAB", shortCode: "CD/ES&IOT LAB", faculty: "Ms. V. Divya", room: "BAY 4", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CS52B", subjectName: "CD/ES&IOT LAB", shortCode: "CD/ES&IOT LAB", faculty: "Ms. V. Divya", room: "BAY 4", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "231MC56A", subjectName: "Standards for Engineering", shortCode: "SEMINAR", faculty: "Mr. P. Karthick", room: "N 206" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231MC56A", subjectName: "Standards for Engineering", shortCode: "SEMINAR", faculty: "Mr. P. Karthick", room: "N 206" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PE-1", subjectName: "Professional Elective - I", shortCode: "PE-I", faculty: "Elective Faculty", room: "N 206" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS521", subjectName: "Compiler Design", shortCode: "CD", faculty: "Ms. V. Divya", room: "N 206" },
      ],
    },
  },

  // ==========================================
  // 7. YEAR IV / SEM VII / SECTION A (Page 7)
  // ==========================================
  {
    id: "CSE-4-A",
    year: "Year IV",
    semester: "Semester VII",
    semesterNum: 7,
    section: "A",
    roomNo: "I 305",
    regulation: "Regulation 2023",
    batch: "2023-2027",
    academicYear: "July 2026 - November 2026",
    classIncharge: "Mrs. A. Vinothini",
    mentors: ["Mr. P. Karthick", "Mrs. V. Vijayashanthi", "Mrs. A. Vinothini"],
    subjects: [
      { code: "231HS701", name: "Professional Ethics and Human Values", shortName: "PEHV", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. M. Buvana", department: "CSE" },
      { code: "231CB721", name: "Software Project Management", shortName: "SPM", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. B. Swaminathan", department: "CSE" },
      { code: "PE-5", name: "Professional Elective - V (Soft Computing / Cognitive Science / Network Security)", shortName: "PE-5", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Ms. P. Selvarathinam / Ms. M.K. Geetha / Dr. M. Victor Jose", department: "CSE" },
      { code: "PE-6", name: "Professional Elective - VI (AI in Media / Social Text Analytics / Visual Effects)", shortName: "PE-6", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. M. Victor Jose / Ms. S. Vaitheeshwari / Ms. A. Vinothini", department: "CSE" },
      { code: "OE-2", name: "Open Elective - II (AI ML for Electrical Systems / PLC & SCADA)", shortName: "OE-II", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. Vasantharaj S / Mr. Krishnakumar S / Ms. Annapoorani", department: "EEE" },
      { code: "OE-3", name: "Open Elective - III (Wearable Devices / 4G/5G Comm / Satellite Comm)", shortName: "OE-III", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. R. Kalpana / New Staff / Dr. Venkata Subbiah Putta", department: "ECE" },
      { code: "231CS77A", name: "Project Phase - I", shortName: "PROJ", l: 0, t: 0, p: 4, c: 2, totalHours: 4, facultyName: "Dr. M. Buvana", department: "CSE" },
      { code: "SPORTS", name: "Sports", shortName: "SPORTS", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Mr. N. Insozhan", department: "CSE" },
      { code: "LIBRARY", name: "Library", shortName: "LIB", l: 0, t: 0, p: 0, c: 0, totalHours: 1, facultyName: "Ms. M.K. Geetha", department: "CSE" },
      { code: "PPT", name: "Placement Training", shortName: "PPT", l: 0, t: 0, p: 0, c: 0, totalHours: 3, facultyName: "Placement Trainer", department: "CSE" },
    ],
    schedule: {
      Monday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Dr. M. Buvana", room: "I 305" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PE-5", subjectName: "Professional Elective - V", shortCode: "PE-V", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Dr. B. Swaminathan", room: "I 305" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-6", subjectName: "Professional Elective - VI", shortCode: "PE-VI", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Dr. B. Swaminathan", room: "I 305" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "OE-3", subjectName: "OE-III LAB", shortCode: "OE-III LAB", faculty: "Elective Faculty", room: "Bay 3", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "OE-3", subjectName: "OE-III LAB", shortCode: "OE-III LAB", faculty: "Elective Faculty", room: "Bay 3", isLab: true },
      ],
      Tuesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Dr. M. Buvana", room: "Bay 4", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Dr. M. Buvana", room: "Bay 4", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Dr. B. Swaminathan", room: "I 305" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-3", subjectName: "Open Elective - III", shortCode: "OE-III", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Dr. M. Buvana", room: "I 305" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "I 305" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "PE-5", subjectName: "Professional Elective - V", shortCode: "PE-V", faculty: "Elective Faculty", room: "I 305" },
      ],
      Wednesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-6", subjectName: "Professional Elective - VI", shortCode: "PE-VI", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Dr. M. Buvana", room: "I 305" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PE-6", subjectName: "PE-VI LAB", shortCode: "PE-VI LAB", faculty: "Elective Faculty", room: "Bay 4", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "PE-6", subjectName: "PE-VI LAB", shortCode: "PE-VI LAB", faculty: "Elective Faculty", room: "Bay 4", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Dr. M. Buvana", room: "I 305" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. N. Insozhan", room: "Ground" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. N. Insozhan", room: "Ground" },
      ],
      Thursday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-5", subjectName: "PE-V LAB", shortCode: "PE-V LAB", faculty: "Elective Faculty", room: "Bay 3", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "PE-5", subjectName: "PE-V LAB", shortCode: "PE-V LAB", faculty: "Elective Faculty", room: "Bay 3", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PE-6", subjectName: "Professional Elective - VI", shortCode: "PE-VI", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "LIBRARY", subjectName: "Library", shortCode: "LIB", faculty: "Ms. M.K. Geetha", room: "Library" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-3", subjectName: "Open Elective - III", shortCode: "OE-III", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Dr. B. Swaminathan", room: "I 305" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "I 305" },
      ],
      Friday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Dr. M. Buvana", room: "I 305" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "I 305" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-3", subjectName: "Open Elective - III", shortCode: "OE-III", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "PE-5", subjectName: "Professional Elective - V", shortCode: "PE-V", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "I 305" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Dr. B. Swaminathan", room: "I 305" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Dr. M. Buvana", room: "Seminar Hall", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Dr. M. Buvana", room: "Seminar Hall", isLab: true },
      ],
    },
  },

  // ==========================================
  // 8. YEAR IV / SEM VII / SECTION B (Page 8)
  // ==========================================
  {
    id: "CSE-4-B",
    year: "Year IV",
    semester: "Semester VII",
    semesterNum: 7,
    section: "B",
    roomNo: "I 306",
    regulation: "Regulation 2023",
    batch: "2023-2027",
    academicYear: "July 2026 - November 2026",
    classIncharge: "Mrs. J. Bebitha",
    mentors: ["Ms. S. Alfiya", "Mr. C. Pandi", "Mrs. S. Vaitheeswari"],
    subjects: [
      { code: "231HS701", name: "Professional Ethics and Human Values", shortName: "PEHV", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Ms. J. Bebitha", department: "CSE" },
      { code: "231CB721", name: "Software Project Management", shortName: "SPM", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. E. Mercy Beullah", department: "CSE" },
      { code: "PE-5", name: "Professional Elective - V (Soft Computing / Cognitive Science / Network Security)", shortName: "PE-5", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Ms. P. Selvarathinam / Ms. M.K. Geetha / Dr. M. Victor Jose", department: "CSE" },
      { code: "PE-6", name: "Professional Elective - VI (AI in Media / Social Text Analytics / Visual Effects)", shortName: "PE-6", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. M. Victor Jose / Ms. S. Vaitheeshwari / Ms. A. Vinothini", department: "CSE" },
      { code: "OE-2", name: "Open Elective - II (AI ML for Electrical Systems / PLC & SCADA)", shortName: "OE-II", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. Vasantharaj S / Mr. Krishnakumar S / Ms. Annapoorani", department: "EEE" },
      { code: "OE-3", name: "Open Elective - III (Wearable Devices / 4G/5G Comm / Satellite Comm)", shortName: "OE-III", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. R. Kalpana / New Staff / Dr. Venkata Subbiah Putta", department: "ECE" },
      { code: "231CS77A", name: "Project Phase - I", shortName: "PROJ", l: 0, t: 0, p: 4, c: 2, totalHours: 4, facultyName: "Mr. S. Vinod", department: "CSE" },
      { code: "SPORTS", name: "Sports", shortName: "SPORTS", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Mr. N. Insozhan", department: "CSE" },
      { code: "LIBRARY", name: "Library", shortName: "LIB", l: 0, t: 0, p: 0, c: 0, totalHours: 1, facultyName: "Ms. S. Vaitheeshwari", department: "CSE" },
      { code: "PPT", name: "Placement Training", shortName: "PPT", l: 0, t: 0, p: 0, c: 0, totalHours: 3, facultyName: "Placement Trainer", department: "CSE" },
    ],
    schedule: {
      Monday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Ms. J. Bebitha", room: "I 306" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PE-5", subjectName: "Professional Elective - V", shortCode: "PE-V", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Dr. E. Mercy Beullah", room: "I 306" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-6", subjectName: "Professional Elective - VI", shortCode: "PE-VI", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Ms. J. Bebitha", room: "I 306" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "OE-3", subjectName: "OE-III LAB", shortCode: "OE-III LAB", faculty: "Elective Faculty", room: "Class Room", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "OE-3", subjectName: "OE-III LAB", shortCode: "OE-III LAB", faculty: "Elective Faculty", room: "Class Room", isLab: true },
      ],
      Tuesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Mr. S. Vinod", room: "Seminar Hall", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Mr. S. Vinod", room: "Seminar Hall", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Ms. J. Bebitha", room: "I 306" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-3", subjectName: "Open Elective - III", shortCode: "OE-III", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Dr. E. Mercy Beullah", room: "I 306" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "I 306" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "PE-5", subjectName: "Professional Elective - V", shortCode: "PE-V", faculty: "Elective Faculty", room: "I 306" },
      ],
      Wednesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-6", subjectName: "Professional Elective - VI", shortCode: "PE-VI", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Dr. E. Mercy Beullah", room: "I 306" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PE-6", subjectName: "PE-VI LAB", shortCode: "PE-VI LAB", faculty: "Elective Faculty", room: "Bay 3", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "PE-6", subjectName: "PE-VI LAB", shortCode: "PE-VI LAB", faculty: "Elective Faculty", room: "Bay 3", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Ms. J. Bebitha", room: "I 306" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. N. Insozhan", room: "Ground" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. N. Insozhan", room: "Ground" },
      ],
      Thursday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-5", subjectName: "PE-V LAB", shortCode: "PE-V LAB", faculty: "Elective Faculty", room: "Lab", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "PE-5", subjectName: "PE-V LAB", shortCode: "PE-V LAB", faculty: "Elective Faculty", room: "Lab", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PE-6", subjectName: "Professional Elective - VI", shortCode: "PE-VI", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Dr. E. Mercy Beullah", room: "I 306" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-3", subjectName: "Open Elective - III", shortCode: "OE-III", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "I 306" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "LIBRARY", subjectName: "Library", shortCode: "LIB", faculty: "Ms. S. Vaitheeshwari", room: "Library" },
      ],
      Friday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Dr. E. Mercy Beullah", room: "I 306" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "I 306" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-3", subjectName: "Open Elective - III", shortCode: "OE-III", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "PE-5", subjectName: "Professional Elective - V", shortCode: "PE-V", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "I 306" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Ms. J. Bebitha", room: "I 306" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Mr. S. Vinod", room: "Bay 3", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Mr. S. Vinod", room: "Bay 3", isLab: true },
      ],
    },
  },

  // ==========================================
  // 9. YEAR IV / SEM VII / SECTION C (Page 9)
  // ==========================================
  {
    id: "CSE-4-C",
    year: "Year IV",
    semester: "Semester VII",
    semesterNum: 7,
    section: "C",
    roomNo: "J 301",
    regulation: "Regulation 2023",
    batch: "2023-2027",
    academicYear: "July 2026 - November 2026",
    classIncharge: "Mrs. M.K. Geetha",
    mentors: ["Dr. M. Victor Jose", "Dr. Buvana", "Dr. Mercy Beulah", "Mrs. V. Divya"],
    subjects: [
      { code: "231HS701", name: "Professional Ethics and Human Values", shortName: "PEHV", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Ms. M. Aswin Rani", department: "CSE" },
      { code: "231CB721", name: "Software Project Management", shortName: "SPM", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Ms. M.K. Geetha", department: "CSE" },
      { code: "PE-5", name: "Professional Elective - V (Soft Computing / Cognitive Science / Network Security)", shortName: "PE-5", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Ms. P. Selvarathinam / Ms. M.K. Geetha / Dr. M. Victor Jose", department: "CSE" },
      { code: "PE-6", name: "Professional Elective - VI (AI in Media / Social Text Analytics / Visual Effects)", shortName: "PE-6", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. M. Victor Jose / Ms. S. Vaitheeshwari / Ms. A. Vinothini", department: "CSE" },
      { code: "OE-2", name: "Open Elective - II (AI ML for Electrical Systems / PLC & SCADA)", shortName: "OE-II", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. Vasantharaj S / Mr. Krishnakumar S / Ms. Annapoorani", department: "EEE" },
      { code: "OE-3", name: "Open Elective - III (Wearable Devices / 4G/5G Comm / Satellite Comm)", shortName: "OE-III", l: 3, t: 0, p: 0, c: 3, totalHours: 5, facultyName: "Dr. R. Kalpana / New Staff / Dr. Venkata Subbiah Putta", department: "ECE" },
      { code: "231CS77A", name: "Project Phase - I", shortName: "PROJ", l: 0, t: 0, p: 4, c: 2, totalHours: 4, facultyName: "Dr. E. Mercy Beulah", department: "CSE" },
      { code: "SPORTS", name: "Sports", shortName: "SPORTS", l: 0, t: 0, p: 0, c: 0, totalHours: 2, facultyName: "Mr. N. Insozhan", department: "CSE" },
      { code: "LIBRARY", name: "Library", shortName: "LIB", l: 0, t: 0, p: 0, c: 0, totalHours: 1, facultyName: "Ms. P. Selvarathinam", department: "CSE" },
      { code: "PPT", name: "Placement Training", shortName: "PPT", l: 0, t: 0, p: 0, c: 0, totalHours: 3, facultyName: "Placement Trainer", department: "CSE" },
    ],
    schedule: {
      Monday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Ms. M. Aswin Rani", room: "J 301" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PE-5", subjectName: "Professional Elective - V", shortCode: "PE-V", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "J 301" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "PE-6", subjectName: "Professional Elective - VI", shortCode: "PE-VI", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Ms. M.K. Geetha", room: "J 301" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "OE-3", subjectName: "OE-III LAB", shortCode: "OE-III LAB", faculty: "Elective Faculty", room: "Class Room", isLab: true },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "OE-3", subjectName: "OE-III LAB", shortCode: "OE-III LAB", faculty: "Elective Faculty", room: "Class Room", isLab: true },
      ],
      Tuesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Dr. E. Mercy Beulah", room: "Class Room", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Dr. E. Mercy Beulah", room: "Class Room", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Ms. M.K. Geetha", room: "J 301" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-3", subjectName: "Open Elective - III", shortCode: "OE-III", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Ms. M. Aswin Rani", room: "J 301" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "J 301" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "PE-5", subjectName: "Professional Elective - V", shortCode: "PE-V", faculty: "Elective Faculty", room: "J 301" },
      ],
      Wednesday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-6", subjectName: "Professional Elective - VI", shortCode: "PE-VI", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Ms. M.K. Geetha", room: "J 301" },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PE-6", subjectName: "PE-VI LAB", shortCode: "PE-VI LAB", faculty: "Elective Faculty", room: "Research Lab", isLab: true },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "PE-6", subjectName: "PE-VI LAB", shortCode: "PE-VI LAB", faculty: "Elective Faculty", room: "Research Lab", isLab: true },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Ms. M. Aswin Rani", room: "J 301" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. N. Insozhan", room: "Ground" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "SPORTS", subjectName: "Sports", shortCode: "SPORTS", faculty: "Mr. N. Insozhan", room: "Ground" },
      ],
      Thursday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "PE-5", subjectName: "PE-V LAB", shortCode: "PE-V LAB", faculty: "Elective Faculty", room: "Bay 4", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "PE-5", subjectName: "PE-V LAB", shortCode: "PE-V LAB", faculty: "Elective Faculty", room: "Bay 4", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "PE-6", subjectName: "Professional Elective - VI", shortCode: "PE-VI", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Ms. M. Aswin Rani", room: "J 301" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-3", subjectName: "Open Elective - III", shortCode: "OE-III", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Ms. M.K. Geetha", room: "J 301" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "PPT", subjectName: "Placement Training", shortCode: "PPT", faculty: "Placement Trainer", room: "J 301" },
      ],
      Friday: [
        { periodNo: 1, timeSlot: "08:05 - 08:55", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Dr. E. Mercy Beulah", room: "Bay 3 Lab", isLab: true },
        { periodNo: 2, timeSlot: "08:55 - 09:45", subjectCode: "231CS77A", subjectName: "Project Phase - I", shortCode: "PROJECT PHASE - I", faculty: "Dr. E. Mercy Beulah", room: "Bay 3 Lab", isLab: true },
        { periodNo: 3, timeSlot: "10:00 - 10:50", subjectCode: "OE-3", subjectName: "Open Elective - III", shortCode: "OE-III", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 4, timeSlot: "10:50 - 11:40", subjectCode: "PE-5", subjectName: "Professional Elective - V", shortCode: "PE-V", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 5, timeSlot: "12:20 - 01:05", subjectCode: "OE-2", subjectName: "Open Elective - II", shortCode: "OE-II", faculty: "Elective Faculty", room: "J 301" },
        { periodNo: 6, timeSlot: "01:05 - 01:50", subjectCode: "LIBRARY", subjectName: "Library", shortCode: "LIB", faculty: "Ms. P. Selvarathinam", room: "Library" },
        { periodNo: 7, timeSlot: "02:00 - 02:45", subjectCode: "231CB721", subjectName: "Software Project Management", shortCode: "SPM", faculty: "Ms. M.K. Geetha", room: "J 301" },
        { periodNo: 8, timeSlot: "02:45 - 03:30", subjectCode: "231HS701", subjectName: "Professional Ethics & Values", shortCode: "PEHV", faculty: "Ms. M. Aswin Rani", room: "J 301" },
      ],
    },
  },
];

export const YEARS_LIST = [
  { key: "Year II", label: "Year II (Semester III)", batch: "2025-2029", semesterNum: 3 },
  { key: "Year III", label: "Year III (Semester V)", batch: "2024-2028", semesterNum: 5 },
  { key: "Year IV", label: "Year IV (Semester VII)", batch: "2023-2027", semesterNum: 7 },
];

export const SECTIONS_LIST = ["A", "B", "C"];

export function getTimetableById(id: string): SectionTimetableData | undefined {
  return OFFICIAL_TIMETABLES.find((t) => t.id === id);
}

export function getTimetableByYearAndSection(year: string, section: string): SectionTimetableData {
  const found = OFFICIAL_TIMETABLES.find(
    (t) => (t.year.toLowerCase() === year.toLowerCase() || t.semester.toLowerCase() === year.toLowerCase()) && t.section.toUpperCase() === section.toUpperCase()
  );
  return found || OFFICIAL_TIMETABLES[0];
}

export function getAllSections() {
  return OFFICIAL_TIMETABLES.map((t) => ({
    id: t.id,
    year: t.year,
    semester: t.semester,
    semesterNum: t.semesterNum,
    section: t.section,
    roomNo: t.roomNo,
    batch: t.batch,
    label: `${t.year} - Sec ${t.section} (${t.roomNo})`,
    classIncharge: t.classIncharge,
    mentors: t.mentors,
  }));
}

export function getAllFacultyNames(): string[] {
  const facultySet = new Set<string>();
  OFFICIAL_TIMETABLES.forEach((tt) => {
    tt.subjects.forEach((s) => {
      if (s.facultyName && !s.facultyName.includes("Trainer") && !s.facultyName.includes("Elective")) {
        facultySet.add(s.facultyName.trim());
      }
    });
  });
  return Array.from(facultySet).sort();
}

export interface FacultySlotAssignment {
  day: string;
  periodNo: number;
  timeSlot: string;
  subjectCode: string;
  subjectName: string;
  shortCode: string;
  year: string;
  semester: string;
  section: string;
  room: string;
  isLab?: boolean;
}

export function getFacultyTeachingSchedule(facultyName: string): Record<string, FacultySlotAssignment[]> {
  const schedule: Record<string, FacultySlotAssignment[]> = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  OFFICIAL_TIMETABLES.forEach((tt) => {
    days.forEach((day) => {
      const daySlots = tt.schedule[day] || [];
      daySlots.forEach((slot) => {
        if (slot.faculty && (slot.faculty.toLowerCase().includes(facultyName.toLowerCase()) || facultyName.toLowerCase().includes(slot.faculty.toLowerCase()))) {
          schedule[day].push({
            day,
            periodNo: slot.periodNo,
            timeSlot: slot.timeSlot,
            subjectCode: slot.subjectCode,
            subjectName: slot.subjectName,
            shortCode: slot.shortCode,
            year: tt.year,
            semester: tt.semester,
            section: tt.section,
            room: slot.room,
            isLab: slot.isLab,
          });
        }
      });
    });
  });

  // Sort slots by period number
  days.forEach((day) => {
    schedule[day].sort((a, b) => a.periodNo - b.periodNo);
  });

  return schedule;
}

