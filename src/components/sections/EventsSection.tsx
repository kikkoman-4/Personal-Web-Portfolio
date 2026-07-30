import { Calendar, ExternalLink, MapPin, Award, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const eventsPerPage = 5; // 1 featured + 4 list items

  // Sort all events by date (newest first)
  const sortedEvents = [...EVENTS]
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

  // Pagination
  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
  const startIndex = currentPage * eventsPerPage;
  const currentEvents = sortedEvents.slice(startIndex, startIndex + eventsPerPage);
  
  const featuredEvent = currentEvents[0];
  const listEvents = currentEvents.slice(1);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection('right');
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setDirection('left');
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    setDirection(page > currentPage ? 'right' : 'left');
    setCurrentPage(page);
  };

  return (
    <section id="events" className="py-24 scroll-mt-16 text-left w-full px-6 lg:px-12">
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

      {/* Featured + List Layout */}
      <div className="relative overflow-hidden">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={48} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <p className="text-slate-500 dark:text-slate-500">No events to display yet.</p>
          </div>
        ) : (
          <>
            <div
              key={currentPage}
              className={`grid grid-cols-1 lg:grid-cols-5 gap-6 animate-slide-${direction}`}
            >
              {/* Featured Event (Left - Large) */}
              {featuredEvent && (
                <div className="lg:col-span-3">
                  <FeaturedEventCard event={featuredEvent} onClick={() => setSelectedEvent(featuredEvent)} />
                </div>
              )}

              {/* Event List (Right - Small Cards) */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {listEvents.map((event, index) => (
                  <ListEventCard
                    key={startIndex + index + 1}
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                  <span className="text-sm font-semibold">Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentPage
                          ? 'bg-indigo-600 w-8 h-2.5'
                          : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 w-2.5 h-2.5'
                      }`}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
                  aria-label="Next page"
                >
                  <span className="text-sm font-semibold">Next</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </section>
  );
}

// Featured Event Card (Large - Left Side)
function FeaturedEventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  const firstImage = event.images?.[0];
  const isPdf = firstImage ? /\.pdf$/i.test(firstImage) : false;
  const hasValidImage = firstImage && !isPdf;

  return (
    <article 
      onClick={onClick}
      className="group relative h-[500px] w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-500/20 cursor-pointer"
    >
      {/* Background Image/PDF */}
      {hasValidImage ? (
        <div className="absolute inset-0">
          <img
            src={firstImage}
            alt={`${event.title} event`}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        </div>
      ) : isPdf && firstImage ? (
        <div className="absolute inset-0">
          <iframe
            src={`${firstImage}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className="w-full h-full border-0 pointer-events-none scale-105"
            title={`${event.title} certificate`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />
        </div>
      ) : (
        <div className={`absolute inset-0 ${getCategoryGradient(event.category)}`} />
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        <div className="absolute top-6 left-6">
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border backdrop-blur-md ${categoryColors[event.category]}`}>
            {event.category}
          </span>
        </div>

        {event.achievement && (
          <div className="absolute top-6 right-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full">
              <Award size={14} className="text-yellow-300" />
              <span className="text-xs font-bold text-white">{event.achievement}</span>
            </div>
          </div>
        )}

        <time className="text-sm font-medium text-white/80 mb-3">
          {event.date}
        </time>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-tight">
          {event.title}
        </h3>

        {event.location && (
          <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-300 group-hover:gap-3 transition-all">
          <span>Learn more</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </article>
  );
}

// List Event Card (Small - Right Side)
function ListEventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  const firstImage = event.images?.[0];
  const isPdf = firstImage ? /\.pdf$/i.test(firstImage) : false;
  const hasValidImage = firstImage && !isPdf;

  return (
    <article 
      onClick={onClick}
      className="group relative h-[115px] w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer flex"
    >
      {/* Thumbnail */}
      <div className="relative w-32 flex-shrink-0">
        {hasValidImage ? (
          <img
            src={firstImage}
            alt={`${event.title} event`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : isPdf && firstImage ? (
          <iframe
            src={`${firstImage}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className="w-full h-full border-0 pointer-events-none"
            title={`${event.title} certificate`}
          />
        ) : (
          <div className={`w-full h-full ${getCategoryGradient(event.category)}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${categoryColors[event.category]}`}>
              {event.category}
            </span>
            {event.achievement && (
              <div className="flex items-center gap-1 text-[9px] font-bold text-yellow-600 dark:text-yellow-400">
                <Award size={10} />
                <span className="truncate">{event.achievement}</span>
              </div>
            )}
          </div>

          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight mb-1">
            {event.title}
          </h4>
        </div>

        <time className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          {event.date}
        </time>
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, lightboxIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Helper function to check if file is a PDF
  const isPdfFile = (path: string) => /\.pdf$/i.test(path);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        data-lenis-prevent
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600 scrollbar-track-slate-100 dark:scrollbar-track-slate-800"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(148 163 184) rgb(241 245 249)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={20} className="text-slate-700 dark:text-slate-300" />
        </button>

        {/* Event Image or PDF */}
        {event.images && event.images.length > 0 && (
          <div className="w-full h-64 md:h-80 overflow-hidden bg-slate-100 dark:bg-slate-800">
            {isPdfFile(event.images[0]) ? (
              <iframe
                src={`${event.images[0]}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                className="w-full h-full border-0"
                title={`${event.title} certificate`}
              />
            ) : (
              <img
                src={event.images[0]}
                alt={`${event.title} event`}
                className="w-full h-full object-cover"
              />
            )}
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
                {event.images.slice(1).map((img, idx) => {
                  const actualIndex = idx + 1; // Since we sliced from index 1
                  return (
                    <button
                      key={idx}
                      onClick={() => !isPdfFile(img) && setLightboxIndex(actualIndex)}
                      disabled={isPdfFile(img)}
                      className={`aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 ${
                        !isPdfFile(img) ? 'cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all' : ''
                      }`}
                    >
                      {isPdfFile(img) ? (
                        <iframe
                          src={`${img}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                          className="w-full h-full border-0"
                          title={`${event.title} document ${actualIndex + 1}`}
                        />
                      ) : (
                        <img
                          src={img}
                          alt={`${event.title} image ${actualIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </button>
                  );
                })}
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

      {/* Image Lightbox */}
      {lightboxIndex !== null && event.images && (
        <ImageLightbox
          images={event.images.filter(img => !isPdfFile(img))}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          title={event.title}
        />
      )}
    </div>
  );
}

// Simple Image Lightbox Component
function ImageLightbox({
  images,
  startIndex,
  onClose,
  title,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
  title: string;
}) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    setCurrent(startIndex);
  }, [startIndex]);

  const prev = () => setCurrent((i) => Math.max(0, i - 1));
  const next = () => setCurrent((i) => Math.min(images.length - 1, i + 1));

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative z-10 w-full max-w-6xl flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-2xl animate-popup"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/95 flex-shrink-0">
          <div>
            <p className="text-xs text-slate-400">{title}</p>
            <p className="text-xs text-slate-500 tabular-nums font-mono">
              {current + 1} / {images.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={current === 0}
              onClick={prev}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={current === images.length - 1}
              onClick={next}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image area */}
        <div className="bg-slate-950 flex items-center justify-center min-h-[70vh] p-4">
          <img
            key={images[current]}
            src={images[current]}
            alt={`${title} image ${current + 1}`}
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 border-t border-slate-800 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === current
                    ? 'border-indigo-500 opacity-100 scale-105'
                    : 'border-slate-700 opacity-50 hover:opacity-80'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
