// ============================================================
// SUPABASE CONFIG — connected to the "learners" project
// ============================================================
export const SUPABASE_URL = "https://bhalsawcqynftehemyck.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_YXSYji3lUNbFyBA2RwmL4Q_Qe5QcOAg";

// ============================================================
// Shared Supabase client — import this in any page that needs auth/db
//   import { supabase } from "./js/supabase-client.js";
// ============================================================
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Small helper other pages can reuse to check if someone is logged in
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
