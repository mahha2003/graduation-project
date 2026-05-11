"use client";

import dynamic from "next/dynamic";
import { useCallback, useId, useMemo, useRef } from "react";

import { Controller } from "react-hook-form";
import type ReactQuill from "react-quill-new";
import ReactQuillType from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { cn } from "@/lib/utils";
import { getThemeColors } from "@/utils/quill-theme-colors";
import { uploadFile } from "@/utils/upload-file";

import FieldError from "../components/field-error";
import FieldLabel from "../components/field-label";
import FieldWrapper from "../components/field-wrapper";
import { BaseFieldComponentProps } from "../types/all-fields";

const ReactQuillComponent = dynamic(
  async () => {
    const hljs = (await import("highlight.js")).default;
    (window as any).hljs = hljs;

    const Quill = (await import("quill")).default;
    const { default: RQ } = await import("react-quill-new");
    const { default: QuillResizeImage } = await import("quill-resize-image");

    Quill.register("modules/resize", QuillResizeImage);

    const Component = ({
      forwardedRef,
      ...props
    }: {
      forwardedRef: React.MutableRefObject<ReactQuillType | null>;
    } & React.ComponentProps<typeof RQ>) => (
      <RQ {...props} ref={forwardedRef} />
    );
    Component.displayName = "ReactQuillComponent";
    return Component;
  },
  { ssr: false }
);

const FORMATS = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "blockquote",
  "code-block",
  "list",
  "align",
  "link",
  "image",
];

export type TextEditorFieldProps = BaseFieldComponentProps & {
  toolbar?: unknown[][];
};

const TextEditorField = ({
  name,
  control,
  label,
  required = false,
  containerClassName,
  errorClassName,
  labelClassName,
  LabelComponent,
  ErrorComponent,
  disabled = false,
  hidden = false,
  toolbar,
}: TextEditorFieldProps) => {
  const id = useId();

  const quillRef = useRef<ReactQuill>(null);
  const imageHandlerRef = useRef<() => void>(null);

  imageHandlerRef.current = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const url = await uploadFile(file);
      if (!url) return;

      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection(true);
      if (!quill || !range) return;

      quill.insertEmbed(range.index, "image", url);
      quill.setSelection(range.index + 1);
    };
  }, []);

  const modules = useMemo(() => {
    const colors = typeof window !== "undefined" ? getThemeColors() : [];

    return {
      toolbar: {
        container: toolbar ?? [
          [{ header: [1, 2, 3, false] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: colors }, { background: colors }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: () => imageHandlerRef.current?.(),
        },
      },
      resize: {
        locale: {},
      },
      syntax: true,
    };
  }, []);

  if (hidden) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FieldWrapper
          disabled={disabled}
          hidden={hidden}
          containerClassName={containerClassName}
        >
          <FieldLabel
            LabelComponent={LabelComponent}
            htmlFor={id}
            labelClassName={labelClassName}
            label={label}
            required={required}
          />
          <div
            className={cn(
              "quill-wrapper border-border bg-background overflow-hidden rounded-3xl border",
              disabled && "pointer-events-none opacity-50"
            )}
            style={{ minHeight: 300 }}
          >
            <ReactQuillComponent
              key={field.value === "" ? "empty" : "loaded"}
              forwardedRef={quillRef}
              theme="snow"
              value={field.value ?? ""}
              onChange={(html: string) => field.onChange(html)}
              onBlur={field.onBlur}
              readOnly={disabled}
              modules={modules}
              formats={FORMATS}
              style={{ minHeight: 300 }}
            />
          </div>
          <FieldError
            error={error}
            errorClassName={errorClassName}
            ErrorComponent={ErrorComponent}
          />
        </FieldWrapper>
      )}
    />
  );
};

export default TextEditorField;
