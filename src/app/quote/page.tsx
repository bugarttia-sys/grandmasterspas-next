import { Metadata } from "next";
import QuoteForm from "@/components/ui/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Get a personalized quote for your dream spa. Our specialists will contact you within 24 hours.",
};

export default function QuotePage() {
  return (
    <>
      <section className="pt-32 pb-8 bg-surface">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
            Get Started
          </p>
          <h1 className="font-serif">Request a Quote</h1>
          <p className="mt-4 text-sm text-gms-mid-grey max-w-prose mx-auto">
            Tell us about your dream spa and our specialists will prepare a
            personalized quote within 24 hours.
          </p>
        </div>
      </section>

      <section className="pb-[var(--spacing-section)] bg-surface">
        <div className="max-w-xl mx-auto px-6">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
