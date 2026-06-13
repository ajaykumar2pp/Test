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
        badge:
          "bg-emerald-100 text-emerald-700 border-emerald-200",
      };

    if (score >= 75)
      return {
        label: "Strong",
        badge: "bg-green-100 text-green-700 border-green-200",
      };

    if (score >= 60)
      return {
        label: "Average",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
      };

    return {
      label: "Needs Work",
      badge: "bg-red-100 text-red-700 border-red-200",
    };
  };

  const strength = getStrength(atsScore);

  const downloadUrl = resume?.fileUrl?.replace(
    "/upload/",
    "/upload/fl_attachment/"
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
        sm:hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-4 sm:p-5 md:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 sm:h-12 sm:w-12">
            <FileText className="h-5 w-5 text-indigo-600 sm:h-6 sm:w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
              {resume?.fileName || "Resume"}
            </h3>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {resume?.fileSize
                ? `${(resume.fileSize / 1024).toFixed(1)} KB`
                : "Unknown Size"}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Company & Role */}
        <div>
          <div className="mb-3 flex items-start gap-2 text-sm text-slate-600">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />

            <p className="line-clamp-2 break-words">
              {resume?.companyName || "Company Not Provided"}
            </p>
          </div>

          <div className="mb-4 flex items-start gap-2 text-sm text-slate-600">
            <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />

            <p className="line-clamp-2 break-words">
              {resume?.jobRole || "Role Not Provided"}
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

        {/* Stats */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              ATS Score
            </p>

            <div className="mt-2 flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>

              <p className="font-semibold text-slate-900">
                {atsScore}%
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Missing Skills
            </p>

            <div className="mt-2 flex items-center gap-2">
              <div className="rounded-lg bg-orange-100 p-2">
                <TriangleAlert className="h-4 w-4 text-orange-600" />
              </div>

              <p className="font-semibold text-slate-900">
                {missingSkills}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 border-t pt-4">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm">
            <Calendar className="h-4 w-4 shrink-0" />

            <span>
              {format(
                new Date(resume.createdAt),
                "dd MMM yyyy, hh:mm a"
              )}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {/* View Report */}
            <Link
              href={`/admin/users/${resume.id}/resume-result`}
              className="
                inline-flex
                w-full
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
              "
            >
              <span>View Report</span>

              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>

            {/* View Resume */}
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                w-full
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
              "
            >
              <ExternalLink className="h-4 w-4 shrink-0" />

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
                w-full
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
              "
            >
              <Download className="h-4 w-4 shrink-0" />

              <span>Download</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}