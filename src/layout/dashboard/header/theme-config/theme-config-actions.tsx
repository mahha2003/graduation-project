import { useTheme } from "next-themes";

import { Client } from "@/configs/api";
import { THEME_PRESETS } from "@/configs/theme-presets";
import { useThemeStore } from "@/store/theme-store";
import decorateToaster from "@/utils/decorate-toaster";

import {
  extractThemePresetValue,
  transformFormDataToThemeVars,
} from "./theme-data-transformer";

export const useThemeConfigActions = () => {
  const { theme: currentMode } = useTheme();
  const { vars, applyVars, resetVars, setThemePreset } = useThemeStore();

  const onSubmit = async (
    data: Record<string, unknown>,
    setIsLoading: (loading: boolean) => void
  ) => {
    const action = async () => {
      setIsLoading(true);

      const root =
        typeof window !== "undefined" ? document.documentElement : null;
      const currentIsDarkMode =
        root?.classList.contains("dark") ?? currentMode === "dark";

      const fullTheme = transformFormDataToThemeVars(
        data,
        vars,
        currentIsDarkMode
      );
      const themePresetValue = extractThemePresetValue(data);

      // await Client.admin().post<Theme>("/themes", {
      //   theme: {
      //     ...fullTheme,
      //     // theme_preset: {
      //     //   value: themePresetValue?.value,
      //     //   label: themePresetValue?.label,
      //     // },
      //   },
      // });

      applyVars(fullTheme);
      if (themePresetValue) {
        setThemePreset(themePresetValue);
      }
    };

    await decorateToaster(action(), {
      afterSuccess: () => {
        setIsLoading(false);
      },
      afterFinally: () => {
        setIsLoading(false);
      },
    });
  };

  const handleResetTheme = async () => {
    const action = async () => {
      const defaultPreset = THEME_PRESETS.find(
        (preset) => preset.name === "Default"
      );

      if (!defaultPreset?.theme) {
        resetVars();
        setThemePreset(null);
        return;
      }

      const defaultTheme = { ...defaultPreset.theme };

      // await Client.admin().themes.createOrUpdateTheme({
      //   theme: {
      //     ...defaultTheme,
      //     // theme_preset: {
      //     //   value: defaultPreset.id,
      //     //   label: defaultPreset.name,
      //     // },
      //   },
      // });

      applyVars(defaultTheme);
      setThemePreset({
        value: defaultPreset.id,
        label: defaultPreset.name,
      });
    };

    await decorateToaster(action(), {});
  };

  const handleResetToPresetTheme = async () => {
    const action = async () => {
      await useThemeStore.getState().loadThemeFromAPI();
    };

    await decorateToaster(action(), {});
  };

  return {
    onSubmit,
    handleResetTheme,
    handleResetToPresetTheme,
  };
};
