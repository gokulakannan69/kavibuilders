import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mjziwqcpyvaynyzvolva.supabase.co';
const supabaseAnonKey = 'sb_publishable_4OKWuelOldcppqTpB8DCmQ_PGs-kCiE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
