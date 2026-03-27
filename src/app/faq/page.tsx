import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Grand Master Spas hot tubs and swim spas.",
};

const faqs = [
  {
    category: "Products",
    items: [
      {
        q: "What is the difference between a hot tub and a swim spa?",
        a: "A hot tub is designed primarily for relaxation and hydrotherapy, typically seating 2-8 people. A swim spa combines a hot tub with a swimming area that creates a current for swimming in place — perfect for both exercise and relaxation.",
      },
      {
        q: "How many jets do your spas have?",
        a: "Our spas range from 40 to 170+ jets depending on the model. The Ecstatic, our flagship model, features 170 jets including 152 hydro jets and 18 air jets with dedicated therapy zones.",
      },
      {
        q: "What colors and finishes are available?",
        a: "We offer a range of shell colors and cabinet finishes. Contact us for the full selection available for your chosen model.",
      },
    ],
  },
  {
    category: "Delivery & Installation",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 6-10 weeks from order confirmation. Premium and custom orders may take 10-14 weeks. We'll provide a specific timeline with your quote.",
      },
      {
        q: "Do you install the spa?",
        a: "Yes, we offer full installation services including electrical connection, site preparation guidance, and commissioning. Installation details are included in your personalized quote.",
      },
      {
        q: "What site preparation is needed?",
        a: "You'll need a level, reinforced surface that can support the filled weight of the spa (typically 1,500-2,500 kg). We provide detailed site preparation guides with every order.",
      },
    ],
  },
  {
    category: "Warranty & Maintenance",
    items: [
      {
        q: "What warranty do you offer?",
        a: "Our warranty covers up to 10 years on the structure, 5 years on the surface, and 2 years on equipment. Specific coverage depends on the model — see individual product pages for details.",
      },
      {
        q: "How much does it cost to run a spa?",
        a: "With our Hybrid Heating and Triple Layer Insulation technology, typical running costs are €30-50 per month depending on usage, climate, and energy prices. Our energy-efficient models with optional heat pumps can reduce this further.",
      },
      {
        q: "How often does the water need changing?",
        a: "We recommend changing the water every 3-4 months with regular use. Our Synergy Water Maintenance System with ozone and UV sanitization keeps the water clean between changes.",
      },
    ],
  },
  {
    category: "Ordering",
    items: [
      {
        q: "How do I order a spa?",
        a: "Start by requesting a quote through our website. Our spa specialists will contact you within 24 hours to discuss your requirements, provide pricing, and guide you through the ordering process.",
      },
      {
        q: "Do you offer financing?",
        a: "Yes, we offer flexible financing options. Details are provided with your personalized quote.",
      },
      {
        q: "Can I visit a showroom?",
        a: "Contact us to arrange a visit to see our spas in person. We can also arrange wet tests at select partner locations.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="pt-32 pb-8 bg-surface">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-4">
            Support
          </p>
          <h1 className="font-serif">Frequently Asked Questions</h1>
          <p className="mt-4 text-sm text-gms-mid-grey max-w-prose mx-auto">
            Everything you need to know about our premium spas, delivery,
            installation, and aftercare.
          </p>
        </div>
      </section>

      <section className="pb-[var(--spacing-section)] bg-surface">
        <div className="max-w-2xl mx-auto px-6 space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-gms-gold mb-6">
                {section.category}
              </p>
              <div className="spa-faq-list">
                {section.items.map((faq, i) => (
                  <details key={i} className="spa-faq-item">
                    <summary className="spa-faq-question">{faq.q}</summary>
                    <div className="spa-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
