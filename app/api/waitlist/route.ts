import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import type { ApiResponse } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email: unknown = body?.email

    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json<ApiResponse>(
        { error: "A valid email address is required." },
        { status: 400 }
      )
    }

    const normalised = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalised)) {
      return NextResponse.json<ApiResponse>(
        { error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("waitlist")
      .insert({ email: normalised })

    if (error) {
      // Unique-constraint violation → already signed up
      if (error.code === "23505") {
        return NextResponse.json<ApiResponse>(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        )
      }
      console.error("Supabase insert error:", error)
      return NextResponse.json<ApiResponse>(
        { error: "Failed to join the waitlist. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json<ApiResponse>({ data: { email: normalised } })
  } catch (err) {
    console.error("Waitlist route error:", err)
    return NextResponse.json<ApiResponse>(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
