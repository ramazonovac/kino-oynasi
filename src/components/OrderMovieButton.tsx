import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const ORDER_URL = "https://t.me/vesterosolamiBOT";

export function OrderMovieButton({ className }: { className?: string }) {
  return (
    <a
      href={ORDER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]",
        className,
      )}
    >
      <Send className="h-4 w-4" />
      Kino buyurtma berish
    </a>
  );
}

export function OrderMovieFab() {
  return (
    <a
      href={ORDER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Kino buyurtma berish"
      className="fixed bottom-20 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105 md:bottom-6 md:right-6"
    >
      <Send className="h-4 w-4" />
      <span className="hidden sm:inline">Kino buyurtma berish</span>
    </a>
  );
}
