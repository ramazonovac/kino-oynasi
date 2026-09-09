import { Play, Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Title } from "@/lib/catalog";
import { useFavorites } from "@/hooks/use-favorites";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function TelegramWidgetEmbed({ post }: { post: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const scriptId = "telegram-widget-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://telegram.org/js/telegram-widget.js?24";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div ref={containerRef} className="mt-auto w-full">
      <div data-telegram-post={post} data-width="100%" />
    </div>
  );
}

export function TitleCard({ item, className }: { item: Title; className?: string }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(item.id);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-card shadow-cine transition-transform duration-300 hover:-translate-y-1 sm:rounded-2xl",
        className,
      )}
    >
      <Link
        to="/kino/$id"
        params={{ id: item.id }}
        aria-label={`${item.title} haqida batafsil`}
        className={cn(
          "relative block overflow-hidden",
          item.wide ? "aspect-video" : "aspect-[2/3]",
        )}
      >
        <img
          src={item.poster}
          alt={`${item.title} posteri`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-1.5 top-1.5 rounded-full bg-background/70 px-1.5 py-0.5 text-[10px] font-semibold text-gold backdrop-blur sm:left-2 sm:top-2 sm:px-2 sm:py-1 sm:text-xs">
          {item.ageRating}
        </span>
      </Link>
      <button
          type="button"
          onClick={() => {
            const added = toggle(item.id);
            toast(added ? "Saralanganlarga qo'shildi" : "Saralanganlardan o'chirildi");
          }}
          aria-label="Saralanganlarga qo'shish"
          className="absolute right-1.5 top-1.5 z-10 grid h-6 w-6 place-items-center rounded-full bg-background/70 backdrop-blur transition-colors hover:bg-primary sm:right-2 sm:top-2 sm:h-8 sm:w-8"
        >
          <Heart className={cn("h-3 w-3 sm:h-4 sm:w-4", fav && "fill-primary text-primary")} />
        </button>

      <div className="flex flex-1 flex-col gap-1 p-2.5 sm:gap-2 sm:p-3 lg:p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight sm:text-base lg:text-xl">
          {item.title}
        </h3>
        {item.originalTitle ? (
          <p className="line-clamp-1 text-[10px] text-muted-foreground sm:text-xs">{item.originalTitle}</p>
        ) : null}
        <dl className="hidden space-y-0.5 text-[10px] text-muted-foreground sm:block sm:space-y-1 sm:text-xs">
          {item.rating ? (
            <div className="flex gap-1">
              <dt className="text-foreground/70">Reyting:</dt>
              <dd className="text-gold">{item.rating}</dd>
            </div>
          ) : null}
          {item.language ? (
            <div className="flex gap-1">
              <dt className="text-foreground/70">Til:</dt>
              <dd className="line-clamp-1">{item.language}</dd>
            </div>
          ) : null}
          {item.release ? (
            <div className="flex gap-1">
              <dt className="text-foreground/70">Chiqish sanasi:</dt>
              <dd>{item.release}</dd>
            </div>
          ) : null}

          <div className="flex gap-1">
            <dt className="text-foreground/70">Janr:</dt>
            <dd className="line-clamp-1">{item.genres.join(", ")}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-foreground/70">Davlat:</dt>
            <dd className="line-clamp-1">{item.country}</dd>
          </div>
          {item.director ? (
            <div className="flex gap-1">
              <dt className="text-foreground/70">Rejissyor:</dt>
              <dd className="line-clamp-1">{item.director}</dd>
            </div>
          ) : null}
          {item.actor ? (
            <div className="flex gap-1">
              <dt className="text-foreground/70">Bosh rolda:</dt>
              <dd className="line-clamp-1">{item.actor}</dd>
            </div>
          ) : null}
          {item.studio ? (
            <div className="flex gap-1">
              <dt className="text-foreground/70">Studiya:</dt>
              <dd className="line-clamp-1">{item.studio}</dd>
            </div>
          ) : null}
          {item.episodes ? (
            <div className="flex gap-1">
              <dt className="text-foreground/70">Qismlar:</dt>
              <dd>{item.episodes}</dd>
            </div>
          ) : null}
          <div className="flex gap-1">
            <dt className="text-foreground/70">Yosh chegarasi:</dt>
            <dd>{item.ageRating}</dd>
          </div>
        </dl>
        {item.description ? (
          <p className="hidden line-clamp-3 text-[11px] text-muted-foreground sm:block">
            {item.description}
          </p>
        ) : null}
        <div className="mt-auto flex flex-col gap-1 pt-1 sm:hidden">
          <p className="line-clamp-1 text-[10px] text-muted-foreground">{item.genres.join(", ")}</p>
          <p className="text-[10px] text-muted-foreground">
            {item.ageRating}
            {item.rating ? <span className="ml-1 text-gold">· {item.rating}</span> : null}
          </p>

        </div>
        {item.telegramPost ? (
          <TelegramWidgetEmbed post={item.telegramPost} />
        ) : (
          <a
            href={item.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-full items-center justify-center gap-1 rounded-lg brand-gradient px-2 py-1.5 text-xs font-semibold text-primary-foreground opacity-90 transition-opacity hover:opacity-100 sm:gap-1.5 sm:rounded-xl sm:px-3 sm:py-2 sm:text-sm"
          >
            <Play className="h-3 w-3 fill-current sm:h-4 sm:w-4" />
            Tomosha qilish
          </a>
        )}
      </div>
    </article>
  );
}
