"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/spas", label: "Hot Tubs" },
  { href: "/swim-spas", label: "Swim Spas" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--gms-transition)] ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <span
              className={`font-serif text-lg md:text-xl font-normal tracking-tight transition-colors ${
                isScrolled || isMobileMenuOpen ? "text-gms-charcoal" : "text-white"
              }`}
            >
              Grand Master Spas
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.75rem] font-sans font-semibold uppercase tracking-[0.12em] transition-colors hover:opacity-100 ${
                  isScrolled
                    ? "text-gms-charcoal/70 hover:text-gms-charcoal"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Cart */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/quote"
              className={`text-[0.7rem] font-sans font-semibold uppercase tracking-[0.12em] px-5 py-2 rounded-sm border transition-all ${
                isScrolled
                  ? "border-gms-gold text-gms-gold hover:bg-gms-gold hover:text-white"
                  : "border-white/40 text-white hover:bg-white/10"
              }`}
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block w-5 h-[1.5px] transition-all duration-300 ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-[4.5px] bg-gms-charcoal"
                  : isScrolled
                  ? "bg-gms-charcoal"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] transition-all duration-300 ${
                isMobileMenuOpen
                  ? "-rotate-45 -translate-y-[4.5px] bg-gms-charcoal"
                  : isScrolled
                  ? "bg-gms-charcoal"
                  : "bg-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-start justify-center h-full px-8 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-3xl font-light text-gms-charcoal tracking-tight hover:text-gms-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6 pt-6 border-t border-[var(--gms-border)] w-full">
            <Link
              href="/quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block bg-gms-gold text-white px-8 py-3 text-sm font-sans font-medium tracking-wide rounded-sm"
            >
              Request a Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
