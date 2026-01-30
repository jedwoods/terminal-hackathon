import { cn } from '@/lib/utils';

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Terminal = ({
  children,
  className,
  title = 'HACKATHON_TERMINAL_v2.0.26',
}: TerminalProps) => {
  return (
    <div
      className={cn(
        'terminal-container min-h-screen bg-background flex flex-col',
        className
      )}
    >
      {/* Terminal Header Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full bg-accent" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <span className="flex-1 text-center text-sm text-muted-foreground font-mono">
          {title}
        </span>
        <div className="w-16" /> {/* Spacer for symmetry */}
      </div>

      {/* Press key instructions - at top */}
      <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground text-center">
        PRESS ANY KEY TO CONTINUE | TAB TO SKIP | © 2026 HACKATHON SYSTEMS
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-4xl mx-auto font-mono text-sm md:text-base leading-7 md:leading-8">
          {children}
        </div>
      </div>
    </div>
  );
};
