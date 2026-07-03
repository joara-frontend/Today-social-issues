import { SITE_NAME } from "@/shared/config";

export function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-fg flex flex-wrap items-center justify-between gap-3.5 px-7 py-10">
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="15" rx="6.4" ry="7.2" className="fill-brand" />
          <rect x="6" y="3.5" width="12" height="6.5" rx="3.2" fill="#D9A26B" />
        </svg>
        <span className="text-md font-extrabold">{SITE_NAME}</span>
      </div>
      <div className="text-footer-fg/55 text-sm">
        © 2026 {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
