"use client";

import { useState } from "react";
import type { ShopifyProduct } from "@/lib/shopify";
import { getMetafield, getMetafieldList } from "@/lib/shopify";

const tabs = ["overview", "specs", "features", "installation", "warranty", "faq"];

interface Props {
  product: ShopifyProduct;
  isEcstatic: boolean;
}

export default function ProductTabs({ product, isEcstatic }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  const summary = getMetafield(product, "content", "summary");
  const designStory = getMetafield(product, "content", "design_story");
  const technologyStory = getMetafield(product, "content", "technology_story");

  const lengthCm = getMetafield(product, "specs", "length_cm");
  const widthCm = getMetafield(product, "specs", "width_cm");
  const heightCm = getMetafield(product, "specs", "height_cm");
  const seats = getMetafield(product, "specs", "seats") || getMetafield(product, "specs", "persons_capacity");
  const loungers = getMetafield(product, "specs", "loungers");
  const jets = getMetafield(product, "specs", "total_jets");
  const hydroJets = getMetafield(product, "specs", "hydro_jets");
  const airJets = getMetafield(product, "specs", "air_jets");
  const waterCapacity = getMetafield(product, "specs", "water_capacity_liters");
  const dryWeight = getMetafield(product, "specs", "dry_weight_kg");
  const filledWeight = getMetafield(product, "specs", "filled_weight_kg");
  const shellMaterial = getMetafield(product, "construction", "shell_material");
  const frame = getMetafield(product, "construction", "frame");
  const insulation = getMetafield(product, "construction", "insulation");
  const heating = getMetafield(product, "construction", "heating");
  const controls = getMetafield(product, "construction", "controls");

  const warrantyStructure = getMetafield(product, "warranty", "structure_years");
  const warrantySurface = getMetafield(product, "warranty", "surface_years");
  const warrantyEquipment = getMetafield(product, "warranty", "equipment_years");

  let faqs: Array<{ q: string; a: string }> = [];
  try { faqs = JSON.parse(getMetafield(product, "content", "faqs") || "[]"); } catch {}

  const featureCategories = [
    { category: "Therapies", items: getMetafieldList(product, "features", "therapies") },
    { category: "Comfort", items: getMetafieldList(product, "features", "comfort") },
    { category: "Lighting", items: getMetafieldList(product, "features", "lighting") },
    { category: "Energy", items: getMetafieldList(product, "features", "energy") },
    { category: "Entertainment", items: getMetafieldList(product, "features", "entertainment") },
    { category: "Connectivity", items: getMetafieldList(product, "features", "connectivity") },
    { category: "Water Care", items: getMetafieldList(product, "features", "sanitation") },
    { category: "Proprietary", items: getMetafieldList(product, "features", "proprietary") },
  ].filter((c) => c.items.length > 0);

  const specRows = [
    ["Dimensions (L×W×H)", lengthCm && widthCm ? `${lengthCm} × ${widthCm} × ${heightCm} cm` : null],
    ["Seating", seats ? `${seats} seats${loungers ? ` + ${loungers} loungers` : ""}` : null],
    ["Total Jets", jets],
    ["Hydro Jets", hydroJets],
    ["Air Jets", airJets],
    ["Water Capacity", waterCapacity ? `${waterCapacity} liters` : null],
    ["Dry Weight", dryWeight ? `${dryWeight} kg` : null],
    ["Filled Weight", filledWeight ? `${filledWeight} kg` : null],
    ["Shell", shellMaterial],
    ["Frame", frame],
    ["Insulation", insulation],
    ["Heating", heating],
    ["Controls", controls],
  ].filter(([, v]) => v && v !== "null") as [string, string][];

  return (
    <div className={isEcstatic ? "rounded-md border border-border bg-background/90 p-4 sm:p-6 md:p-8 shadow-sm" : ""}>
      {/* Tab Triggers */}
      <div className={`flex border-b border-border mb-6 sm:mb-8 overflow-x-auto scrollbar-hide -mx-1 px-1 ${isEcstatic ? "border-border/70" : ""}`}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base capitalize whitespace-nowrap flex-shrink-0 transition-all ${
              isEcstatic
                ? `rounded-sm border border-transparent mr-1.5 ${activeTab === tab ? "bg-bronze text-white border-bronze" : "text-muted-fg hover:text-foreground"}`
                : `border-b-2 ${activeTab === tab ? "border-bronze text-foreground" : "border-transparent text-muted-fg hover:text-foreground"}`
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className={isEcstatic ? "bg-muted/35 border border-border/80 rounded-md p-5 sm:p-6" : ""}>
            <h3 className={`text-xl sm:text-2xl mb-3 sm:mb-4 font-light ${isEcstatic ? "uppercase tracking-wide" : ""}`}>
              Overview
            </h3>
            {summary && <p className="text-muted-fg mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">{summary}</p>}
            {designStory && <p className="text-muted-fg text-sm sm:text-base leading-relaxed">{designStory}</p>}
          </div>
          {product.images.edges[1] && (
            <div className={`aspect-video relative overflow-hidden bg-muted shadow-md ${isEcstatic ? "rounded-md border border-border/80 shadow-xl" : "rounded-sm"}`}>
              <img src={product.images.edges[1].node.url} alt="Overview" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}

      {activeTab === "specs" && (
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className={isEcstatic ? "bg-muted/30 border border-border/80 rounded-md p-4 sm:p-6" : ""}>
            <h3 className={`text-xl sm:text-2xl mb-4 sm:mb-6 font-light ${isEcstatic ? "uppercase tracking-wide" : ""}`}>
              Technical Specifications
            </h3>
            <table className="spa-specs-table">
              <tbody>
                {specRows.map(([label, value]) => (
                  <tr key={label}><td>{label}</td><td>{value}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className={`bg-background border border-border rounded-sm p-4 sm:p-6 ${isEcstatic ? "rounded-md shadow-sm" : ""}`}>
              <h4 className="font-medium mb-3 sm:mb-4 flex items-center gap-2">
                📄 Download Datasheet
              </h4>
              <p className="text-sm text-muted-fg mb-3 sm:mb-4">Get the complete technical specifications in PDF format.</p>
              <button className="btn-premium-outline !text-sm !py-2 !px-4">Download PDF</button>
            </div>
            {technologyStory && (
              <div className={`p-4 sm:p-6 bg-muted rounded-sm ${isEcstatic ? "rounded-md border border-border/80 bg-muted/45" : ""}`}>
                <h4 className="font-medium mb-2 flex items-center gap-2">⚡ Technology</h4>
                <p className="text-sm text-muted-fg leading-relaxed">{technologyStory}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "features" && (
        <div className="max-w-4xl">
          <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-light">Features &amp; Therapies</h3>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {featureCategories.map((cat) => (
              <div key={cat.category}>
                <h4 className="font-medium mb-2 sm:mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-bronze" />
                  {cat.category}
                </h4>
                <ul className="space-y-1.5">
                  {cat.items.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-fg">
                      <span className="text-bronze text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "installation" && (
        <div className="max-w-3xl">
          <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-light">Installation Requirements</h3>
          <div className="space-y-4 sm:space-y-6">
            {[
              { title: "Site Preparation", content: "A level, reinforced surface that can support the filled weight of the spa. We provide detailed guides." },
              { title: "Electrical", content: "Dedicated electrical circuit required. Professional installation by certified electrician included." },
              { title: "Access", content: "Minimum 80cm clear pathway for delivery. Our team will assess your site before delivery." },
              { title: "Water Supply", content: "Standard garden hose connection for filling. Drainage point recommended nearby." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 sm:gap-4">
                <div className="w-6 h-6 rounded-full bg-bronze/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-bronze text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p className="text-muted-fg text-sm">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "warranty" && (
        <div className="max-w-3xl">
          <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-light">Warranty Coverage</h3>
          <p className="text-muted-fg mb-6 sm:mb-8 text-sm sm:text-base">
            All products come with comprehensive warranty coverage for your peace of mind.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { years: warrantyStructure || "10", label: "Structure", desc: "Frame and structural components" },
              { years: warrantySurface || "5", label: "Shell Surface", desc: "Acrylic shell and finish" },
              { years: warrantyEquipment || "2", label: "Equipment", desc: "Pumps, heater, controls" },
            ].map((w) => (
              <div key={w.label} className="bg-background border border-border rounded-sm p-4 sm:p-6 text-center">
                <div className="text-lg mb-2">🛡️</div>
                <div className="text-2xl sm:text-3xl font-light tabular-nums mb-1">{w.years}</div>
                <div className="text-xs uppercase tracking-wider text-muted-fg mb-1.5 sm:mb-2">Years</div>
                <div className="font-medium text-sm mb-1">{w.label}</div>
                <p className="text-xs text-muted-fg">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "faq" && faqs.length > 0 && (
        <div className="max-w-3xl">
          <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-light">Frequently Asked Questions</h3>
          <div className="spa-faq-list !max-w-none">
            {faqs.map((faq, i) => (
              <details key={i} className="spa-faq-item">
                <summary className="spa-faq-question">{faq.q}</summary>
                <div className="spa-faq-answer"><p>{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
