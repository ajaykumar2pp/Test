"use client";

import { format } from "date-fns";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Mail,
  User,
  Download,
} from "lucide-react";

export default function UsersTable({ users }) {

  return (
    <div className="flex flex-col gap-6">
      {users?.length > 0 ? (
        users.map((user) => (
          <Card
            key={user.id}
            className="border shadow-sm hover:shadow-lg transition"
          >
            <CardContent className="p-5 space-y-4">

              {/* User Header */}
              <div className="space-y-1">
                <h2 className="text-lg font-bold">
                  {user.fullName}
                </h2>

                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-4 w-4" />

                  {user.email}
                </p>

                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="h-3 w-3" />

                  {user.gender}
                </p>
              </div>

              {/* Resume Analyses */}
              {user.resumeAnalyses?.length > 0 ? (
                <div className="space-y-4">
                  {user.resumeAnalyses.map(
                    (analysis) => (
                      <div
                        key={analysis.id}
                        className="border rounded-xl p-4 space-y-3"
                      >
                        {/* Scores */}
                        <div className="grid grid-cols-2 gap-3">

                          <div className="rounded-lg border p-3">
                            <p className="text-xs text-muted-foreground">
                              ATS Score
                            </p>

                            <h3 className="text-2xl font-bold text-green-600">
                              {analysis.atsScore}%
                            </h3>
                          </div>

                          <div className="rounded-lg border p-3">
                            <p className="text-xs text-muted-foreground">
                              Match %
                            </p>

                            <h3 className="text-2xl font-bold text-blue-600">
                              {analysis.matchPercentage}%
                            </h3>
                          </div>
                        </div>

                        {/* Resume Quality */}
                        <div className="rounded-lg border p-3">
                          <p className="text-sm font-medium">
                            Resume Quality
                          </p>

                          <div className="mt-2 h-2 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{
                                width: `${analysis.resumeQuality}%`,
                              }}
                            />
                          </div>

                          <p className="text-sm mt-1">
                            {analysis.resumeQuality}%
                          </p>
                        </div>

                        {/* Missing Skills */}
                        <div>
                          <p className="text-sm font-semibold mb-2">
                            Missing Skills
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {analysis.missingSkills
                              ?.slice(0, 5)
                              ?.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-md"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        </div>

                        {/* Resume Button */}
                        {analysis.fileUrl && (
                          <a
                            href={analysis.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full rounded-lg bg-black text-white py-2 text-sm hover:opacity-90"
                          >
                            <Download className="h-4 w-4" />

                            View Resume
                          </a>
                        )}

                        {/* Analysis Date */}
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(analysis.createdAt), "dd MMM yyyy, hh:mm a")}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground border rounded-lg p-4 text-center">
                  No Resume Analyses Found
                </div>
              )}

              {/* User Created Date */}
              <div className="border-t pt-3 text-xs text-muted-foreground">
                Joined:{" "}
                {format(
                  new Date(user.createdAt),
                  "dd MMM yyyy, hh:mm a"
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
}