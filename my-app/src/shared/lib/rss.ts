export interface RssItem {
  title: string;
  link: string;
  sourceName: string;
  publishedAt: Date;
}

// TODO: 직접 구현 — Google News RSS 검색 결과에서 title/link/date 추출

export async function fetchCategoryFeed(
  query: string,
  limit?: number
): Promise<RssItem[]> {
  void query;
  void limit;
  return [];
}
