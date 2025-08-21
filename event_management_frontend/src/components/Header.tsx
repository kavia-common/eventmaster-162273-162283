"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="w-full border-b border-[var(--color-border)] bg-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 md:hidden">
        <div className="h-9 w-9 rounded-xl bg-[var(--color-primary)] text-white grid place-items-center text-lg">E</div>
        <span className="font-semibold">EventMaster</span>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <input placeholder="Search events..." className="input w-full max-w-md" id="global-search" />
      </div>
      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link className="btn btn-secondary" href="/auth/login">Login</Link>
            <Link className="btn btn-primary" href="/auth/register">Sign up</Link>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1 text-sm">{user.name}</div>
            <button className="btn btn-secondary" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
