import Link from "next/link";
import Image from "next/image";
import { getProducts, getMetafield, formatPrice } from "@/lib/shopify";

export const metadata = {
  title: "Hot Tub Spas",
  description:
    "From intimate two-person models to spacious family retreats, find the perfect spa engineered for your lifestyle.",
};

export default async function SpasPage() {
  const products = await getProducts(20);
  const spas = products.filter(
    (p) => !p.tags?.some((t) => t.toLowerCase().includes("swim"))
  );

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-muted border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-16">
          <span className="text-xs uppercase tracking-widest text-bronze mb-2 block">Our Collection</span>
          <h1 className="text-4xl md:text-5xl font-light mb-4">Hot Tub Spas</h1>
          <p className="text-muted-fg max-w-2xl">
            From intimate two-person models to spacious family retreats, find the perfect spa engineered for your lifestyle.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-fg">Showing {spas.length} spa{spas.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spas.map((product) => {
              const heroImage = product.images.edges[0]?.node;
              const tier = getMetafield(product, "product", "tier");
              const seats = getMetafield(product, "specs", "seats") || getMetafield(product, "specs", "persons_capacity");
              const jets = getMetafield(product, "specs", "total_jets");
              return (
                <Link key={product.handle} href={`/spas/${product.handle}`} className="card-premium group">
                  <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                    {heroImage && (
                      <Image src={heroImage.url} alt={heroImage.altText || product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                    {tier && (
                      <span className="absolute top-3 left-3 bg-bronze/90 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm">{tier}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-light mb-1">{product.title}</h3>
                    <p className="text-sm text-muted-fg mb-4">
                      {seats && `${seats}-Person Outdoor Spa`}{jets && ` | ${jets} Jets`}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-fg mb-4">
                      {jets && <span>{jets} Jets</span>}
                      {seats && <span>{seats} Persons</span>}
                      {tier && <span>{tier.toLowerCase()} collection</span>}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-muted-fg">{product.vendor}</span>
                      <span className="text-sm font-medium text-bronze uppercase tracking-wider">View Details</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {spas.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-fg mb-4">No spas available yet.</p>
              <Link href="/contact" className="btn-premium">Contact Us</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
