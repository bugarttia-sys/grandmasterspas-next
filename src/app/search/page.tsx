import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProducts, formatPrice } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Grand Master Spas products.",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const allProducts = await getProducts(50);

  const results = q
    ? allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.description?.toLowerCase().includes(q.toLowerCase()) ||
          p.productType?.toLowerCase().includes(q.toLowerCase()) ||
          p.tags?.some((t) => t.toLowerCase().includes(q.toLowerCase()))
      )
    : [];

  return (
    <>
      <section className="pt-32 pb-8 bg-surface">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
            Search
          </p>
          <h1 className="font-serif mb-8">Find Your Perfect Spa</h1>

          <form action="/search" method="GET" className="max-w-lg mx-auto">
            <input
              type="text"
              name="q"
              defaultValue={q || ""}
              placeholder="Search products..."
              className="w-full bg-transparent border-b-2 border-[var(--gms-border)] py-3 text-center text-lg outline-none transition-colors focus:border-gms-gold font-serif"
              autoFocus
            />
          </form>
        </div>
      </section>

      <section className="pb-[var(--spacing-section)] bg-surface">
        <div className="max-w-screen-xl mx-auto px-6">
          {q && (
            <p className="text-sm text-gms-mid-grey mb-8 text-center">
              {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{q}&quot;
            </p>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((product) => (
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
                  <p className="text-[0.6rem] font-sans font-semibold uppercase tracking-[0.16em] text-gms-gold mb-1">
                    {product.productType || "Spa"}
                  </p>
                  <h3 className="font-serif text-xl font-normal mb-1 group-hover:text-gms-gold transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gms-mid-grey">
                    From {formatPrice(product.priceRangeV2.minVariantPrice)}
                  </p>
                </Link>
              ))}
            </div>
          ) : q ? (
            <div className="text-center py-12">
              <p className="text-gms-mid-grey mb-4">
                No products found. Try a different search term.
              </p>
              <Link
                href="/collections"
                className="text-sm text-gms-gold hover:underline"
              >
                Browse all collections
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
