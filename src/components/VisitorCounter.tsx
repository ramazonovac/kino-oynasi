import { useEffect, useState } from "react";
import { Eye, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Stats = { today: number; total: number };

const SESSION_KEY = "cineclub-visit-counted";

export function VisitorCounter() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const alreadyCounted = sessionStorage.getItem(SESSION_KEY) === "1";

      if (alreadyCounted) {
        const { data } = await supabase
          .from("daily_visits")
          .select("day, visits");
        if (cancelled || !data) return;
        const today = new Date().toISOString().slice(0, 10);
        setStats({
          today: Number(data.find((r) => r.day === today)?.visits ?? 0),
          total: data.reduce((sum, r) => sum + Number(r.visits), 0),
        });
        return;
      }

      const { data } = await supabase.rpc("record_visit");
      if (cancelled) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      const row = Array.isArray(data) ? data[0] : null;
      if (row) setStats({ today: Number(row.today), total: Number(row.total) });
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stats) return null;

  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1">
        <Eye className="h-3.5 w-3.5 text-primary" />
        Bugun: <strong className="text-foreground">{stats.today.toLocaleString("uz-UZ")}</strong>
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1">
        <Users className="h-3.5 w-3.5 text-primary" />
        Jami: <strong className="text-foreground">{stats.total.toLocaleString("uz-UZ")}</strong>
      </span>
    </div>
  );
}
