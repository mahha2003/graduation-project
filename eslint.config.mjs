import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import checkFilePlugin from "eslint-plugin-check-file";
import nPlugin from "eslint-plugin-n";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: {
      n: nPlugin,
      "check-file": checkFilePlugin,
    },
    rules: {
      "n/no-process-env": "error",
      "max-lines": ["warn", 250],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "prefer-template": "warn",
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!^[.*": "KEBAB_CASE",
        },
      ],
      "no-restricted-imports": [
        "warn",
        {
          paths: [
            {
              name: "next/link",
              message: "Please import from `@/i18n/routing` instead.",
            },
            {
              name: "next/navigation",
              importNames: ["redirect", "permanentRedirect", "usePathname"],
              message: "Please import from `@/i18n/routing` instead.",
            },
          ],
        },
      ],
    },
    ignores: ["src/components/ui/**"],
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".cursor/**",
    ".vscode/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
