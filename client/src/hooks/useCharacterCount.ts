import { useState, useCallback } from 'react';

export interface CharacterCountData {
  previewCount: number;
  totalCount: number;
  previewPercentage: number;
  totalPercentage: number;
  previewColor: 'green' | 'yellow' | 'orange' | 'red';
  totalColor: 'green' | 'yellow' | 'orange' | 'red';
  isPreviewOver: boolean;
  isTotalOver: boolean;
}

export function useCharacterCount() {
  const [messageText, setMessageText] = useState('');

  const getCharacterCountData = useCallback((text: string): CharacterCountData => {
    const previewCount = Math.min(text.length, 58);
    const totalCount = text.length;
    const previewPercentage = (previewCount / 58) * 100;
    const totalPercentage = (totalCount / 400) * 100;

    // Preview color logic
    let previewColor: CharacterCountData['previewColor'] = 'green';
    if (previewCount >= 50) previewColor = 'yellow';
    if (previewCount >= 58) previewColor = 'orange';

    // Total color logic
    let totalColor: CharacterCountData['totalColor'] = 'green';
    if (totalCount >= 300) totalColor = 'yellow';
    if (totalCount >= 350) totalColor = 'orange';
    if (totalCount >= 400) totalColor = 'red';

    return {
      previewCount,
      totalCount,
      previewPercentage,
      totalPercentage,
      previewColor,
      totalColor,
      isPreviewOver: previewCount >= 58,
      isTotalOver: totalCount >= 400
    };
  }, []);

  const updateMessage = useCallback((text: string) => {
    // Prevent typing beyond 400 characters
    if (text.length <= 400) {
      setMessageText(text);
    }
  }, []);

  const clearMessage = useCallback(() => {
    setMessageText('');
  }, []);

  const characterData = getCharacterCountData(messageText);

  return {
    messageText,
    updateMessage,
    clearMessage,
    characterData
  };
}
