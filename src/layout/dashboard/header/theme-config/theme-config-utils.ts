import { THEME_PRESETS } from "@/configs/theme-presets";
import { oklchToHex } from "@/utils/colors-helper";

import { COLOR_FIELDS, SPACING_FIELDS } from "./theme-config-constants";

export const findMatchingPreset = ({
  vars,
  isDarkMode,
}: {
  vars: Record<string, string>;
  isDarkMode: boolean;
}): number | null => {
  if (!vars || Object.keys(vars).length === 0) {
    return null;
  }

  let bestMatch: { id: number; score: number } | null = null;

  for (const preset of THEME_PRESETS) {
    let matchCount = 0;
    let totalFields = 0;

    COLOR_FIELDS.forEach((field) => {
      const key = isDarkMode ? `${field}_dark` : field;
      const presetValue = preset.theme[key];
      const varsValue = vars[key];

      if (presetValue && varsValue) {
        totalFields++;
        if (presetValue === varsValue) {
          matchCount++;
        }
      }
    });

    if (totalFields > 0) {
      const score = matchCount / totalFields;
      if (score >= 0.8) {
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { id: preset.id, score };
        }
      }
    }
  }

  return bestMatch ? bestMatch.id : null;
};

export const convertThemeVarsToFormValues = ({
  vars,
  isDarkMode,
}: {
  vars: Record<string, string>;
  isDarkMode: boolean;
}): Record<string, unknown> => {
  const formValues: Record<string, unknown> = {};

  COLOR_FIELDS.forEach((field) => {
    const key = isDarkMode ? `${field}_dark` : field;
    const oklchValue = vars[key] || "";
    if (oklchValue) {
      formValues[field] = oklchToHex(oklchValue);
    }
  });

  SPACING_FIELDS.forEach((field) => {
    const value = vars[field];
    if (value !== undefined && value !== null) {
      const numValue = parseFloat(value.toString().replace(/rem|px|em/g, ""));
      if (!isNaN(numValue)) {
        formValues[field] = [numValue];
      }
    }
  });

  return formValues;
};

export const convertPresetToFormValues = ({
  preset,
  isDarkMode,
}: {
  preset: (typeof THEME_PRESETS)[number];
  isDarkMode: boolean;
}): Record<string, unknown> => {
  const formValues: Record<string, unknown> = {
    theme_preset: { value: preset.id, label: preset.name },
  };

  COLOR_FIELDS.forEach((field) => {
    const key = isDarkMode ? `${field}_dark` : field;
    const oklchValue = preset.theme[key] || "";
    if (oklchValue) {
      formValues[field] = oklchToHex(oklchValue);
    }
  });

  if (preset.theme.spacing !== undefined) {
    const spacingValue = preset.theme.spacing;
    const numValue = parseFloat(
      spacingValue.toString().replace(/rem|px|em/g, "")
    );
    if (!isNaN(numValue)) {
      formValues.spacing = [numValue];
    }
  }

  if (preset.theme.radius !== undefined) {
    const radiusValue = preset.theme.radius;
    const numValue = parseFloat(
      radiusValue.toString().replace(/rem|px|em/g, "")
    );
    if (!isNaN(numValue)) {
      formValues.radius = [numValue];
    }
  }

  return formValues;
};

export const parseNumericValue = ({
  value,
}: {
  value: string | number;
}): number | null => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const numValue = parseFloat(value.replace(/rem|px|em/g, ""));
    return isNaN(numValue) ? null : numValue;
  }

  return null;
};
