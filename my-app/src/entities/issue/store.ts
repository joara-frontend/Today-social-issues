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

// TODO: 직접 구현 — Zustand 스토어 액션 로직

export const useIssueUIStore = create<IssueUIState>(() => ({
  selectedDate: todayDateStr(),
  selectedCategory: "society",
  calendarOpen: false,
  searchOpen: false,
  searchQuery: "",
  setSelectedDate: () => {},
  setSelectedCategory: () => {},
  toggleCalendar: () => {},
  toggleSearch: () => {},
  setSearchQuery: () => {},
  jumpToResult: () => {},
}));
