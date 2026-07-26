# Implementation Plan: Events Section Transformation

## Overview

This implementation plan transforms the existing SkillsSection component into an EventsSection component that displays chronological professional journey events (hackathons, competitions, project milestones, seminars, awards) in a visually engaging timeline format. The implementation leverages existing portfolio infrastructure (AnimatedSection wrapper, LazyImage component, theme system, navigation dock) while introducing new data structures and visual patterns for event presentation.

## Tasks

- [x] 1. Add event data structures to portfolioData.ts
  - Define TypeScript interfaces for Event and EventsContent types
  - Export EVENTS_CONTENT constant with section tagline, title, and subtitle
  - Export EVENTS array with sample event data (minimum 5 events covering all categories)
  - Include required fields: title, date, description, category
  - Include optional fields: location, achievement, tags, links, images
  - Use ISO 8601 date format or human-readable strings
  - Remove SKILLS and SKILLS_CONTENT exports
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 8.1, 8.2, 8.3_

- [x] 2. Create EventsSection component with basic structure
  - [x] 2.1 Create EventsSection.tsx in src/components/sections/
    - Import EVENTS and EVENTS_CONTENT from portfolioData
    - Use section element with id="events" and scroll-mt-16
    - Wrap content in AnimatedSection for scroll-triggered animations
    - Render section header with Calendar icon, title, and subtitle
    - Apply consistent section styling (py-24, max-width, padding)
    - _Requirements: 2.1, 5.2, 6.1, 7.1_

  - [ ]* 2.2 Write unit tests for EventsSection component
    - Test component renders without crashing
    - Test section header displays correct content
    - Test empty state when EVENTS array is empty
    - _Requirements: 2.1, 5.2_

- [x] 3. Implement EventCard component
  - [x] 3.1 Create EventCard sub-component within EventsSection.tsx
    - Accept Event interface as props
    - Render card with white/slate-900 background and border
    - Display category badge with color coding
    - Display event date, title, and description
    - Apply rounded-2xl corners and proper padding
    - Implement hover effects (scale transform, shadow)
    - Use transition-all duration-300 for smooth animations
    - _Requirements: 2.2, 2.3, 3.1, 3.3, 4.3_

  - [ ]* 3.2 Write unit tests for EventCard component
    - Test card renders all required fields correctly
    - Test category badge displays with correct color
    - Test hover effects apply correctly
    - Test missing optional fields handled gracefully
    - _Requirements: 2.2, 2.3, 3.1_

- [x] 4. Implement category badge system
  - [x] 4.1 Add category color mapping logic
    - Create categoryColors constant mapping each EventCategory to Tailwind classes
    - Support categories: hackathon, competition, milestone, seminar, award
    - Use distinct color schemes (purple, amber, emerald, blue, rose)
    - Apply theme-aware colors (light and dark mode variants)
    - Render badge with uppercase text and proper spacing
    - _Requirements: 3.1, 3.2, 3.3, 3.5_

  - [ ]* 4.2 Write unit tests for category badge system
    - Test each category renders with correct color classes
    - Test category badge displays in both light and dark mode
    - Test fallback category when category is missing
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 5. Add event interactivity features
  - [x] 5.1 Implement action links within EventCard
    - Render external link button when event.links.external exists
    - Render GitHub link button when event.links.github exists
    - Render certificate link button when event.links.certificate exists
    - Add proper aria-labels for accessibility
    - Use target="_blank" and rel="noopener noreferrer" for external links
    - Apply hover effects (scale, background color change)
    - Add link icons (ExternalLink, Github from lucide-react)
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 7.2, 7.5_

  - [ ]* 5.2 Write unit tests for event interactivity
    - Test external links render when present
    - Test GitHub links render when present
    - Test certificate links render when present
    - Test links do not render when absent
    - Test proper target and rel attributes
    - _Requirements: 4.1, 4.2, 4.5_

- [x] 6. Implement optional event details
  - [x] 6.1 Add support for location, achievement, tags, and images
    - Display location text when event.location exists
    - Display achievement badge when event.achievement exists
    - Render tag pills when event.tags array exists
    - Use LazyImage component for event.images when present
    - Apply consistent styling matching Projects section patterns
    - _Requirements: 1.3, 2.3, 4.4, 10.1, 10.3_

  - [ ]* 6.2 Write unit tests for optional event details
    - Test location displays when present
    - Test achievement displays when present
    - Test tags render as pills when present
    - Test images lazy load when present
    - Test component handles missing optional fields
    - _Requirements: 1.3, 2.3, 4.4_

- [x] 7. Implement responsive grid layout
  - [x] 7.1 Add responsive grid with mobile-first approach
    - Use single-column layout on mobile (default)
    - Use two-column grid on tablet (md:grid-cols-2)
    - Use three-column grid on desktop (lg:grid-cols-3)
    - Apply proper gap spacing (gap-6 mobile, gap-8 desktop)
    - Ensure cards maintain aspect ratio across breakpoints
    - Sort events in reverse chronological order (newest first)
    - _Requirements: 2.1, 2.4, 9.1, 9.2, 9.3, 9.4_

  - [ ]* 7.2 Write unit tests for responsive layout
    - Test grid applies correct column classes
    - Test events sort in reverse chronological order
    - Test responsive spacing applies correctly
    - _Requirements: 2.1, 2.4, 9.1, 9.2, 9.3_

- [x] 8. Checkpoint - Ensure EventsSection renders correctly
  - Test EventsSection component in isolation
  - Verify all event data displays correctly
  - Verify responsive grid works at all breakpoints
  - Verify theme switching (light/dark mode)
  - Verify hover animations work smoothly
  - Verify all links open correctly
  - Ensure all tests pass, ask the user if questions arise

- [ ] 9. Update navigation dock integration
  - [x] 9.1 Update FloatingDock.tsx for events section
    - Import Calendar icon from lucide-react
    - Replace 'skills' with 'events' in sections array
    - Update navLabels object: events: 'events'
    - Update icon rendering to use Calendar icon for events section
    - Remove Cpu icon reference for skills
    - _Requirements: 5.3, 5.4_

  - [ ]* 9.2 Write integration tests for navigation
    - Test FloatingDock renders events navigation item
    - Test clicking events item scrolls to correct section
    - Test Calendar icon displays for events section
    - _Requirements: 5.3, 5.4_

- [ ] 10. Integrate EventsSection into App.tsx
  - [x] 10.1 Update App.tsx component tree
    - Import EventsSection component
    - Replace SkillsSection import with EventsSection
    - Replace <SkillsSection /> with <EventsSection /> in JSX
    - Update sections array in scroll handler: replace 'skills' with 'events'
    - Maintain component position (after ProjectsSection, before CertificationsSection)
    - _Requirements: 5.1, 5.5_

  - [ ]* 10.2 Write integration tests for App.tsx
    - Test EventsSection renders in correct position
    - Test scroll detection recognizes 'events' section
    - Test activeSection state updates when scrolling to events
    - _Requirements: 5.1, 5.5_

- [x] 11. Implement scroll animations
  - [x] 11.1 Add AnimatedSection wrappers with staggered delays
    - Wrap section header with AnimatedSection (direction="up")
    - Wrap events grid with AnimatedSection (direction="up", delay=100)
    - Apply alternating directions for event cards (left/right based on index)
    - Use staggered delays for card entrance (index * 100ms)
    - Ensure animation timing matches other sections
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 11.2 Write unit tests for scroll animations
    - Test AnimatedSection wrapper applies to section header
    - Test AnimatedSection wrapper applies to events grid
    - Test staggered animation delays for cards
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 12. Implement accessibility features
  - [x] 12.1 Add semantic HTML and ARIA attributes
    - Use semantic <section> element with descriptive id
    - Use proper heading hierarchy (h2 for section title, h3 for event titles)
    - Add aria-label attributes to all action links
    - Add alt text to LazyImage components
    - Ensure keyboard navigation works for all interactive elements
    - Test with keyboard-only navigation
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 12.2 Write accessibility tests
    - Test section uses semantic HTML elements
    - Test proper heading hierarchy
    - Test aria-labels present on links
    - Test image alt text present
    - Test keyboard focus order
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 13. Clean up and remove SkillsSection
  - [x] 13.1 Remove SkillsSection component and data
    - Delete src/components/sections/SkillsSection.tsx file
    - Verify no remaining imports of SkillsSection in codebase
    - Verify SKILLS and SKILLS_CONTENT removed from portfolioData.ts
    - Run grep search to ensure no references remain
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [ ]* 13.2 Write migration validation tests
    - Test SkillsSection component no longer exists
    - Test SKILLS export no longer exists in portfolioData
    - Test SKILLS_CONTENT export no longer exists in portfolioData
    - Test no broken imports in codebase
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 14. Final checkpoint - End-to-end testing and validation
  - Test complete user flow: navigation → scroll → interaction
  - Test responsive design at mobile, tablet, desktop breakpoints
  - Test light and dark mode theming
  - Test all event links (external, GitHub, certificates)
  - Test scroll-triggered animations
  - Test keyboard navigation and accessibility
  - Run performance audit (Lighthouse or similar)
  - Verify all unit and integration tests pass
  - Ensure all tests pass, ask the user if questions arise

## Task Dependency Graph

```json
{
  "waves": [
    ["9.1 Update FloatingDock.tsx for events section", "10.1 Update App.tsx component tree"],
    ["13.1 Remove SkillsSection component and data"],
    ["14. Final checkpoint - End-to-end testing and validation"]
  ]
}
```

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at critical milestones
- The implementation reuses existing components (AnimatedSection, LazyImage, Icons) to minimize development effort
- TypeScript interfaces ensure type safety throughout the codebase
- Category color mapping uses theme-aware Tailwind classes for light/dark mode support
- Event sorting is handled at render time to maintain data structure simplicity
- Empty state handling provides graceful fallback when no events are present
- Link validation prevents navigation for improperly formatted URLs
