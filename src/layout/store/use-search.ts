import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type SearchStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  _initKeyboardListener: () => void;
};

let keyboardListenerInitialized = false;

export const useSearch = create<SearchStore>()(
  subscribeWithSelector((set, get) => ({
    open: false,

    setOpen: (open: boolean) => {
      set({ open });
    },

    toggleOpen: () => {
      set((state) => ({ open: !state.open }));
    },

    _initKeyboardListener: () => {
      if (keyboardListenerInitialized || typeof document === "undefined")
        return;

      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          get().toggleOpen();
        }
      };

      document.addEventListener("keydown", down);
      keyboardListenerInitialized = true;

      return () => {
        document.removeEventListener("keydown", down);
        keyboardListenerInitialized = false;
      };
    },
  }))
);

useSearch.getState()._initKeyboardListener();
