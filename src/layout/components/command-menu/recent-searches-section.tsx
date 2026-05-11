"use client";

import { History, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { CommandGroup, CommandItem } from "@/components/ui/command";

interface RecentSearchesSectionProps {
  searchHistory: string[];
  onHistoryItemClick: (item: string) => void;
  onClearHistory: () => void;
}

export function RecentSearchesSection({
  searchHistory,
  onHistoryItemClick,
  onClearHistory,
}: RecentSearchesSectionProps) {
  const t = useTranslations();

  if (searchHistory.length === 0) return null;

  return (
    <CommandGroup heading={t("Recent Searches")}>
      {searchHistory.map((search, index) => (
        <CommandItem
          key={`history-${index}`}
          value={`history-${search}`}
          onSelect={() => onHistoryItemClick(search)}
        >
          <History className="size-4" />
          <span className="truncate">{search}</span>
        </CommandItem>
      ))}
      <CommandItem
        value="clear-history"
        onSelect={onClearHistory}
        className="text-destructive hover:text-destructive"
      >
        <X className="size-4" />
        <span>{t("Clear History")}</span>
      </CommandItem>
    </CommandGroup>
  );
}
