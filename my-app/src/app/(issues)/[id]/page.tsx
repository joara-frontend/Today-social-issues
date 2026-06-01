type IssueDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function IssueDetailPage({ params }: IssueDetailPageProps) {
  const { id } = await params;

  return (
    <main>
      <h1>이슈 상세</h1>
      <p>이슈 ID: {id}</p>
    </main>
  );
}
