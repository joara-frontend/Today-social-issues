export interface ThreeLineSummary {
  summary_1: string;
  summary_2: string;
  summary_3: string;
}

// TODO: 직접 구현 — Gemini 2.5 Flash로 3줄 요약 생성

export async function summarizeIssue(
  title: string,
  categoryLabel: string
): Promise<ThreeLineSummary> {
  void title;
  void categoryLabel;
  throw new Error("TODO: 구현 필요");
}
