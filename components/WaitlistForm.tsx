"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, CheckCircle2, Mail } from "lucide-react"
import type { ApiResponse } from "@/types"

type FormState = "idle" | "loading" | "success" | "error"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return

    setState("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const json: ApiResponse = await res.json()

      if (!res.ok) {
        setErrorMessage(json.error ?? "Something went wrong. Please try again.")
        setState("error")
        return
      }

      setState("success")
      setEmail("")
    } catch {
      setErrorMessage("Network error. Please try again.")
      setState("error")
    }
  }

  if (state === "success") {
    return (
      <div className="w-full max-w-md rounded-2xl border border-emerald-500/25 bg-emerald-500/8 px-6 py-5 text-left">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-white">You&apos;re on the list!</p>
            <p className="mt-1 text-sm text-white/50">
              Check your inbox — we just sent you a confirmation with everything you need to know. Your invite is coming soon.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <Mail className="h-4 w-4 shrink-0 text-violet-400" />
          <p className="text-xs text-white/40">
            Didn&apos;t get it? Check your spam folder or reply to{" "}
            <a href="mailto:hello@onboardiq.com" className="text-violet-400 hover:underline">
              hello@onboardiq.com
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={state === "loading"}
          className="h-12 flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-violet-400 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          disabled={state === "loading"}
          className="h-12 shrink-0 bg-violet-600 px-6 font-semibold text-white hover:bg-violet-500 focus-visible:ring-violet-400"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining…
            </>
          ) : (
            "Get Early Access"
          )}
        </Button>
      </div>

      {state === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <p className="text-xs text-white/30">
        14-day free trial · No credit card required · Unsubscribe any time
      </p>
    </form>
  )
}
