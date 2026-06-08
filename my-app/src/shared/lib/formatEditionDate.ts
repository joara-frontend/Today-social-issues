import { format } from "date-fns";

export function formatEditionDate(date: Date): string {
  return format(date, "yyyy.MM.dd");
}

export function formatEditionLabel(date: Date): string {
  return `${formatEditionDate(date)} Edition`;
}

export function getEditionTitle(
  hasUserSelectedDate: boolean,
  date: Date,
): string {
  if (!hasUserSelectedDate) {
    return "Today's Edition";
  }

  return formatEditionLabel(date);
}

export function getTop3IssuesTitle(
  hasUserSelectedDate: boolean,
  date: Date,
): string {
  if (!hasUserSelectedDate) {
    return "Today's Top 3 Issues";
  }

  return `${formatEditionDate(date)} Top 3 Issues`;
}
