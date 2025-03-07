import Image from "next/image"
import { notFound } from "next/navigation"
import { getHotelById } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { MapPin, Star, Wifi, Utensils, Car, Tv } from "lucide-react"
import { BookingForm } from "@/components/booking-form"

export default async function HotelDetailPage({ params }: { params: { id: string } }) {
  const hotel = await getHotelById(Number.parseInt(params.id))
  const session = getSession()

  if (!hotel) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{hotel.location}</span>
            <div className="flex items-center ml-4">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{hotel.rating}</span>
            </div>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={hotel.image || "/placeholder.svg?height=600&width=800"}
              alt={hotel.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About this hotel</h2>
            <p className="text-muted-foreground">{hotel.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                <span>Restaurant</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span>Parking</span>
              </div>
              <div className="flex items-center gap-2">
                <Tv className="h-4 w-4" />
                <span>TV</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-6">
            <BookingForm hotel={hotel} isLoggedIn={!!session} />
          </div>
        </div>
      </div>
    </div>
  )
}

