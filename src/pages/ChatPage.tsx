import React from 'react';
import { Header } from '../components/layout/Header';
import { ChatInterface } from '../components/chat/ChatInterface';

export const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 flex min-h-0">
        <div className="flex-1 bg-white dark:bg-gray-800 shadow-sm border-x border-gray-200 dark:border-gray-700 flex">
          <ChatInterface />
        </div>
      </main>
    </div>
  );
};