"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SelectedDateContextValue = {
  selectedDate: Date;
  hasUserSelectedDate: boolean;
  selectDate: (date: Date) => void;
};

const SelectedDateContext = createContext<SelectedDateContextValue | null>(null);

type SelectedDateProviderProps = {
  children: ReactNode;
};

export function SelectedDateProvider({ children }: SelectedDateProviderProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [hasUserSelectedDate, setHasUserSelectedDate] = useState(false);

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setHasUserSelectedDate(true);
  }, []);

  const value = useMemo<SelectedDateContextValue>(
    () => ({
      selectedDate,
      hasUserSelectedDate,
      selectDate,
    }),
    [hasUserSelectedDate, selectDate, selectedDate],
  );

  return (
    <SelectedDateContext.Provider value={value}>
      {children}
    </SelectedDateContext.Provider>
  );
}

export function useSelectedDate(): SelectedDateContextValue {
  const context = useContext(SelectedDateContext);

  if (!context) {
    throw new Error(
      "useSelectedDate must be used within a SelectedDateProvider",
    );
  }

  return context;
}
