import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Spa care tips, hydrotherapy insights, and the latest from Grand Master Spas.",
};

export default function BlogPage() {
  return (
    <>
      <section className="pt-32 pb-8 bg-surface">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
            Insights
          </p>
          <h1 className="font-serif">Blog</h1>
          <p className="mt-4 text-sm text-gms-mid-grey max-w-prose mx-auto">
            Spa care tips, hydrotherapy insights, and the latest news from Grand
            Master Spas.
          </p>
        </div>
      </section>

      <section className="pb-[var(--spacing-section)] bg-surface">
        <div className="max-w-2xl mx-auto px-6 text-center py-16">
          <p className="text-gms-mid-grey mb-6">
            Blog articles are coming soon. In the meantime, explore our spa
            collection or get in touch.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/collections"
              className="inline-block bg-gms-gold text-white px-8 py-3 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-gold-light hover:text-gms-charcoal"
            >
              Explore Spas
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-gms-charcoal/20 px-8 py-3 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-charcoal hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
