export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import type Stripe from "stripe"

// Map Stripe product/price to plan name
async function getPlanFromPriceId(priceId: string): Promise<string> {
  const map: Record<string, string> = {
    [process.env.STRIPE_STARTER_PRICE_ID ?? ""]: "starter",
    [process.env.STRIPE_GROWTH_PRICE_ID ?? ""]:  "growth",
    [process.env.STRIPE_SCALE_PRICE_ID ?? ""]:   "scale",
  }
  return map[priceId] ?? "starter"
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig  = request.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const stripeCustomerId = subscription.customer as string
        const priceId = subscription.items.data[0]?.price.id
        const plan = await getPlanFromPriceId(priceId)
        const isActive = subscription.status === "active" || subscription.status === "trialing"

        await supabaseAdmin
          .from("customers")
          .update({ plan: isActive ? plan : "starter" })
          .eq("stripe_customer_id", stripeCustomerId)

        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const stripeCustomerId = subscription.customer as string

        // Downgrade to starter on cancellation
        await supabaseAdmin
          .from("customers")
          .update({ plan: "starter" })
          .eq("stripe_customer_id", stripeCustomerId)

        break
      }

      default:
        // Ignore unhandled event types
        break
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("Webhook handler error:", err)
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 })
  }
}
