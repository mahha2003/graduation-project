import { ValidHref } from "@/i18n/routing";
import { InsureTranslations } from "@/types/dashboard-layout";

export type SearchableItem = {
  id: string;
  title: InsureTranslations;
  translatedTitle: InsureTranslations;
  url?: ValidHref;
  parentTitle?: InsureTranslations;
  keywords: string[];
  type: "nav" | "subNav" | "quickAction";
};
