import { Locale } from "@/i18n/routing";

declare module "next" {
  interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{
      locale: Locale;
    }>;
  }

  interface PageProps {
    params: Promise<{
      locale: Locale;
    }>;
  }
}
