import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { LogOut, MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            AI Chat
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Welcome, {user.name}
            </span>
          )}
          <ThemeToggle />
          {user && (
            <Button
              variant="ghost"
              size="sm"
              icon={LogOut}
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};