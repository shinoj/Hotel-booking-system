import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getUserBookings } from "@/lib/db"
import { DashboardHeader } from "@/components/dashboard-header"
import { BookingsList } from "@/components/bookings-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const session = getSession()

  if (!session) {
    redirect("/login")
  }

  const bookings = await getUserBookings(session.user.id)

  return (
    <div className="container mx-auto py-10">
      <DashboardHeader user={session.user} />

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Bookings</h2>
          <Link href="/">
            <Button>Book a Hotel</Button>
          </Link>
        </div>

        {bookings.length > 0 ? (
          <BookingsList bookings={bookings} />
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-6">
              You haven&apos;t made any bookings yet. Start by booking a hotel.
            </p>
            <Link href="/">
              <Button>Browse Hotels</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

