"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";

interface LanguageInfo {
  locale: Locale;
  name: string;
  nativeName: string;
  flag: string;
}

const LANGUAGES: Record<Locale, LanguageInfo> = {
  ar: {
    locale: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
  },
  en: {
    locale: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
  },
} as const;

interface LanguageButtonProps {
  className?: string;
  onChange?: () => void;
}

export default function LanguageButton({
  className,
  onChange,
}: LanguageButtonProps) {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  const [open, setOpen] = useState(false);

  const currentLanguage = LANGUAGES[locale as Locale];

  function onLocaleChange(nextLocale: Locale) {
    let _pathname = pathname;
    const search = searchParams.entries().toArray();
    if (search.length)
      _pathname += `?${search.map((e) => `${e[0]}=${e[1]}`).join("&")}`;

    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname: _pathname, params },
      { locale: nextLocale }
    );
    setOpen(false);
    onChange?.();
  }

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="relative h-9 w-9 cursor-pointer rounded-full"
            aria-label="Change language"
          >
            <Languages className="h-4 w-4" />
            <span className="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold">
              {currentLanguage.flag}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[180px] overflow-hidden rounded-lg border p-1 shadow-lg backdrop-blur-md"
          align="end"
          sideOffset={8}
        >
          <div className="flex flex-col gap-1">
            {routing.locales.map((loc) => {
              const language = LANGUAGES[loc];
              const isActive = locale === loc;

              return (
                <Button
                  key={loc}
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start gap-3 p-3"
                  onClick={() => onLocaleChange(loc)}
                  type="button"
                  size={"lg"}
                  aria-current={isActive}
                >
                  <span className="text-lg leading-none" aria-hidden="true">
                    {language.flag}
                  </span>
                  <div className="flex flex-1 flex-col gap-0.5 text-left">
                    <span className="leading-tight">{language.nativeName}</span>
                    <span className="text-muted-foreground text-xs leading-tight">
                      {language.name}
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
