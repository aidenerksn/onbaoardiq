import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "placeholder", {
  apiVersion: "2026-05-27.dahlia",
  typescript: true,
})

export type PlanId = "starter" | "growth" | "scale"

export function getPriceId(plan: PlanId): string {
  const map: Record<PlanId, string | undefined> = {
    starter: process.env.STRIPE_STARTER_PRICE_ID,
    growth:  process.env.STRIPE_GROWTH_PRICE_ID,
    scale:   process.env.STRIPE_SCALE_PRICE_ID,
  }
  const priceId = map[plan]
  if (!priceId) throw new Error(`Missing price ID for plan: ${plan}`)
  return priceId
}
