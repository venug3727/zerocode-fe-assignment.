import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  message: ChatMessage;
  isLatestBotMessage?: boolean;
}

export const Message: React.FC<MessageProps> = ({ message, isLatestBotMessage }) => {
  const isBot = message.sender === 'bot';
  // Initialize displayedContent based on message.isLoading and message.content
  const [displayedContent, setDisplayedContent] = useState(
    isBot && message.isLoading ? '' : message.content || ''
  );
  const typingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing interval on effect re-run or cleanup
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    if (!isBot) {
      // For user messages, just display content immediately
      setDisplayedContent(message.content || '');
      return;
    }

    // Only animate if this is the latest bot message
    if (!isLatestBotMessage) {
      setDisplayedContent(message.content || '');
      return;
    }

    // For bot messages
    if (message.isLoading) {
      // If message is loading, reset content and prepare for typing
      setDisplayedContent('');
    } else if (message.content !== undefined && message.content !== null) {
      // Always reset displayedContent to '' for a new latest bot message
      setDisplayedContent('');
      let i = 0;
      typingIntervalRef.current = setInterval(() => {
        if (i < message.content.length) {
          setDisplayedContent(prev => prev + message.content[i]);
          i++;
        } else {
          // Animation complete, clear interval and ensure full content is set
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setDisplayedContent(message.content);
        }
      }, 30) as unknown as number;
    } else {
      // Fallback for bot message with no content (e.g., error case)
      setDisplayedContent('');
    }

    // Cleanup function: clear interval when component unmounts or dependencies change
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [message.id, message.content, message.isLoading, isBot, isLatestBotMessage]); // message.id is important for new messages

  return (
    <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Bot size={16} className="text-white" />
        </div>
      )}
      
      <div className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl ${isBot ? 'order-1' : 'order-2'}`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isBot
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-600'
              : 'bg-blue-600 text-white'
          }`}
        >
          {message.isLoading ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Thinking...
              </span>
            </div>
          ) : (
            // Display typed content for bot or full content for user/completed bot messages
            <div className="text-sm whitespace-pre-wrap">{displayedContent}</div>
          )}
        </div>
        
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center order-3">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
};