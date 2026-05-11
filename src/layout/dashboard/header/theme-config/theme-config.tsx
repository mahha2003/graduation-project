"use client";

import { useEffect, useMemo, useRef } from "react";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { useWatch } from "react-hook-form";

import FormBuilder from "@/components/FormBuilder/form-builder";
import useFormBuilder from "@/components/FormBuilder/hooks/use-form-builder";
import { useConfirmDialog } from "@/components/dialog";
import { Button } from "@/components/ui/button";

import { useThemeConfigActions } from "./theme-config-actions";
import { createThemeConfigFields } from "./theme-config-fields";
import { useThemeConfigHooks } from "./theme-config-hooks";
import { useThemeFormWatcher } from "./use-theme-form-watcher";

function ThemeConfig() {
  const t = useTranslations();

  const {
    isLoading,
    setIsLoading,
    changePresetTheme,
    isDarkMode,
    getInitialFormValues,
  } = useThemeConfigHooks();

  const confirmDialog = useConfirmDialog();

  const {
    onSubmit,
    handleResetTheme,
    handleResetToPresetTheme: resetToPresetThemeAction,
  } = useThemeConfigActions();

  const fields = useMemo(() => createThemeConfigFields(t), [t]);

  const formHook = useFormBuilder(fields, {
    defaultValues: {},
  });

  const watchPresetTheme = useWatch({
    control: formHook.control,
    name: "theme_preset",
  });

  const isPresetChangingRef = useRef(false);
  const isInitialMountRef = useRef(true);

  const handleSubmit = async (data: Record<string, unknown>) => {
    await onSubmit(data, setIsLoading);
  };

  useThemeFormWatcher({
    // @ts-expect-error - theme is not typed
    formHook,
    isDarkMode,
    isPresetChangingRef,
  });

  useEffect(() => {
    formHook.reset(getInitialFormValues({}));
    const timer = setTimeout(() => {
      isInitialMountRef.current = false;
    }, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialMountRef.current) {
      return;
    }

    if (watchPresetTheme?.value) {
      changePresetTheme({ preset_theme_id: watchPresetTheme.value });

      const formValues = getInitialFormValues({});

      const rest = { ...formValues };
      delete rest.preset_theme;

      formHook.reset(rest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchPresetTheme?.value]);

  const handleResetToDefaultTheme = async () => {
    await confirmDialog({
      title: t("Reset the theme"),
      message: t("Are you sure you want to reset the theme to default?"),
      type: "warning",
      confirmText: t("Reset"),
      cancelText: t("Cancel"),
      onConfirm: async () => {
        setIsLoading(true);
        await handleResetTheme();
        formHook.reset(getInitialFormValues({}));
        setIsLoading(false);
      },
    });
  };

  const handleResetToPresetTheme = async () => {
    setIsLoading(true);
    await resetToPresetThemeAction();
    formHook.reset(getInitialFormValues({}));
    setIsLoading(false);
  };

  return (
    <div className="relative w-full pb-16">
      <FormBuilder
        fields={fields}
        FormHooks={formHook}
        containerClassName="col-span-12 "
      />

      <div className="fixed bottom-3 mx-4 flex transform justify-center gap-3 justify-self-start rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-lg dark:border-white/10 dark:bg-black/10">
        <Button
          onClick={handleResetToDefaultTheme}
          disabled={isLoading}
          className="border border-red-300/30 bg-red-500/20 text-red-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-red-300/50 hover:bg-red-500/30 hover:shadow-xl dark:text-red-400"
        >
          {t("Reset the theme")}
        </Button>
        <Button
          onClick={formHook.handleSubmit(handleSubmit)}
          disabled={isLoading}
          className="border border-green-300/30 bg-green-500/20 text-green-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-green-300/50 hover:bg-green-500/30 hover:shadow-xl dark:text-green-400"
        >
          {t("Save the theme")}
        </Button>
      </div>

      <Button
        onClick={handleResetToPresetTheme}
        disabled={isLoading}
        variant="ghost"
        size={"sm"}
        className="absolute -top-12 flex items-center gap-2 p-0.5 text-xs ltr:right-1 rtl:left-1"
      >
        <Icon icon="mdi:refresh" width={18} height={18} />
        {t("Reset")}
      </Button>
    </div>
  );
}

export default ThemeConfig;
