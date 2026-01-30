import { useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal } from '@/components/Terminal';
import { TerminalLine, TerminalBlock } from '@/components/TerminalLine';
import { TerminalCursor } from '@/components/TerminalCursor';
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
    '██████████████████████████████████████████████',
    '█                                            █',
    '█  ████  █   █ █   █     █   █ ███ ████  ███ █',
    '█  █   █ █   █ █   █     █   █ █   █   █ █   █',
    '█  ████   █ █  █   █     █████ ███ ████  █   █',
    '█  █   █   █   █   █     █   █   █ █     █   █',
    '█  ████    █    ███      █   █ ███ █      ██ █',
    '█                                            █',
    '██████████████████████████████████████████████',
  ],
  details: [
    '',
    '> DATE: Sunday, March 16th, 2025',
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
    '  ├─ 1st – 5th Place Teams: Gift Cards',
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
  sponsors: [
    '',
    '> SPONSORS / ACKNOWLEDGEMENTS:',
    '  If you would like to sponsor this event, please contact info@byuhspc.org',
    '',
  ],
  footer: [
    '',
    '> PROGRAM TERMINATED',
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
  const navigate = useNavigate();
  const scrollTargetRef = useRef<HTMLDivElement | null>(null);
  const totalLength = useMemo(() => calculateTotalLength(), []);
  const { visibleLength } = useTypingReveal({ totalLength, charsPerKeypress: 5 });

  // Scroll to keep the revealed text / cursor in view
  useEffect(() => {
    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [visibleLength]);

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
  const sponsorsStart = getNextIndex(CONTENT.sponsors);
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
      <div className="space-y-6">
      {/* Blinking cursor before any text is revealed */}
      {visibleLength === 0 && (
        <section>
          <div className="text-glow min-h-[1.5em] leading-7">
            {'> '}
            <TerminalCursor />
          </div>
        </section>
      )}

      {/* Intro Section */}
      <section>
      {CONTENT.intro.map((line, idx) => {
        const lineStart = introStart + CONTENT.intro.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`intro-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('INITIALIZING') ? 'text-accent' : ''}
          />
        );
      })}
      </section>

      {/* ASCII Banner */}
      <section>
      {visibleLength > introStart + CONTENT.intro.reduce((sum, l) => sum + l.length + 1, 0) && (
        <div className="my-4 text-xs md:text-sm overflow-x-auto">
          <TerminalBlock
            lines={CONTENT.banner}
            visibleLength={visibleLength}
            startIndex={bannerStart}
            className="text-primary"
            tight
            scrollTargetRef={scrollTargetRef}
          />
        </div>
      )}
      </section>

      {/* Registration Links - below banner */}
      {visibleLength > bannerStart + CONTENT.banner.reduce((sum, l) => sum + l.length + 1, 0) && (
        <section>
          <div className="space-y-2 my-2 leading-7">
            <div className="text-glow">
              {'  > '}
              <a
                href="https://forms.gle/FdP2o9h523yQWDvY6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-150 px-1 text-glow focus:outline-none focus:ring-2 focus:ring-accent"
              >
                [STUDENT_REGISTRATION]
              </a>
              {' - Register as a contestant'}
            </div>
            <div className="text-glow">
              {'  > '}
              <a
                href="https://forms.gle/VD48wXV1qqoMDCUZA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-150 px-1 text-glow focus:outline-none focus:ring-2 focus:ring-accent"
              >
                [COACH_REGISTRATION]
              </a>
              {' - Register as a team coach'}
            </div>
          </div>
        </section>
      )}

      {/* Details Section */}
      <section>
      {CONTENT.details.map((line, idx) => {
        const lineStart = detailsStart + CONTENT.details.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`details-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
          />
        );
      })}

      {/* Directions Link - show when details section is visible */}
      {visibleLength > detailsStart + CONTENT.details.reduce((sum, l) => sum + l.length + 1, 0) && (
        <div className="text-glow my-2 leading-7">
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
      </section>

      {/* Schedule Section */}
      <section>
      {CONTENT.schedule.map((line, idx) => {
        const lineStart = scheduleStart + CONTENT.schedule.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`schedule-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('SCHEDULE') ? 'text-accent' : ''}
          />
        );
      })}
      </section>

      {/* Format Section */}
      <section>
      {CONTENT.format.map((line, idx) => {
        const lineStart = formatStart + CONTENT.format.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`format-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('CONTEST FORMAT') ? 'text-accent' : ''}
          />
        );
      })}
      </section>

      {/* Prizes Section */}
      <section>
      {CONTENT.prizes.map((line, idx) => {
        const lineStart = prizesStart + CONTENT.prizes.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`prizes-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('PRIZES') ? 'text-accent' : ''}
          />
        );
      })}
      </section>

      {/* Eligibility Section */}
      <section>
      {CONTENT.eligibility.map((line, idx) => {
        const lineStart = eligibilityStart + CONTENT.eligibility.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`eligibility-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('ELIGIBILITY') ? 'text-accent' : ''}
          />
        );
      })}
      </section>

      {/* Registration Section */}
      <section>
      {CONTENT.registration.map((line, idx) => {
        const lineStart = registrationStart + CONTENT.registration.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`registration-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('REGISTRATION') ? 'text-accent' : ''}
          />
        );
      })}
      </section>

      {/* Computer Systems Section */}
      <section>
      {CONTENT.computerSystems.map((line, idx) => {
        const lineStart = computerSystemsStart + CONTENT.computerSystems.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`computerSystems-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('COMPUTER SYSTEMS') ? 'text-accent' : ''}
          />
        );
      })}
      </section>

      {/* Contest Platform Section */}
      <section>
      {CONTENT.contestPlatform.map((line, idx) => {
        const lineStart = contestPlatformStart + CONTENT.contestPlatform.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`contestPlatform-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
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
        <div className="text-glow my-2 leading-7">
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
      </section>

      {/* Spectators Section */}
      <section>
      {CONTENT.spectators.map((line, idx) => {
        const lineStart = spectatorsStart + CONTENT.spectators.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`spectators-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('SPECTATORS') ? 'text-accent' : ''}
          />
        );
      })}
      </section>

      {/* Commands Section */}
      <section>
      {CONTENT.commands.map((line, idx) => {
        const lineStart = commandsStart + CONTENT.commands.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`commands-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
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
        <div className="space-y-2 my-4 leading-7">
          <div className="text-glow">
            {'  > '}
            <a
              href="/faq"
              onClick={(e) => {
                e.preventDefault();
                navigate('/faq');
              }}
              className="text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-150 px-1 text-glow focus:outline-none focus:ring-2 focus:ring-accent"
            >
              [FAQ]
            </a>
            {' - Frequently asked questions'}
          </div>
        </div>
      )}
      </section>

      {/* Sponsors Section */}
      <section>
      {CONTENT.sponsors.map((line, idx) => {
        const lineStart = sponsorsStart + CONTENT.sponsors.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`sponsors-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
            className={line.includes('SPONSORS') ? 'text-accent' : ''}
          />
        );
      })}
      </section>

      {/* Footer Section */}
      <section>
      {CONTENT.footer.map((line, idx) => {
        const lineStart = footerStart + CONTENT.footer.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
        return (
          <TerminalLine
            key={`footer-${idx}`}
            ref={lastVisibleStart === lineStart ? scrollTargetRef : undefined}
            text={line}
            visibleLength={visibleLength}
            startIndex={lineStart}
            isLastVisible={lastVisibleStart === lineStart}
          />
        );
      })}
      </section>

      </div>
    </Terminal>
  );
};

export default Index;
