"use server";

import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: users };
  } catch (error: any) {
    console.error("Failed to fetch users:", error);
    return { success: false, error: error.message };
  }
}

export async function provisionUser(data: {
  name: string;
  email: string;
  role: Role;
  department: string;
  designation?: string;
  rollNo?: string;
  section?: string;
  semester?: number;
  mentor?: string;
  cabin?: string;
  staffId?: string;
}) {
  try {
    // Generate a default password based on rollNo for students, or "password123" for staff
    const password = data.role === "STUDENT" ? data.rollNo : "password123";
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        department: data.department,
        password: hashedPassword,
        profile: {
          create: {
            // Student specific
            registerNumber: data.rollNo,
            rollNumber: data.rollNo,
            section: data.section,
            semester: data.semester?.toString(),
            // Remove hardcoded fake records (cgpa, attendance) and rely on defaults
            
            // Faculty/HOD specific
            designation: data.designation,
            mentorCabin: data.cabin,
            staffId: data.staffId,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    revalidatePath("/admin/students");
    return { success: true, data: user };
  } catch (error: any) {
    console.error("Failed to provision user:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteUserAction(id: string) {
  try {
    // Don't allow deleting root users
    const user = await prisma.user.findUnique({ where: { id } });
    if (user?.email === "admin@veltech.edu.in" || user?.email === "hod@veltech.edu.in") {
      throw new Error("Cannot delete protected root users.");
    }

    await prisma.user.delete({
      where: { id },
    });
    
    revalidatePath("/admin/students");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete user:", error);
    return { success: false, error: error.message };
  }
}

export async function getStudentProfile(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });
    return { success: true, data: user };
  } catch (error: any) {
    console.error("Failed to fetch student profile:", error);
    return { success: false, error: error.message };
  }
}
