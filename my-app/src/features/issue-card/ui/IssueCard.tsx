import type { Issue } from "@/entities/issue/types";

interface IssueCardProps {
  issue: Issue;
}

// TODO: 직접 구현 — 이슈 카드 UI

export function IssueCard({ issue }: IssueCardProps) {
  void issue;
  return <div>TODO: 직접 구현 — IssueCard</div>;
}
