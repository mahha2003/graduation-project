"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

interface FeaturedNews {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  buttonText: string;
}

interface Props {
  items: FeaturedNews[];
}

export default function FeaturedNewsSection({ items }: Props) {
  const t = useTranslations("featuredNews");

  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const current = items[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section className="w-full py-8">
      {/* HEADER */}
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          {t("title")}
        </h2>
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl bg-white shadow-md md:grid-cols-2 dark:bg-slate-900">
        {/* IMAGE SIDE */}
        <div className="h-[300px] w-full md:h-[420px]">
          <img
            src={current.image}
            alt={current.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* CONTENT SIDE */}
        <div className="space-y-4 p-6 md:p-10">
          <p className="text-sm text-slate-400">{current.date}</p>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            {current.title}
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-300">
            {current.description}
          </p>

          <button className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700">
            {current.buttonText}
          </button>

          {/* ARROWS */}
          <div className="flex items-center gap-3 pt-6">
            <button
              onClick={prevSlide}
              className="rounded-full border px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              className="rounded-full border px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              →
            </button>
          </div>

          {/* DOTS */}
          <div className="flex gap-2 pt-4">
            {items.map((_, i) => (
              <span
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 w-2 cursor-pointer rounded-full ${
                  i === activeIndex ? "bg-blue-600" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
