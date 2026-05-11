import type { SVGProps } from "react";

export type ThemeValue = "light" | "dark" | "system";

export interface RadioItem {
  value: string;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface SectionTitleProps {
  title: string;
  showReset?: boolean;
  onReset?: () => void;
  className?: string;
}

export interface RadioGroupItemProps {
  item: RadioItem;
  isTheme?: boolean;
}
