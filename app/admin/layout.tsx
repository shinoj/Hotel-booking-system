import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = getSession()

  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <main className="p-4 md:p-6 w-full">{children}</main>
      </div>
    </div>
  )
}

