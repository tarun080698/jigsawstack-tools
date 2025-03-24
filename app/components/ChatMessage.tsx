import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // or any other highlight.js theme
interface ChatMessageProps {
  sender: "user" | "ai";
  text: string;
  index?: number;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}
const ChatMessage: React.FC<ChatMessageProps> = ({
  messagesEndRef,
  sender,
  text,
}) => {
  return (
    <div
      className={`my-2 flex ${
        sender === "user" ? "justify-end text-right" : "justify-start text-left"
      } mb-4`}
      ref={messagesEndRef}
    >
      <div
        className={`max-w-[75%] p-3 rounded-lg shadow ${
          sender === "user"
            ? "bg-red-400 text-white"
            : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
        }`}
      >
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight]}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
