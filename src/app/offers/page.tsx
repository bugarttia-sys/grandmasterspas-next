"use client";

import { useState } from "react";
import Link from "next/link";

export default function OffersPage() {
  const [price, setPrice] = useState(15000);
  const [downPayment, setDownPayment] = useState(0);
  const [term, setTerm] = useState(48);

  const apr = 5.9;
  const loanAmount = price - downPayment;
  const monthlyRate = apr / 100 / 12;
  const monthly = monthlyRate > 0 ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term)) : loanAmount / term;
  const totalCost = monthly * term;

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-charcoal text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-16 md:py-24">
          <span className="text-xs uppercase tracking-widest text-bronze-light mb-3 block">Flexible Financing</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">Make Luxury Affordable</h1>
          <p className="text-white/70 max-w-2xl">Competitive financing options designed to fit your budget. Get your dream spa today with affordable monthly payments.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <span className="text-xs uppercase tracking-widest text-bronze mb-2 block">Limited Time</span>
          <h2 className="text-3xl md:text-4xl font-light mb-10">Current Offers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { badge: "Featured", title: "0% APR for 12 Months", desc: "On select Premium Collection models. Limited time offer.", fine: "Minimum purchase €15,000. Subject to credit approval." },
              { badge: "Save €1,500", title: "Free Installation", desc: "Save €1,500 on professional installation with any spa purchase.", fine: "Standard installation. Excludes electrical work." },
              { badge: "Bonus", title: "Trade-In Bonus", desc: "Get an extra €500 when you trade in your old hot tub.", fine: "Any brand, any condition. Subject to assessment." },
            ].map((offer) => (
              <div key={offer.title} className="card-premium p-6">
                <span className="inline-block text-[10px] uppercase tracking-widest text-bronze bg-bronze/10 px-3 py-1 rounded-sm mb-4">{offer.badge}</span>
                <h3 className="text-xl font-medium mb-2">{offer.title}</h3>
                <p className="text-sm text-muted-fg mb-4">{offer.desc}</p>
                <p className="text-xs text-muted-fg/70">{offer.fine}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <span className="text-xs uppercase tracking-widest text-bronze mb-2 block">Payment Calculator</span>
          <h2 className="text-3xl md:text-4xl font-light mb-10">Estimate Your Monthly Payment</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-background border border-border rounded-sm p-6 md:p-8 shadow-sm">
              <div className="mb-6">
                <label className="flex items-center justify-between text-sm font-medium mb-2"><span>Spa Price</span><span className="text-bronze">&euro;{price.toLocaleString("nl-NL")}</span></label>
                <input type="range" min={5000} max={50000} step={500} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-bronze" />
                <div className="flex justify-between text-xs text-muted-fg mt-1"><span>&euro;5,000</span><span>&euro;50,000</span></div>
              </div>
              <div className="mb-6">
                <label className="flex items-center justify-between text-sm font-medium mb-2"><span>Down Payment</span><span className="text-bronze">&euro;{downPayment.toLocaleString("nl-NL")}</span></label>
                <input type="range" min={0} max={Math.floor(price / 2)} step={500} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full accent-bronze" />
                <div className="flex justify-between text-xs text-muted-fg mt-1"><span>&euro;0</span><span>&euro;{Math.floor(price / 2).toLocaleString("nl-NL")}</span></div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Loan Term</label>
                <div className="flex gap-2 flex-wrap">
                  {[24, 36, 48, 60, 84].map((t) => (
                    <button key={t} onClick={() => setTerm(t)} className={`px-4 py-2 text-sm rounded-sm border transition-all ${term === t ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/50"}`}>{t}mo</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-background border border-border rounded-sm p-6 md:p-8 shadow-sm">
              <h3 className="text-sm uppercase tracking-widest text-muted-fg mb-6">Your Estimate</h3>
              <div className="mb-6">
                <p className="text-sm text-muted-fg mb-1">Estimated Monthly Payment</p>
                <p className="text-4xl md:text-5xl font-light">&euro;{Math.round(monthly).toLocaleString("nl-NL")}<span className="text-lg text-muted-fg">/mo</span></p>
              </div>
              <div className="space-y-3 border-t border-border pt-6">
                <div className="flex justify-between text-sm"><span className="text-muted-fg">Loan Amount</span><span>&euro;{loanAmount.toLocaleString("nl-NL")}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-fg">Term</span><span>{term} months</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-fg">APR</span><span>{apr}%</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-fg">Total Cost</span><span>&euro;{Math.round(totalCost).toLocaleString("nl-NL")}</span></div>
              </div>
              <p className="text-xs text-muted-fg mt-6">*This is an estimate only. Actual APR and terms depend on your credit profile. Representative APR {apr}%.</p>
              <Link href="/quote" className="btn-premium w-full !text-center !py-3 mt-6">Request Personalized Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <span className="text-xs uppercase tracking-widest text-bronze mb-2 block">Benefits</span>
          <h2 className="text-3xl md:text-4xl font-light mb-10">Why Finance Your Spa?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Preserve Cash", desc: "Keep your savings for emergencies while enjoying your spa now." },
              { title: "Fixed Payments", desc: "Know exactly what you pay each month. No surprises." },
              { title: "Quick Approval", desc: "Online application with decision in minutes." },
              { title: "No Hidden Fees", desc: "Transparent pricing. Pay off early without penalties." },
            ].map((b) => (
              <div key={b.title} className="card-premium p-5">
                <h4 className="font-medium mb-2">{b.title}</h4>
                <p className="text-sm text-muted-fg">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
