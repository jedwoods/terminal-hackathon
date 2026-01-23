

# High School Programming Contest Website - Hacker Terminal Theme

## Overview

I'll create an immersive hacker-themed website for a high school programming contest. The site will look and feel like a classic computer terminal with green text on a black background. Content will be revealed character-by-character as the user presses keys, creating a "typing" effect. Pressing Tab will instantly reveal all content.

## Design Concept

```text
┌──────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════╗  │
│  ║  > HACKATHON 2026 - HIGH SCHOOL PROGRAMMING CONTEST       ║  │
│  ║  > LOADING SYSTEM...                                      ║  │
│  ║  > PRESS ANY KEY TO CONTINUE...                           ║  │
│  ║  > [TAB] TO SKIP                                          ║  │
│  ║                                                           ║  │
│  ║  ████████████████████████████                             ║  │
│  ║                                                           ║  │
│  ║  [STUDENT REGISTRATION]  [COACH REGISTRATION]             ║  │
│  ╚═══════════════════════════════════════════════════════════╝  │
└──────────────────────────────────────────────────────────────────┘
```

## Features

1. **Terminal-Style Interface**
   - Black background with green monospace text (classic hacker aesthetic)
   - Blinking cursor animation
   - CRT scanline effect overlay for authenticity
   - Terminal window frame with fake menu bar

2. **Interactive Typing Reveal**
   - Content reveals one character at a time on each keypress
   - Tab key instantly reveals all remaining content
   - Keyboard sound effects (optional, can be toggled)

3. **Contest Information Sections**
   - Welcome/intro message
   - Contest date and location
   - Rules and format
   - Prizes
   - Schedule
   - FAQ

4. **Registration Links**
   - Student registration link (styled as terminal command)
   - Coach registration link (styled as terminal command)

---

## Technical Details

### New Files to Create

| File | Purpose |
|------|---------|
| `src/pages/Index.tsx` | Main terminal interface with typing reveal logic |
| `src/components/Terminal.tsx` | Terminal window container component |
| `src/components/TerminalLine.tsx` | Individual line with typing animation |
| `src/components/TerminalCursor.tsx` | Blinking cursor component |
| `src/components/TerminalLink.tsx` | Styled terminal-style links |
| `src/hooks/useTypingReveal.ts` | Custom hook managing the typing reveal state |

### Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Add terminal theme colors, CRT effects, and custom fonts |
| `tailwind.config.ts` | Add custom terminal colors and animations |

### Implementation Approach

1. **Typing Reveal Hook (`useTypingReveal`):**
   - Tracks which character index is currently visible
   - Listens for keypress events globally
   - Increments visible index on each keypress
   - Reveals all on Tab key

2. **Terminal Component Structure:**
   - Container with terminal styling (border, header bar)
   - Scroll area for content
   - Lines render with text truncated to current reveal index

3. **Theme Colors (HSL format for Tailwind):**
   - Background: Deep black (`0 0% 5%`)
   - Primary text: Phosphor green (`120 100% 50%`)
   - Accent: Bright cyan (`180 100% 50%`)
   - Dim text: Dark green (`120 50% 30%`)

4. **Animations:**
   - Blinking cursor (CSS keyframes)
   - CRT flicker effect (subtle)
   - Scanline overlay (CSS pseudo-elements)
   - Text glow effect

### Content Structure

The terminal will display the following information in sequence:

```
> INITIALIZING HACKATHON SYSTEM v2.0.26...
> CONNECTION ESTABLISHED

████████████████████████████████████████████████
█   HIGH SCHOOL PROGRAMMING CONTEST 2026      █
█           "HACK THE FUTURE"                  █
████████████████████████████████████████████████

> DATE: March 15, 2026
> LOCATION: Central High School Auditorium
> CHECK-IN: 8:00 AM | COMPETITION: 9:00 AM - 4:00 PM

> CONTEST FORMAT:
  - Teams of 1-3 students
  - 5 programming challenges
  - Languages: Python, Java, C++, JavaScript
  - 5 hours to solve as many as possible

> PRIZES:
  [1ST PLACE] $500 + Trophies
  [2ND PLACE] $300 + Medals
  [3RD PLACE] $150 + Medals
  [BEST NEWCOMER] $100 Special Award

> COMMANDS AVAILABLE:
  [STUDENT_REGISTER] - Register as a contestant
  [COACH_REGISTER] - Register as a team coach
  [RULES] - View complete rulebook
  [FAQ] - Frequently asked questions

> TYPE A COMMAND OR PRESS ANY KEY TO CONTINUE...
```

### Registration Links

Links will be styled as terminal commands that users can click:
- Student Registration: `/register/student` (placeholder page)
- Coach Registration: `/register/coach` (placeholder page)

These will be simple forms or could link to external registration systems.

---

## Implementation Steps

1. **Update theme and styling**
   - Modify `src/index.css` with terminal theme CSS variables
   - Add monospace font import (JetBrains Mono or similar)
   - Add CRT effect styles and animations
   - Update `tailwind.config.ts` with terminal colors

2. **Create typing reveal hook**
   - Build `useTypingReveal.ts` with keypress detection
   - Handle Tab key for instant reveal
   - Manage reveal state

3. **Build terminal components**
   - Create `Terminal.tsx` container
   - Create `TerminalLine.tsx` for animated text
   - Create `TerminalCursor.tsx` for blinking cursor
   - Create `TerminalLink.tsx` for clickable commands

4. **Build main page**
   - Rewrite `Index.tsx` with terminal layout
   - Add all contest content
   - Wire up typing reveal functionality

5. **Add registration pages**
   - Create `/register/student` route and page
   - Create `/register/coach` route and page
   - Style as terminal forms

6. **Polish and effects**
   - Add scanline overlay
   - Add subtle screen flicker
   - Add text glow effects
   - Ensure mobile responsiveness

