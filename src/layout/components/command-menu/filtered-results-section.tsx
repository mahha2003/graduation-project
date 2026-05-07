"use client";

import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { CommandGroup, CommandItem } from "@/components/ui/command";
import { useRouter } from "@/i18n/routing";

import type { SearchableItem } from "./types";

interface FilteredResultsSectionProps {
  groupedItems: Record<string, SearchableItem[]>;
  currentSearchValue: string;
  onRunCommand: (command: () => unknown, searchQuery?: string) => void;
}

export function FilteredResultsSection({
  groupedItems,
  currentSearchValue,
  onRunCommand,
}: FilteredResultsSectionProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  return (
    <>
      {Object.entries(groupedItems).map(([groupTitle, items]) => (
        <CommandGroup
          key={groupTitle}
          heading={t(groupTitle as Parameters<typeof t>[0])}
        >
          {items.map((item) => (
            <CommandItem
              key={item.id}
              value={`${item.translatedTitle} ${item.title} ${item.keywords.join(" ")}`}
              onSelect={() => {
                const url = item.url;
                if (url) {
                  onRunCommand(
                    //@ts-expect-error - it is a valid href
                    () => router.push({ pathname: url }),
                    currentSearchValue
                  );
                }
              }}
            >
              <div className="flex size-4 items-center justify-center">
                {locale === "ar" ? (
                  <ArrowLeft className="text-muted-foreground/80 size-2" />
                ) : (
                  <ArrowRight className="text-muted-foreground/80 size-2" />
                )}
              </div>
              {item.parentTitle ? (
                <>
                  {t(item.parentTitle)} <ChevronRight /> {item.translatedTitle}
                </>
              ) : (
                item.translatedTitle
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </>
  );
}
