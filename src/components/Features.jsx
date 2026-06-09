import {
  BarChart3,
  Search,
  Sparkles,
  Scale,
  FileText,
  Download,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    title: "ATS Score Analysis",
    description:
      "Get a detailed ATS compatibility score and understand how recruiters' systems evaluate your resume.",
    icon: BarChart3,
  },
  {
    title: "Missing Keywords Detection",
    description:
      "Identify missing keywords from the job description to improve visibility and ranking.",
    icon: Search,
  },
  {
    title: "AI Suggestions",
    description:
      "Receive intelligent recommendations to strengthen your resume and increase interview chances.",
    icon: Sparkles,
  },
  {
    title: "Strengths & Weaknesses",
    description:
      "Discover what stands out and which areas need improvement for a stronger application.",
    icon: Scale,
  },
  {
    title: "Section-wise Feedback",
    description:
      "Analyze every section including summary, experience, skills, projects, and education.",
    icon: FileText,
  },
  {
    title: "PDF Report Download",
    description:
      "Download a professional report containing ATS score, suggestions, and optimization insights.",
    icon: Download,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-24"
    >
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-indigo-100 blur-3xl opacity-40" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-100 blur-3xl opacity-40" />

      <div className="container relative mx-auto px-4">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            Powerful Features
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Everything You Need to
            <span className="text-indigo-600">
              {" "}Optimize Your Resume
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Leverage AI-driven insights to improve ATS performance,
            identify missing opportunities, and maximize interview success.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  bg-white/80
                  p-7
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-indigo-200
                  hover:shadow-2xl
                "
              >
                {/* Gradient Top Line */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-300" />

                {/* Icon */}
                <div
                  className="
                    flex
                    h-14
                    w-14
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
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-600">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div
                  className="
                    mt-6
                    flex
                    items-center
                    text-indigo-600
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:opacity-100
                  "
                >
                  
                  {/* <ArrowUpRight className="ml-2 h-4 w-4" /> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


