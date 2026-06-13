import {
  FileText,
  Upload,
  TrendingUp,
  AlertTriangle,
  Briefcase,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ResumeCard from "./ResumeCard";

export default async function Dashboard({ stats, analyses }) {
  const session = await getServerSession(authOptions);

  const isMale = session?.user?.gender === "Male";

  // Dynamic Theme
  const theme = isMale
    ? {
        hero: "from-blue-600 to-cyan-500",

        heroText: "text-blue-100",

        button: "text-blue-700",

        primaryBg: "bg-blue-100",

        primaryText: "text-blue-600",

        border: "hover:border-blue-200",

        dot: "bg-blue-500",

        light: "bg-blue-50",

        card: "hover:shadow-blue-100",
      }
    : {
        hero: "from-pink-500 to-fuchsia-500",

        heroText: "text-pink-100",

        button: "text-pink-700",

        primaryBg: "bg-pink-100",

        primaryText: "text-pink-600",

        border: "hover:border-pink-200",

        dot: "bg-pink-500",

        light: "bg-pink-50",

        card: "hover:shadow-pink-100",
      };

  return (
    <div className="min-h-screen">
      {/* Main */}

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

            <p className={`max-w-2xl text-sm md:text-base ${theme.heroText}`}>
              Upload your resume and get ATS score, keyword analysis, formatting
              suggestions, and personalized improvements instantly.
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
        {/* <Card
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
                  <p className="text-sm text-slate-500">ATS Score</p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    82%
                  </h3>
                </div>

                <div className={`rounded-2xl p-3 ${theme.primaryBg}`}>
                  <TrendingUp className={`h-6 w-6 ${theme.primaryText}`} />
                </div>
              </div>

              <Progress value={82} className="mt-5" />
            </CardContent>
          </Card> */}

        {/* Uploaded */}
        <Card className="rounded-[28px] border-0 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Analyzed Resumes</p>

                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {stats.totalAnalyses}
                </h3>
              </div>

              <div className="rounded-2xl bg-emerald-100 p-3">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs */}
        {/* <Card className="rounded-[28px] border-0 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Matched Jobs</p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">24</h3>
                </div>

                <div className="rounded-2xl bg-orange-100 p-3">
                  <Briefcase className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card> */}

        {/* Suggestions */}
        {/* <Card
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
                  <p className="text-sm text-slate-500">AI Suggestions</p>

                  <h3 className="mt-2 text-3xl font-bold text-slate-800">
                    {stats.totalSuggestions}
                  </h3>
                </div>

                <div className={`rounded-2xl p-3 ${theme.primaryBg}`}>
                  <Sparkles className={`h-6 w-6 ${theme.primaryText}`} />
                </div>
              </div>
            </CardContent>
          </Card> */}
      </div>

      {/* Card Add */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-5">
        {analyses.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
}
