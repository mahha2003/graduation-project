"use client";

import { useState } from "react";

import { QrCode } from "lucide-react";
import { useLocale } from "next-intl";

// استيراد معرف اللغة

export default function NextLecture() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const isRtl = locale === "ar";

  // نصوص الترجمة (يفضل لاحقاً وضعها في ملف JSON الخاص بالترجمات)
  const t = {
    welcome: isRtl ? "مرحباً بك مجدداً" : "Welcome Back",
    title: isRtl ? "لوحة التحكم الأكاديمية 🎓" : "Your Academic Dashboard 🎓",
    desc: isRtl
      ? "تتبع المحاضرات والإعلانات وجدولك الدراسي في مكان واحد."
      : "Track lectures, announcements, and your study schedule in one place.",
    courses: isRtl ? "المسارات" : "Courses",
    today: isRtl ? "اليوم" : "Today",
    lecturesCount: isRtl ? "3 محاضرات" : "3 Lectures",
    nextLect: isRtl ? "المحاضرة القادمة" : "Next Lecture",
    scan: isRtl ? "تسجيل" : "Scan",
    prof: isRtl ? "د. سارة جينكينز" : "Dr. Sarah Jenkins",
    loc: isRtl ? "مختبر 7، الجناح B" : "Lab 7, Wing B",
  };

  return (
    // استخدام dir={isRtl ? "rtl" : "ltr"} لقلب الجهات تلقائياً
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full rounded-xl bg-linear-to-r from-[#003C8A] to-[#1E3A8A] px-5 py-8 md:px-10"
    >
      <div className="mx-auto grid max-w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* LEFT SIDE (أصبح يميناً في العربي) */}
        <div
          className={`flex flex-col justify-center space-y-3 ${isRtl ? "text-right" : "text-left"}`}
        >
          <h2 className="text-[10px] font-bold tracking-widest text-blue-200 uppercase">
            {t.welcome}
          </h2>
          <h1 className="text-2xl font-extrabold text-white md:text-3xl">
            {t.title}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-blue-100/80">
            {t.desc}
          </p>

          <div className="flex gap-3 pt-2">
            <div className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 shadow-sm backdrop-blur-md">
              <p className="text-[10px] font-medium text-blue-200">
                {t.courses}
              </p>
              <p className="text-sm font-bold text-white">6</p>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 shadow-sm backdrop-blur-md">
              <p className="text-[10px] font-medium text-blue-200">{t.today}</p>
              <p className="text-sm font-bold text-white">{t.lecturesCount}</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (أصبح يساراً في العربي) */}
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-lg">
          <div className="relative z-10">
            <p className="text-[10px] font-semibold tracking-widest text-blue-200 uppercase">
              {t.nextLect}
            </p>
            <h3 className="mt-1 text-xl font-bold">Advanced Algorithms</h3>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-blue-100">
              <p className="flex items-center gap-2">👨‍🏫 {t.prof}</p>
              <p className="flex items-center gap-2">⏰ 14:00 - 15:30</p>
              <p className="flex items-center gap-2">📍 {t.loc}</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`absolute top-5 ${isRtl ? "left-5" : "right-5"} flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-indigo-400`}
          >
            <QrCode className="h-4 w-4" />
            {t.scan}
          </button>
        </div>
      </div>
    </section>
  );
}
