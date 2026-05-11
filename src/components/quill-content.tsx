"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "react-quill-new/dist/quill.snow.css";

type QuillContentProps = {
  html: string;
  className?: string;
};

export default function QuillContent({ html, className }: QuillContentProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    editorRef.current.innerHTML = html;

    editorRef.current.querySelectorAll("pre[data-language]").forEach((block) => {
      const pre = block as HTMLElement;
      const lang = pre.dataset.language ?? "plaintext";
      const code = document.createElement("code");
      code.classList.add(`language-${lang}`);
      code.innerHTML = pre.innerHTML;
      pre.innerHTML = "";
      pre.appendChild(code);
      hljs.highlightElement(code);
    });
  }, [html]);

  return (
    <div className="ql-snow border-0!">
      <div
        ref={editorRef}
        className={`ql-editor p-0! ${className ?? ""}`}
      />
    </div>
  );
}
