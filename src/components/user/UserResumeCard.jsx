"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  FileText,
  Building2,
  Briefcase,
  Calendar,
  ArrowRight,
  TriangleAlert,
  TrendingUp,
  Download,
  ExternalLink,
} from "lucide-react";

export default function UserResumeCard({ resume }) {
  const atsScore = resume?.aiAnalysis?.atsScore || 0;

  const missingSkills =
    resume?.aiAnalysis?.skillMatchAnalysis?.missingSkills?.length || 0;

  const getStrength = (score) => {
    if (score >= 85)
      return {
        label: "Excellent",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
        color: "#10b981",
      };

    if (score >= 75)
      return {
        label: "Strong",
        badge: "bg-green-100 text-green-700 border-green-200",
        color: "#22c55e",
      };

    if (score >= 60)
      return {
        label: "Average",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        color: "#f59e0b",
      };

    return {
      label: "Needs Work",
      badge: "bg-red-100 text-red-700 border-red-200",
      color: "#ef4444",
    };
  };

  const strength = getStrength(atsScore);

  const downloadUrl = resume.fileUrl.replace(
    "/upload/",
    "/upload/fl_attachment/",
  );

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="border-b bg-linear-to-r from-indigo-50 via-white to-indigo-50 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
            <FileText className="h-6 w-6 text-indigo-600" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-slate-900">
              {resume.fileName}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {resume.fileSize
                ? `${(resume.fileSize / 1024).toFixed(1)} KB`
                : "Unknown Size"}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="grid grid-cols-[1fr_100px] gap-4">
          {/* Left */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-600">
              <Building2 className="h-4 w-4 text-indigo-500" />

              <p className="line-clamp-2 text-sm text-slate-600">
                {resume.companyName || "Company Not Provided"}
              </p>
              {/* <span>{resume.companyName || "Company Not Provided"}</span> */}
            </div>

            <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
              <Briefcase className="h-4 w-4 text-indigo-500" />

              <p className="line-clamp-2 text-sm text-slate-600">
                {resume.jobRole || "Role Not Provided"}
              </p>
            </div>

            <span
              className={`
                inline-flex
                items-center
                rounded-full
                border
                px-3
                py-1
                text-xs
                font-medium
                ${strength.badge}
              `}
            >
              {strength.label}
            </span>
          </div>

          {/* ATS Circle */}
          {/* <div className="h-[90px] w-[90px]">
            <CircularProgressbar
              value={atsScore}
              text={`${atsScore}%`}
              styles={buildStyles({
                pathColor: strength.color,
                textColor: "#0f172a",
                trailColor: "#e5e7eb",
                textSize: "18px",
              })}
            />
          </div> */}
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">ATS Score</p>

            <div className="mt-2 flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>

              <p className="font-semibold text-slate-900">{atsScore}%</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Missing Skills</p>

            <div className="mt-2 flex items-center gap-2">
              <div className="rounded-lg bg-orange-100  p-2">
                <TriangleAlert className="h-4 w-4 text-orange-600" />
              </div>

              <p className="font-semibold text-slate-900">{missingSkills}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 border-t pt-4">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>
              {format(new Date(resume.createdAt), "dd MMM yyyy, hh:mm a")}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {/* View Report */}
            <Link
              href={`/admin/users/${resume.id}/resume-result`}
              className="
        inline-flex
        min-h-[46px]
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-indigo-600
        px-4
        py-2
        text-sm
        font-medium
        text-white
        transition-all
        duration-200
        hover:bg-indigo-700
        hover:shadow-md
      "
            >
              <span>View Report</span>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </Link>

            {/* View Resume */}
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
        inline-flex
        min-h-[46px]
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-2
        text-sm
        font-medium
        text-slate-700
        transition-all
        duration-200
        hover:bg-slate-50
        hover:shadow-sm
      "
            >
              <ExternalLink className="h-5 w-5 shrink-0" />
              <span>View Resume</span>
            </a>

            {/* Download Resume */}
            <a
              href={downloadUrl}
              download={resume.fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="
        inline-flex
        min-h-[46px]
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-emerald-200
        bg-emerald-50
        px-4
        py-2
        text-sm
        font-medium
        text-emerald-700
        transition-all
        duration-200
        hover:bg-emerald-100
        hover:shadow-sm
      "
            >
              <Download className="h-5 w-5 shrink-0" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
