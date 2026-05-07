"use client";

import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { CommandGroup, CommandItem } from "@/components/ui/command";
import { useRouter } from "@/i18n/routing";

import { sidebarData } from "../../data/sidebar-data";

interface AllItemsSectionProps {
  currentSearchValue: string;
  onRunCommand: (command: () => unknown, searchQuery?: string) => void;
}

export function AllItemsSection({
  currentSearchValue,
  onRunCommand,
}: AllItemsSectionProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  return (
    <>
      {sidebarData.navGroups.map((group) => (
        <CommandGroup
          key={group.title}
          heading={t(group.title as Parameters<typeof t>[0])}
        >
          {group.items.map((navItem, i) => {
            if (navItem.url)
              return (
                <CommandItem
                  key={`${navItem.url}-${i}`}
                  value={`${t(navItem.title)} ${navItem.title} ${(navItem.keywords || []).join(" ")}`}
                  onSelect={() => {
                    onRunCommand(
                      //@ts-expect-error - it is a valid href
                      () => router.push({ pathname: navItem.url }),
                      currentSearchValue
                    );
                  }}
                >
                  <div className="flex size-4 items-center justify-center">
                    {locale === "ar" ? (
                      <ArrowLeft className="text-muted-foreground/80 size-2" />
                    ) : (
                      <ArrowRight className="text-muted-foreground/80 size-2" />
                    )}
                  </div>
                  {t(navItem.title)}
                </CommandItem>
              );

            return navItem.items?.map((subItem, i) => (
              <CommandItem
                key={`${navItem.title}-${subItem.url}-${i}`}
                value={`${t(navItem.title)} ${t(subItem.title)} ${navItem.title} ${subItem.title} ${(subItem.keywords || []).join(" ")} ${(navItem.keywords || []).join(" ")}`}
                onSelect={() => {
                  onRunCommand(
                    //@ts-expect-error - it is a valid href
                    () => router.push({ pathname: subItem.url }),
                    currentSearchValue
                  );
                }}
              >
                <div className="flex size-4 items-center justify-center">
                  {locale === "ar" ? (
                    <ArrowLeft className="text-muted-foreground/80 size-2" />
                  ) : (
                    <ArrowRight className="text-muted-foreground/80 size-2" />
                  )}
                </div>
                {t(navItem.title)} <ChevronRight /> {t(subItem.title)}
              </CommandItem>
            ));
          })}
        </CommandGroup>
      ))}
    </>
  );
}
