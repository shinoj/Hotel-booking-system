"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Building2, Users, CalendarDays, Settings } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Hotels",
      href: "/admin/hotels",
      icon: Building2,
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
      icon: CalendarDays,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 bg-muted h-screen p-4 hidden md:block">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Building2 className="h-6 w-6" />
        <span className="text-xl font-bold">Admin Panel</span>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-accent",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <LogoutButton className="w-full justify-start" />
      </div>
    </div>
  )
}

