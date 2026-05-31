export interface SessionInput {
  pageViews: number
  timeOnSiteSeconds: number
  rageClicks: number
  formAbandons: number
  hasReachedBilling: boolean
  hasInvitedTeammate: boolean
  hasCompletedSetup: boolean
}

export interface ScoreResult {
  score: number
  label: "At Risk" | "Wavering" | "Healthy"
}

export function scoreUser(session: SessionInput): ScoreResult {
  let score = 100

  // Deductions
  if (session.rageClicks > 3) score -= 20
  if (session.timeOnSiteSeconds < 60) score -= 15
  if (session.formAbandons > 0) score -= 25

  // Extra rage click penalty: -10 per click over 3, max -30
  if (session.rageClicks > 3) {
    const extra = Math.min((session.rageClicks - 3) * 10, 30)
    score -= extra
  }

  // Bonuses
  if (session.hasReachedBilling) score += 20
  if (session.hasInvitedTeammate) score += 30
  if (session.hasCompletedSetup) score += 15

  // Clamp 0–100
  score = Math.max(0, Math.min(100, score))

  // Label
  const label: ScoreResult["label"] =
    score < 40 ? "At Risk" : score <= 70 ? "Wavering" : "Healthy"

  return { score, label }
}
