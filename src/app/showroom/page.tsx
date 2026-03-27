import Link from "next/link";

export const metadata = {
  title: "Visit Our Showroom",
  description: "See, touch, and test our spas in person. Visit our showroom for expert guidance.",
};

export default function ShowroomPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="bg-charcoal text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-16 md:py-24">
          <span className="text-xs uppercase tracking-widest text-bronze-light mb-3 block">Visit Us</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">Experience In Person</h1>
          <p className="text-white/70 max-w-2xl mb-8">Nothing compares to seeing, touching, and testing our spas in person. Visit our showroom for expert guidance and exclusive in-store offers.</p>
          <Link href="#book" className="btn-premium">Book Your Visit</Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <span className="text-xs uppercase tracking-widest text-bronze mb-2 block">Your Visit</span>
          <h2 className="text-3xl md:text-4xl font-light mb-10">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Explore Our Range", desc: "See our full collection of spas and swim spas. Touch the materials, feel the quality." },
              { step: "02", title: "Expert Consultation", desc: "Our specialists will understand your needs and recommend the perfect solution." },
              { step: "03", title: "Test the Experience", desc: "Many of our display models are filled and heated. See the jets in action." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <span className="text-5xl font-light text-bronze/20 block mb-3">{item.step}</span>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-fg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <span className="text-xs uppercase tracking-widest text-bronze mb-2 block">Locations</span>
          <h2 className="text-3xl md:text-4xl font-light mb-10">Our Showrooms</h2>
          <div className="bg-background border border-border rounded-sm p-6 md:p-8 shadow-sm max-w-xl">
            <h3 className="text-xl font-medium mb-4">Grand Master Spas Uddel</h3>
            <div className="space-y-2 text-sm text-muted-fg mb-6">
              <p>Meervelderweg 52, 3888 NK Uddel, Nederland</p>
              <p><a href="tel:+491732063792" className="text-foreground hover:text-bronze transition-colors">+49 173 206 37 92</a></p>
              <p><a href="mailto:info@grandmasterspas.com" className="text-foreground hover:text-bronze transition-colors">info@grandmasterspas.com</a></p>
            </div>
            <div className="space-y-1 text-sm border-t border-border pt-4">
              <div className="flex justify-between"><span className="text-muted-fg">Monday - Friday</span><span>09:00 - 17:00</span></div>
              <div className="flex justify-between"><span className="text-muted-fg">Saturday</span><span>10:00 - 16:00</span></div>
              <div className="flex justify-between"><span className="text-muted-fg">Sunday</span><span>By appointment</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="section-padding scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light mb-3 text-center">Book Your Visit</h2>
            <p className="text-muted-fg text-center mb-8">Schedule a personal consultation with our spa experts.</p>
            <div className="bg-background border border-border rounded-sm p-6 md:p-8 shadow-sm">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">First Name *</label><input type="text" className="form-input" required /></div>
                  <div><label className="block text-sm font-medium mb-1">Last Name *</label><input type="text" className="form-input" required /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Email *</label><input type="email" className="form-input" required /></div>
                <div><label className="block text-sm font-medium mb-1">Phone</label><input type="tel" className="form-input" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">Preferred Date *</label><input type="date" className="form-input" required /></div>
                  <div><label className="block text-sm font-medium mb-1">Preferred Time</label>
                    <select className="form-input">
                      <option value="">Select a time</option>
                      <option value="10:00">10:00</option><option value="11:00">11:00</option><option value="12:00">12:00</option>
                      <option value="14:00">14:00</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option>
                    </select>
                  </div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Interested In</label>
                  <select className="form-input">
                    <option value="hot-tub">Hot Tub Spas</option><option value="swim-spa">Swim Spas</option>
                    <option value="both">Both</option><option value="not-sure">Not sure yet</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Any questions or notes?</label><textarea rows={3} className="form-input resize-none" /></div>
                <button type="submit" className="btn-premium w-full !py-3">Book Appointment</button>
                <p className="text-xs text-muted-fg text-center">By submitting, you agree to our <Link href="/privacy" className="underline hover:text-foreground">privacy policy</Link>.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
