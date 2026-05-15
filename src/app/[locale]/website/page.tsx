"use client";

import { Announcement } from "@/app/[locale]/website/announcements/types";
import FAQSection from "@/app/[locale]/website/faq/faq-section";
import NextLecture from "@/app/[locale]/website/next-lecture-section";
import { LecturesSection } from "@/app/[locale]/website/schedule/schedule-section";
import AnnouncementsSection from "@/components/website/announcements/announcements-section";
import Blogs from "@/components/website/blogs/blogs";
import { CoursesSection } from "@/components/website/courses/courses-section";

export default function HomePage() {
  return (
    <main>
      <section className="px-5 py-0">
        <NextLecture />
      </section>

      <section className="px-5 py-5">
        <LecturesSection />
      </section>

      <section className="px-5 py-5">
        <CoursesSection />
      </section>
      <section className="px-5 py-5">
        <AnnouncementsSection />
      </section>
      <section className="px-5 py-5">
        <Blogs />
      </section>
      <section className="px-5 py-5">
        <FAQSection />
      </section>
    </main>
  );
}
