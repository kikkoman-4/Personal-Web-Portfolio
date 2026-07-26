# Implementation Plan: Warm Theme Transformation

## Overview

This implementation plan transforms the portfolio web application from a cool cyan/indigo color palette to a warm orange/amber palette through systematic color replacements across 7 TypeScript React component files. The transformation operates on three levels: Tailwind CSS utility classes, RGBA color values, and CSS gradient definitions. All existing functionality, component structure, animations, and accessibility standards are preserved.

**Scope:** 62 discrete color replacement operations maintaining WCAG AA compliance.

**Testing Strategy:** Snapshot testing + Visual regression testing + Accessibility auditing (no property-based tests required for UI styling transformations).

## Tasks

- [-] 1. Create backup and validation baseline
  - Create git commit of current state before transformation
  - Run TypeScript compiler to ensure clean baseline
  - Capture visual snapshots of all sections for comparison
  - Run accessibility audit to document baseline WCAG compliance
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 2. Transform HeroSection component
  - [~] 2.1 Replace HeroSection color classes and values
    - Replace badge styling: `bg-indigo-950/80 border-indigo-800/50 text-indigo-300` → `bg-orange-950/80 border-orange-800/50 text-orange-300`
    - Replace radial glow: `bg-indigo-600/15` → `bg-orange-600/15`
    - Replace title gradient: `from-indigo-400 via-purple-400 to-pink-400` → `from-orange-400 via-amber-400 to-yellow-400`
    - Replace primary button: `bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30` → `bg-orange-600 hover:bg-orange-500 shadow-orange-600/30`
    - _Requirements: 1.1, 1.2, 1.3, 3.1, 3.4, 4.1, 4.2, 5.3_

  - [ ]* 2.2 Write snapshot tests for HeroSection
    - Test badge color rendering
    - Test title gradient rendering
    - Test primary button styling
    - Test radial glow effect
    - _Requirements: 1.1, 1.2, 1.3, 3.4_

- [ ] 3. Transform EventsSection component
  - [~] 3.1 Replace EventsSection color classes
    - Replace section tagline: `text-indigo-600 dark:text-indigo-400` → `text-orange-600 dark:text-orange-400`
    - Replace card hover effects: `hover:shadow-indigo-500/20 group-hover:text-indigo-300` → `hover:shadow-orange-500/20 group-hover:text-orange-300`
    - Replace "Learn more" text: `text-indigo-300` → `text-orange-300`
    - Replace filter pill gradient: `from-indigo-500 to-blue-500 shadow-indigo-500/25` → `from-orange-500 to-amber-500 shadow-orange-500/25`
    - Replace location icon: `text-indigo-500/70` → `text-orange-500/70`
    - Replace modal button: `text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-950/80` → `text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 hover:bg-orange-100 dark:hover:bg-orange-950/80`
    - _Requirements: 1.1, 1.2, 1.3, 3.2, 4.2, 4.3, 4.4, 7.1_

  - [ ]* 3.2 Write snapshot tests for EventsSection
    - Test section tagline rendering
    - Test card hover states
    - Test filter pill gradients
    - Test modal button styling
    - _Requirements: 7.1, 4.3_

- [ ] 4. Transform CertificationsSection component
  - [~] 4.1 Replace CertificationsSection color classes
    - Replace section tagline: `text-indigo-400 from-indigo-500 to-blue-400` → `text-orange-400 from-orange-500 to-amber-400`
    - Replace active filter: `from-indigo-500 to-blue-500 shadow-indigo-500/25` → `from-orange-500 to-amber-500 shadow-orange-500/25`
    - Replace badge styling: `text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20` → `text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20`
    - Replace selected item: `border-indigo-500/30 from-indigo-500 to-blue-500 shadow-indigo-500/20` → `border-orange-500/30 from-orange-500 to-amber-500 shadow-orange-500/20`
    - Replace icon hover: `group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10` → `group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10`
    - Replace category badge: `bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400` → `bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400`
    - Replace icon accent: `text-indigo-500/70` → `text-orange-500/70`
    - Replace ambient glows: `bg-indigo-600/10 bg-blue-600/10` → `bg-orange-600/10 bg-amber-600/10`
    - _Requirements: 1.1, 1.2, 1.3, 1.6, 1.7, 1.8, 3.2, 6.3, 7.2, 7.3_

  - [ ]* 4.2 Write snapshot tests for CertificationsSection
    - Test filter button gradients
    - Test badge styling
    - Test selected item highlights
    - Test ambient glow effects
    - _Requirements: 7.2, 7.3, 6.3_

- [~] 5. Checkpoint - Verify compilation and core section transformations
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Transform ProjectsSection component
  - [~] 6.1 Replace ProjectsSection color classes
    - Replace section tagline: `text-indigo-600 dark:text-indigo-400` → `text-orange-600 dark:text-orange-400`
    - Replace card title hover: `group-hover:text-indigo-600 dark:group-hover:text-indigo-400` → `group-hover:text-orange-600 dark:group-hover:text-orange-400`
    - Replace card hover shadow: `hover:shadow-indigo-500/10` → `hover:shadow-orange-500/10`
    - Replace demo button: `bg-indigo-600/90 hover:bg-indigo-500 border-indigo-400/30` → `bg-orange-600/90 hover:bg-orange-500 border-orange-400/30`
    - Replace category badge: `text-indigo-300 border-indigo-800/50` → `text-orange-300 border-orange-800/50`
    - Replace "View more" button: `hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:shadow-indigo-500/10` → `hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/60 hover:border-orange-300 dark:hover:border-orange-500/40 hover:shadow-orange-500/10`
    - _Requirements: 1.1, 1.2, 1.3, 4.2, 4.3, 7.4, 7.6_

  - [ ]* 6.2 Write snapshot tests for ProjectsSection
    - Test card hover effects
    - Test demo button styling
    - Test "View more" button states
    - _Requirements: 7.4, 4.3_

- [ ] 7. Transform ContactSection component
  - [~] 7.1 Replace ContactSection color classes
    - Replace section tagline: `text-indigo-600 dark:text-indigo-400` → `text-orange-600 dark:text-orange-400`
    - Replace link hover: `hover:text-indigo-600 dark:hover:text-indigo-400` → `hover:text-orange-600 dark:hover:text-orange-400`
    - Replace input focus: `focus:border-indigo-500` → `focus:border-orange-500`
    - Replace submit button: `bg-indigo-600 hover:bg-indigo-700` → `bg-orange-600 hover:bg-orange-700`
    - _Requirements: 1.1, 1.2, 4.2, 4.3, 4.4, 4.6_

  - [ ]* 7.2 Write snapshot tests for ContactSection
    - Test form input focus states
    - Test submit button styling
    - Test link hover states
    - _Requirements: 4.4, 4.6_

- [ ] 8. Transform AboutSection component
  - [~] 8.1 Replace AboutSection color classes
    - Replace title accent: `text-indigo-600 dark:text-indigo-400` → `text-orange-600 dark:text-orange-400`
    - Replace badge styling: `bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50` → `bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200/60 dark:border-orange-800/50 hover:bg-orange-100 dark:hover:bg-orange-900/50`
    - Replace section icon: `text-indigo-500` → `text-orange-500`
    - Replace language dot: `bg-indigo-500` → `bg-orange-500`
    - Replace README badge: `bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-800/50` → `bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border-orange-200/50 dark:border-orange-800/50`
    - Replace period badge: `text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/50 dark:border-indigo-800/40` → `text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 border-orange-200/50 dark:border-orange-800/40`
    - Replace stat value: `text-indigo-600 dark:text-indigo-400` → `text-orange-600 dark:text-orange-400`
    - Replace stat card hover: `hover:border-indigo-400 dark:hover:border-indigo-500/70 group-hover:text-indigo-500` → `hover:border-orange-400 dark:hover:border-orange-500/70 group-hover:text-orange-500`
    - _Requirements: 1.1, 1.2, 1.3, 4.3, 7.5, 7.6_

  - [ ]* 8.2 Write snapshot tests for AboutSection
    - Test badge styling variations
    - Test stat card hover effects
    - Test icon colors
    - _Requirements: 7.5_

- [ ] 9. Transform FloatingDock component
  - [~] 9.1 Replace FloatingDock color classes and RGBA values
    - Replace active icon color: `text-indigo-400 dark:text-indigo-400` → `text-orange-400 dark:text-orange-400`
    - Replace glow shadow RGBA: `drop-shadow-[0_0_10px_rgba(129,140,248,0.7)]` → `drop-shadow-[0_0_10px_rgba(251,146,60,0.7)]`
    - _Requirements: 1.3, 2.1, 4.5_

  - [ ]* 9.2 Write snapshot tests for FloatingDock
    - Test active icon state rendering
    - Test glow shadow effect
    - _Requirements: 4.5_

- [~] 10. Checkpoint - Verify all component transformations complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Run post-transformation validation suite
  - [~] 11.1 Execute TypeScript compilation check
    - Run `npm run build` or `tsc --noEmit` to verify no compilation errors
    - Fix any TypeScript errors if found
    - _Requirements: 9.1_

  - [~] 11.2 Run visual regression tests
    - Capture post-transformation screenshots of all sections
    - Compare against baseline snapshots
    - Verify only color changes visible (no layout shifts)
    - Document any unexpected visual differences
    - _Requirements: 9.2, 9.3_

  - [~] 11.3 Run accessibility audit
    - Execute axe-core or similar accessibility testing tool
    - Verify WCAG AA contrast ratios maintained (4.5:1 for normal text, 3:1 for large text)
    - Test keyboard navigation and focus ring visibility
    - Ensure no new accessibility violations introduced
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 11.4 Perform manual cross-browser validation
    - Test rendering in Chrome, Firefox, Safari
    - Test responsive behavior on mobile, tablet, desktop viewports
    - Verify hover states, focus states, and transitions
    - Test dark mode color rendering
    - _Requirements: 9.2, 10.1, 10.2, 10.3, 10.4_

- [~] 12. Final checkpoint and documentation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation after key transformation milestones
- Snapshot tests validate visual consistency, not algorithmic correctness
- Accessibility testing validates WCAG AA compliance post-transformation
- All modifications preserve existing component structure, animations, and functionality
- TypeScript compilation check ensures no syntax or type errors introduced

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "4.2"] },
    { "id": 3, "tasks": ["6.1", "7.1", "8.1"] },
    { "id": 4, "tasks": ["6.2", "7.2", "8.2", "9.1"] },
    { "id": 5, "tasks": ["9.2"] },
    { "id": 6, "tasks": ["11.1"] },
    { "id": 7, "tasks": ["11.2", "11.3"] },
    { "id": 8, "tasks": ["11.4"] }
  ]
}
```
