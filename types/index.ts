export type { Database, Json } from "./database"

export interface WaitlistEntry {
  id: string
  email: string
  created_at: string
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
}

export interface Customer {
  id: string
  email: string
  stripe_customer_id: string | null
  plan: string
  created_at: string
}

export interface TrackedApp {
  id: string
  customer_id: string
  name: string
  domain: string
  snippet_key: string
  created_at: string
}

export interface Event {
  id: string
  app_id: string
  session_id: string
  event_type: string
  page_url: string | null
  element: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface UserSession {
  id: string
  app_id: string
  session_id: string
  first_seen: string
  last_seen: string
  page_count: number
  score: number
  rescued_at: string | null
}

export interface Trigger {
  id: string
  app_id: string
  name: string
  condition: Record<string, unknown>
  action: string
  email_template: string | null
  active: boolean
  created_at: string
}
