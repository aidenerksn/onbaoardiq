"use client"

import { useEffect, useState } from "react"
import { FunnelChart, Funnel, Tooltip, ResponsiveContainer, LabelList } from "recharts"
import { supabase } from "@/lib/supabase"
import { AlertCircle } from "lucide-react"

type DateRange = 7 | 30 | 90

interface FunnelStep {
  page: string
  count: number
  dropPct: number | null
  fill: string
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-gray-200 ${className ?? ""}`} />
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-64" />
      </div>
      <Skeleton className="h-[480px] w-full" />
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-300 bg-white py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7C3AED]/10">
        <AlertCircle className="h-7 w-7 text-[#7C3AED]" />
      </div>
      <div>
        <p className="text-base font-semibold text-gray-800">No data yet</p>
        <p className="mt-1 text-sm text-gray-500">
          Install your tracking snippet and events will appear here.
        </p>
      </div>
    </div>
  )
}

// ── Custom tooltip ────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: FunnelStep }[] }) {
  if (!active || !payload?.length) return null
  const step = payload[0].payload
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg text-sm">
      <p className="font-semibold text-gray-800 mb-1 truncate max-w-[200px]">{step.page}</p>
      <p className="text-gray-600">Sessions: <span className="font-medium text-gray-900">{step.count.toLocaleString()}</span></p>
      {step.dropPct !== null && (
        <p className={step.dropPct > 30 ? "text-red-500 font-medium" : "text-gray-600"}>
          Drop-off: {step.dropPct.toFixed(1)}%
        </p>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [range, setRange] = useState<DateRange>(30)
  const [steps, setSteps] = useState<FunnelStep[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFunnel() {
      setLoading(true)
      setError(null)

      const since = new Date()
      since.setDate(since.getDate() - range)

      const { data, error: dbError } = await supabase
        .from("events")
        .select("page_url, session_id")
        .gte("created_at", since.toISOString())
        .not("page_url", "is", null)

      if (dbError) {
        setError("Failed to load funnel data.")
        setLoading(false)
        return
      }

      // Count unique session_ids per page_url
      const map = new Map<string, Set<string>>()
      for (const row of data ?? []) {
        if (!row.page_url) continue
        if (!map.has(row.page_url)) map.set(row.page_url, new Set())
        map.get(row.page_url)!.add(row.session_id)
      }

      // Sort by count desc
      const sorted = Array.from(map.entries())
        .map(([page, sessions]) => ({ page, count: sessions.size }))
        .sort((a, b) => b.count - a.count)

      // Build steps with drop %
      const built: FunnelStep[] = sorted.map((item, i) => {
        const prev = i === 0 ? null : sorted[i - 1].count
        const dropPct = prev === null ? null : ((prev - item.count) / prev) * 100
        return {
          page: new URL(item.page).pathname || item.page,
          count: item.count,
          dropPct,
          fill: dropPct !== null && dropPct > 30 ? "#ef4444" : "#7C3AED",
        }
      })

      setSteps(built)
      setLoading(false)
    }

    fetchFunnel()
  }, [range])

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Funnel Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">Session drop-off by page</p>
        </div>

        {/* Date selector */}
        <div className="flex rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          {([7, 30, 90] as DateRange[]).map((d) => (
            <button
              key={d}
              onClick={() => setRange(d)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                range === d
                  ? "bg-[#7C3AED] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
        {loading ? (
          <DashboardSkeleton />
        ) : error ? (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4" /> {error}
          </div>
        ) : steps.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Funnel chart */}
            <ResponsiveContainer width="100%" height={400}>
              <FunnelChart>
                <Tooltip content={<CustomTooltip />} />
                <Funnel
                  dataKey="count"
                  data={steps}
                  isAnimationActive
                >
                  <LabelList
                    position="insideTop"
                    content={({ value, index }) => {
                      const step = steps[index as number]
                      if (!step) return null
                      return (
                        <text
                          fill="white"
                          fontSize={13}
                          fontWeight={600}
                          textAnchor="middle"
                        >
                          {step.page} — {Number(value).toLocaleString()}
                          {step.dropPct !== null
                            ? `  ↓ ${step.dropPct.toFixed(1)}%`
                            : ""}
                        </text>
                      )
                    }}
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>

            {/* Step table */}
            <div className="mt-6 divide-y divide-gray-100">
              {steps.map((step, i) => (
                <div key={step.page} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7C3AED]/10 text-xs font-bold text-[#7C3AED]">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-800 truncate max-w-xs">
                      {step.page}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-gray-500">
                      {step.count.toLocaleString()} sessions
                    </span>
                    {step.dropPct !== null && (
                      <span
                        className={`font-semibold ${
                          step.dropPct > 30 ? "text-red-500" : "text-gray-400"
                        }`}
                      >
                        ↓ {step.dropPct.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
