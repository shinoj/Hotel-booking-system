"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Booking } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Mail } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface BookingStatusActionsProps {
  booking: Booking
}

export function BookingStatusActions({ booking }: BookingStatusActionsProps) {
  const router = useRouter()
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const updateStatus = async (status: "confirmed" | "cancelled") => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/bookings/${booking.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        console.error("Failed to update booking status")
      }
    } catch (error) {
      console.error("Error updating booking status:", error)
    } finally {
      setIsLoading(false)
      setIsConfirmDialogOpen(false)
      setIsCancelDialogOpen(false)
    }
  }

  return (
    <>
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-4">
          Current Status:
          <span
            className={
              booking.status === "confirmed"
                ? "text-green-500 font-medium ml-2"
                : booking.status === "cancelled"
                  ? "text-destructive font-medium ml-2"
                  : "font-medium ml-2"
            }
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        <Button className="w-full flex items-center justify-center gap-2" variant="outline">
          <Mail className="h-4 w-4" />
          Contact Guest
        </Button>

        {booking.status !== "confirmed" && (
          <Button
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
            onClick={() => setIsConfirmDialogOpen(true)}
            disabled={isLoading}
          >
            <CheckCircle className="h-4 w-4" />
            Confirm Booking
          </Button>
        )}

        {booking.status !== "cancelled" && (
          <Button
            className="w-full flex items-center justify-center gap-2"
            variant="destructive"
            onClick={() => setIsCancelDialogOpen(true)}
            disabled={isLoading}
          >
            <XCircle className="h-4 w-4" />
            Cancel Booking
          </Button>
        )}
      </div>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to confirm this booking? This will notify the guest.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => updateStatus("confirmed")} className="bg-green-500 hover:bg-green-600">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This will notify the guest and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => updateStatus("cancelled")}
              className="bg-destructive text-destructive-foreground"
            >
              Yes, cancel booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

