/**
 * src/components/layout/index.ts
 * --------------------------------
 * Barrel export for all student-website Navbar components.
 *
 * Usage:
 *   import { Navbar } from "@/components/layout";
 *   import { Navbar, NavLinks, UserMenu } from "@/components/layout";
 */

// export { TrackUniLogo } from "./";

export { Navbar } from "./navbar";
export { NotificationBell } from "./notification-bell";

// نفس الشيء بالنسبة للـ Types
export { NavLinks } from "./nav-links";
export type { NavLinksProps } from "./nav-links";
export type { NavbarProps } from "./navbar";
export type { NotificationBellProps } from "./notification-bell";

export { MobileMenu } from "./mobile-menu";

export { ThemeToggle } from "./theme-toggle";

export { LanguageSwitcher } from "./language-switcher";

export { UserMenu } from "./user-menu";
export type { UserMenuProps } from "./user-menu";
