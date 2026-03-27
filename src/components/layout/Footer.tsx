import Link from "next/link";

const footerLinks = {
  products: {
    title: "Products",
    links: [
      { href: "/spas", label: "Hot Tubs" },
      { href: "/swim-spas", label: "Swim Spas" },
      { href: "/collections", label: "Collections" },
      { href: "/search", label: "Find Your Spa" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { href: "/quote", label: "Request Quote" },
      { href: "/service", label: "Service & Support" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Knowledge Base" },
      { href: "/contact", label: "Contact" },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Main */}
        <div className="section-padding">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <span className="text-xl font-light tracking-tight">
                  Grand Master <span className="text-gradient">Spas</span>
                </span>
              </Link>
              <p className="text-sm text-muted-fg leading-relaxed max-w-[32ch]">
                Premium hot tubs and swim spas, crafted for those who demand the
                extraordinary in therapeutic luxury.
              </p>
              <div className="mt-6 space-y-2">
                <a href="tel:+491732063792" className="block text-sm text-muted-fg hover:text-foreground transition-colors">
                  +49 173 206 3792
                </a>
                <a href="mailto:info@grandmasterspas.com" className="block text-sm text-muted-fg hover:text-foreground transition-colors">
                  info@grandmasterspas.com
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.values(footerLinks).map((column) => (
              <div key={column.title}>
                <p className="text-sm font-medium text-foreground mb-4">
                  {column.title}
                </p>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-fg hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* CTA column */}
            <div>
              <p className="text-sm font-medium text-foreground mb-4">
                Get Started
              </p>
              <Link
                href="/quote"
                className="btn-premium !text-xs !py-2.5 !px-4 w-full !text-center"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-muted-fg">
            &copy; {new Date().getFullYear()} Grand Master Spas. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted-fg hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-fg hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
