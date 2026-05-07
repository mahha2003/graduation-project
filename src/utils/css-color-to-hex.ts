export function cssColorToHex(color: string): string {
  if (typeof window === "undefined") return "#000000";

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "#000000";

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);

  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export function resolveCssVar(variable: string): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
  return cssColorToHex(raw);
}
