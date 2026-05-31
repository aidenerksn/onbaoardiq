import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import type { ApiResponse } from "@/types"

// ── Email template ────────────────────────────────────────────────────────────

function waitlistConfirmationEmail(): string {
  const features = [
    ["One script tag", "Paste it into your app — no engineering sprint needed."],
    ["Behavioral scoring", "Every trial session scored 0–100 in real time."],
    ["Automated rescue emails", "At-risk users get a personalized email before they disappear."],
    ["Drop-off funnel", "See exactly where users stop — and fix it with data."],
  ]

  const featureRows = features.map(([title, desc]) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:12px;vertical-align:top;padding-top:2px;">
            <div style="width:18px;height:18px;background:#7c3aed;border-radius:50%;text-align:center;line-height:18px;">
              <span style="color:white;font-size:10px;font-weight:700;">✓</span>
            </div>
          </td>
          <td>
            <p style="margin:0;font-size:14px;font-weight:600;color:rgba(255,255,255,0.85);">${title}</p>
            <p style="margin:2px 0 0;font-size:13px;color:rgba(255,255,255,0.4);">${desc}</p>
          </td>
        </tr></table>
      </td>
    </tr>`).join("")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the OnboardIQ waitlist</title>
</head>
<body style="margin:0;padding:0;background:#060d1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#060d1a;padding:48px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0a1120;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;max-width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e0a3c,#0a1120);padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.2em;color:#a78bfa;text-transform:uppercase;">OnboardIQ</p>
            <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">You&rsquo;re on the list.</h1>
            <p style="margin:10px 0 0;font-size:15px;color:rgba(255,255,255,0.45);line-height:1.5;">We&rsquo;ll be in touch with your early access soon.</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;font-size:15px;color:rgba(255,255,255,0.6);line-height:1.7;">
              Hey &mdash; thanks for signing up. You&rsquo;re among the first founders to request early access to OnboardIQ.
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:rgba(255,255,255,0.6);line-height:1.7;">Here&rsquo;s what&rsquo;s coming your way:</p>

            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
              ${featureRows}
            </table>

            <!-- What happens next -->
            <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
              <tr>
                <td style="background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:20px 24px;">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#a78bfa;letter-spacing:0.15em;text-transform:uppercase;">What happens next</p>
                  <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.55);line-height:1.6;">
                    We&rsquo;re onboarding founders in small batches to make sure every customer gets a great setup experience. You&rsquo;ll receive your personal invite link by email — usually within a few days. Early access includes a 14-day free trial on any plan.
                  </p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 24px;font-size:15px;color:rgba(255,255,255,0.6);line-height:1.7;">
              In the meantime, reply to this email if you have any questions &mdash; I read every reply personally.
            </p>
            <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.6);">
              Talk soon,<br />
              <span style="font-weight:700;color:rgba(255,255,255,0.85);">The OnboardIQ Team</span>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.2);">
              You&rsquo;re receiving this because you signed up at
              <a href="https://onboardiq.com" style="color:rgba(167,139,250,0.6);text-decoration:none;"> onboardiq.com</a>.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email: unknown = body?.email

    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json<ApiResponse>(
        { error: "A valid email address is required." },
        { status: 400 }
      )
    }

    const normalised = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalised)) {
      return NextResponse.json<ApiResponse>(
        { error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    // Insert into waitlist
    const { error } = await supabase
      .from("waitlist")
      .insert({ email: normalised })

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json<ApiResponse>(
          { error: "This email is already on the waitlist." },
          { status: 409 }
        )
      }
      console.error("[waitlist] Supabase insert error:", error)
      return NextResponse.json<ApiResponse>(
        { error: "Failed to join the waitlist. Please try again." },
        { status: 500 }
      )
    }

    // Fire confirmation email — non-blocking so a Resend hiccup never fails the signup
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "OnboardIQ <hello@onboardiq.com>",
          to: [normalised],
          subject: "You're on the OnboardIQ waitlist 🎉",
          html: waitlistConfirmationEmail(),
        }),
      }).catch((err) => {
        console.error("[waitlist] Resend send failed:", err)
      })
    } else {
      console.warn("[waitlist] RESEND_API_KEY not set — skipping confirmation email")
    }

    return NextResponse.json<ApiResponse>({ data: { email: normalised } })
  } catch (err) {
    console.error("[waitlist] Unexpected error:", err)
    return NextResponse.json<ApiResponse>(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
