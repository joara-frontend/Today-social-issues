import { useQuery } from "@tanstack/react-query";
import type { CategoryKey } from "@/shared/config";
import type { Issue } from "./types";

// TODO: 직접 구현 — Supabase 조회 로직

export async function fetchIssuesByDate(date: string): Promise<Issue[]> {
  void date;
  return [];
}

export async function fetchIssueById(id: string): Promise<Issue | null> {
  void id;
  return null;
}

export async function searchIssues(query: string): Promise<Issue[]> {
  void query;
  return [];
}

export function useIssuesByDate(date: string, initialData?: Issue[]) {
  return useQuery({
    queryKey: ["issues", "by-date", date],
    queryFn: () => fetchIssuesByDate(date),
    initialData,
  });
}

export function useIssue(id: string, initialData?: Issue | null) {
  return useQuery({
    queryKey: ["issues", "by-id", id],
    queryFn: () => fetchIssueById(id),
    initialData,
  });
}

export function useSearchIssues(query: string) {
  return useQuery({
    queryKey: ["issues", "search", query],
    queryFn: () => searchIssues(query),
    enabled: query.trim().length > 0,
  });
}

export function groupByCategory(issues: Issue[]): Record<CategoryKey, Issue[]> {
  return issues.reduce(
    (acc, issue) => {
      acc[issue.category] = acc[issue.category] ?? [];
      acc[issue.category].push(issue);
      return acc;
    },
    {} as Record<CategoryKey, Issue[]>
  );
}
