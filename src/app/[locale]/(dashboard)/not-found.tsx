"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { ImageBaseUrl } from "@/configs/api";
import { Link } from "@/i18n/routing";
import { useThemeStore } from "@/store/theme-store";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const { logoUrl } = useThemeStore();

  return (
    <div className="from-background via-background/95 to-background/90 flex min-h-screen w-full flex-col items-center justify-center bg-linear-to-br p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-md text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <Image
            src={
              logoUrl && logoUrl.length > 0
                ? `${ImageBaseUrl}/${logoUrl}`
                : "/logo.png"
            }
            alt="Logo"
            width={48}
            height={32}
            className="object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-foreground mb-4 text-2xl font-bold sm:text-3xl"
        >
          {t("Title")}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mx-auto mb-8 max-w-sm"
        >
          {t("Description")}
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button asChild className="px-6 py-3 text-sm font-medium">
            <Link href={{ pathname: "/" }}>{t("Button")}</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
