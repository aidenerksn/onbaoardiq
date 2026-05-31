// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// ── Types ──────────────────────────────────────────────────────────────────

interface UserSession {
  id: string
  app_id: string
  session_id: string
  last_seen: string
  score: number
  page_count: number
}

interface TrackedApp {
  id: string
  customer_id: string
  name: string
  domain: string
}

interface Customer {
  id: string
  email: string
  plan: string
}

interface Trigger {
  id: string
  app_id: string
  name: string
  condition: Record<string, unknown>
  action: string
  email_template: string | null
  active: boolean
}

interface LastPage {
  page_url: string | null
}

// ── Helpers ────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diffMs  = Date.now() - new Date(dateStr).getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`
  const diffHrs = Math.floor(diffMin / 60)
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs !== 1 ? "s" : ""} ago`
  const diffDays = Math.floor(diffHrs / 24)
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
}

function buildEmail(
  template: string,
  vars: Record<string, string>
): string {
  return Object.entries(vars).reduce(
    (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
    template
  )
}

function defaultTemplate(vars: Record<string, string>): string {
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a;">
      <h2 style="margin:0 0 8px;">Hey there 👋</h2>
      <p style="margin:0 0 16px;color:#555;">
        We noticed you were exploring <strong>${vars.app_name}</strong> ${vars.time_since_last_seen}
        and got as far as <strong>${vars.last_page}</strong>.
      </p>
      <p style="margin:0 0 24px;color:#555;">
        We'd love to help you get the most out of it. Sometimes a quick nudge is all it takes.
      </p>
      <a href="${vars.cta_link}"
         style="display:inline-block;background:#7C3AED;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
        Continue where you left off →
      </a>
      <p style="margin:24px 0 0;font-size:13px;color:#999;">
        You're receiving this because you signed up for ${vars.app_name}.
        <br>
        <a href="${vars.unsubscribe_link}" style="color:#999;">Unsubscribe</a>
      </p>
    </div>
  `
}

// ── Main handler ───────────────────────────────────────────────────────────

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  const resendApiKey = Deno.env.get("RESEND_API_KEY")
  if (!resendApiKey) {
    console.error("[rescue-users] RESEND_API_KEY is not set")
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not set" }), { status: 500 })
  }

  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  let rescued = 0
  let failed  = 0

  console.log("[rescue-users] Starting rescue run")

  try {
    // 1. Query at-risk sessions
    const { data: sessions, error: sessionsError } = await supabase
      .from("user_sessions")
      .select("id, app_id, session_id, last_seen, score, page_count")
      .lt("score", 40)
      .gte("last_seen", since24h)
      .is("rescued_at", null)

    if (sessionsError) {
      console.error("[rescue-users] Failed to query sessions:", sessionsError)
      return new Response(JSON.stringify({ error: sessionsError.message }), { status: 500 })
    }

    console.log(`[rescue-users] Found ${sessions?.length ?? 0} at-risk sessions`)

    for (const session of sessions ?? []) {
      try {
        // 2. Look up the parent app
        const { data: app, error: appError } = await supabase
          .from("tracked_apps")
          .select("id, customer_id, name, domain")
          .eq("id", session.app_id)
          .single()

        if (appError || !app) {
          console.warn(`[rescue-users] App not found for session ${session.id}`)
          continue
        }

        // 2b. Look up the customer
        const { data: customer, error: customerError } = await supabase
          .from("customers")
          .select("id, email, plan")
          .eq("id", app.customer_id)
          .single()

        if (customerError || !customer) {
          console.warn(`[rescue-users] Customer not found for app ${app.id}`)
          continue
        }

        // 3. Find active trigger for this app with a score-based condition
        const { data: triggers, error: triggerError } = await supabase
          .from("triggers")
          .select("id, app_id, name, condition, action, email_template, active")
          .eq("app_id", session.app_id)
          .eq("active", true)

        if (triggerError) {
          console.warn(`[rescue-users] Trigger query failed for app ${app.id}:`, triggerError)
          continue
        }

        // Match trigger whose condition targets score < 40
        const trigger = (triggers ?? []).find((t: Trigger) => {
          const cond = t.condition as Record<string, unknown>
          return (
            cond.type === "score" &&
            (cond.operator === "lt" || cond.operator === "<") &&
            Number(cond.value) >= 40
          )
        })

        if (!trigger) {
          console.log(`[rescue-users] No matching trigger for app ${app.id}, skipping`)
          continue
        }

        // 4a. Get the last page this session visited
        const { data: lastPageRow } = await supabase
          .from("events")
          .select("page_url")
          .eq("session_id", session.session_id)
          .eq("event_type", "pageview")
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        const rawPage = (lastPageRow as LastPage | null)?.page_url ?? app.domain
        let lastPage = rawPage
        try {
          lastPage = new URL(rawPage).pathname || rawPage
        } catch {
          // keep raw value
        }

        // 4b. Build personalization vars
        const vars: Record<string, string> = {
          app_name:            app.name,
          last_page:           lastPage,
          time_since_last_seen: timeAgo(session.last_seen),
          cta_link:            `https://${app.domain}`,
          unsubscribe_link:    `https://${app.domain}/unsubscribe`,
          score:               String(session.score),
          session_id:          session.session_id,
        }

        // 4c. Build email HTML
        const htmlBody = trigger.email_template
          ? buildEmail(trigger.email_template, vars)
          : defaultTemplate(vars)

        // 4d. Send via Resend
        const resendRes = await fetch("https://api.resend.com/emails", {
          method:  "POST",
          headers: {
            "Content-Type":  "application/json",
            "Authorization": `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from:    `OnboardIQ <rescue@${app.domain}>`,
            to:      [customer.email],
            subject: `Hey — we saved your spot in ${app.name}`,
            html:    htmlBody,
          }),
        })

        if (!resendRes.ok) {
          const err = await resendRes.text()
          console.error(`[rescue-users] Resend failed for session ${session.id}:`, err)
          failed++
          continue
        }

        // 5. Mark session as rescued
        const { error: updateError } = await supabase
          .from("user_sessions")
          .update({ rescued_at: new Date().toISOString() })
          .eq("id", session.id)

        if (updateError) {
          console.error(`[rescue-users] Failed to set rescued_at for session ${session.id}:`, updateError)
          failed++
          continue
        }

        console.log(`[rescue-users] Rescued session ${session.id} (score: ${session.score})`)
        rescued++

      } catch (sessionErr) {
        console.error(`[rescue-users] Unexpected error for session ${session.id}:`, sessionErr)
        failed++
      }
    }

    const summary = { rescued, failed, total: (sessions?.length ?? 0) }
    console.log("[rescue-users] Run complete:", summary)
    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })

  } catch (err) {
    console.error("[rescue-users] Fatal error:", err)
    return new Response(JSON.stringify({ error: "Fatal error" }), { status: 500 })
  }
})
