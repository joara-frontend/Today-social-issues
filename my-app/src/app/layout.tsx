import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { SITE_NAME } from "@/shared/config";

export const metadata: Metadata = {
  metadataBase: new URL("https://today-social-issues.vercel.app/"),
  title: `${SITE_NAME} - 하루 3분, 오늘 진짜 이슈만`,
  description:
    "매일 아침, 사회·경제·테크·컬처 이슈를 AI가 3줄로 요약해 전해드려요.",
  openGraph: {
    title: `${SITE_NAME} - 하루 3분, 오늘 진짜 이슈만`,
    description:
      "매일 아침, 사회·경제·테크·컬처 이슈를 AI가 3줄로 요약해 전해드려요.",
    url: "https://today-social-issues.vercel.app/",
    siteName: `${SITE_NAME}`,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - 하루 3분, 오늘 진짜 이슈만`,
    description:
      "매일 아침, 사회·경제·테크·컬처 이슈를 AI가 3줄로 요약해 전해드려요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className="bg-bg text-text-primary flex min-h-full flex-col">
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
