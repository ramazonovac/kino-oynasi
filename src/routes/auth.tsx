import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import authBackdrop from "@/assets/dyuna2.jpg.asset.json";

type AuthSearch = { redirect?: string };

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    redirect: typeof search.redirect === "string" && search.redirect.startsWith("/") ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kirish yoki ro'yxatdan o'tish — CineClub" },
      { name: "description", content: "CineClub hisobingizga kiring yoki yangi hisob yarating." },
      { property: "og:title", content: "CineClub hisobiga kirish" },
      { property: "og:description", content: "CineClub hisobingizga xavfsiz kiring." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState(() => typeof window === "undefined" ? "" : localStorage.getItem("cineclub-email") ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: search.redirect ?? "/profil", replace: true });
    });
  }, [navigate, search.redirect]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) return toast.error("To'g'ri Gmail manzilini kiriting");
    if (password.length < 8 || password.length > 72) return toast.error("Parol 8–72 belgidan iborat bo'lsin");
    if (mode === "signup" && password !== confirmPassword) return toast.error("Parollar bir xil emas");
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
        if (error) throw error;
        if (remember) localStorage.setItem("cineclub-email", cleanEmail);
        else localStorage.removeItem("cineclub-email");
        toast.success("Xush kelibsiz!");
        await navigate({ to: search.redirect ?? "/profil", replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth` },
        });
        if (error) throw error;
        if (data.session) await navigate({ to: "/profil", replace: true });
        else setConfirmationSent(true);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Kirish amalga oshmadi");
    } finally {
      setBusy(false);
    }
  }

  async function forgotPassword() {
    const cleanEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) return toast.error("Avval Gmail manzilini kiriting");
    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success("Parolni tiklash havolasi emailingizga yuborildi");
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-8">
      <img src={authBackdrop.url} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-xl" />
      <div className="absolute inset-0 bg-background/55 backdrop-blur-sm" />
      <form onSubmit={submit} className="relative z-10 w-full max-w-md rounded-[2rem] border border-foreground/15 bg-card/60 p-6 shadow-2xl backdrop-blur-2xl sm:p-9">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="text-center">
          <h1 className="text-4xl">{mode === "login" ? "Kirish" : "Ro'yxatdan o'tish"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login" ? "Xush kelibsiz! Hisobingizga kiring." : "CineClub'da yangi hisob yarating."}
          </p>
        </div>

        {confirmationSent ? (
          <div className="mt-8 rounded-lg border border-primary/40 bg-primary/10 p-4 text-center text-sm">
            Tasdiqlash havolasi emailingizga yuborildi. Havolani ochib, keyin tizimga kiring.
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <label className="relative block">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Gmail" autoComplete="email" className="h-13 w-full rounded-lg border border-foreground/20 bg-background/25 pl-12 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </label>
            <label className="relative block">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input type={showPassword ? "text" : "password"} required minLength={8} maxLength={72} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parol" autoComplete={mode === "login" ? "current-password" : "new-password"} className="h-13 w-full rounded-lg border border-foreground/20 bg-background/25 pl-12 pr-12 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <Button type="button" variant="ghost" size="icon" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-muted-foreground">
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </label>
            {mode === "signup" && (
              <label className="relative block">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} required minLength={8} maxLength={72} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Parolni takrorlang" autoComplete="new-password" className="h-13 w-full rounded-lg border border-foreground/20 bg-background/25 pl-12 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </label>
            )}
            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 accent-primary" /> Eslab qolish</label>
              {mode === "login" && <Button type="button" variant="link" className="h-auto p-0" onClick={forgotPassword}>Parolni unutdingizmi?</Button>}
            </div>
            <Button type="submit" disabled={busy} className="brand-gradient h-13 w-full text-base font-bold tracking-widest">
              {busy ? "KUTILMOQDA..." : mode === "login" ? "KIRISH" : "RO'YXATDAN O'TISH"}
            </Button>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? "Hisobingiz yo'qmi?" : "Hisobingiz bormi?"}{" "}
          <Button type="button" variant="link" className="h-auto p-0" onClick={() => { setMode((value) => value === "login" ? "signup" : "login"); setConfirmationSent(false); }}>
            {mode === "login" ? "Ro'yxatdan o'tish" : "Kirish"}
          </Button>
        </p>
      </form>
    </main>
  );
}