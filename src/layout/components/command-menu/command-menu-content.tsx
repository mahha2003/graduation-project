"use client";

import { useLocale, useTranslations } from "next-intl";

import {
  CommandEmpty,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AllItemsSection } from "./all-items-section";
import { FilteredResultsSection } from "./filtered-results-section";
import { QuickActionsSection } from "./quick-actions-section";
import { RecentSearchesSection } from "./recent-searches-section";
import type { SearchableItem } from "./types";

interface CommandMenuContentProps {
  searchHistory: string[];
  currentSearchValue: string;
  filteredItems: SearchableItem[];
  groupedItems: Record<string, SearchableItem[]>;
  onHistoryItemClick: (item: string) => void;
  onClearHistory: () => void;
  onRunCommand: (command: () => unknown, searchQuery?: string) => void;
}

export function CommandMenuContent({
  searchHistory,
  currentSearchValue,
  groupedItems,
  onHistoryItemClick,
  onClearHistory,
  onRunCommand,
}: CommandMenuContentProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <CommandList>
      <ScrollArea
        dir={locale === "ar" ? "rtl" : "ltr"}
        type="hover"
        className="h-72 pe-1"
      >
        <CommandEmpty>{t("No results found")}</CommandEmpty>

        {searchHistory.length > 0 && !currentSearchValue && (
          <RecentSearchesSection
            searchHistory={searchHistory}
            onHistoryItemClick={onHistoryItemClick}
            onClearHistory={onClearHistory}
          />
        )}

        {!currentSearchValue && (
          <QuickActionsSection
            currentSearchValue={currentSearchValue}
            onRunCommand={onRunCommand}
          />
        )}

        {currentSearchValue && (
          <FilteredResultsSection
            groupedItems={groupedItems}
            currentSearchValue={currentSearchValue}
            onRunCommand={onRunCommand}
          />
        )}

        {!currentSearchValue && (
          <AllItemsSection
            currentSearchValue={currentSearchValue}
            onRunCommand={onRunCommand}
          />
        )}

        <CommandSeparator />
      </ScrollArea>
    </CommandList>
  );
}
