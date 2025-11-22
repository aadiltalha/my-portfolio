"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiLayout,
  FiFolder,
  FiFileText,
  FiMessageSquare,
  FiMessageCircle,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FiLayout },
  { href: "/projects", label: "Projects", icon: FiFolder },
  { href: "/blogs", label: "Blogs", icon: FiFileText },
  { href: "/testimonials", label: "Testimonials", icon: FiMessageSquare },
  { href: "/messages", label: "Messages", icon: FiMessageCircle },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-lg font-semibold">Admin</span>
        </div>

        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                  ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700">
            <FiLogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar (mobile slide-in) */}
      <aside
        className={`fixed z-50 inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <span className="text-lg font-semibold">Admin</span>
          <button
            className="p-2 rounded-md hover:bg-slate-800"
            onClick={toggleSidebar}
            aria-label="Close navigation"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                  ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-slate-900"
              onClick={toggleSidebar}
              aria-label="Open navigation"
            >
              <FiMenu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-slate-100">
              Admin Dashboard
            </h1>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800">
            <FiLogOut className="h-4 w-4" />
            Logout
          </button>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
