import { z } from "zod";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

async function shopifyAdmin(endpoint: string) {
  const res = await fetch(
    `https://${domain}/admin/api/2026-01/${endpoint}`,
    { headers: { "X-Shopify-Access-Token": token } }
  );
  return res.json();
}

// ─── Tool definitions (schema + execute separated for AI SDK v6) ───

export const searchProductsDef = {
  description:
    "Search for products in the Shopify store by title, type, or keyword.",
  parameters: z.object({
    query: z.string().describe("Search query"),
    limit: z.number().optional().default(5),
  }),
};

export async function searchProductsExec({ query, limit }: { query: string; limit: number }) {
  const all = await shopifyAdmin(`products.json?limit=20`);
  const filtered = (all.products || []).filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (p: any) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.product_type?.toLowerCase().includes(query.toLowerCase()) ||
      p.tags?.toLowerCase().includes(query.toLowerCase())
  );
  return {
    found: filtered.length,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: filtered.slice(0, limit).map((p: any) => ({
      title: p.title,
      handle: p.handle,
      type: p.product_type,
      price: p.variants?.[0]?.price ? `€${p.variants[0].price}` : null,
      url: `/spas/${p.handle}`,
    })),
  };
}

export const getProductDetailsDef = {
  description:
    "Get detailed info about a product including specs, features, pricing, and metafields.",
  parameters: z.object({
    handle: z.string().describe("Product handle (e.g. 'ecstatic')"),
  }),
};

export async function getProductDetailsExec({ handle }: { handle: string }) {
  const all = await shopifyAdmin(`products.json?handle=${handle}`);
  const product = all.products?.[0];
  if (!product) return { error: `Product '${handle}' not found` };

  const mf = await shopifyAdmin(`products/${product.id}/metafields.json`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const specs: Record<string, string> = {};
  const features: Record<string, string[]> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const m of (mf.metafields || []) as any[]) {
    if (m.namespace === "specs" || m.namespace === "warranty" || m.namespace === "construction") {
      specs[`${m.namespace}.${m.key}`] = String(m.value);
    } else if (m.namespace === "features") {
      try { features[m.key] = JSON.parse(m.value); } catch { features[m.key] = [m.value]; }
    }
  }

  return {
    title: product.title,
    handle: product.handle,
    type: product.product_type,
    price: product.variants?.[0]?.price ? `€${product.variants[0].price}` : null,
    description: product.body_html?.replace(/<[^>]*>/g, "").slice(0, 400),
    specs,
    features,
    url: `/spas/${product.handle}`,
  };
}

export const getCollectionsDef = {
  description: "Get all product collections/categories in the store.",
  parameters: z.object({}),
};

export async function getCollectionsExec() {
  const [custom, smart] = await Promise.all([
    shopifyAdmin("custom_collections.json"),
    shopifyAdmin("smart_collections.json"),
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return [...(custom.custom_collections || []), ...(smart.smart_collections || [])].map((c: any) => ({
    title: c.title,
    handle: c.handle,
    url: `/collections/${c.handle}`,
  }));
}

export const getStoreInfoDef = {
  description: "Get store contact details, location, and business hours.",
  parameters: z.object({}),
};

export async function getStoreInfoExec() {
  const data = await shopifyAdmin("shop.json");
  const shop = data.shop;
  return {
    name: shop.name,
    email: shop.customer_email,
    phone: shop.phone,
    address: `${shop.address1}, ${shop.zip} ${shop.city}, ${shop.country_name}`,
    currency: shop.currency,
  };
}
