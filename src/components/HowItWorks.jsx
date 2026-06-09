import {
  Upload,
  FileText,
  Sparkles,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Upload Resume",
    description:
      "Upload your resume in PDF or DOCX format securely within seconds.",
    icon: Upload,
  },
  {
    title: "Paste Job Description",
    description:
      "Add the target job description to compare your resume against ATS requirements.",
    icon: FileText,
  },
  {
    title: "AI Analysis",
    description:
      "Our AI evaluates ATS compatibility, keywords, formatting, and content quality.",
    icon: Sparkles,
  },
  {
    title: "Get Detailed Results",
    description:
      "Receive ATS score, missing keywords, strengths, weaknesses, and recommendations.",
    icon: BarChart3,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-50 py-24"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-40" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-40" />

      <div className="container relative mx-auto px-4">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Optimize Your Resume in
            <span className="text-indigo-600"> Four Simple Steps</span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Upload your resume, let AI analyze it, and receive
            actionable insights to improve your chances of landing interviews.
          </p>

        </div>

        {/* Steps */}
        <div className="relative mt-20">

          {/* Connection Line Desktop */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200 lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="
                    group
                    relative
                    rounded-3xl
                    border
                    bg-white
                    p-8
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-indigo-200
                    hover:shadow-xl
                  "
                >
                  {/* Step Number */}
                  <div className="absolute right-6 top-6 text-4xl font-bold text-slate-100">
                    0{index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-indigo-50
                      text-indigo-600
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-slate-600">
                    {step.description}
                  </p>

                  {/* Arrow */}
                  {index !== steps.length - 1 && (
                    <div className="mt-6 flex items-center text-indigo-600">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            className="
              rounded-xl
              bg-indigo-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-indigo-700
            "
          >
            Start Free Analysis
          </button>
        </div>

      </div>
    </section>
  );
}

