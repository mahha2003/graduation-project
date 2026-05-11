import { useEffect, useRef } from "react";

import { UseFormReturn } from "react-hook-form";

import { useDebouncedCallback } from "@/components/tanstack-table/hooks/use-debounced-callback";
import { useThemeStore } from "@/store/theme-store";
import { hexToOklch } from "@/utils/colors-helper";

import { SPACING_FIELDS } from "./theme-config-constants";

type UseThemeFormWatcherOptions = {
  formHook: UseFormReturn<Record<string, unknown>>;
  isDarkMode: boolean;
  isPresetChangingRef: React.MutableRefObject<boolean>;
};

/**
 * Hook to watch form changes and apply theme preview with debouncing
 */
export const useThemeFormWatcher = ({
  formHook,
  isDarkMode,
  isPresetChangingRef,
}: UseThemeFormWatcherOptions) => {
  const isInitialMountRef = useRef(true);
  const prevFormValuesRef = useRef<Record<string, unknown>>({});

  const debouncedApplyTheme = useDebouncedCallback(
    (formValues: Record<string, unknown>) => {
      if (isPresetChangingRef.current || isInitialMountRef.current) {
        return;
      }

      const changes: Array<{
        field: string;
        oldValue: unknown;
        newValue: unknown;
      }> = [];

      Object.keys(formValues).forEach((key) => {
        const oldValue = prevFormValuesRef.current[key];
        const newValue = formValues[key];

        if (key === "theme_preset") {
          return;
        }

        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          changes.push({
            field: key,
            oldValue,
            newValue,
          });
        }
      });

      if (changes.length > 0) {
        const changedFieldsOnly: Record<string, string> = {};

        changes.forEach(({ field, newValue }) => {
          if (
            SPACING_FIELDS.includes(field as (typeof SPACING_FIELDS)[number])
          ) {
            if (Array.isArray(newValue) && newValue.length > 0) {
              changedFieldsOnly[field] = `${newValue[0]}rem`;
            } else if (typeof newValue === "number") {
              changedFieldsOnly[field] = `${newValue}rem`;
            }
          } else if (typeof newValue === "string" && newValue.startsWith("#")) {
            // Handle color fields
            if (isDarkMode) {
              changedFieldsOnly[`${field}_dark`] = hexToOklch(newValue);
            } else {
              changedFieldsOnly[field] = hexToOklch(newValue);
            }
          }
        });

        const currentVars = useThemeStore.getState().vars;
        const updatedVars = { ...currentVars, ...changedFieldsOnly };
        useThemeStore.getState().applyVars(updatedVars);
      }

      prevFormValuesRef.current = { ...formValues };
    },
    500
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      isInitialMountRef.current = false;
      prevFormValuesRef.current = formHook.getValues();
    }, 500);

    const subscription = formHook.watch((formValues) => {
      if (isPresetChangingRef.current || isInitialMountRef.current) {
        return;
      }
      debouncedApplyTheme(formValues);
    });

    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [formHook, debouncedApplyTheme, isPresetChangingRef]);
};
