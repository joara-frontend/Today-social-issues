import Parser from "rss-parser";

export interface RssItem {
  title: string;
  link: string;
  sourceName: string;
  publishedAt: Date;
}

export async function fetchCategoryFeed(
  query: string,
  limit?: number
): Promise<RssItem[]> {
  const parser = new Parser();
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ko&gl=KR&ceid=KR:ko`;

  try {
    const feed = await parser.parseURL(url);
    const items: RssItem[] = feed.items.slice(0, limit).map((item) => ({
      title: item.title || "",
      link: item.link || "",
      sourceName: item.source?.name || "",
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
    }));
    return items;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}
