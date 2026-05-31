export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { stripe, getPriceId } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import type { PlanId } from "@/lib/stripe"
import type { ApiResponse } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerId, plan, email } = body as {
      customerId?: string
      plan: PlanId
      email?: string
    }

    if (!plan || !["starter", "growth", "scale"].includes(plan)) {
      return NextResponse.json<ApiResponse>(
        { error: "Invalid plan. Must be starter, growth, or scale." },
        { status: 400 }
      )
    }

    let stripeCustomerId: string | undefined = undefined

    // Look up existing Stripe customer ID from Supabase
    if (customerId) {
      const { data: customer } = await supabaseAdmin
        .from("customers")
        .select("stripe_customer_id")
        .eq("id", customerId)
        .single()

      if (customer?.stripe_customer_id) {
        stripeCustomerId = customer.stripe_customer_id
      }
    }

    // Create Stripe customer if we don't have one
    if (!stripeCustomerId && email) {
      const stripeCustomer = await stripe.customers.create({ email })
      stripeCustomerId = stripeCustomer.id

      // Save back to Supabase if we have a customer ID
      if (customerId) {
        await supabaseAdmin
          .from("customers")
          .update({ stripe_customer_id: stripeCustomerId })
          .eq("id", customerId)
      }
    }

    const priceId = getPriceId(plan)

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: stripeCustomerId,
      customer_email: !stripeCustomerId ? email : undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?welcome=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      metadata: {
        customerId: customerId ?? "",
        plan,
      },
    })

    return NextResponse.json<ApiResponse<{ url: string }>>({
      data: { url: session.url! },
    })
  } catch (err) {
    console.error("Checkout route error:", err)
    return NextResponse.json<ApiResponse>(
      { error: "Failed to create checkout session." },
      { status: 500 }
    )
  }
}
