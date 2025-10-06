import { supabaseServer } from "@/lib/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import PersonalizedDashboard from "@/components/PersonalizedDashboard";
import { I18nProvider } from "@/contexts/I18nContext";
import { useI18n } from "@/contexts/I18nContext";

async function signOut() {
  "use server";
  const supabase = supabaseServer();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function AccountPage() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  // Note: server component; translations will use static EN for now

  if (!user) {
    return (
      <main style={{maxWidth:420, margin:"40px auto"}}>
        <h1>Not signed in</h1>
        <p><Link href="/login">Go to login</Link></p>
      </main>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">My Account</h1>
        <p className="text-text-muted">{user.email}</p>
      </div>
      <div className="bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Welcome</h2>
        <p className="text-text-muted">Use the left navigation to view your results, orders, and transactions.</p>
        <form action={signOut} className="mt-6">
          <button 
            type="submit"
            className="px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
