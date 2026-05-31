"use client"

import { useState, useRef } from "react"
import { WaitlistForm } from "@/components/WaitlistForm"
import {
  Code2,
  Activity,
  Zap,
  Brain,
  MousePointerClick,
  BarChart3,
  Mail,
  Settings2,
  ChevronDown,
  Check,
} from "lucide-react"
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion"

// ── Animation variants ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Scroll-triggered wrapper ──────────────────────────────────────────────────

function ScrollReveal({
  children,
  variants = fadeUp,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  variants?: Variants
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={delay}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { stat: "70%", label: "of trial users never return after day one" },
  { stat: "4 min", label: "before a user decides to stay or leave" },
  { stat: "$12k", label: "lost monthly to invisible trial churn" },
]

const steps = [
  {
    icon: Code2,
    title: "Install in 5 minutes",
    description: "Paste a single script tag. No SDK, no event tracking, no engineering sprint. Works immediately.",
  },
  {
    icon: Activity,
    title: "AI watches every user",
    description: "Every session gets scored 0–100 in real time. Rage clicks, form abandons, dead ends — all captured.",
  },
  {
    icon: Zap,
    title: "Rescue emails fire automatically",
    description: "Score drops below your threshold, a personalized email fires. Last page visited, time gone, link back in.",
  },
]

const features = [
  { icon: Brain, name: "Drop-off Detection", description: "Pinpoints the exact page where users lose momentum — not just that they churned, but where and why." },
  { icon: Activity, name: "Behavioral Scoring", description: "Real-time 0–100 score per session based on actual behavior. Know who needs help before they leave." },
  { icon: Mail, name: "Automated Rescue", description: "One email per at-risk session. Triggered by behavior, personalized to their journey. Not a drip campaign." },
  { icon: BarChart3, name: "Funnel Visualization", description: "Your entire onboarding flow as a live funnel. Spot drop-off points. Fix them with data." },
  { icon: MousePointerClick, name: "Rage-Click Detection", description: "Flags when users hammer the same element — a frustration signal you'd never catch otherwise." },
  { icon: Settings2, name: "Custom Triggers", description: "Set your own rules. Score threshold, page visited, time inactive, form abandoned — your call." },
]

const testimonials = [
  {
    quote: "We were blaming our pricing for low conversion. OnboardIQ showed us 70% of trials dropped off on the integrations page. We rewrote it and conversion went up 22% in three weeks.",
    name: "Marcus T.",
    company: "B2B workflow automation, 14 people",
    result: "+22% conversion",
  },
  {
    quote: "I used to manually email every trial user on day three. Now OnboardIQ does it automatically, personalized to exactly where they left off. I got my Fridays back.",
    name: "Priya S.",
    company: "Solo founder, HR onboarding SaaS",
    result: "Hours saved weekly",
  },
  {
    quote: "I've tried three analytics tools. None told me anything I could act on. OnboardIQ rescued 11 trials last month that would have just gone dark.",
    name: "Jordan K.",
    company: "Client reporting SaaS for agencies",
    result: "11 trials rescued",
  },
]

const faqs = [
  { q: "My conversion is already decent. Why do I need this?", a: '"Decent" hides money. Moving from 15% to 20% on 100 trials at $99/month is $5,940 extra MRR. OnboardIQ pays for itself if it rescues six users. Most founders see that in week one.' },
  { q: "Does it work with my stack?", a: "Yes. OnboardIQ is a single script tag — it works on any web app regardless of your stack. React, Vue, Angular, plain HTML — it doesn't matter. If it runs in a browser, we track it." },
  { q: "Is my users' data safe?", a: "Completely isolated per customer with row-level security. We can't see your users' sessions. Neither can anyone else's account. Your data stays yours, always." },
  { q: "How long does setup take?", a: "Under 10 minutes for most founders. Paste the snippet, set your rescue threshold, done. You'll see your first session data within minutes of install." },
  { q: "Will this spam my users?", a: "One email per session, only when behavior signals real struggle. Plain, personal, relevant. Not a drip sequence. Not a blast. A nudge at exactly the right moment." },
  { q: "I already have Mixpanel / Amplitude / PostHog.", a: "Those show you what happened. OnboardIQ shows you who is about to leave — and does something about it. Most customers use both. Different jobs." },
  { q: "How is this different from Intercom?", a: "Intercom is a support platform built for teams. OnboardIQ does one job: find which trials are slipping and pull them back. No inbox, no live chat, no bloat." },
  { q: "What about email deliverability?", a: "Sends through Resend. Transactional emails get better inbox placement than marketing. Set up your own sending domain in five minutes for even better trust." },
]

const plans = [
  {
    name: "Starter",
    monthly: 29,
    annual: 23,
    description: "For solo founders validating product-market fit.",
    features: [
      "1 tracked app",
      "Up to 500 sessions / mo",
      "Behavioral scoring",
      "1 rescue trigger",
      "Email support",
    ],
    cta: "Start free trial",
    popular: false,
    plan: "starter",
  },
  {
    name: "Growth",
    monthly: 79,
    annual: 63,
    description: "For growing teams with real trial volume.",
    features: [
      "5 tracked apps",
      "Up to 5,000 sessions / mo",
      "Behavioral scoring + funnel",
      "Unlimited rescue triggers",
      "Custom email templates",
      "Priority support",
    ],
    cta: "Start free trial",
    popular: true,
    plan: "growth",
  },
  {
    name: "Scale",
    monthly: 199,
    annual: 159,
    description: "For scaling SaaS with high trial volume.",
    features: [
      "Unlimited apps",
      "Unlimited sessions",
      "Everything in Growth",
      "Custom sending domain",
      "API access",
      "Dedicated onboarding",
    ],
    cta: "Start free trial",
    popular: false,
    plan: "scale",
  },
]

// ── Logo mark ─────────────────────────────────────────────────────────────────

function LogoMark({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="url(#ring)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="20" fill="url(#innerGlow)" opacity="0.6" />
      <rect x="16" y="36" width="6" height="12" rx="2" fill="url(#bar1)" />
      <rect x="25" y="28" width="6" height="20" rx="2" fill="url(#bar2)" />
      <rect x="34" y="20" width="6" height="28" rx="2" fill="url(#bar3)" />
      <path d="M14 38 L28 24 L36 30 L50 16" stroke="url(#arrow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="16" r="3" fill="#a78bfa" />
      <defs>
        <linearGradient id="ring" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop stopColor="#7c3aed" stopOpacity="0.3" /><stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#6d28d9" /><stop offset="1" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#5b21b6" />
        </linearGradient>
        <linearGradient id="bar3" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#8b5cf6" /><stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="arrow" x1="14" y1="38" x2="50" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ── FAQ Item ──────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10 py-5">
      <button onClick={() => setOpen(!open)} className="flex w-full items-start justify-between gap-4 text-left">
        <span className="text-base font-medium text-white">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-0.5 shrink-0"
        >
          <ChevronDown className={`h-5 w-5 ${open ? "text-violet-400" : "text-white/30"}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm leading-relaxed text-white/50">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Dashboard Preview Mock ────────────────────────────────────────────────────

function DashboardPreview() {
  const funnelSteps = [
    { label: "Signed up", pct: 100, count: "1,240", color: "bg-violet-500" },
    { label: "Completed setup", pct: 71, count: "880", color: "bg-violet-500" },
    { label: "Invited teammate", pct: 44, count: "546", color: "bg-violet-400" },
    { label: "Reached billing", pct: 22, count: "273", color: "bg-violet-300" },
    { label: "Converted", pct: 12, count: "149", color: "bg-emerald-400" },
  ]
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] shadow-2xl shadow-violet-900/20">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500/60" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
        <span className="ml-3 text-xs text-white/20">OnboardIQ — Drop-off Funnel</span>
      </div>
      {/* Dashboard body */}
      <div className="p-6">
        {/* Top stats row */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { label: "Active Sessions", value: "1,240", delta: "+12%" },
            { label: "At-Risk Users", value: "87", delta: "-8%" },
            { label: "Rescued This Week", value: "34", delta: "+41%" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="text-xs text-white/30">{s.label}</p>
              <p className="mt-1 text-xl font-bold text-white">{s.value}</p>
              <p className={`text-xs font-medium ${s.delta.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{s.delta}</p>
            </div>
          ))}
        </div>
        {/* Funnel */}
        <p className="mb-4 text-xs font-semibold tracking-widest text-white/30 uppercase">Onboarding Funnel</p>
        <div className="space-y-3">
          {funnelSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <span className="w-36 shrink-0 text-xs text-white/50">{step.label}</span>
              <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${step.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full rounded-full ${step.color}`}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-xs font-medium text-white/50">{step.count}</span>
            </div>
          ))}
        </div>
        {/* Bottom alert */}
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          <p className="text-xs text-amber-300/80">
            <span className="font-semibold">87 users at risk</span> — rescue emails queued for next hourly run
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Pricing Card ──────────────────────────────────────────────────────────────

function PricingCard({
  plan,
  annual,
}: {
  plan: typeof plans[number]
  annual: boolean
}) {
  const price = annual ? plan.annual : plan.monthly
  const savings = plan.monthly * 12 - plan.annual * 12

  async function handleCheckout() {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: plan.plan }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <div className={`relative flex flex-col rounded-2xl border p-8 ${
      plan.popular
        ? "border-violet-500/50 bg-violet-500/10"
        : "border-white/[0.08] bg-white/[0.03]"
    }`}>
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-violet-600 px-4 py-1 text-xs font-bold text-white tracking-wide uppercase">
            Most Popular
          </span>
        </div>
      )}
      <h3 className="text-lg font-bold text-white">{plan.name}</h3>
      <p className="mt-1 text-sm text-white/40">{plan.description}</p>
      <div className="mt-6 flex items-end gap-1">
        <span className="text-4xl font-extrabold text-white">${price}</span>
        <span className="mb-1 text-sm text-white/40">/ mo</span>
      </div>
      {annual && (
        <p className="mt-1 text-xs text-emerald-400 font-medium">Save ${savings} / year</p>
      )}
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-white/60">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={handleCheckout}
        className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
          plan.popular
            ? "bg-violet-600 text-white hover:bg-violet-500"
            : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
        }`}
      >
        {plan.cta}
      </button>
      <p className="mt-3 text-center text-xs text-white/25">14-day free trial · No card required</p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef(null)
  const [annual, setAnnual] = useState(false)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden bg-[#080e1c]">

      {/* ── Ambient background ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-60 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-60 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-0 -left-60 h-[400px] w-[400px] rounded-full bg-violet-900/20 blur-[120px]" />
      </div>

      {/* ── Nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-20 flex w-full max-w-6xl items-center justify-between px-6 py-6"
      >
        <span className="text-lg font-bold tracking-tight text-white">
          Onboard<span className="text-violet-400">IQ</span>
        </span>
        <div className="flex items-center gap-6">
          <a href="#pricing" className="hidden text-sm text-white/40 hover:text-white/70 transition-colors sm:block">Pricing</a>
          <span className="hidden text-sm text-white/40 sm:block">Early access open</span>
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 pb-32 pt-10 text-center">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col items-center">
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-2xl scale-150" />
              <LogoMark size={72} />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 text-sm font-bold tracking-[0.25em] text-violet-400 uppercase"
          >
            OnboardIQ
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="text-xs font-medium tracking-widest text-violet-400 uppercase">Private Beta — Limited Spots</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="max-w-3xl text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Stop losing 70% of
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              your trial users.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/50"
          >
            OnboardIQ finds exactly where they quit and saves them automatically. Install in 5 minutes — free trial, no card.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 w-full max-w-md"
          >
            <WaitlistForm />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-6 text-sm text-white/25"
          >
            Join 200+ founders already on the waitlist
          </motion.p>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 w-full max-w-5xl px-6 pb-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.div
              key={s.stat}
              variants={staggerItem}
              className="flex flex-col gap-2 bg-white/[0.03] p-8 text-center backdrop-blur-sm"
            >
              <span className="text-5xl font-extrabold text-white">{s.stat}</span>
              <span className="text-sm leading-snug text-white/40">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section className="relative z-10 w-full max-w-5xl px-6 pb-28">
        <ScrollReveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold tracking-widest text-violet-400 uppercase">How it works</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Up and running in 10 minutes.</h2>
        </ScrollReveal>
        <div className="relative grid gap-8 sm:grid-cols-3">
          <div className="absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] hidden h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent sm:block" />
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} variants={fadeUp} delay={i * 0.12}>
              <div className="flex flex-col gap-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10">
                  <step.icon className="h-6 w-6 text-violet-400" />
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/45">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Dashboard Preview ── */}
      <section className="relative z-10 w-full max-w-5xl px-6 pb-28">
        <ScrollReveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold tracking-widest text-violet-400 uppercase">Dashboard preview</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">See exactly where users drop off.</h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto">A live funnel of your entire onboarding flow. Every session scored. Every drop-off visible.</p>
        </ScrollReveal>
        <ScrollReveal variants={fadeUp}>
          <DashboardPreview />
        </ScrollReveal>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 w-full max-w-5xl px-6 pb-28">
        <ScrollReveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold tracking-widest text-violet-400 uppercase">Features</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything you need. Nothing you don&apos;t.</h2>
        </ScrollReveal>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.name}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-colors duration-300 hover:border-violet-500/30 hover:bg-violet-500/5 cursor-default"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 transition-colors group-hover:bg-violet-500/20">
                <f.icon className="h-5 w-5 text-violet-400" />
              </div>
              <h3 className="font-semibold text-white">{f.name}</h3>
              <p className="text-sm leading-relaxed text-white/45">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative z-10 w-full max-w-5xl px-6 pb-28">
        <ScrollReveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold tracking-widest text-violet-400 uppercase">Social proof</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Founders who stopped guessing.</h2>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal
              key={t.name}
              variants={i === 0 ? slideLeft : i === 2 ? slideRight : fadeUp}
              delay={i === 1 ? 0.1 : 0}
            >
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  {t.result}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-white/60">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/35">{t.company}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="relative z-10 w-full max-w-5xl px-6 pb-28">
        <ScrollReveal className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold tracking-widest text-violet-400 uppercase">Pricing</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Simple, transparent pricing.</h2>
          <p className="mt-4 text-white/40">14-day free trial on all plans. No credit card required.</p>
        </ScrollReveal>
        {/* Toggle */}
        <ScrollReveal className="mb-10 flex justify-center">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${!annual ? "bg-violet-600 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${annual ? "bg-violet-600 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              Annual
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">Save 20%</span>
            </button>
          </div>
        </ScrollReveal>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={staggerItem}>
              <PricingCard plan={plan} annual={annual} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 w-full max-w-2xl px-6 pb-28">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold tracking-widest text-violet-400 uppercase">FAQ</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Real questions. Straight answers.</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div>{faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </ScrollReveal>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative z-10 w-full max-w-5xl px-6 pb-28">
        <ScrollReveal variants={fadeUp}>
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-900/30 to-blue-900/20 px-8 py-16 text-center backdrop-blur-sm">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-600/10 via-transparent to-transparent" />
            <div className="relative mb-6 flex justify-center">
              <LogoMark size={48} />
            </div>
            <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
              Start saving your trial users today.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-white/45">
              14-day free trial. No credit card required.
            </p>
            <div className="relative mt-8 flex justify-center">
              <WaitlistForm />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 w-full border-t border-white/[0.08] px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-white/25">
          <div className="flex items-center gap-2">
            <LogoMark size={20} />
            <span>Onboard<span className="text-violet-400">IQ</span></span>
          </div>
          <span>© {new Date().getFullYear()} OnboardIQ. All rights reserved.</span>
        </div>
      </footer>
    </main>
  )
}
