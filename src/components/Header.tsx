import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Home, Film, Tv, Heart, LayoutGrid } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { OrderMovieButton } from "./OrderMovieButton";

const NAV = [
  { to: "/", label: "Bosh sahifa", icon: Home },
  { to: "/filmlar", label: "Filmlar", icon: Film },
  { to: "/janrlar", label: "Janrlar", icon: LayoutGrid },
  { to: "/seriallar", label: "Seriallar", icon: Tv },
  { to: "/saralanganlar", label: "Saralanganlar", icon: Heart },
] as const;

export function Header() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 md:flex-nowrap md:gap-6">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground bg-secondary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="order-last flex w-full items-center gap-2 md:order-none md:ml-auto md:w-auto">
            <form
              className="relative w-full md:max-w-xs"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/qidiruv", search: { q } });
              }}
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Film qidirish..."
                aria-label="Film qidirish"
                className="w-full rounded-full border border-border bg-secondary/60 py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </form>
              <OrderMovieButton className="hidden lg:inline-flex" />
              <ThemeToggle className="ml-auto shrink-0 md:ml-0" />
            </div>
        </div>
      </header>


      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-5">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-1 py-2 text-[10px] font-medium"
            >
              <item.icon className="h-5 w-5" />
              <span className="truncate px-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
