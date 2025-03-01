import { type NextRequest, NextResponse } from "next/server"
import { getBookingById, updateBookingStatus } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication and admin role
    const session = getSession()
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    const { status } = await request.json()

    // Validate status
    if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Check if booking exists
    const booking = await getBookingById(id)
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Update booking status
    const success = await updateBookingStatus(id, status)

    if (!success) {
      return NextResponse.json({ error: "Failed to update booking status" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error updating booking status for id ${params.id}:`, error)
    return NextResponse.json({ error: "An error occurred while updating the booking status" }, { status: 500 })
  }
}

