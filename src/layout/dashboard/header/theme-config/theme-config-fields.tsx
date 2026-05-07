import { useTranslations } from "next-intl";
import z from "zod";

import AutocompleteFieldOneTimeFetch from "@/components/FormBuilder/FormFields/autocomplete-field-one-time-fetch";
import prepareFields from "@/components/FormBuilder/utils/prepare-fields";
import { THEME_PRESETS, ThemePreset } from "@/configs/theme-presets";

import {
  createColorSection,
  createRadiusSection,
  createSpacingSection,
} from "./theme-section-creators";

export const createThemeConfigFields = (
  t: ReturnType<typeof useTranslations>
) => {
  return prepareFields({
    theme_preset: {
      type: "custom",
      zod: z
        .object({
          value: z.number(),
          label: z.string(),
        })
        .optional(),
      component: ({ control }: { control: unknown }) => (
        <div className="col-span-12">
          <AutocompleteFieldOneTimeFetch
            name="theme_preset"
            control={control}
            label={t("Select Theme" as Parameters<typeof t>[0])}
            multiple={false}
            oneTimeFetchAction={async () => THEME_PRESETS}
            getOptions={(result: ThemePreset[]) => {
              return result.map((item) => {
                return {
                  label: item.name,
                  value: item.id ?? 0,
                };
              });
            }}
          />
        </div>
      ),
      componentProps: ({ control }: { control: unknown }) => ({ control }),
    },
    custom_text: {
      type: "custom",
      component: () => (
        <div className="col-span-12">
          <div className="border-muted/10 bg-muted/20 rounded-lg border p-5 text-center shadow-sm">
            <h3 className="text-muted-foreground mb-1 text-base font-medium">
              {t("Theme Colors Configuration" as Parameters<typeof t>[0])}
            </h3>
            <p className="text-muted-foreground text-xs">
              {t(
                "Configure the colors for your application theme below" as Parameters<
                  typeof t
                >[0]
              )}
            </p>
          </div>
        </div>
      ),
      componentProps: {},
    },
    primary: createColorSection({
      title: "Primary",
      colorNames: ["primary", "primary_foreground"],
    }),
    secondary: createColorSection({
      title: "Secondary",
      colorNames: ["secondary", "secondary_foreground"],
    }),
    accent: createColorSection({
      title: "Accent",
      colorNames: ["accent", "accent_foreground"],
    }),
    background: createColorSection({
      title: "Background",
      colorNames: ["background"],
    }),
    card: createColorSection({
      title: "Card",
      colorNames: ["card", "card_foreground"],
    }),
    popover: createColorSection({
      title: "Popover",
      colorNames: ["popover", "popover_foreground"],
    }),
    muted: createColorSection({
      title: "Muted",
      colorNames: ["muted", "muted_foreground"],
    }),
    destructive: createColorSection({
      title: "Destructive",
      colorNames: ["destructive", "destructive_foreground"],
    }),
    border: createColorSection({
      title: "Border And Input",
      colorNames: ["border", "input", "ring"],
    }),
    chart_1: createColorSection({
      title: "Chart",
      colorNames: ["chart_1", "chart_2", "chart_3", "chart_4", "chart_5"],
    }),
    sidebar: createColorSection({
      title: "Sidebar",
      colorNames: [
        "sidebar",
        "sidebar_foreground",
        "sidebar_primary",
        "sidebar_primary_foreground",
        "sidebar_accent",
        "sidebar_accent_foreground",
        "sidebar_border",
        "sidebar_ring",
      ],
    }),
    spacing: createSpacingSection({
      title: "Spacing",
      fieldName: "spacing",
    }),
    radius: createRadiusSection({
      title: "Radius",
      fieldName: "radius",
    }),
  });
};
