"use client";

import { CATEGORIES } from "@/shared/config";
import { useIssueUIStore } from "@/entities/issue/store";
import { cn } from "@/shared/lib/cn";

export function CategoryTabs() {
  const selectedCategory = useIssueUIStore((s) => s.selectedCategory);
  const setSelectedCategory = useIssueUIStore((s) => s.setSelectedCategory);

  return (
    <div className="border-border bg-bg border-b">
      <div className="mx-auto flex max-w-2xl gap-1 overflow-x-auto px-4 md:px-6">
        {CATEGORIES.map((cat) => {
          const isActive = cat.key === selectedCategory;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={cn(
                "duration-base md:text-md cursor-pointer border-b-2 px-1.5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors",
                isActive
                  ? cn(cat.borderClass, cat.textClass, "font-bold")
                  : "text-text-muted border-transparent"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
