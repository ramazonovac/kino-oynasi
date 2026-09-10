import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { HeroSlider } from "@/components/HeroSlider";
import { TitleGrid } from "@/components/TitleGrid";
import { Pagination } from "@/components/Pagination";
import { usePagination } from "@/hooks/use-pagination";
import { useMemo } from "react";
import { catalog, films, series } from "@/lib/catalog";
import { useDbMovies } from "@/lib/db-movies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineClub — Filmlar va seriallar onlayn" },
      {
        name: "description",
        content:
          "CineClub — tanlangan filmlar va seriallar. Har bir kino uchun to'liq ma'lumot va Telegram orqali tomosha qilish imkoniyati.",
      },
      { property: "og:title", content: "CineClub — Filmlar va seriallar onlayn" },
      {
        property: "og:description",
        content: "Tanlangan filmlar va seriallarni Telegram orqali tomosha qiling.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { films: dbFilms, series: dbSeries } = useDbMovies();
  const allFilms = useMemo(() => [...dbFilms, ...films], [dbFilms]);
  const allSeries = useMemo(() => [...dbSeries, ...series], [dbSeries]);
  const featuredTitles = useMemo(() => {
    const databaseTitles = [...dbFilms, ...dbSeries];
    const fallbackTitles = catalog.filter((item) => !databaseTitles.some((movie) => movie.id === item.id));
    return [...databaseTitles, ...fallbackTitles].slice(0, 6);
  }, [dbFilms, dbSeries]);
  const filmsPager = usePagination(allFilms, 12);
  const seriesPager = usePagination(allSeries, 12);

  return (
    <Layout>
      <HeroSlider items={featuredTitles} />

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12">
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl">Filmlar</h2>
          <TitleGrid items={filmsPager.currentItems} />
          <Pagination
            currentPage={filmsPager.page}
            totalPages={filmsPager.totalPages}
            onPageChange={filmsPager.setPage}
          />
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl">Seriallar</h2>
          <TitleGrid items={seriesPager.currentItems} />
          <Pagination
            currentPage={seriesPager.page}
            totalPages={seriesPager.totalPages}
            onPageChange={seriesPager.setPage}
          />
        </section>
      </div>
    </Layout>
  );
}
