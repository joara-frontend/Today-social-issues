import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ThreeLineSummary {
  summary_1: string;
  summary_2: string;
  summary_3: string;
}

export async function summarizeIssue(
  title: string,
  categoryLabel: string
): Promise<ThreeLineSummary> {
  const prompt = `너는  ${categoryLabel} 카테고리의 뉴스 이슈를 한국어로 3줄 요약하는 전문가야.

다음 뉴스 제목을 보고 아래 JSON 형식으로만 응답해줘.
제목: ${title}
카테고리: ${categoryLabel}

{
  "summary_1": "무슨 일인지",
  "summary_2": "왜 중요한지/배경",
  "summary_3": "앞으로 전망"
}`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = (response.text ?? "").replace(/```json\n?|\n?```/g, "").trim();
  const parsed = JSON.parse(text);
  return parsed as ThreeLineSummary;
}
