import { GoogleGenAI, Type } from "@google/genai";

let client: GoogleGenAI | null = null;

function getClient() {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  }
  return client;
}

export interface ThreeLineSummary {
  summary_1: string;
  summary_2: string;
  summary_3: string;
}

/**
 * Generates an independent 3-line AI summary from the article title alone
 * (article bodies are never stored/passed, to respect source copyright).
 */
export async function summarizeIssue(
  title: string,
  categoryLabel: string
): Promise<ThreeLineSummary> {
  const prompt = `너는 뉴스 큐레이션 서비스 "이슈픽"의 에디터야. 아래 기사 제목만 보고, 이 이슈를 잘 모르는 20~30대 독자에게 아래 3가지 포인트를 각각 한 문장으로 설명해줘.
- summary_1: 무슨 일이 있었는지
- summary_2: 왜 화제/논란이 되고 있는지
- summary_3: 앞으로 어떻게 전개될지 전망

카테고리: ${categoryLabel}
기사 제목: ${title}

말투는 친근하지만 정보 전달이 정확해야 하고, 각 문장은 60자 이내로 작성해줘. 기사 원문을 인용하지 말고 네가 알고 있는 배경지식으로 독립적으로 작성해.`;

  const response = await getClient().models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary_1: { type: Type.STRING },
          summary_2: { type: Type.STRING },
          summary_3: { type: Type.STRING },
        },
        required: ["summary_1", "summary_2", "summary_3"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error(`Gemini returned no content for title: ${title}`);
  }

  return JSON.parse(text) as ThreeLineSummary;
}
