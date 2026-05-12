"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FAQItem } from "./types";

interface FAQSectionProps {
  items: FAQItem[];
  image: string;
}

export default function FAQSection({ items, image }: FAQSectionProps) {
  const t = useTranslations("faq");

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">
          {t("title")}
        </h2>
      </div>

      {/* CONTENT */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* FAQ */}
        <div className="order-2 lg:order-1">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
              {t("empty")}
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-xl border border-slate-200 bg-white px-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-slate-800 hover:no-underline dark:text-white">
                    {item.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {/* IMAGE */}
        <div className="order-1 w-full overflow-hidden rounded-3xl lg:order-2">
          <div className="relative h-[220px] w-full sm:h-[300px] lg:h-[400px]">
            <Image
              src={image}
              alt="FAQ"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
