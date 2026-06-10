"use client";

import { useEffect, useState } from "react";
import { Star, Quote, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch("/api/feedback/getFeedback");
        const data = await res.json();

        setFeedbacks(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <>
    <Navbar />
     <div className="container mx-auto px-4 py-5">
        
      <h1 className="text-3xl font-bold mb-10 text-center">All Feedback</h1>

      <div className="grid gap-6 md:grid-cols-3 mt-4">
        {feedbacks.map((item) => (
          <Card key={item.id} className="p-6 rounded-2xl">
            <div className="flex justify-between mb-4">
              <Quote className="text-indigo-600 rotate-180" />

              <div className="flex gap-1">
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

            <p className="text-sm italic text-slate-600 line-clamp-4">
              "{item.message}"
            </p>

            <div className="mt-5 border-t pt-4 flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 shrink-0">
                {item.user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* Name + Date */}
              <div className="flex flex-col overflow-hidden">
                <h4 className="font-semibold text-slate-900 truncate">
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
    </div>
    </>
   
  );
}
