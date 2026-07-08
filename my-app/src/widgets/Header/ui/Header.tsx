"use client";

import { useState } from "react";
import Link from "next/link";
import { DateCalendar } from "@/features/issue-timeline";
import { SITE_NAME } from "@/shared/config";
import { SearchBox } from "./SearchBox";
import { MobileNavPanel } from "./MobileNavPanel";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-bg sticky top-0 z-50">
      <div className="border-border grid h-16 grid-cols-[1fr_auto_1fr] items-center border-b px-4 md:px-7">
        <div className="justify-self-start">
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="duration-base hover:bg-border-soft flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm transition-colors md:hidden"
            aria-label="메뉴 열기"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-icon"
            >
              <line
                x1="4"
                y1="7"
                x2="20"
                y2="7"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="17"
                x2="20"
                y2="17"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="hidden md:block">
            <DateCalendar />
          </div>
        </div>

        <Link href="/" className="flex items-center gap-2 justify-self-center">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="15" rx="6.4" ry="7.2" className="fill-brand" />
            <rect
              x="6"
              y="3.5"
              width="12"
              height="6.5"
              rx="3.2"
              fill="#8B5E34"
            />
            <rect x="11" y="1.4" width="2" height="4" rx="1" fill="#6B4423" />
          </svg>
          <span className="text-text-primary text-xl font-extrabold tracking-tight">
            {SITE_NAME}
          </span>
        </Link>

        <div className="justify-self-end">
          <SearchBox />
        </div>
      </div>

      {mobileMenuOpen && (
        <MobileNavPanel onClose={() => setMobileMenuOpen(false)} />
      )}
    </header>
  );
}
