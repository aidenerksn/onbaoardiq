export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { scoreUser } from "@/lib/scoreUser"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { app_key, session_id, event, url, ts, ...rest } = body

    // Validate required fields
    if (!app_key || !session_id || !event) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    // 1. Look up the app by snippet_key
    const { data: app, error: appError } = await supabaseAdmin
      .from("tracked_apps")
      .select("id")
      .eq("snippet_key", app_key)
      .single()

    if (appError || !app) {
      return NextResponse.json({ error: "Invalid app_key." }, { status: 401 })
    }

    const app_id = app.id

    // 2. Insert the event
    await supabaseAdmin.from("events").insert({
      app_id,
      session_id,
      event_type: event,
      page_url: url ?? null,
      metadata: { ts, ...rest },
    })

    // 3. Upsert user_session (create if new, update last_seen)
    const now = new Date().toISOString()

    await supabaseAdmin
      .from("user_sessions")
      .upsert(
        {
          app_id,
          session_id,
          last_seen: now,
          ...(event === "pageview" ? { page_count: 1 } : {}),
        },
        { onConflict: "session_id", ignoreDuplicates: false }
      )

    // 4. Fetch all events for this session to compute score
    const { data: sessionEvents } = await supabaseAdmin
      .from("events")
      .select("event_type, page_url, metadata")
      .eq("session_id", session_id)

    if (sessionEvents) {
      const pageViews       = sessionEvents.filter(e => e.event_type === "pageview").length
      const rageClicks      = sessionEvents.filter(e => e.event_type === "rage_click").length
      const formAbandons    = sessionEvents.filter(e => e.event_type === "form_abandon").length
      const timeOnSiteSeconds = sessionEvents
        .filter(e => e.event_type === "time_on_page")
        .reduce((acc, e) => {
          const meta = e.metadata as Record<string, unknown> | null
          return acc + (typeof meta?.seconds === "number" ? meta.seconds : 0)
        }, 0)

      const hasReachedBilling   = sessionEvents.some(e => e.page_url?.includes("billing"))
      const hasInvitedTeammate  = sessionEvents.some(e => e.event_type === "invite_teammate")
      const hasCompletedSetup   = sessionEvents.some(e => e.event_type === "setup_complete")

      const { score } = scoreUser({
        pageViews,
        timeOnSiteSeconds,
        rageClicks,
        formAbandons,
        hasReachedBilling,
        hasInvitedTeammate,
        hasCompletedSetup,
      })

      // 5. Save score and page_count back to user_sessions
      await supabaseAdmin
        .from("user_sessions")
        .update({ score, page_count: pageViews, last_seen: now })
        .eq("session_id", session_id)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Track route error:", err)
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 })
  }
}
