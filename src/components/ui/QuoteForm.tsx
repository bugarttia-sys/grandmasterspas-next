"use client";

import { useState } from "react";

export default function QuoteForm({ productHandle, productTitle }: { productHandle?: string; productTitle?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      product_handle: productHandle || "",
      product_title: productTitle || (form.elements.namedItem("product") as HTMLInputElement)?.value || "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
          Thank You
        </p>
        <h2 className="font-serif text-2xl mb-3">Quote Request Received</h2>
        <p className="text-sm text-gms-mid-grey">
          Our team will contact you within 24 hours with a personalized quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-8">
      <div>
        <label htmlFor="name" className="block text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-mid-grey mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-transparent border-b-2 border-[var(--gms-border)] py-3 text-sm outline-none transition-colors focus:border-gms-gold"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-mid-grey mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full bg-transparent border-b-2 border-[var(--gms-border)] py-3 text-sm outline-none transition-colors focus:border-gms-gold"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-mid-grey mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full bg-transparent border-b-2 border-[var(--gms-border)] py-3 text-sm outline-none transition-colors focus:border-gms-gold"
          placeholder="+31 6 1234 5678"
        />
      </div>

      {!productHandle && (
        <div>
          <label htmlFor="product" className="block text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-mid-grey mb-2">
            Interested In
          </label>
          <input
            type="text"
            id="product"
            name="product"
            className="w-full bg-transparent border-b-2 border-[var(--gms-border)] py-3 text-sm outline-none transition-colors focus:border-gms-gold"
            placeholder="e.g. Ecstatic, Swim Spa, or general inquiry"
          />
        </div>
      )}

      {productTitle && (
        <div className="bg-gms-light-grey rounded-sm px-4 py-3">
          <p className="text-xs text-gms-mid-grey">Requesting quote for:</p>
          <p className="text-sm font-semibold">{productTitle}</p>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-mid-grey mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full bg-transparent border-b-2 border-[var(--gms-border)] py-3 text-sm outline-none transition-colors focus:border-gms-gold resize-none"
          placeholder="Tell us about your requirements, preferred features, or any questions..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gms-gold text-white py-4 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-gold-light hover:text-gms-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Submit Quote Request"}
      </button>
    </form>
  );
}
