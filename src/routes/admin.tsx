import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Lock, LogOut } from "lucide-react";
import { Layout } from "@/components/Layout";
import { adminLogin, adminLogout, adminStatus, addMovie, deleteMovie, uploadPoster } from "@/lib/admin.functions";
import { fetchMovies } from "@/lib/db-movies";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin panel — CineClub" },
      { name: "description", content: "CineClub admin paneli: yangi film va seriallar qo'shish." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin panel — CineClub" },
      { property: "og:description", content: "CineClub kontentini boshqarish paneli." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const inputClass =
  "w-full rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function AdminPage() {
  const status = useServerFn(adminStatus);
  const statusQuery = useQuery({ queryKey: ["admin-status"], queryFn: () => status({}) });

  if (statusQuery.isLoading) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 py-20 text-muted-foreground">Yuklanmoqda...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
        {statusQuery.data?.unlocked ? <AdminDashboard /> : <LoginForm />}
      </div>
    </Layout>
  );
}

function LoginForm() {
  const login = useServerFn(adminLogin);
  const qc = useQueryClient();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="mx-auto max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6 shadow-cine"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          const res = await login({ data: { password } });
          if (res.ok) {
            await qc.invalidateQueries({ queryKey: ["admin-status"] });
          } else {
            toast.error("Parol noto'g'ri");
          }
        } finally {
          setBusy(false);
          setPassword("");
        }
      }}
    >
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-primary" />
        <h1 className="text-2xl">Admin kirish</h1>
      </div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Parol"
        autoComplete="current-password"
        className={inputClass}
      />
      <button
        type="submit"
        disabled={busy || !password}
        className="w-full rounded-xl brand-gradient px-4 py-2.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50"
      >
        Kirish
      </button>
    </form>
  );
}

const emptyForm = {
  title: "",
  description: "",
  poster_url: "",
  video_url: "",
  genre: "",
  release_year: "",
  is_series: false,
};

const GENRES = [
  "Jangari",
  "Drama",
  "Komediya",
  "Fantastika",
  "Melodrama",
  "Detektiv",
  "Sarguzasht",
  "Qo'rqinchli",
];

function selectedGenres(value: string) {
  return value.split(",").map((g) => g.trim()).filter(Boolean);
}

function toggleGenre(current: string, genre: string) {
  const list = selectedGenres(current);
  if (list.includes(genre)) {
    return list.filter((g) => g !== genre).join(", ");
  }
  return [...list, genre].join(", ");
}

function AdminDashboard() {
  const qc = useQueryClient();
  const create = useServerFn(addMovie);
  const remove = useServerFn(deleteMovie);
  const logout = useServerFn(adminLogout);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const upload = useServerFn(uploadPoster);

  const moviesQuery = useQuery({ queryKey: ["movies"], queryFn: fetchMovies });

  const set = (key: keyof typeof emptyForm, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl">Admin panel</h1>
        <button
          onClick={async () => {
            await logout({});
            await qc.invalidateQueries({ queryKey: ["admin-status"] });
          }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="h-4 w-4" /> Chiqish
        </button>
      </div>

      <form
        className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-cine"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!form.poster_url) {
            toast.error("Avval poster rasmini yuklang");
            return;
          }
          if (!selectedGenres(form.genre).length) {
            toast.error("Kamida bitta janr tanlang");
            return;
          }
          setBusy(true);
          try {
            await create({
              data: {
                title: form.title,
                description: form.description,
                poster_url: form.poster_url,
                video_url: form.video_url,
                genre: form.genre,
                ...(form.release_year ? { release_year: Number(form.release_year) } : {}),
                is_series: form.is_series,
              },
            });
            toast.success("Qo'shildi");
            setForm(emptyForm);
            await qc.invalidateQueries({ queryKey: ["movies"] });
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Xatolik yuz berdi");
          } finally {
            setBusy(false);
          }
        }}
      >
        <h2 className="text-2xl">Yangi kino qo'shish</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 sm:col-span-2">
            <span className="text-sm text-muted-foreground">Nomi</span>
            <input
              required
              maxLength={200}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="space-y-1.5 sm:col-span-2">
            <span className="text-sm text-muted-foreground">Tavsif</span>
            <textarea
              rows={3}
              maxLength={2000}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={inputClass}
            />
          </label>

          <div className="space-y-1.5 sm:col-span-2">
            <span className="text-sm text-muted-foreground">Poster rasm (galereyadan tanlang)</span>
            <div className="flex items-start gap-3">
              {form.poster_url && (
                <img
                  src={form.poster_url}
                  alt="Tanlangan poster"
                  className="h-24 w-16 rounded-md border border-border object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 10 * 1024 * 1024) {
                    toast.error("Rasm hajmi 10MB dan oshmasin");
                    return;
                  }
                  setUploading(true);
                  try {
                    const buf = await file.arrayBuffer();
                    let binary = "";
                    const view = new Uint8Array(buf);
                    for (let i = 0; i < view.length; i += 0x8000) {
                      binary += String.fromCharCode(...view.subarray(i, i + 0x8000));
                    }
                    const res = await upload({
                      data: {
                        fileName: file.name,
                        contentType: file.type || "image/jpeg",
                        dataBase64: btoa(binary),
                      },
                    });
                    set("poster_url", res.url);
                    toast.success("Rasm yuklandi");
                  } catch (err) {
                    toast.error(err instanceof Error ? err.message : "Rasm yuklanmadi");
                  } finally {
                    setUploading(false);
                  }
                }}
                className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm file:text-foreground`}
              />
            </div>
            {uploading && <p className="text-xs text-muted-foreground">Yuklanmoqda...</p>}
          </div>

          <label className="space-y-1.5 sm:col-span-2">
            <span className="text-sm text-muted-foreground">Video / Telegram havolasi</span>
            <input
              type="url"
              placeholder="https://t.me/..."
              value={form.video_url}
              onChange={(e) => set("video_url", e.target.value)}
              className={inputClass}
            />
          </label>

          <div className="space-y-2 sm:col-span-2">
            <span className="text-sm text-muted-foreground">Janrlar</span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {GENRES.map((g) => (
                <label
                  key={g}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-secondary/40 p-2.5 text-sm transition-colors hover:bg-secondary"
                >
                  <input
                    type="checkbox"
                    checked={selectedGenres(form.genre).includes(g)}
                    onChange={() => set("genre", toggleGenre(form.genre, g))}
                    className="h-4 w-4 accent-primary"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <label className="space-y-1.5">
            <span className="text-sm text-muted-foreground">Chiqarilgan yili</span>
            <input
              type="number"
              min={1888}
              max={2100}
              value={form.release_year}
              onChange={(e) => set("release_year", e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_series}
              onChange={(e) => set("is_series", e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            Serial sifatida qo'shish
          </label>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="rounded-xl brand-gradient px-6 py-2.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          Kino qo'shish
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="text-2xl">Qo'shilgan kinolar ({moviesQuery.data?.length ?? 0})</h2>
        <div className="space-y-2">
          {(moviesQuery.data ?? []).map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <img
                src={m.poster_url}
                alt={`${m.title} posteri`}
                loading="lazy"
                className="h-16 w-12 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{m.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {m.genre}
                  {m.release_year ? ` · ${m.release_year}` : ""}
                  {m.is_series ? " · Serial" : ""}
                </p>
              </div>
              <button
                aria-label={`${m.title} ni o'chirish`}
                onClick={async () => {
                  await remove({ data: { id: m.id } });
                  await qc.invalidateQueries({ queryKey: ["movies"] });
                  toast.success("O'chirildi");
                }}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {moviesQuery.data?.length === 0 && (
            <p className="text-sm text-muted-foreground">Hozircha kino qo'shilmagan.</p>
          )}
        </div>
      </section>
    </>
  );
}
