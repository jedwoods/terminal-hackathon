import { useMemo } from 'react';
import { Terminal } from '@/components/Terminal';
import { TerminalLine, TerminalBlock } from '@/components/TerminalLine';
import { TerminalCursor } from '@/components/TerminalCursor';
import { TerminalLink } from '@/components/TerminalLink';
import { useTypingReveal } from '@/hooks/useTypingReveal';

// Contest content structure
const CONTENT = {
  intro: [
    '> INITIALIZING HACKATHON SYSTEM v2.0.26...',
    '> CONNECTION ESTABLISHED',
    '> SECURE CHANNEL ACTIVE',
    '',
  ],
  banner: [
    '████████████████████████████████████████████████████████████',
    '█                                                          █',
    '█   ██   ██  █████  █████ ██  ██      ████  █████  ████    █',
    '█   ██   ██ ██   ██ ██    ██ ██      ██  ██ ██  ██ ██      █',
    '█   ███████ ███████ ██    ████       ██  ██ ██  ██ ████    █',
    '█   ██   ██ ██   ██ ██    ██ ██      ██  ██ ██  ██ ██      █',
    '█   ██   ██ ██   ██ █████ ██  ██      ████  █████  ████    █',
    '█                                                          █',
    '█        HIGH SCHOOL PROGRAMMING CONTEST 2026              █',
    '█              "HACK THE FUTURE"                           █',
    '█                                                          █',
    '████████████████████████████████████████████████████████████',
  ],
  details: [
    '',
    '> DATE: March 15, 2026',
    '> LOCATION: Central High School Auditorium',
    '> CHECK-IN: 8:00 AM | COMPETITION: 9:00 AM - 4:00 PM',
    '',
  ],
  format: [
    '> CONTEST FORMAT:',
    '  ├─ Teams of 1-3 students',
    '  ├─ 5 programming challenges',
    '  ├─ Languages: Python, Java, C++, JavaScript',
    '  └─ 5 hours to solve as many as possible',
    '',
  ],
  prizes: [
    '> PRIZES:',
    '  [1ST PLACE] ════════ $500 + Trophies',
    '  [2ND PLACE] ════════ $300 + Medals',
    '  [3RD PLACE] ════════ $150 + Medals',
    '  [BEST NEWCOMER] ════ $100 Special Award',
    '',
  ],
  commands: [
    '> COMMANDS AVAILABLE:',
    '',
  ],
  footer: [
    '',
    '> SYSTEM READY. AWAITING INPUT...',
  ],
};

// Calculate total content length
const calculateTotalLength = () => {
  let total = 0;
  Object.values(CONTENT).forEach(section => {
    section.forEach(line => {
      total += line.length + 1;
    });
  });
  return total;
};

const Index = () => {
  const totalLength = useMemo(() => calculateTotalLength(), []);
  const { visibleLength, isComplete } = useTypingReveal({ totalLength, charsPerKeypress: 5 });

  // Track cumulative index for each section
  let currentIndex = 0;

  const getNextIndex = (lines: string[]) => {
    const startIndex = currentIndex;
    lines.forEach(line => {
      currentIndex += line.length + 1;
    });
    return startIndex;
  };

  const introStart = getNextIndex(CONTENT.intro);
  const bannerStart = getNextIndex(CONTENT.banner);
  const detailsStart = getNextIndex(CONTENT.details);
  const formatStart = getNextIndex(CONTENT.format);
  const prizesStart = getNextIndex(CONTENT.prizes);
  const commandsStart = getNextIndex(CONTENT.commands);
  const footerStart = getNextIndex(CONTENT.footer);

  // Calculate if each section should show the cursor
  const findLastVisibleLine = () => {
    let idx = 0;
    const allLines = Object.values(CONTENT).flat();
    for (let i = 0; i < allLines.length; i++) {
      if (visibleLength > idx && visibleLength <= idx + allLines[i].length + 1) {
        return idx;
      }
      idx += allLines[i].length + 1;
    }
    return -1;
  };

  const lastVisibleStart = findLastVisibleLine();

  return (
    <Terminal>
      {/* Intro Section */}
      {CONTENT.intro.map((line, idx) => {
        const lineStart = introStart + CONTENT.intro.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`intro-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('INITIALIZING') ? 'text-accent' : ''}
          />
        );
      })}

      {/* ASCII Banner */}
      {visibleLength > introStart + CONTENT.intro.reduce((sum, l) => sum + l.length + 1, 0) && (
        <div className="my-4 text-xs md:text-sm overflow-x-auto">
          <TerminalBlock
            lines={CONTENT.banner}
            visibleLength={visibleLength}
            startIndex={bannerStart}
            className="text-primary"
          />
        </div>
      )}

      {/* Details Section */}
      {CONTENT.details.map((line, idx) => {
        const lineStart = detailsStart + CONTENT.details.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`details-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
          />
        );
      })}

      {/* Format Section */}
      {CONTENT.format.map((line, idx) => {
        const lineStart = formatStart + CONTENT.format.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`format-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('CONTEST FORMAT') ? 'text-accent' : ''}
          />
        );
      })}

      {/* Prizes Section */}
      {CONTENT.prizes.map((line, idx) => {
        const lineStart = prizesStart + CONTENT.prizes.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`prizes-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('PRIZES') ? 'text-accent' : ''}
          />
        );
      })}

      {/* Commands Section */}
      {CONTENT.commands.map((line, idx) => {
        const lineStart = commandsStart + CONTENT.commands.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`commands-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('COMMANDS') ? 'text-accent' : ''}
          />
        );
      })}

      {/* Interactive Links - show when commands section is visible */}
      {visibleLength > commandsStart + CONTENT.commands.reduce((sum, l) => sum + l.length + 1, 0) && (
        <div className="space-y-2 my-4">
          <div className="text-glow">
            {'  > '}
            <TerminalLink to="/register/student">[STUDENT_REGISTER]</TerminalLink>
            {' - Register as a contestant'}
          </div>
          <div className="text-glow">
            {'  > '}
            <TerminalLink to="/register/coach">[COACH_REGISTER]</TerminalLink>
            {' - Register as a team coach'}
          </div>
          <div className="text-glow text-muted-foreground">
            {'  > [RULES] - View complete rulebook (coming soon)'}
          </div>
          <div className="text-glow text-muted-foreground">
            {'  > [FAQ] - Frequently asked questions (coming soon)'}
          </div>
        </div>
      )}

      {/* Footer Section */}
      {CONTENT.footer.map((line, idx) => {
        const lineStart = footerStart + CONTENT.footer.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`footer-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
          />
        );
      })}

      {/* Show blinking cursor at the end when complete */}
      {isComplete && (
        <div className="mt-4 text-glow">
          {'> '}
          <TerminalCursor />
        </div>
      )}
    </Terminal>
  );
};

export default Index;
