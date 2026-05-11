"use client";

import { ChevronRight, Home } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import ProgressLink from "@/components/progress-link";
import {
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ValidHref } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { ANIMATION, type BreadcrumbCrumb } from "./breadcrumb-navigation-utils";

export const HomeIcon = ({
  index,
  delay,
  isLink = false,
}: {
  index: number;
  delay: number;
  isLink?: boolean;
}) => {
  if (index !== 0) return null;
  const iconProps = {
    className: cn(
      "text-muted-foreground h-3.5 w-3.5",
      isLink && "group-hover:text-foreground transition-colors"
    ),
  };
  return isLink ? (
    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
      <Home {...iconProps} />
    </motion.div>
  ) : (
    <motion.div
      initial={{ rotate: -180, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        delay: delay + ANIMATION.iconDelay,
        duration: 0.3,
        type: "spring",
        stiffness: ANIMATION.spring.stiffness,
      }}
    >
      <Home {...iconProps} />
    </motion.div>
  );
};

export const CrumbContent = ({
  crumb,
  index,
  isLast,
  delay,
  locale,
  t,
}: {
  crumb: BreadcrumbCrumb;
  index: number;
  isLast: boolean;
  delay: number;
  locale: string;
  t: ReturnType<typeof useTranslations>;
}) => {
  const isRtl = locale === "ar";

  if (isLast) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: delay + ANIMATION.pageDelay,
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        <BreadcrumbPage className="flex items-center gap-1.5 font-medium">
          <HomeIcon index={index} delay={delay} />
          {/* @ts-expect-error - label is dynamic element */}
          {t(crumb.label)}
        </BreadcrumbPage>
      </motion.div>
    );
  }

  if (crumb.href) {
    return (
      <motion.div
        whileHover={{ scale: 1.05, x: isRtl ? -2 : 2 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          ...ANIMATION.hover,
        }}
      >
        <BreadcrumbLink
          href={crumb.href as ValidHref}
          asChild
          className="hover:text-foreground flex items-center gap-1.5 transition-colors"
        >
          {/* @ts-expect-error - it is a valid href */}
          <ProgressLink href={crumb.href as ValidHref}>
            <HomeIcon index={index} delay={delay} isLink />
            {/* @ts-expect-error - label is dynamic element */}
            {t(crumb.label)}
          </ProgressLink>
        </BreadcrumbLink>
      </motion.div>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="text-muted-foreground"
    >
      {/* @ts-expect-error - label is dynamic element */}
      {t(crumb.label)}
    </motion.span>
  );
};

export const Separator = ({
  index,
  locale,
}: {
  index: number;
  locale: string;
}) => {
  const delay = index * ANIMATION.delayMultiplier;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -90 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        delay: delay + ANIMATION.separatorDelay,
        duration: 0.3,
        type: "spring",
        stiffness: ANIMATION.spring.stiffness,
      }}
    >
      <BreadcrumbSeparator
        className={cn(
          "rtl:rotate-180",
          "[&>svg]:transition-transform [&>svg]:duration-200"
        )}
      >
        <motion.div
          animate={{ x: locale === "ar" ? [-2, 0, -2] : [0, 2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
        </motion.div>
      </BreadcrumbSeparator>
    </motion.div>
  );
};
