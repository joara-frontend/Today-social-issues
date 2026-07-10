# 도토리 (Dotori)

매일 1회 RSS 피드를 수집해 Gemini로 3줄 요약을 생성하고, 카테고리별로 보여주는
뉴스 요약 서비스입니다. (사회·시사 / 경제·금융 / 테크·AI / 컬처·트렌드, 카테고리당
하루 3개 이슈)

## 기술 스택

Next.js 16 (App Router, Turbopack) · TypeScript (strict) · Tailwind CSS v4 ·
TanStack Query v5 · Zustand · rss-parser · Gemini 2.5 Flash · Supabase
(Postgres) · cron-job.org · Vercel

## 로컬 개발 설정

1. 의존성 설치

   ```bash
   npm install
   ```

2. `.env.local.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

   ```bash
   cp .env.local.example .env.local
   ```

   | 변수                            | 설명                                                                 |
   | ------------------------------- | -------------------------------------------------------------------- |
   | `GEMINI_API_KEY`                | [Google AI Studio](https://aistudio.google.com/apikey)에서 발급      |
   | `NEXT_PUBLIC_SUPABASE_URL`      | Supabase 프로젝트 URL                                                |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon(public) key — 목록/상세 페이지의 읽기 전용 접근에 사용 |
   | `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key — `/api/cron`에서만 서버 사이드로 사용     |
   | `CRON_SECRET`                   | `/api/cron` 호출을 인증하기 위한 임의의 시크릿 문자열                |

3. Supabase 프로젝트의 SQL Editor에서 [`supabase/schema.sql`](./supabase/schema.sql)을
   실행해 `issues` 테이블과 RLS 정책(공개 읽기)을 생성합니다.

4. 개발 서버 실행

   ```bash
   npm run dev
   ```

   http://localhost:3000 에서 확인합니다.

## 데이터 파이프라인

`GET /api/cron`이 호출되면 카테고리별로 Google News RSS(제목/링크/날짜만 수집,
원문 저장 없음)를 가져와 Gemini 2.5 Flash로 [무슨 일 / 왜 난리 / 앞으로 전망] 3줄
요약을 생성한 뒤 Supabase `issues` 테이블에 upsert합니다. 카테고리별 검색어는
[`src/shared/config/index.ts`](./src/shared/config/index.ts)의 `rssQuery`에서
바꿀 수 있습니다.

cron-job.org에서 매일 아침 아래처럼 호출하도록 등록하세요.

- URL: `https://<your-domain>/api/cron`
- Header: `Authorization: Bearer <CRON_SECRET>`

배포 전에 로컬에서 직접 확인하려면:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron
```

## 폴더 구조 (FSD 경량화)

```
src/
├── app/                 # 라우팅 전용 (App Router)
├── features/            # issue-card, issue-filter, issue-timeline
├── entities/issue/      # 타입, TanStack Query 훅, Zustand 스토어
├── shared/              # ui, lib, config (Supabase/Gemini/RSS 클라이언트 포함)
└── widgets/              # Header, Footer, IssueList
```

## Vercel 배포

1. GitHub 저장소를 Vercel에 연결합니다.
2. Vercel 프로젝트 설정 > Environment Variables에 위 5개 환경변수를 등록합니다.
3. 배포 후 cron-job.org에 프로덕션 도메인의 `/api/cron`을 등록합니다.
4. 홈/상세 페이지는 정적으로 캐시되며, 별도의 시간 기반 재검증(ISR) 없이
   [On-Demand Revalidation](https://nextjs.org/docs/app/guides/incremental-static-regeneration#on-demand-revalidation)만
   사용합니다. `/api/cron`이 이슈를 upsert한 직후 홈(`/`)과 새로 추가/갱신된
   이슈 상세 페이지(`/[id]`)를 `revalidatePath`로 무효화하므로, 캐시는 실제
   데이터가 바뀐 시점에만 갱신됩니다.
