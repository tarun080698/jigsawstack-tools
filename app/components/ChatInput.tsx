"use client";
import { useState } from "react";

interface ChatInputProps {
  onSend: (text: string, useInternet: boolean) => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, loading }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [useInternet, setUseInternet] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() !== "" && value.length > 10) {
      onSend(value, useInternet);
      setValue("");
      setError("");
    } else {
      setError(
        "Please enter more than 10 characters to start the conversation."
      );
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] p-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 max-w-4xl mx-auto rounded-xl px-4 py-2 border border-[#2c2c2c] bg-[#2a2a2a]"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e); // Your custom submit handler
          }
        }}
      >
        <textarea
          required
          minLength={10}
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything"
          className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none border-none px-2 py-2"
        />

        <label className="flex items-center gap-2 cursor-pointer bg-white text-black rounded-full p-2">
          <input
            type="checkbox"
            checked={useInternet}
            onChange={() => setUseInternet(!useInternet)}
            className="form-checkbox h-4 w-4 text-blue-500"
          />
          Use Internet
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-white cursor-pointer text-black rounded-full p-2 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
      )}
    </footer>
  );
};

export default ChatInput;
