import { type NextRequest, NextResponse } from "next/server"
import { createBooking } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = getSession()
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { hotelId, checkInDate, checkOutDate, guests, totalPrice } = await request.json()

    // Validate input
    if (!hotelId || !checkInDate || !checkOutDate || !guests || !totalPrice) {
      return NextResponse.json({ error: "All booking details are required" }, { status: 400 })
    }

    // Create booking
    const bookingId = await createBooking({
      userId: session.user.id,
      hotelId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      status: "confirmed",
    })

    return NextResponse.json({ success: true, bookingId }, { status: 201 })
  } catch (error) {
    console.error("Booking creation error:", error)
    return NextResponse.json({ error: "An error occurred while creating the booking" }, { status: 500 })
  }
}

