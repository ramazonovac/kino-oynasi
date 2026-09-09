import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, ArrowLeft, Heart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { catalog } from "@/lib/catalog";
import type { Title } from "@/lib/catalog";
import { useDbMovies } from "@/lib/db-movies";
import { useFavorites } from "@/hooks/use-favorites";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/kino/$id")({
  head: () => ({
    meta: [
      { title: "Kino sahifasi — CineClub" },
      {
        name: "description",
        content: "Film yoki serial haqida to'liq ma'lumot: tavsif, janrlar, chiqish yili va tomosha qilish havolasi.",
      },
      { property: "og:title", content: "Kino sahifasi — CineClub" },
      {
        property: "og:description",
        content: "Film yoki serial haqida to'liq ma'lumot va tomosha qilish imkoniyati.",
      },
      { property: "og:type", content: "video.movie" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MovieDetails,
});

function InfoRow({ label, value }: { label: string; value?: string | number }) {
  if (!value) return null;
  return (
    <div className="flex flex-wrap gap-2 border-b border-border/50 py-2 text-sm">
      <dt className="min-w-32 text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function MovieDetails() {
  const { id } = Route.useParams();
  const { films: dbFilms, series: dbSeries, isLoading } = useDbMovies();
  const { isFavorite, toggle } = useFavorites();

  const all: Title[] = [...dbFilms, ...dbSeries, ...catalog];
  const item = all.find((t) => t.id === id);

  if (!item) {
    return (
      <Layout>
        <div className="mx-auto grid max-w-3xl place-items-center px-4 py-24 text-center">
          <h1 className="text-2xl sm:text-3xl">
            {isLoading ? "Yuklanmoqda..." : "Kino topilmadi"}
          </h1>
          {!isLoading ? (
            <Link to="/" className="mt-4 rounded-xl brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Bosh sahifaga qaytish
            </Link>
          ) : null}
        </div>
      </Layout>
    );
  }

  const fav = isFavorite(item.id);

  return (
    <Layout>
      <div className="relative">
        <div className="absolute inset-0 h-64 overflow-hidden sm:h-80">
          <img src={item.poster} alt="" aria-hidden className="h-full w-full object-cover opacity-30 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-6 sm:py-10">
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Orqaga
          </Link>

          <div className="grid gap-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-10">
            <div className="mx-auto w-full max-w-xs md:max-w-none">
              <img
                src={item.poster}
                alt={`${item.title} posteri`}
                className={cn(
                  "w-full rounded-2xl object-cover shadow-cine",
                  item.wide ? "aspect-video" : "aspect-[2/3]",
                )}
              />
            </div>

            <div className="min-w-0 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="rounded-full brand-gradient px-3 py-1 font-semibold text-primary-foreground">
                  {item.isSeries ? "Serial" : "Film"}
                </span>
                <span className="text-gold">{item.ageRating}</span>
                {item.rating ? <span className="text-gold">★ {item.rating}</span> : null}
                {item.release ?? item.year ? (
                  <span className="text-muted-foreground">{item.release ?? item.year}</span>
                ) : null}
              </div>

              <h1 className="break-words text-2xl leading-tight sm:text-4xl md:text-5xl">{item.title}</h1>
              {item.originalTitle ? (
                <p className="text-sm text-muted-foreground">{item.originalTitle}</p>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {item.genres.map((g) => (
                  <span key={g} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                    {g}
                  </span>
                ))}
              </div>

              {item.description ? (
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.description}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {item.telegram ? (
                  <a
                    href={item.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl brand-gradient px-6 py-3 font-semibold text-primary-foreground glow-ring transition-transform hover:scale-105"
                  >
                    <Play className="h-5 w-5 fill-current" /> Tomosha qilish
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    const added = toggle(item.id);
                    toast(added ? "Saralanganlarga qo'shildi" : "Saralanganlardan o'chirildi");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  <Heart className={cn("h-4 w-4", fav && "fill-primary text-primary")} />
                  {fav ? "Saralanganda" : "Saralanganlarga"}
                </button>
              </div>

              {item.telegramPost ? (
                <div className="rounded-2xl border border-border bg-card/60 p-3">
                  <iframe
                    title={`${item.title} pleyeri`}
                    src={`https://t.me/${item.telegramPost}?embed=1`}
                    className="h-[420px] w-full rounded-xl border-0"
                    loading="lazy"
                  />
                </div>
              ) : null}

              <dl className="mt-2 max-w-xl">
                <InfoRow label="Chiqish sanasi" value={item.release ?? item.year} />
                <InfoRow label="Davlat" value={item.country} />
                <InfoRow label="Til" value={item.language} />
                <InfoRow label="Rejissyor" value={item.director} />
                <InfoRow label="Bosh rolda" value={item.actor} />
                <InfoRow label="Studiya" value={item.studio} />
                <InfoRow label="Qismlar" value={item.episodes} />
                <InfoRow label="Yosh chegarasi" value={item.ageRating} />
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
