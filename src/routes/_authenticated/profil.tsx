import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Camera, LogOut, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/profil")({
  head: () => ({ meta: [
    { title: "Mening profilim — CineClub" },
    { name: "description", content: "CineClub profilingiz va film didingizni boshqaring." },
    { property: "og:title", content: "Mening profilim — CineClub" },
    { property: "og:description", content: "CineClub profil sozlamalari." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ProfilePage,
});

const GENRES = ["Jangari", "Drama", "Komediya", "Fantastika", "Melodrama", "Detektiv", "Sarguzasht", "Qo'rqinchli"];

function ProfilePage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [avatarPath, setAvatarPath] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void supabase.from("profiles").select("display_name, avatar_url, movie_preferences").eq("user_id", user.id).maybeSingle().then(async ({ data, error }) => {
      if (error) toast.error(error.message);
      if (data) {
        setDisplayName(data.display_name);
        setPreferences(data.movie_preferences);
        setAvatarPath(data.avatar_url);
        if (data.avatar_url) {
          const { data: signed } = await supabase.storage.from("avatars").createSignedUrl(data.avatar_url, 3600);
          setAvatarPreview(signed?.signedUrl ?? null);
        }
      }
      setLoading(false);
    });
  }, [user.id]);

  async function uploadAvatar(file: File) {
    if (!file.type.startsWith("image/")) return toast.error("Faqat rasm faylini tanlang");
    if (file.size > 5 * 1024 * 1024) return toast.error("Rasm hajmi 5 MB dan oshmasin");
    setBusy(true);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const path = `${user.id}/avatar-${Date.now()}.${extension}`;
      const { error } = await supabase.storage.from("avatars").upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      const { data: signed, error: signedError } = await supabase.storage.from("avatars").createSignedUrl(path, 3600);
      if (signedError) throw signedError;
      setAvatarPath(path);
      setAvatarPreview(signed.signedUrl);
      toast.success("Avatar yuklandi");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Avatar yuklanmadi");
    } finally { setBusy(false); }
  }

  if (loading) return <Layout><div className="mx-auto max-w-3xl px-4 py-16 text-muted-foreground">Profil yuklanmoqda...</div></Layout>;

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div><h1 className="text-4xl sm:text-5xl">Mening profilim</h1><p className="mt-2 break-all text-sm text-muted-foreground">{user.email}</p></div>
          <Button variant="outline" onClick={async () => { await queryClient.cancelQueries(); queryClient.clear(); await supabase.auth.signOut(); await navigate({ to: "/auth", replace: true }); }}><LogOut /> Chiqish</Button>
        </div>

        <form className="mt-8 space-y-8" onSubmit={async (event) => {
          event.preventDefault();
          const cleanName = displayName.trim();
          if (!cleanName || cleanName.length > 80) return toast.error("Ism 1–80 belgidan iborat bo'lsin");
          setBusy(true);
          const { error } = await supabase.from("profiles").upsert({ user_id: user.id, display_name: cleanName, avatar_url: avatarPath, movie_preferences: preferences }, { onConflict: "user_id" });
          setBusy(false);
          if (error) toast.error(error.message); else toast.success("Profil saqlandi");
        }}>
          <section className="grid gap-6 sm:grid-cols-[9rem_1fr] sm:items-center">
            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-primary/40 bg-secondary">
              {avatarPreview ? <img src={avatarPreview} alt="Profil avatari" className="h-full w-full object-cover" /> : <UserRound className="absolute inset-0 m-auto h-14 w-14 text-muted-foreground" />}
            </div>
            <div className="space-y-3"><h2 className="text-2xl">Avatar</h2><p className="text-sm text-muted-foreground">JPG, PNG yoki WebP · 5 MB gacha</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80"><Camera className="h-4 w-4" /> Rasm tanlash<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={busy} onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadAvatar(file); }} /></label></div>
          </section>

          <label className="block space-y-2"><span className="font-medium">Ko'rinadigan ism</span><input required maxLength={80} value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Ismingiz" className="h-12 w-full rounded-lg border border-border bg-secondary/50 px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>

          <section className="space-y-3"><div><h2 className="text-2xl">Sevimli janrlar</h2><p className="mt-1 text-sm text-muted-foreground">Sizga yoqadigan filmlar turini belgilang.</p></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{GENRES.map((genre) => <label key={genre} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-colors ${preferences.includes(genre) ? "border-primary bg-primary/10 text-foreground" : "border-border bg-secondary/40 text-muted-foreground"}`}><input type="checkbox" checked={preferences.includes(genre)} onChange={() => setPreferences((current) => current.includes(genre) ? current.filter((item) => item !== genre) : [...current, genre])} className="h-4 w-4 accent-primary" />{genre}</label>)}</div></section>
          <Button type="submit" disabled={busy} className="brand-gradient h-11 px-8 font-semibold">{busy ? "Saqlanmoqda..." : "Profilni saqlash"}</Button>
        </form>
      </div>
    </Layout>
  );
}