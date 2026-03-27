"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/spas", label: "Spas" },
  { href: "/swim-spas", label: "Swim Spas" },
  { href: "/collections", label: "Collections" },
  { href: "/offers", label: "Offers" },
  { href: "/showroom", label: "Showroom" },
  { href: "/about", label: "About" },
  { href: "/knowledge", label: "Knowledge" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2">
            <span
              className={`text-xl md:text-2xl font-light tracking-tight transition-colors duration-200 ${
                isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
              }`}
            >
              Grand Master
            </span>
            <span
              className={`text-xl md:text-2xl font-light tracking-tight transition-colors duration-200 text-gradient ${
                isScrolled || isMobileMenuOpen ? "" : "!text-white [-webkit-text-fill-color:white]"
              }`}
            >
              Spas
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isScrolled
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+491732063792"
              className={`text-sm font-medium transition-colors ${
                isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white"
              }`}
            >
              +49 173 206 3792
            </a>
            <Link
              href="/quote"
              className="btn-premium !py-2 !px-5 !text-xs !tracking-widest"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block w-5 h-[1.5px] transition-all duration-300 ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-[4.5px] bg-foreground"
                  : isScrolled ? "bg-foreground" : "bg-white"
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] transition-all duration-300 ${
                isMobileMenuOpen
                  ? "-rotate-45 -translate-y-[4.5px] bg-foreground"
                  : isScrolled ? "bg-foreground" : "bg-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-20 bg-background z-40 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-8 gap-1 h-[calc(100dvh-80px)] overflow-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-light text-foreground py-3 border-b border-border hover:text-bronze transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8 space-y-4">
            <Link
              href="/quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-premium w-full !text-center"
            >
              Request a Quote
            </Link>
            <a
              href="tel:+491732063792"
              className="btn-premium-outline w-full !text-center"
            >
              Call Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
