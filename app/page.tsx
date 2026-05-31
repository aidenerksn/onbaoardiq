"use client"

import { useState } from "react"
import { WaitlistForm } from "@/components/WaitlistForm"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Activity,
  Zap,
  Brain,
  TrendingUp,
  MousePointerClick,
  BarChart3,
  Mail,
  Settings2,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  {
    stat: "62%",
    description:
      "Of SaaS trial users never come back after their first session. Not because your product is bad — because nobody caught them at the moment they got confused.",
  },
  {
    stat: "4 min",
    description:
      "The average time a new user spends before deciding whether to continue or quit. You have four minutes to show value. Most products waste two of them on a welcome email.",
  },
  {
    stat: "$12,000",
    description:
      "What the average SaaS founder loses monthly to trial churn they never see coming. It shows up as a flat growth curve. The cause stays invisible.",
  },
]

const steps = [
  {
    icon: Code2,
    title: "Install one line of code",
    description:
      "Paste a single script tag into your app. No SDK to configure, no events to manually track, no engineering sprint required. It starts working immediately.",
  },
  {
    icon: Activity,
    title: "Watch who's struggling in real time",
    description:
      "OnboardIQ scores every session from 0–100 based on behavior — rage clicks, form abandons, time on page, pages reached. You see exactly who is healthy, wavering, or about to leave.",
  },
  {
    icon: Zap,
    title: "Rescue them automatically",
    description:
      "When a user's score drops below your threshold, OnboardIQ fires a personalized email with the last page they visited, how long they've been gone, and a direct link back in.",
  },
]

const features = [
  {
    icon: Brain,
    name: "Drop-off Detection",
    description:
      "Pinpoints the exact page and moment where your trial users lose momentum — not just that they churned, but where and why.",
  },
  {
    icon: Activity,
    name: "Behavioral Scoring",
    description:
      "Every session gets a real-time score from 0–100 based on actual behavior, so you always know who needs attention before they disappear.",
  },
  {
    icon: Mail,
    name: "Automated Rescue Emails",
    description:
      "Sends personalized, trigger-based emails the moment a user's score falls — no manual follow-up, no batch campaigns, no blast-and-pray.",
  },
  {
    icon: BarChart3,
    name: "Funnel Visualization",
    description:
      "See your entire onboarding flow as a live funnel. Spot the steps with the highest drop-off and fix them with data, not gut feel.",
  },
  {
    icon: MousePointerClick,
    name: "Rage-Click Detection",
    description:
      "Flags when users repeatedly hammer the same element — a reliable signal of frustration you'd never catch any other way.",
  },
  {
    icon: Settings2,
    name: "Custom Trigger Rules",
    description:
      "Define exactly when and how OnboardIQ acts. Set conditions by score, page visited, time inactive, or form abandoned — your rules, your thresholds.",
  },
]

const testimonials = [
  {
    quote:
      "We were blaming our pricing for low conversion. OnboardIQ showed us 70% of trials were dropping off on the integrations page. We rewrote that one page and conversion went up 22% in three weeks.",
    name: "Marcus T.",
    company: "Founder, B2B workflow automation tool",
  },
  {
    quote:
      "I used to send a manual check-in email to every trial user on day three. Now OnboardIQ does it automatically, personalized to exactly where they left off. I got my Fridays back and conversion is up.",
    name: "Priya S.",
    company: "Solo founder, HR onboarding SaaS",
  },
  {
    quote:
      "Skeptical at first — I've tried three other analytics tools and none told me anything I could act on. OnboardIQ is different because it doesn't just show you data, it does something about it. Rescued 11 trials last month that would have just gone dark.",
    name: "Jordan K.",
    company: "Co-founder, client reporting SaaS for agencies",
  },
]

const faqs = [
  {
    q: "My trial conversion is already decent. Why do I need this?",
    a: '"Decent" hides a lot of money. If you\'re converting 15% of trials, that means 85% are leaving. Even moving from 15% to 20% on 100 trials a month — at $99/month average — is $5,940 in extra MRR. OnboardIQ pays for itself if it rescues six users. It typically rescues more than that in week one.',
  },
  {
    q: "I don't have time to set up another tool.",
    a: "Installation is one script tag and takes under two minutes. You don't configure events, you don't write tracking code, you don't set up dashboards. The only thing you need to do is decide what score triggers a rescue email — we give you a default to start. Most founders are fully set up inside 10 minutes.",
  },
  {
    q: "I already have Mixpanel / Amplitude / PostHog.",
    a: "Those tools show you what happened. OnboardIQ shows you who is about to leave and then does something about it. They're not the same product. Most of our customers use both — the analytics platform for product decisions, OnboardIQ for real-time trial rescue.",
  },
  {
    q: "Will this spam my users?",
    a: "No. OnboardIQ sends one rescue email per session, only when a user's behavioral score drops below the threshold you set. It's triggered by real signals of struggle — not a drip sequence, not a marketing blast. The emails are plain, personal, and relevant to exactly where the user left off.",
  },
  {
    q: "What if my trial users aren't the decision makers?",
    a: "Then you need them engaged even more. Champions who can't figure out your product don't sell it internally. A rescue email that gets them unstuck is often the thing that turns a confused trial user into an internal advocate.",
  },
  {
    q: "How is this different from Intercom?",
    a: "Intercom is a support and messaging platform. It's powerful but expensive, complex, and built for teams. OnboardIQ is a focused tool for one job: identifying which trial users are slipping and automatically pulling them back. No support inbox, no live chat widget, no bloat. Just conversion.",
  },
  {
    q: "What if my email deliverability is bad?",
    a: "OnboardIQ sends through Resend, which has strong deliverability infrastructure. Rescue emails are transactional — triggered by user behavior — so they get better inbox placement than marketing emails. We also recommend setting up your own domain for sending, which takes five minutes and significantly improves trust.",
  },
  {
    q: "What happens to my data? Who can see it?",
    a: "Your data is stored in your own isolated database partition — we don't store your users' behavioral data on shared infrastructure. Each customer's data is protected with row-level security. We can't see your users' sessions, and neither can anyone else's account.",
  },
]

// ── FAQ Item ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <span className="text-base font-medium text-white">{q}</span>
        {open ? (
          <ChevronUp className="mt-0.5 h-5 w-5 shrink-0 text-white/40" />
        ) : (
          <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-white/40" />
        )}
      </button>
      {open && (
        <p className="mt-4 text-sm leading-relaxed text-white/50">{a}</p>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#0a1628]">
      {/* Background gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-40 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[100px]"
      />

      {/* Nav */}
      <nav className="relative z-10 flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-bold tracking-tight text-white">
          OnboardIQ
        </span>
        <Badge
          variant="outline"
          className="border-blue-500/40 bg-blue-500/10 text-blue-400"
        >
          Private Beta
        </Badge>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 pb-24 pt-16 text-center">
        <Badge
          variant="outline"
          className="mb-6 border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-blue-400 uppercase"
        >
          Private Beta — Limited Spots
        </Badge>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          You&apos;re losing 60% of your trials.{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            You just don&apos;t know why.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
          OnboardIQ watches every click, scroll, and rage-click your trial users make — then automatically steps in before they disappear. No analysts. No guesswork. No churn.
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <WaitlistForm />
        </div>

        <p className="mt-8 text-sm text-white/30">
          Join 200+ founders already on the waitlist
        </p>
      </section>

      {/* ── Problem ── */}
      <section className="relative z-10 w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.stat}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <p className="mb-3 text-5xl font-extrabold text-white">{s.stat}</p>
              <p className="text-sm leading-relaxed text-white/50">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative z-10 w-full max-w-6xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">How it works</h2>
          <p className="mt-3 text-white/40">Up and running in under 10 minutes.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15">
                  <step.icon className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-xs font-bold tracking-widest text-blue-400/60 uppercase">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/50">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 w-full max-w-6xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything you need. Nothing you don&apos;t.</h2>
          <p className="mt-3 text-white/40">Built for solo founders and small teams who don&apos;t have time to waste.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-blue-500/30 hover:bg-white/[0.07]"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15">
                <f.icon className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm leading-relaxed text-white/50">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Social proof ── */}
      <section className="relative z-10 w-full max-w-6xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Founders who stopped guessing</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <p className="text-sm leading-relaxed text-white/70">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/40">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 w-full max-w-3xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Real questions. Straight answers.</h2>
        </div>
        <div>
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative z-10 w-full max-w-6xl px-6 pb-24 text-center">
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 px-8 py-16 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Stop watching trials expire.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Join the waitlist and be first to know when we launch. Early access founders get 3 months free.
          </p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 px-6 py-6 text-center text-xs text-white/30">
        © {new Date().getFullYear()} OnboardIQ. All rights reserved.
      </footer>
    </main>
  )
}
