import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import { getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ProgressBarProvider } from "react-transition-progress";
import { z } from "zod";

import { ConfirmDialogProvider } from "@/components/dialog";
import { ThemeInitializer } from "@/components/theme-insure-component";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env/client";
import IntlClientProvider from "@/i18n/intl-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "../globals.css";
import "react-quill-new/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";

const CairoFont = localFont({
  src: "../fonts/Cairo-Variable.ttf",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "Graduation Project",
    template: "%s | Graduation Project",
  },
  alternates: {
    canonical: env.NEXT_PUBLIC_FRONTEND_URL,
    languages: {
      en: `${env.NEXT_PUBLIC_FRONTEND_URL}/en`,
      ar: `${env.NEXT_PUBLIC_FRONTEND_URL}/ar`,
    },
  },
  description: "Graduation Project",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  const sanitizedLocale = z.enum(["ar", "en"]).safeParse(locale).data;
  if (!sanitizedLocale) notFound();
  const messages = await getMessages({
    locale: sanitizedLocale,
  });

  return (
    <html
      lang={sanitizedLocale}
      suppressHydrationWarning
      dir={sanitizedLocale === "ar" ? "rtl" : "ltr"}
    >
      <body className={` ${CairoFont.variable} antialiased`}>
        <ConfirmDialogProvider>
          <NuqsAdapter>
            <IntlClientProvider messages={messages} locale={sanitizedLocale}>
              <Toaster
                toastOptions={{
                  classNames: {
                    loading:
                      "bg-background! text-foreground! rounded-lg! shadow-lg! border-none!",
                    error:
                      "bg-destructive! !text-white rounded-lg! shadow-lg! border-none!",
                    success:
                      "bg-primary! text-primary-foreground! rounded-lg! shadow-lg! border-none!",
                    description: "text-foreground! rounded-lg! border-none!",
                    title: "rounded-lg! border-none!",
                    icon: "rounded-lg! border-none!",
                    warning:
                      "bg-yellow-500! text-yellow-900! rounded-lg! shadow-lg! border-none!",
                  },
                }}
              />

              <ThemeInitializer />
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ProgressBarProvider>{children}</ProgressBarProvider>
              </ThemeProvider>
            </IntlClientProvider>
          </NuqsAdapter>
        </ConfirmDialogProvider>
      </body>
    </html>
  );
}
