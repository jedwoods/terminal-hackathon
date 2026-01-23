import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TerminalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const TerminalLink = ({ to, children, className }: TerminalLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'text-accent hover:bg-accent hover:text-accent-foreground',
        'transition-colors duration-150 px-1',
        'text-glow focus:outline-none focus:ring-2 focus:ring-accent',
        className
      )}
    >
      {children}
    </Link>
  );
};
