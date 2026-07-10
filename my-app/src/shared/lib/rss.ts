import Parser from "rss-parser";

export interface RssItem {
  title: string;
  link: string;
  sourceName: string;
  publishedAt: Date;
}

function splitTitleAndSource(RssTitle: string): {
  title: string;
  sourceName: string;
} {
  const targetIndex = RssTitle.lastIndexOf("-");
  const title = RssTitle.substring(0, targetIndex).trim();
  const sourceName = RssTitle.substring(targetIndex + 1).trim();
  if (targetIndex === -1) {
    return { title: RssTitle.trim(), sourceName: "" };
  }
  return { title, sourceName };
}

export async function fetchCategoryFeed(
  query: string,
  limit?: number
): Promise<RssItem[]> {
  const parser = new Parser();
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(`${query} when:1d`)}&hl=ko&gl=KR&ceid=KR:ko`;

  try {
    const feed = await parser.parseURL(url);
    const items: RssItem[] = feed.items.slice(0, limit).map((item) => {
      const { title, sourceName } = splitTitleAndSource(item.title || "");
      return {
        title,
        link: item.link || "",
        sourceName,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      };
    });
    return items;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return [];
  }
}
