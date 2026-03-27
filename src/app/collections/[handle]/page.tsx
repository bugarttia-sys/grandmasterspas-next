import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { shopifyFetch, formatPrice } from "@/lib/shopify";
import type { ShopifyCollection, ShopifyProduct, ShopifyMoney, ShopifyImage } from "@/lib/shopify";

interface Props {
  params: Promise<{ handle: string }>;
}

async function getCollectionByHandle(handle: string) {
  const query = `
    query GetCollection($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        image { url altText width height }
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              productType
              priceRangeV2 {
                minVariantPrice { amount currencyCode }
              }
              images(first: 1) {
                edges {
                  node { url altText width height }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    collectionByHandle: ShopifyCollection & {
      descriptionHtml: string;
      products: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            handle: string;
            productType: string;
            priceRangeV2: { minVariantPrice: ShopifyMoney };
            images: { edges: Array<{ node: ShopifyImage }> };
          };
        }>;
      };
    };
  }>(query, { handle });
  return data.collectionByHandle;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description?.slice(0, 160),
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) notFound();

  const products = collection.products.edges.map((e) => e.node);

  return (
    <>
      {/* Collection Hero */}
      <section className="relative pt-32 pb-16 bg-gms-charcoal text-white">
        {collection.image && (
          <Image
            src={collection.image.url}
            alt={collection.image.altText || collection.title}
            fill
            className="object-cover opacity-40"
          />
        )}
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
            Collection
          </p>
          <h1 className="font-serif">{collection.title}</h1>
          {collection.description && (
            <p className="mt-4 text-sm text-white/60 max-w-prose mx-auto">
              {collection.description}
            </p>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-[var(--spacing-section)] bg-surface">
        <div className="max-w-screen-xl mx-auto px-6">
          {products.length === 0 ? (
            <p className="text-center text-gms-mid-grey">
              No products in this collection yet.
            </p>
          ) : (
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
          )}
        </div>
      </section>
    </>
  );
}
