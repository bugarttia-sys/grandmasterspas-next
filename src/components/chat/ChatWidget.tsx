"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatInterface from "./ChatInterface";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isOpen
            ? "bg-charcoal text-white rotate-0"
            : "btn-premium !rounded-full !p-0 !w-14 !h-14"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100dvh-120px)] bg-background border border-border rounded-lg shadow-xl overflow-hidden flex flex-col animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-[hsl(38,80%,45%)] to-[hsl(38,85%,35%)] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Spa Specialist</p>
              <p className="text-[10px] text-white/70">Powered by AI</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat content */}
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      )}
    </>
  );
}
