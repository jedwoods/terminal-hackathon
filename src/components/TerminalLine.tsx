import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { TerminalCursor } from './TerminalCursor';

interface TerminalLineProps {
  text: string;
  visibleLength: number;
  startIndex: number;
  isLastVisible?: boolean;
  className?: string;
  prefix?: string;
  tight?: boolean;
  /** Use for ASCII art - prevents wrapping so lines stay aligned cross-platform */
  noWrap?: boolean;
}

export const TerminalLine = forwardRef<HTMLDivElement, TerminalLineProps>(function TerminalLine(
  {
    text,
    visibleLength,
    startIndex,
    isLastVisible = false,
    className,
    prefix = '',
    tight = false,
    noWrap = false,
  },
  ref
) {
  const fullText = prefix + text;
  const endIndex = startIndex + fullText.length;

  // Calculate how much of this line is visible
  const visibleChars = Math.max(0, Math.min(visibleLength - startIndex, fullText.length));
  const visibleText = fullText.slice(0, visibleChars);

  // Don't render if nothing is visible yet
  if (visibleChars <= 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'text-glow',
        noWrap ? 'whitespace-pre' : 'whitespace-pre-wrap',
        tight ? 'min-h-0 leading-[1.15]' : 'min-h-[1.5em] leading-7',
        className
      )}
    >
      <span className="text-foreground">{visibleText}</span>
      {isLastVisible && visibleChars < fullText.length && <TerminalCursor />}
    </div>
  );
});

// Helper component for ASCII art blocks
interface TerminalBlockProps {
  lines: string[];
  visibleLength: number;
  startIndex: number;
  className?: string;
  tight?: boolean;
  scrollTargetRef?: React.RefObject<HTMLDivElement | null>;
}

export const TerminalBlock = ({
  lines,
  visibleLength,
  startIndex,
  className,
  tight = false,
  scrollTargetRef,
}: TerminalBlockProps) => {
  let currentIndex = startIndex;

  return (
    <div className={cn('my-2', className)}>
      {lines.map((line, idx) => {
        const lineStart = currentIndex;
        currentIndex += line.length + 1; // +1 for newline
        
        const isVisible = visibleLength > lineStart;
        if (!isVisible) return null;

        const isLastVisible = visibleLength < currentIndex && visibleLength >= lineStart;

        return (
          <TerminalLine
            key={idx}
            ref={isLastVisible ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={isLastVisible}
            tight={tight}
            noWrap
          />
        );
      })}
    </div>
  );
};
