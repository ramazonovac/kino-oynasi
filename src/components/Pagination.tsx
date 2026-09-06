import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getVisiblePages(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) {
    pages.push("ellipsis");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total - 1) {
    pages.push("ellipsis");
  }

  pages.push(total);
  return pages;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav aria-label="Sahifalar" className="flex items-center justify-center gap-2 pt-6">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Oldingi sahifa"
        className={cn(
          "grid h-10 w-10 place-items-center rounded-full border transition-colors",
          currentPage === 1
            ? "border-border bg-secondary/50 text-muted-foreground cursor-not-allowed opacity-60"
            : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-10 w-8 items-end justify-center pb-1 text-sm text-muted-foreground"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={currentPage === p ? "page" : undefined}
              aria-label={`Sahifa ${p}`}
              className={cn(
                "h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition-colors",
                currentPage === p
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Keyingi sahifa"
        className={cn(
          "grid h-10 w-10 place-items-center rounded-full border transition-colors",
          currentPage === totalPages
            ? "border-border bg-secondary/50 text-muted-foreground cursor-not-allowed opacity-60"
            : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}
