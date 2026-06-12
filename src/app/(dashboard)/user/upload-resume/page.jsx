"use client";

import { useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import { useSession } from "next-auth/react";

import {
  Building2,
  Briefcase,
  FileText,
  Upload,
  Loader,
  FileSearch,
  FileBadge,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  companyName: Yup.string().trim().required("Company name is required"),

  jobTitle: Yup.string().trim().required("Job title is required"),

  jobDescription: Yup.string()
    .trim()
    .required("Job description is required")
    .min(50, "Please enter at least 50 characters"),

  resume: Yup.mixed()
    .required("Resume is required")
    .test("fileFormat", "Only PDF and DOCX files are allowed", (file) => {
      if (!file) return false;

      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      return allowedTypes.includes(file.type);
    })
    .test("fileSize", "File size must be less than 10 MB", (file) => {
      if (!file) return false;

      return file.size <= 10 * 1024 * 1024;
    }),
});

const initialValues = {
  companyName: "",
  jobTitle: "",
  jobDescription: "",
  resume: null,
};

export default function ResumeAnalyzeForm() {
  const [selectedFile, setSelectedFile] = useState(null);

  const router = useRouter();

  // SESSION
  const { data: session } = useSession();

  // GENDER THEME
  const isMale = session?.user?.gender === "Male";

  const theme = isMale
    ? {
        header: "from-blue-50 via-white to-cyan-50",

        focus: "focus-visible:ring-blue-500",

        uploadBorder: "hover:border-blue-500",

        uploadBg: "hover:bg-blue-50/50",

        gradient: "from-blue-500/5 to-cyan-500/5",

        icon: "text-blue-600",

        fileBg: "bg-blue-100",

        button:
          "from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600",

        buttonText: "text-blue-600",
      }
    : {
        header: "from-pink-50 via-white to-fuchsia-50",

        focus: "focus-visible:ring-pink-500",

        uploadBorder: "hover:border-pink-500",

        uploadBg: "hover:bg-pink-50/50",

        gradient: "from-pink-500/5 to-fuchsia-500/5",

        icon: "text-pink-600",

        fileBg: "bg-pink-100",

        button:
          "from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600",

        buttonText: "text-pink-600",
      };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("companyName", values.companyName);

      formData.append("jobTitle", values.jobTitle);

      formData.append("jobDescription", values.jobDescription);

      formData.append("resume", values.resume);

      const response = await fetch("/api/extract-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("API Response:", data);

      // localStorage.setItem("resumeAnalysis", JSON.stringify(data.analysis));

      resetForm();

      setSelectedFile(null);

      router.push(`/user/resume-result/${data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="overflow-hidden border-0 shadow-xl rounded-[32px]">
        {/* Header */}
        <CardHeader
          className={`
            border-b
            bg-linear-to-r
            ${theme.header}
          `}
        >
          <CardTitle className="text-3xl font-bold">
            Analyze Your Resume
          </CardTitle>

          <CardDescription className="text-base">
            Compare your resume against a job description and get ATS insights,
            keyword matches, missing skills, and improvement suggestions.
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-6 md:p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Company */}
                <div>
                  <Label className="mb-2 block">Company Name<span className="text-rose-500">*</span></Label>

                  <div className="relative">
                    <Building2
                      className={`
                        absolute left-3 top-3 h-4 w-4
                        text-muted-foreground
                      `}
                    />

                    <Field
                      as={Input}
                      name="companyName"
                      placeholder="Microsoft"
                      className={`
                        pl-10 transition-all duration-300
                        focus-visible:ring-2
                        ${theme.focus}
                      `}
                    />
                  </div>

                  <ErrorMessage
                    name="companyName"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* Job Title */}
                <div>
                  <Label className="mb-2 block">Job Title<span className="text-rose-500">*</span></Label>

                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Field
                      as={Input}
                      name="jobTitle"
                      placeholder="Full Stack Developer"
                      className={`
                        pl-10 transition-all duration-300
                        focus-visible:ring-2
                        ${theme.focus}
                      `}
                    />
                  </div>

                  <ErrorMessage
                    name="jobTitle"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label className="mb-2 block">Job Description<span className="text-rose-500">*</span></Label>

                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Field
                      as={Textarea}
                      rows={8}
                      name="jobDescription"
                      placeholder="Paste complete job description here..."
                      className={`
                        pl-10 resize-none
                        transition-all duration-300
                        focus-visible:ring-2
                        ${theme.focus}
                      `}
                    />
                  </div>

                  <ErrorMessage
                    name="jobDescription"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* Upload */}
                <div>
                  <Label className="mb-2 block">Upload Resume<span className="text-rose-500">*</span></Label>

                  <label
                    className={`
                      group relative flex cursor-pointer
                      flex-col items-center justify-center
                      overflow-hidden rounded-3xl
                      border-2 border-dashed
                      border-slate-300 p-10
                      transition-all duration-300
                      hover:shadow-lg
                      ${theme.uploadBorder}
                      ${theme.uploadBg}
                    `}
                  >
                    {/* Gradient */}
                    <div
                      className={`
                        absolute inset-0
                        bg-linear-to-r
                        opacity-0 transition-opacity
                        duration-300
                        group-hover:opacity-100
                        ${theme.gradient}
                      `}
                    />

                    <div className="relative z-10 flex flex-col items-center">
                      <Upload
                        className={`
                          mb-4 h-12 w-12
                          transition-all duration-300
                          group-hover:scale-110
                          group-hover:-translate-y-1
                          ${theme.icon}
                        `}
                      />

                      <p className="font-semibold">Click to Upload Resume</p>

                      <p className="mt-2 text-sm text-muted-foreground">
                        PDF or DOCX • Maximum 10MB
                      </p>
                    </div>

                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        setFieldValue("resume", file);

                        setSelectedFile(file);
                      }}
                    />
                  </label>

                  {/* Selected File */}
                  {selectedFile && (
                    <div
                      className="
                        mt-4 flex items-center
                        justify-between rounded-2xl
                        border bg-slate-50 p-4
                        shadow-sm
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            rounded-xl p-2
                            ${theme.fileBg}
                          `}
                        >
                          <FileBadge
                            className={`
                              h-5 w-5
                              ${theme.buttonText}
                            `}
                          />
                        </div>

                        <div>
                          <p className="text-sm font-medium">
                            {selectedFile.name}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <ErrorMessage
                    name="resume"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    h-12 w-full cursor-pointer
                    bg-linear-to-r text-white
                    transition-all duration-300
                    hover:scale-[1.01]
                    ${theme.button}
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <FileSearch className="mr-2 h-4 w-4" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
