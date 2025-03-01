import { type NextRequest, NextResponse } from "next/server"
import { getHotelById, updateHotel, deleteHotel } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const hotel = await getHotelById(id)

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 })
    }

    return NextResponse.json(hotel)
  } catch (error) {
    console.error(`Error fetching hotel with id ${params.id}:`, error)
    return NextResponse.json({ error: "An error occurred while fetching the hotel" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and admin role
    const session = getSession()
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    const hotelData = await request.json()

    // Validate input
    if (!hotelData.name || !hotelData.location || !hotelData.description || !hotelData.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if hotel exists
    const existingHotel = await getHotelById(id)
    if (!existingHotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 })
    }

    // Update hotel
    const success = await updateHotel(id, hotelData)

    if (!success) {
      return NextResponse.json({ error: "Failed to update hotel" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error updating hotel with id ${params.id}:`, error)
    return NextResponse.json({ error: "An error occurred while updating the hotel" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and admin role
    const session = getSession()
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)

    // Check if hotel exists
    const existingHotel = await getHotelById(id)
    if (!existingHotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 })
    }

    // Delete hotel
    const success = await deleteHotel(id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete hotel" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting hotel with id ${params.id}:`, error)
    return NextResponse.json({ error: "An error occurred while deleting the hotel" }, { status: 500 })
  }
}

