"use client";

// أضيفيها إذا لم تكن موجودة لأن المكونات داخلها "use client"
import NextLecture from "@/components/layouts/next-lecture";
import { CoursesSection } from "@/components/layouts/schedule+courses-cards/courses-section";
// تأكدي من صحة هذه المسارات بناءً على أماكن الملفات لديكِ
import { LecturesSection } from "@/components/layouts/schedule+courses-cards/lectures-section";
import {
  enrolledCourses,
  schedulePdf,
  todayLectures,
} from "@/components/layouts/schedule+courses-cards/mock-dashboard";

export default function HomePage() {
  return (
    <main>
      <section className="px-5 py-0">
        <NextLecture />
      </section>

      <section className="px-5 py-5">
        {/* تأكدي أن LecturesSection مُصدر بشكل صحيح من ملفه */}
        <LecturesSection lectures={todayLectures} schedulePdf={schedulePdf} />
      </section>

      <section className="px-5 py-5">
        {/* تأكدي أن CoursesSection مُصدر بشكل صحيح من ملفه */}
        <CoursesSection courses={enrolledCourses} />
      </section>
    </main>
  );
}
