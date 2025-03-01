import type { Booking } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { CalendarDays, User } from "lucide-react"

interface RecentBookingsProps {
  bookings: Booking[]
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">No recent bookings found.</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Booking ID</th>
              <th className="text-left p-4">Hotel</th>
              <th className="text-left p-4">User</th>
              <th className="text-left p-4">Dates</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-muted/50">
                <td className="p-4">
                  <Link href={`/admin/bookings/${booking.id}`} className="font-medium hover:underline">
                    #{booking.id}
                  </Link>
                </td>
                <td className="p-4">{booking.hotel_name}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.user_name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(booking.checkInDate)}</span>
                  </div>
                </td>
                <td className="p-4">${booking.totalPrice}</td>
                <td className="p-4">
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "cancelled"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

