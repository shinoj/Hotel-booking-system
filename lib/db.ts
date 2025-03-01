import mysql from "mysql2/promise"
import type { Hotel, User, Booking } from "./types"

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "hotel_booking",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Hotel functions
export async function getHotels(): Promise<Hotel[]> {
  try {
    const [rows] = await pool.query("SELECT * FROM hotels ORDER BY featured DESC, id DESC")
    return rows as Hotel[]
  } catch (error) {
    console.error("Error fetching hotels:", error)
    return [] // Return empty array on error
  }
}

export async function getHotelById(id: number): Promise<Hotel | undefined> {
  try {
    const [rows] = await pool.query("SELECT * FROM hotels WHERE id = ?", [id])
    const hotels = rows as Hotel[]
    return hotels[0]
  } catch (error) {
    console.error(`Error fetching hotel with id ${id}:`, error)
    return undefined
  }
}

export async function createHotel(hotel: Omit<Hotel, "id">): Promise<number> {
  try {
    const { name, location, description, price, rating, image, featured } = hotel
    const [result] = await pool.query(
      "INSERT INTO hotels (name, location, description, price, rating, image, featured) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, location, description, price, rating, image, featured],
    )
    return (result as any).insertId
  } catch (error) {
    console.error("Error creating hotel:", error)
    throw error
  }
}

export async function updateHotel(id: number, hotel: Partial<Hotel>): Promise<boolean> {
  try {
    const fields = Object.keys(hotel)
    const values = Object.values(hotel)

    if (fields.length === 0) return false

    const query = `UPDATE hotels SET ${fields.map((field) => `${field} = ?`).join(", ")} WHERE id = ?`

    const [result] = await pool.query(query, [...values, id])
    return (result as any).affectedRows > 0
  } catch (error) {
    console.error(`Error updating hotel with id ${id}:`, error)
    throw error
  }
}

export async function deleteHotel(id: number): Promise<boolean> {
  try {
    const [result] = await pool.query("DELETE FROM hotels WHERE id = ?", [id])
    return (result as any).affectedRows > 0
  } catch (error) {
    console.error(`Error deleting hotel with id ${id}:`, error)
    throw error
  }
}

// User functions
export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    const users = rows as User[]
    return users[0]
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error)
    return undefined
  }
}

export async function createUser(user: Omit<User, "id">): Promise<number> {
  try {
    const { name, email, password, role = "user" } = user
    const [result] = await pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
      name,
      email,
      password,
      role,
    ])
    return (result as any).insertId
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const [rows] = await pool.query("SELECT id, name, email, role, created_at FROM users ORDER BY id DESC")
    return rows as User[]
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

// Booking functions
export async function createBooking(booking: Omit<Booking, "id">): Promise<number> {
  try {
    const { userId, hotelId, checkInDate, checkOutDate, guests, totalPrice, status } = booking
    const [result] = await pool.query(
      "INSERT INTO bookings (user_id, hotel_id, check_in_date, check_out_date, guests, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, hotelId, checkInDate, checkOutDate, guests, totalPrice, status],
    )
    return (result as any).insertId
  } catch (error) {
    console.error("Error creating booking:", error)
    throw error
  }
}

export async function getUserBookings(userId: number): Promise<Booking[]> {
  try {
    const [rows] = await pool.query(
      `
      SELECT b.*, h.name as hotel_name, h.image as hotel_image 
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      WHERE b.user_id = ?
      ORDER BY b.check_in_date DESC
    `,
      [userId],
    )
    return rows as Booking[]
  } catch (error) {
    console.error(`Error fetching bookings for user ${userId}:`, error)
    return []
  }
}

export async function getBookingById(id: number): Promise<Booking | undefined> {
  try {
    const [rows] = await pool.query(
      `
      SELECT b.*, h.name as hotel_name, h.image as hotel_image 
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      WHERE b.id = ?
    `,
      [id],
    )
    const bookings = rows as Booking[]
    return bookings[0]
  } catch (error) {
    console.error(`Error fetching booking with id ${id}:`, error)
    return undefined
  }
}

export async function getAllBookings(): Promise<Booking[]> {
  try {
    const [rows] = await pool.query(`
      SELECT b.*, h.name as hotel_name, h.image as hotel_image, u.name as user_name, u.email as user_email
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      JOIN users u ON b.user_id = u.id
      ORDER BY b.created_at DESC
    `)
    return rows as Booking[]
  } catch (error) {
    console.error("Error fetching all bookings:", error)
    return []
  }
}

export async function updateBookingStatus(id: number, status: "pending" | "confirmed" | "cancelled"): Promise<boolean> {
  try {
    const [result] = await pool.query("UPDATE bookings SET status = ? WHERE id = ?", [status, id])
    return (result as any).affectedRows > 0
  } catch (error) {
    console.error(`Error updating booking status for id ${id}:`, error)
    throw error
  }
}

// Dashboard statistics
export async function getDashboardStats(): Promise<{
  totalHotels: number
  totalUsers: number
  totalBookings: number
  recentBookings: Booking[]
  revenue: number
}> {
  try {
    // Get total hotels
    const [hotelsResult] = await pool.query("SELECT COUNT(*) as count FROM hotels")
    const totalHotels = (hotelsResult as any)[0].count

    // Get total users
    const [usersResult] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "user"')
    const totalUsers = (usersResult as any)[0].count

    // Get total bookings
    const [bookingsResult] = await pool.query("SELECT COUNT(*) as count FROM bookings")
    const totalBookings = (bookingsResult as any)[0].count

    // Get total revenue
    const [revenueResult] = await pool.query(
      'SELECT SUM(total_price) as total FROM bookings WHERE status = "confirmed"',
    )
    const revenue = (revenueResult as any)[0].total || 0

    // Get recent bookings
    const [recentBookings] = await pool.query(`
      SELECT b.*, h.name as hotel_name, h.image as hotel_image, u.name as user_name, u.email as user_email
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      JOIN users u ON b.user_id = u.id
      ORDER BY b.created_at DESC
      LIMIT 5
    `)

    return {
      totalHotels,
      totalUsers,
      totalBookings,
      recentBookings: recentBookings as Booking[],
      revenue,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw error
  }
}

