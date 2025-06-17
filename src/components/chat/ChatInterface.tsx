import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { PromptTemplates } from "./PromptTemplates";
import { Sidebar } from "../layout/Sidebar";
import { exportChatAsJSON } from "../../utils/chatExport";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Menu,  } from "lucide-react";

export const ChatInterface: React.FC = () => {
  const {
    messages,
    inputHistory,
    historyIndex,
    sendMessage,
    navigateHistory,
    resetHistoryIndex,
    clearMessages,
    clearHistory,
    isGenerating,
  } = useChat();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
    setShowQuickPrompts(false);
  };

  const handleSelectTemplate = (prompt: string) => {
    sendMessage(prompt);
    setShowQuickPrompts(false);
  };

  const handleSelectHistoryItem = (message: string) => {
    sendMessage(message);
  };

  const handleExportChat = () => {
    if (messages.length > 0) {
      exportChatAsJSON(messages);
    }
  };

  const handleNewChat = () => {
    clearMessages();
    setShowQuickPrompts(true);
  };

  // Close mobile sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md lg:hidden"
      >
        <Menu className="text-gray-600 dark:text-gray-300" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 h-full z-40 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-64 z-50 bg-white dark:bg-gray-800 shadow-xl lg:hidden"
            >
              <Sidebar
                messages={messages}
                inputHistory={inputHistory}
                onSelectHistoryItem={handleSelectHistoryItem}
                onExportChat={handleExportChat}
                onClearMessages={clearMessages}
                onClearHistory={clearHistory}
                isCollapsed={false}
                onToggleCollapse={() => setIsMobileSidebarOpen(false)}
                onNewChat={handleNewChat}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          messages={messages}
          inputHistory={inputHistory}
          onSelectHistoryItem={handleSelectHistoryItem}
          onExportChat={handleExportChat}
          onClearMessages={clearMessages}
          onClearHistory={clearHistory}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onNewChat={handleNewChat}
        />
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col h-full lg:ml-0`}>
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronLeft className="text-gray-600 dark:text-gray-300" />
              )}
            </button> */}
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {messages.length > 0 ? "Chat" : "New Chat"}
            </h1>
          </div>
          <button
            onClick={handleNewChat}
            className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Plus />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 pb-24">
          <MessageList messages={messages} />
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <AnimatePresence>
          {showQuickPrompts && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="px-4 pb-4"
            >
              <PromptTemplates onSelectTemplate={handleSelectTemplate} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Input Area */}
        <div className="sticky bottom-0 z-10 rounded-xl mx-[50px] ">
          <div className="max-w-4xl mx-auto rounded-xl  ">
            <MessageInput
              onSendMessage={handleSendMessage}
              onNavigateHistory={navigateHistory}
              onExportChat={handleExportChat}
              inputHistory={inputHistory}
              historyIndex={historyIndex}
              onResetHistoryIndex={resetHistoryIndex}
              onClearHistory={clearHistory}
              disabled={isGenerating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
