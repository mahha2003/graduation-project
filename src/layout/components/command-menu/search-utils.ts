import Fuse from "fuse.js";

import type { InsureTranslations } from "@/types/dashboard-layout";

import { sidebarData } from "../../data/sidebar-data";
import type { SearchableItem } from "./types";

type TranslationFunction = ReturnType<
  typeof import("next-intl").useTranslations
>;
type TranslationKey = Parameters<TranslationFunction>[0];

const safeTranslate = (
  t: TranslationFunction,
  key: string
): InsureTranslations => {
  return t(key as TranslationKey) as InsureTranslations;
};

export const buildSearchableItems = (
  t: TranslationFunction
): SearchableItem[] => {
  const items: SearchableItem[] = [];

  // Add quick actions
  sidebarData.quickActions?.items?.forEach((action) => {
    if ("url" in action) {
      items.push({
        id: `quick-${action.url}`,
        title: action.title as InsureTranslations,
        translatedTitle: safeTranslate(t, action.title),
        url: action.url,
        keywords: [
          action.title,
          safeTranslate(t, action.title),
          ...(action.keywords || []),
        ],
        type: "quickAction",
      });
    } else if ("items" in action) {
      action.items.forEach((groupAction) => {
        items.push({
          id: `quick-${groupAction.url}`,
          title: groupAction.title as InsureTranslations,
          translatedTitle: safeTranslate(t, groupAction.title),
          url: groupAction.url,
          keywords: [
            groupAction.title,
            safeTranslate(t, groupAction.title),
            ...(groupAction.keywords || []),
          ],
          type: "quickAction",
        });
      });
    }
  });

  // Add nav groups items
  sidebarData.navGroups.forEach((group) => {
    group.items.forEach((navItem) => {
      // If it's a direct link
      if ("url" in navItem) {
        items.push({
          id: `nav-${navItem.url}`,
          title: navItem.title as InsureTranslations,
          translatedTitle: safeTranslate(t, navItem.title),
          url: navItem.url,
          keywords: [
            navItem.title,
            safeTranslate(t, navItem.title),
            group.title,
            safeTranslate(t, group.title),
            ...(navItem.keywords || []),
          ],
          type: "nav",
        });
      } else {
        // If it's a collapsible with sub-items
        navItem.items?.forEach((subItem) => {
          items.push({
            id: `subnav-${subItem.url}`,
            title: subItem.title as InsureTranslations,
            translatedTitle: safeTranslate(t, subItem.title),
            url: subItem.url,
            parentTitle: navItem.title as InsureTranslations,
            keywords: [
              subItem.title,
              safeTranslate(t, subItem.title),
              navItem.title,
              safeTranslate(t, navItem.title),
              group.title,
              safeTranslate(t, group.title),
              ...(subItem.keywords || []),
              ...(navItem.keywords || []),
            ],
            type: "subNav",
          });
        });
      }
    });
  });

  return items;
};

export const createFuseInstance = (
  items: SearchableItem[]
): Fuse<SearchableItem> => {
  return new Fuse(items, {
    keys: [
      { name: "translatedTitle", weight: 0.4 },
      { name: "title", weight: 0.3 },
      { name: "keywords", weight: 0.3 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 1,
    ignoreLocation: true,
    findAllMatches: true,
  });
};

export const filterItems = (
  searchValue: string,
  fuse: Fuse<SearchableItem>,
  allItems: SearchableItem[]
): SearchableItem[] => {
  if (!searchValue.trim()) {
    return allItems;
  }

  const results = fuse.search(searchValue);
  return results.map((result) => result.item);
};

export const groupItemsByGroup = (
  items: SearchableItem[]
): Record<string, SearchableItem[]> => {
  const groups: Record<string, SearchableItem[]> = {};

  items.forEach((item) => {
    const group = sidebarData.navGroups.find((g) => {
      if (item.type === "quickAction") return false;
      return g.items.some((navItem) => {
        if ("url" in navItem && navItem.url === item.url) return true;
        return navItem.items?.some((subItem) => subItem.url === item.url);
      });
    });

    const groupKey = group ? group.title : "quickActions";
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
  });

  return groups;
};
