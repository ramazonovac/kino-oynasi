import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { TitleGrid } from "@/components/TitleGrid";
import { Pagination } from "@/components/Pagination";
import { usePagination } from "@/hooks/use-pagination";
import { catalog, GENRES } from "@/lib/catalog";
import { useDbMovies } from "@/lib/db-movies";
import { useMemo } from "react";

export const Route = createFileRoute("/janrlar")({
  head: () => ({
    meta: [
      { title: "Janrlar — CineClub" },
      {
        name: "description",
        content: "Janr bo'yicha CineClub filmlari va seriallarini toping.",
      },
      { property: "og:title", content: "Janrlar — CineClub" },
      {
        property: "og:description",
        content: "Sevimli janringizni tanlang va mos kinolarni ko'ring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JanrlarPage,
});

function JanrlarPage() {
  const [active, setActive] = useState<string>(GENRES[0]!);
  const { rows } = useDbMovies();
  const allTitles = useMemo(
    () => [...rows.map(rowToTitle), ...catalog],
    [rows],
  );
  const list = allTitles.filter((t) => t.genres.includes(active));
  const { currentItems, page, totalPages, setPage } = usePagination(list, 12);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
        <h1 className="text-4xl sm:text-5xl">Janrlar</h1>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setActive(g)}
              className={`rounded-2xl border p-4 text-left text-lg font-semibold transition-transform hover:-translate-y-1 ${
                active === g
                  ? "border-transparent brand-gradient text-primary-foreground"
                  : "border-border bg-card"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <h2 className="pt-4 text-2xl">{active} janrida</h2>
        <TitleGrid items={currentItems} emptyText="Bu janrda hozircha kino yo'q." />
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </Layout>
  );
}
