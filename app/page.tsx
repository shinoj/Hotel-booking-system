import { HotelCard } from "@/components/hotel-card"
import { getHotels } from "@/lib/db"

export default async function HomePage() {
  const hotels = await getHotels()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Stay</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

