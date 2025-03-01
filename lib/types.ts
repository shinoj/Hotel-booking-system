export interface Hotel {
  id: number
  name: string
  location: string
  description: string
  price: number
  rating: number
  image: string | null
  featured: boolean
  created_at?: Date
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  role?: "user" | "admin"
  created_at?: Date
}

export interface Booking {
  id: number
  userId: number
  hotelId: number
  checkInDate: string
  checkOutDate: string
  guests: number
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  created_at?: Date
  hotel_name?: string
  hotel_image?: string
  user_name?: string
  user_email?: string
}

export interface Session {
  user: {
    id: number
    name: string
    email: string
    role?: "user" | "admin"
  }
}

