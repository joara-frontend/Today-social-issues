"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { Matcher, OnSelectHandler } from "react-day-picker";

import { useSelectedDate } from "@/entities/Issue/model/SelectedDateContext";
import CalendarWidget from "@/features/DateSelection/ui/CalendarWidget";
import { cn } from "@shared/lib/cn";
import { getEditionTitle } from "@shared/lib/formatEditionDate";
import { Button } from "@shared/ui/button";

const disableFutureDates: Matcher = {
  after: startOfDay(new Date()),
};

export default function Nav() {
  const calendarPopoverId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { selectedDate, hasUserSelectedDate, selectDate } = useSelectedDate();

  const editionLabel = getEditionTitle(hasUserSelectedDate, selectedDate);

  const closeCalendar = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  const handleDateSelect: OnSelectHandler<Date | undefined> = useCallback(
    (date) => {
      if (!date) {
        return;
      }

      selectDate(date);
      closeCalendar();
    },
    [closeCalendar, selectDate],
  );

  const toggleCalendar = useCallback(() => {
    setIsCalendarOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isCalendarOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        closeCalendar();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCalendar();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeCalendar, isCalendarOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div ref={containerRef} className="relative flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground"
            aria-label="날짜 선택"
            aria-expanded={isCalendarOpen}
            aria-controls={calendarPopoverId}
            onClick={toggleCalendar}
          >
            <CalendarIcon className="size-4" aria-hidden="true" />
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            {editionLabel}
          </span>

          {isCalendarOpen ? (
            <div
              id={calendarPopoverId}
              role="dialog"
              aria-label="날짜 선택 캘린더"
              className={cn(
                "absolute top-full left-0 z-50 mt-2 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
              )}
            >
              <CalendarWidget
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                defaultMonth={selectedDate}
                disabled={disableFutureDates}
                endMonth={startOfDay(new Date())}
              />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
