import React from "react";

interface AttendanceMeterProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export default function AttendanceMeter({
  percentage,
  size = 140,
  strokeWidth = 10,
  showLabel = true,
}: AttendanceMeterProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  let strokeColor = "#026466"; // Blue Stone (Safe)
  let textColor = "text-[#026466]";
  let statusText = "Good Standing";

  if (percentage < 70) {
    strokeColor = "#AF0606"; // Milano Red (Critical)
    textColor = "text-[#AF0606]";
    statusText = "Critical (<70%)";
  } else if (percentage < 75) {
    strokeColor = "#AF0606";
    textColor = "text-[#AF0606]";
    statusText = "Warning (70-75%)";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="rotate-[-90deg] transition-all duration-700 ease-out" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E6F1F1"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`text-2xl font-bold font-mono tracking-tight ${textColor}`}>
            {percentage.toFixed(1)}%
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">Attendance</span>
        </div>
      </div>

      {showLabel && (
        <span
          className={`mt-2.5 inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold border ${
            percentage >= 75
              ? "bg-[#E6F1F1] text-[#026466] border-[#026466]/30"
              : percentage >= 70
              ? "bg-[#FFF6EE] text-[#AF0606] border-[#FECDA5]"
              : "bg-[#FDE8E8] text-[#AF0606] border-[#AF0606]/30"
          }`}
        >
          {statusText}
        </span>
      )}
    </div>
  );
}
