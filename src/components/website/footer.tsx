"use client";

import Image from "next/image";

// import Link from "next/link";
// import { LanguageSwitcher } from "./language-switcher";
import { Facebook, Instagram, Linkedin, Send } from "lucide-react";
import { useLocale } from "next-intl";

import { Link } from "@/i18n/routing";

export function Footer() {
  const locale = useLocale();
  const isRtl = locale === "ar";

  // نصوص الترجمة
  const links = {
    home: isRtl ? "الرئيسية" : "Home",
    courses: isRtl ? "المسارات" : "Courses",
    announcements: isRtl ? "الإعلانات" : "Announcements",
    faq: isRtl ? "الأسئلة الشائعة" : "FAQ",
    blogs: isRtl ? "المدونة" : "Blogs",
    rights: isRtl ? "جميع الحقوق محفوظة." : "All rights reserved.",
    uni: isRtl ? "الجامعة العالمية" : "Global University",
  };

  return (
    <footer
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-[#001E42]"
    >
      <div className="mx-auto max-w-full px-5 py-8 md:px-8">
        {/* DESKTOP VIEW */}
        <div className="hidden items-start justify-between pb-4 md:flex">
          {/* 🔵 LEFT/RIGHT: Social & Website (يتقلب حسب اللغة) */}
          <div className="flex flex-col gap-4">
            <a
              href="https://www.uniweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#003C8A] transition-colors hover:opacity-80 dark:text-blue-200"
            >
              www.uniweb.com
            </a>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-[#003C8A] transition-colors hover:scale-110 dark:text-blue-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#003C8A] transition-colors hover:scale-110 dark:text-blue-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#003C8A] transition-colors hover:scale-110 dark:text-blue-200"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-[#003C8A] transition-colors hover:scale-110 dark:text-blue-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 🔥 CENTER: Brand Logo */}
          <div className="flex flex-col items-center">
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="logo"
                width={36}
                height={36}
                className="object-contain transition-transform group-hover:rotate-12"
              />
              <span className="text-2xl font-black tracking-tight text-[#003C8A] dark:text-blue-200">
                TrackUni
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm font-medium">
            <Link
              href="/website"
              className="text-[#003C8A] transition-opacity hover:opacity-70 dark:text-blue-200"
            >
              {links.home}
            </Link>
            <Link
              href="/website/courses"
              className="text-[#003C8A] transition-opacity hover:opacity-70 dark:text-blue-200"
            >
              {links.courses}
            </Link>
            <Link
              href="/announcements"
              className="text-[#003C8A] transition-opacity hover:opacity-70 dark:text-blue-200"
            >
              {links.announcements}
            </Link>
            <Link
              href="/faq"
              className="text-[#003C8A] transition-opacity hover:opacity-70 dark:text-blue-200"
            >
              {links.faq}
            </Link>
            <Link
              href="/blogs"
              className="text-[#003C8A] transition-opacity hover:opacity-70 dark:text-blue-200"
            >
              {links.blogs}
            </Link>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="flex flex-row items-start justify-between gap-4 pb-4 md:hidden">
          <div className="flex flex-1 flex-col gap-3">
            <a
              href="https://www.uniweb.com"
              className="truncate text-[10px] font-bold text-[#003C8A] dark:text-blue-200"
            >
              www.uniweb.com
            </a>
            <div className="flex gap-3 text-[#003C8A] dark:text-blue-200">
              <Instagram className="h-4 w-4" />
              <Facebook className="h-4 w-4" />
              <Send className="h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center pt-1">
            <Link href="/" className="flex flex-col items-center gap-1">
              <Image src="/logo.png" alt="logo" width={28} height={28} />
              <span className="text-[10px] font-black text-[#003C8A] dark:text-blue-200">
                TrackUni
              </span>
            </Link>
          </div>

          <div className="flex flex-1 flex-col gap-2 text-right text-[10px] font-bold text-[#003C8A] dark:text-blue-200">
            <Link href="/">{links.home}</Link>
            <Link href="/announcements">{links.announcements}</Link>
            <Link href="/blogs">{links.blogs}</Link>
            <Link href="/website/courses">{links.courses}</Link>
            <Link href="/faq">{links.faq}</Link>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="mt-4 flex flex-col items-center justify-center gap-2 border-t border-slate-100 pt-2 text-[11px] text-slate-400 md:flex-row dark:border-white/5 dark:text-slate-500">
          <p>© 2024 {links.uni}.</p>
          <span className="hidden md:block">•</span>
          <p>{links.rights}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
