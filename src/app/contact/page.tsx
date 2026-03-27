import { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Grand Master Spas. We're here to help you find your perfect spa.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-8 bg-surface">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
            Get in Touch
          </p>
          <h1 className="font-serif">Contact Us</h1>
          <p className="mt-4 text-sm text-gms-mid-grey max-w-prose mx-auto">
            Questions about our spas, delivery, or installation? We&apos;re here
            to help.
          </p>
        </div>
      </section>

      <section className="pb-[var(--spacing-section)] bg-surface">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="pt-8 space-y-8">
              <div>
                <p className="text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-gold mb-2">
                  Email
                </p>
                <a href="mailto:info@grandmasterspas.com" className="text-sm hover:text-gms-gold transition-colors">
                  info@grandmasterspas.com
                </a>
              </div>
              <div>
                <p className="text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-gold mb-2">
                  Phone
                </p>
                <a href="tel:+491732063792" className="text-sm hover:text-gms-gold transition-colors">
                  +49 173 206 3792
                </a>
              </div>
              <div>
                <p className="text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-gold mb-2">
                  Location
                </p>
                <p className="text-sm text-gms-mid-grey">
                  Tvardishki Prohod 23<br />
                  1404 Sofia, Bulgaria
                </p>
              </div>
              <div>
                <p className="text-xs font-sans font-semibold uppercase tracking-[0.1em] text-gms-gold mb-2">
                  Business Hours
                </p>
                <p className="text-sm text-gms-mid-grey">
                  Monday — Friday: 9:00 — 18:00 CET<br />
                  Saturday: 10:00 — 14:00 CET
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
