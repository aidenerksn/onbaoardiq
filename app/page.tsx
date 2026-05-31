import { WaitlistForm } from "@/components/WaitlistForm"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Zap } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Drop-off Detection",
    description:
      "Automatically pinpoints the exact moment trial users lose interest.",
  },
  {
    icon: Zap,
    title: "Instant Intervention",
    description:
      "Triggers personalised nudges and in-app guidance before users churn.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Analytics",
    description:
      "Track which interventions convert trials to paid at a glance.",
  },
]

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
          Coming Soon
        </Badge>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-16 text-center">
        <div
          className="animate-fade-in opacity-0"
          style={{ animationDelay: "0ms" }}
        >
          <Badge
            variant="outline"
            className="mb-6 border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-blue-400 uppercase"
          >
            Private Beta
          </Badge>
        </div>

        <h1
          className="animate-fade-in max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-white opacity-0 sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "100ms" }}
        >
          OnboardIQ{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            — Coming Soon
          </span>
        </h1>

        <p
          className="animate-fade-in mt-6 max-w-xl text-lg leading-relaxed text-white/60 opacity-0 sm:text-xl"
          style={{ animationDelay: "200ms" }}
        >
          AI that finds where your trial users quit and saves them
          automatically.
        </p>

        <div
          className="animate-fade-in mt-10 flex w-full justify-center opacity-0"
          style={{ animationDelay: "350ms" }}
        >
          <WaitlistForm />
        </div>

        {/* Social proof */}
        <p
          className="animate-fade-in mt-8 text-sm text-white/30 opacity-0"
          style={{ animationDelay: "500ms" }}
        >
          Join 200+ founders already on the waitlist
        </p>
      </section>

      {/* Feature cards */}
      <section className="relative z-10 w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="animate-fade-in rounded-2xl border border-white/10 bg-white/5 p-6 opacity-0 backdrop-blur-sm transition-colors hover:border-blue-500/30 hover:bg-white/[0.07]"
              style={{ animationDelay: `${600 + i * 100}ms` }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15">
                <feature.icon className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-white/50">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 px-6 py-6 text-center text-xs text-white/30">
        © {new Date().getFullYear()} OnboardIQ. All rights reserved.
      </footer>
    </main>
  )
}
