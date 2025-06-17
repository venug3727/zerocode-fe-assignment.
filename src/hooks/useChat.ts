import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isGenerating, setIsGenerating] = useState(false);

  const addMessage = useCallback((content: string, sender: 'user' | 'bot') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const addLoadingMessage = useCallback(() => {
    const loadingMessage: ChatMessage = {
      id: 'loading',
      content: '',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    return loadingMessage.id;
  }, []);

  const updateMessage = useCallback((id: string, content: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, content, isLoading: false } : msg
    ));
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    addMessage(content, 'user');
    
    // Add to input history (only if it's different from the last entry)
    setInputHistory(prev => {
      const trimmedContent = content.trim();
      if (prev.length === 0 || prev[0] !== trimmedContent) {
        const newHistory = [trimmedContent, ...prev.filter(item => item !== trimmedContent)];
        return newHistory.slice(0, 100); // Keep last 100 messages
      }
      return prev;
    });
    
    // Reset history index when sending a new message
    setHistoryIndex(-1);

    // Add loading message
    const loadingId = addLoadingMessage();
    setIsGenerating(true);

    // Simulate API call
    try {
      const result = await model.generateContent(content);
      const response = await result.response;
      const text = response.text();
      updateMessage(loadingId, text);
    } catch (error) {
      removeMessage(loadingId);
      addMessage("Sorry, I encountered an error. Please ensure your API key is correct and try again.", 'bot');
    } finally {
      setIsGenerating(false);
    }
  }, [addMessage, addLoadingMessage, updateMessage, removeMessage]);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (inputHistory.length === 0) return '';

    let newIndex = historyIndex;
    
    if (direction === 'up') {
      // Move up in history (towards older messages)
      newIndex = Math.min(historyIndex + 1, inputHistory.length - 1);
    } else {
      // Move down in history (towards newer messages)
      newIndex = Math.max(historyIndex - 1, -1);
    }
    
    setHistoryIndex(newIndex);
    
    // Return the message at the new index, or empty string if at the bottom
    return newIndex >= 0 ? inputHistory[newIndex] : '';
  }, [inputHistory, historyIndex]);

  const resetHistoryIndex = useCallback(() => {
    setHistoryIndex(-1);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const clearHistory = useCallback(() => {
    setInputHistory([]);
    setHistoryIndex(-1);
  }, []);

  return {
    messages,
    inputHistory,
    historyIndex,
    sendMessage,
    navigateHistory,
    resetHistoryIndex,
    clearMessages,
    clearHistory,
    isGenerating
  };
};