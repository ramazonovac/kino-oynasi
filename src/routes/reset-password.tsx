import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "Parolni yangilash — CineClub" },
    { name: "description", content: "CineClub hisobingiz uchun yangi parol o'rnating." },
    { property: "og:title", content: "Parolni yangilash — CineClub" },
    { property: "og:description", content: "CineClub hisob parolini xavfsiz yangilang." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRecovery, setIsRecovery] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const recoveryHash = new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery";
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setIsRecovery(true);
    });
    void supabase.auth.getSession().then(({ data }) => {
      setIsRecovery(recoveryHash || Boolean(data.session));
      setChecking(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-cine sm:p-8">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <h1 className="text-center text-4xl">Yangi parol</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">Hisobingiz uchun yangi, kuchli parol kiriting.</p>
        {checking ? <p className="mt-8 text-center text-muted-foreground">Tekshirilmoqda...</p> : !isRecovery ? (
          <div className="mt-8 text-center"><p className="text-sm text-muted-foreground">Tiklash havolasi yaroqsiz yoki muddati tugagan.</p><Button asChild variant="link"><Link to="/auth">Kirishga qaytish</Link></Button></div>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={async (event) => {
            event.preventDefault();
            if (password.length < 8 || password.length > 72) return toast.error("Parol 8–72 belgidan iborat bo'lsin");
            if (password !== confirmPassword) return toast.error("Parollar bir xil emas");
            setBusy(true);
            const { error } = await supabase.auth.updateUser({ password });
            setBusy(false);
            if (error) return toast.error(error.message);
            toast.success("Parol yangilandi");
            await navigate({ to: "/profil", replace: true });
          }}>
            {[{ value: password, set: setPassword, placeholder: "Yangi parol" }, { value: confirmPassword, set: setConfirmPassword, placeholder: "Parolni takrorlang" }].map((field) => (
              <label key={field.placeholder} className="relative block"><LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" /><input type="password" required minLength={8} maxLength={72} value={field.value} onChange={(e) => field.set(e.target.value)} placeholder={field.placeholder} autoComplete="new-password" className="h-12 w-full rounded-lg border border-border bg-secondary/50 pl-12 pr-4 outline-none focus:border-primary" /></label>
            ))}
            <Button type="submit" disabled={busy} className="brand-gradient h-12 w-full font-bold">PAROLNI YANGILASH</Button>
          </form>
        )}
      </div>
    </main>
  );
}