import { redirect } from "next/navigation";
import Link from "next/link";
import { Wrench, LayoutDashboard, Calendar, Users, FileText, DollarSign, Settings, LogOut } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 border-r bg-card md:block">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">JobFlow</span>
          </Link>
        </div>
        <nav className="space-y-1 p-4 text-sm">
          <NavLink href="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>Dashboard</NavLink>
          <NavLink href="/dashboard/jobs" icon={<Calendar className="h-4 w-4" />}>Jobs</NavLink>
          <NavLink href="/dashboard/customers" icon={<Users className="h-4 w-4" />}>Customers</NavLink>
          <NavLink href="/dashboard/invoices" icon={<FileText className="h-4 w-4" />}>Invoices</NavLink>
          <NavLink href="/dashboard/payments" icon={<DollarSign className="h-4 w-4" />}>Payments</NavLink>
          <NavLink href="/dashboard/settings" icon={<Settings className="h-4 w-4" />}>Settings</NavLink>
        </nav>
        <div className="border-t p-4 text-xs text-muted-foreground">
          <p className="font-medium">{session.user.email}</p>
          <p className="mt-1">{session.org.name}</p>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-lg font-semibold">JobFlow</h1>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </form>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground"
    >
      {icon}
      {children}
    </Link>
  );
}