"use client";

// Error boundaries must be Client Components
import { useEffect } from "react";

import { AlertTriangle, MessageCircle, RefreshCw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Main } from "@/layout";
import { contactWithSupportUrl } from "@/utils/contact-with-support";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleContactSupport = () => {
    const whatsappUrl = contactWithSupportUrl(locale);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Main>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-8 px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="bg-destructive/10 rounded-full p-6">
            <AlertTriangle size={64} className="text-destructive" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl leading-tight font-bold">
              {t("Oops! Something went wrong")}
            </h1>
            <p className="text-muted-foreground max-w-2xl text-2xl">
              {t("UnexpectedErrorDescription")}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">{t("What can you do?")}</h2>
            <p className="text-muted-foreground max-w-lg">
              {t("UnexpectedErrorAction")}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={reset}
              size="lg"
              variant="outline"
              className="gap-2 px-8 py-6"
            >
              <RefreshCw size={20} />
              {t("Try Again")}
            </Button>

            <Button
              onClick={handleContactSupport}
              size="lg"
              className="gap-2 px-8 py-6"
            >
              <MessageCircle size={20} />
              {t("Contact Support")}
            </Button>
          </div>

          <div className="text-muted-foreground text-sm">
            {t("Error ID")}: {error.digest || "Unknown"}
          </div>
        </div>
      </div>
    </Main>
  );
}
