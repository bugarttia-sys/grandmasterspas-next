import Link from "next/link";

export const metadata = {
  title: "Knowledge Hub",
  description: "Expert guides, comparisons, and advice to help you make an informed decision.",
};

const guides = [
  { category: "Buying Guide", title: "The Complete Hot Tub Buyer's Guide 2026", desc: "Everything you need to know before purchasing your first spa.", readTime: "12 min read" },
  { category: "Running Costs", title: "How Much Does a Hot Tub Cost to Run?", desc: "A transparent breakdown of electricity, water, and maintenance costs.", readTime: "8 min read" },
  { category: "Installation", title: "Preparing Your Garden for a Hot Tub", desc: "Site preparation, base requirements, electrical setup, and access considerations.", readTime: "10 min read" },
  { category: "Comparison", title: "Hot Tub vs Swim Spa: Which Is Right for You?", desc: "Features, space requirements, costs, and use cases compared.", readTime: "7 min read" },
  { category: "Maintenance", title: "Hot Tub Maintenance Made Simple", desc: "Weekly, monthly, and seasonal routines to keep your spa running smoothly.", readTime: "9 min read" },
  { category: "Buying Guide", title: "Understanding Jet Types and Configurations", desc: "Learn which jet types target specific muscle groups for optimal therapy.", readTime: "6 min read" },
];

const faqs = [
  { q: "How long does delivery take?", a: "Delivery typically takes 4-8 weeks from order confirmation, depending on the model and availability." },
  { q: "Do I need planning permission for a hot tub?", a: "In most cases, no. Hot tubs are generally classified as temporary structures. We recommend checking with your local council." },
  { q: "What electrical connection do I need?", a: "Most spas require a dedicated 32A or 40A supply installed by a qualified electrician." },
  { q: "How much does it cost to run a hot tub?", a: "Modern, well-insulated spas typically cost €30-€50 per month in electricity." },
];

export default function KnowledgePage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="bg-muted border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-16">
          <span className="text-xs uppercase tracking-widest text-bronze mb-2 block">Knowledge Hub</span>
          <h1 className="text-4xl md:text-5xl font-light mb-4">Expert Guides &amp; Resources</h1>
          <p className="text-muted-fg max-w-2xl">Make an informed decision with our comprehensive guides, comparisons, and expert advice.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <article key={guide.title} className="card-premium p-6">
                <span className="inline-block text-[10px] uppercase tracking-widest text-bronze bg-bronze/10 px-3 py-1 rounded-sm mb-4">{guide.category}</span>
                <h3 className="text-lg font-medium mb-2">{guide.title}</h3>
                <p className="text-sm text-muted-fg mb-4 leading-relaxed">{guide.desc}</p>
                <span className="text-xs text-muted-fg">{guide.readTime}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <span className="text-xs uppercase tracking-widest text-bronze mb-2 block">Quick Answers</span>
          <h2 className="text-3xl md:text-4xl font-light mb-10">Popular Questions</h2>
          <div className="spa-faq-list">
            {faqs.map((faq) => (
              <details key={faq.q} className="spa-faq-item">
                <summary className="spa-faq-question">{faq.q}</summary>
                <div className="spa-faq-answer"><p>{faq.a}</p></div>
              </details>
            ))}
          </div>
          <div className="text-center mt-8"><Link href="/faq" className="btn-premium-outline">View All FAQs</Link></div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-4">Get the Complete Buyer&apos;s Guide</h2>
          <p className="text-muted-fg mb-6">Everything you need to know before purchasing a spa, delivered straight to your inbox.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Your email" className="form-input flex-1" />
            <button className="btn-premium whitespace-nowrap">Download Free</button>
          </div>
        </div>
      </section>
    </div>
  );
}
