export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-dvh flex items-end bg-gms-charcoal text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent z-10" />
        <div className="relative z-20 max-w-screen-xl mx-auto w-full px-6 pb-[clamp(2.5rem,6vw,5rem)]">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] opacity-75 mb-2 font-sans">
            Premium Hot Tubs &amp; Swim Spas
          </p>
          <h1 className="font-serif font-light leading-[1.05] tracking-tight mb-3">
            Grand Master Spas
          </h1>
          <p className="text-[clamp(0.9rem,1.2vw,1.1rem)] opacity-80 max-w-[32ch] font-sans">
            Discover therapeutic luxury — crafted for those who demand the
            extraordinary.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="/spas"
              className="inline-block bg-gms-gold text-white px-8 py-3 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-gold-light hover:text-gms-charcoal"
            >
              Explore Collection
            </a>
            <a
              href="/contact"
              className="inline-block border border-white/30 text-white px-8 py-3 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-white/10"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Collections placeholder — Fase 3 */}
      <section className="py-[var(--spacing-section)] bg-surface">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
            Collections
          </p>
          <h2 className="font-serif mb-6">Our Spa Collections</h2>
          <p className="text-tertiary max-w-prose mx-auto">
            Collections grid wordt hier geladen via Shopify Storefront API.
          </p>
        </div>
      </section>

      {/* USP placeholder — Fase 3 */}
      <section className="py-[var(--spacing-section)] bg-surface-elevated">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
            Craftsmanship
          </p>
          <h2 className="font-serif mb-6">Why Grand Master Spas</h2>
          <p className="text-tertiary max-w-prose mx-auto">
            USP&apos;s, testimonials en video worden hier toegevoegd.
          </p>
        </div>
      </section>
    </main>
  );
}
