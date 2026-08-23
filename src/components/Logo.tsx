import { Link } from "@tanstack/react-router";
import { Clapperboard } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2">
      <span className="brand-gradient grid h-9 w-9 place-items-center rounded-xl text-primary-foreground">
        <Clapperboard className="h-5 w-5" />
      </span>
      <span className="font-display text-2xl leading-none tracking-wide">
        Cine<span className="text-brand-gradient">Club</span>
      </span>
    </Link>
  );
}
