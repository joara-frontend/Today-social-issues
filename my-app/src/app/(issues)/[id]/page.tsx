import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchIssueById } from "@/entities/issue/api";
import { CATEGORY_MAP } from "@/shared/config";
import { formatDateFull } from "@/shared/lib/formatDate";

export const revalidate = 3600;

interface IssueDetailPageProps {
  params: Promise<{ id: string }>;
}

const SUMMARY_LABELS = ["무슨 일이야", "왜 난리야", "앞으로 어떻게 될까"];

export default async function IssueDetailPage({
  params,
}: IssueDetailPageProps) {
  const { id } = await params;
  const issue = await fetchIssueById(id);

  if (!issue) {
    notFound();
  }

  const cat = CATEGORY_MAP[issue.category];
  const summaries = [issue.summary_1, issue.summary_2, issue.summary_3];

  return (
    <article className="mx-auto max-w-2xl px-4 pt-8 pb-24 md:px-6 md:pt-11">
      <Link
        href="/"
        className="text-text-muted duration-base hover:text-text-primary mb-6 inline-flex items-center gap-1 text-sm font-semibold transition-colors"
      >
        ← 목록으로
      </Link>

      <div
        className={`rounded-pill mb-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-bold ${cat.tintBgClass} ${cat.textClass}`}
      >
        {cat.label}
      </div>

      <h1 className="text-text-primary mb-2 text-2xl leading-snug font-extrabold tracking-tight md:text-3xl">
        {issue.title}
      </h1>
      <div className="text-text-muted mb-8 text-sm">
        {formatDateFull(issue.published_at)} · {issue.source_name}
      </div>

      <div className="flex flex-col gap-5">
        {summaries.map((summary, i) => (
          <div
            key={i}
            className="border-border-soft rounded-md border p-5 md:p-6"
          >
            <div className={`mb-2 text-xs font-bold ${cat.textClass}`}>
              {SUMMARY_LABELS[i]}
            </div>
            <p className="text-md text-text-primary leading-relaxed">
              {summary}
            </p>
          </div>
        ))}
      </div>

      <a
        href={issue.source_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary duration-base hover:text-text-primary mt-8 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
      >
        원문 보기 ({issue.source_name}) ↗
      </a>
    </article>
  );
}
