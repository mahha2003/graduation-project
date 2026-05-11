"use client";

import { Item } from "@radix-ui/react-radio-group";
import { CircleCheck, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { RadioGroupItemProps, SectionTitleProps } from "./types";

export function SectionTitle({
  title,
  showReset = false,
  onReset,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "text-muted-foreground mb-2 flex items-center gap-2 text-sm font-semibold",
        className
      )}
    >
      {title}
      {showReset && onReset && (
        <Button
          size="icon"
          variant="secondary"
          className="size-4 rounded-full"
          onClick={onReset}
          aria-label="Reset to default"
        >
          <RotateCcw className="size-3" />
        </Button>
      )}
    </div>
  );
}

export function RadioGroupItem({ item, isTheme = false }: RadioGroupItemProps) {
  return (
    <Item
      value={item.value}
      className={cn(
        "group outline-none",
        "cursor-pointer transition duration-200 ease-in"
      )}
      aria-label={`Select ${item.label.toLowerCase()}`}
      aria-describedby={`${item.value}-description`}
    >
      <div
        className={cn(
          "ring-border relative rounded-[6px] ring-[1px]",
          "group-data-[state=checked]:ring-primary group-data-[state=checked]:shadow-2xl",
          "group-focus-visible:ring-2"
        )}
        role="img"
        aria-hidden="false"
        aria-label={`${item.label} option preview`}
      >
        <CircleCheck
          className={cn(
            "fill-primary size-6 stroke-white",
            "group-data-[state=unchecked]:hidden",
            "absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
          )}
          aria-hidden="true"
        />
        <item.icon
          className={cn(
            !isTheme &&
              "fill-primary stroke-primary group-data-[state=unchecked]:fill-muted-foreground group-data-[state=unchecked]:stroke-muted-foreground"
          )}
          aria-hidden="true"
        />
      </div>
      <div
        className="mt-1 text-xs"
        id={`${item.value}-description`}
        aria-live="polite"
      >
        {item.label}
      </div>
    </Item>
  );
}
