import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-32 pb-[var(--spacing-section)] bg-surface min-h-[60vh] flex items-center">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
          404
        </p>
        <h1 className="font-serif mb-4">Page Not Found</h1>
        <p className="text-sm text-gms-mid-grey mb-8 max-w-prose mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-block bg-gms-gold text-white px-8 py-3 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-gold-light hover:text-gms-charcoal"
          >
            Back to Home
          </Link>
          <Link
            href="/collections"
            className="inline-block border border-gms-charcoal/20 px-8 py-3 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-charcoal hover:text-white"
          >
            Browse Spas
          </Link>
        </div>
      </div>
    </section>
  );
}
