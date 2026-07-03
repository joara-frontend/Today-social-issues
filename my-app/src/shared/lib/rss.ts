import Parser from "rss-parser";
import { ISSUES_PER_CATEGORY_PER_DAY } from "@/shared/config";

const parser = new Parser();

export interface RssItem {
  title: string;
  link: string;
  sourceName: string;
  publishedAt: Date;
}

function buildFeedUrl(query: string) {
  const params = new URLSearchParams({
    q: query,
    hl: "ko",
    gl: "KR",
    ceid: "KR:ko",
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

/** Extracts "OO일보" style source name Google News appends to the title as " - 언론사명". */
function splitTitleAndSource(rawTitle: string) {
  const idx = rawTitle.lastIndexOf(" - ");
  if (idx === -1) return { title: rawTitle, sourceName: "언론사 미상" };
  return {
    title: rawTitle.slice(0, idx),
    sourceName: rawTitle.slice(idx + 3),
  };
}

/** Fetches, title/link/date only — never persists article bodies (copyright). */
export async function fetchCategoryFeed(
  query: string,
  limit = ISSUES_PER_CATEGORY_PER_DAY
): Promise<RssItem[]> {
  const feed = await parser.parseURL(buildFeedUrl(query));

  return (feed.items ?? [])
    .filter((item) => item.title && item.link)
    .slice(0, limit)
    .map((item) => {
      const { title, sourceName } = splitTitleAndSource(item.title!);
      return {
        title,
        link: item.link!,
        sourceName,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      };
    });
}
