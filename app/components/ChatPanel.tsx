"use client";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface Message {
  sender: "user" | "ai";
  text: string;
  sources?: { title: string; url: string }[];
}

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // 👈 control auto-save

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const stored = localStorage.getItem("chatMessages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setMessages(parsed);
      } catch (e) {
        console.error("Failed to parse stored messages", e);
      }
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages, hasLoaded]);

  const handleSend = async (query: string, useInternet: boolean) => {
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({ query, useInternet }),
      });

      const data = await res.json();
      console.log({ data });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.result || "Sorry, no response was generated.",
          sources: data.sources || [],
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "There was an error fetching the response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);
    console.log("Chat history cleared");
  };

  return (
    <div className="space-y-4 w-full max-w-5xl mx-auto">
      {messages.length > 0 && (
        <button
          onClick={clearHistory}
          className="p-2 m-2 border border-red-400 rounded-lg w-52 hover:bg-red-400 hover:text-black cursor-pointer"
        >
          Clear Chat History
        </button>
      )}

      <div
        className="space-y-3"
        style={{ height: "calc(100vh - 290px)", overflowY: "auto" }}
      >
        {messages.map((m, i) => (
          <ChatMessage
            key={i}
            index={i}
            sender={m.sender}
            text={m.text}
            messagesEndRef={messagesEndRef}
          />
        ))}

        {loading && (
          <ChatMessage
            sender="ai"
            text="Thinking..."
            index={-1}
            messagesEndRef={messagesEndRef}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
};

export default ChatPanel;
