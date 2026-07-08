import { fetchIssuesByDate } from "@/entities/issue/api";
import { IssueList } from "@/widgets/IssueList";
import { todayDateStr } from "@/shared/lib/formatDate";
import { SITE_NAME } from "@/shared/config";

export const revalidate = 3600;

export default async function HomePage() {
  const today = todayDateStr();
  const issues = await fetchIssuesByDate(today);

  return (
    <div>
      <section className="mx-auto max-w-3xl px-6 pt-18 pb-14 text-center md:pt-18 md:pb-14">
        <div className="rounded-pill bg-brand-tint text-brand mb-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wide">
          매일 아침 이슈 줍줍
        </div>
        <h1 className="text-text-primary mb-3.5 text-3xl leading-tight font-extrabold tracking-tight md:text-4xl">
          오늘의 이슈, <span className="text-brand">{SITE_NAME}</span>가 다
          모아왔어요
        </h1>
        <p className="text-text-tertiary md:text-md mb-8 text-base leading-relaxed">
          사회·경제·테크·컬처, 그날의 진짜 이슈 3가지만 골라 매일 아침
          전해드려요
        </p>
        <a
          href="#content"
          className="rounded-pill bg-brand duration-base inline-block px-7 py-3.5 text-sm font-bold text-white transition-colors hover:opacity-90"
        >
          오늘 이슈 보러가기
        </a>
      </section>

      <div id="content">
        <IssueList initialDate={today} initialIssues={issues} />
      </div>
    </div>
  );
}
