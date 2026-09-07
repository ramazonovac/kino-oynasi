import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { TitleGrid } from "@/components/TitleGrid";
import { Pagination } from "@/components/Pagination";
import { usePagination } from "@/hooks/use-pagination";
import { series } from "@/lib/catalog";
import { useDbMovies } from "@/lib/db-movies";
import { useMemo } from "react";

export const Route = createFileRoute("/seriallar")({
  head: () => ({
    meta: [
      { title: "Seriallar — CineClub" },
      {
        name: "description",
        content: "CineClub seriallari: to'liq ma'lumot va Telegram orqali tomosha qilish.",
      },
      { property: "og:title", content: "Seriallar — CineClub" },
      { property: "og:description", content: "CineClub'dagi seriallar to'plami." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SeriallarPage,
});

function SeriallarPage() {
  const { currentItems, page, totalPages, setPage } = usePagination(series, 12);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
        <h1 className="text-4xl sm:text-5xl">Seriallar</h1>
        <p className="text-sm text-muted-foreground">
          Telegram orqali tomosha qilish mumkin bo'lgan seriallar.
        </p>
        <TitleGrid
          items={currentItems}
          emptyTitle="Serial topilmadi"
          emptyText="Tez orada yangi seriallar qo'shiladi."
        />
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </Layout>
  );
}
