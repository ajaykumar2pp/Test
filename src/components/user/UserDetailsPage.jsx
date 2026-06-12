"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  User,
  Briefcase,
} from "lucide-react";

import UserResumeCard from "./UserResumeCard";

const UserDetailsPage = ({ user }) => {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="overflow-hidden rounded-3xl border bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <button
              onClick={() => router.back()}
              className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/25 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <h1 className="text-3xl font-bold tracking-tight">
              User Resume Analysis
            </h1>

            <p className="mt-2 text-indigo-100">
              View all analyzed resumes and ATS reports for this user.
            </p>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-2">
                  <User className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-indigo-100">User</p>

                  <p className="max-w-45 truncate font-semibold">
                    {user?.name || user?.email || "Unknown User"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/20 p-2">
                  <FileText className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-indigo-100">
                    Total Resumes
                  </p>

                  <p className="font-semibold">
                    {user?.resumeAnalyses?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Cards */}
      {user?.resumeAnalyses?.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {user.resumeAnalyses.map((resume) => (
            <UserResumeCard
              key={resume.id}
              resume={resume}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <Briefcase className="h-8 w-8 text-slate-500" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            No Resume Found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            This user has not analyzed any resumes yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;