import type { Metadata } from "next";
import { notFound } from "next/navigation";

import z from "zod";

// import AuthGuard from "@/components/guards/auth-guard";
import { NavigationProgress } from "@/layout";
import DashboardLayout from "@/layout/containers/dashboard-layout";
import GlobalDialogs from "@/providers/dialogs/global-dialogs";

export const metadata: Metadata = {
  description: "dashboard",
  generator: "Next.js",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = z.enum(["en", "ar"]).safeParse((await params).locale).data;

  if (!locale) {
    notFound();
  }

  return (
    // <AuthGuard>
    <>
      <NavigationProgress />
      <DashboardLayout>{children}</DashboardLayout>
      <GlobalDialogs />
    </>
    // </AuthGuard>
  );
}
