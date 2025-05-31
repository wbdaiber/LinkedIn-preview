import { useState, useCallback } from 'react';

export function useClipboard() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsSuccess(true);
      setError(null);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      
      return true;
    } catch (err) {
      const errorMessage = 'Failed to copy to clipboard';
      setError(errorMessage);
      setIsSuccess(false);
      
      // Reset error state after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
      
      console.error('Clipboard copy failed:', err);
      return false;
    }
  }, []);

  return {
    copyToClipboard,
    isSuccess,
    error
  };
}
