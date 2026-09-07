import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { Layout } from "@/components/Layout";
import { TitleGrid } from "@/components/TitleGrid";
import { useMemo } from "react";
import { films, series, HERO } from "@/lib/catalog";
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

  return (
    <Layout>
      <section className="relative min-h-[68vh] w-full overflow-hidden md:min-h-[78vh]">
        <img
          src={HERO.poster}
          alt={`${HERO.title} filmidan kadr`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-fade" />
        <div className="relative mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-end gap-4 px-4 pb-12 pt-24 md:min-h-[78vh] md:pb-20">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full brand-gradient px-3 py-1 text-xs font-semibold text-primary-foreground">
              Tanlangan
            </span>
            <span className="text-gold">{HERO.ageRating}</span>
            <span className="text-muted-foreground">{HERO.release}</span>
            <span className="text-muted-foreground">{HERO.genres.join(" · ")}</span>
          </div>
          <h1 className="max-w-3xl text-5xl leading-none sm:text-6xl md:text-7xl">{HERO.title}</h1>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            {HERO.country}
            {HERO.studio ? ` · Studiya: ${HERO.studio}` : ""}
            {HERO.episodes ? ` · ${HERO.episodes}` : ""}
            {HERO.director ? ` · Rejissyor: ${HERO.director}` : ""}
            {HERO.actor ? ` · Bosh rolda: ${HERO.actor}` : ""}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={HERO.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl brand-gradient px-6 py-3 font-semibold text-primary-foreground glow-ring transition-transform hover:scale-105"
            >
              <Play className="h-5 w-5 fill-current" /> Tomosha qilish
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12">
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl">Filmlar</h2>
          <TitleGrid items={allFilms} />
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl">Seriallar</h2>
          <TitleGrid items={allSeries} />
        </section>
      </div>
    </Layout>
  );
}
