"use client";

import { useTranslations } from "next-intl";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/store/use-user-store";

export default function Home() {
  const { user } = useUserStore();
  const t = useTranslations();

  if (!user) {
    return null;
  }

  const displayName = user.full_name || user.email?.split("@")[0] || user.username || "User";

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            {t("Welcome")}, {displayName}! 👋
          </CardTitle>
          <CardDescription>{t("We are glad to have you here")}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
