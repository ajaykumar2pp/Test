"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeReport from "@/components/pdf/ResumeReport";
import { Download, Loader2 } from "lucide-react";
import {
  Building2,
  Briefcase,
  Calendar,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

export default function ResumeResul({ resumeAnalysis }) {
  const data = resumeAnalysis?.aiAnalysis;

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-500">
          No analysis found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Download Link */}

      <div className="w-full flex justify-end">
        <PDFDownloadLink
          document={<ResumeReport data={data} />}
          fileName="resume-analysis-report.pdf"
        >
          {({ loading }) => (
            <button className="group relative overflow-hidden rounded-xl bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-500/40 cursor-pointer">
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full " />

              <span className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                    Download ATS Report
                  </>
                )}
              </span>
            </button>
          )}
        </PDFDownloadLink>
      </div>

      {/* Header */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold">ATS Score: {data.atsScore}/100</h1>

        <p className="mt-2 text-gray-600">
          Match Percentage: {data.matchPercentage}%
        </p>

        <p className="mt-4 text-gray-700">{data.finalVerdict}</p>
      </div>

      {/* Resume Summary */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">Resume Summary</h2>

        <p className="text-gray-700">{data.resumeSummary}</p>
      </div>

      {/* Score Gauges */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-5 bg-white">
          <h3 className="font-semibold">ATS Compatibility</h3>
          <p className="text-3xl font-bold mt-2">
            {data.resumeScoreGauge?.atsCompatibility}%
          </p>
        </div>

        <div className="border rounded-xl p-5 bg-white">
          <h3 className="font-semibold">Resume Quality</h3>
          <p className="text-3xl font-bold mt-2">
            {data.resumeScoreGauge?.resumeQuality}%
          </p>
        </div>

        <div className="border rounded-xl p-5 bg-white">
          <h3 className="font-semibold">Recruiter Readability</h3>
          <p className="text-3xl font-bold mt-2">
            {data.resumeScoreGauge?.recruiterReadability}%
          </p>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Skill Match Analysis</h2>

        <div className="space-y-4">
          {data.skillMatchAnalysis?.matchedSkills?.map((skill, index) => (
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
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-red-600">Missing Skills</h2>

        <div className="flex flex-wrap gap-2 mt-4">
          {data.skillMatchAnalysis?.missingSkills?.map((skill, index) => (
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
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-600">
          Recommended Skills
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">
          {data.skillMatchAnalysis?.recommendedSkills?.map((skill, index) => (
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
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-green-600">
          Resume Strengths
        </h2>

        <ul className="list-disc ml-6 mt-4 space-y-2">
          {data.resumeStrengths?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Resume Weaknesses */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-red-600">
          Resume Weaknesses
        </h2>

        <ul className="list-disc ml-6 mt-4 space-y-2">
          {data.resumeWeaknesses?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Missing Keywords */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold">Missing Keywords</h2>

        <div className="flex flex-wrap gap-2 mt-4">
          {data.missingKeywordsAnalysis?.keywords?.map((keyword, index) => (
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
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold">Improvement Suggestions</h2>

        <ul className="list-disc ml-6 mt-4 space-y-2">
          {data.improvementSuggestions?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Career Coach */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold">AI Career Coach</h2>

        <p className="mt-3 text-gray-700">{data.careerCoach?.overallAdvice}</p>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Recommended Learning Path</h3>

          <ul className="list-disc ml-6">
            {data.careerCoach?.recommendedLearningPath?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interview Questions */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold">Interview Questions</h2>

        <div className="mt-5">
          <h3 className="font-semibold">Technical Questions</h3>

          <ul className="list-disc ml-6 mt-2">
            {data.interviewQuestions?.technical?.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <h3 className="font-semibold">HR Questions</h3>

          <ul className="list-disc ml-6 mt-2">
            {data.interviewQuestions?.hr?.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


export function TypographyH3() {
  return (
    <h3 className="scroll-m-20 ">
      The Joke Tax
    </h3>
  )
}
