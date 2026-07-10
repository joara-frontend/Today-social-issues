export type CategoryKey = "society" | "economy" | "tech" | "culture";

export interface CategoryConfig {
  key: CategoryKey;
  label: string;
  /** Tailwind utility classes driven by the matching @theme color tokens */
  textClass: string;
  borderClass: string;
  tintBgClass: string;
  /** Google News RSS search query used by the cron collector */
  rssQuery: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: "society",
    label: "사회·시사",
    textClass: "text-cat-society",
    borderClass: "border-cat-society",
    tintBgClass: "bg-cat-society-tint",
    rssQuery: "사회 정치 시사",
  },
  {
    key: "economy",
    label: "경제·금융",
    textClass: "text-cat-economy",
    borderClass: "border-cat-economy",
    tintBgClass: "bg-cat-economy-tint",
    rssQuery: "경제 금융 증시",
  },
  {
    key: "tech",
    label: "테크·AI",
    textClass: "text-cat-tech",
    borderClass: "border-cat-tech",
    tintBgClass: "bg-cat-tech-tint",
    rssQuery: "IT AI 기술",
  },
  {
    key: "culture",
    label: "컬처·트렌드",
    textClass: "text-cat-culture",
    borderClass: "border-cat-culture",
    tintBgClass: "bg-cat-culture-tint",
    rssQuery: "문화 트렌드 라이프스타일",
  },
];

export const CATEGORY_MAP: Record<CategoryKey, CategoryConfig> =
  Object.fromEntries(CATEGORIES.map((c) => [c.key, c])) as Record<
    CategoryKey,
    CategoryConfig
  >;

export const ISSUES_PER_CATEGORY_PER_DAY = 3;
export const RSS_POOL_SIZE_PER_CATEGORY = 30;

export const SITE_NAME = "도토리";
