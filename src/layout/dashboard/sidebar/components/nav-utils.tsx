import { type ReactNode } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { type NavItem } from "../types";

export function renderIcon(
  icon?: React.ElementType | string,
  className?: string
) {
  if (!icon) return null;
  if (typeof icon === "string") {
    return (
      <Icon icon={icon} className={cn("h-4 w-4 text-inherit", className)} />
    );
  }
  const IconComponent = icon;
  return <IconComponent />;
}

export function NavBadge({ children }: { children: ReactNode }) {
  return <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>;
}

export function checkIsActive(href: string, item: NavItem, mainNav = false) {
  href =
    href.startsWith("/ar") || href.startsWith("/en")
      ? href.replace("/ar", "").replace("/en", "")
      : href;

  if (item.url) {
    if (href === item.url || href.split("?")[0] === item.url) {
      return true;
    }
  }

  if (item?.items?.length) {
    const hasActiveChild = item.items.some(
      (childItem) =>
        childItem.url &&
        (href === childItem.url || href.split("?")[0] === childItem.url)
    );

    if (hasActiveChild) {
      return true;
    }
  }

  if (mainNav && item.url) {
    const hrefFirstSegment = href.split("/")[1];
    const itemFirstSegment = item.url.split("/")[1];
    if (
      hrefFirstSegment &&
      itemFirstSegment &&
      hrefFirstSegment === itemFirstSegment
    ) {
      return true;
    }
  }

  return false;
}
