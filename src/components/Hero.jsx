import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-white" />

      <div className="container mx-auto px-4">
        <div className="grid min-h-[90vh] items-center gap-12 lg:grid-cols-2">

          {/* Left Content */}
          <div>
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
              ✨ AI-Powered Resume Analysis Platform
            </div>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight lg:text-7xl">
              Get More Interviews with{" "}
              <span className="text-indigo-600">
                AI-Powered Resume Insights
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Upload your resume and instantly receive ATS scores,
              missing keyword analysis, strengths, weaknesses, and
              actionable recommendations tailored to your target job.
            </p>

            {/* <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="h-12 px-8">
                Analyze Resume Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div> */}

            <div className="mt-8 flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Trusted by 10,000+ Job Seekers Worldwide
            </div>
          </div>

          {/* Right Dashboard */}
          <div className="relative">

            {/* Floating Card 1 */}
            <div className="absolute -left-6 top-10 rounded-xl border bg-white px-4 py-3 shadow-lg">
              <p className="text-sm font-medium">
                +12 Keywords Found
              </p>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -right-4 top-20 rounded-xl border bg-white px-4 py-3 shadow-lg">
              <p className="text-sm font-medium">
                92% Match Score
              </p>
            </div>

            {/* Floating Card 3 */}
            <div className="absolute -bottom-4 left-8 rounded-xl border bg-white px-4 py-3 shadow-lg">
              <p className="text-sm font-medium">
                ATS Approved ✓
              </p>
            </div>

            {/* Main Dashboard */}
            <div className="rounded-3xl border bg-white p-8 shadow-2xl">

              <div className="mb-8">
                <h3 className="text-lg font-semibold">
                  Resume Analysis Report
                </h3>
              </div>

              <div className="space-y-6">

                <div>
                  <div className="flex justify-between">
                    <span>ATS Score</span>
                    <span className="font-bold">87/100</span>
                  </div>

                  <div className="mt-2 h-3 rounded-full bg-slate-200">
                    <div className="h-3 w-[87%] rounded-full bg-indigo-600" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-muted-foreground">
                      Match Score
                    </p>
                    <p className="text-2xl font-bold">
                      92%
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-muted-foreground">
                      Keywords
                    </p>
                    <p className="text-2xl font-bold">
                      12
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-muted-foreground">
                      Suggestions
                    </p>
                    <p className="text-2xl font-bold">
                      8
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-muted-foreground">
                      Strengths
                    </p>
                    <p className="text-2xl font-bold">
                      5
                    </p>
                  </div>

                </div>

                <div className="space-y-3">

                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    ATS Friendly Format
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Strong Technical Skills
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Well Structured Resume
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}



