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
    const [rows] = await pool.query("SELECT * FROM hotels")
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
    const { name, email, password } = user
    const [result] = await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      password,
    ])
    return (result as any).insertId
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
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

