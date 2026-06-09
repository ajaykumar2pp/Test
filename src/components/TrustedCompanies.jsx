import {
  Building2,
  Briefcase,
  Globe,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function TrustedCompanies() {
  const companies = [
    {
      name: "Google",
      icon: Globe,
    },
    {
      name: "Microsoft",
      icon: Building2,
    },
    {
      name: "Amazon",
      icon: Briefcase,
    },
    {
      name: "Meta",
      icon: Sparkles,
    },
    {
      name: "Netflix",
      icon: TrendingUp,
    },
    {
      name: "Spotify",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="border-y bg-white py-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            <ShieldCheck className="h-4 w-4" />
            Trusted by 10,000+ Job Seekers Worldwide
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            Helping candidates land interviews at
            <span className="text-indigo-600"> top companies</span>
          </h2>

          <p className="mt-3 text-slate-500">
            Optimize your resume for ATS systems used by leading organizations.
          </p>
        </div>

        {/* Company Logos */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

          {companies.map((company) => {
            const Icon = company.icon;

            return (
              <div
                key={company.name}
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  bg-white
                  px-5
                  py-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-indigo-200
                  hover:shadow-lg
                "
              >
                <Icon
                  className="
                    h-5
                    w-5
                    text-slate-400
                    transition-colors
                    duration-300
                    group-hover:text-indigo-600
                  "
                />

                <span
                  className="
                    font-semibold
                    text-slate-600
                    transition-colors
                    duration-300
                    group-hover:text-slate-900
                  "
                >
                  {company.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">50K+</span>
            Resumes Analyzed
          </div>

          <div className="h-4 w-px bg-slate-300" />

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">92%</span>
            Average ATS Match Improvement
          </div>

          <div className="h-4 w-px bg-slate-300" />

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">10K+</span>
            Successful Job Seekers
          </div>

        </div>

      </div>
    </section>
  );
}



// export default function TrustedCompanies() {
//   const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Spotify'];

//   return (
//     <section className="py-12 border-y bg-slate-50">
//       <div className="container mx-auto px-4 text-center">
//         <p className="text-sm font-medium text-slate-500">
//           Trusted by job seekers worldwide
//         </p>
//         <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-6">
//           {companies.map((company) => (
//             <div key={company} className="font-semibold text-slate-400">
//               {company}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }