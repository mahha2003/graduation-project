import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],
  // Used when no locale matches
  defaultLocale: "ar",
  localePrefix: "always",
  pathnames: {
    "/": {
      en: "/home",
      ar: "/المنزل",
    },
    "/users": {
      en: "/users",
      ar: "/users",
    },
    "/students": {
      en: "/students",
      ar: "/students",
    },
    "/auth/login": {
      en: "/login",
      ar: "/تسجيل الدخول",
    },
    "/years": {
      en: "/years",
      ar: "/years",
    },
    "/years/[yearId]/sections": {
      en: "/years/[yearId]/sections",
      ar: "/years/[yearId]/sections",
    },
    "/years/[yearId]/majors": {
      en: "/years/[yearId]/majors",
      ar: "/years/[yearId]/majors",
    },
    "/years/[yearId]/sections/[sectionId]/groups": {
      en: "/years/[yearId]/sections/[sectionId]/groups",
      ar: "/years/[yearId]/sections/[sectionId]/groups",
    },
    "/years/[yearId]/majors/[majorId]/groups": {
      en: "/years/[yearId]/majors/[majorId]/groups",
      ar: "/years/[yearId]/majors/[majorId]/groups",
    },
    "/locations": {
      en: "/locations",
      ar: "/locations",
    },
    "/courses": {
      en: "/courses",
      ar: "/courses",
    },
    "/system-settings": {
      en: "/system-settings",
      ar: "/system-settings",
    },
    "/announcements": {
      en: "/announcements",
      ar: "/announcements",
    },
    "/lectures-schedule": {
      en: "/lectures-schedule",
      ar: "/lectures-schedule",
    },
  },
});

// use typescript keyof instead of writing then two times
export type ValidHref = keyof typeof routing.pathnames;

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
  permanentRedirect,
} = createNavigation(routing);
export type LinkProps = Parameters<typeof Link>[0];
