"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowser } from "@/lib/supabaseBrowser"
import {
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Code2,
  Zap,
  LayoutDashboard,
} from "lucide-react"

function generateSnippetKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let key = "oiq_"
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return key
}

type Step = "setup" | "install" | "done"

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowser()

  const [step, setStep] = useState<Step>("setup")
  const [appName, setAppName] = useState("")
  const [domain, setDomain] = useState("")
  const [snippetKey, setSnippetKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setUserEmail(data.user.email)
    })
  }, [supabase])

  async function handleSetup(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      const key = generateSnippetKey()

      const { error: insertError } = await supabase
        .from("tracked_apps")
        .insert({
          customer_id: user.id,
          name: appName.trim(),
          domain: domain.trim().replace(/^https?:\/\//, ""),
          snippet_key: key,
        })

      if (insertError) {
        setError("Failed to create app. Please try again.")
        setLoading(false)
        return
      }

      setSnippetKey(key)
      setStep("install")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const snippet = `<!-- OnboardIQ Tracking Snippet -->
<script>
(function(w,d,k){
  var sid=sessionStorage.getItem('_oiq')||(function(){
    var id=Math.random().toString(36).substr(2,12);
    sessionStorage.setItem('_oiq',id);return id;
  })();
  function send(t,p){
    fetch('${process.env.NEXT_PUBLIC_APP_URL || "https://onbaoardiq-five.vercel.app"}/api/track',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(Object.assign({app_key:k,session_id:sid,event_type:t,page_url:location.href},p||{}))
    });
  }
  send('pageview');
  var rc={};
  d.addEventListener('click',function(e){
    var el=e.target,key=el.tagName+'|'+Math.round(e.clientX/50)+'|'+Math.round(e.clientY/50);
    rc[key]=(rc[key]||0)+1;
    if(rc[key]===3)send('rage_click',{element:el.tagName,selector:el.id||el.className});
  });
  d.addEventListener('submit',function(e){
    if(e.target instanceof HTMLFormElement&&!e.target.dataset.oiqIgnore){
      setTimeout(function(){send('form_abandon',{form:e.target.id||e.target.action});},500);
    }
  });
})(window,document,'${snippetKey || "YOUR_SNIPPET_KEY"}');
</script>`

  function copySnippet() {
    navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── Step: Setup ─────────────────────────────────────────────────────────────
  if (step === "setup") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#060d1a] px-4 py-16">
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-60 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-700/15 blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10">
              <Zap className="h-7 w-7 text-violet-400" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Welcome{userEmail ? `, ${userEmail.split("@")[0]}` : ""}!
            </h1>
            <p className="mt-2 text-sm text-white/45">
              Let&apos;s set up your first app. It takes 2 minutes.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8 flex items-center gap-2">
            {[
              { label: "Setup", active: true },
              { label: "Install snippet", active: false },
              { label: "Done", active: false },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center gap-2">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${s.active ? "bg-violet-600 text-white" : "bg-white/10 text-white/30"}`}>
                  {i + 1}
                </div>
                <span className={`text-xs ${s.active ? "text-white/70" : "text-white/25"}`}>{s.label}</span>
                {i < 2 && <div className="h-px flex-1 bg-white/10" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSetup} className="space-y-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70">
                  What&apos;s your app called?
                </label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  required
                  placeholder="e.g. Acme CRM"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70">
                  What&apos;s your app&apos;s domain?
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                  placeholder="e.g. app.acmecrm.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                />
                <p className="mt-1.5 text-xs text-white/25">Where your users log in and use your product</p>
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
                <><Loader2 className="h-4 w-4 animate-spin" /> Creating your app…</>
              ) : (
                <>Continue <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>
        </div>
      </main>
    )
  }

  // ── Step: Install ────────────────────────────────────────────────────────────
  if (step === "install") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#060d1a] px-4 py-16">
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -top-60 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-700/15 blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10">
              <Code2 className="h-7 w-7 text-violet-400" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Install your snippet</h1>
            <p className="mt-2 text-sm text-white/45">
              Paste this into the <code className="rounded bg-white/10 px-1 py-0.5 text-xs text-violet-300">&lt;head&gt;</code> of your app. Takes 60 seconds.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8 flex items-center gap-2">
            {[
              { label: "Setup", done: true },
              { label: "Install snippet", active: true },
              { label: "Done", active: false },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center gap-2">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${"done" in s && s.done ? "bg-emerald-600 text-white" : "active" in s && s.active ? "bg-violet-600 text-white" : "bg-white/10 text-white/30"}`}>
                  {"done" in s && s.done ? <Check className="h-3 w-3" /> : i + 1}
                </div>
                <span className={`text-xs ${"done" in s && s.done ? "text-emerald-400" : "active" in s && s.active ? "text-white/70" : "text-white/25"}`}>{s.label}</span>
                {i < 2 && <div className="h-px flex-1 bg-white/10" />}
              </div>
            ))}
          </div>

          {/* Your snippet key */}
          <div className="mb-4 rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">Your snippet key</p>
            <code className="text-sm font-mono text-white/70 break-all">{snippetKey}</code>
          </div>

          {/* Code block */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a1120]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-xs text-white/25">index.html / _document.tsx</span>
              <button
                onClick={copySnippet}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50 transition-all hover:bg-white/10 hover:text-white"
              >
                {copied ? <><Check className="h-3 w-3 text-emerald-400" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
              </button>
            </div>
            <pre className="overflow-x-auto p-5 text-xs leading-relaxed text-white/60">
              <code>{snippet}</code>
            </pre>
          </div>

          {/* Instructions */}
          <div className="mt-6 space-y-3">
            {[
              { step: "1", text: "Copy the snippet above" },
              { step: "2", text: "Paste it inside the <head> tag of your app — every page where users log in" },
              { step: "3", text: "Deploy your app — OnboardIQ starts tracking immediately" },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3 text-sm text-white/50">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-600/30 text-xs font-bold text-violet-400">
                  {s.step}
                </span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setStep("done")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-violet-500"
            >
              I&apos;ve installed it — continue <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/50 transition-all hover:bg-white/10 hover:text-white"
            >
              Do it later
            </button>
          </div>
        </div>
      </main>
    )
  }

  // ── Step: Done ───────────────────────────────────────────────────────────────
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#060d1a] px-4 py-16">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-60 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-700/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-white">You&apos;re all set.</h1>
        <p className="mt-3 text-white/45">
          <strong className="text-white">{appName}</strong> is now being tracked. Sessions will appear in your dashboard as users interact with your app.
        </p>

        <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-left space-y-3">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">What happens next</p>
          {[
            "Sessions start appearing within minutes of your first visitor",
            "Users with a score below 40 are flagged as At Risk",
            "Rescue emails fire automatically on the next hourly run",
            "You can customize triggers and email templates from your dashboard",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 text-sm text-white/55">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              {item}
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-violet-500"
        >
          <LayoutDashboard className="h-4 w-4" />
          Go to my dashboard
        </button>
      </div>
    </main>
  )
}
