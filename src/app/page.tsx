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
      {/* Hero */}
      <section className="relative min-h-screen flex items-end bg-charcoal text-white">
        {products[0]?.images?.edges?.[0]?.node && (
          <Image
            src={products[0].images.edges[0].node.url}
            alt={products[0].images.edges[0].node.altText || "Grand Master Spas"}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10" />
        <div className="relative z-20 max-w-[1280px] mx-auto w-full px-4 md:px-6 pb-16 md:pb-24">
          <p className="text-xs uppercase tracking-widest opacity-75 mb-3 animate-fade-in">
            Premium Hot Tubs &amp; Swim Spas
          </p>
          <h1 className="font-light leading-[1.05] tracking-tight mb-4 animate-slide-up delay-100">
            Grand Master <span className="text-gradient [-webkit-text-fill-color:initial] text-white">Spas</span>
          </h1>
          <p className="text-xl opacity-80 max-w-[36ch] animate-slide-up delay-200">
            Discover therapeutic luxury — crafted for those who demand the
            extraordinary.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
            <Link href="/collections" className="btn-premium !px-10 !py-4">
              Explore Collection
            </Link>
            <Link href="/quote" className="btn-premium-outline !border-white/30 !text-white hover:!bg-white/10">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-border bg-background">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "10-Year Warranty", icon: "🛡️" },
              { label: "Free Delivery", icon: "🚚" },
              { label: "Expert Installation", icon: "🔧" },
              { label: "4.9★ from 2,400+ Reviews", icon: "⭐" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-muted-fg font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-background">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-bronze mb-3 font-medium">
              Featured
            </p>
            <h2 className="font-light">Our Premium Spas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/spas/${product.handle}`}
                className="group card-premium"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {product.images?.edges?.[0]?.node ? (
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-fg text-lg">
                      {product.title}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-bronze font-medium mb-1">
                    {product.productType || "Spa"}
                  </p>
                  <h3 className="text-lg font-medium mb-1 group-hover:text-bronze transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-fg">
                    From {formatPrice(product.priceRangeV2.minVariantPrice)}
                  </p>
                  <p className="mt-3 text-sm font-medium text-bronze opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      {collections.length > 0 && (
        <section className="section-padding bg-muted">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-bronze mb-3 font-medium">
                Collections
              </p>
              <h2 className="font-light">Browse by Category</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="group relative aspect-[3/2] bg-charcoal rounded-sm overflow-hidden"
                >
                  {collection.image && (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover opacity-60 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-40"
                    />
                  )}
                  <div className="absolute inset-0 flex items-end p-4 z-10">
                    <p className="text-white text-sm font-medium tracking-wide">
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
      <section className="section-padding bg-charcoal text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-bronze-light mb-3 font-medium">
              Craftsmanship
            </p>
            <h2 className="font-light text-white">Why Grand Master Spas</h2>
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
                body: "Hybrid Heating with Heat Lock System and optional IntelliSaver heat pump — minimal running costs.",
              },
            ].map((usp) => (
              <div key={usp.title} className="text-center">
                <h3 className="text-xl font-medium mb-3 text-bronze-light">
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
      <section className="section-padding bg-background">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="font-light mb-4">Ready to Experience Luxury?</h2>
          <p className="text-sm text-muted-fg mb-8 max-w-prose mx-auto leading-relaxed">
            Contact our spa specialists for a personalized consultation and
            receive a tailored quote for your dream spa.
          </p>
          <Link href="/quote" className="btn-premium !px-10 !py-4">
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
