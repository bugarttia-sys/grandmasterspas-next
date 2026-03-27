import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getMetafield, getMetafieldList, formatPrice } from "@/lib/shopify";
import ProductTabs from "@/components/spa/ProductTabs";
import StickyCtaBar from "@/components/spa/StickyCtaBar";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts(20);
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  return { title: product.title, description: product.description?.slice(0, 160) };
}

export default async function SpaProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const isEcstatic = handle === "ecstatic";
  const heroTagline = getMetafield(product, "content", "hero_tagline");
  const subtitle = getMetafield(product, "descriptors", "subtitle");
  const summary = getMetafield(product, "content", "summary");
  const designStory = getMetafield(product, "content", "design_story");
  const technologyStory = getMetafield(product, "content", "technology_story");
  const tier = getMetafield(product, "product", "tier");
  const images = product.images.edges.map((e) => e.node);
  const heroImage = images[0];

  const seats = getMetafield(product, "specs", "seats") || getMetafield(product, "specs", "persons_capacity");
  const jets = getMetafield(product, "specs", "total_jets");
  const waterCapacity = getMetafield(product, "specs", "water_capacity_liters");
  const lengthCm = getMetafield(product, "specs", "length_cm");
  const widthCm = getMetafield(product, "specs", "width_cm");
  const heightCm = getMetafield(product, "specs", "height_cm");

  return (
    <div className={`min-h-screen pt-20 ${isEcstatic ? "bg-[radial-gradient(circle_at_top,hsl(220,10%,96%)_0%,white_52%)]" : ""}`}>

      {/* === FULL-WIDTH HERO (Ecstatic only) === */}
      {isEcstatic && heroImage && (
        <section className="relative overflow-hidden border-b border-border">
          <Image src={heroImage.url} alt={heroImage.altText || product.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,12,16,0.82)_8%,rgba(8,12,16,0.58)_42%,rgba(8,12,16,0.25)_75%,rgba(8,12,16,0.4)_100%)]" />
          <div className="relative max-w-[1280px] mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-24">
            <span className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-4 py-1 text-[11px] tracking-[0.24em] uppercase text-white mb-5">
              {tier || "Signature"} Flagship
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide uppercase text-white mb-3">
              {product.title}
            </h1>
            <p className="text-base md:text-lg text-white/85 mb-7 max-w-xl">
              {heroTagline || subtitle || product.description?.slice(0, 120)}
            </p>
            {/* Key Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-7 max-w-lg">
              {[
                { label: "Capacity", value: `${seats} persons` },
                { label: "Jets", value: jets },
                { label: "Water Volume", value: waterCapacity ? `${waterCapacity}L` : null },
              ].filter(s => s.value).map((s) => (
                <div key={s.label} className="rounded-sm border border-white/25 bg-black/25 px-3 py-2.5 text-white">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">{s.label}</div>
                  <div className="text-sm font-medium">{s.value}</div>
                </div>
              ))}
            </div>
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote" className="btn-premium !py-3 !px-8">Request a Quote</Link>
              <Link href="/contact" className="btn-premium-outline !border-white/45 !text-white hover:!bg-white hover:!text-foreground !py-3 !px-8">
                Book Showroom Visit
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* === BREADCRUMB === */}
      <div className={`border-b border-border ${isEcstatic ? "bg-background/95 backdrop-blur" : "bg-muted"}`}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-3 sm:py-4">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-fg">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/spas" className="hover:text-foreground transition-colors">Spas</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* === PRODUCT HERO (Gallery + Info) === */}
      <section className={`section-padding ${isEcstatic ? "!pt-10 md:!pt-14" : ""}`}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT: Gallery */}
            <div>
              <div className={`aspect-[4/3] relative overflow-hidden bg-muted shadow-lg mb-3 sm:mb-4 ${isEcstatic ? "rounded-md border border-border/80 shadow-2xl" : "rounded-sm"}`}>
                {heroImage && (
                  <Image src={heroImage.url} alt={heroImage.altText || product.title} fill className="object-cover" priority />
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {images.slice(0, 4).map((img, i) => (
                    <div key={i} className={`aspect-square relative overflow-hidden bg-muted ${i === 0 ? "ring-2 ring-bronze" : "opacity-60 hover:opacity-100"} ${isEcstatic ? "border border-border/70 rounded-md" : "rounded-sm"} transition-all`}>
                      <Image src={img.url} alt={img.altText || `${product.title} ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Info */}
            <div className={isEcstatic ? "bg-background border border-border rounded-md p-5 sm:p-7 shadow-sm" : ""}>
              <span className="inline-block text-xs uppercase tracking-widest text-bronze mb-2 sm:mb-3">
                {tier || product.productType} Collection
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-2 font-light">{product.title}</h1>
              <p className="text-base sm:text-lg text-muted-fg mb-5 sm:mb-6">
                {subtitle || heroTagline}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border">
                {[
                  { icon: "👥", label: "Seats", value: seats ? `${seats} persons` : null },
                  { icon: "💨", label: "Jets", value: jets },
                  { icon: "📐", label: "Dimensions", value: lengthCm && widthCm ? `${lengthCm}×${widthCm}×${heightCm} cm` : null },
                  { icon: "💧", label: "Water Capacity", value: waterCapacity ? `${waterCapacity} liters` : null },
                ].filter(s => s.value).map((s) => (
                  <div key={s.label} className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">{s.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm text-muted-fg">{s.label}</div>
                      <div className="font-medium text-sm sm:text-base truncate">{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-2xl font-light mb-1">
                  {formatPrice(product.priceRangeV2.minVariantPrice)}
                </p>
                <p className="text-xs text-muted-fg">Starting price incl. VAT</p>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <Link href="/quote" className="btn-premium w-full !text-center !py-3">
                  Request a Quote
                </Link>
                <div className="rounded-sm border border-bronze/20 bg-bronze/[0.06] px-3 py-2.5 text-xs text-muted-fg">
                  Includes free site-check advice, transparent lead times, and tailored installation recommendations.
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/contact" className="btn-premium-outline !text-center !py-2.5 !text-sm">Book Visit</Link>
                  <a href="https://wa.me/491732063792" className="btn-premium-outline !text-center !py-2.5 !text-sm">WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICE PILLARS === */}
      <section className="!pt-0 md:!pt-0 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🛡️", title: "Certified Warranty Support", body: "Up to 10 years structure, 5 years surface, 2 years equipment." },
              { icon: "🚚", title: "White-Glove Delivery", body: "Professional delivery and placement included." },
              { icon: "⏱️", title: "Fast Expert Response", body: "Our team responds within 24 hours to all inquiries." },
            ].map((p) => (
              <div key={p.title} className="rounded-sm border border-border bg-background px-4 py-4 shadow-sm">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-sm bg-bronze/10 text-lg">
                  {p.icon}
                </div>
                <h3 className="mb-1 text-base font-medium">{p.title}</h3>
                <p className="text-sm text-muted-fg">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === TABS SECTION === */}
      <section className={`section-padding ${isEcstatic ? "!pt-12 md:!pt-16" : "bg-muted"}`}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <ProductTabs product={product} isEcstatic={isEcstatic} />
        </div>
      </section>

      {/* === DESIGN STORY BANNER === */}
      {designStory && images[1] && (
        <section className="relative min-h-[70vh] flex items-center">
          <Image src={images[1].url} alt="Design" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="relative max-w-[1280px] mx-auto w-full px-4 md:px-6">
            <div className="max-w-lg text-white">
              <p className="text-xs uppercase tracking-widest text-bronze-light mb-3">Design</p>
              <h2 className="font-light text-white mb-4">Crafted for Comfort</h2>
              <p className="text-base leading-relaxed text-white/80">{designStory}</p>
            </div>
          </div>
        </section>
      )}

      {/* === LEAD FORM CTA === */}
      <section className="section-padding">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div id="quote-form" className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start scroll-mt-24">
            <div>
              <span className="inline-block text-xs uppercase tracking-widest text-bronze mb-2 sm:mb-3">
                Get Started
              </span>
              <h2 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4">
                Interested in the {product.title}?
              </h2>
              <p className="text-muted-fg mb-6 text-sm sm:text-base">
                Request a personalized quote and our spa specialists will contact you within 24 hours with pricing, delivery options, and installation details.
              </p>
              <div className="space-y-3">
                {["Free site-check advice included", "Transparent pricing with no hidden costs", "Tailored installation recommendations"].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm">
                    <span className="text-bronze">✓</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-background border border-border rounded-sm p-6 shadow-sm">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First name" className="form-input" />
                  <input type="email" placeholder="Email address" className="form-input" />
                </div>
                <input type="tel" placeholder="Phone number (optional)" className="form-input" />
                <textarea placeholder="Any questions or requirements?" rows={3} className="form-input resize-none" />
                <button type="submit" className="btn-premium w-full !py-3">
                  Request a Quote
                </button>
                <p className="text-xs text-muted-fg text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* === STICKY CTA BAR === */}
      <StickyCtaBar productName={product.title} tagline={subtitle || heroTagline || ""} />

      {/* Bottom spacing for sticky bar */}
      <div className="h-24 lg:h-20" />
    </div>
  );
}
