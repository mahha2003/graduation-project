"use client";

/**
 * UserMenu
 * --------
 * Shows a circular avatar with the user's first name next to it on desktop.
 * Clicking opens a dropdown with Profile / Settings / Sign out.
 * Uses next-intl for menu item labels.
 */

import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

export interface UserMenuProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export function UserMenu({
  name     = "Alex Johnson",
  email    = "alex@trackuni.edu",
  avatarUrl,
}: UserMenuProps) {
  const t = useTranslations("userMenu");

  /** Two-letter initials from full name */
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  /** First name only for the inline label */
  const firstName = name.split(" ")[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            flex items-center gap-2
            rounded-full px-1 py-0.5
            hover:bg-[#c0d5f2]/50 dark:hover:bg-slate-700/50
            transition-colors duration-150
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003c8a]
          "
          aria-label={t("label")}
        >
          {/* Avatar */}
          <Avatar className="
            h-8 w-8 shrink-0
            ring-2 ring-slate-200 dark:ring-slate-600
            group-hover:ring-[#003c8a] transition-all
          ">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback className="
              bg-[#4a7bb5] text-white
              text-[0.7rem] font-bold tracking-wide
            ">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* First name — desktop only */}
          <span className="
            hidden lg:inline
            text-sm font-semibold
            text-[#1a2e5a] dark:text-slate-200
            max-w-24 truncate
          ">
            {firstName}
          </span>

          {/* Caret — desktop only */}
          <ChevronDown className="
            hidden lg:inline-block
            h-3.5 w-3.5 shrink-0
            text-slate-400 dark:text-slate-500
          " strokeWidth={2.5} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="
          w-56
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-700
          rounded-xl shadow-lg shadow-slate-200/60 dark:shadow-black/40
          p-1.5
        "
      >
        {/* Identity header */}
        <DropdownMenuLabel className="px-2 py-1.5 mb-0.5">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
            {name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal truncate mt-0.5">
            {email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />

        <DropdownMenuItem className="
          cursor-pointer rounded-lg px-2 py-2 gap-2.5
          text-sm text-slate-700 dark:text-slate-300
          hover:bg-slate-100 dark:hover:bg-slate-800
          focus:bg-slate-100 dark:focus:bg-slate-800
          transition-colors
        ">
          <User className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          {t("profile")}
        </DropdownMenuItem>

        <DropdownMenuItem className="
          cursor-pointer rounded-lg px-2 py-2 gap-2.5
          text-sm text-slate-700 dark:text-slate-300
          hover:bg-slate-100 dark:hover:bg-slate-800
          focus:bg-slate-100 dark:focus:bg-slate-800
          transition-colors
        ">
          <Settings className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          {t("settings")}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 my-1" />

        <DropdownMenuItem className="
          cursor-pointer rounded-lg px-2 py-2 gap-2.5
          text-sm text-[#B11226] dark:text-red-400
          hover:bg-red-50 dark:hover:bg-red-900/20
          focus:bg-red-50 dark:focus:bg-red-900/20
          transition-colors
        ">
          <LogOut className="h-4 w-4 shrink-0" />
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
