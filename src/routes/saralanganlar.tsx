import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { TitleGrid } from "@/components/TitleGrid";
import { Pagination } from "@/components/Pagination";
import { usePagination } from "@/hooks/use-pagination";
import { catalog } from "@/lib/catalog";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/saralanganlar")({
  head: () => ({
    meta: [
      { title: "Saralanganlar — CineClub" },
      {
        name: "description",
        content: "O'zingiz saqlagan filmlar va seriallar ro'yxati shu yerda saqlanadi.",
      },
      { property: "og:title", content: "Saralanganlar — CineClub" },
      { property: "og:description", content: "Sizning shaxsiy tomosha ro'yxatingiz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SaralanganlarPage,
});

function SaralanganlarPage() {
  const { ids, ready } = useFavorites();
  const list = catalog.filter((t) => ids.includes(t.id));
  const { currentItems, page, totalPages, setPage } = usePagination(list, 12);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
        <h1 className="text-4xl sm:text-5xl">Saralanganlar</h1>
        {!ready ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-2/3 animate-pulse rounded-2xl bg-card" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <TitleGrid
              items={currentItems}
              emptyTitle="Ro'yxat bo'sh"
              emptyText="Filmlar sahifasidan yoqqan kinoni yurakcha tugmasi orqali qo'shing."
            />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>
    </Layout>
  );
}
