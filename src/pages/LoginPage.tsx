import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { MessageSquare } from 'lucide-react';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Chat
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your intelligent conversation partner
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};