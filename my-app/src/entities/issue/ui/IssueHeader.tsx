"use client";

import { useSelectedDate } from "@/entities/Issue/model/SelectedDateContext";
import { getTop3IssuesTitle } from "@shared/lib/formatEditionDate";

export default function IssueHeader() {
  const { selectedDate, hasUserSelectedDate } = useSelectedDate();
  const title = getTop3IssuesTitle(hasUserSelectedDate, selectedDate);

  return (
    <div className="mb-12">
      <h1 className="font-work-sans font-semibold text-3xl tracking-tight mb-2">
        {title}
      </h1>
    </div>
  );
}
