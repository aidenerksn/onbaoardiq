export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          email: string
          stripe_customer_id: string | null
          plan: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          stripe_customer_id?: string | null
          plan?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          stripe_customer_id?: string | null
          plan?: string
          created_at?: string
        }
      }
      tracked_apps: {
        Row: {
          id: string
          customer_id: string
          name: string
          domain: string
          snippet_key: string
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          name: string
          domain: string
          snippet_key?: string
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          name?: string
          domain?: string
          snippet_key?: string
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          app_id: string
          session_id: string
          event_type: string
          page_url: string | null
          element: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          app_id: string
          session_id: string
          event_type: string
          page_url?: string | null
          element?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          app_id?: string
          session_id?: string
          event_type?: string
          page_url?: string | null
          element?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
      user_sessions: {
        Row: {
          id: string
          app_id: string
          session_id: string
          first_seen: string
          last_seen: string
          page_count: number
          score: number
          rescued_at: string | null
        }
        Insert: {
          id?: string
          app_id: string
          session_id: string
          first_seen?: string
          last_seen?: string
          page_count?: number
          score?: number
          rescued_at?: string | null
        }
        Update: {
          id?: string
          app_id?: string
          session_id?: string
          first_seen?: string
          last_seen?: string
          page_count?: number
          score?: number
          rescued_at?: string | null
        }
      }
      triggers: {
        Row: {
          id: string
          app_id: string
          name: string
          condition: Json
          action: string
          email_template: string | null
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          app_id: string
          name: string
          condition: Json
          action: string
          email_template?: string | null
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          app_id?: string
          name?: string
          condition?: Json
          action?: string
          email_template?: string | null
          active?: boolean
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
