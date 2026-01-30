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
    '> DATE: Tuesday, April 22nd, 2025',
    '> TIME: 9:00am – 2:30pm',
    '> LOCATION: BYU Wilkinson Student Center (WSC Garden Court)',
    '',
  ],
  schedule: [
    '> SCHEDULE:',
    '  8:00 – 8:50 am   Registration (outside WSC Varsity Theater)',
    '  9:00 – 9:20 am   Opening Ceremony (WSC Varsity Theater)',
    '  9:25 – 9:50 am   Setup/Testing (WSC Garden Court)',
    '  10:00 am – 1:00 pm   Actual Programming Contest (WSC Garden Court)',
    '  1:00 – 1:45 pm   Lunch',
    '  2:00 – 2:30 pm   Results and Awards Ceremony (WSC Varsity Theater)',
    '',
  ],
  format: [
    '> CONTEST FORMAT:',
    '  ├─ Teams of up to 3 students',
    '  ├─ Contest platform: Kattis',
    '  ├─ Languages: Java, Python3, C++, and more',
    '  └─ Duration: 9:00am – 2:30pm',
    '',
  ],
  prizes: [
    '> PRIZES:',
    '  ├─ 1st – 5th Place Teams: Prizes/Gift Cards',
    '  └─ 10+ additional prizes for randomly selected participants',
    '',
  ],
  eligibility: [
    '> ELIGIBILITY:',
    '  Any high school student residing in the state of Utah may participate.',
    '',
  ],
  registration: [
    '> REGISTRATION:',
    '  Registration must be completed by both students and teachers/coaches.',
    '  Deadline: Midnight on Wednesday, April 9th, 2025',
    '',
  ],
  computerSystems: [
    '> COMPUTER SYSTEMS:',
    '  Teams of up to 3 students will need to provide their own laptop',
    '  (just 1 per team) with which they will access the contest platform',
    '  via the internet.',
    '',
  ],
  contestPlatform: [
    '> CONTEST PLATFORM:',
    '  The contest will be conducted on Kattis.',
    '  Kattis supports Linux, MacOS, and Windows operating systems.',
    '  Supported languages include Java, Python3, C++, and more.',
    '  Teams are encouraged to practice on Kattis ahead of the contest.',
    '  Practice problems and templates will be provided two weeks before.',
    '',
  ],
  spectators: [
    '> SPECTATORS:',
    '  Family and friends are invited to watch through the contest leaderboard.',
    '  The leaderboard will be published closer to the contest date.',
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
  const scheduleStart = getNextIndex(CONTENT.schedule);
  const formatStart = getNextIndex(CONTENT.format);
  const prizesStart = getNextIndex(CONTENT.prizes);
  const eligibilityStart = getNextIndex(CONTENT.eligibility);
  const registrationStart = getNextIndex(CONTENT.registration);
  const computerSystemsStart = getNextIndex(CONTENT.computerSystems);
  const contestPlatformStart = getNextIndex(CONTENT.contestPlatform);
  const spectatorsStart = getNextIndex(CONTENT.spectators);
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

      {/* Directions Link - show when details section is visible */}
      {visibleLength > detailsStart + CONTENT.details.reduce((sum, l) => sum + l.length + 1, 0) && (
        <div className="text-glow my-2">
          {'  > '}
          <a
            href="https://map.byu.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-150 px-1 text-glow focus:outline-none focus:ring-2 focus:ring-accent"
          >
            [DIRECTIONS]
          </a>
          {' - Get directions to BYU Wilkinson Student Center'}
        </div>
      )}

      {/* Schedule Section */}
      {CONTENT.schedule.map((line, idx) => {
        const lineStart = scheduleStart + CONTENT.schedule.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`schedule-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('SCHEDULE') ? 'text-accent' : ''}
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

      {/* Eligibility Section */}
      {CONTENT.eligibility.map((line, idx) => {
        const lineStart = eligibilityStart + CONTENT.eligibility.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`eligibility-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('ELIGIBILITY') ? 'text-accent' : ''}
          />
        );
      })}

      {/* Registration Section */}
      {CONTENT.registration.map((line, idx) => {
        const lineStart = registrationStart + CONTENT.registration.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`registration-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('REGISTRATION') ? 'text-accent' : ''}
          />
        );
      })}

      {/* Registration Links - show when registration section is visible */}
      {visibleLength > registrationStart + CONTENT.registration.reduce((sum, l) => sum + l.length + 1, 0) && (
        <div className="space-y-1 my-2">
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
        </div>
      )}

      {/* Computer Systems Section */}
      {CONTENT.computerSystems.map((line, idx) => {
        const lineStart = computerSystemsStart + CONTENT.computerSystems.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`computerSystems-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('COMPUTER SYSTEMS') ? 'text-accent' : ''}
          />
        );
      })}

      {/* Contest Platform Section */}
      {CONTENT.contestPlatform.map((line, idx) => {
        const lineStart = contestPlatformStart + CONTENT.contestPlatform.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`contestPlatform-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('CONTEST PLATFORM') ? 'text-accent' : ''}
          />
        );
      })}

      {/* Kattis Link - show when contest platform section is visible */}
      {visibleLength > contestPlatformStart + CONTENT.contestPlatform.reduce((sum, l) => sum + l.length + 1, 0) && (
        <div className="text-glow my-2">
          {'  > '}
          <a
            href="https://open.kattis.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-150 px-1 text-glow focus:outline-none focus:ring-2 focus:ring-accent"
          >
            [KATTIS_PLATFORM]
          </a>
          {' - Practice on Kattis'}
        </div>
      )}

      {/* Spectators Section */}
      {CONTENT.spectators.map((line, idx) => {
        const lineStart = spectatorsStart + CONTENT.spectators.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`spectators-${idx}`}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('SPECTATORS') ? 'text-accent' : ''}
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
          <div className="text-glow text-muted-foreground">
            {'  > [RULES] - View complete rulebook (coming soon)'}
          </div>
          <div className="text-glow">
            {'  > '}
            <TerminalLink to="/faq">[FAQ]</TerminalLink>
            {' - Frequently asked questions'}
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
