"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/events", label: "Events", icon: "📅" },
  { href: "/calendar", label: "Calendar", icon: "🗓️" },
  { href: "/rsvps", label: "My RSVPs", icon: "✅" },
];

export default function Sidebar() {
  const path = usePathname();
  const title = process.env.NEXT_PUBLIC_APP_TITLE || "EventMaster";
  return (
    <aside className="h-full w-64 border-r border-[var(--color-border)] bg-white p-4 hidden md:flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-[var(--color-primary)] text-white grid place-items-center text-lg">E</div>
        <div className="font-semibold text-lg">{title}</div>
      </div>
      <nav className="flex flex-col gap-1">
        {nav.map((n) => {
          const active = path?.startsWith(n.href);
          return (
            <Link key={n.href} href={n.href} className={`sidebar-link ${active ? "bg-[#EEF2FF] text-[var(--color-primary)]" : ""}`}>
              <span>{n.icon}</span>
              <span>{n.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto text-xs text-gray-400">Light theme · Modern UI</div>
    </aside>
  );
}
