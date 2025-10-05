import { supabaseServer } from "@/lib/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import PersonalizedDashboard from "@/components/PersonalizedDashboard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen bg-gradient-to-br from-bg-end to-bg-start">
      <Navigation />
      
      {/* Background blur effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-gradient-to-br from-brand/25 via-purple-500/15 to-blue-500/20 rounded-full blur-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[700px] h-[700px] bg-gradient-to-bl from-emerald-400/20 via-cyan-400/15 to-brand/25 rounded-full blur-blob"></div>
      </div>

      <section className="relative pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Account Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">My Account</h1>
            <p className="text-text-muted">{user.email}</p>
          </div>

          {/* Personalized Dashboard - Temporarily disabled for debugging */}
          {/* <PersonalizedDashboard /> */}

          {/* Account Actions */}
          <div className="mt-12 bg-bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Account Actions</h2>
            <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/account/orders"
                    className="px-6 py-3 bg-brand/20 text-brand border border-brand/30 rounded-xl hover:bg-brand/30 transition-all"
                  >
                    View My Orders
                  </Link>
                  <Link 
                    href="/account/results"
                    className="px-6 py-3 bg-brand/20 text-brand border border-brand/30 rounded-xl hover:bg-brand/30 transition-all"
                  >
                    View My Results
                  </Link>
              <Link 
                href="/shop"
                className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all"
              >
                Shop Tests
              </Link>
              <form action={signOut} className="inline">
                <button 
                  type="submit"
                  className="px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
