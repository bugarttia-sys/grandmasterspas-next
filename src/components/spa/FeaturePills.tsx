import type { ShopifyProduct } from "@/lib/shopify";
import { getMetafieldList } from "@/lib/shopify";

interface Props {
  product: ShopifyProduct;
  namespace: string;
  fieldKey: string;
  title: string;
  gold?: boolean;
}

export default function FeaturePills({ product, namespace, fieldKey, title, gold }: Props) {
  const items = getMetafieldList(product, namespace, fieldKey);
  if (items.length === 0) return null;

  return (
    <div>
      <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
        {title}
      </p>
      <div className="spa-therapy-grid">
        {items.map((item) => (
          <span
            key={item}
            className={`spa-therapy-pill ${gold ? "spa-therapy-pill--gold" : ""}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
