import { resolveCssVar } from "./css-color-to-hex";

const CSS_VARS = [
  "--primary",
  "--secondary",
  "--background",
  "--foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--destructive",
  "--card",
  "--popover",
  "--border",
];

const EXTRA_COLORS = ["#000000", "#ffffff", "transparent"];

export function getThemeColors(): string[] {
  const resolved = CSS_VARS.map((v) => resolveCssVar(v));
  return [...resolved, ...EXTRA_COLORS];
}
