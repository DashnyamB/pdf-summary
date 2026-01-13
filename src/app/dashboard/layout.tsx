"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";

function NavButton({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium justify-start ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent"
      }`}
    >
      {children}
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/dashboard/pdf";
  const active = (p: string) =>
    pathname === "/dashboard" || pathname === "/dashboard/"
      ? p === "/dashboard/pdf"
      : pathname.startsWith(p);

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex h-screen w-full gap-6 px-8 py-6">
        <aside className="flex w-60 flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                Saas Dashboard Demo
              </div>
              <div className="text-xs text-muted-foreground">
                Internal tools
              </div>
            </div>
          </div>
          <nav className="space-y-1 text-sm">
            <NavButton href="/dashboard/pdf" active={active("/dashboard/pdf")}>
              PDF Summary
            </NavButton>
            <NavButton
              href="/dashboard/admin"
              active={active("/dashboard/admin")}
            >
              User List
            </NavButton>
          </nav>
          <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
            <span>v0.1.0 • Internal</span>
          </div>
        </aside>

        <main className="flex flex-1 gap-6">{children}</main>
      </div>
    </div>
  );
}
