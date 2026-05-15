// src/app/[locale]/website/layout.tsx
import { Footer } from "react-day-picker";

import { Navbar } from "@/components/website/navbar/index";

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const user = {
    name: "Alex Johnson",
    email: "alex@trackuni.edu",
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* 1. الهيدر في الأعلى */}
      <Navbar notificationCount={3} user={user} />

      {/* 2. المحتوى المتغير (الصفحات) */}
      {/* كلاس flex-1 يضمن أن المحتوى يأخذ المساحة المتاحة ويدفع الفوتر للأسفل */}
      <main className="w-full max-w-full flex-1 px-5 pt-5 pb-8 md:px-8">
        {children}
      </main>

      {/* 3. الفوتر في الأسفل تماماً */}
      <Footer />
    </div>
  );
}
