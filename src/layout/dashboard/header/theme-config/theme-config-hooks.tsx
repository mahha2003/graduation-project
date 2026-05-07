import { useCallback, useState } from "react";

import { useTheme } from "next-themes";
import { UseFormReturn } from "react-hook-form";

import { THEME_PRESETS } from "@/configs/theme-presets";
import { useThemeStore } from "@/store/theme-store";

import {
  convertPresetToFormValues,
  convertThemeVarsToFormValues,
  findMatchingPreset,
} from "./theme-config-utils";

export const useThemeConfigHooks = () => {
  const { theme: currentMode } = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<number | null>(null);

  const { applyVars, setThemePreset } = useThemeStore();

  const handlePresetChange = (
    themeId: number,
    formHook: UseFormReturn<Record<string, unknown>>,
    isDarkMode: boolean
  ) => {
    if (themeId === currentTheme) return;

    const preset = THEME_PRESETS.find((p) => p.id === themeId);
    if (!preset) return;

    setCurrentTheme(preset.id);
    applyVars({ ...preset.theme });
    setThemePreset({ value: preset.id, label: preset.name });

    const formValues = convertPresetToFormValues({ preset, isDarkMode });

    // Reset form with new values - this will trigger watch subscription
    // but isPresetChangingRef will prevent preview updates
    formHook.reset(formValues, {
      keepDefaultValues: false,
      keepValues: false,
    });
  };

  const getInitialFormValues = useCallback(
    ({}: object): Record<string, unknown> => {
      const isDarkMode = currentMode === "dark";

      const { vars: updatedVars, themePreset: updatedPreset } =
        useThemeStore.getState();

      const formValues = convertThemeVarsToFormValues({
        vars: updatedVars,
        isDarkMode,
      });

      if (updatedPreset) {
        formValues.theme_preset = updatedPreset;
        setCurrentTheme(updatedPreset.value);
      } else {
        const matchingPresetId = findMatchingPreset({
          vars: updatedVars,
          isDarkMode,
        });
        if (matchingPresetId !== null) {
          const preset = THEME_PRESETS.find((p) => p.id === matchingPresetId);
          if (preset) {
            formValues.theme_preset = { value: preset.id, label: preset.name };
            setCurrentTheme(preset.id);
          }
        }
      }

      return formValues;
    },
    [currentMode]
  );

  const changePresetTheme = ({
    preset_theme_id,
  }: {
    preset_theme_id: number;
  }) => {
    const preset = THEME_PRESETS.find((p) => p.id === preset_theme_id);

    if (!preset) return;

    applyVars({ ...preset.theme });
    setThemePreset({ value: preset.id, label: preset.name });
  };

  return {
    isLoading,
    setIsLoading,
    currentTheme,
    handlePresetChange,
    isDarkMode: currentMode === "dark",
    getInitialFormValues,
    changePresetTheme,
  };
};
