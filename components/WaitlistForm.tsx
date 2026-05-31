"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, CheckCircle2 } from "lucide-react"
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
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-emerald-400">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">
          You&apos;re on the list! We&apos;ll be in touch soon.
        </p>
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
          className="h-12 flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-blue-400 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          disabled={state === "loading"}
          className="h-12 shrink-0 bg-blue-500 px-6 font-semibold text-white hover:bg-blue-400 focus-visible:ring-blue-400"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining…
            </>
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </div>

      {state === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <p className="text-xs text-white/40">
        No spam. Unsubscribe any time.
      </p>
    </form>
  )
}
