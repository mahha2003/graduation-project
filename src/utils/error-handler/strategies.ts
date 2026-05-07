/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { toast } from "sonner";

import { Locale } from "@/i18n/routing";

import type { ErrorStrategy } from "./types";
import { createErrorCodeStrategy, createHttpErrorStrategy } from "./utils";

// Helper function to get current locale
const getCurrentLocale = (): Locale => {
  return (Cookies.get("NEXT_LOCALE") as Locale) ?? "ar";
};

// Default error strategies using utility functions
export const defaultErrorStrategies: ErrorStrategy[] = [
  // Authentication errors (401)
  createHttpErrorStrategy(401, (error: any) => {
    console.error("Authentication Error:", error);

    // التحويل إلى صفحة تسجيل الدخول
    if (typeof window !== "undefined") {
      const locale = getCurrentLocale();
      window.location.href = `/${locale}/auth/login?redirect=${window.location.pathname}`;
    }
  }),

  // Error network timeout
  createErrorCodeStrategy("NetworkError", ["ERR_NETWORK"], () => {
    if (typeof window !== "undefined") {
      const locale = getCurrentLocale();
      const isArabic = locale === "ar";
      toast(isArabic ? "مشكلة في الشبكة" : "Network issue", {
        description: isArabic
          ? "يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى."
          : "Please check your internet connection and try again.",
      });
    }
  }),
];

// Fallback strategy
export const fallbackErrorStrategy: ErrorStrategy = {
  name: "FallbackError",
  canHandle: () => true, // يمكنه التعامل مع أي error
  handle: (error: any) => {
    console.error("Unhandled Error:", error);
    // يمكن إضافة generic error handling
  },
};
