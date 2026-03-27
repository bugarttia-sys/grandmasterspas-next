"use client";

import type { ShopifyProduct } from "@/lib/shopify";
import { getMetafield } from "@/lib/shopify";

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  product: ShopifyProduct;
}

export default function FaqAccordion({ product }: Props) {
  const raw = getMetafield(product, "content", "faqs");
  if (!raw) return null;

  let faqs: FaqItem[] = [];
  try {
    faqs = JSON.parse(raw);
  } catch {
    return null;
  }

  if (faqs.length === 0) return null;

  return (
    <div className="spa-faq-list">
      {faqs.map((faq, i) => (
        <details key={i} className="spa-faq-item">
          <summary className="spa-faq-question">{faq.q}</summary>
          <div className="spa-faq-answer">
            <p>{faq.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
