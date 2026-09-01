import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  badge?: {
    text: string;
    type: "success" | "warning" | "danger" | "info" | "primary" | "milano" | "bluestone" | "peach";
  };
  gradient?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  badge,
}: StatCardProps) {
  const badgeStyles: Record<string, string> = {
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warning: "bg-[#FFF6EE] text-[#AF0606] border-[#FECDA5]",
    danger: "bg-[#FDE8E8] text-[#AF0606] border-[#AF0606]/30 font-semibold",
    info: "bg-[#E6F1F1] text-[#026466] border-[#026466]/20 font-semibold",
    primary: "bg-[#E6F1F1] text-[#026466] border-[#026466]/30 font-bold",
    milano: "bg-[#FDE8E8] text-[#AF0606] border-[#AF0606]/30 font-bold",
    bluestone: "bg-[#E6F1F1] text-[#026466] border-[#026466]/30 font-bold",
    peach: "bg-[#FFF6EE] text-black border-[#FECDA5] font-semibold",
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#026466]/40">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">{title}</p>
          <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-black font-mono">{value}</h3>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#E6F1F1] text-[#026466] border border-[#026466]/20">
          {icon}
        </div>
      </div>

      {badge && (
        <div className="mt-3.5 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] ${badgeStyles[badge.type] || badgeStyles.info}`}
          >
            {badge.text}
          </span>
        </div>
      )}
    </div>
  );
}
