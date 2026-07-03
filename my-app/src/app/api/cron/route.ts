import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CATEGORIES } from "@/shared/config";
import { fetchCategoryFeed } from "@/shared/lib/rss";
import { summarizeIssue } from "@/shared/lib/gemini";
import { createSupabaseAdminClient } from "@/shared/config/supabase";
import { todayDateStr } from "@/shared/lib/formatDate";
import type { IssueInsert } from "@/entities/issue/types";

export const maxDuration = 300;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const header = request.headers.get("authorization");
  if (header === `Bearer ${secret}`) return true;

  const queryToken = request.nextUrl.searchParams.get("secret");
  return queryToken === secret;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase가 설정되지 않았습니다 (.env.local 확인)" },
      { status: 500 }
    );
  }

  const publishedAt = todayDateStr();
  const results: { category: string; inserted: number; errors: string[] }[] =
    [];

  for (const cat of CATEGORIES) {
    const errors: string[] = [];
    let inserted = 0;

    try {
      const items = await fetchCategoryFeed(cat.rssQuery);
      const rows: IssueInsert[] = [];

      for (const item of items) {
        try {
          const summary = await summarizeIssue(item.title, cat.label);
          rows.push({
            title: item.title,
            summary_1: summary.summary_1,
            summary_2: summary.summary_2,
            summary_3: summary.summary_3,
            category: cat.key,
            source_url: item.link,
            source_name: item.sourceName,
            published_at: publishedAt,
          });
        } catch (err) {
          errors.push(`summarize failed for "${item.title}": ${String(err)}`);
        }
      }

      if (rows.length > 0) {
        // supabase-js's upsert() only infers `Row` correctly from a fresh
        // array literal (excess-property checks don't run on a pre-typed
        // variable); `rows` is already typed as IssueInsert[], so cast here.
        const { error, count } = await supabase
          .from("issues")
          .upsert(rows as never, {
            onConflict: "source_url,published_at",
            ignoreDuplicates: true,
            count: "exact",
          });

        if (error) {
          errors.push(`supabase upsert failed: ${error.message}`);
        } else {
          inserted = count ?? rows.length;
        }
      }
    } catch (err) {
      errors.push(`feed fetch failed: ${String(err)}`);
    }

    results.push({ category: cat.key, inserted, errors });
  }

  return NextResponse.json({ publishedAt, results });
}
