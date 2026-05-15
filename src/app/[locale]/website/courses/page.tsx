"use client";

import { useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { CourseCard } from "@/components/website/courses/course-card";
import { enrolledCourses } from "@/components/website/courses/mock-dashboard";

export default function CoursesPage() {
  const t = useTranslations("courses");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredCourses = useMemo(() => {
    return enrolledCourses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter = filter === "all" || course.term === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const visibleCourses = showAll
    ? filteredCourses
    : filteredCourses.slice(0, 6);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">{t("title")}</h1>

      <p className="mb-4 text-sm text-gray-500">
        {filteredCourses.length} {t("coursecount")}
      </p>

      {/* Filters + Search */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Filters */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-lg px-4 py-2 text-sm ${
              filter === "all" ? "bg-[#003c8a] text-white" : "bg-gray-200"
            }`}
          >
            {t("all")}
          </button>

          <button
            onClick={() => setFilter("first")}
            className={`rounded-lg px-4 py-2 text-sm ${
              filter === "first" ? "bg-[#003c8a] text-white" : "bg-gray-200"
            }`}
          >
            {t("firstTerm")}
          </button>

          <button
            onClick={() => setFilter("second")}
            className={`rounded-lg px-4 py-2 text-sm ${
              filter === "second" ? "bg-[#003c8a] text-white" : "bg-gray-200"
            }`}
          >
            {t("secondTerm")}
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 text-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 md:w-64"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* No results */}
      {filteredCourses.length === 0 && (
        <div className="mt-10 flex flex-col items-center gap-4 text-center text-gray-500">
          <p>{t("noResults")}</p>

          <button
            onClick={() => {
              setSearch("");
              setFilter("all");
              setShowAll(false);
            }}
            className="rounded-xl bg-[#003c8a] px-6 py-2 text-white transition hover:bg-blue-700"
          >
            {t("backbutton")}
          </button>
        </div>
      )}
      {/* Toggle Button */}
      {filteredCourses.length > 6 && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="rounded-xl bg-[#003c8a] px-6 py-2 text-white transition hover:bg-blue-700"
          >
            {showAll ? t("showless") : t("showall")}
          </button>
        </div>
      )}
    </div>
  );
}
