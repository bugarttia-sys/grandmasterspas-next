"use client";

import Link from "next/link";

interface Props {
  productName: string;
  tagline: string;
}

export default function StickyCtaBar({ productName, tagline }: Props) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-t border-border shadow-lg">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{productName}</h3>
              <p className="text-sm text-muted-fg">{tagline}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn-premium-outline !py-2.5 !px-6">Book Visit</Link>
              <Link href="/quote" className="btn-premium !py-2.5 !px-6">Request Quote</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-lg">
        <div className="mx-auto flex max-w-xl items-center gap-2">
          <Link href="/contact" className="btn-premium-outline flex-1 !text-center !py-2.5 !text-sm">Book Visit</Link>
          <Link href="/quote" className="btn-premium flex-1 !text-center !py-2.5 !text-sm">Request Quote</Link>
        </div>
      </div>
    </>
  );
}
