import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mjziwqcpyvaynyzvolva.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_4OKWuelOldcppqTpB8DCmQ_PGs-kCiE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
