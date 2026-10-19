"use client";

import { m, useReducedMotion } from "motion/react";
import type { Review, RatingBreakdown } from "../types";

interface ServiceReviewsProps {
  ratingBreakdown: RatingBreakdown;
  reviews: Review[];
}

const STAR_KEYS = [5, 4, 3, 2, 1] as const;

function RatingBar({ star, percentage }: { star: number; percentage: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-3 text-right font-num text-xs text-ink-secondary">
        {star}
      </span>
      <svg
        aria-hidden="true"
        className="h-3 w-3 shrink-0 text-accent-terracotta"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <div className="flex-1 h-1.5 rounded-full bg-canvas-surface overflow-hidden">
        <div
          className="h-full rounded-full bg-ink transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-right font-num text-xs text-ink-muted">
        {percentage}%
      </span>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const shouldReduceMotion = useReducedMotion();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // First letter of author name
  const initial = review.author.charAt(0).toUpperCase();

  return (
    <m.article
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-3 border-b border-hairline-subtle pb-5 last:border-b-0"
    >
      <div className="flex items-center gap-3">
        {/* Avatar initial */}
        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-canvas-surface font-display text-xs font-bold text-ink/50">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-display text-sm font-semibold text-ink">
              {review.author}
            </p>
            {review.verified && (
              <span className="inline-flex items-center gap-0.5 text-accent-indigo">
                <svg
                  aria-hidden="true"
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="font-sans text-[10px] font-medium">Verified</span>
              </span>
            )}
          </div>
          <p className="font-num text-[11px] text-ink-muted">{formatDate(review.date)}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            aria-hidden="true"
            className={`h-3.5 w-3.5 ${i < review.rating ? "text-accent-terracotta" : "text-hairline"}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      <p className="font-sans text-sm leading-relaxed text-ink-secondary">
        {review.comment}
      </p>
    </m.article>
  );
}

export function ServiceReviews({
  ratingBreakdown,
  reviews,
}: ServiceReviewsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.section
      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8"
    >
      <h2 className="font-display text-lg font-semibold text-ink">
        Ratings & Reviews
      </h2>

      {/* Rating summary + bars */}
      <div className="flex gap-8 sm:gap-12">
        {/* Big average number */}
        <div className="flex flex-col items-center justify-center">
          <span className="font-num text-4xl font-bold text-ink tabular-nums">
            {ratingBreakdown.average}
          </span>
          <div className="mt-1 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                aria-hidden="true"
                className={`h-3 w-3 ${i < Math.round(ratingBreakdown.average) ? "text-accent-terracotta" : "text-hairline"}`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="mt-1.5 font-num text-xs text-ink-muted">
            {ratingBreakdown.total}
          </span>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 space-y-1.5">
          {STAR_KEYS.map((star) => (
            <RatingBar
              key={star}
              star={star}
              percentage={ratingBreakdown.distribution[star]}
            />
          ))}
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-5 border-t border-hairline-subtle pt-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </m.section>
  );
}
