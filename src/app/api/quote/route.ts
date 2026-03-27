import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, product_handle, product_title, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const { error } = await supabase.from("quote_requests").insert({
      name,
      email,
      phone: phone || null,
      product_handle: product_handle || null,
      product_title: product_title || null,
      message: message || null,
      source: "website",
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to submit quote request" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
