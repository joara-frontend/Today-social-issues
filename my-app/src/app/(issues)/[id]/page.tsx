export const revalidate = 3600;

interface IssueDetailPageProps {
  params: Promise<{ id: string }>;
}

// TODO: 직접 구현 — 이슈 상세 페이지

export default async function IssueDetailPage({
  params,
}: IssueDetailPageProps) {
  const { id } = await params;
  return <div>TODO: 직접 구현 — IssueDetailPage ({id})</div>;
}
