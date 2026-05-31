import { LayoutDashboard, Activity, Settings, Zap, LogOut } from "lucide-react"
import Link from "next/link"

const nav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/sessions", icon: Activity, label: "Sessions" },
  { href: "/dashboard/triggers", icon: Zap, label: "Triggers" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col bg-[#0f1117] text-white">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-white/10">
          <span className="text-lg font-bold tracking-tight">
            Onboard<span className="text-[#7C3AED]">IQ</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {nav.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-3 py-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/40 transition-colors hover:bg-white/10 hover:text-white">
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-1 flex-col overflow-auto">
        {children}
      </main>
    </div>
  )
}
