import { create } from "zustand";

interface IssueFilterState {
  category: string | null;
  setCategory: (category: string | null) => void;
}

export const useIssueFilterStore = create<IssueFilterState>((set) => ({
  category: null,
  setCategory: (category) => set({ category }),
}));
