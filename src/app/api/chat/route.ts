import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { z } from "zod";
import {
  searchProductsExec,
  getProductDetailsExec,
  getCollectionsExec,
  getStoreInfoExec,
} from "@/lib/tools/shopify-tools";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are the Grand Master Spas AI assistant — a knowledgeable, friendly, and professional customer support agent for a premium hot tub and swim spa retailer.

## Your personality
- Professional yet warm and approachable
- Expert on spas, hydrotherapy, and wellness
- Responds in the same language as the customer (Dutch or English)

## What you can do
- Search products and recommend spas based on customer needs
- Provide detailed specs, features, and pricing for any product
- Share information about collections and categories
- Answer questions about warranty, installation, delivery, and maintenance
- Provide store contact information

## Guidelines
- Always use tools to get real-time data — never guess prices or availability
- When recommending products, mention key specs (seats, jets, dimensions)
- Include links to product pages: [Product Name](/spas/handle)
- For complex orders, suggest contacting the team directly
- If you don't know something, say so honestly

## Store context
- Brand: Grand Master Spas
- Products: Premium hot tubs and swim spas
- Key selling points: 10-year warranty, free delivery, expert installation, 170+ jets on flagship model`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: SYSTEM_PROMPT,
    messages,
    tools: {
      searchProducts: {
        description: "Search for products by title, type, or keyword.",
        inputSchema: z.object({
          query: z.string().describe("Search query"),
          limit: z.number().optional().default(5),
        }),
        execute: async (args: { query: string; limit: number }) => searchProductsExec(args),
      },
      getProductDetails: {
        description: "Get detailed product info including specs, features, and pricing.",
        inputSchema: z.object({
          handle: z.string().describe("Product handle (e.g. 'ecstatic')"),
        }),
        execute: async (args: { handle: string }) => getProductDetailsExec(args),
      },
      getCollections: {
        description: "Get all product collections/categories.",
        inputSchema: z.object({}),
        execute: async () => getCollectionsExec(),
      },
      getStoreInfo: {
        description: "Get store contact details and location.",
        inputSchema: z.object({}),
        execute: async () => getStoreInfoExec(),
      },
    },
  });

  return result.toTextStreamResponse();
}
