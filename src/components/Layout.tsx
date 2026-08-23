import type { ReactNode } from "react";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { VisitorCounter } from "./VisitorCounter";
import { OrderMovieFab } from "./OrderMovieButton";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <OrderMovieFab />
      <footer className="mt-16 border-t border-border/60 bg-card/40 pb-20 pt-10 md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
          <Logo />
          <p className="text-sm text-muted-foreground">
            CineClub — filmlar va seriallar olami. Barcha kontent namoyish uchun.
          </p>
          <div className="flex flex-col gap-2 md:items-end">
            <VisitorCounter />
            <p className="text-xs text-muted-foreground">© 2026 CineClub · Created by Ramazonov</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
