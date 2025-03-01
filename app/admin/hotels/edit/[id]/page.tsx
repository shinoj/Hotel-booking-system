import { notFound } from "next/navigation"
import { getHotelById } from "@/lib/db"
import { AdminHeader } from "@/components/admin/admin-header"
import { HotelForm } from "@/components/admin/hotel-form"

export default async function EditHotelPage({ params }: { params: { id: string } }) {
  const hotel = await getHotelById(Number.parseInt(params.id))

  if (!hotel) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <AdminHeader title={`Edit Hotel: ${hotel.name}`} />

      <div className="mt-8">
        <HotelForm hotel={hotel} />
      </div>
    </div>
  )
}

