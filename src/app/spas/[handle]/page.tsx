import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, getMetafield, formatPrice } from "@/lib/shopify";
import KeySpecs from "@/components/spa/KeySpecs";
import FeaturePills from "@/components/spa/FeaturePills";
import SpecsTable from "@/components/spa/SpecsTable";
import FaqAccordion from "@/components/spa/FaqAccordion";
import Highlights from "@/components/spa/Highlights";

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
  return {
    title: product.title,
    description: product.description?.slice(0, 160),
  };
}

export default async function SpaProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const heroTagline = getMetafield(product, "content", "hero_tagline");
  const subtitle = getMetafield(product, "descriptors", "subtitle");
  const summary = getMetafield(product, "content", "summary");
  const designStory = getMetafield(product, "content", "design_story");
  const technologyStory = getMetafield(product, "content", "technology_story");
  const tier = getMetafield(product, "product", "tier");
  const heroImage = product.images?.edges?.[0]?.node;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative min-h-[80vh] flex items-end bg-gms-charcoal text-white">
        {heroImage && (
          <Image
            src={heroImage.url}
            alt={heroImage.altText || product.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent z-10" />
        <div className="relative z-20 max-w-screen-xl mx-auto w-full px-6 pb-[clamp(2.5rem,6vw,5rem)]">
          {tier && (
            <span className={`spa-tier-badge spa-tier--${tier.toLowerCase()} mb-4 inline-block`}>
              {tier}
            </span>
          )}
          <p className="text-[0.7rem] uppercase tracking-[0.2em] opacity-75 mb-2 font-sans">
            {heroTagline || product.productType}
          </p>
          <h1 className="font-serif font-light leading-[1.05] tracking-tight mb-2">
            {product.title}
          </h1>
          {subtitle && (
            <p className="text-[clamp(0.85rem,1.1vw,1rem)] opacity-70 font-sans">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* At-a-Glance Specs */}
      <section className="py-12 bg-surface">
        <div className="max-w-screen-xl mx-auto px-6">
          <KeySpecs product={product} />
        </div>
      </section>

      {/* Summary + Price */}
      <section className="py-[var(--spacing-section)] bg-surface-elevated">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
              Overview
            </p>
            <h2 className="font-serif mb-4">{product.title}</h2>
            {summary && (
              <p className="text-sm text-gms-mid-grey leading-relaxed">
                {summary}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
            <p className="text-3xl font-serif font-light mb-2">
              {formatPrice(product.priceRangeV2.minVariantPrice)}
            </p>
            <p className="text-xs text-gms-mid-grey mb-6">Starting price incl. VAT</p>
            <Link
              href="/quote"
              className="inline-block bg-gms-gold text-white px-10 py-4 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-gold-light hover:text-gms-charcoal"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-[var(--spacing-section)] bg-surface">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
              Highlights
            </p>
            <h2 className="font-serif">What Makes It Special</h2>
          </div>
          <Highlights product={product} />
        </div>
      </section>

      {/* Design Story */}
      {designStory && (
        <section className="relative min-h-[70vh] flex items-center bg-gms-charcoal text-white">
          {product.images?.edges?.[1]?.node && (
            <Image
              src={product.images.edges[1].node.url}
              alt="Design story"
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
          <div className="relative z-20 max-w-screen-xl mx-auto w-full px-6">
            <div className="max-w-lg">
              <p className="spa-subtitle text-gms-gold !text-[0.65rem] !uppercase !tracking-[0.18em] !font-normal !not-italic mb-3">
                Design
              </p>
              <h2 className="font-serif font-light mb-4">Crafted for Comfort</h2>
              <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed opacity-80">
                {designStory}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Feature Pills */}
      <section className="py-[var(--spacing-section)] bg-surface">
        <div className="max-w-screen-xl mx-auto px-6 space-y-12">
          <FeaturePills product={product} namespace="features" fieldKey="therapies" title="Therapies" gold />
          <FeaturePills product={product} namespace="features" fieldKey="proprietary" title="Proprietary Technology" gold />
          <FeaturePills product={product} namespace="features" fieldKey="comfort" title="Comfort Features" />
          <FeaturePills product={product} namespace="features" fieldKey="lighting" title="Lighting & Ambiance" />
          <FeaturePills product={product} namespace="features" fieldKey="energy" title="Energy Efficiency" />
          <FeaturePills product={product} namespace="features" fieldKey="entertainment" title="Entertainment" />
          <FeaturePills product={product} namespace="features" fieldKey="connectivity" title="Connectivity" />
          <FeaturePills product={product} namespace="features" fieldKey="sanitation" title="Water Care" />
        </div>
      </section>

      {/* Technology Story */}
      {technologyStory && (
        <section className="relative min-h-[70vh] flex items-center bg-gms-charcoal text-white">
          {product.images?.edges?.[2]?.node && (
            <Image
              src={product.images.edges[2].node.url}
              alt="Technology story"
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
          <div className="relative z-20 max-w-screen-xl mx-auto w-full px-6">
            <div className="max-w-lg">
              <p className="spa-subtitle text-gms-gold !text-[0.65rem] !uppercase !tracking-[0.18em] !font-normal !not-italic mb-3">
                Technology
              </p>
              <h2 className="font-serif font-light mb-4">Engineered for Performance</h2>
              <p className="text-[clamp(0.85rem,1.1vw,1rem)] leading-relaxed opacity-80">
                {technologyStory}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Product Gallery */}
      {product.images.edges.length > 1 && (
        <section className="py-[var(--spacing-section)] bg-surface-elevated">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="text-center mb-8">
              <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
                Gallery
              </p>
              <h2 className="font-serif">See Every Detail</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {product.images.edges.map(({ node: img }, i) => (
                <div
                  key={i}
                  className={`relative aspect-[4/3] rounded-sm overflow-hidden ${
                    i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : ""
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.altText || `${product.title} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specifications Table */}
      <section className="py-[var(--spacing-section)] bg-surface">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
              Technical Details
            </p>
            <h2 className="font-serif">Full Specifications</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <SpecsTable product={product} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[var(--spacing-section)] bg-surface-elevated">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
              Questions
            </p>
            <h2 className="font-serif">Frequently Asked</h2>
          </div>
          <FaqAccordion product={product} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[var(--spacing-section)] bg-gms-charcoal text-white text-center">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="font-serif mb-4">Interested in the {product.title}?</h2>
          <p className="text-sm text-white/60 mb-8 max-w-prose mx-auto">
            Get a personalized quote and learn more about delivery, installation,
            and financing options.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-gms-gold text-white px-10 py-4 text-sm font-medium tracking-wide rounded-sm transition-all hover:bg-gms-gold-light hover:text-gms-charcoal"
          >
            Request a Quote for {product.title}
          </Link>
        </div>
      </section>
    </>
  );
}
