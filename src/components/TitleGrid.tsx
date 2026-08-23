import type { Title } from "@/lib/catalog";
import { TitleCard } from "./TitleCard";
import { SearchX } from "lucide-react";

export function TitleGrid({
  items,
  emptyTitle = "Hech narsa topilmadi",
  emptyText = "Boshqa kalit so'z yoki filtr bilan urinib ko'ring.",
}: {
  items: Title[];
  emptyTitle?: string;
  emptyText?: string;
}) {
  if (items.length === 0) {
    return (
      <div className="animate-rise grid place-items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
        <SearchX className="mb-3 h-10 w-10 text-muted-foreground" />
        <h3 className="text-xl">{emptyTitle}</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
      {items.map((t) => (
        <TitleCard key={t.id} item={t} className="animate-rise" />
      ))}
    </div>
  );
}
