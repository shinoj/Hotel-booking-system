import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getBookingById } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { CalendarDays, MapPin, Users, CreditCard, ArrowLeft } from "lucide-react"

export default async function BookingDetailPage({ params }: { params: { id: string } }) {
  const session = getSession()

  if (!session) {
    redirect("/login")
  }

  const booking = await getBookingById(Number.parseInt(params.id))

  if (!booking || booking.userId !== session.user.id) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Booking Details</h1>
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
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-6">
                If you need to modify or cancel your booking, please contact our customer support.
              </p>
              <div className="space-y-3">
                <Button className="w-full">Contact Support</Button>
                <Button variant="outline" className="w-full">
                  Cancel Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

