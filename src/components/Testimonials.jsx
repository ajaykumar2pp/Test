import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sahib",
    role: "Full Stack Developer",
    company: "Tech Startup",
    review:
      "ResumeAnalyzer increased my ATS score from 62% to 91%. Within two weeks I started receiving interview calls from multiple companies.",
  },
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    company: "Remote Agency",
    review:
      "The keyword suggestions were incredibly accurate. I optimized my resume and landed interviews at companies I previously couldn't reach.",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    company: "FinTech Company",
    review:
      "The section-by-section feedback helped me completely restructure my resume. The results were immediate and measurable.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-40" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-40" />

      <div className="container relative mx-auto px-4">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Loved by
            <span className="text-indigo-600"> Job Seekers</span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Thousands of professionals have improved their resumes,
            increased ATS scores, and secured more interviews.
          </p>

        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="
                group
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
              {/* Quote Icon */}
              <div className="mb-6 flex justify-between">

                <Quote className="h-8 w-8 text-indigo-600" />

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

              </div>

              {/* Review */}
              <p className="leading-relaxed text-slate-600">
                "{item.review}"
              </p>

              {/* User */}
              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-8 text-center md:grid-cols-3">

          <div>
            <h3 className="text-4xl font-bold text-indigo-600">
              50K+
            </h3>
            <p className="mt-2 text-slate-600">
              Resumes Analyzed
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-indigo-600">
              92%
            </h3>
            <p className="mt-2 text-slate-600">
              Average ATS Score Improvement
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-indigo-600">
              10K+
            </h3>
            <p className="mt-2 text-slate-600">
              Successful Job Seekers
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}