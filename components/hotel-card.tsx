import Image from "next/image"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Hotel } from "@/lib/types"

interface HotelCardProps {
  hotel: Hotel
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={hotel.image || "/placeholder.svg?height=300&width=500"}
          alt={hotel.name}
          fill
          className="object-cover"
        />
        {hotel.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="line-clamp-1">{hotel.location}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{hotel.description}</p>
        <div className="font-bold">
          ${hotel.price} <span className="font-normal text-muted-foreground text-sm">per night</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/hotels/${hotel.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

