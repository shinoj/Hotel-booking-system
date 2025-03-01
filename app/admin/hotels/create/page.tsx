import { AdminHeader } from "@/components/admin/admin-header"
import { HotelForm } from "@/components/admin/hotel-form"

export default function CreateHotelPage() {
  return (
    <div className="container mx-auto py-10">
      <AdminHeader title="Add New Hotel" />

      <div className="mt-8">
        <HotelForm />
      </div>
    </div>
  )
}

