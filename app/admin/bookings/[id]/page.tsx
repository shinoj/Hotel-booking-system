import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getBookingById } from "@/lib/db"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, CalendarDays, MapPin, Users, CreditCard, User, Mail } from "lucide-react"
import { BookingStatusActions } from "@/components/admin/booking-status-actions"

export default async function AdminBookingDetailPage({ params }: { params: { id: string } }) {
  const booking = await getBookingById(Number.parseInt(params.id))

  if (!booking) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/admin/bookings" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bookings
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <AdminHeader title={`Booking #${booking.id}`} />
        <Badge
          variant={
            booking.status === "confirmed" ? "default" : booking.status === "cancelled" ? "destructive" : "secondary"
          }
          className="text-base px-3 py-1"
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-32">
                  <Image
                    src={booking.hotel_image || "/placeholder.svg?height=200&width=300"}
                    alt={booking.hotel_name || "Hotel"}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{booking.hotel_name}</h2>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Location information would be here</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <CalendarDays className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium">Check-in</p>
                        <p className="text-muted-foreground">{formatDate(booking.checkInDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CalendarDays className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium">Check-out</p>
                        <p className="text-muted-foreground">{formatDate(booking.checkOutDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium">Guests</p>
                        <p className="text-muted-foreground">
                          {booking.guests} {booking.guests === 1 ? "person" : "people"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                      <div>
                        <p className="font-medium">Total Price</p>
                        <p className="text-muted-foreground">${booking.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <User className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Name</p>
                    <p className="text-muted-foreground">{booking.user_name}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{booking.user_email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <BookingStatusActions booking={booking} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

