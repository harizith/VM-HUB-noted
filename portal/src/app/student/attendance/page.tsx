import React from "react";
import { attendanceData } from "@/lib/studentMockData";
import AttendanceMeter from "@/components/student/AttendanceMeter";

export default function AttendancePage() {
  const totalConducted = attendanceData.reduce((acc, curr) => acc + curr.totalHours, 0);
  const totalAttended = attendanceData.reduce((acc, curr) => acc + curr.attendedHours, 0);
  const totalMissed = totalConducted - totalAttended;
  const overallPercentage = (totalAttended / totalConducted) * 100;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Page Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-black">
          Academic Attendance Tracker
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Semester VI • Subject-wise attendance logs and exam eligibility thresholds.
        </p>
      </div>

      {/* 2. Overall Attendance Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center md:border-r border-slate-100 md:pr-6">
          <AttendanceMeter percentage={overallPercentage} size={150} strokeWidth={12} />
        </div>

        <div className="md:col-span-2 flex flex-col justify-center space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Conducted</span>
              <p className="text-2xl font-bold text-black mt-1 font-mono">{totalConducted}</p>
              <span className="text-[10px] text-slate-500">Hours</span>
            </div>

            <div className="rounded-lg border border-[#026466]/30 bg-[#E6F1F1] p-4 text-center">
              <span className="text-[11px] font-bold text-[#026466] uppercase tracking-wider">Attended</span>
              <p className="text-2xl font-bold text-[#026466] mt-1 font-mono">{totalAttended}</p>
              <span className="text-[10px] text-[#026466]">Hours</span>
            </div>

            <div className="rounded-lg border border-[#AF0606]/30 bg-[#FDE8E8] p-4 text-center">
              <span className="text-[11px] font-bold text-[#AF0606] uppercase tracking-wider">Missed</span>
              <p className="text-2xl font-bold text-[#AF0606] mt-1 font-mono">{totalMissed}</p>
              <span className="text-[10px] text-[#AF0606]">Hours</span>
            </div>
          </div>

          <div className="rounded-lg border border-[#FECDA5] bg-[#FFF6EE] p-3.5 text-xs text-black flex items-start gap-3">
            <div>
              <p className="font-bold text-black">University Regulation (Minimum 75% Requirement)</p>
              <p className="text-slate-700 mt-0.5 leading-relaxed text-[11px]">
                As per Autonomous College Regulations, students must maintain a minimum of 75% aggregate attendance in each individual subject to be eligible to appear for the End Semester Examinations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Subject Breakdown Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-black">Subject-wise Attendance & Safety Margin</h3>
            <p className="text-xs text-slate-500">Calculates how many classes you can miss or must attend to maintain 75%</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="pb-3 pl-2">Course Code & Title</th>
                <th className="pb-3 text-center">Type</th>
                <th className="pb-3 text-center">Total Hrs</th>
                <th className="pb-3 text-center">Attended</th>
                <th className="pb-3 text-center">Absent</th>
                <th className="pb-3 text-center">Percentage</th>
                <th className="pb-3 pr-2 text-right">Attendance Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceData.map((record) => {
                const isSafe = record.percentage >= 75;
                const safeMiss = Math.floor((record.attendedHours - 0.75 * record.totalHours) / 0.75);
                const requiredAttend = Math.ceil((0.75 * record.totalHours - record.attendedHours) / 0.25);

                return (
                  <tr key={record.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 pl-2">
                      <div className="font-semibold text-black text-xs">{record.courseTitle}</div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-mono text-[#026466] font-bold">{record.courseCode}</span>
                        <span>•</span>
                        <span>{record.facultyName}</span>
                      </div>
                    </td>

                    <td className="py-3 text-center">
                      <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                        {record.category}
                      </span>
                    </td>

                    <td className="py-3 text-center font-mono font-medium text-slate-800">{record.totalHours}</td>
                    <td className="py-3 text-center font-mono font-bold text-[#026466]">{record.attendedHours}</td>
                    <td className="py-3 text-center font-mono font-bold text-[#AF0606]">
                      {record.totalHours - record.attendedHours}
                    </td>

                    <td className="py-3 text-center">
                      <div className="flex flex-col items-center">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isSafe ? "text-[#026466]" : "text-[#AF0606]"
                          }`}
                        >
                          {record.percentage.toFixed(1)}%
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isSafe ? "bg-[#026466]" : "bg-[#AF0606]"
                            }`}
                            style={{ width: `${Math.min(100, record.percentage)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 pr-2 text-right">
                      {isSafe ? (
                        <span className="inline-flex items-center rounded-md bg-[#E6F1F1] border border-[#026466]/30 px-2.5 py-1 text-[11px] font-semibold text-[#026466]">
                          Can miss {Math.max(0, safeMiss)} hrs
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-[#FDE8E8] border border-[#AF0606]/30 px-2.5 py-1 text-[11px] font-bold text-[#AF0606]">
                          Attend next {Math.max(1, requiredAttend)} hrs
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
