"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
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
          Sent
        </p>
        <h2 className="font-serif text-2xl mb-3">Message Received</h2>
        <p className="text-sm text-gms-mid-grey">
          We&apos;ll get back to you as soon as possible.
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
        <label htmlFor="subject" className="block text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-mid-grey mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full bg-transparent border-b-2 border-[var(--gms-border)] py-3 text-sm outline-none transition-colors focus:border-gms-gold"
          placeholder="What is this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-mid-grey mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-transparent border-b-2 border-[var(--gms-border)] py-3 text-sm outline-none transition-colors focus:border-gms-gold resize-none"
          placeholder="Your message..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly at info@grandmasterspas.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-white py-4 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
