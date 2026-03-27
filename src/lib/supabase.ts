import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Lead & Quote Functions ────────────────────────────────────

export async function submitQuoteRequest(data: {
  name: string;
  email: string;
  phone?: string;
  product_handle: string;
  product_title: string;
  message?: string;
}) {
  const { error } = await supabase.from("quote_requests").insert(data);
  if (error) throw error;
}

export async function submitContactMessage(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const { error } = await supabase.from("contact_messages").insert(data);
  if (error) throw error;
}

export async function submitLead(data: {
  name: string;
  email: string;
  phone?: string;
  source: string;
  product_handle?: string;
}) {
  const { error } = await supabase.from("leads").insert(data);
  if (error) throw error;
}
