import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { TitleGrid } from "@/components/TitleGrid";
import { series } from "@/lib/catalog";

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
  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
        <h1 className="text-4xl sm:text-5xl">Seriallar</h1>
        <p className="text-sm text-muted-foreground">
          Telegram orqali tomosha qilish mumkin bo'lgan seriallar.
        </p>
        <TitleGrid
          items={series}
          emptyTitle="Serial topilmadi"
          emptyText="Tez orada yangi seriallar qo'shiladi."
        />
      </div>
    </Layout>
  );
}
