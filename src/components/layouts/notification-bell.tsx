"use client";

import { cn } from "@/lib/utils";
import { Bell } from "lucide-react"; // تأكدي من تثبيت lucide-react

interface NotificationBellProps {
  count?: number;
  className?: string;
}

export function NotificationBell({ count = 0, className }: NotificationBellProps) {
  return (
    <button
      className={cn(
        "relative p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-full transition-all",
        className
      )}
    >
      <Bell className="w-6 h-6" />

      {count > 0 && (
        <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
          {count > 9 ? "+9" : count}
        </span>
      )}
    </button>
  );
}
