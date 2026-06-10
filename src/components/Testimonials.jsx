"use client";

import { useState, useEffect } from "react";
import { Star, Quote, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";

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

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!feedbacks.length) {
    return (
      <div className="text-center py-12 text-slate-500">
        No testimonials available yet.
      </div>
    );
  }

  // ✅ only first 3 feedbacks
  const topFeedbacks = feedbacks.slice(0, 3);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 mb-4">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">What Users Say</h2>
          <p className="text-slate-600 mt-3">Real feedback from job seekers</p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 md:grid-cols-3">
          {topFeedbacks.map((item) => (
            <Card key={item.id} className="p-6 rounded-2xl shadow-sm">
              {/* TOP */}
              <div className="flex justify-between mb-4">
                <Quote className="h-6 w-6 text-indigo-600 rotate-180" />

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

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                {item.user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* MESSAGE */}
              <p className="text-sm text-slate-600 italic line-clamp-3">
                "{item.message}"
              </p>

              {/* USER */}
              <div className="mt-5 flex items-center gap-3 border-t pt-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                  {item.user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {item.user?.fullName || "Anonymous"}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {item.createdAt
                      ? format(new Date(item.createdAt), "dd MMM yyyy, hh:mm a")
                      : ""}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-12">
          <Link
            href="/feedback"
            className="inline-block px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            View All Feedback
          </Link>
        </div>
      </div>
    </section>
  );
}
