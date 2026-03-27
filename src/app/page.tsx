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
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-end bg-charcoal text-white">
        {products[0]?.images?.edges?.[0]?.node && (
          <Image
            src={products[0].images.edges[0].node.url}
            alt="Grand Master Spas Showroom"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent z-10" />
        <div className="relative z-20 max-w-[1280px] mx-auto w-full px-4 md:px-6 pb-16 md:pb-24">
          <p className="text-xs uppercase tracking-widest opacity-70 mb-3 animate-fade-in">
            Premium Wellness Since 2010
          </p>
          <h1 className="font-light leading-[1.05] tracking-tight mb-4 animate-slide-up delay-100">
            Engineering{" "}
            <span className="text-gradient [-webkit-text-fill-color:initial] text-white">
              Perfect Relaxation
            </span>
          </h1>
          <p className="text-lg md:text-xl opacity-80 max-w-xl animate-slide-up delay-200">
            Discover luxury spas and swim spas engineered for performance,
            built for endurance, designed for your lifestyle.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-slide-up delay-300">
            <Link href="/quote" className="btn-premium !px-10 !py-4">
              Request a Quote
            </Link>
            <Link href="/search" className="btn-premium-outline !border-white/35 !text-white hover:!bg-white hover:!text-foreground !px-10 !py-4">
              Find Your Perfect Spa
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-sm animate-slide-up delay-300">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "2,400+", label: "Happy Customers" },
              { value: "10yr", label: "Warranty" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-light text-gradient [-webkit-text-fill-color:initial] text-white">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="border-b border-border bg-background">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "10-Year Warranty", icon: "🛡️" },
              { label: "Free Delivery", icon: "🚚" },
              { label: "Expert Installation", icon: "🔧" },
              { label: "4.9★ from 2,400+ Reviews", icon: "⭐" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-sm text-muted-fg font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SELECTOR CTA ═══ */}
      <section className="section-padding bg-muted">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-light mb-3">Not sure where to start?</h2>
          <p className="text-sm text-muted-fg mb-6 max-w-lg mx-auto">
            Answer a few questions and we&apos;ll recommend the perfect spa for your
            needs, space, and budget in under 2 minutes.
          </p>
          <Link href="/search" className="btn-premium !px-8 !py-3">
            Find Your Perfect Spa
          </Link>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="section-padding bg-background">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-bronze mb-2 font-medium">Featured</p>
              <h2 className="font-light">Our Most Popular Models</h2>
              <p className="text-sm text-muted-fg mt-2">Discover the spas our customers love most.</p>
            </div>
            <Link href="/collections" className="btn-premium-outline !text-sm !py-2 !px-5">
              View All Models
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/spas/${product.handle}`} className="group card-premium">
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

      {/* ═══ SPA VS SWIM SPA COMPARISON ═══ */}
      <section className="section-padding bg-muted">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-bronze mb-2 font-medium">Compare</p>
            <h2 className="font-light">Spa or Swim Spa?</h2>
            <p className="text-sm text-muted-fg mt-2">Both offer incredible benefits. Find out which is right for you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hot Tub Card */}
            <div className="card-premium">
              <div className="aspect-[16/9] relative overflow-hidden bg-charcoal">
                <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xl">Hot Tub Spas</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">Hot Tub Spas</h3>
                <p className="text-sm text-muted-fg mb-4">
                  Perfect for relaxation, therapy, and quality time. Compact designs fit any space.
                </p>
                <ul className="space-y-1.5 mb-6">
                  {["Ultimate relaxation & stress relief", "Therapeutic jet massage", "Fits most gardens & patios", "Lower running costs", "4-8 person capacity"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="text-bronze text-xs">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/spas" className="btn-premium-outline !text-sm !py-2.5 w-full !text-center">
                  Explore Spas
                </Link>
              </div>
            </div>

            {/* Swim Spa Card */}
            <div className="card-premium">
              <div className="aspect-[16/9] relative overflow-hidden bg-charcoal">
                <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xl">Swim Spas</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">Swim Spas</h3>
                <p className="text-sm text-muted-fg mb-4">
                  The best of both worlds: endless swimming, aquatic fitness, and full spa relaxation.
                </p>
                <ul className="space-y-1.5 mb-6">
                  {["Year-round swimming & fitness", "Adjustable swim currents", "Separate spa & swim zones", "Full hydrotherapy features", "No pool maintenance hassles"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="text-bronze text-xs">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/swim-spas" className="btn-premium-outline !text-sm !py-2.5 w-full !text-center">
                  Explore Swim Spas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COLLECTIONS ═══ */}
      {collections.length > 0 && (
        <section className="section-padding bg-background">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-bronze mb-2 font-medium">Collections</p>
              <h2 className="font-light">Find Your Perfect Match</h2>
              <p className="text-sm text-muted-fg mt-2">Four distinct collections designed for different lifestyles and spaces.</p>
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
                    <p className="text-white text-sm font-medium">{collection.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ REVIEWS ═══ */}
      <section className="section-padding bg-muted">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-bronze mb-2 font-medium">Reviews</p>
            <h2 className="font-light">Trusted by 2,400+ Customers</h2>
            <p className="text-sm text-muted-fg mt-2">Don&apos;t just take our word for it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "The Ecstatic exceeded all expectations. The installation team was professional, and the spa itself is absolutely stunning. Worth every euro.", name: "Anna van der Berg", city: "Amsterdam", date: "January 2026" },
              { quote: "After months of research, I chose Grand Master Spas for their expertise and warranty. Three years later, still the best decision we made for our home.", name: "Peter Jansen", city: "Rotterdam", date: "December 2025" },
              { quote: "The guided selector tool helped us find the perfect compact spa for our small garden. The team was patient with all our questions.", name: "Marie de Vries", city: "Utrecht", date: "January 2026" },
            ].map((review) => (
              <div key={review.name} className="card-premium p-6">
                <p className="text-sm text-muted-fg leading-relaxed mb-4 italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-medium">{review.name}</p>
                  <p className="text-xs text-muted-fg">{review.city} · {review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SHOWROOM CTA ═══ */}
      <section className="section-padding bg-charcoal text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-bronze-light mb-3 font-medium">Experience In Person</p>
              <h2 className="font-light text-white mb-4">Visit Our Showroom</h2>
              <p className="text-white/60 mb-6 text-sm leading-relaxed">
                See, touch, and test our spas before you decide. Our expert consultants
                will guide you through the options and answer all your questions.
              </p>
              <ul className="space-y-2 mb-8">
                {["Test multiple models in person", "One-on-one expert consultation", "Exclusive in-store offers", "Walk out with a personalized quote"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="text-bronze-light text-xs">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Link href="/contact" className="btn-premium !px-8 !py-3">Book Your Visit</Link>
                <Link href="/contact" className="btn-premium-outline !border-white/30 !text-white hover:!bg-white/10 !px-8 !py-3">View Locations</Link>
              </div>
            </div>
            <div className="aspect-[4/3] relative rounded-sm overflow-hidden bg-charcoal-light/10">
              {products[0]?.images?.edges?.[1]?.node && (
                <Image
                  src={products[0].images.edges[1].node.url}
                  alt="Showroom"
                  fill
                  className="object-cover opacity-80"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FREE DOWNLOADS ═══ */}
      <section className="section-padding bg-background">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-bronze mb-2 font-medium">Free Downloads</p>
            <h2 className="font-light">Start Your Research</h2>
            <p className="text-sm text-muted-fg mt-2">Download our most popular guides and tools.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📖", title: "Complete Buyer Guide", desc: "Everything you need to know before purchasing a spa." },
              { icon: "✅", title: "Installation Checklist", desc: "Prepare your space with our step-by-step checklist." },
              { icon: "📊", title: "Running Cost Calculator", desc: "Estimate your monthly electricity and maintenance costs." },
            ].map((dl) => (
              <div key={dl.title} className="card-premium p-6 text-center">
                <span className="text-3xl mb-3 block">{dl.icon}</span>
                <h4 className="font-medium mb-2">{dl.title}</h4>
                <p className="text-sm text-muted-fg mb-4">{dl.desc}</p>
                <button className="btn-premium-outline !text-xs !py-2 !px-4">Download Free</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="section-padding bg-muted">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="font-light mb-4">Ready to Transform Your Backyard?</h2>
          <p className="text-sm text-muted-fg mb-8 max-w-lg mx-auto leading-relaxed">
            Get a personalized quote in 24 hours. No pressure, no obligations.
          </p>
          <Link href="/quote" className="btn-premium !px-10 !py-4">
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
