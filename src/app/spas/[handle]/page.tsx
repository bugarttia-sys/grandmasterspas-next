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
        <section className="relative min-h-[55vh] md:min-h-[60vh] overflow-hidden border-b border-border">
          {/* Lifestyle hero image — static for Ecstatic, Shopify for others */}
          <Image
            src={isEcstatic ? "/hero-ecstatic-lifestyle.jpg" : (heroImage?.url || "")}
            alt={heroImage?.altText || product.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,12,16,0.82)_8%,rgba(8,12,16,0.58)_42%,rgba(8,12,16,0.25)_75%,rgba(8,12,16,0.4)_100%)]" />
          <div className="relative max-w-[1280px] mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-28">
            <span className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-4 py-1 text-[11px] tracking-[0.24em] uppercase text-white mb-5">
              {tier || "Exclusive"} Flagship
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide uppercase text-white mb-3">
              {product.title}
            </h1>
            <p className="text-sm md:text-base text-white/70 mb-7 max-w-xl">
              {subtitle || `${seats}-Person Outdoor Spa · ${jets} Jets · Levitation Bed`}
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
      <section className={`section-padding ${isEcstatic ? "!pt-8 md:!pt-12" : ""}`}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 lg:gap-12 items-start">
            {/* LEFT: Gallery */}
            <div>
              <div className={`aspect-[4/3] relative overflow-hidden bg-muted shadow-lg mb-4 sm:mb-5 ${isEcstatic ? "rounded-lg border border-border/80 shadow-xl" : "rounded-sm"}`}>
                {heroImage && (
                  <Image src={heroImage.url} alt={heroImage.altText || product.title} fill className="object-cover" priority />
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((img, i) => (
                    <div key={i} className={`aspect-square relative overflow-hidden bg-muted cursor-pointer ${i === 0 ? "ring-2 ring-bronze" : "opacity-70 hover:opacity-100"} ${isEcstatic ? "border border-border/70 rounded-lg" : "rounded-sm"} transition-all`}>
                      <Image src={img.url} alt={img.altText || `${product.title} ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Info */}
            <div className={isEcstatic ? "bg-background border border-border/60 rounded-lg p-6 sm:p-8 shadow-sm space-y-6" : ""}>
              <div>
                <span className="inline-block text-xs uppercase tracking-widest text-bronze mb-3">
                  {tier || product.productType} Collection
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-3 font-light leading-tight">{product.title}</h1>
                <p className="text-base sm:text-lg text-muted-fg">
                  {subtitle || `${seats}-Person Outdoor Spa | ${jets} Jets | Levitation Bed`}
                </p>
              </div>

              {/* Quick Specs Grid */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest text-muted-fg font-medium">Specifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Capacity", value: seats ? `${seats} persons` : null },
                    { label: "Jets", value: jets },
                    { label: "Dimensions", value: lengthCm && widthCm ? `${lengthCm}×${widthCm}×${heightCm} cm` : null },
                    { label: "Water Volume", value: waterCapacity ? `${waterCapacity}L` : null },
                  ].filter(s => s.value).map((s) => (
                    <div key={s.label} className="p-3 border border-border/50 rounded-md bg-muted/30">
                      <div className="text-xs uppercase tracking-widest text-muted-fg mb-1">{s.label}</div>
                      <div className="font-medium text-sm">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-border/50 pt-6">
                <p className="text-xs uppercase tracking-widest text-muted-fg mb-2">Starting Price</p>
                <p className="text-3xl font-light mb-1">
                  {formatPrice(product.priceRangeV2.minVariantPrice)}
                </p>
                <p className="text-xs text-muted-fg">Incl. VAT</p>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <Link href="/quote" className="btn-premium w-full !text-center !py-4 !text-base">
                  Request a Quote
                </Link>
                <Link href="/contact" className="btn-premium-outline w-full !text-center !py-3 !text-sm">
                  Book Showroom Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICE PILLARS === */}
      <section className="!pt-0 md:!pt-0 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🛡️", title: "Certified Warranty Support", body: "Up to 10 years structure, 5 years surface, 2 years equipment." },
              { icon: "🚚", title: "White-Glove Delivery", body: "Professional delivery and placement included." },
              { icon: "⏱️", title: "Fast Expert Response", body: "Our team responds within 24 hours to all inquiries." },
            ].map((p) => (
              <div key={p.title} className="rounded-lg border border-border/60 bg-background px-6 py-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bronze/10 text-2xl">
                  {p.icon}
                </div>
                <h3 className="mb-2 text-lg font-medium">{p.title}</h3>
                <p className="text-sm text-muted-fg leading-relaxed">{p.body}</p>
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
        <section className="relative min-h-[65vh] flex items-center overflow-hidden">
          <Image src={images[1].url} alt="Design" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="relative max-w-[1280px] mx-auto w-full px-4 md:px-6">
            <div className="max-w-2xl text-white py-12">
              <p className="text-xs uppercase tracking-[0.2em] text-bronze mb-4 font-medium">Design</p>
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">Crafted for Comfort</h2>
              <p className="text-lg leading-relaxed text-white/85 max-w-xl">{designStory}</p>
            </div>
          </div>
        </section>
      )}

      {/* === LEAD FORM CTA === */}
      <section className="section-padding bg-muted/40">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div id="quote-form" className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start scroll-mt-24">
            <div>
              <span className="inline-block text-xs uppercase tracking-widest text-bronze mb-3 font-medium">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl font-light mb-4">
                Interested in the {product.title}?
              </h2>
              <p className="text-muted-fg mb-8 text-base leading-relaxed">
                Request a personalized quote and our spa specialists will contact you within 24 hours with pricing, delivery options, and installation details.
              </p>
              <div className="space-y-4">
                {["Free site-check advice included", "Transparent pricing with no hidden costs", "Tailored installation recommendations"].map((b) => (
                  <div key={b} className="flex items-center gap-3 text-sm">
                    <span className="text-bronze text-lg">✓</span>
                    <span className="text-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-background border border-border rounded-lg p-7 sm:p-8 shadow-sm">
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First name" className="form-input" />
                  <input type="text" placeholder="Last name" className="form-input" />
                </div>
                <input type="email" placeholder="Email address" className="form-input" />
                <input type="tel" placeholder="Phone number" className="form-input" />
                <textarea placeholder="Any questions or requirements?" rows={4} className="form-input resize-none" />
                <button type="submit" className="btn-premium w-full !py-4 !text-base">
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
