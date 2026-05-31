"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createSupabaseBrowser } from "@/lib/supabaseBrowser"
import { Loader2, Eye, EyeOff, Check } from "lucide-react"

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$99",
    description: "Solo founders",
    features: ["1 app", "500 sessions / mo", "1 rescue trigger"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$299",
    description: "Growing teams",
    features: ["5 apps", "5,000 sessions / mo", "Unlimited triggers"],
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "$799",
    description: "High-volume SaaS",
    features: ["Unlimited apps", "Unlimited sessions", "API access"],
  },
]

export default function SignupPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowser()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("growth")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setLoading(true)

    try {
      // 1. Create Supabase auth user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/onboarding` },
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      const userId = data.user?.id
      if (!userId) {
        setError("Signup failed. Please try again.")
        setLoading(false)
        return
      }

      // 2. Create customer record
      await supabase.from("customers").upsert({
        id: userId,
        email,
        plan: "free",
      })

      // 3. Go to Stripe checkout for selected plan
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan, email, customerId: userId }),
      })
      const json = await res.json()

      if (json.data?.url) {
        window.location.href = json.data.url
      } else {
        // Fallback — go to onboarding anyway
        router.push("/onboarding")
      }
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#060d1a] px-4 py-16">
      {/* Background orb */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-60 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-700/15 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-extrabold text-white">
            Onboard<span className="text-violet-400">IQ</span>
          </Link>
          <p className="mt-2 text-sm text-white/40">Create your account — 14-day free trial</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Account fields */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Your account</h2>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/70">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/70">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-sm text-white placeholder:text-white/25 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/70">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="Repeat your password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
              />
            </div>
          </div>

          {/* Plan selector */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-3">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Choose your plan</h2>
            <div className="grid gap-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                    selectedPlan === plan.id
                      ? "border-violet-500/60 bg-violet-500/10"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 right-4 rounded-full bg-violet-600 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
                      Popular
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{plan.name}</span>
                      <span className="text-xs text-white/35">{plan.description}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                      {plan.features.map((f) => (
                        <span key={f} className="text-xs text-white/35">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 shrink-0 text-right">
                    <span className="text-lg font-bold text-white">{plan.price}</span>
                    <span className="text-xs text-white/35"> /mo</span>
                  </div>
                  {selectedPlan === plan.id && (
                    <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-violet-500 disabled:opacity-60"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Setting up your account…</>
            ) : (
              "Create account & continue to payment →"
            )}
          </button>

          <p className="text-center text-xs text-white/25">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="text-violet-400 hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-violet-400 hover:underline">Privacy Policy</Link>.
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-white/35">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-400 hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  )
}
