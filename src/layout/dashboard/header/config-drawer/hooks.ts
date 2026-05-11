"use client";

import { useCallback, useEffect, useState } from "react";

import { useTheme } from "next-themes";

import type { ThemeValue } from "./types";

export function useThemeSync() {
  const { theme, systemTheme, setTheme } = useTheme();

  const getInitialTheme = (): ThemeValue => {
    if (typeof window === "undefined") return "system";
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
      return storedTheme as ThemeValue;
    }
    if (theme && ["light", "dark", "system"].includes(theme)) {
      return theme as ThemeValue;
    }
    return "system";
  };

  const [currentTheme, setCurrentTheme] = useState<ThemeValue>(getInitialTheme);

  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
        setCurrentTheme(storedTheme as ThemeValue);
      } else if (theme && ["light", "dark", "system"].includes(theme)) {
        setCurrentTheme(theme as ThemeValue);
      } else {
        setCurrentTheme("system");
      }
    };

    checkTheme();

    window.addEventListener("storage", checkTheme);

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", checkTheme);
      observer.disconnect();
    };
  }, [theme]);

  const handleThemeChange = useCallback(
    (themeValue: ThemeValue) => {
      if (themeValue === "system") {
        localStorage.removeItem("theme");
        document.documentElement.classList.remove("dark");
        setTheme("system");
      } else {
        localStorage.setItem("theme", themeValue);
        if (themeValue === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        setTheme(themeValue);
      }
    },
    [setTheme]
  );

  const safeSystemTheme: ThemeValue =
    systemTheme && ["light", "dark", "system"].includes(systemTheme)
      ? (systemTheme as ThemeValue)
      : "system";

  return {
    currentTheme,
    systemTheme: safeSystemTheme,
    handleThemeChange,
  };
}
