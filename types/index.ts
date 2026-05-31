export type { Database } from "./database"

export interface WaitlistEntry {
  id: string
  email: string
  created_at: string
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
}
