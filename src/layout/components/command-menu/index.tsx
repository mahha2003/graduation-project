"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { CommandDialog, CommandInput } from "@/components/ui/command";

import { useSearch } from "../../store/use-search";
import { CommandMenuContent } from "./command-menu-content";
import {
  addToSearchHistory,
  clearSearchHistory,
  getSearchHistory,
} from "./search-history";
import {
  buildSearchableItems,
  createFuseInstance,
  filterItems,
  groupItemsByGroup,
} from "./search-utils";
import type { SearchableItem } from "./types";

export function CommandMenu() {
  const t = useTranslations();
  const { open, setOpen } = useSearch();

  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentSearchValue, setCurrentSearchValue] = useState("");

  const searchableItems = useMemo<SearchableItem[]>(
    () => buildSearchableItems(t),
    [t]
  );

  const fuse = useMemo(
    () => createFuseInstance(searchableItems),
    [searchableItems]
  );

  const filteredItems = useMemo(
    () => filterItems(currentSearchValue, fuse, searchableItems),
    [currentSearchValue, fuse, searchableItems]
  );

  const groupedItems = useMemo(
    () => groupItemsByGroup(filteredItems),
    [filteredItems]
  );

  useEffect(() => {
    setTimeout(() => {
      setSearchHistory(getSearchHistory());
    }, 0);
  }, []);

  const runCommand = useCallback(
    (command: () => unknown, searchQuery?: string) => {
      setOpen(false);
      if (searchQuery) {
        addToSearchHistory(searchQuery);
        setSearchHistory(getSearchHistory());
      }
      command();
    },
    [setOpen]
  );

  const handleClearHistory = useCallback(() => {
    clearSearchHistory();
    setSearchHistory([]);
  }, []);

  const handleHistoryItemClick = useCallback((historyItem: string) => {
    setCurrentSearchValue(historyItem);

    setTimeout(() => {
      const input = document.querySelector("[cmdk-input]") as HTMLInputElement;
      if (input) {
        input.focus();
        input.setSelectionRange(historyItem.length, historyItem.length);
      }
    }, 0);
  }, []);

  const customFilter = useCallback(
    (value: string, search: string): number => {
      if (!search) return 1;

      const item = searchableItems.find((item) => {
        const searchValue =
          `${item.translatedTitle} ${item.title} ${item.keywords.join(" ")}`.toLowerCase();
        return searchValue.includes(value.toLowerCase());
      });

      if (item && filteredItems.includes(item)) {
        return 1;
      }

      return 0;
    },
    [filteredItems, searchableItems]
  );

  return (
    <CommandDialog
      modal={false}
      open={open}
      onOpenChange={setOpen}
      filter={customFilter}
    >
      <CommandInput
        placeholder={t("Type to search")}
        value={currentSearchValue}
        onValueChange={setCurrentSearchValue}
      />
      <CommandMenuContent
        searchHistory={searchHistory}
        currentSearchValue={currentSearchValue}
        filteredItems={filteredItems}
        groupedItems={groupedItems}
        onHistoryItemClick={handleHistoryItemClick}
        onClearHistory={handleClearHistory}
        onRunCommand={runCommand}
      />
    </CommandDialog>
  );
}
