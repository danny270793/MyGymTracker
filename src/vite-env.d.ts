/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHAOS_MONKEY_ENABLED: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_KEY: string
}
