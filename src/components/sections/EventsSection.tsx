import { Calendar, ExternalLink, MapPin, Award, X } from 'lucide-react';
import { EVENTS, EVENTS_CONTENT, type Event, type EventCategory } from '../../data/portfolioData';
import { Github } from '../ui/Icons';
import AnimatedSection from '../ui/AnimatedSection';
import { useState, useEffect } from 'react';

// Category badge color mapping
const categoryColors: Record<EventCategory, string> = {
  hackathon: 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/60',
  competition: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60',
  milestone: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
  seminar: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/60',
  award: 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60'
};

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Filter to show only hackathons and seminars, then sort by date
  const sortedEvents = [...EVENTS]
    .filter(event => event.category === 'hackathon' || event.category === 'seminar')
    .sort((a, b) => {
      // Parse dates for proper sorting (newest first)
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

  return (
    <section id="events" className="py-24 scroll-mt-16 text-left">
      {/* Section Header */}
      <AnimatedSection direction="up">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
            <Calendar size={16} />
            <span>{EVENTS_CONTENT.tagline}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            {EVENTS_CONTENT.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {EVENTS_CONTENT.subtitle}
          </p>
        </div>
      </AnimatedSection>

      {/* Bento Grid Layout - Dynamically Adjusts to Event Count */}
      <AnimatedSection direction="up" delay={100}>
        {sortedEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={48} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <p className="text-slate-500 dark:text-slate-500">No events to display yet.</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${getGridLayout(sortedEvents.length)}`}>
            {sortedEvents.map((event, index) => {
              const spanClass = getBentoSpan(index, sortedEvents.length);
              
              return (
                <div
                  key={index}
                  className={spanClass}
                >
                  <EventBentoCard event={event} onClick={() => setSelectedEvent(event)} />
                </div>
              );
            })}
          </div>
        )}
      </AnimatedSection>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </section>
  );
}

// Dynamic grid layout based on event count
function getGridLayout(count: number): string {
  if (count <= 2) return 'grid-cols-1 md:grid-cols-2 auto-rows-[300px]';
  if (count <= 4) return 'grid-cols-1 md:grid-cols-2 auto-rows-[250px]';
  if (count <= 6) return 'grid-cols-1 md:grid-cols-3 auto-rows-[200px]';
  return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px]';
}

// Bento grid span logic that adapts to event count
function getBentoSpan(index: number, totalCount: number): string {
  // For 1-2 events: all full width
  if (totalCount <= 2) {
    return 'md:col-span-1 md:row-span-1';
  }
  
  // For 3-4 events: 2x2 grid with equal sizes
  if (totalCount <= 4) {
    return 'md:col-span-1 md:row-span-1';
  }
  
  // For 5-6 events: 3 columns with varying heights
  if (totalCount <= 6) {
    const patterns = [
      'md:col-span-1 md:row-span-2', // Tall
      'md:col-span-1 md:row-span-1', // Normal
      'md:col-span-1 md:row-span-1', // Normal
      'md:col-span-1 md:row-span-1', // Normal
      'md:col-span-1 md:row-span-2', // Tall
      'md:col-span-1 md:row-span-1', // Normal
    ];
    return patterns[index] || 'md:col-span-1 md:row-span-1';
  }
  
  // For 7+ events: 4 column grid with occasional double-width cards
  const patterns = [
    'md:col-span-2 md:row-span-2', // Large feature
    'md:col-span-1 md:row-span-1', // Normal
    'md:col-span-1 md:row-span-1', // Normal
    'md:col-span-1 md:row-span-2', // Tall
    'md:col-span-1 md:row-span-1', // Normal
    'md:col-span-2 md:row-span-1', // Wide
    'md:col-span-1 md:row-span-1', // Normal
    'md:col-span-1 md:row-span-1', // Normal
  ];
  return patterns[index % patterns.length];
}

function EventBentoCard({ event, onClick }: { event: Event; onClick: () => void }) {
  return (
    <article 
      onClick={onClick}
      className="group relative h-full w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20 cursor-pointer"
    >
      {/* Background Image with Overlay */}
      {event.images && event.images.length > 0 ? (
        <div className="absolute inset-0">
          <img
            src={event.images[0]}
            alt={`${event.title} event`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>
      ) : (
        <div className={`absolute inset-0 ${getCategoryGradient(event.category)}`} />
      )}

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${categoryColors[event.category]}`}>
            {event.category}
          </span>
        </div>

        {/* Achievement Badge (if exists) */}
        {event.achievement && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-2.5 py-1 rounded-full">
              <Award size={12} className="text-yellow-300" />
              <span className="text-[10px] font-bold text-white">{event.achievement}</span>
            </div>
          </div>
        )}

        {/* Date */}
        <time className="text-xs font-medium text-white/80 mb-2">
          {event.date}
        </time>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
          {event.title}
        </h3>

        {/* Location */}
        {event.location && (
          <div className="flex items-center gap-1.5 text-xs text-white/70 mb-3">
            <MapPin size={12} />
            <span className="truncate">{event.location}</span>
          </div>
        )}

        {/* View Details Hint */}
        <div className="flex items-center gap-1 text-xs font-semibold text-indigo-300 group-hover:gap-2 transition-all">
          <span>Learn more</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </article>
  );
}

// Get category-specific gradient for events without images
function getCategoryGradient(category: EventCategory): string {
  const gradients: Record<EventCategory, string> = {
    hackathon: 'bg-gradient-to-br from-purple-600 to-purple-900',
    competition: 'bg-gradient-to-br from-amber-600 to-amber-900',
    milestone: 'bg-gradient-to-br from-emerald-600 to-emerald-900',
    seminar: 'bg-gradient-to-br from-blue-600 to-blue-900',
    award: 'bg-gradient-to-br from-rose-600 to-rose-900'
  };
  return gradients[category];
}

function EventDetailModal({ event, onClose }: { event: Event; onClose: () => void }) {
  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={20} className="text-slate-700 dark:text-slate-300" />
        </button>

        {/* Event Image */}
        {event.images && event.images.length > 0 && (
          <div className="w-full h-64 md:h-80 overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={event.images[0]}
              alt={`${event.title} event`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${categoryColors[event.category]}`}>
              {event.category}
            </span>
            <time className="text-xs text-slate-500 dark:text-slate-500 font-medium">
              {event.date}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            {event.title}
          </h3>

          {/* Location & Achievement */}
          {(event.location || event.achievement) && (
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              {event.location && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <MapPin size={16} className="text-indigo-500/70 shrink-0" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.achievement && (
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Award size={16} className="shrink-0" />
                  <span className="font-semibold">{event.achievement}</span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Technologies & Skills</h4>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Images */}
          {event.images && event.images.length > 1 && (
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Gallery</h4>
              <div className="grid grid-cols-2 gap-3">
                {event.images.slice(1).map((img, idx) => (
                  <div key={idx} className="aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <img
                      src={img}
                      alt={`${event.title} image ${idx + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Links */}
          {event.links && (event.links.external || event.links.github || event.links.certificate) && (
            <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
              {event.links.external && (
                <a
                  href={event.links.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${event.title} project website`}
                  className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-950/80 px-4 py-2.5 rounded-lg transition-all hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                  <span>View Project</span>
                </a>
              )}
              {event.links.github && (
                <a
                  href={event.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${event.title} GitHub repository`}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2.5 rounded-lg transition-all hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                  <span>View Source</span>
                </a>
              )}
              {event.links.certificate && (
                <a
                  href={event.links.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${event.title} certificate`}
                  className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 px-4 py-2.5 rounded-lg transition-all hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Award size={16} />
                  <span>View Certificate</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
