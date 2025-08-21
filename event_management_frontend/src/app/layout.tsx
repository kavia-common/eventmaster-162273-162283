import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || "EventMaster",
  description: "Event management system frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)]">
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 flex flex-col">
                <Header />
                <div className="p-4">{children}</div>
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
