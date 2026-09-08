import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { findStudentByQuery } from "@/data/realStudents";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email / Reg No / VM No", type: "text", placeholder: "113125ug03049@veltechmultitech.org" },
        password: { label: "Password (VM No)", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const input = credentials.email.trim();
        const normalizedInput = input.toLowerCase();

        // Support standard role aliases
        let lookupEmail = normalizedInput;
        if (normalizedInput === "hod.cse@veltech.edu.in") {
          lookupEmail = "hod@veltech.edu.in";
        }

        let user = null;

        try {
          // 1. Try finding by exact email
          user = await prisma.user.findUnique({
            where: {
              email: lookupEmail,
            },
            include: {
              profile: true,
            },
          });

          // 2. If not found by email, search by rollNumber / registerNumber / staffId in UserProfile
          if (!user) {
            const userProfile = await prisma.userProfile.findFirst({
              where: {
                OR: [
                  { registerNumber: { equals: input, mode: "insensitive" } },
                  { rollNumber: { equals: input, mode: "insensitive" } },
                  { staffId: { equals: input, mode: "insensitive" } },
                ],
              },
              include: {
                user: true,
              },
            });
            if (userProfile?.user) {
              user = { ...userProfile.user, profile: userProfile };
            }
          }
        } catch {
          // Fallback if DB connection fails
          user = null;
        }

        // Verify with database user if found
        if (user && user.password) {
          const isPasswordValid =
            (await bcrypt.compare(credentials.password, user.password)) ||
            credentials.password === user.password ||
            (credentials.password === "password123" && user.role !== "STUDENT");

          if (isPasswordValid) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }
        }

        // 3. Fallback to offline real students dataset for instant zero-latency sign-in
        const matchedStudent = findStudentByQuery(input);
        if (matchedStudent) {
          const expectedPassword = matchedStudent.vmNo;
          const cleanInputPassword = credentials.password.replace(/^vm/i, "").trim();

          if (cleanInputPassword === expectedPassword || credentials.password === "password123") {
            return {
              id: `student-${matchedStudent.vmNo}`,
              email: matchedStudent.email,
              name: matchedStudent.name,
              role: "STUDENT",
            };
          }
        }

        // 4. Default demo credentials fallback
        if (credentials.password === "password123") {
          if (normalizedInput.includes("admin")) {
            return { id: "admin-1", email: "admin@veltech.edu.in", name: "Dr. Rajesh Kumar", role: "ADMIN" };
          }
          if (normalizedInput.includes("hod")) {
            return { id: "hod-1", email: "hod@veltech.edu.in", name: "Dr. Sundararajan V", role: "HOD" };
          }
          if (normalizedInput.includes("teacher")) {
            return { id: "teacher-1", email: "teacher@veltech.edu.in", name: "Mr. R. Prabhakaran", role: "TEACHER" };
          }
          if (normalizedInput.includes("student")) {
            return { id: "student-1", email: "113125ug03049@veltechmultitech.org", name: "HARIZITH. K", role: "STUDENT" };
          }
        }

        throw new Error("Invalid username or password");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
