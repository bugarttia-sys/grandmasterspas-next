import Link from "next/link";
import Image from "next/image";
import { getProducts, getCollections, formatPrice } from "@/lib/shopify";

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts(6),
    getCollections(8),
  ]);

  return (
    <>
      {/* Hero — full-bleed */}
      <section className="relative min-h-dvh flex items-end bg-gms-charcoal text-white">
        {products[0]?.images?.edges?.[0]?.node && (
          <Image
            src={products[0].images.edges[0].node.url}
            alt={products[0].images.edges[0].node.altText || "Grand Master Spas Hero"}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent z-10" />
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
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/collections"
              className="inline-block bg-gms-gold text-white px-8 py-3 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-gold-light hover:text-gms-charcoal"
            >
              Explore Collection
            </Link>
            <Link
              href="/quote"
              className="inline-block border border-white/30 text-white px-8 py-3 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-white/10"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-[var(--spacing-section)] bg-surface">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
              Featured
            </p>
            <h2 className="font-serif">Our Premium Spas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/spas/${product.handle}`}
                className="group"
              >
                <div className="aspect-[4/3] relative bg-gms-light-grey rounded-sm overflow-hidden mb-4">
                  {product.images?.edges?.[0]?.node ? (
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gms-mid-grey/50 font-serif text-xl">
                      {product.title}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[0.6rem] font-sans font-semibold uppercase tracking-[0.16em] text-gms-gold mb-1">
                    {product.productType || "Spa"}
                  </p>
                  <h3 className="font-serif text-xl font-normal mb-1 group-hover:text-gms-gold transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gms-mid-grey">
                    From{" "}
                    {formatPrice(product.priceRangeV2.minVariantPrice)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      {collections.length > 0 && (
        <section className="py-[var(--spacing-section)] bg-surface-elevated">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
                Collections
              </p>
              <h2 className="font-serif">Browse by Category</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="group relative aspect-[3/2] bg-gms-charcoal rounded-sm overflow-hidden"
                >
                  {collection.image && (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50"
                    />
                  )}
                  <div className="absolute inset-0 flex items-end p-4 z-10">
                    <p className="text-white text-sm font-sans font-semibold tracking-wide">
                      {collection.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* USP Section */}
      <section className="py-[var(--spacing-section)] bg-gms-charcoal text-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
              Craftsmanship
            </p>
            <h2 className="font-serif">Why Grand Master Spas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: "Therapeutic Hydrotherapy",
                body: "170+ precision jets with Aqua Rolling Massage and dedicated therapy zones for targeted relief.",
              },
              {
                title: "Premium Construction",
                body: "Triple-layer insulation, acrylic shells with vinyl-ester resin laminate, and synthetic maintenance-free cabinets.",
              },
              {
                title: "Energy Efficient",
                body: "Hybrid Heating with Heat Lock System and optional IntelliSaver heat pump — engineered for minimal running costs.",
              },
            ].map((usp) => (
              <div key={usp.title} className="text-center">
                <h3 className="font-serif text-xl font-normal mb-3 text-gms-gold-light">
                  {usp.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-[36ch] mx-auto">
                  {usp.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[var(--spacing-section)] bg-surface">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="font-serif mb-4">Ready to Experience Luxury?</h2>
          <p className="text-sm text-gms-mid-grey mb-8 max-w-prose mx-auto">
            Contact our spa specialists for a personalized consultation and
            receive a tailored quote for your dream spa.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-gms-gold text-white px-10 py-4 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-gold-light hover:text-gms-charcoal"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
