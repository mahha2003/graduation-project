"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { CommandGroup, CommandItem } from "@/components/ui/command";
import { useRouter } from "@/i18n/routing";

import { sidebarData } from "../../data/sidebar-data";

interface QuickActionsSectionProps {
  currentSearchValue: string;
  onRunCommand: (command: () => unknown, searchQuery?: string) => void;
}

export function QuickActionsSection({
  currentSearchValue,
  onRunCommand,
}: QuickActionsSectionProps) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  if (!sidebarData.quickActions?.items) return null;

  return (
    <CommandGroup
      key="quick-actions"
      heading={t("Quick Actions" as Parameters<typeof t>[0])}
    >
      {sidebarData.quickActions.items.map((action) => {
        if ("url" in action) {
          return (
            <CommandItem
              key={action.url}
              value={`${t(action.title)} ${action.title} ${(action.keywords || []).join(" ")}`}
              onSelect={() => {
                onRunCommand(
                  //@ts-expect-error - it is a valid href
                  () => router.push({ pathname: action.url }),
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
              {t(action.title)}
            </CommandItem>
          );
        }
        // Handle QuickActionGroup
        if ("items" in action) {
          return action.items.map((groupAction) => (
            <CommandItem
              key={groupAction.url}
              value={`${t(groupAction.title)} ${groupAction.title} ${(groupAction.keywords || []).join(" ")}`}
              onSelect={() => {
                onRunCommand(
                  () =>
                    //@ts-expect-error - it is a valid href
                    router.push({
                      pathname: groupAction.url,
                    }),
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
              {t(groupAction.title)}
            </CommandItem>
          ));
        }
        return null;
      })}
    </CommandGroup>
  );
}
