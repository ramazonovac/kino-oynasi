import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Title } from "@/lib/catalog";

export type MovieRow = {
  id: string;
  title: string;
  description: string | null;
  poster_url: string;
  video_url: string | null;
  genre: string;
  release_year: number | null;
  is_series: boolean;
  created_at: string;
};

export function rowToTitle(row: MovieRow): Title {
  return {
    id: row.id,
    title: row.title,
    poster: row.poster_url,
    genres: row.genre.split(",").map((g) => g.trim()).filter(Boolean),
    country: "—",
    ageRating: "16+",
    ...(row.release_year ? { year: row.release_year, release: String(row.release_year) } : {}),
    ...(row.description ? { description: row.description } : {}),
    ...(row.video_url ? { telegram: row.video_url } : {}),
    isSeries: row.is_series,
  };
}

export async function fetchMovies(): Promise<MovieRow[]> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as MovieRow[];
}

export function useDbMovies() {
  const query = useQuery({ queryKey: ["movies"], queryFn: fetchMovies });
  const rows = query.data ?? [];
  return {
    ...query,
    rows,
    films: rows.filter((r) => !r.is_series).map(rowToTitle),
    series: rows.filter((r) => r.is_series).map(rowToTitle),
  };
}
