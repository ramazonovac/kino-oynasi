import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Title } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroSliderProps = {
  items: Title[];
};

export function HeroSlider({ items }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const slides = items.slice(0, 6);
  const active = slides[activeIndex] ?? slides[0];

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [slides.length, activeIndex]);

  useEffect(() => {
    if (activeIndex >= slides.length) setActiveIndex(0);
  }, [activeIndex, slides.length]);

  if (!active) return null;

  const changeSlide = (direction: number) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Tanlangan filmlar va seriallar"
      className="relative min-h-[68vh] w-full touch-pan-y overflow-hidden md:min-h-[78vh]"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX;
        touchStart.current = null;
        if (start === null || end === undefined || Math.abs(start - end) < 45) return;
        changeSlide(start > end ? 1 : -1);
      }}
    >
      <div key={active.id} className="absolute inset-0 animate-rise motion-reduce:animate-none">
        <img
          src={active.poster}
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-105 object-cover object-center blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/15" />
        <div className="absolute inset-0 hero-fade" />
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="relative mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-end gap-4 px-5 pb-20 pt-28 md:min-h-[78vh] md:px-16 md:pb-24"
      >
        <div key={`${active.id}-content`} className="max-w-3xl animate-rise space-y-4 motion-reduce:animate-none">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full brand-gradient px-3 py-1 text-xs font-semibold text-primary-foreground">
              Tanlangan
            </span>
            <span className="text-gold">{active.ageRating}</span>
            {active.release || active.year ? (
              <span className="text-muted-foreground">{active.release ?? active.year}</span>
            ) : null}
            <span className="text-muted-foreground">{active.genres.slice(0, 3).join(" · ")}</span>
          </div>

          <h1 className="break-words text-4xl leading-tight sm:text-6xl sm:leading-none md:text-7xl">
            {active.title}
          </h1>

          <p className="line-clamp-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {active.description ??
              `${active.title} — ${active.genres.join(", ")} janridagi ${active.isSeries ? "serial" : "film"}.`}
          </p>

          <Button asChild size="lg" className="brand-gradient rounded-xl glow-ring">
            <Link to="/kino/$id" params={{ id: active.id }}>
              <Play className="fill-current" /> Hozir tomosha qilish
            </Link>
          </Button>
        </div>
      </div>

      {slides.length > 1 ? (
        <>
          <div className="absolute inset-x-4 top-1/2 z-10 hidden -translate-y-1/2 justify-between md:flex">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              aria-label="Oldingi slayd"
              onClick={() => changeSlide(-1)}
              className="h-11 w-11 rounded-full border border-border/60 bg-background/70 backdrop-blur hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              aria-label="Keyingi slayd"
              onClick={() => changeSlide(1)}
              className="h-11 w-11 rounded-full border border-border/60 bg-background/70 backdrop-blur hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 md:bottom-10">
            {slides.map((slide, index) => (
              <Button
                key={slide.id}
                type="button"
                variant="ghost"
                aria-label={`${index + 1}-slayd: ${slide.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className="h-8 w-8 rounded-full p-0 hover:bg-transparent"
              >
                <span
                  className={cn(
                    "block h-2.5 rounded-full transition-all",
                    index === activeIndex ? "w-7 bg-primary" : "w-2.5 bg-muted-foreground/60",
                  )}
                />
              </Button>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}