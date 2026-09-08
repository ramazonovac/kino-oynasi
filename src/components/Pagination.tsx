import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getVisiblePages(current: number, total: number, isMobile: boolean): (number | "ellipsis")[] {
  const sibling = isMobile ? 0 : 1;
  const maxButtons = isMobile ? 5 : 7;

  if (total <= maxButtons) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  const start = Math.max(2, current - sibling);
  const end = Math.min(total - 1, current + sibling);

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
  const isMobile = useIsMobile();

  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages, isMobile);

  return (
    <nav
      aria-label="Sahifalar"
      className="flex flex-wrap items-center justify-center gap-1.5 pt-6 sm:gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Oldingi sahifa"
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors sm:h-10 sm:w-10",
          currentPage === 1
            ? "cursor-not-allowed border-border bg-secondary/50 text-muted-foreground opacity-60"
            : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-9 w-6 items-end justify-center pb-1 text-sm text-muted-foreground sm:h-10 sm:w-8"
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
                "h-9 min-w-9 shrink-0 rounded-full px-2.5 text-sm font-semibold transition-colors sm:h-10 sm:min-w-10 sm:px-3",
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
          "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors sm:h-10 sm:w-10",
          currentPage === totalPages
            ? "cursor-not-allowed border-border bg-secondary/50 text-muted-foreground opacity-60"
            : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </nav>
  );
}
