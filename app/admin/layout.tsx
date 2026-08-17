'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import "../admin.css";

const navItems = [
  {
    href: '/admin',
    label: 'Admin',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },

  // CATEGORY
  {
    href: '/admin/categories',
    label: 'Categories',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 17l9 4 9-4" />
        <path d="M3 12l9 4 9-4" />
      </svg>
    ),
  },

  // PRODUCTS
  {
    href: '/admin/products',
    label: 'Products',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
        <polyline points="7.5 19.79 7.5 14.6 3 12" />
        <polyline points="21 12 16.5 14.6 16.5 19.79" />
        <polyline points="12 22.08 12 17" />
      </svg>
    ),
  },
  // INGREDIENTS
{
  href: '/admin/ingredients',
  label: 'Ingredients',
  icon: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 21c6-1 12-7 14-14-7 2-13 8-14 14z" />
      <path d="M9 15c1.5-1.5 3.5-3.5 7-7" />
    </svg>
  ),
},
{
    href: '/admin/blogs',
    label: 'Blogs',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 17l9 4 9-4" />
        <path d="M3 12l9 4 9-4" />
      </svg>
    ),
  },
  {
  href: '/admin/enquiries',
  label: 'Enquiries',
  icon: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </svg>
  ),
}

];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    await fetch('/api/logout', {
      method: 'POST',
    });

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">

      {/* MOBILE HEADER */}
      <header className="lg:hidden h-16 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between px-4 sticky top-0 z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm">
            <img
              src="/newlogo.webp"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <span className="font-extrabold text-[15px] text-[var(--text-primary)] tracking-tight">
            Admin Panel
          </span>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isSidebarOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </header>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[70] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-[var(--bg-secondary)]
          border-r border-[var(--border-color)]
          flex flex-col z-[80]
          transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* BRAND */}
        <div className="hidden lg:flex items-center gap-3 p-5 border-b border-[var(--border-color)]">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5">
            <img
              src="/newlogo.webp"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <div className="font-extrabold text-[16px] text-[var(--text-primary)]">
              Admin Panel
            </div>

            <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
              Ecommerce
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-3 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">
            Main Menu
          </p>

          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                  ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-400 font-semibold border-l-2 border-indigo-500'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]'
                  }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-[var(--border-color)]">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium hover:bg-red-500 hover:text-white transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>

            {loggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 flex flex-col min-h-screen">

        {/* TOP BAR */}
        <div className="hidden lg:flex h-16 items-center justify-end px-8 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] sticky top-0 z-40">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase">
              System Online
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}