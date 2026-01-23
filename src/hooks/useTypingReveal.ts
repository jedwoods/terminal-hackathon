import { useState, useEffect, useCallback } from 'react';

interface UseTypingRevealOptions {
  totalLength: number;
  charsPerKeypress?: number;
}

interface UseTypingRevealReturn {
  visibleLength: number;
  isComplete: boolean;
  revealAll: () => void;
  reset: () => void;
}

export const useTypingReveal = ({
  totalLength,
  charsPerKeypress = 3,
}: UseTypingRevealOptions): UseTypingRevealReturn => {
  const [visibleLength, setVisibleLength] = useState(0);

  const isComplete = visibleLength >= totalLength;

  const revealAll = useCallback(() => {
    setVisibleLength(totalLength);
  }, [totalLength]);

  const reset = useCallback(() => {
    setVisibleLength(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Tab key reveals all
      if (event.key === 'Tab') {
        event.preventDefault();
        revealAll();
        return;
      }

      // Any other key reveals more characters
      if (!isComplete) {
        setVisibleLength((prev) => Math.min(prev + charsPerKeypress, totalLength));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete, totalLength, charsPerKeypress, revealAll]);

  return {
    visibleLength,
    isComplete,
    revealAll,
    reset,
  };
};
