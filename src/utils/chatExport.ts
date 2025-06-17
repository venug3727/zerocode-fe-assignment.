import { ChatMessage } from '../types';

export const exportChatAsJSON = (messages: ChatMessage[], filename?: string) => {
  const exportData = {
    messages: messages.map(msg => ({
      content: msg.content,
      sender: msg.sender,
      timestamp: msg.timestamp.toISOString()
    })),
    exportedAt: new Date().toISOString(),
    totalMessages: messages.length
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = filename || `chat-export-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const exportChatAsText = (messages: ChatMessage[], filename?: string) => {
  const textContent = messages.map(msg => 
    `[${msg.timestamp.toLocaleString()}] ${msg.sender.toUpperCase()}: ${msg.content}`
  ).join('\n\n');
  
  const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(textContent);
  const exportFileDefaultName = filename || `chat-export-${new Date().toISOString().split('T')[0]}.txt`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};