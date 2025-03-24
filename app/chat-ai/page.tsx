import React from "react";
import ChatPanel from "../components/ChatPanel";
import Header from "../components/header";

function ChatAI() {
  return (
    <div className="container mx-auto pt-8 px-8 flex flex-col items-start gap-4 ">
      <Header heading="JigsawStack-Powered Assistant" />
      <ChatPanel />
    </div>
  );
}

export default ChatAI;
