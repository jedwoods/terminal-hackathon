import { cn } from '@/lib/utils';

interface TerminalCursorProps {
  className?: string;
}

export const TerminalCursor = ({ className }: TerminalCursorProps) => {
  return (
    <span
      className={cn(
        'inline-block w-3 h-5 bg-primary animate-blink ml-0.5 align-middle',
        className
      )}
      aria-hidden="true"
    />
  );
};
