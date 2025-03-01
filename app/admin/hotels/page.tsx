import { getHotels } from "@/lib/db"
import { AdminHeader } from "@/components/admin/admin-header"
import { HotelsTable } from "@/components/admin/hotels-table"

export default async function AdminHotelsPage() {
  const hotels = await getHotels()

  return (
    <div className="container mx-auto py-10">
      <AdminHeader title="Hotels" createHref="/admin/hotels/create" createLabel="Add Hotel" />

      <div className="mt-8">
        <HotelsTable hotels={hotels} />
      </div>
    </div>
  )
}

