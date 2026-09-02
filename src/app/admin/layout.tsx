import { getSession } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";
import BrandLogo from "@/components/ui/BrandLogo";
import AdminNavLink from "@/components/admin/AdminNavLink";
import { Suspense } from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      {session && (
        <aside className="w-64 bg-slate-900 text-white flex-shrink-0 min-h-screen sticky top-0 h-screen overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-800">
            <a href="/" className="block mb-4">
                <BrandLogo light className="h-8 w-auto" />
            </a>
            <h2 className="text-xl font-bold tracking-tight">Admin Panel</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">NextGen MahaTech</p>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            <Suspense fallback={<div className="px-4 text-slate-500 text-xs italic">Loading navigation...</div>}>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 px-4">Overview</p>
                  <div className="space-y-1">
                      <AdminNavLink href="/admin">Dashboard</AdminNavLink>
                      <AdminNavLink href="/admin/enquiries">Enquiries</AdminNavLink>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 px-4 mt-6">Manage Pages</p>
                  <div className="space-y-1">
                      <AdminNavLink href="/admin/ams-features">AMS Features (Grid)</AdminNavLink>
                      <AdminNavLink href="/admin/content?page=contact">Contact Page</AdminNavLink>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 px-4 mt-6">Data Modules</p>
                  <div className="space-y-1">
                      <AdminNavLink href="/admin/services">Services</AdminNavLink>
                      <AdminNavLink href="/admin/portfolio">Portfolio</AdminNavLink>
                      <AdminNavLink href="/admin/team">Team Members</AdminNavLink>
                      <AdminNavLink href="/admin/testimonials">Testimonials</AdminNavLink>
                  </div>
                </div>
            </Suspense>
          </div>

          <div className="p-6 border-t border-slate-800 bg-slate-900 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400 truncate mr-2" title={session.username}>{session.username}</span>
              <LogoutButton />
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto h-screen relative">
        {children}
      </main>
    </div>
  );
}
