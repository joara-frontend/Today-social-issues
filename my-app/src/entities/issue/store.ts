import { create } from "zustand";
import type { CategoryKey } from "@/shared/config";
import { todayDateStr } from "@/shared/lib/formatDate";

interface IssueUIState {
  selectedDate: string;
  selectedCategory: CategoryKey;
  calendarOpen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  setSelectedDate: (date: string) => void;
  setSelectedCategory: (category: CategoryKey) => void;
  toggleCalendar: () => void;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;
  jumpToResult: (date: string, category: CategoryKey) => void;
}

export const useIssueUIStore = create<IssueUIState>((set) => ({
  selectedDate: todayDateStr(),
  selectedCategory: "society",
  calendarOpen: false,
  searchOpen: false,
  searchQuery: "",
  setSelectedDate: (date) => set({ selectedDate: date, calendarOpen: false }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  toggleCalendar: () => set((state) => ({ calendarOpen: !state.calendarOpen })),
  toggleSearch: () =>
    set((state) => ({
      searchOpen: !state.searchOpen,
      searchQuery: state.searchOpen ? "" : state.searchQuery,
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  jumpToResult: (date, category) =>
    set({
      selectedDate: date,
      selectedCategory: category,
      searchOpen: false,
      searchQuery: "",
    }),
}));
