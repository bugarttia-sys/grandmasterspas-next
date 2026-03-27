"use client";

import { useState } from "react";
import Link from "next/link";

export default function SelectorPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const steps = [
    { question: "What are you looking for?", subtitle: "Let us start with the basics", options: [
      { value: "hot-tub", label: "Hot Tub Spa", desc: "Relaxation, therapy, quality time" },
      { value: "swim-spa", label: "Swim Spa", desc: "Swimming, fitness, plus spa features" },
      { value: "not-sure", label: "Not sure yet", desc: "Help me decide" },
    ], key: "type" },
    { question: "How many people will use it?", subtitle: "This helps us find the right size", options: [
      { value: "2-3", label: "2-3 People", desc: "Intimate & compact" },
      { value: "4-5", label: "4-5 People", desc: "Family & friends" },
      { value: "6+", label: "6+ People", desc: "Entertaining & luxury" },
    ], key: "capacity" },
    { question: "What matters most to you?", subtitle: "We'll prioritize these features", options: [
      { value: "relaxation", label: "Relaxation", desc: "Stress relief & comfort" },
      { value: "therapy", label: "Hydrotherapy", desc: "Pain relief & recovery" },
      { value: "fitness", label: "Fitness", desc: "Exercise & swimming" },
      { value: "entertaining", label: "Entertaining", desc: "Social & family time" },
    ], key: "priority" },
    { question: "What's your budget range?", subtitle: "All prices include delivery & installation", options: [
      { value: "under-10k", label: "Under €10,000", desc: "Essential collection" },
      { value: "10k-20k", label: "€10,000 - €20,000", desc: "Premium collection" },
      { value: "20k+", label: "€20,000+", desc: "Exclusive collection" },
      { value: "flexible", label: "Flexible", desc: "Show me all options" },
    ], key: "budget" },
  ];

  const totalSteps = steps.length + 1;
  const progress = ((step + 1) / totalSteps) * 100;
  const currentStep = steps[step];
  const isComplete = step >= steps.length;

  function selectOption(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }

  function getRecommendation() {
    if (answers.type === "swim-spa") return { href: "/swim-spas", label: "View Swim Spas" };
    return { href: "/spas", label: "View Hot Tub Spas" };
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-muted">
      <div className="max-w-2xl w-full mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-muted-fg mb-2">
            <span>Step {Math.min(step + 1, totalSteps)} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-bronze transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {!isComplete ? (
          <div className="bg-background border border-border rounded-sm p-8 md:p-12 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-light mb-2">{currentStep.question}</h1>
            <p className="text-muted-fg mb-8">{currentStep.subtitle}</p>
            <div className="space-y-3">
              {currentStep.options.map((opt) => (
                <button key={opt.value} onClick={() => selectOption(currentStep.key, opt.value)}
                  className="w-full text-left p-5 border border-border rounded-sm hover:border-bronze/50 hover:shadow-md transition-all group">
                  <h3 className="text-lg font-medium group-hover:text-bronze transition-colors">{opt.label}</h3>
                  <p className="text-sm text-muted-fg">{opt.desc}</p>
                </button>
              ))}
            </div>
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="mt-6 text-sm text-muted-fg hover:text-foreground transition-colors">Back</button>
            )}
          </div>
        ) : (
          <div className="bg-background border border-border rounded-sm p-8 md:p-12 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-bronze/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">&#10003;</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-light mb-3">We have your perfect match!</h1>
            <p className="text-muted-fg mb-8">Based on your preferences, we&apos;ve selected the best spas for you.</p>
            <div className="space-y-4">
              <Link href={getRecommendation().href} className="btn-premium w-full !text-center !py-3">{getRecommendation().label}</Link>
              <Link href="/quote" className="btn-premium-outline w-full !text-center !py-3">Request a Personalized Quote</Link>
            </div>
            <button onClick={() => { setStep(0); setAnswers({}); }} className="mt-6 text-sm text-muted-fg hover:text-foreground transition-colors">Start Over</button>
          </div>
        )}
      </div>
    </div>
  );
}
