"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState } from "react";
import { Send, Bot, User, Loader2, Sparkles, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = [
  "What spas do you have available?",
  "Tell me about the Ecstatic spa",
  "What's the warranty on your spas?",
  "I need a spa for 6 people",
];

export default function ChatInterface() {
  const { messages, sendMessage, status, error, setMessages } = useChat();

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSend() {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    await sendMessage({ text });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSuggestion(text: string) {
    setInput(text);
    inputRef.current?.focus();
  }

  function getMessageText(message: typeof messages[0]): string {
    return message.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("");
  }

  return (
    <div className="bg-background border border-border rounded-md shadow-sm overflow-hidden flex flex-col" style={{ height: "calc(100dvh - 240px)", minHeight: "500px" }}>
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Welcome message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-bronze/10 text-bronze">
            <Bot className="w-4 h-4" />
          </div>
          <div className="max-w-[80%] rounded-lg rounded-tl-sm px-4 py-3 text-sm leading-relaxed bg-muted text-foreground">
            Hi! 👋 I&apos;m the Grand Master Spas AI specialist. I can help you find the perfect spa, answer questions about our products, check availability, and more. What can I help you with?
          </div>
        </div>

        {messages.map((message) => {
          const text = getMessageText(message);
          if (!text) return null;

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user"
                    ? "bg-charcoal text-white"
                    : "bg-bronze/10 text-bronze"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-charcoal text-white rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm"
                }`}
              >
                {message.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:mb-2 [&>ol]:mb-2 [&_a]:text-bronze [&_a]:underline [&_strong]:font-semibold">
                    <ReactMarkdown>{text}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{text}</p>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-bronze/10 text-bronze flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-muted rounded-lg rounded-tl-sm px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-muted-fg">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <p className="text-sm text-red-700 flex-1">
              Something went wrong. Please try again.
            </p>
          </div>
        )}

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-fg font-medium flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="text-xs bg-muted hover:bg-bronze/10 hover:text-bronze border border-border rounded-full px-3 py-1.5 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 sm:p-4 bg-background">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about our spas..."
            rows={1}
            className="flex-1 resize-none bg-muted border border-border rounded-lg px-4 py-3 text-sm outline-none transition-all focus:border-bronze focus:ring-2 focus:ring-bronze/20 max-h-32"
            style={{ minHeight: "44px" }}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="btn-premium !p-3 !rounded-lg disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-[10px] text-muted-fg mt-2 text-center">
          AI-powered by Claude. Responses may not always be accurate.
        </p>
      </div>
    </div>
  );
}
