import { create } from "zustand";

import { getCookie, setCookie } from "@/lib/cookies";

export type Collapsible = "offcanvas" | "icon" | "none";
export type Variant = "inset" | "sidebar" | "floating";

const LAYOUT_COLLAPSIBLE_COOKIE_NAME = "layout_collapsible";
const LAYOUT_VARIANT_COOKIE_NAME = "layout_variant";
const LAYOUT_FIXED_COOKIE_NAME = "layout_fixed";
const LAYOUT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const DEFAULT_VARIANT: Variant = "inset";
const DEFAULT_COLLAPSIBLE: Collapsible = "icon";
const DEFAULT_FIXED: boolean = true;

type LayoutStore = {
  collapsible: Collapsible;
  variant: Variant;
  fixed: boolean;

  defaultCollapsible: Collapsible;
  defaultVariant: Variant;
  defaultFixed: boolean;

  setCollapsible: (collapsible: Collapsible) => void;
  setVariant: (variant: Variant) => void;
  setFixed: (fixed: boolean) => void;
  resetLayout: () => void;
};

export const useLayout = create<LayoutStore>()((set, get) => ({
  collapsible: (() => {
    const saved = getCookie(LAYOUT_COLLAPSIBLE_COOKIE_NAME);
    return (saved as Collapsible) || DEFAULT_COLLAPSIBLE;
  })(),

  variant: (() => {
    const saved = getCookie(LAYOUT_VARIANT_COOKIE_NAME);
    return (saved as Variant) || DEFAULT_VARIANT;
  })(),

  fixed: (() => {
    const saved = getCookie(LAYOUT_FIXED_COOKIE_NAME);
    return saved ? JSON.parse(saved) : DEFAULT_FIXED;
  })(),

  defaultCollapsible: DEFAULT_COLLAPSIBLE,
  defaultVariant: DEFAULT_VARIANT,
  defaultFixed: DEFAULT_FIXED,

  setCollapsible: (newCollapsible: Collapsible) => {
    set({ collapsible: newCollapsible });
    setCookie(
      LAYOUT_COLLAPSIBLE_COOKIE_NAME,
      newCollapsible,
      LAYOUT_COOKIE_MAX_AGE
    );
  },

  setVariant: (newVariant: Variant) => {
    set({ variant: newVariant });
    setCookie(LAYOUT_VARIANT_COOKIE_NAME, newVariant, LAYOUT_COOKIE_MAX_AGE);
  },

  setFixed: (newFixed: boolean) => {
    set({ fixed: newFixed });
    setCookie(
      LAYOUT_FIXED_COOKIE_NAME,
      JSON.stringify(newFixed),
      LAYOUT_COOKIE_MAX_AGE
    );
  },

  resetLayout: () => {
    const {
      defaultCollapsible,
      defaultVariant,
      defaultFixed,
      setCollapsible,
      setVariant,
      setFixed,
    } = get();
    setCollapsible(defaultCollapsible);
    setVariant(defaultVariant);
    setFixed(defaultFixed);
  },
}));
