"use client";

import { Formik, Form, ErrorMessage } from "formik";
import { Star } from "lucide-react";
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

const initialValues = {
  rating: 0,
  message: "",
};

export default function FeedbackPage() {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);

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
                    className="min-h-100 max-h-400 reszize-y"
                    onChange={handleChange}
                  />

                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Feedback Button */}
                <div className="flex justify-end mt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Feedback...
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
