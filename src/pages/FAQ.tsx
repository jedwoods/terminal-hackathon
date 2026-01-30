import { useMemo } from 'react';
import { Terminal } from '@/components/Terminal';
import { TerminalLine } from '@/components/TerminalLine';
import { TerminalCursor } from '@/components/TerminalCursor';
import { TerminalLink } from '@/components/TerminalLink';
import { useTypingReveal } from '@/hooks/useTypingReveal';

// FAQ content structure
const CONTENT = {
  intro: [
    '> INITIALIZING FAQ DATABASE...',
    '> LOADING FREQUENTLY ASKED QUESTIONS...',
    '> SYSTEM READY',
    '',
  ],
  header: [
    '> FAQ (FREQUENTLY ASKED QUESTIONS)',
    '',
  ],
  q1: [
    '> Q: What time should teams arrive on campus and where exactly is check-in?',
    '> A: Teams need to be checked in by 8:50am. Please arrive by 8:30 or 8:40am,',
    '>    if possible. The check-in is near the Varsity Theater inside the',
    '>    Wilkinson Student Center on BYU campus. It\'s located right next door',
    '>    to the Jamba Juice, ask anyone in the building they should be able to',
    '>    point you there (it\'s one level above the ground if you\'re coming in',
    '>    from the traffic circle (see below)).',
    '',
  ],
  q2: [
    '> Q: How does transportation and parking work for this event?',
    '> A: If you have a bus, the bus can drop you and your students off at the',
    '>    traffic circle near the Wilkinson Student Center and the bus can then',
    '>    park in the parking lot east of the BYU stadium.',
    '',
  ],
  q3: [
    '> Q: Is there a recommended location for students, chaperones, and coaches',
    '>    to meet upon arrival?',
    '> A: Either by the traffic circle or at the registration desk outside the',
    '>    Varsity Theater (near the Jamba Juice).',
    '',
  ],
  q4: [
    '> Q: What platform will be used for the contest?',
    '> A: While HackerRank has been used for our recent contests (HSPC23 and',
    '>    HSPC24), we will be using Kattis as a platform this year. We will',
    '>    provide practice contests on Kattis during the two weeks prior to the',
    '>    HSPC 2025 contest.',
    '>    One key difference is that Kattis does not have an integrated IDE.',
    '>    If the laptop you bring does not already have an installed editor such',
    '>    as VS Code, IntelliJ, or PyCharm, we recommend an online IDE such as',
    '>    OneCompiler or Ideone.',
    '',
  ],
  q5: [
    '> Q: What kind of computers or devices will be provided, or do students',
    '>    need to bring their own?',
    '> A: Each team of 1-3 students will need its own laptop that can be',
    '>    connected to wifi via the eduroam network. It could be a student\'s',
    '>    laptop or one from your school.',
    '',
  ],
  q6: [
    '> Q: What programming languages and IDEs will be available/allowed? Will',
    '>    any template code be provided?',
    '> A: Whatever IDE (installed or web-based) the students wish to use should',
    '>    be okay. The languages that will be officially supported are C++,',
    '>    Java, and Python. Others *may* be available, but those 3 are the only',
    '>    ones we will have tested solutions and their timing for.',
    '>    We will provide templates for each of the contest problems that reads',
    '>    the problem\'s input and helps produce the output. Templates will only',
    '>    be provided in C++, Java and Python.',
    '',
  ],
  q7: [
    '> Q: Will students be allowed to bring personal notes, printed code, or',
    '>    reference sheets?',
    '> A: Yes, students can bring whatever they want in terms of printed',
    '>    material. They will not be allowed to use any electronic resources.',
    '',
  ],
  q8: [
    '> Q: How is the competition scored? Is it based on the number of problems',
    '>    solved or time-based?',
    '> A: The competition will be scored using ICPC scoring -- teams are ranked',
    '>    by number of problems solved with ties broken by time penalty. Time',
    '>    penalty is the sum of the times for all solved problems *plus* a',
    '>    20-minute penalty for each incorrect (wrong answer, time limit',
    '>    exceeded, etc) submission on those problems.',
    '>    For example, suppose that Team 1 solved 2 problems, the first 17',
    '>    minutes into the contest and the second 39 minutes into the contest',
    '>    (but with 2 incorrect submissions before the correct one). Team 1\'s',
    '>    penalty time would be 17 + 39 + 2*20 = 96 mins of penalty time.',
    '>    Team 2 solved two problems as well, the first at 21 minutes (with',
    '>    one incorrect submission) and the second at 47 minutes. Suppose Team 2',
    '>    had 3 incorrect tries on a third problem. Team 2 would have',
    '>    21 + 47 + 1*20 = 88 mins of penalty time. The incorrect tries on the',
    '>    third problem don\'t count *until* that problem is solved.',
    '',
  ],
  q9: [
    '> Q: Will students receive problem sets in printed form, digitally, or both?',
    '> A: Each student will receive a printed copy of the problem set. They will',
    '>    also be available digitally on the single laptop that each team',
    '>    (of 1-3 students) is using.',
    '',
  ],
  footer: [
    '',
    '> Additional Questions? Email info@byuhspc.org',
    '',
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

const FAQ = () => {
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
  const headerStart = getNextIndex(CONTENT.header);
  const q1Start = getNextIndex(CONTENT.q1);
  const q2Start = getNextIndex(CONTENT.q2);
  const q3Start = getNextIndex(CONTENT.q3);
  const q4Start = getNextIndex(CONTENT.q4);
  const q5Start = getNextIndex(CONTENT.q5);
  const q6Start = getNextIndex(CONTENT.q6);
  const q7Start = getNextIndex(CONTENT.q7);
  const q8Start = getNextIndex(CONTENT.q8);
  const q9Start = getNextIndex(CONTENT.q9);
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

  const renderSection = (sectionKey: keyof typeof CONTENT, startIndex: number, sectionName: string) => {
    const section = CONTENT[sectionKey];
    return section.map((line, idx) => {
      const lineStart = startIndex + section.slice(0, idx).reduce((sum, l) => sum + l.length + 1, 0);
      return (
        <TerminalLine
          key={`${sectionName}-${idx}`}
          text={line}
          visibleLength={visibleLength}
          startIndex={lineStart}
          isLastVisible={lastVisibleStart === lineStart}
          className={line.includes('Q:') ? 'text-accent' : line.includes('FAQ') ? 'text-accent' : ''}
        />
      );
    });
  };

  return (
    <>
      {/* Fixed Home Button at Top */}
      <div className="fixed top-4 left-4 z-50">
        <div className="text-glow">
          {'> '}
          <TerminalLink to="/">[HOME]</TerminalLink>
          {' - Return to main page'}
        </div>
      </div>

      <Terminal>
        {/* Intro Section */}
        {renderSection('intro', introStart, 'intro')}

      {/* Header Section */}
      {renderSection('header', headerStart, 'header')}

      {/* Q1 Section */}
      {renderSection('q1', q1Start, 'q1')}

      {/* Q2 Section */}
      {renderSection('q2', q2Start, 'q2')}

      {/* Q3 Section */}
      {renderSection('q3', q3Start, 'q3')}

      {/* Q4 Section */}
      {renderSection('q4', q4Start, 'q4')}

      {/* Q5 Section */}
      {renderSection('q5', q5Start, 'q5')}

      {/* Q6 Section */}
      {renderSection('q6', q6Start, 'q6')}

      {/* Q7 Section */}
      {renderSection('q7', q7Start, 'q7')}

      {/* Q8 Section */}
      {renderSection('q8', q8Start, 'q8')}

      {/* Q9 Section */}
      {renderSection('q9', q9Start, 'q9')}

      {/* Footer Section */}
      {renderSection('footer', footerStart, 'footer')}

      {/* Email Link - show when footer section is visible */}
      {visibleLength > footerStart + CONTENT.footer.slice(0, -1).reduce((sum, l) => sum + l.length + 1, 0) && (
        <div className="text-glow my-2">
          {'  > '}
          <a
            href="mailto:info@byuhspc.org"
            className="text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-150 px-1 text-glow focus:outline-none focus:ring-2 focus:ring-accent"
          >
            [EMAIL]
          </a>
          {' - Contact us at info@byuhspc.org'}
        </div>
      )}

      {/* Show blinking cursor at the end when complete */}
      {isComplete && (
        <div className="mt-4 text-glow">
          {'> '}
          <TerminalCursor />
        </div>
      )}
    </Terminal>
    </>
  );
};

export default FAQ;
