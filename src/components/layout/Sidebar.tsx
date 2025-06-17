import React, { useState } from 'react';
import { 
  History, 
  Settings, 
  MessageSquare, 
  Download, 
  Trash2, 
  User, 
  Moon, 
  Sun, 
  
  Clock,
  Search,
  
  Menu
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { ChatMessage } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface SidebarProps {
  messages: ChatMessage[];
  inputHistory: string[];
  onSelectHistoryItem: (message: string) => void;
  onExportChat: () => void;
  onClearMessages: () => void;
  onClearHistory: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  messages,
  inputHistory,
  onSelectHistoryItem,
  onExportChat,
  onClearMessages,
  onClearHistory,
  isCollapsed,
  onToggleCollapse,
  onNewChat
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'settings' | 'chats'>('history');
  const [searchQuery, setSearchQuery] = useState('');
  const [historyFilter, setHistoryFilter] = useState<'all' | 'recent' | 'long'>('all');
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const filteredHistory = inputHistory.filter(item => {
    const matchesSearch = item.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    switch (historyFilter) {
      case 'recent':
        return inputHistory.indexOf(item) < 10;
      case 'long':
        return item.length > 50;
      default:
        return true;
    }
  });

  const chatSessions = [
    { id: '1', title: 'General Discussion', lastMessage: 'That\'s an interesting question!', timestamp: new Date(), messageCount: messages.length },
    { id: '2', title: 'Code Review Session', lastMessage: 'Let me help you with that code...', timestamp: new Date(Date.now() - 86400000), messageCount: 15 },
    { id: '3', title: 'Learning Session', lastMessage: 'Explain like I\'m 5...', timestamp: new Date(Date.now() - 172800000), messageCount: 8 }
  ];

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all chat data? This will remove all messages and history. This action cannot be undone.')) {
      onClearMessages();
      onClearHistory();
    }
  };

 if (isCollapsed) {
  return (
    <div className="w-16 bg-white dark:bg-gray-800 border-r h-full border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 mr-[10px]">
        <Button
          variant="ghost"
          icon={Menu}
          iconSize={20}  // Explicit size
          size='md'
          onClick={onToggleCollapse}
          className="w-15 h-15 mr-[100px]  "
        />
      </div>
      
      <div className="flex-1 flex flex-col items-center py-4 space-y-4">
        <Button
          variant={activeTab === 'chats' ? 'primary' : 'ghost'}
          size="sm"
          icon={MessageSquare}
          iconSize={20}  // Added for consistency
          onClick={() => setActiveTab('chats')}
          className="w-10 h-10 p-0"
        />
        <Button
          variant={activeTab === 'history' ? 'primary' : 'ghost'}
          size="sm"
          icon={History}
          iconSize={20}  // Added for consistency
          onClick={() => setActiveTab('history')}
          className="w-10 h-10 p-0"
        />
        <Button
          variant={activeTab === 'settings' ? 'primary' : 'ghost'}
          size="sm"
          icon={Settings}
          iconSize={20}  // Added for consistency
          onClick={() => setActiveTab('settings')}
          className="w-10 h-10 p-0"
        />
      </div>
    </div>
  );
}

  return (
    <div className="w-80 bg-white dark:bg-gray-800 h-full border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
    Navigation
  </h2>
  <Button
    variant="ghost"
    size="md"
    icon={Menu}
    iconSize={20}  // Explicit size
    onClick={onToggleCollapse}
  />
</div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'chats'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare size={16} />
            Chats
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <History size={16} />
            History
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chats' && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Chat Sessions
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={MessageSquare}
                  className="text-blue-600 hover:text-blue-700"
                  onClick={onNewChat}
                >
                  New
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {session.title}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {session.messageCount}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-2">
                    {session.lastMessage}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={12} className="mr-1" />
                    {session.timestamp.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Input History ({inputHistory.length})
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Trash2}
                  onClick={onClearHistory}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear
                </Button>
              </div>
              
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Search history..."
                  icon={Search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm"
                />
                
                <div className="flex gap-1">
                  <Button
                    variant={historyFilter === 'all' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setHistoryFilter('all')}
                    className="flex-1 text-xs"
                  >
                    All
                  </Button>
                  <Button
                    variant={historyFilter === 'recent' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setHistoryFilter('recent')}
                    className="flex-1 text-xs"
                  >
                    Recent
                  </Button>
                  <Button
                    variant={historyFilter === 'long' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setHistoryFilter('long')}
                    className="flex-1 text-xs"
                  >
                    Long
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {filteredHistory.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <History size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-sm">
                    {searchQuery ? 'No matching history found' : 'No input history yet'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredHistory.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => onSelectHistoryItem(item)}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors group"
                    >
                      <p className="text-sm text-gray-900 dark:text-white line-clamp-3">
                        {item}
                      </p>
                      <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Click to use
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.length} chars
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="h-full overflow-y-auto p-4 space-y-6">
            {/* User Profile */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Profile
              </h3>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Appearance
              </h3>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
                  <span className="text-sm text-gray-900 dark:text-white">
                    {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                >
                  Toggle
                </Button>
              </div>
            </div>

            {/* Chat Settings */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Chat Settings
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-900 dark:text-white">
                    Total Messages
                  </span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {messages.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-900 dark:text-white">
                    History Items
                  </span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {inputHistory.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Export & Data Management */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Data Management
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Download}
                  onClick={onExportChat}
                  className="w-full justify-start"
                  disabled={messages.length === 0}
                >
                  Export Chat History
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Trash2}
                  onClick={onClearMessages}
                  className="w-full justify-start text-orange-600 hover:text-orange-700"
                  disabled={messages.length === 0}
                >
                  Clear Messages
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Trash2}
                  onClick={handleClearAllData}
                  className="w-full justify-start text-red-600 hover:text-red-700"
                >
                  Clear All Data
                </Button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="w-full justify-start text-red-600 hover:text-red-700"
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};