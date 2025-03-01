import { getAllBookings } from "@/lib/db"
import { AdminHeader } from "@/components/admin/admin-header"
import { BookingsTable } from "@/components/admin/bookings-table"

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings()

  return (
    <div className="container mx-auto py-10">
      <AdminHeader title="Bookings" />

      <div className="mt-8">
        <BookingsTable bookings={bookings} />
      </div>
    </div>
  )
}

