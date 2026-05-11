import { IconHeaderFixed } from "@/assets/custom/icon-header-fixed";
import { IconHeaderNormal } from "@/assets/custom/icon-header-normal";
import { IconLayoutCompact } from "@/assets/custom/icon-layout-compact";
import { IconLayoutDefault } from "@/assets/custom/icon-layout-default";
import { IconLayoutFull } from "@/assets/custom/icon-layout-full";
import { IconSidebarFloating } from "@/assets/custom/icon-sidebar-floating";
import { IconSidebarInset } from "@/assets/custom/icon-sidebar-inset";
import { IconSidebarSidebar } from "@/assets/custom/icon-sidebar-sidebar";
import { IconThemeDark } from "@/assets/custom/icon-theme-dark";
import { IconThemeLight } from "@/assets/custom/icon-theme-light";
import { IconThemeSystem } from "@/assets/custom/icon-theme-system";

import type { RadioItem } from "./types";

export const THEME_OPTIONS: RadioItem[] = [
  {
    value: "system",
    label: "System",
    icon: IconThemeSystem,
  },
  {
    value: "light",
    label: "Light",
    icon: IconThemeLight,
  },
  {
    value: "dark",
    label: "Dark",
    icon: IconThemeDark,
  },
];

export const HEADER_OPTIONS: RadioItem[] = [
  {
    value: "normal",
    label: "Normal",
    icon: IconHeaderNormal,
  },
  {
    value: "fixed",
    label: "Fixed",
    icon: IconHeaderFixed,
  },
];

export const SIDEBAR_OPTIONS: RadioItem[] = [
  {
    value: "inset",
    label: "Inset",
    icon: IconSidebarInset,
  },
  {
    value: "floating",
    label: "Floating",
    icon: IconSidebarFloating,
  },
  {
    value: "sidebar",
    label: "Sidebar",
    icon: IconSidebarSidebar,
  },
];

export const LAYOUT_OPTIONS: RadioItem[] = [
  {
    value: "default",
    label: "Default",
    icon: IconLayoutDefault,
  },
  {
    value: "icon",
    label: "Compact",
    icon: IconLayoutCompact,
  },
  {
    value: "offcanvas",
    label: "Full layout",
    icon: IconLayoutFull,
  },
];
