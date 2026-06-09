import {
  FileText,
  Upload,
  TrendingUp,
  AlertTriangle,
  Briefcase,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Progress } from "@/components/ui/progress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export default async function DashboardPage() {
  
  const session =
    await getServerSession(authOptions);

  const isMale =
    session?.user?.gender === "Male";

  // Dynamic Theme
  const theme = isMale
    ? {
        hero:
          "from-blue-600 to-cyan-500",

        heroText:
          "text-blue-100",

        button:
          "text-blue-700",

        primaryBg:
          "bg-blue-100",

        primaryText:
          "text-blue-600",

        border:
          "hover:border-blue-200",

        dot:
          "bg-blue-500",

        light:
          "bg-blue-50",

        card:
          "hover:shadow-blue-100",
      }
    : {
        hero:
          "from-pink-500 to-fuchsia-500",

        heroText:
          "text-pink-100",

        button:
          "text-pink-700",

        primaryBg:
          "bg-pink-100",

        primaryText:
          "text-pink-600",

        border:
          "hover:border-pink-200",

        dot:
          "bg-pink-500",

        light:
          "bg-pink-50",

        card:
          "hover:shadow-pink-100",
      };

  return (
    <div className="min-h-screen">
      {/* Main */}
      <div className="p-6">
        {/* Hero */}
        <div
          className={`
            mb-8 rounded-[32px]
            bg-linear-to-r
            ${theme.hero}
            p-8 text-white shadow-xl
          `}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="mb-3 text-4xl font-bold leading-tight">
                Improve Your Resume
                <br />
                with AI 🚀
              </h2>

              <p
                className={`max-w-2xl text-sm md:text-base ${theme.heroText}`}
              >
                Upload your resume and get ATS score,
                keyword analysis, formatting suggestions,
                and personalized improvements instantly.
              </p>
            </div>

            <Link href="/user/upload-resume">
              <Button
                className={`
                  h-12 rounded-2xl bg-white px-6
                  hover:bg-slate-100
                  shadow-md transition-all duration-300
                  hover:scale-[1.02]
                  cursor-pointer
                  ${theme.button}
                `}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* ATS */}
          <Card
            className={`
              rounded-[28px] border-0 shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg
              ${theme.card}
            `}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    ATS Score
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    82%
                  </h3>
                </div>

                <div
                  className={`rounded-2xl p-3 ${theme.primaryBg}`}
                >
                  <TrendingUp
                    className={`h-6 w-6 ${theme.primaryText}`}
                  />
                </div>
              </div>

              <Progress value={82} className="mt-5" />
            </CardContent>
          </Card>

          {/* Uploaded */}
          <Card className="rounded-[28px] border-0 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Uploaded Resumes
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    12
                  </h3>
                </div>

                <div className="rounded-2xl bg-emerald-100 p-3">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jobs */}
          <Card className="rounded-[28px] border-0 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Matched Jobs
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    24
                  </h3>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3">
                  <Briefcase className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card
            className={`
              rounded-[28px] border-0 shadow-sm
              hover:-translate-y-1 hover:shadow-lg
              transition-all duration-300
              ${theme.card}
            `}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Improve Suggestions
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    18
                  </h3>
                </div>

                <div
                  className={`rounded-2xl p-3 ${theme.primaryBg}`}
                >
                  <Sparkles
                    className={`h-6 w-6 ${theme.primaryText}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom */}
        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          {/* Weakness */}
          <Card className="overflow-hidden rounded-[32px] border-0 bg-white shadow-lg">
            {/* Header */}
            <div className="bg-linear-to-r from-red-500 to-orange-500 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
                  <AlertTriangle className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    Resume Weakness
                  </h3>

                  <p className="mt-1 text-sm text-red-100">
                    Areas needing improvement
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <CardContent className="space-y-5 p-6">
              <div className="rounded-3xl border border-red-100 bg-red-50 p-5 transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />

                  <h4 className="font-semibold text-slate-900">
                    Limited Experience
                  </h4>
                </div>

                <p className="text-sm leading-7 text-slate-600">
                  Add internships, freelance work,
                  or collaborative projects.
                </p>
              </div>

              <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5 transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-orange-500" />

                  <h4 className="font-semibold text-slate-900">
                    Missing Impact Metrics
                  </h4>
                </div>

                <p className="text-sm leading-7 text-slate-600">
                  Add measurable achievements and
                  performance improvements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Interview */}
          <Card className="overflow-hidden rounded-[32px] border-0 bg-white shadow-lg xl:col-span-2">
            {/* Header */}
            <div
              className={`
                flex flex-col gap-5 border-b
                p-6 md:flex-row md:items-center md:justify-between
                ${theme.light}
              `}
            >
              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  Interview Preparation
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  AI generated questions based on your
                  resume
                </p>
              </div>
            </div>

            {/* Questions */}
            <CardContent className="p-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Technical */}
                <div
                  className={`
                    rounded-[28px] p-5
                    ${theme.light}
                  `}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className={`rounded-2xl p-3 ${theme.primaryBg}`}
                    >
                      <Sparkles
                        className={`h-5 w-5 ${theme.primaryText}`}
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        Technical Questions
                      </h4>

                      <p className="text-sm text-slate-500">
                        Backend & frontend concepts
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      "What is your experience with Next.js and Node.js?",
                      "How do you build scalable applications?",
                      "Difference between PostgreSQL and MongoDB?",
                      "How does JWT authentication work?",
                    ].map((question, index) => (
                      <div
                        key={index}
                        className={`
                          rounded-2xl border border-slate-100
                          bg-white p-4 transition
                          hover:shadow-md
                          ${theme.border}
                        `}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`
                              mt-1 h-2.5 w-2.5 rounded-full
                              ${theme.dot}
                            `}
                          />

                          <p className="text-sm leading-7 text-slate-700">
                            {question}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* HR */}
                <div className="rounded-[28px] bg-slate-50 p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-100 p-3">
                      <Briefcase className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        HR Questions
                      </h4>

                      <p className="text-sm text-slate-500">
                        Personality & communication
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Why do you want to join our company?",
                      "What are your career goals?",
                      "Describe a difficult challenge you solved.",
                      "How do you handle deadlines and pressure?",
                    ].map((question, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-100 bg-white p-4 transition hover:border-emerald-200 hover:shadow-md"
                      >
                        <div className="flex gap-3">
                          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />

                          <p className="text-sm leading-7 text-slate-700">
                            {question}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}