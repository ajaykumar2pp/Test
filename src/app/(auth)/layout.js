"use client";

import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100">
        <div className="grid md:grid-cols-2">
          {/* Left Side Image */}
          <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-700 p-10">
            <div className="relative w-full h-[650px]">
              <Image
                src="/resume1.png"
                alt="Resume Analyzer"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                draggable={false}
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">
              {/* Logo */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center">
                  Resume
                  <span className="text-violet-600 ms-2">Analyzer</span>
                </h1>

                <p className="text-center text-lg font-semibold text-gray-600 mt-2">
                  Analyze your resume, improve ATS score and get AI-powered
                  suggestions instantly.
                </p>
              </div>

              {/* Form Content */}
              <div className="space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
