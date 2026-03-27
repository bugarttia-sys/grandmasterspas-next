import Link from "next/link";

export const metadata = {
  title: "About Us",
  description: "Grand Master Spas — Premium wellness since 2010.",
};

const reviews = [
  { text: "The Aurora Elite exceeded all expectations. The installation team was professional, and the spa itself is absolutely stunning. Worth every euro.", name: "Anna van der Berg", location: "Amsterdam", date: "January 2026" },
  { text: "After months of research, I chose Grand Master Spas for their expertise and warranty. Three years later, still the best decision we made for our home.", name: "Peter Jansen", location: "Rotterdam", date: "December 2025" },
  { text: "The guided selector tool helped us find the perfect compact spa for our small garden. The team was patient with all our questions.", name: "Marie de Vries", location: "Utrecht", date: "January 2026" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="bg-charcoal text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-16 md:py-24">
          <span className="text-xs uppercase tracking-widest text-bronze-light mb-3 block">Our Story</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">Premium Wellness Since 2010</h1>
          <p className="text-white/70 max-w-2xl">For over 15 years, Grand Master Spas has been engineering the perfect relaxation experience. We combine premium craftsmanship with cutting-edge hydrotherapy technology.</p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "2,400+", label: "Happy Customers" },
              { value: "10yr", label: "Warranty" },
              { value: "4.9", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="py-8 md:py-12 text-center">
                <div className="text-3xl md:text-4xl font-light text-bronze mb-1">{stat.value}</div>
                <div className="text-sm text-muted-fg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <span className="text-xs uppercase tracking-widest text-bronze mb-2 block">What Drives Us</span>
          <h2 className="text-3xl md:text-4xl font-light mb-10">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Uncompromising Quality", desc: "Every spa we sell meets the highest standards of construction, materials, and performance." },
              { title: "Expert Guidance", desc: "Our certified specialists take the time to understand your needs and help you find the perfect match — no pressure, ever." },
              { title: "Lifetime Support", desc: "With industry-leading warranties, maintenance support, and spare parts availability, we're here for the long run." },
            ].map((v) => (
              <div key={v.title} className="card-premium p-6">
                <h3 className="text-xl font-medium mb-3">{v.title}</h3>
                <p className="text-sm text-muted-fg leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="section-padding bg-muted scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <span className="text-xs uppercase tracking-widest text-bronze mb-2 block">Reviews</span>
          <h2 className="text-3xl md:text-4xl font-light mb-10">Trusted by 2,400+ Customers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-background border border-border rounded-sm p-6 shadow-sm">
                <p className="text-sm leading-relaxed mb-6 italic">&ldquo;{r.text}&rdquo;</p>
                <div>
                  <p className="font-medium text-sm">{r.name}</p>
                  <p className="text-xs text-muted-fg">{r.location} &middot; {r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-4">Ready to Experience the Difference?</h2>
          <p className="text-muted-fg mb-8">Visit our showroom or request a personalized quote to get started.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-premium">Request a Quote</Link>
            <Link href="/showroom" className="btn-premium-outline">Visit Showroom</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
