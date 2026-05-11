"use client";

import { useMemo } from "react";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { usePathname } from "@/i18n/routing";

import { CrumbContent, Separator } from "./breadcrumb-navigation-components";
import { ANIMATION, buildBreadcrumbs } from "./breadcrumb-navigation-utils";

export default function BreadcrumbNavigation() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();

  const breadcrumbs = useMemo(
    () => buildBreadcrumbs(pathname, locale),
    [pathname, locale]
  );

  if (breadcrumbs.length === 0) return null;

  const isRtl = locale === "ar";

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const delay = index * ANIMATION.delayMultiplier;

          return (
            <motion.div
              key={`${crumb.label}-${index}-${pathname}`}
              initial={{
                opacity: 0,
                x: isRtl ? 10 : -10,
                scale: 0.9,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                delay,
                duration: ANIMATION.duration,
                ease: ANIMATION.ease,
              }}
              className="inline-flex items-center"
            >
              <BreadcrumbItem>
                <CrumbContent
                  crumb={crumb}
                  index={index}
                  isLast={isLast}
                  delay={delay}
                  locale={locale}
                  t={t}
                />
              </BreadcrumbItem>
              {!isLast && <Separator index={index} locale={locale} />}
            </motion.div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
