import { Metadata } from "next";
import ChatInterface from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "Chat with us",
  description: "Chat with our AI spa specialist. Get instant answers about products, pricing, availability, and more.",
};

export default function ChatPage() {
  return (
    <div className="min-h-screen pt-20 bg-muted">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-bronze mb-3 font-medium">
            AI Spa Specialist
          </p>
          <h1 className="text-2xl sm:text-3xl font-light mb-2">
            Chat with us
          </h1>
          <p className="text-sm text-muted-fg max-w-md mx-auto">
            Ask anything about our spas, pricing, availability, installation,
            or get personalized recommendations.
          </p>
        </div>

        {/* Chat */}
        <ChatInterface />
      </div>
    </div>
  );
}
