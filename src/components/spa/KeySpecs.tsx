import type { ShopifyProduct } from "@/lib/shopify";
import { getMetafield } from "@/lib/shopify";

interface Props {
  product: ShopifyProduct;
}

export default function KeySpecs({ product }: Props) {
  const specs = [
    {
      value: getMetafield(product, "specs", "persons_capacity"),
      label: "Persons",
      sub: `${getMetafield(product, "specs", "seats") || "?"} seats · ${getMetafield(product, "specs", "loungers") || "0"} lounger`,
    },
    {
      value: getMetafield(product, "specs", "total_jets"),
      label: "Jets",
      sub: `${getMetafield(product, "specs", "hydro_jets") || "?"} hydro · ${getMetafield(product, "specs", "air_jets") || "0"} air`,
    },
    {
      value: `${getMetafield(product, "specs", "length_cm") || "?"} × ${getMetafield(product, "specs", "width_cm") || "?"}`,
      label: "Dimensions",
      sub: `${getMetafield(product, "specs", "height_cm") || "?"} cm high`,
    },
    {
      value: getMetafield(product, "warranty", "structure_years"),
      label: "Year Warranty",
      sub: `${getMetafield(product, "warranty", "surface_years") || "?"} yr surface · ${getMetafield(product, "warranty", "equipment_years") || "?"} yr equipment`,
    },
  ];

  return (
    <div className="spa-key-specs">
      {specs.map((spec) => (
        <div key={spec.label} className="spa-spec">
          <span className="spa-spec__value">{spec.value || "—"}</span>
          <span className="spa-spec__label">{spec.label}</span>
          <span className="spa-spec__sub">{spec.sub}</span>
        </div>
      ))}
    </div>
  );
}
