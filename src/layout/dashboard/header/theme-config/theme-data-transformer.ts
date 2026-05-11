import { hexToOklch } from "@/utils/colors-helper";

import { SPACING_FIELDS } from "./theme-config-constants";

/**
 * Transforms form data to theme vars format for API submission
 */
export const transformFormDataToThemeVars = (
  data: Record<string, unknown>,
  currentVars: Record<string, string>,
  isDarkMode: boolean
): Record<string, string> => {
  const fullTheme: Record<string, string> = { ...currentVars };

  Object.entries(data).forEach(([key, value]) => {
    if (key === "theme_preset") return;

    if (typeof value === "string" && value.startsWith("#")) {
      const oklch = hexToOklch(value);
      if (isDarkMode) {
        fullTheme[`${key}_dark`] = oklch;
      } else {
        fullTheme[key] = oklch;
      }
    } else if (Array.isArray(value) && value.length > 0) {
      // Add "rem" suffix for spacing fields
      if (SPACING_FIELDS.includes(key as (typeof SPACING_FIELDS)[number])) {
        fullTheme[key] = `${value[0]}rem`;
      } else {
        fullTheme[key] = value[0].toString();
      }
    } else if (typeof value === "number") {
      // Add "rem" suffix for spacing fields
      if (SPACING_FIELDS.includes(key as (typeof SPACING_FIELDS)[number])) {
        fullTheme[key] = `${value}rem`;
      } else {
        fullTheme[key] = value.toString();
      }
    }
  });

  return fullTheme;
};

/**
 * Extracts theme preset value from form data
 */
export const extractThemePresetValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): {
  value: number;
  label: string;
} | null => {
  if (
    data.theme_preset &&
    typeof data.theme_preset === "object" &&
    !Array.isArray(data.theme_preset) &&
    typeof data.theme_preset.value === "number" &&
    typeof data.theme_preset.label === "string"
  ) {
    return {
      value: data.theme_preset.value,
      label: data.theme_preset.label,
    };
  }

  return null;
};
