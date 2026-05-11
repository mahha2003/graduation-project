"use client";

import { useState } from "react";

import { ToggleTheme } from "@/components/ui/toggle-theme";
import { cn } from "@/lib/utils";

type AnimationType =
  | "round-morph"
  | "diag-down-right"
  | "shrink-grow"
  | "split-vertical"
  | "swipe-right"
  | "swipe-down";

const ANIMATION_TYPES: readonly AnimationType[] = [
  "round-morph",
  "diag-down-right",
  "shrink-grow",
  "split-vertical",
] as const;

interface LoopToggleThemeProps {
  className?: string;
  onChange?: () => void;
}

function LoopToggleTheme({ className, onChange }: LoopToggleThemeProps) {
  const [index, setIndex] = useState(0);

  const handleChange = () => {
    setIndex((prev) => (prev + 1) % ANIMATION_TYPES.length);
    onChange?.();
  };

  return (
    <ToggleTheme
      animationType={ANIMATION_TYPES[index]}
      onChange={handleChange}
      duration={1000}
      className={cn("flex items-center justify-center ps-2.5", className)}
    />
  );
}

export default LoopToggleTheme;
