"use client";

import { useState, useEffect } from "react";
import { Star, Quote, Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export default function Testimonials() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/feedback/getFeedback");
        const data = await res.json();

        setFeedbacks(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        console.error("Feedback error:", error);
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // ✅ EMPTY STATE
  if (!feedbacks.length) {
    return (
      <div className="text-center py-12 text-slate-500">
        No testimonials available yet.
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* Background blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-40" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-40" />

      <div className="container relative mx-auto px-4">

        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Loved by <span className="text-indigo-600">Job Seekers</span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Thousands of professionals improved their resumes and got more interviews.
          </p>
        </div>

        {/* CAROUSEL */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="mt-16 w-full relative"
        >
          <CarouselContent className="-ml-4 items-stretch">

            {feedbacks.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 shrink-0 flex"
              >
                {/* CARD */}
                <div className="flex w-full h-[260px] flex-col justify-between rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

                  {/* TOP */}
                  <div>
                    <div className="mb-5 flex justify-between">
                      <Quote className="h-7 w-7 text-indigo-600 rotate-180" />

                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= (item.rating || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* MESSAGE (2 LINE ONLY) */}
                    <p className="text-sm text-slate-600 italic leading-relaxed line-clamp-2 min-h-[40px]">
                      "{item.message}"
                    </p>
                  </div>

                  {/* USER */}
                  <div className="mt-5 flex items-center gap-3 border-t pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                      {item.user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-slate-900 truncate">
                        {item.user?.fullName || "Anonymous User"}
                      </h4>

                      <p className="text-xs text-slate-500">
                        {item.createdAt
                          ? format(new Date(item.createdAt), "dd MMM yyyy")
                          : ""}
                      </p>
                    </div>
                  </div>

                </div>
              </CarouselItem>
            ))}

          </CarouselContent>

          {/* NAVIGATION FIXED */}
          {feedbacks.length > 3 && (
            <>
              <CarouselPrevious className="hidden md:flex left-2 z-10" />
              <CarouselNext className="hidden md:flex right-2 z-10" />
            </>
          )}
        </Carousel>

        {/* STATS */}
        <div className="mt-16 grid gap-8 text-center md:grid-cols-3">
          <div>
            <h3 className="text-4xl font-bold text-indigo-600">50K+</h3>
            <p className="mt-2 text-slate-600">Resumes Analyzed</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-indigo-600">92%</h3>
            <p className="mt-2 text-slate-600">ATS Improvement</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-indigo-600">10K+</h3>
            <p className="mt-2 text-slate-600">Job Seekers Helped</p>
          </div>
        </div>

      </div>
    </section>
  );
}