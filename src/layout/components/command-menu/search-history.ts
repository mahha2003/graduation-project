import { MAX_HISTORY_ITEMS, SEARCH_HISTORY_KEY } from "./constants";

export const getSearchHistory = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveSearchHistory = (history: string[]): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch {}
};

export const addToSearchHistory = (search: string): void => {
  if (!search.trim()) return;
  const history = getSearchHistory();
  const filtered = history.filter((item) => item !== search);
  const newHistory = [search, ...filtered].slice(0, MAX_HISTORY_ITEMS);
  saveSearchHistory(newHistory);
};

export const clearSearchHistory = (): void => {
  saveSearchHistory([]);
};
