"use client";
import React from "react";
import { Star } from "lucide-react";
import { DUMMY_PRODUCT_RATINGS } from "@/constant/DUMMY_PRODUCT_RATINGS";

export default function ProductRatingsSection() {
  const ratings = DUMMY_PRODUCT_RATINGS;
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        <Star className="w-6 h-6 text-yellow-400" /> تقييمات العملاء
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 items-start">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-4 h-4" fill={i <= Math.round(ratings.average) ? "#fde047" : "#e5e7eb"} stroke="#fde047" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">({ratings.average} من 5) - {ratings.count} تقييمات</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {ratings.comments.length > 0 ? ratings.comments.map((c, idx) => (
            <div key={idx} className="border rounded-lg p-3 bg-muted/50">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-3 h-3 text-yellow-400" fill="#fde047" stroke="#fde047" />
                <span className="font-semibold text-primary text-sm">{c.user}</span>
                <span className="text-xs text-muted-foreground">({c.rating} من 5)</span>
              </div>
              <div className="text-sm text-muted-foreground">{c.comment}</div>
            </div>
          )) : (
            <div className="rounded bg-muted p-3 text-xs text-muted-foreground">لا توجد تقييمات متاحة بعد لهذا المنتج.</div>
          )}
        </div>
      </div>
    </div>
  );
}
