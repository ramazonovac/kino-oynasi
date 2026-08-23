import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { TitleGrid } from "@/components/TitleGrid";
import { searchTitles } from "@/lib/catalog";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/qidiruv")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Qidiruv natijalari — CineClub" },
      {
        name: "description",
        content: "Film yoki serial nomi bo'yicha qidiring va natijalarni bir zumda ko'ring.",
      },
      { property: "og:title", content: "Qidiruv natijalari — CineClub" },
      { property: "og:description", content: "CineClub bo'ylab kino qidiruvi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QidiruvPage,
});

function QidiruvPage() {
  const { q } = Route.useSearch();
  const results = searchTitles(q);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
        <h1 className="text-4xl sm:text-5xl">Qidiruv natijalari</h1>
        <p className="text-sm text-muted-foreground">
          {q ? `"${q}" bo'yicha ${results.length} ta natija` : "Qidiruv so'zini kiriting."}
        </p>
        <TitleGrid
          items={results}
          emptyTitle="Hech narsa topilmadi"
          emptyText="Boshqa nom bilan qayta urinib ko'ring."
        />
      </div>
    </Layout>
  );
}
