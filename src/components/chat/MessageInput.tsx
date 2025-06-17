import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Download, History, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onNavigateHistory: (direction: "up" | "down") => string;
  onExportChat: () => void;
  disabled?: boolean;
  inputHistory?: string[];
  historyIndex?: number;
  onResetHistoryIndex?: () => void;
  onClearHistory?: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onNavigateHistory,
  onExportChat,
  disabled = false,
  inputHistory = [],
  historyIndex = -1,
  onResetHistoryIndex,
  onClearHistory,
}) => {
  const [message, setMessage] = useState("");
  const [showHistoryTooltip, setShowHistoryTooltip] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported: speechSupported,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "ArrowUp" && !e.shiftKey && message === "") {
      e.preventDefault();
      const historyMessage = onNavigateHistory("up");
      setMessage(historyMessage);
      setShowHistoryTooltip(true);
      setTimeout(() => setShowHistoryTooltip(false), 2000);
    } else if (e.key === "ArrowDown" && !e.shiftKey && message === "") {
      e.preventDefault();
      const historyMessage = onNavigateHistory("down");
      setMessage(historyMessage);
      setShowHistoryTooltip(true);
      setTimeout(() => setShowHistoryTooltip(false), 2000);
    } else if (e.key === "Escape") {
      // Clear current input and reset history navigation
      setMessage("");
      onResetHistoryIndex?.();
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Reset history index when user starts typing
    if (historyIndex >= 0) {
      onResetHistoryIndex?.();
    }
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleClearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to clear your input history? This cannot be undone."
      )
    ) {
      onClearHistory?.();
    }
  };

  return (
    <div className="border-t bg-gradient-to-t from-white/80 to-white/20 dark:from-gray-900/80 dark:to-gray-900/20 backdrop-blur-sm p-4 pt-6 rounded-2xl border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <Button
          variant="ghost"
          size="sm"
          icon={Download}
          onClick={onExportChat}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Export
        </Button>

        {speechSupported && (
          <Button
            variant="ghost"
            size="sm"
            icon={isListening ? MicOff : Mic}
            onClick={toggleVoiceInput}
            className={`${
              isListening
                ? "text-red-500 hover:text-red-600"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {isListening ? "Stop" : "Voice"}
          </Button>
        )}

        {inputHistory.length > 0 && (
          <>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                icon={History}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onMouseEnter={() => setShowHistoryTooltip(true)}
                onMouseLeave={() => setShowHistoryTooltip(false)}
              >
                History ({inputHistory.length})
              </Button>

              {showHistoryTooltip && (
                <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
                  Use ↑↓ arrows to navigate history
                  <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={handleClearHistory}
              className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              title="Clear input history"
            >
              Clear
            </Button>
          </>
        )}

        {historyIndex >= 0 && (
          <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
            History {historyIndex + 1}/{inputHistory.length}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (↑↓ for history, Enter to send, Shift+Enter for new line, Esc to clear)"
            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white max-h-30"
            rows={1}
            disabled={disabled}
          />
          {isListening && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-500">Listening...</span>
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          icon={Send}
          disabled={!message.trim() || disabled}
          className="self-end mb-[13px]"
        >
          Send
        </Button>
      </form>

      {inputHistory.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          💡 Tip: Use ↑↓ arrow keys when input is empty to browse your message
          history
        </div>
      )}
    </div>
  );
};
