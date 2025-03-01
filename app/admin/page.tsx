import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getDashboardStats } from "@/lib/db"
import { AdminHeader } from "@/components/admin/admin-header"
import { DashboardCards } from "@/components/admin/dashboard-cards"
import { RecentBookings } from "@/components/admin/recent-bookings"

export default async function AdminDashboardPage() {
  const session = getSession()

  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  const stats = await getDashboardStats()

  return (
    <div className="container mx-auto py-10">
      <AdminHeader title="Dashboard" />

      <div className="mt-8">
        <DashboardCards stats={stats} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>
        <RecentBookings bookings={stats.recentBookings} />
      </div>
    </div>
  )
}

