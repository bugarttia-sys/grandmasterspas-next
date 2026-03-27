import type { ShopifyProduct } from "@/lib/shopify";
import { getMetafield } from "@/lib/shopify";

interface Props {
  product: ShopifyProduct;
}

export default function SpecsTable({ product }: Props) {
  const rows = [
    ["Dimensions (L × W × H)", `${getMetafield(product, "specs", "length_cm")} × ${getMetafield(product, "specs", "width_cm")} × ${getMetafield(product, "specs", "height_cm")} cm`],
    ["Capacity", `${getMetafield(product, "specs", "persons_capacity")} persons`],
    ["Seating", `${getMetafield(product, "specs", "seats")} seats + ${getMetafield(product, "specs", "loungers")} loungers`],
    ["Total Jets", getMetafield(product, "specs", "total_jets")],
    ["Water Capacity", `${getMetafield(product, "specs", "water_capacity_liters")} liters`],
    ["Dry Weight", `${getMetafield(product, "specs", "dry_weight_kg")} kg`],
    ["Filled Weight", `${getMetafield(product, "specs", "filled_weight_kg")} kg`],
    ["Shell", getMetafield(product, "construction", "shell_material")],
    ["Frame", getMetafield(product, "construction", "frame")],
    ["Insulation", getMetafield(product, "construction", "insulation")],
    ["Heating", getMetafield(product, "construction", "heating")],
    ["Controls", getMetafield(product, "construction", "controls")],
  ].filter(([, val]) => val && val !== "null" && !val.includes("null"));

  return (
    <table className="spa-specs-table">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td>{label}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
