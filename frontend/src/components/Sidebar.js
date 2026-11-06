
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Dashboard", href: "/", icon: "🏠" },
  { label: "Tasks", href: "/tasks", icon: "📋" },
  { label: "Learning Progress", href: "/progress", icon: "📊" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="flex items-center justify-between bg-slate-900 p-4 text-white lg:hidden">
        <h2 className="text-xl font-bold">ElevateTrack</h2>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg bg-slate-800 px-4 py-2"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? "✕ Close" : "☰ Menu"}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 p-6 text-white transition-transform duration-300 lg:static lg:min-h-screen lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="mb-10 hidden text-2xl font-bold lg:block">
          ElevateTrack
        </h2>

        <nav className="space-y-3">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}


