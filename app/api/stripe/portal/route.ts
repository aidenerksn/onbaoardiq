export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import type { ApiResponse } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerId } = body as { customerId: string }

    if (!customerId) {
      return NextResponse.json<ApiResponse>(
        { error: "customerId is required." },
        { status: 400 }
      )
    }

    // Get Stripe customer ID from Supabase
    const { data: customer, error } = await supabaseAdmin
      .from("customers")
      .select("stripe_customer_id")
      .eq("id", customerId)
      .single()

    if (error || !customer?.stripe_customer_id) {
      return NextResponse.json<ApiResponse>(
        { error: "No billing account found for this customer." },
        { status: 404 }
      )
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    })

    return NextResponse.json<ApiResponse<{ url: string }>>({
      data: { url: session.url },
    })
  } catch (err) {
    console.error("Portal route error:", err)
    return NextResponse.json<ApiResponse>(
      { error: "Failed to create billing portal session." },
      { status: 500 }
    )
  }
}
