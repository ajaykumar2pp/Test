"use client";

import { Formik, Form, ErrorMessage } from "formik";
import { Star, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { feedbackSchema } from "@/schemas/feedback-schema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, MessageSquarePlus } from "lucide-react";
import Link from "next/link";

const initialValues = {
  rating: 0,
  message: "",
};

export default function FeedbackPage() {
  const theme = {
    hero: "from-indigo-600 via-purple-600 to-pink-600",
    heroText: "text-white/90",
    button: "text-black",
  };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // console.log(values);

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full mx-auto">
      {/* Hero - Share Feedback */}

      <div
        className={`
    mb-8 rounded-[32px]
    bg-linear-to-r
    ${theme.hero}
    p-8 text-white shadow-xl
  `}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold leading-tight">
              Share Your Feedback & Help Us Improve 🚀
            </h2>

            <p className={`max-w-2xl text-sm md:text-base ${theme.heroText}`}>
              Your feedback helps us improve the platform. Share your
              experience, suggestions, or issues and help us build a better
              experience for everyone.
            </p>
          </div>

          <Button
            className={`
          h-12 rounded-2xl bg-white px-6
          hover:bg-slate-100
          shadow-md transition-all duration-300
          hover:scale-[1.02]
          cursor-pointer
          ${theme.button}
        `}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Share Feedback
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Share Your Feedback</CardTitle>
          <CardDescription>
            Help us improve your Resume Analyzer experience.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={feedbackSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting, handleChange }) => (
              <Form className="space-y-6">
                {/* Rating */}

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Rating
                  </Label>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFieldValue("rating", star)}
                      >
                        <Star
                          className={`h-8 w-8 transition ${
                            star <= values.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <ErrorMessage
                    name="rating"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Message */}

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Feedback Message
                  </Label>

                  <Textarea
                    name="message"
                    rows={10}
                    placeholder="Tell us about your experience..."
                    value={values.message}
                    className="min-h-48 max-h-64 reszize-y"
                    onChange={handleChange}
                  />

                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Feedback Button */}

                <div className="flex justify-end mt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="
      min-w-50 h-12 px-6 rounded-2xl cursor-pointer
      flex items-center justify-center gap-2
      bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600
      text-white shadow-md
      transition-all duration-300
      hover:scale-[1.02] hover:shadow-lg
      disabled:opacity-60 disabled:cursor-not-allowed
    "
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageSquarePlus className="w-4 h-4" />
                        Send Feedback
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
