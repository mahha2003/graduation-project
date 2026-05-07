"use client";

import { useId } from "react";

import { Controller } from "react-hook-form";

import { InputFieldProps } from "@/components/FormBuilder/FormFields/input-field";

import { cn } from "src/lib/utils";

const ColorField = ({
  name,
  control,
  label,
  required = false,
  containerClassName,
  inputClassName,
  labelClassName,
  errorClassName,
  onChange,
  hidden = false,
  disabled = false,
  inputProps = {},
}: InputFieldProps & { inputClassName?: string }) => {
  const id = useId();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div
          className={cn(
            "col-span-12 p-0",
            { "cursor-not-allowed opacity-50": disabled },
            { hidden: hidden },
            containerClassName
          )}
        >
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "text-foreground mb-1 block text-sm font-medium",
                labelClassName
              )}
            >
              {label}
              {required && <span className="ml-1 text-red-500">{"*"}</span>}
            </label>
          )}

          <input
            id={id}
            type="color"
            className={cn(
              "h-9 min-h-auto w-9 rounded border-[18px] py-0",
              "cursor-pointer appearance-none",
              "focus:outline-none",
              {
                "border-red-500 focus:ring-red-500": !!error,
              },
              inputClassName
            )}
            style={{
              backgroundColor: field.value || "#000000",
              borderColor: field.value || "#000000",
            }}
            {...field}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.value);
              } else {
                field.onChange(e);
              }
            }}
            value={field.value || "#000000"}
            disabled={disabled}
            {...inputProps}
          />
          {error && (
            <span className={cn("text-sm text-red-500", errorClassName)}>
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default ColorField;
