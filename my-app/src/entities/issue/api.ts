import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/config/supabase";
import type { CategoryKey } from "@/shared/config";
import type { Issue } from "./types";

export async function fetchIssuesByDate(date: string): Promise<Issue[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .eq("published_at", date)
    .order("category", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function fetchIssueById(id: string): Promise<Issue | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function searchIssues(query: string): Promise<Issue[]> {
  const trimmed = query.trim();
  if (!trimmed || !supabase) return [];

  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .ilike("title", `%${trimmed}%`)
    .order("published_at", { ascending: false })
    .limit(8);

  if (error) throw error;
  return data ?? [];
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
