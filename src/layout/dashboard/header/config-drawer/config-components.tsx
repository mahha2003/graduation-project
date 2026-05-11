"use client";

import { useCallback } from "react";

import { Root as Radio } from "@radix-ui/react-radio-group";
import { useTranslations } from "next-intl";

import { useSidebar } from "@/components/ui/sidebar";
import { type Collapsible, useLayout } from "@/layout/store/use-layout";

import {
  HEADER_OPTIONS,
  LAYOUT_OPTIONS,
  SIDEBAR_OPTIONS,
  THEME_OPTIONS,
} from "./constants";
import { useThemeSync } from "./hooks";
import { RadioGroupItem, SectionTitle } from "./shared-components";
import type { ThemeValue } from "./types";

export function ThemeLightDarkConfig() {
  const t = useTranslations();
  const { currentTheme, systemTheme, handleThemeChange } = useThemeSync();

  const themeOptions = THEME_OPTIONS.map((option) => ({
    ...option,
    label: t(option.label as Parameters<typeof t>[0]),
  }));

  return (
    <div>
      <SectionTitle
        title={t("Theme")}
        showReset={currentTheme !== systemTheme}
        onReset={() => handleThemeChange(systemTheme as ThemeValue)}
      />
      <Radio
        value={currentTheme}
        onValueChange={handleThemeChange}
        className="grid w-full max-w-md grid-cols-3 gap-4"
        aria-label={t("Select theme preference")}
        aria-describedby="theme-description"
      >
        {themeOptions.map((item) => (
          <RadioGroupItem key={item.value} item={item} isTheme />
        ))}
      </Radio>
      <div id="theme-description" className="sr-only">
        {t("Choose between system preference, light mode, or dark mode")}
      </div>
    </div>
  );
}

export function HeaderConfig() {
  const t = useTranslations();
  const { fixed, setFixed, defaultFixed } = useLayout();

  const headerOptions = HEADER_OPTIONS.map((option) => ({
    ...option,
    label: t(option.label as Parameters<typeof t>[0]),
  }));

  const handleValueChange = useCallback(
    (value: string) => {
      setFixed(value === "fixed");
    },
    [setFixed]
  );

  return (
    <div className="space-y-3">
      <SectionTitle
        title={t("Header")}
        showReset={fixed !== defaultFixed}
        onReset={() => setFixed(defaultFixed)}
      />
      <Radio
        value={fixed ? "fixed" : "normal"}
        onValueChange={handleValueChange}
        className="grid w-full max-w-32 grid-cols-2 gap-4"
        aria-label={t("Select header style")}
        aria-describedby="header-description"
      >
        {headerOptions.map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id="header-description" className="sr-only">
        {t("Choose between normal scrolling header or fixed header")}
      </div>
    </div>
  );
}

export function SidebarConfig() {
  const t = useTranslations();
  const { defaultVariant, variant, setVariant } = useLayout();

  const sidebarOptions = SIDEBAR_OPTIONS.map((option) => ({
    ...option,
    label: t(option.label as Parameters<typeof t>[0]),
  }));

  return (
    <div className="max-md:hidden">
      <SectionTitle
        title={t("Sidebar")}
        showReset={defaultVariant !== variant}
        onReset={() => setVariant(defaultVariant)}
      />
      <Radio
        value={variant}
        onValueChange={setVariant}
        className="grid w-full max-w-md grid-cols-3 gap-4"
        aria-label={t("Select sidebar style")}
        aria-describedby="sidebar-description"
      >
        {sidebarOptions.map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id="sidebar-description" className="sr-only">
        {t("Choose between inset, floating, or standard sidebar layout")}
      </div>
    </div>
  );
}

export function LayoutConfig() {
  const t = useTranslations();
  const { open, setOpen } = useSidebar();
  const { defaultCollapsible, collapsible, setCollapsible } = useLayout();

  const radioState = open ? "default" : collapsible;

  const layoutOptions = LAYOUT_OPTIONS.map((option) => ({
    ...option,
    label: t(option.label as Parameters<typeof t>[0]),
  }));

  const handleValueChange = useCallback(
    (value: string) => {
      if (value === "default") {
        setOpen(true);
        return;
      }
      setOpen(false);
      setCollapsible(value as Collapsible);
    },
    [setOpen, setCollapsible]
  );

  const handleReset = useCallback(() => {
    setOpen(true);
    setCollapsible(defaultCollapsible);
  }, [setOpen, setCollapsible, defaultCollapsible]);

  return (
    <div className="max-md:hidden">
      <SectionTitle
        title={t("Layout")}
        showReset={radioState !== "default"}
        onReset={handleReset}
      />
      <Radio
        value={radioState}
        onValueChange={handleValueChange}
        className="grid w-full grid-cols-3 gap-4"
        aria-label={t("Select layout style")}
        aria-describedby="layout-description"
      >
        {layoutOptions.map((item) => (
          <RadioGroupItem key={item.value} item={item} />
        ))}
      </Radio>
      <div id="layout-description" className="sr-only">
        {t(
          "Choose between default expanded, compact icon-only, or full layout mode"
        )}
      </div>
    </div>
  );
}
