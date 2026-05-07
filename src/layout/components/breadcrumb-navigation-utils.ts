import type { NavCollapsible, NavLink } from "../dashboard/sidebar/types";
import { sidebarData } from "../data/sidebar-data";

export type BreadcrumbCrumb = {
  label: string;
  href?: string;
};

export const ANIMATION = {
  delayMultiplier: 0.08,
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
  pageDelay: 0.15,
  iconDelay: 0.2,
  separatorDelay: 0.12,
  spring: { stiffness: 200, damping: 17 },
  hover: { stiffness: 400, damping: 17 },
} as const;

export const normalizePathname = (pathname: string, locale: string): string => {
  const cleanPath = pathname.split("?")[0].split("#")[0];
  const localePrefix = `/${locale}`;
  if (cleanPath === localePrefix) return "/";
  return cleanPath.startsWith(`${localePrefix}/`)
    ? cleanPath.slice(localePrefix.length)
    : cleanPath;
};

export const matchesPath = (url: string, pathname: string): boolean =>
  url === pathname || pathname.startsWith(`${url}/`);

const createCrumb = (title: string, url?: string): BreadcrumbCrumb => ({
  label: title,
  ...(url && { href: url }),
});

const findMatchInItems = (
  items: NavLink[],
  pathname: string
): NavLink | undefined =>
  items.find((item) => item.url && matchesPath(item.url, pathname));

export const buildBreadcrumbs = (
  pathname: string,
  locale: string
): BreadcrumbCrumb[] => {
  const normalizedPath = normalizePathname(pathname, locale);
  const breadcrumbs: BreadcrumbCrumb[] = [{ label: "Home", href: "/home" }];

  for (const group of sidebarData.navGroups) {
    for (const item of group.items) {
      const itemUrl = "url" in item ? (item as NavLink).url : undefined;
      const itemItems =
        "items" in item ? (item as NavCollapsible).items : undefined;

      if (itemUrl && matchesPath(itemUrl, normalizedPath)) {
        if (group.title) breadcrumbs.push({ label: group.title });

        if (itemUrl === normalizedPath) {
          breadcrumbs.push(createCrumb(item.title));
          return breadcrumbs;
        }

        if (itemItems?.length) {
          const matchedSubItem = findMatchInItems(itemItems, normalizedPath);
          if (matchedSubItem) {
            breadcrumbs.push(createCrumb(item.title, itemUrl));
            breadcrumbs.push(createCrumb(matchedSubItem.title));
            return breadcrumbs;
          }
        }

        breadcrumbs.push(createCrumb(item.title));
        return breadcrumbs;
      }

      if (itemItems?.length) {
        const matchedSubItem = findMatchInItems(itemItems, normalizedPath);
        if (matchedSubItem) {
          if (group.title) breadcrumbs.push({ label: group.title });
          breadcrumbs.push(createCrumb(item.title));
          breadcrumbs.push(createCrumb(matchedSubItem.title));
          return breadcrumbs;
        }
      }
    }
  }

  return breadcrumbs;
};

