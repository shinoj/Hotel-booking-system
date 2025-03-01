import { type NextRequest, NextResponse } from "next/server"
import { createHotel, getHotels } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const hotels = await getHotels()
    return NextResponse.json(hotels)
  } catch (error) {
    console.error("Error fetching hotels:", error)
    return NextResponse.json({ error: "An error occurred while fetching hotels" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = getSession()
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const hotelData = await request.json()

    // Validate input
    if (!hotelData.name || !hotelData.location || !hotelData.description || !hotelData.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create hotel
    const hotelId = await createHotel(hotelData)

    return NextResponse.json({ success: true, hotelId }, { status: 201 })
  } catch (error) {
    console.error("Error creating hotel:", error)
    return NextResponse.json({ error: "An error occurred while creating the hotel" }, { status: 500 })
  }
}

