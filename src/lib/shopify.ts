/**
 * Shopify Admin API client (server-side only)
 * Token: shpat_ (Admin API access token)
 * Used in: Next.js Server Components, Route Handlers, Server Actions
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

const endpoint = `https://${domain}/admin/api/2026-01/graphql.json`;

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json: ShopifyResponse<T> = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  return json.data;
}

// ─── Product Queries ───────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    productType
    vendor
    tags
    status
    priceRangeV2 {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 20) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price
          compareAtPrice
          selectedOptions { name value }
          image { url altText width height }
        }
      }
    }
    metafields(first: 50) {
      edges {
        node {
          namespace
          key
          value
          type
        }
      }
    }
  }
`;

export async function getProduct(handle: string) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: ShopifyProduct }>(query, {
    handle,
  });
  return data.productByHandle;
}

export async function getProducts(first = 20) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>(query, { first });
  return data.products.edges.map((e) => e.node);
}

export async function getCollections(first = 20) {
  const query = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image { url altText width height }
            products(first: 4) {
              edges {
                node {
                  id
                  title
                  handle
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
      }
    }
  `;

  const data = await shopifyFetch<{
    collections: { edges: Array<{ node: ShopifyCollection }> };
  }>(query, { first });
  return data.collections.edges.map((e) => e.node);
}

// ─── Types ─────────────────────────────────────────────────────

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  tags: string[];
  status: string;
  priceRangeV2: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  metafields: { edges: Array<{ node: ShopifyMetafield }> };
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: string;
  compareAtPrice: string | null;
  selectedOptions: Array<{ name: string; value: string }>;
  image: ShopifyImage | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMetafield {
  namespace: string;
  key: string;
  value: string;
  type: string;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: { edges: Array<{ node: ShopifyProduct }> };
}

// ─── Helpers ───────────────────────────────────────────────────

export function getMetafield(
  product: ShopifyProduct,
  namespace: string,
  key: string
): string | null {
  const field = product.metafields?.edges?.find(
    (e) => e.node?.namespace === namespace && e.node?.key === key
  );
  return field?.node?.value ?? null;
}

export function getMetafieldList(
  product: ShopifyProduct,
  namespace: string,
  key: string
): string[] {
  const value = getMetafield(product, namespace, key);
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return value.split(",").map((s) => s.trim());
  }
}

export function formatPrice(money: ShopifyMoney): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: money.currencyCode,
  }).format(parseFloat(money.amount));
}
