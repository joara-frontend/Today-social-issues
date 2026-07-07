import type { Issue } from "@/entities/issue/types";

interface IssueListProps {
  initialDate: string;
  initialIssues: Issue[];
}

// TODO: 직접 구현 — 이슈 목록 위젯 (카테고리 탭 + 카드 리스트 조합)

export function IssueList({ initialDate, initialIssues }: IssueListProps) {
  void initialDate;
  void initialIssues;
  return <div>TODO: 직접 구현 — IssueList</div>;
}
