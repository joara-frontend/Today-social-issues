import Image from "next/image";
import { Issue } from "../types";

interface IssueListItemProps extends Issue {
  index: number;
}

export default function IssueListItem({
  index,
  title,
  summary,
  date,
  imageId,
}: IssueListItemProps) {
  return (
    <article
      // key={selectedDate.toISOString()}
      // data-selected-date={selectedDate.toISOString()}
      className="group cursor-pointer transition-all duration-300 hover:translate-x-1"
    >
      <div className="grid md:grid-cols-[240px_1fr] gap-6 pb-8 border-b border-border last:border-0">
        <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden">
          <Image
            fill
            src={`https://images.unsplash.com/photo-${imageId}?w=480&h=360&fit=crop&auto=format`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-center space-y-3">
          <div className="flex items-baseline gap-4">
            <span className="font-['Work_Sans'] text-sm font-medium text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <time className="text-xs text-muted-foreground uppercase tracking-wider">
              {date}
            </time>
          </div>
          <h2 className="font-['Work_Sans'] text-xl font-semibold tracking-tight leading-tight group-hover:text-muted-foreground transition-colors duration-200">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {summary}
          </p>
        </div>
      </div>
    </article>
  );
}
