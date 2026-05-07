"use client";

import { useCallback, useState } from "react";

import { Settings } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLayout } from "@/layout/store/use-layout";

import ThemeConfig from "../theme-config/theme-config";
import {
  HeaderConfig,
  LayoutConfig,
  SidebarConfig,
  ThemeLightDarkConfig,
} from "./config-components";

export function ConfigDrawer() {
  const { setOpen } = useSidebar();
  const { setTheme } = useTheme();
  const { resetLayout } = useLayout();
  const locale = useLocale();
  const t = useTranslations();
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleReset = useCallback(() => {
    setOpen(true);
    setTheme("system");
    resetLayout();
  }, [setOpen, setTheme, resetLayout]);

  return (
    <Sheet modal={false} open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label={t("Open theme settings")}
          aria-describedby="config-drawer-description"
          className="cursor-pointer rounded-full"
        >
          <Settings aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={locale === "ar" ? "left" : "right"}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="flex min-h-screen flex-col overflow-y-auto"
      >
        <SheetHeader className="pb-0 text-start">
          <SheetTitle>{t("Theme Settings")}</SheetTitle>
          <SheetDescription id="config-drawer-description">
            {t("Adjust the appearance and layout to suit your preferences")}
          </SheetDescription>
        </SheetHeader>
        <div className="flex w-full flex-col gap-6 p-2">
          <Tabs dir={locale === "ar" ? "rtl" : "ltr"} defaultValue="layout">
            <TabsList className="mb-">
              <TabsTrigger className="me-1" value="layout">
                {t("Layout")}
              </TabsTrigger>
              <TabsTrigger value="theme">{t("Theme")}</TabsTrigger>
            </TabsList>
            <TabsContent value="layout">
              <div className="space-y-6 px-4">
                <ThemeLightDarkConfig key={sheetOpen ? "open" : "closed"} />
                <SidebarConfig />
                <LayoutConfig />
                <HeaderConfig />
              </div>
              <Button
                variant="destructive"
                onClick={handleReset}
                className="mt-4 w-full"
                aria-label={t("Reset all settings to default values")}
              >
                {t("Reset")}
              </Button>
            </TabsContent>
            <TabsContent value="theme">
              <div className="px-1">
                <ThemeConfig />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
