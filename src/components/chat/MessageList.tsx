import React, { useEffect, useRef } from "react";
import { ChatMessage } from "../../types";
import { Message } from "./Message";

interface MessageListProps {
  messages: ChatMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
          <p className="text-sm">
            Ask me anything or use a quick prompt below!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto overflow-hidden p-4 space-y-4">
      {messages.map((message, idx) => {
        // Find the last bot message index
        const lastBotIdx = [...messages]
          .reverse()
          .findIndex((m) => m.sender === "bot");
        const lastBotMessageIndex =
          lastBotIdx === -1 ? -1 : messages.length - 1 - lastBotIdx;
        const isLatestBotMessage = idx === lastBotMessageIndex;
        return (
          <Message
            key={message.id}
            message={message}
            isLatestBotMessage={isLatestBotMessage}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};
