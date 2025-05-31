import { useState, useEffect, useCallback } from 'react';
import { MessageHistoryItem } from './useMessageHistory';

export interface AnalyticsData {
  messagesCreated: number;
  averageLength: number;
  previewOptimizedRate: number;
  characterEfficiency: number;
}

export function useAnalytics(history: MessageHistoryItem[]) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    messagesCreated: 0,
    averageLength: 0,
    previewOptimizedRate: 0,
    characterEfficiency: 0
  });

  const calculateAnalytics = useCallback(() => {
    if (history.length === 0) {
      return {
        messagesCreated: 0,
        averageLength: 0,
        previewOptimizedRate: 0,
        characterEfficiency: 0
      };
    }

    const messagesCreated = history.length;
    const totalCharacters = history.reduce((sum, msg) => sum + msg.characterCount, 0);
    const averageLength = Math.round(totalCharacters / messagesCreated);
    
    const previewOptimizedCount = history.filter(msg => msg.characterCount <= 58).length;
    const previewOptimizedRate = Math.round((previewOptimizedCount / messagesCreated) * 100);
    
    const averageUtilization = totalCharacters / (messagesCreated * 400);
    const characterEfficiency = Math.round(averageUtilization * 100);

    return {
      messagesCreated,
      averageLength,
      previewOptimizedRate,
      characterEfficiency
    };
  }, [history]);

  useEffect(() => {
    const newAnalytics = calculateAnalytics();
    setAnalytics(newAnalytics);

    // Save to local storage
    try {
      localStorage.setItem('linkedinAnalytics', JSON.stringify(newAnalytics));
    } catch (error) {
      console.error('Failed to save analytics:', error);
    }
  }, [calculateAnalytics]);

  // Load analytics from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('linkedinAnalytics');
      if (stored) {
        const parsed = JSON.parse(stored);
        setAnalytics(parsed);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  }, []);

  return analytics;
}
