import 'dotenv/config';
import { PrismaClient, Role, AttendanceStatus, PetitionType, PetitionStatus, CircularUrgency, TargetAudience } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { OFFICIAL_TIMETABLES } from '../src/data/realTimetables';
import { REAL_STUDENTS_BATCH_2025_2029 } from '../src/data/realStudents';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Seeding VM-HUB database on Neon PostgreSQL...');
  const defaultPassword = await bcrypt.hash('password123', 10);

  // ==========================================
  // 1. SEED USERS & PROFILES
  // ==========================================
  console.log('👤 Seeding Users and Full Profiles...');

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@veltech.edu.in' },
    update: {},
    create: {
      email: 'admin@veltech.edu.in',
      name: 'Dr. Rajesh Kumar',
      password: defaultPassword,
      role: Role.ADMIN,
      department: 'Deanery / Academic Affairs',
      profile: {
        create: {
          staffId: 'ADM-DIR-01',
          designation: 'Director of Academic Affairs & Principal Controller',
          qualifications: 'Ph.D. Computer Systems (IIT Madras), Senior IEEE Fellow',
          experience: '22+ Years in Academic Administration',
          phone: '+91 94441 22334',
          dob: '1975-04-12',
          gender: 'Male',
          bloodGroup: 'B+',
          address: 'Administrative Enclave, Vel Tech Campus, Avadi, Chennai - 600062',
          bio: 'Overseeing institutional excellence, academic compliance, Anna University curriculum alignment, and multi-departmental governance.',
          mentorCabin: 'Executive Suite 101, Main Administrative Block',
          mentorPhone: '+91 94441 22334',
          mentorEmail: 'admin@veltech.edu.in',
          emergencyContact: '+91 94441 22300',
        },
      },
    },
  });

  // HOD
  const hod = await prisma.user.upsert({
    where: { email: 'hod@veltech.edu.in' },
    update: {},
    create: {
      email: 'hod@veltech.edu.in',
      name: 'Dr. Sundararajan V',
      password: defaultPassword,
      role: Role.HOD,
      department: 'Computer Science & Engineering',
      profile: {
        create: {
          staffId: 'HOD-CSE-01',
          designation: 'Professor & Head of Department (CSE)',
          qualifications: 'Ph.D. Distributed Systems (Anna Univ), M.E. CSE, B.E. CSE',
          experience: '16+ Years in Teaching & Research',
          researchAreas: 'Distributed Systems, Cloud Architecture, Edge AI, Blockchain',
          phone: '+91 98840 11223',
          dob: '1980-08-25',
          gender: 'Male',
          bloodGroup: 'O+',
          address: 'Flat 4B, Emerald Heights, Avadi Road, Chennai - 600054',
          bio: 'Dedicated to fostering research excellence, industry mentorship programs, NBA accreditation outcomes, and student skill enhancement.',
          mentorCabin: 'HOD Cabin Room 201, CS Department Block',
          mentorPhone: '+91 98840 11223',
          mentorEmail: 'hod@veltech.edu.in',
          emergencyContact: '+91 98840 99887',
        },
      },
    },
  });

  // Teachers
  const teacher1 = await prisma.user.upsert({
    where: { email: 'teacher@veltech.edu.in' },
    update: {},
    create: {
      email: 'teacher@veltech.edu.in',
      name: 'Prof. Ananya Iyer',
      password: defaultPassword,
      role: Role.TEACHER,
      department: 'Computer Science & Engineering',
      profile: {
        create: {
          staffId: 'STF-CSE-104',
          designation: 'Associate Professor & Senior Proctor',
          qualifications: 'Ph.D. Cloud Computing (Anna Univ), M.Tech Software Engg',
          experience: '8+ Years in Teaching & Industry Collaboration',
          researchAreas: 'Cloud Computing, Microservices, Edge Computing, DevOps',
          phone: '+91 97711 33445',
          dob: '1987-11-14',
          gender: 'Female',
          bloodGroup: 'A+',
          address: 'No. 24, Gandhi Street, Anna Nagar West, Chennai - 600040',
          bio: 'Subject expert in Cloud Computing & Distributed Systems. Proctor mentor for 20+ undergraduate engineering scholars.',
          mentorCabin: 'Admin Block Room 304 (Proctor Center)',
          mentorPhone: '+91 97711 33445',
          mentorEmail: 'teacher@veltech.edu.in',
          emergencyContact: '+91 97711 00998',
        },
      },
    },
  });

  const teacher2 = await prisma.user.upsert({
    where: { email: 'karthik.v@veltech.edu.in' },
    update: {},
    create: {
      email: 'karthik.v@veltech.edu.in',
      name: 'Prof. Karthik Venkat',
      password: defaultPassword,
      role: Role.TEACHER,
      department: 'Computer Science & Engineering',
      profile: {
        create: {
          staffId: 'STF-CSE-108',
          designation: 'Assistant Professor (Senior Grade)',
          qualifications: 'M.E. Computer Science, B.Tech IT, Ph.D. (Pursuing)',
          experience: '6+ Years in Teaching & Cybersecurity Research',
          researchAreas: 'Cryptography, Network Security, Zero Trust Architectures',
          phone: '+91 96622 44556',
          dob: '1990-03-18',
          gender: 'Male',
          bloodGroup: 'B+',
          address: 'Plot 12, Lake View Colony, Ambattur, Chennai - 600053',
          bio: 'Security researcher and instructor for Cryptography & Network Security. Faculty lead for college Hackathon Club.',
          mentorCabin: 'Room 310, CS Department Block',
          mentorPhone: '+91 96622 44556',
          mentorEmail: 'karthik.v@veltech.edu.in',
          emergencyContact: '+91 96622 11223',
        },
      },
    },
  });

  // Faculty Mentors from Official 2025-2029 CSE Allocation
  const mentorFacultyData = [
    { name: "Mr. R. Prabhakaran", email: "prabhakaran.r@veltechmultitech.org", phone: "9043636580", section: "A", staffId: "MTR-CSE-A01", cabin: "CSE Section A (Room N 201)" },
    { name: "Mr. S. Vinod", email: "vinod.s@veltechmultitech.org", phone: "9500551142", section: "A", staffId: "MTR-CSE-A02", cabin: "CSE Section A (Room N 201)" },
    { name: "Ms. C.H. Yerakkamma", email: "yerakkamma.ch@veltechmultitech.org", phone: "9059474039", section: "A", staffId: "MTR-CSE-A03", cabin: "CSE Section A (Room N 201)" },
    { name: "Ms. P. Selvarathinam", email: "selvarathinam.p@veltechmultitech.org", phone: "9629252119", section: "B", staffId: "MTR-CSE-B01", cabin: "CSE Section B (Room N 201)" },
    { name: "Mr. V. Nehru", email: "nehru.v@veltechmultitech.org", phone: "9884026041", section: "B", staffId: "MTR-CSE-B02", cabin: "CSE Section B (Room N 201)" },
    { name: "Ms. D. Parkavi", email: "parkavi.d@veltechmultitech.org", phone: "9677145455", section: "B", staffId: "MTR-CSE-B03", cabin: "CSE Section B (Room N 201)" },
    { name: "Ms. C.S. Sandhiya Sri", email: "sandhiyasri.cs@veltechmultitech.org", phone: "9791084403", section: "C", staffId: "MTR-CSE-C01", cabin: "CSE Section C (Room N 203)" },
    { name: "Ms. J. Bebitha", email: "bebitha.j@veltechmultitech.org", phone: "9840152580", section: "C", staffId: "MTR-CSE-C02", cabin: "CSE Section C (Room N 203)" },
    { name: "Ms. R. Harini", email: "harini.r@veltechmultitech.org", phone: "7305100205", section: "C", staffId: "MTR-CSE-C03", cabin: "CSE Section C (Room N 203)" },
  ];

  const mentorUserMap = new Map<string, string>();

  for (const m of mentorFacultyData) {
    const mentorUser = await prisma.user.upsert({
      where: { email: m.email },
      update: { name: m.name },
      create: {
        email: m.email,
        name: m.name,
        password: defaultPassword,
        role: Role.TEACHER,
        department: "Computer Science & Engineering",
        profile: {
          create: {
            staffId: m.staffId,
            designation: "Assistant Professor & Official Mentor",
            qualifications: "M.E. Computer Science and Engineering",
            experience: "6+ Years in Teaching & Student Mentoring",
            phone: `+91 ${m.phone}`,
            mentorCabin: m.cabin,
            mentorPhone: `+91 ${m.phone}`,
            mentorEmail: m.email,
          },
        },
      },
    });
    mentorUserMap.set(m.name.toLowerCase().trim(), mentorUser.id);
  }

  // Also retain demo teacher1 / teacher2 for fallback compatibility
  mentorUserMap.set("mr.r.prabhakaran", mentorUserMap.get("mr. r. prabhakaran") || teacher1.id);
  mentorUserMap.set("mr.s.vinod", mentorUserMap.get("mr. s. vinod") || teacher1.id);

  // ==========================================
  // SEED ALL 180 STUDENTS (BATCH 2025-2029)
  // Password: VM Number without "VM" (e.g. 17433)
  // Year: "Year II" | Batch: "2025-2029"
  // ==========================================
  console.log(`🎓 Seeding ${REAL_STUDENTS_BATCH_2025_2029.length} Official Students (Batch 2025-2029)...`);

  let harizithStudentUser: any = null;

  for (const s of REAL_STUDENTS_BATCH_2025_2029) {
    // Password is the student's VM NO without "VM"
    const studentHashedPassword = await bcrypt.hash(s.vmNo, 10);

    const studentUser = await prisma.user.upsert({
      where: { email: s.email },
      update: {
        name: s.name,
        password: studentHashedPassword,
        department: "Computer Science & Engineering",
        profile: {
          upsert: {
            create: {
              registerNumber: s.regNo,
              rollNumber: s.vmNo,
              section: `CSE-${s.section}`,
              year: "Year II",
              semester: "Semester 3",
              degree: "B.E. Computer Science & Engineering",
              batch: "2025-2029",
              cgpa: 8.5,
              creditsEarned: 44,
              totalCredits: 160,
              arrearsCount: 0,
              mentorPhone: `+91 ${s.mentorMobile}`,
              mentorEmail: `${s.mentorName.toLowerCase().replace(/[^a-z]/g, "")}@veltechmultitech.org`,
              mentorCabin: `CSE Section ${s.section} Room ${s.roomNo}`,
              address: "Vel Tech Multi Tech Dr. RSR Engineering College, Avadi, Chennai - 600062",
            },
            update: {
              registerNumber: s.regNo,
              rollNumber: s.vmNo,
              section: `CSE-${s.section}`,
              year: "Year II",
              semester: "Semester 3",
              batch: "2025-2029",
              degree: "B.E. Computer Science & Engineering",
              mentorPhone: `+91 ${s.mentorMobile}`,
            },
          },
        },
      },
      create: {
        email: s.email,
        name: s.name,
        password: studentHashedPassword,
        role: Role.STUDENT,
        department: "Computer Science & Engineering",
        profile: {
          create: {
            registerNumber: s.regNo,
            rollNumber: s.vmNo,
            section: `CSE-${s.section}`,
            year: "Year II",
            semester: "Semester 3",
            degree: "B.E. Computer Science & Engineering",
            batch: "2025-2029",
            cgpa: 8.5,
            creditsEarned: 44,
            totalCredits: 160,
            arrearsCount: 0,
            mentorPhone: `+91 ${s.mentorMobile}`,
            mentorEmail: `${s.mentorName.toLowerCase().replace(/[^a-z]/g, "")}@veltechmultitech.org`,
            mentorCabin: `CSE Section ${s.section} Room ${s.roomNo}`,
            address: "Vel Tech Multi Tech Dr. RSR Engineering College, Avadi, Chennai - 600062",
          },
        },
      },
    });

    if (s.vmNo === "17433" || s.regNo === "113125UG03049") {
      harizithStudentUser = studentUser;
    }

    // Allocate to mentor
    const matchedMentorId = mentorUserMap.get(s.mentorName.toLowerCase().trim()) || teacher1.id;
    await prisma.mentorAllocation.upsert({
      where: { studentId: studentUser.id },
      update: { mentorId: matchedMentorId },
      create: {
        mentorId: matchedMentorId,
        studentId: studentUser.id,
        lastCounselingDate: new Date("2026-08-20"),
        counselingNotes: `Batch 2025-2029 student assigned to official mentor ${s.mentorName}. Orientation completed.`,
      },
    });
  }

  // Assign student1 (Harizith K) and student2 (Achudan B)
  const student1 = harizithStudentUser || (await prisma.user.findFirst({ where: { role: Role.STUDENT } }));
  const student2 = (await prisma.user.findFirst({
    where: {
      role: Role.STUDENT,
      NOT: { id: student1.id },
    },
  })) || student1;

  // ==========================================
  // 2. SEED REAL REGULATION 2023 COURSES
  // ==========================================
  console.log('📚 Seeding Real Regulation 2023 Courses...');

  const realCourses = [
    // Year II / Sem III Courses
    { code: '231MA302', name: 'Probability and Queuing Theory (Lab Integrated)', credits: 3, semester: 3, department: 'MATHS', type: 'Integrated' },
    { code: '231CS323', name: 'Object Oriented Programming', credits: 3, semester: 3, department: 'CSE', type: 'Theory' },
    { code: '231CS321', name: 'Data Structures', credits: 3, semester: 3, department: 'CSE', type: 'Theory' },
    { code: '231CS322', name: 'Digital Principles and Computer Organization (Lab Integrated)', credits: 4, semester: 3, department: 'ECE', type: 'Integrated' },
    { code: '231CS325', name: 'Software Engineering (Lab Integrated)', credits: 4, semester: 3, department: 'CSE', type: 'Integrated' },
    { code: '231CS324', name: 'Operating Systems', credits: 3, semester: 3, department: 'CSE', type: 'Theory' },
    { code: '231CS32A', name: 'Data Structures and Algorithms Laboratory', credits: 1, semester: 3, department: 'CSE', type: 'Practical' },
    { code: '231CS32B', name: 'Object Oriented Programming Laboratory', credits: 1, semester: 3, department: 'CSE', type: 'Practical' },
    { code: '231CS32C', name: 'Operating Systems Laboratory', credits: 1, semester: 3, department: 'CSE', type: 'Practical' },

    // Year III / Sem V Courses
    { code: '231IT521', name: 'Artificial Intelligence and Machine Learning (Lab Integrated)', credits: 4, semester: 5, department: 'CSE', type: 'Integrated' },
    { code: '231CS521', name: 'Compiler Design', credits: 3, semester: 5, department: 'CSE', type: 'Theory' },
    { code: '231CS522', name: 'Embedded Systems and IoT', credits: 3, semester: 5, department: 'CSE', type: 'Theory' },
    { code: '231CSV44', name: 'Ethical Hacking (Program Elective - I)', credits: 3, semester: 5, department: 'CSE', type: 'Theory' },
    { code: '231ITV64', name: 'Software Testing and Automation (Program Elective - II)', credits: 3, semester: 5, department: 'CSE', type: 'Theory' },
    { code: '231ECV43', name: 'Industrial IoT & Industry 4.0 (Open Elective - I)', credits: 3, semester: 5, department: 'ECE', type: 'Theory' },
    { code: '231CS52A', name: 'Compiler Design Laboratory', credits: 1, semester: 5, department: 'CSE', type: 'Practical' },
    { code: '231CS52B', name: 'Embedded Systems and IoT Laboratory', credits: 1, semester: 5, department: 'CSE', type: 'Practical' },
    { code: '231MC56A', name: 'Standards for Engineering (Seminar)', credits: 1, semester: 5, department: 'CSE', type: 'Practical' },

    // Year IV / Sem VII Courses
    { code: '231HS701', name: 'Professional Ethics and Human Values', credits: 3, semester: 7, department: 'CSE', type: 'Theory' },
    { code: '231CB721', name: 'Software Project Management', credits: 3, semester: 7, department: 'CSE', type: 'Theory' },
    { code: '231AIV17', name: 'Soft Computing (Professional Elective - V)', credits: 3, semester: 7, department: 'CSE', type: 'Theory' },
    { code: '231ITV51', name: 'AI in Media Communication (Professional Elective - VI)', credits: 3, semester: 7, department: 'CSE', type: 'Theory' },
    { code: '231EEEV61', name: 'AI ML for Electrical Systems (Open Elective - II)', credits: 3, semester: 7, department: 'EEE', type: 'Theory' },
    { code: '231ECV37', name: 'Wearable Devices (Open Elective - III)', credits: 3, semester: 7, department: 'ECE', type: 'Theory' },
    { code: '231CS77A', name: 'Project Phase - I', credits: 2, semester: 7, department: 'CSE', type: 'Practical' },
  ];

  for (const c of realCourses) {
    await prisma.course.upsert({
      where: { code: c.code },
      update: {
        name: c.name,
        credits: c.credits,
        semester: c.semester,
        department: c.department,
        type: c.type,
      },
      create: {
        code: c.code,
        name: c.name,
        credits: c.credits,
        semester: c.semester,
        department: c.department,
        type: c.type,
      },
    });
  }

  // ==========================================
  // 3. SEED OFFICIAL 9-SECTION REAL TIMETABLES
  // ==========================================
  console.log('🗓️ Seeding Official 9-Section Real Timetables to Neon PostgreSQL...');

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  for (const tt of OFFICIAL_TIMETABLES) {
    for (const day of daysList) {
      const daySlots = tt.schedule[day] || [];
      const formattedPeriods = daySlots.map((slot) => ({
        periodNo: slot.periodNo,
        timeSlot: slot.timeSlot,
        courseCode: slot.subjectCode,
        courseTitle: slot.shortCode || slot.subjectName,
        facultyName: slot.faculty,
        roomNo: slot.room,
      }));

      // Delete existing record if any to ensure clean period creation
      const existing = await prisma.timetableSchedule.findUnique({
        where: {
          department_section_dayOfWeek: {
            department: 'CSE',
            section: tt.id,
            dayOfWeek: day,
          },
        },
      });

      if (existing) {
        await prisma.timetableSchedule.delete({
          where: { id: existing.id },
        });
      }

      await prisma.timetableSchedule.create({
        data: {
          department: 'CSE',
          section: tt.id,
          dayOfWeek: day,
          semester: tt.semesterNum,
          periods: {
            create: formattedPeriods,
          },
        },
      });
    }
  }

  // ==========================================
  // 4. SEED CIRCULARS & NOTICES
  // ==========================================
  console.log('📢 Seeding Circulars & Broadcasts...');

  // Clean existing circulars to allow clean re-seeding
  await prisma.circularReceipt.deleteMany({});
  await prisma.circular.deleteMany({});

  const circular1 = await prisma.circular.create({
    data: {
      title: 'Continuous Assessment Test I (CAT-1) Schedule Released',
      content: 'All 2nd Year B.E. CSE (Batch 2025-2029) students are hereby notified that CAT-1 will commence on September 22, 2026. Minimum 75% attendance is mandatory for hall ticket eligibility.',
      category: 'Academic Exam',
      urgency: CircularUrgency.CRITICAL,
      targetAudience: TargetAudience.ALL,
      department: 'CSE',
      authorId: hod.id,
      receipts: {
        create: [
          { userId: student1.id },
          ...(student2.id !== student1.id ? [{ userId: student2.id }] : []),
        ],
      },
    },
  });

  const circular2 = await prisma.circular.create({
    data: {
      title: 'National Level Hackathon 2026 - Registration Open',
      content: 'Registrations are open for Smart Chennai Hackathon 2026. College provides On-Duty (OD) approval for all shortlisted teams.',
      category: 'Innovation & Events',
      urgency: CircularUrgency.EVENT,
      targetAudience: TargetAudience.STUDENTS_ONLY,
      department: 'CSE',
      authorId: teacher1.id,
    },
  });

  // ==========================================
  // 5. SEED LEAVE & OD PETITIONS
  // ==========================================
  console.log('📝 Seeding Leave & OD Petitions...');

  await prisma.leavePetition.deleteMany({});
  await prisma.leavePetition.create({
    data: {
      studentId: student1.id,
      type: PetitionType.ON_DUTY,
      fromDate: new Date('2026-09-10'),
      toDate: new Date('2026-09-12'),
      totalDays: 3,
      reason: 'Representing Vel Tech at IIT Madras Shaastra 2026 Cloud Innovation Finals.',
      status: PetitionStatus.APPROVED,
      reviewedById: teacher1.id,
      reviewerRemarks: 'Approved. Best wishes for the finals! Ensure lab assignments are submitted upon return.',
      reviewedAt: new Date('2026-09-08'),
    },
  });

  // ==========================================
  // 6. SEED ASSESSMENT MARKS
  // ==========================================
  console.log('📊 Seeding Internal Assessment Marks...');

  await prisma.assessmentMarks.upsert({
    where: {
      studentId_courseCode: {
        studentId: student1.id,
        courseCode: '231CS321',
      },
    },
    update: {},
    create: {
      studentId: student1.id,
      courseCode: '231CS321',
      courseName: 'Data Structures',
      cat1: 46.5,
      cat2: 48.0,
      modelExam: 92.0,
      assignment: 10.0,
      projectedGrade: 'O (Outstanding)',
    },
  });

  await prisma.assessmentMarks.upsert({
    where: {
      studentId_courseCode: {
        studentId: student1.id,
        courseCode: '231CS323',
      },
    },
    update: {},
    create: {
      studentId: student1.id,
      courseCode: '231CS323',
      courseName: 'Object Oriented Programming',
      cat1: 44.0,
      cat2: 45.5,
      modelExam: 88.0,
      assignment: 9.5,
      projectedGrade: 'A+ (Excellent)',
    },
  });

  // ==========================================
  // 7. SEED AUDIT LOG
  // ==========================================
  console.log('🛡️ Seeding System Audit Trail...');

  await prisma.auditLog.create({
    data: {
      action: 'SYSTEM_INITIALIZATION',
      actor: 'Dr. Rajesh Kumar (ADM-DIR-01)',
      target: 'Neon PostgreSQL Production DB (odd-tooth-02262831)',
      details: 'Initialized comprehensive database schema across main and timetable-branch with full persona profiles, curriculum delivery matrix, and attendance ledgers.',
      ipAddress: '10.0.4.1',
    },
  });

  console.log('✅ SEEDING COMPLETE! All tables in Neon DB populated.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
