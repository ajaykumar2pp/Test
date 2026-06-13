"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeReport from "@/components/pdf/ResumeReport";
import { Download, Loader } from "lucide-react";
import {
  Building2,
  Briefcase,
  Calendar,
  FileText,
  Mail,
  Printer,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

export default function ResumeResult({ resumeAnalysis }) {
  const email = resumeAnalysis?.user?.email;

  // console.log("check User Email via user... :", resumeAnalysis?.user?.email);

  const [emailLoading, setEmailLoading] = useState(false);
  // const data = resumeAnalysis?.aiAnalysis;
  const pdfData = resumeAnalysis;
  // console.log("company data :", resumeAnalysis)

  if (!pdfData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-500">
          No analysis found
        </h2>
      </div>
    );
  }
  const sendReportEmail = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setEmailLoading(true);

    // const loadingToast = toast.loading("Sending report...");

    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reportData: pdfData,
        }),
      });

      const result = await res.json();

      // toast.dismiss(loadingToast);

      if (result.success) {
        toast.success("Email sent successfully 🚀");
      } else {
        toast.error(result.message || "Failed to send email");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong while sending email");
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="rounded-2xl">
      {/* Action Buttons */}
      <div
        className="
    print:hidden
    grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-3
    gap-3
    w-full
  "
      >
        {/* Email Button */}
        <button
          onClick={sendReportEmail}
          disabled={emailLoading}
          className="
      w-full
      min-h-13
      group
      relative
      overflow-hidden
      rounded-xl
      bg-linear-to-r
      from-emerald-600
      via-teal-600
      to-cyan-600
      px-4
      py-3
      font-semibold
      text-white
      shadow-xl
      transition-all
      duration-300
      sm:hover:-translate-y-1
      hover:shadow-emerald-500/40
      disabled:opacity-50
      disabled:cursor-not-allowed
      cursor-pointer
    "
        >
          <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base">
            {emailLoading ? (
              <>
                <Loader className="h-5 w-5 animate-spin shrink-0" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-5 w-5 shrink-0" />
                Send to Email
              </>
            )}
          </span>
        </button>

        {/* Print PDF Button */}
        <button
          onClick={() => window.print()}
          className="
      w-full
      min-h-13
      group
      relative
      overflow-hidden
      rounded-xl
      bg-linear-to-r
      from-gray-700
      via-gray-800
      to-black
      px-4
      py-3
      font-semibold
      text-white
      shadow-xl
      transition-all
      duration-300
      sm:hover:-translate-y-1
      hover:shadow-black/40
      cursor-pointer
    "
        >
          <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base">
            <Printer className="h-5 w-5 shrink-0" />
            Print Report
          </span>
        </button>

        {/* Download PDF Button */}
        <PDFDownloadLink
          document={<ResumeReport data={pdfData} />}
          fileName="resume-analysis-report.pdf"
          className="w-full"
        >
          {({ loading }) => (
            <button
              className="
          w-full
          min-h-13
          group
          relative
          overflow-hidden
          rounded-xl
          bg-linear-to-r
          from-violet-600
          via-purple-600
          to-indigo-600
          px-4
          py-3
          font-semibold
          text-white
          shadow-xl
          transition-all
          duration-300
          sm:hover:-translate-y-1
          hover:shadow-violet-500/40
          cursor-pointer
        "
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base">
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin shrink-0" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
                    Download ATS Report
                  </>
                )}
              </span>
            </button>
          )}
        </PDFDownloadLink>
      </div>
      {/* Company Name or Position */}
      <div className="mt-5 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-3xl font-semibold text-slate-900">
            Resume Information
          </h2>

          <p className="text-sm text-slate-500">
            Details used for this resume analysis
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div className="rounded-xl border bg-slate-50 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
              <Building2 className="h-5 w-5 text-indigo-600" />
            </div>

            <p className="uppercase text-xl font-semibold tracking-tight text-slate-900">
              Company Name
            </p>

            <p
              title={resumeAnalysis.companyName}
              className="mt-1 line-clamp-2 font-medium text-slate-900"
            >
              {resumeAnalysis.companyName || "Not Provided"}
            </p>
          </div>

          {/* Job Role */}
          <div className="rounded-xl border bg-slate-50 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
              <Briefcase className="h-5 w-5 text-violet-600" />
            </div>

            <p className=" uppercase text-xl font-semibold tracking-tight text-slate-900">
              Job Title
            </p>

            <p
              title={resumeAnalysis.jobRole}
              className="mt-1 line-clamp-2 font-medium text-slate-900"
            >
              {resumeAnalysis.jobRole || "Not Provided"}
            </p>
          </div>

          {/* Resume */}
          <div className="rounded-xl border bg-slate-50 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>

            <p className="uppercase text-xl font-semibold tracking-tight text-slate-900">
              Resume Name
            </p>

            <p
              title={resumeAnalysis.fileName}
              className="mt-1 truncate font-medium text-slate-900"
            >
              {resumeAnalysis.fileName || "Unknown"}
            </p>
          </div>

          {/* Date */}
          <div className="rounded-xl border bg-slate-50 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <Calendar className="h-5 w-5 text-emerald-600" />
            </div>

            <p className="uppercase text-xl font-semibold tracking-tight text-slate-900">
              Analyzed On
            </p>

            <p className="mt-1 font-medium text-slate-900">
              {format(
                new Date(resumeAnalysis.createdAt),
                "dd MMM yyyy, hh:mm a",
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border rounded-xl shadow-sm p-6 mt-5">
        <h1 className="text-xl  font-bold">ATS Score: {pdfData?.aiAnalysis?.atsScore}/100</h1>

        <p className="mt-2 text-gray-600">
          Match Percentage: {pdfData?.aiAnalysis?.matchPercentage}%
        </p>

        <p className="mt-4 text-gray-700">{pdfData?.aiAnalysis?.finalVerdict}</p>
      </div>

      {/* Resume Summary */}
      <div className="bg-white border rounded-xl p-6 mt-5 ">
        <h2 className="text-xl font-semibold mb-3">Resume Summary</h2>

        <p className="text-gray-700">{pdfData?.aiAnalysis?.resumeSummary}</p>
      </div>

      {/* Score Gauges */}
      <div className="grid md:grid-cols-3 gap-4 mt-5">
        <div className="border rounded-xl p-5 bg-white">
          <h3 className="text-xl  font-bold">ATS Compatibility</h3>
          <p className="text-3xl font-bold mt-2">
            {pdfData?.aiAnalysis?.resumeScoreGauge?.atsCompatibility}%
          </p>
        </div>

        <div className="border rounded-xl p-5 bg-white">
          <h3 className="text-xl  font-bold">Resume Quality</h3>
          <p className="text-3xl font-bold mt-2">
            {pdfData?.aiAnalysis?.resumeScoreGauge?.resumeQuality}%
          </p>
        </div>

        <div className="border rounded-xl p-5 bg-white">
          <h3 className="text-xl  font-bold">Recruiter Readability</h3>
          <p className="text-3xl font-bold mt-2">
            {pdfData?.aiAnalysis?.resumeScoreGauge?.recruiterReadability}%
          </p>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="bg-white border rounded-xl p-6 mt-5">
        <h2 className="text-xl font-bold mb-4">Skill Match Analysis</h2>

        <div className="space-y-4">
          {pdfData?.aiAnalysis?.skillMatchAnalysis?.matchedSkills?.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{skill.skill}</span>
                <span>{skill.score}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${skill.score}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="bg-white border rounded-xl p-6 mt-5">
        <h2 className="text-xl font-bold text-red-600">Missing Skills</h2>

        <div className="flex flex-wrap gap-2 mt-4">
          {pdfData?.aiAnalysis?.skillMatchAnalysis?.missingSkills?.map((skill, index) => (
            <span
              key={index}
              className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Recommended Skills */}
      <div className="bg-white border rounded-xl p-6 mt-5">
        <h2 className="text-xl font-bold text-blue-600">Recommended Skills</h2>

        <div className="flex flex-wrap gap-2 mt-4">
          {pdfData?.aiAnalysis?.skillMatchAnalysis?.recommendedSkills?.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Resume Strengths */}
      <div className="bg-white border rounded-xl p-6 mt-5">
        <h2 className="text-xl font-bold text-green-600">Resume Strengths</h2>

        <ul className="list-disc ml-6 mt-4 space-y-2">
          {pdfData?.aiAnalysis?.resumeStrengths?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Resume Weaknesses */}
      <div className="bg-white border rounded-xl p-6 mt-5">
        <h2 className="text-xl font-bold text-red-600">Resume Weaknesses</h2>

        <ul className="list-disc ml-6 mt-4 space-y-2">
          {pdfData?.aiAnalysis?.resumeWeaknesses?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Missing Keywords */}
      <div className="bg-white border rounded-xl p-6 mt-5">
        <h2 className="text-xl font-bold">Missing Keywords</h2>

        <div className="flex flex-wrap gap-2 mt-4">
          {pdfData?.aiAnalysis?.missingKeywordsAnalysis?.keywords?.map((keyword, index) => (
            <span
              key={index}
              className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Improvements */}
      <div className="bg-white border rounded-xl p-6 mt-5">
        <h2 className="text-xl font-bold">Improvement Suggestions</h2>

        <ul className="list-disc ml-6 mt-4 space-y-2">
          {pdfData?.aiAnalysis?.improvementSuggestions?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Career Coach */}
      <div className="bg-white border rounded-xl p-6 mt-5">
        <h2 className="text-xl font-bold">AI Career Coach</h2>

        <p className="mt-3 text-gray-700">{pdfData?.aiAnalysis?.careerCoach?.overallAdvice}</p>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Recommended Learning Path</h3>

          <ul className="list-disc ml-6">
            {pdfData?.aiAnalysis?.careerCoach?.recommendedLearningPath?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interview Questions */}
      <div className="bg-white border rounded-xl p-6 mt-5">
        <h2 className="text-xl font-bold">Interview Questions</h2>

        <div className="mt-5">
          <h3 className="font-semibold">Technical Questions</h3>

          <ul className="list-disc ml-6 mt-2">
            {pdfData?.aiAnalysis?.interviewQuestions?.technical?.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <h3 className="font-semibold">HR Questions</h3>

          <ul className="list-disc ml-6 mt-2">
            {pdfData?.aiAnalysis?.interviewQuestions?.hr?.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
