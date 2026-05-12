"use client";

import AnnouncementsSection from "@/components/layouts/announcements/announcements-section";
import { Announcement } from "@/components/layouts/announcements/types";
import FAQSection from "@/components/layouts/faq/faq-secrion";
import FeaturedNewsSection from "@/components/layouts/news/FeaturedNewsSection";
import NextLecture from "@/components/layouts/next-lecture";
import { CoursesSection } from "@/components/layouts/schedule+courses-cards/courses-section";
import { LecturesSection } from "@/components/layouts/schedule+courses-cards/lectures-section";
import {
  enrolledCourses,
  schedulePdf,
  todayLectures,
} from "@/components/layouts/schedule+courses-cards/mock-dashboard";

// for ann page
const announcementsData: Announcement[] = [
  {
    id: "1",
    title: "regularTitle",
    description: "regularDescription",
    category: "regular",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "importantTitle",
    description: "importantDescription",
    category: "important",
    createdAt: "Yesterday",
  },
  {
    id: "3",
    title: "emergencyTitle",
    description: "emergencyDescription",  
    category: "emergency",
    createdAt: "Just now",
  },
] as const;

//for  page news
const featuredItems = [
  {
    id: "1",
    title: "University Hackathon 2026",
    description:
      "Join the largest tech competition on campus where students come together to develop innovative ideas and creative digital solutions in an inspiring competitive environment",
    image: "/images/hackathon.jpg",
    date: "May 12, 2026",
    buttonText: "Join Now",
  },
  {
    id: "2",
    title: "IT collage graduate seasion",
    description:
      "The graduation season of the Faculty of Information Technology, celebrating students academic achievements and the beginning of their professional journey in the tech world.",
    image: "/images/IT.jpg",
    date: "May 18, 2026",
    buttonText: "Explore",
  },
  {
    id: "3",
    title: "Examination process at Damascus University",
    description:
      "Learn about the examination process at Damascus University, from organization to result announcement, including all procedures and regulations ensuring transparency.",
    image: "/images/damas.jpg",
    date: "May 25, 2026",
    buttonText: "Explore",
  },
];
// for FAQ
const faqItems = [
  {
    id: "1",
    question: "How do I register for courses?",
    answer:
      "Course registration opens before the semester starts. opens before the semester starts.opens before the semester starts.",
  },
  {
    id: "2",
    question: "Where can I download my transcript?",
    answer: "You can download it from the student portal.",
  },
  {
    id: "3",
    question: "How can I contact support?",
    answer: "You can contact support through the dashboard.",
  },
];
export default function HomePage() {
  return (
    <main>
      <section className="px-5 py-0">
        <NextLecture />
      </section>

      <section className="px-5 py-5">
        <LecturesSection lectures={todayLectures} schedulePdf={schedulePdf} />
      </section>

      <section className="px-5 py-5">
        <CoursesSection courses={enrolledCourses} />
      </section>
      <section className="px-5 py-5">
        <AnnouncementsSection announcements={announcementsData} />
      </section>
      <section className="px-5 py-5">
        <FeaturedNewsSection items={featuredItems} />
      </section>
      <section className="px-5 py-5">
        <FAQSection items={faqItems} image="/images/faqimg.jpg" />
      </section>
    </main>
  );
}
