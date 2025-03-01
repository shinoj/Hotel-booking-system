"use client"
import type { Booking } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreVertical, Eye, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"

interface BookingsTableProps {
  bookings: Booking[]
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  const router = useRouter()

  const updateBookingStatus = async (id: number, status: "confirmed" | "cancelled") => {
    try {
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        console.error("Failed to update booking status")
      }
    } catch (error) {
      console.error("Error updating booking status:", error)
    }
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">No bookings found.</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>#{booking.id}</TableCell>
                <TableCell className="font-medium">{booking.hotel_name}</TableCell>
                <TableCell>{booking.user_name}</TableCell>
                <TableCell>{formatDate(booking.checkInDate)}</TableCell>
                <TableCell>{formatDate(booking.checkOutDate)}</TableCell>
                <TableCell>${booking.totalPrice}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/bookings/${booking.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      {booking.status !== "confirmed" && (
                        <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, "confirmed")}>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Confirm Booking
                        </DropdownMenuItem>
                      )}
                      {booking.status !== "cancelled" && (
                        <DropdownMenuItem onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                          <XCircle className="h-4 w-4 mr-2 text-destructive" />
                          Cancel Booking
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

