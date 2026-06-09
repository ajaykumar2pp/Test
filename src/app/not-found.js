import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-indigo-50 px-4">

      {/* Background Glow */}
      <div className="absolute -top-40 h-96 w-96 rounded-full bg-indigo-200 blur-3xl opacity-40" />
      <div className="absolute -bottom-40 h-96 w-96 rounded-full bg-purple-200 blur-3xl opacity-40" />

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white/70 p-8 text-center shadow-xl backdrop-blur-xl">

        {/* Big 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight text-indigo-600">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          Oops! Page not found
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          The page you are looking for might have been removed, renamed, or
          doesn’t exist anymore.
        </p>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

        {/* Buttons */}
        <div className="flex flex-col gap-3">

          <Link
            href="/"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
          >
            Go back home
          </Link>

          <Link
            href="/contact"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Contact Support
          </Link>

        </div>

        {/* Small hint */}
        <p className="mt-6 text-xs text-slate-400">
          Error code: PAGE_NOT_FOUND
        </p>

      </div>
    </div>
  );
}