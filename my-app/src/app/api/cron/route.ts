import { NextResponse } from "next/server";
import { fetchCategoryFeed } from "@/shared/lib/rss";
import type { NextRequest } from "next/server";
import { CATEGORIES, ISSUES_PER_CATEGORY_PER_DAY } from "@/shared/config";
import { summarizeIssue } from "@/shared/lib/gemini";
import { createSupabaseAdminClient } from "@/shared/config/supabase";
import { toDateStr } from "@/shared/lib/formatDate";
import type { IssueInsert } from "@/entities/issue/types";

export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseAdmin = createSupabaseAdminClient();
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 500 }
    );
  }

  const rows: IssueInsert[] = [];
  for (const category of CATEGORIES) {
    // items = 이 카테고리의 뉴스 기사 3개 (title, link, sourceName, publishedAt)
    const items = await fetchCategoryFeed(
      category.rssQuery,
      ISSUES_PER_CATEGORY_PER_DAY
    );

    for (const item of items) {
      // 기사 한 개씩 Gemini 요약
      try {
        const summary = await summarizeIssue(item.title, category.label);
        rows.push({
          title: item.title,
          summary_1: summary.summary_1,
          summary_2: summary.summary_2,
          summary_3: summary.summary_3,
          category: category.key,
          source_url: item.link,
          source_name: item.sourceName,
          published_at: toDateStr(
            item.publishedAt.getFullYear(),
            item.publishedAt.getMonth(),
            item.publishedAt.getDate()
          ),
        });
      } catch (error) {
        console.error(`Failed to summarize "${item.title}":`, error);
      }
      await new Promise((resolve) => setTimeout(resolve, 13000)); // Gemini 2.5 Flash 무료 티어의 분당 요청 제한이 5회, 다음 호출까지 13초 대기
    }
  }

  const { error } = await supabaseAdmin
    .from("issues")
    .upsert(rows, { onConflict: "source_url,published_at" });

  if (error) {
    console.error("Upsert failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inserted: rows.length });
}
