import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const maxDuration = 300;

// TODO: 직접 구현 — RSS 수집 → Gemini 요약 → Supabase upsert 파이프라인

export async function GET(request: NextRequest) {
  void request;
  return NextResponse.json(
    { message: "TODO: 직접 구현 필요" },
    { status: 501 }
  );
}
