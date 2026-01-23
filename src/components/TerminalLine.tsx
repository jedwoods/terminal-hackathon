import { cn } from '@/lib/utils';
import { TerminalCursor } from './TerminalCursor';

interface TerminalLineProps {
  text: string;
  visibleLength: number;
  startIndex: number;
  isLastVisible?: boolean;
  className?: string;
  prefix?: string;
}

export const TerminalLine = ({
  text,
  visibleLength,
  startIndex,
  isLastVisible = false,
  className,
  prefix = '',
}: TerminalLineProps) => {
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
    <div className={cn('text-glow whitespace-pre-wrap', className)}>
      <span className="text-foreground">{visibleText}</span>
      {isLastVisible && visibleChars < fullText.length && <TerminalCursor />}
    </div>
  );
};

// Helper component for ASCII art blocks
interface TerminalBlockProps {
  lines: string[];
  visibleLength: number;
  startIndex: number;
  className?: string;
}

export const TerminalBlock = ({
  lines,
  visibleLength,
  startIndex,
  className,
}: TerminalBlockProps) => {
  let currentIndex = startIndex;

  return (
    <div className={cn('my-2', className)}>
      {lines.map((line, idx) => {
        const lineStart = currentIndex;
        currentIndex += line.length + 1; // +1 for newline
        
        const isVisible = visibleLength > lineStart;
        if (!isVisible) return null;

        return (
          <TerminalLine
            key={idx}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={visibleLength < currentIndex && visibleLength >= lineStart}
          />
        );
      })}
    </div>
  );
};
