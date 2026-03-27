import type { ShopifyProduct } from "@/lib/shopify";
import { getMetafield } from "@/lib/shopify";

interface Highlight {
  title: string;
  body: string;
  icon?: string;
}

interface Props {
  product: ShopifyProduct;
}

export default function Highlights({ product }: Props) {
  const raw = getMetafield(product, "content", "highlights");
  if (!raw) return null;

  let highlights: Highlight[] = [];
  try {
    highlights = JSON.parse(raw);
  } catch {
    return null;
  }

  if (highlights.length === 0) return null;

  return (
    <div className="spa-highlights-grid">
      {highlights.map((h, i) => (
        <div key={i} className="spa-highlight-card">
          {h.icon && <span className="spa-highlight-card__icon">{h.icon}</span>}
          <h4 className="spa-highlight-card__title">{h.title}</h4>
          <p className="spa-highlight-card__body">{h.body}</p>
        </div>
      ))}
    </div>
  );
}
