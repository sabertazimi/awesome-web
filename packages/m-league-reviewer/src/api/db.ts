import { createClient } from '@supabase/supabase-js'

const dbUrl = import.meta.env.VITE_DB_URL as string
const dbKey = import.meta.env.VITE_DB_KEY as string
export const supabase = createClient(dbUrl, dbKey)
