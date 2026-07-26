# Design Document: Events Section Transformation

## Overview

This design document details the transformation of the SkillsSection component into an EventsSection component that displays a chronological timeline of professional journey events. The Events Section will showcase hackathons, competitions, project milestones, seminars, awards, and other significant achievements in a visually engaging card-based timeline format.

The design leverages existing portfolio infrastructure (AnimatedSection wrapper, LazyImage component, theme system, and navigation dock) while introducing new data structures and visual patterns specifically tailored for event presentation.

### Goals

1. **Replace Skills with Events**: Transform the skills-focused section into a dynamic events timeline
2. **Visual Consistency**: Maintain design coherence with existing sections (Projects, Certifications)
3. **Chronological Clarity**: Present events in reverse chronological order for easy navigation
4. **Category Differentiation**: Use visual cues (badges, colors) to distinguish event types
5. **Responsive Excellence**: Ensure smooth adaptation across mobile, tablet, and desktop viewports

## Architecture

### Component Structure

```
EventsSection (new component)
├── AnimatedSection (wrapper for scroll animations)
├── Section Header
│   ├── Category Badge (with Calendar icon)
│   ├── Section Title
│   └── Section Subtitle
└── Events Grid
    └── EventCard (individual event cards)
        ├── Event Header
        │   ├── Category Badge
        │   ├── Event Date
        │   └── Event Title
        ├── Event Description
        ├── Event Details (location, achievement)
        ├── Tag Pills
        └── Action Links (if present)
            ├── External Link Button
            ├── GitHub Link Button
            └── Certificate Link Button
```

### File Structure

```
src/
├── components/
│   └── sections/
│       ├── EventsSection.tsx (new - replaces SkillsSection.tsx)
│       └── SkillsSection.tsx (to be deleted)
├── data/
│   └── portfolioData.ts (updated with EVENTS and EVENTS_CONTENT exports)
└── App.tsx (updated section integration)
```

### Integration Points

1. **App.tsx**: Replace SkillsSection with EventsSection in component tree
2. **FloatingDock.tsx**: Update navigation item from "skills" to "events" with Calendar icon
3. **portfolioData.ts**: Add EVENTS and EVENTS_CONTENT exports, remove SKILLS and SKILLS_CONTENT
4. **Existing utilities**: Reuse AnimatedSection, LazyImage, Icons components

## Components and Interfaces

### EventsSection Component

**Purpose**: Main section component that renders the events timeline with header and grid layout.

**Props**: None (consumes data from portfolioData.ts)

**State**: None (fully data-driven)

**Key Features**:
- Uses AnimatedSection wrapper for scroll-triggered animations
- Renders section header with Calendar icon, title, and subtitle
- Displays events in reverse chronological order
- Applies responsive grid layout (1 column → 2 columns → 3 columns)

**Styling Approach**:
- Matches existing section styling (py-24, scroll-mt-16)
- Uses consistent header pattern with Projects and Certifications sections
- Applies theme-aware colors (dark:bg-slate-900/50, dark:border-slate-800/80)

### EventCard Component

**Purpose**: Individual card displaying a single event with all relevant details.

**Props**:
```typescript
interface EventCardProps {
  event: Event;
}
```

**Key Features**:
- Card-based layout with hover effects (scale, shadow)
- Category badge with color coding
- Date display (human-readable format)
- Event title, description, and optional details
- Tag pills for technologies/topics
- Action links (external URL, GitHub, certificate PDF)

**Styling Approach**:
- White/slate-900 background with border
- Rounded corners (rounded-2xl)
- Hover: -translate-y-1, shadow-xl, shadow-indigo-500/10
- Transition duration: 300ms

## Data Models

### Event Data Structure

```typescript
interface Event {
  // Required fields
  title: string;              // Event name (e.g., "YGG Pilipinas Game Jam Hackathon")
  date: string;               // ISO format or human-readable (e.g., "2025-03-15" or "March 2025")
  description: string;        // Event description (2-3 sentences)
  category: EventCategory;    // Event type classification
  
  // Optional fields
  location?: string;          // Physical or virtual location (e.g., "Manila, Philippines")
  achievement?: string;       // Award or outcome (e.g., "1st Place Winner", "Best UI/UX")
  tags?: string[];            // Related technologies or topics (e.g., ["Unity", "C#", "Game Dev"])
  links?: {
    external?: string;        // Project URL or event website
    github?: string;          // Repository link
    certificate?: string;     // PDF certificate path
  };
  images?: string[];          // Optional event photos or screenshots
}

type EventCategory = 
  | 'hackathon' 
  | 'competition' 
  | 'milestone' 
  | 'seminar' 
  | 'award';
```

### Events Content Configuration

```typescript
interface EventsContent {
  tagline: string;   // Small uppercase label (e.g., "Professional Journey")
  title: string;     // Section heading (e.g., "Events & Milestones")
  subtitle: string;  // Section description paragraph
}

export const EVENTS_CONTENT: EventsContent = {
  tagline: "Professional Journey",
  title: "Events & Milestones",
  subtitle: "A chronological timeline of hackathons, competitions, seminars, and significant achievements that shaped my development journey."
};
```

### Sample Event Data

```typescript
export const EVENTS: Event[] = [
  {
    title: "YGG Pilipinas Game Jam Hackathon",
    date: "February 2025",
    description: "Participated in a 48-hour game development hackathon organized by Yield Guild Games Philippines. Built a web-based multiplayer game using React and WebSockets.",
    category: "hackathon",
    location: "Online",
    achievement: "Finalist",
    tags: ["React", "WebSockets", "Game Dev", "JavaScript"],
    links: {
      external: "https://example.com/demo",
      github: "https://github.com/kikkoman-4/ygg-game-jam"
    }
  },
  {
    title: "Globe Developers Conference 2025",
    date: "October 9, 2025",
    description: "Attended a full-day conference on modern web technologies, cloud architecture, and API integration strategies.",
    category: "seminar",
    location: "Manila, Philippines",
    tags: ["API", "Cloud", "Web Dev"],
    links: {
      certificate: "/certs/Globe DevCon 2025 Certificate_AA Afable.pdf"
    }
  },
  {
    title: "Wine Century Bros Website Launch",
    date: "March 2026",
    description: "Successfully deployed a production-grade Next.js application with Supabase backend, Google Sheets API integration, and smooth GSAP animations.",
    category: "milestone",
    tags: ["Next.js", "Supabase", "Google Sheets API", "GSAP"],
    links: {
      external: "https://www.winecenturybros.com/"
    }
  }
];
```

## Visual Styling Approach

### Color Scheme

#### Category Badge Colors

Each event category uses distinct color coding for immediate visual recognition:

```typescript
const categoryColors: Record<EventCategory, string> = {
  hackathon: 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/60',
  competition: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60',
  milestone: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
  seminar: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/60',
  award: 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60'
};
```

#### Theme Integration

- **Light Mode**: White cards (bg-white) with slate-200 borders
- **Dark Mode**: Semi-transparent slate cards (bg-slate-900/50) with slate-800/80 borders
- **Hover Effects**: Indigo accent (hover:shadow-indigo-500/10)

### Typography

- **Section Title**: `text-3xl md:text-4xl font-bold`
- **Event Title**: `text-xl font-bold`
- **Description**: `text-sm text-slate-600 dark:text-slate-400`
- **Date**: `text-xs text-slate-500 dark:text-slate-500`
- **Category Badge**: `text-[10px] font-bold uppercase tracking-wider`

### Spacing and Layout

- **Section Padding**: `py-24` (vertical), `scroll-mt-16` (anchor offset)
- **Card Padding**: `p-6`
- **Grid Gap**: `gap-6` (mobile), `gap-8` (desktop)
- **Border Radius**: `rounded-2xl` (cards), `rounded-full` (badges)

### Responsive Grid

```css
/* Mobile (default) */
grid-cols-1

/* Tablet (md breakpoint: 768px) */
md:grid-cols-2

/* Desktop (lg breakpoint: 1024px) */
lg:grid-cols-3 (if content permits)
```

## Animation Patterns

### Scroll-Triggered Animations

**Section Header Animation**:
```typescript
<AnimatedSection direction="up">
  {/* Section header content */}
</AnimatedSection>
```

**Event Grid Animation**:
```typescript
<AnimatedSection direction="up" delay={100}>
  {/* Events grid */}
</AnimatedSection>
```

**Individual Card Animations** (staggered):
```typescript
{EVENTS.map((event, index) => (
  <AnimatedSection 
    key={index} 
    direction={index % 2 === 0 ? 'left' : 'right'} 
    delay={index * 100}
  >
    <EventCard event={event} />
  </AnimatedSection>
))}
```

### Hover Animations

**Card Hover State**:
- Transform: `hover:-translate-y-1`
- Shadow: `hover:shadow-xl hover:shadow-indigo-500/10`
- Duration: `transition-all duration-300`

**Link Button Hover State**:
- Scale: `hover:scale-105`
- Background: `hover:bg-indigo-50 dark:hover:bg-indigo-950/60`
- Duration: `transition-all duration-300`

### Animation Timing Functions

- **Default Easing**: `ease-out`
- **Card Entrance**: `duration-700` (AnimatedSection default)
- **Hover Transitions**: `duration-300`
- **Scale Effects**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (bouncy easing)

## Integration Points with Existing Components

### 1. Navigation Dock Integration

**File**: `src/components/layout/FloatingDock.tsx`

**Changes Required**:
- Update `sections` array: Replace `'skills'` with `'events'`
- Update `navLabels` object: Replace `skills: 'skills'` with `events: 'events'`
- Update icon mapping: Replace `Cpu` icon with `Calendar` icon for events

```typescript
import { Calendar } from 'lucide-react';

// Update sections array
const sections = ['hero', 'about', 'projects', 'events', 'certifications', 'contact'];

// Update navLabels
const navLabels: Record<string, string> = {
  hero: 'hero',
  about: 'about',
  projects: 'projects',
  events: 'events', // Changed from skills
  certifications: 'certs',
  contact: 'contact',
};

// Update icon rendering
{item === 'events' && <Calendar size={18} />}
```

### 2. App.tsx Integration

**File**: `src/App.tsx`

**Changes Required**:
- Replace `SkillsSection` import with `EventsSection`
- Update `sections` array in scroll handler: Replace `'skills'` with `'events'`
- Replace `<SkillsSection />` with `<EventsSection />` in JSX

```typescript
import EventsSection from './components/sections/EventsSection';

// Update sections array
const sections = ['hero', 'about', 'projects', 'events', 'certifications', 'contact'];

// Replace in JSX
<EventsSection />
```

### 3. Data Layer Integration

**File**: `src/data/portfolioData.ts`

**Changes Required**:
- Add `EVENTS` export (array of Event objects)
- Add `EVENTS_CONTENT` export (section text configuration)
- Remove `SKILLS` export
- Remove `SKILLS_CONTENT` export

```typescript
// Add new exports
export const EVENTS_CONTENT = {
  tagline: "Professional Journey",
  title: "Events & Milestones",
  subtitle: "A chronological timeline of hackathons, competitions, seminars, and significant achievements that shaped my development journey."
};

export const EVENTS = [
  // Event objects here
];

// Remove these exports
// export const SKILLS = [...];
// export const SKILLS_CONTENT = {...};
```

### 4. Reusable Components

**AnimatedSection**: Already integrated in existing sections, no changes needed.

**LazyImage**: Will be used for event images (optional feature).

```typescript
import LazyImage from '../ui/LazyImage';

// Usage in EventCard
{event.images && event.images.length > 0 && (
  <LazyImage
    src={event.images[0]}
    alt={`${event.title} image`}
    className="w-full h-48 object-cover rounded-lg mb-4"
    containerClassName="w-full"
  />
)}
```

**Icons**: Use existing `lucide-react` icons and custom Icons component.

```typescript
import { Calendar, ExternalLink, Award } from 'lucide-react';
import { Github } from '../ui/Icons';
```

## Error Handling

### Data Validation

**Missing Required Fields**: EventCard component should handle missing required fields gracefully.

```typescript
function EventCard({ event }: EventCardProps) {
  // Fallback for missing data
  const title = event.title || 'Untitled Event';
  const description = event.description || 'No description available.';
  const date = event.date || 'Date TBA';
  const category = event.category || 'milestone';
  
  // ... rest of component
}
```

### Invalid Image URLs

**LazyImage Error Handling**: The existing LazyImage component already handles image loading errors.

```typescript
// LazyImage component handles broken images internally
<LazyImage
  src={event.images?.[0] || '/placeholder.jpg'}
  alt={`${event.title} image`}
  className="w-full h-48 object-cover"
  containerClassName="w-full"
/>
```

### Invalid Links

**Link Validation**: Ensure external links are properly formatted and handle missing links.

```typescript
{event.links?.external && (
  <a
    href={event.links.external}
    target="_blank"
    rel="noopener noreferrer"
    className="..."
    onClick={(e) => {
      // Prevent navigation if URL is invalid
      if (!event.links.external.startsWith('http')) {
        e.preventDefault();
        console.warn('Invalid URL:', event.links.external);
      }
    }}
  >
    <ExternalLink size={14} />
    <span>View Project</span>
  </a>
)}
```

### Empty Events Array

**Empty State Handling**: Display a friendly message when no events are available.

```typescript
{EVENTS.length === 0 ? (
  <div className="text-center py-16">
    <Calendar size={48} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
    <p className="text-slate-500 dark:text-slate-500">No events to display yet.</p>
  </div>
) : (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Event cards */}
  </div>
)}
```

## Testing Strategy

### Unit Tests

Since this is a UI-focused feature with no complex business logic, the testing strategy will focus on:

1. **Component Rendering Tests**: Verify that EventsSection renders correctly with sample data
2. **Data Display Tests**: Ensure all event properties are displayed correctly
3. **Link Functionality Tests**: Verify that external links, GitHub links, and certificate links work correctly
4. **Responsive Layout Tests**: Test grid layout at different viewport sizes
5. **Theme Integration Tests**: Verify light/dark mode styling applies correctly
6. **Empty State Tests**: Test behavior when EVENTS array is empty
7. **Missing Data Tests**: Test component behavior with missing optional fields
8. **Category Badge Tests**: Verify correct color coding for each category type

### Integration Tests

1. **Navigation Integration**: Test that clicking "events" in FloatingDock scrolls to the correct section
2. **Scroll Detection**: Test that activeSection state updates correctly when scrolling to events section
3. **Animation Triggers**: Test that AnimatedSection wrapper triggers animations on scroll
4. **Data Layer Integration**: Test that EVENTS and EVENTS_CONTENT are properly imported and used

### Manual Testing Checklist

- [ ] Events display in reverse chronological order
- [ ] Category badges show correct colors for each type
- [ ] Hover effects work on event cards
- [ ] External links open in new tabs
- [ ] Certificate links open PDF files correctly
- [ ] Mobile layout uses single column
- [ ] Tablet layout uses two columns
- [ ] Desktop layout uses three columns (if appropriate)
- [ ] Dark mode styling applies correctly
- [ ] Navigation dock highlights "events" when section is active
- [ ] Smooth scroll works from navigation dock to events section
- [ ] Animations trigger when scrolling into view
- [ ] Empty state displays when no events are present

### Accessibility Testing

- [ ] Keyboard navigation works for all links
- [ ] Screen readers announce section heading correctly
- [ ] Link aria-labels are descriptive
- [ ] Image alt text is provided
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible

### Performance Testing

- [ ] Images lazy load correctly
- [ ] Page load time remains under 3 seconds
- [ ] Scroll performance is smooth with 20+ events
- [ ] No layout shift when images load
- [ ] Hover animations are smooth (60fps)

## Accessibility Considerations

### Semantic HTML

```typescript
<section id="events" className="py-24 scroll-mt-16">
  <h2 className="text-3xl md:text-4xl font-bold">
    {EVENTS_CONTENT.title}
  </h2>
  
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {EVENTS.map((event, index) => (
      <article key={index} className="...">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p>{event.description}</p>
        {/* ... */}
      </article>
    ))}
  </div>
</section>
```

### ARIA Labels

```typescript
<a
  href={event.links.external}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`View ${event.title} project website`}
  className="..."
>
  <ExternalLink size={14} />
  <span>View Project</span>
</a>
```

### Keyboard Navigation

- All links and buttons must be keyboard accessible
- Tab order follows logical reading order
- Focus indicators visible and clear
- No keyboard traps

### Screen Reader Support

- Section heading properly announces the section
- Event cards use `<article>` for semantic grouping
- Links have descriptive text or aria-labels
- Images have descriptive alt text

### Color Contrast

All text must meet WCAG AA standards:
- Regular text: 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio
- Interactive elements: 3:1 contrast ratio

Category badge colors have been selected to meet these standards in both light and dark modes.

## Performance Optimization

### Lazy Loading

```typescript
import LazyImage from '../ui/LazyImage';

// Images only load when cards enter viewport
<LazyImage
  src={event.images[0]}
  alt={`${event.title} image`}
  className="..."
  containerClassName="w-full"
/>
```

### Static Data Import

```typescript
// Data imported at build time, no runtime API calls
import { EVENTS, EVENTS_CONTENT } from '../../data/portfolioData';
```

### Component Memoization

For large event lists (20+ items), consider memoizing EventCard:

```typescript
import { memo } from 'react';

const EventCard = memo(function EventCard({ event }: EventCardProps) {
  // Component implementation
});
```

### CSS Optimization

- Use Tailwind's built-in classes for optimal CSS size
- Leverage CSS transforms for animations (GPU-accelerated)
- Use `will-change` sparingly on hover elements

```typescript
className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl will-change-transform"
```

### Bundle Size

- Reuse existing icon library (`lucide-react`)
- No additional dependencies required
- Total component size: ~5KB (minified)

## Migration Path

### Step 1: Data Preparation

1. Add `EVENTS` array to `portfolioData.ts`
2. Add `EVENTS_CONTENT` object to `portfolioData.ts`
3. Populate with initial event data (minimum 3-5 events for testing)

### Step 2: Component Creation

1. Create `EventsSection.tsx` in `src/components/sections/`
2. Implement EventCard sub-component
3. Implement category color mapping
4. Add AnimatedSection wrapper
5. Test component in isolation (Storybook or standalone page)

### Step 3: Navigation Update

1. Update `FloatingDock.tsx`:
   - Replace `'skills'` with `'events'` in sections array
   - Update navLabels object
   - Change icon from `Cpu` to `Calendar`

### Step 4: App Integration

1. Update `App.tsx`:
   - Import EventsSection
   - Replace SkillsSection with EventsSection
   - Update sections array in scroll handler

### Step 5: Cleanup

1. Remove `SkillsSection.tsx` file
2. Remove `SKILLS` and `SKILLS_CONTENT` from `portfolioData.ts`
3. Remove any SkillsSection imports

### Step 6: Testing and Validation

1. Test navigation dock functionality
2. Test scroll detection and active section highlighting
3. Test responsive layouts
4. Test dark mode
5. Test all links (external, GitHub, certificates)
6. Test accessibility with keyboard and screen reader
7. Run performance audit

### Rollback Plan

If issues arise during deployment:

1. Restore `SkillsSection.tsx` from version control
2. Revert `App.tsx` changes
3. Revert `FloatingDock.tsx` changes
4. Keep EventsSection.tsx for future use
5. Keep EVENTS data in portfolioData.ts (won't affect production)

## Future Enhancements

### Phase 2: Filtering and Search

Add category filtering buttons:

```typescript
const [activeFilter, setActiveFilter] = useState<EventCategory | 'all'>('all');

const filteredEvents = activeFilter === 'all' 
  ? EVENTS 
  : EVENTS.filter(e => e.category === activeFilter);
```

### Phase 3: Detailed Event Modal

Add modal popup for detailed event view:

```typescript
const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

<EventModal 
  event={selectedEvent} 
  onClose={() => setSelectedEvent(null)} 
/>
```

### Phase 4: Image Gallery

Add image carousel for events with multiple images:

```typescript
{event.images && event.images.length > 1 && (
  <ImageCarousel images={event.images} />
)}
```

### Phase 5: Timeline Visualization

Add visual timeline with connecting lines:

```typescript
<div className="relative">
  {/* Vertical timeline line */}
  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
  
  {/* Event cards with timeline dots */}
  {EVENTS.map((event, index) => (
    <div className="relative pl-16">
      <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-indigo-500" />
      <EventCard event={event} />
    </div>
  ))}
</div>
```

## Conclusion

This design provides a comprehensive blueprint for transforming the SkillsSection into a feature-rich EventsSection that maintains visual consistency with the existing portfolio while introducing new patterns for chronological event display. The design leverages existing infrastructure (AnimatedSection, LazyImage, theme system, navigation dock) to minimize development effort and ensure seamless integration.

The component architecture is modular and extensible, allowing for future enhancements such as filtering, detailed modals, and timeline visualization without requiring significant refactoring.
