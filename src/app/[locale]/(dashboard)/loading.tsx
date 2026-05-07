"use client";

import { useEffect } from "react";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations();

  useEffect(() => {
    const styleId = "loading-animations";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes loading-progress {
        0% {
          transform: translateX(-100%);
        }
        50% {
          transform: translateX(200%);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0) translateX(0);
          opacity: 0.3;
        }
        50% {
          transform: translateY(-20px) translateX(10px);
          opacity: 0.8;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="relative flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 absolute inset-0 bg-linear-to-br via-transparent dark:via-transparent" />
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />

      {/* Main Loading Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Spinner Container with Glow Effect */}
        <div className="relative">
          {/* Outer Glow Ring */}
          <div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-2xl" />

          {/* Spinner Rings */}
          <div className="relative flex items-center justify-center">
            {/* Outer Ring */}
            <div
              className="border-t-primary border-r-primary/50 absolute h-24 w-24 animate-spin rounded-full border-4 border-transparent"
              style={{ animationDuration: "1.5s" }}
            />

            {/* Middle Ring */}
            <div
              className="border-t-primary/70 border-r-primary/30 absolute h-20 w-20 animate-spin rounded-full border-4 border-transparent"
              style={{ animationDuration: "1s", animationDirection: "reverse" }}
            />

            {/* Inner Ring */}
            <div
              className="border-t-primary/50 border-r-primary/20 absolute h-16 w-16 animate-spin rounded-full border-4 border-transparent"
              style={{ animationDuration: "0.75s" }}
            />

            {/* Center Dot */}
            <div className="bg-primary shadow-primary/50 h-3 w-3 animate-pulse rounded-full shadow-lg" />
          </div>
        </div>

        {/* Loading Text with Animation */}
        <div className="flex flex-col items-center space-y-2">
          <p className="text-foreground animate-pulse text-2xl font-semibold">
            {t("Loading")}
          </p>

          {/* Loading Dots */}
          <div className="flex space-x-2">
            <div
              className="bg-primary h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: "0ms", animationDuration: "1.4s" }}
            />
            <div
              className="bg-primary h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: "200ms", animationDuration: "1.4s" }}
            />
            <div
              className="bg-primary h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: "400ms", animationDuration: "1.4s" }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-muted relative h-1 w-48 overflow-hidden rounded-full">
          <div
            className="from-primary via-primary/80 to-primary absolute h-full w-1/3 rounded-full bg-linear-to-r"
            style={{
              animation: "loading-progress 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-primary/30 absolute h-1 w-1 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
