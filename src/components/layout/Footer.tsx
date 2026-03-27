import Link from "next/link";

const footerLinks = {
  products: {
    title: "Products",
    links: [
      { href: "/spas", label: "Hot Tubs" },
      { href: "/swim-spas", label: "Swim Spas" },
      { href: "/collections", label: "All Collections" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/warranty", label: "Warranty" },
      { href: "/shipping", label: "Delivery" },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-gms-charcoal text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand block */}
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-xl tracking-tight">
              Grand Master Spas
            </Link>
            <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-[28ch]">
              Premium hot tubs and swim spas crafted for those who demand the
              extraordinary.
            </p>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((column) => (
            <div key={column.title}>
              <p className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.18em] text-white/40 mb-5">
                {column.title}
              </p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[0.7rem] text-white/35 tracking-wide">
            &copy; {new Date().getFullYear()} Grand Master Spas. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[0.7rem] text-white/35 hover:text-white/60 transition-colors tracking-wide"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[0.7rem] text-white/35 hover:text-white/60 transition-colors tracking-wide"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
