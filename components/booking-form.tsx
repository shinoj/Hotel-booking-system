"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Hotel } from "@/lib/types"
import { differenceInDays } from "date-fns"

interface BookingFormProps {
  hotel: Hotel
  isLoggedIn: boolean
}

export function BookingForm({ hotel, isLoggedIn }: BookingFormProps) {
  const router = useRouter()
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guests, setGuests] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPrice, setTotalPrice] = useState(hotel.price)

  // Calculate total price based on dates and guests
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return hotel.price

    const startDate = new Date(checkInDate)
    const endDate = new Date(checkOutDate)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return hotel.price

    const nights = Math.max(1, differenceInDays(endDate, startDate))
    return hotel.price * nights
  }

  // Update total price when dates change
  const handleDateChange = () => {
    setTotalPrice(calculateTotalPrice())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelId: hotel.id,
          checkInDate,
          checkOutDate,
          guests,
          totalPrice,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Booking failed")
      }

      // Redirect to booking confirmation
      router.push(`/bookings/${data.bookingId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Price</h2>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-bold">${hotel.price}</span>
          <span className="text-muted-foreground">per night</span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="check-in">Check-in Date</Label>
          <Input
            id="check-in"
            type="date"
            value={checkInDate}
            onChange={(e) => {
              setCheckInDate(e.target.value)
              handleDateChange()
            }}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="check-out">Check-out Date</Label>
          <Input
            id="check-out"
            type="date"
            value={checkOutDate}
            onChange={(e) => {
              setCheckOutDate(e.target.value)
              handleDateChange()
            }}
            min={checkInDate || new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <Input
            id="guests"
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(Number.parseInt(e.target.value))}
            required
          />
        </div>

        {checkInDate && checkOutDate && (
          <div className="pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span>Total Price:</span>
              <span className="font-bold">${totalPrice}</span>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : isLoggedIn ? "Book Now" : "Sign in to Book"}
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t">
        <h3 className="font-medium mb-2">Hotel Policies</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>Check-in: 3:00 PM - 12:00 AM</li>
          <li>Check-out: 11:00 AM</li>
          <li>Cancellation: 24 hours before arrival</li>
        </ul>
      </div>
    </div>
  )
}

