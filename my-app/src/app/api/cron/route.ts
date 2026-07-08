// import { NextResponse } from "next/server";
import { fetchCategoryFeed } from "@/shared/lib/rss";
import type { NextRequest } from "next/server";

export const maxDuration = 300;

// TODO: 직접 구현 — RSS 수집 → Gemini 요약 → Supabase upsert 파이프라인

export async function GET(request: NextRequest) {
  // void request;
  // return NextResponse.json(
  //   { message: "TODO: 직접 구현 필요" },
  //   { status: 501 }
  // );
  const items = await fetchCategoryFeed("경제 금융", 3);
  console.log(items);
  return Response.json(items);
}
