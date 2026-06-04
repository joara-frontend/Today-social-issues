"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const [selectedDate, setSelectedDate] = useState<string>("today");

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">Today&apos;s Edition</span>
        </div>
        <button
          onClick={() => setSelectedDate("today")}
          className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-200"
        >
          View Archive
        </button>
      </div>
    </nav>
  );
}
