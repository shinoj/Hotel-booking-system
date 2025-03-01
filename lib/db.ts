import type { Hotel } from "./types"

// Mock data for Version 1
// In Version 1, we'll use this mock data instead of a real database
const hotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "New York, NY",
    description:
      "Experience luxury in the heart of Manhattan with stunning views of the city skyline. Our 5-star hotel offers spacious rooms, a rooftop pool, and world-class dining options.",
    price: 299,
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=500&text=Grand+Plaza",
    featured: true,
  },
  {
    id: 2,
    name: "Oceanview Resort",
    location: "Miami, FL",
    description:
      "Relax in our beachfront resort with direct access to pristine white sand beaches. Enjoy our spa, multiple pools, and oceanfront dining experiences.",
    price: 349,
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=500&text=Oceanview",
    featured: false,
  },
  {
    id: 3,
    name: "Mountain Retreat Lodge",
    location: "Aspen, CO",
    description:
      "Nestled in the mountains, our lodge offers cozy accommodations with breathtaking views. Perfect for ski trips or summer hiking adventures.",
    price: 249,
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=500&text=Mountain+Lodge",
    featured: false,
  },
  {
    id: 4,
    name: "City Center Suites",
    location: "Chicago, IL",
    description:
      "Modern suites in downtown Chicago, walking distance to major attractions, shopping, and dining. Each suite includes a kitchenette and living area.",
    price: 199,
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=500&text=City+Center",
    featured: true,
  },
  {
    id: 5,
    name: "Historic Boutique Hotel",
    location: "Boston, MA",
    description:
      "A charming boutique hotel in a restored historic building. Unique rooms, personalized service, and a central location make this a perfect choice.",
    price: 229,
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=500&text=Historic+Hotel",
    featured: false,
  },
  {
    id: 6,
    name: "Desert Oasis Resort",
    location: "Phoenix, AZ",
    description:
      "A luxurious desert retreat featuring multiple pools, golf courses, and spa treatments. Enjoy stunning sunset views and southwestern cuisine.",
    price: 279,
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=500&text=Desert+Oasis",
    featured: false,
  },
]

export async function getHotels(): Promise<Hotel[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return hotels
}

export async function getHotelById(id: number): Promise<Hotel | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return hotels.find((hotel) => hotel.id === id)
}

