import PERMS from "@/configs/all-permissions";
import { ValidHref } from "@/i18n/routing";
import { InsureTranslations } from "@/types/dashboard-layout";

type BaseNavItem = {
  title: InsureTranslations;
  badge?: string;
  icon?: React.ElementType | string;
  actions?: PERMS | PERMS[];
  keywords?: string[];
};

type NavLink = BaseNavItem & {
  url: ValidHref;
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: ValidHref })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

type NavGroup = {
  title: InsureTranslations;
  items: NavItem[];
  actions?: PERMS | PERMS[];
};

type QuickActionItem = {
  title: InsureTranslations;
  icon: React.ElementType | string;
  url: ValidHref;
  variant?: "default" | "outline";
  actions: PERMS | PERMS[];
  keywords?: string[];
};

type QuickActionGroup = {
  actions?: PERMS | PERMS[];
  items: QuickActionItem[];
};

type QuickAction = QuickActionItem | QuickActionGroup;

type QuickActions = {
  items?: QuickAction[];
};

type SidebarData = {
  navGroups: NavGroup[];
  quickActions?: QuickActions;
};

export type {
  NavCollapsible,
  NavGroup,
  NavItem,
  NavLink,
  QuickAction,
  QuickActionGroup,
  QuickActionItem,
  QuickActions,
  SidebarData,
};
