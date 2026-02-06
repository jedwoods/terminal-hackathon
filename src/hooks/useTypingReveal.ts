import { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface UseTypingRevealOptions {
  totalLength: number;
  charsPerKeypress?: number;
  /** When true, show all content immediately for all users (e.g. FAQ page) */
  revealAllInitially?: boolean;
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
  revealAllInitially = false,
}: UseTypingRevealOptions): UseTypingRevealReturn => {
  const isMobile = useIsMobile();
  const showAllImmediately = revealAllInitially || isMobile;
  const [visibleLength, setVisibleLength] = useState(showAllImmediately ? totalLength : 0);

  // On mobile or revealAllInitially, show all text immediately
  useEffect(() => {
    if (showAllImmediately) {
      setVisibleLength(totalLength);
    }
  }, [showAllImmediately, totalLength]);

  const isComplete = visibleLength >= totalLength;

  const revealAll = useCallback(() => {
    setVisibleLength(totalLength);
  }, [totalLength]);

  const reset = useCallback(() => {
    setVisibleLength(0);
  }, []);

  useEffect(() => {
    // Skip keypress listener when content is always visible
    if (revealAllInitially) return;

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
  }, [isComplete, totalLength, charsPerKeypress, revealAll, revealAllInitially]);

  return {
    visibleLength,
    isComplete,
    revealAll,
    reset,
  };
};
