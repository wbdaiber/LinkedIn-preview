import { useState, useEffect, useCallback } from 'react';

export interface MessageHistoryItem {
  id: string;
  text: string;
  timestamp: number;
  characterCount: number;
  previewText: string;
}

export function useMessageHistory() {
  const [history, setHistory] = useState<MessageHistoryItem[]>([]);

  // Load history from session storage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('linkedinMessages');
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Failed to load message history:', error);
    }
  }, []);

  const saveToHistory = useCallback((messageText: string) => {
    if (!messageText.trim()) return;

    const historyItem: MessageHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: messageText,
      timestamp: Date.now(),
      characterCount: messageText.length,
      previewText: messageText.substring(0, 58)
    };

    const newHistory = [historyItem, ...history].slice(0, 10); // Keep only last 10 messages
    setHistory(newHistory);

    try {
      sessionStorage.setItem('linkedinMessages', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save message history:', error);
    }
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      sessionStorage.removeItem('linkedinMessages');
    } catch (error) {
      console.error('Failed to clear message history:', error);
    }
  }, []);

  const getRelativeTime = useCallback((timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }, []);

  return {
    history,
    saveToHistory,
    clearHistory,
    getRelativeTime
  };
}
