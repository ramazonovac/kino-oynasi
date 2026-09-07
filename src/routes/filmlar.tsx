import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { TitleGrid } from "@/components/TitleGrid";
import { Pagination } from "@/components/Pagination";
import { usePagination } from "@/hooks/use-pagination";
import { films } from "@/lib/catalog";
import { useDbMovies } from "@/lib/db-movies";

export const Route = createFileRoute("/filmlar")({
  head: () => ({
    meta: [
      { title: "Filmlar — CineClub" },
      {
        name: "description",
        content:
          "CineClub filmlari: to'liq ma'lumot, janr filtri va Telegram orqali tomosha qilish.",
      },
      { property: "og:title", content: "Filmlar — CineClub" },
      {
        property: "og:description",
        content: "Tanlangan filmlar to'plami va Telegram havolalari.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FilmlarPage,
});

function FilmlarPage() {
  const [genre, setGenre] = useState<string>("Barchasi");
  const { films: dbFilms } = useDbMovies();
  const allFilms = useMemo(() => [...dbFilms, ...films], [dbFilms]);
  const genres = useMemo(
    () => Array.from(new Set(allFilms.flatMap((f) => f.genres))).sort((a, b) => a.localeCompare(b)),
    [allFilms],
  );
  const list =
    genre === "Barchasi" ? allFilms : allFilms.filter((f) => f.genres.includes(genre));
  const { currentItems, page, totalPages, setPage } = usePagination(list, 12);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
        <h1 className="text-4xl sm:text-5xl">Filmlar</h1>

        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {["Barchasi", ...genres].map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                genre === g
                  ? "border-transparent brand-gradient text-primary-foreground"
                  : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <TitleGrid
          items={currentItems}
          emptyTitle="Film topilmadi"
          emptyText="Bu janrda hozircha film yo'q."
        />
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </Layout>
  );
}
