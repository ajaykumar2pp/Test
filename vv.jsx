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
} from "lucide-react";

export default function ResumeCard({ resume }) {
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
        badge:
          "bg-green-100 text-green-700 border-green-200",
      };

    if (score >= 60)
      return {
        label: "Average",
        badge:
          "bg-amber-100 text-amber-700 border-amber-200",
      };

    return {
      label: "Needs Work",
      badge:
        "bg-red-100 text-red-700 border-red-200",
    };
  };

  const strength = getStrength(atsScore);

  return (
    <div
      className="
        group
        flex
        h-full
        flex-col
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
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100">
            <FileText className="h-7 w-7 text-indigo-600" />
          </div>

          <div className="min-w-0 flex-1">
            <h3
              title={resume.fileName}
              className="truncate text-lg font-semibold text-slate-900"
            >
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
      <div className="flex flex-1 flex-col p-5">
        {/* Company */}
        <div className="mb-4 flex items-start gap-3">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />

          <p
            title={resume.companyName}
            className="line-clamp-1 text-sm leading-6 text-slate-600"
          >
            {resume.companyName || "Company Not Provided"}
          </p>
        </div>

        {/* Role */}
        <div className="mb-5 flex items-start gap-3">
          <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />

          <p
            title={resume.jobRole}
            className="line-clamp-1 text-sm leading-6 text-slate-600"
          >
            {resume.jobRole || "Role Not Provided"}
          </p>
        </div>

        {/* Strength Badge */}
        <div className="mb-5">
          <span
            className={`
              inline-flex
              w-fit
              items-center
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-semibold
              shadow-sm
              ${strength.badge}
            `}
          >
            {strength.label}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {/* ATS */}
          <div className="rounded-2xl border bg-slate-50 p-4 transition-colors hover:bg-slate-100">
            <p className="text-xs font-medium text-slate-500">
              ATS Score
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2.5">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>

              <p className="text-lg font-bold text-slate-900">
                {atsScore}%
              </p>
            </div>
          </div>

          {/* Missing Skills */}
          <div className="rounded-2xl border bg-slate-50 p-4 transition-colors hover:bg-slate-100">
            <p className="text-xs font-medium text-slate-500">
              Missing Skills
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="rounded-xl bg-orange-100 p-2.5">
                <TriangleAlert className="h-5 w-5 text-orange-600" />
              </div>

              <p className="text-lg font-bold text-slate-900">
                {missingSkills}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-5">
          <div className="mb-4 border-t" />

          <div className="flex items-center justify-between gap-3">
            <div
              title={format(
                new Date(resume.createdAt),
                "dd MMM yyyy, hh:mm a"
              )}
              className="flex items-center gap-2 text-sm text-slate-500"
            >
              <Calendar className="h-4 w-4 shrink-0" />

              <span>
                {format(
                  new Date(resume.createdAt),
                  "dd MMM yyyy"
                )}
              </span>
            </div>

            <Link
              href={`/user/resume-result/${resume.id}`}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition-all
                hover:bg-indigo-700
              "
            >
              View Report
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}