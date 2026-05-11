"use client";

import { useTranslations } from "next-intl";

import InputField from "@/components/FormBuilder/FormFields/input-field";
import SliderField from "@/components/FormBuilder/FormFields/slider-field"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import ColorField from "./color-field";

type FieldConfig = {
  name: string;
  type: "color" | "slider";
  sliderConfig?: {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number[];
  };
};

const SectionComponent = ({
  title,
  fields,
  titleSuffix = "",
  control,
}: {
  title: string;
  fields: FieldConfig[];
  titleSuffix?: string;
  control: unknown;
}) => {
  const t = useTranslations();

  return (
    <div className="col-span-12">
      <Accordion
        type="multiple"
        className="bg-muted/50 w-full overflow-hidden rounded-md border"
      >
        <AccordionItem value={`item-1`} className="border-b-0">
          <AccordionTrigger className={cn("rounded-t-md border-b-0 p-3 py-3")}>
            {titleSuffix
              ? t(`${title} ${titleSuffix}` as Parameters<typeof t>[0])
              : t(title as Parameters<typeof t>[0])}
          </AccordionTrigger>
          <AccordionContent className={cn("bg-background border-t")}>
            <div className="flex flex-col gap-4 p-3 text-balance">
              {fields.map((field) => {
                const displayName = field.name
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase());

                if (field.type === "color") {
                  return (
                    <div key={field.name}>
                      <p className="text-muted-foreground mb-1 text-xs font-medium">
                        {t(`${displayName} Color` as Parameters<typeof t>[0])}
                      </p>
                      <div className="flex w-full justify-between gap-2">
                        <ColorField
                          name={field.name}
                          control={control}
                          type="color"
                          containerClassName="flex-1 p-0 max-w-10 w-full"
                        />
                        <InputField
                          name={field.name}
                          control={control}
                          type="text"
                          label={displayName}
                          containerClassName="flex-auto p-0 w-full"
                          errorClassName="text-xs text-red-500"
                          labelClassName="text-xs  hidden"
                        />
                      </div>
                    </div>
                  );
                }

                if (field.type === "slider") {
                  return (
                    <SliderField
                      key={field.name}
                      name={field.name}
                      control={control}
                      label={t(displayName as Parameters<typeof t>[0])}
                      defaultValue={field.sliderConfig?.defaultValue || [50]}
                      sliderProps={{
                        max: field.sliderConfig?.max || 100,
                        min: field.sliderConfig?.min || 0,
                        step: field.sliderConfig?.step || 1,
                      }}
                      containerClassName="col-span-12 p-0"
                      labelClassName="text-sm"
                    />
                  );
                }

                return null;
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const createSection = ({
  title,
  fields,
  titleSuffix = "",
}: {
  title: string;
  fields: FieldConfig[];
  titleSuffix?: string;
}) => ({
  type: "custom" as const,
  component: SectionComponent,
  componentProps: ({ control }: { control: unknown }) => ({
    title,
    fields,
    titleSuffix,
    control,
  }),
});

export const createColorSection = ({
  title,
  colorNames,
  titleSuffix = "Color",
}: {
  title: string;
  colorNames: string[];
  titleSuffix?: string;
}) =>
  createSection({
    title,
    fields: colorNames.map((name) => ({ name, type: "color" as const })),
    titleSuffix,
  });

export const createSpacingSection = ({
  title,
  fieldName,
  titleSuffix = "",
}: {
  title: string;
  fieldName: string;
  titleSuffix?: string;
}) =>
  createSection({
    title,
    fields: [
      {
        name: fieldName,
        type: "slider",
        sliderConfig: {
          min: 0.18,
          max: 0.35,
          step: 0.01,
          defaultValue: [0.18],
        },
      },
    ],
    titleSuffix,
  });

export const createRadiusSection = ({
  title,
  fieldName,
  titleSuffix = "",
}: {
  title: string;
  fieldName: string;
  titleSuffix?: string;
}) =>
  createSection({
    title,
    fields: [
      {
        name: fieldName,
        type: "slider",
        sliderConfig: {
          min: 0,
          max: 5,
          step: 0.01,
          defaultValue: [0.5],
        },
      },
    ],
    titleSuffix,
  });
