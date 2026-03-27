import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse our complete range of premium hot tubs and swim spas.",
};

export default async function CollectionsPage() {
  const collections = await getCollections(20);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-surface">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
            Browse
          </p>
          <h1 className="font-serif">Our Collections</h1>
          <p className="mt-4 text-sm text-gms-mid-grey max-w-prose mx-auto">
            From intimate 2-person spas to family-sized swim spas — find the
            perfect fit for your lifestyle.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="pb-[var(--spacing-section)] bg-surface">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group relative aspect-[16/9] bg-gms-charcoal rounded-sm overflow-hidden"
              >
                {collection.image && (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40"
                  />
                )}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8 z-10">
                  <h2 className="text-white font-serif text-2xl font-light mb-2">
                    {collection.title}
                  </h2>
                  {collection.description && (
                    <p className="text-white/60 text-sm max-w-[40ch]">
                      {collection.description.slice(0, 120)}
                      {collection.description.length > 120 ? "..." : ""}
                    </p>
                  )}
                  <span className="mt-4 text-[0.7rem] font-sans font-semibold uppercase tracking-[0.12em] text-gms-gold">
                    View Collection
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
