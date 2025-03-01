import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import type { User, Session } from "./types"

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Compare password with hash
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Create a session
export async function createSession(user: User): Promise<void> {
  const session: Session = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  }

  const cookieStore = cookies()
  cookieStore.set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })
}

// Get current session
export function getSession(): Session | null {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value) as Session
  } catch (error) {
    return null
  }
}

// Clear session (logout)
export function clearSession(): void {
  const cookieStore = cookies()
  cookieStore.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  })
}

// Auth middleware
export function requireAuth() {
  const session = getSession()

  if (!session) {
    redirect("/login")
  }

  return session
}

