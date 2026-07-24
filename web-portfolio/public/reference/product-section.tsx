"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef, useState, useEffect, useMemo, useCallback, useTransition } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassSurface from "@/components/ui/glass-surface";
import { ChevronLeft, ChevronRight, Wine, Search, X, ArrowLeft, Filter, ShoppingCart, Trash2 } from "lucide-react";
import { InquiryModal } from "@/components/ui/inquiry-modal";
import { preloadAllImages } from "@/lib/image-cache";
import { BRAND_LOGOS } from "@/lib/constants";
import type { Inventory } from "@/types/database";
import { useIsMobile } from "@/hooks/use-mobile";
import { createClient } from "@/lib/supabase/client";
import { transformDriveUrl } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   COLOR TOKENS — Extracted from reference image (warm walnut/amber)
   ═══════════════════════════════════════════════════════════════ */
const PALETTE = {
  amber: "#D4A04A",
  honey: "#c88b32",
  walnut: "#4a2510",
  espresso: "#1a0c04",
  warmWhite: "#f5e6d0",
  glow: "rgba(212, 160, 74, 0.15)",
  glowSoft: "rgba(212, 160, 74, 0.12)",
  bg: "#050403",
  categories: {
    "RED": { accent: "#1a0505", glow: "rgba(180, 20, 20, 0.3)" },
    "WHITE": { accent: "#0a0a03", glow: "rgba(212, 160, 74, 0.25)" },
    "SPARKLING": { accent: "#050608", glow: "rgba(200, 210, 255, 0.2)" },
    "SPIRITS": { accent: "#0d0703", glow: "rgba(245, 158, 11, 0.25)" },
    "DEFAULT": { accent: "#050403", glow: "rgba(212, 160, 74, 0.2)" }
  }
};
/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: BottleImage
   Image with shimmer skeleton until loaded.
   ═══════════════════════════════════════════════════════════════ */
const BottleImage = ({ bottle, isActive }: { bottle: Inventory; isActive: boolean }) => {
  const [loaded, setLoaded] = useState(false);
  const prevSrc = useRef<string | null>(null);
  const src = transformDriveUrl(bottle.image_url);

  // Reset loaded state only when src actually changes
  useEffect(() => {
    if (prevSrc.current !== src) {
      prevSrc.current = src;
      setLoaded(false);
    }
  }, [src]);

  if (!src) {
    return (
      <div className="relative flex items-center justify-center h-[45vh] md:h-[50vh] max-h-full max-w-full aspect-[3/4] rounded-[32px] bg-white/[0.03] border border-white/[0.06]">
        <div className="flex flex-col items-center gap-3 px-6 text-center">
          <Wine className="w-8 h-8 text-white/15" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-medium leading-relaxed">
            Product Image<br />Not Available
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center h-[45vh] md:h-[50vh] max-h-full max-w-full aspect-[3/4]">
      {/* Shimmer skeleton — only for active bottle to avoid overlap */}
      {!loaded && isActive && (
        <motion.div
          key="img-skeleton"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-[32px] overflow-hidden bg-white/[0.04]"
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      <Image
        src={src}
        alt={`${bottle.product_name} - Premium ${bottle.category} from ${bottle["Country/Region"] || "imported estates"} | Wine Century Brothers`}
        width={240}
        height={500}
        priority={isActive}
        draggable={false}
        crossOrigin="anonymous"
        onLoad={() => setLoaded(true)}
        // ~240px wide card inside a 60% panel — 20vw on desktop, 50vw on mobile
        sizes="(max-width: 768px) 50vw, 20vw"
        className="relative z-10 h-full w-full object-cover rounded-[32px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-none select-none will-change-transform"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
      />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: HeroBottleCarousel
   Draggable horizontal carousel of bottles.
   ═══════════════════════════════════════════════════════════════ */
interface HeroBottleCarouselProps {
  bottles: Inventory[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  activeColor: { base: string; mid: string; glow: string };
}

const HeroBottleCarousel = ({ bottles, activeIndex, onIndexChange, activeColor }: HeroBottleCarouselProps) => {
  const CARD_WIDTH = 240;
  const CARD_GAP = 20;
  const STEP = CARD_WIDTH + CARD_GAP;

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const direction = offset + velocity * 0.2 < 0 ? 1 : -1;

    if (Math.abs(offset) > 30 || Math.abs(velocity) > 150) {
      let next = activeIndex + direction;
      if (next < 0) next = bottles.length - 1;
      if (next >= bottles.length) next = 0;
      onIndexChange(next);
    }
  };

  const getOffset = (i: number, active: number, total: number) => {
    if (total <= 2) return i - active;
    let diff = i - active;
    const half = Math.floor(total / 2);
    if (diff > half) diff -= total;
    if (diff < -half) diff += total;
    return diff;
  };

  if (bottles.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-white/20 text-sm tracking-widest uppercase font-light">
        <Wine className="w-5 h-5 mr-3 opacity-30" />
        No bottles match these filters
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Navigation Arrows — Desktop only */}
      {bottles.length > 1 && (
        <>
          <button
            aria-label="Previous bottle"
            onClick={() => {
              let next = activeIndex - 1;
              if (next < 0) next = bottles.length - 1;
              onIndexChange(next);
            }}
            className="absolute top-1/2 -translate-y-1/2 left-4 md:left-[320px] 2xl:left-[380px] z-30 w-10 h-10 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:border-[#D4A04A]/40 hover:bg-black/50 opacity-60 hover:opacity-100 will-change-transform"
          >
            <ChevronLeft className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
          </button>
          <button
            aria-label="Next bottle"
            onClick={() => {
              let next = activeIndex + 1;
              if (next >= bottles.length) next = 0;
              onIndexChange(next);
            }}
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-[420px] 2xl:right-[480px] z-30 w-10 h-10 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:border-[#D4A04A]/40 hover:bg-black/50 opacity-60 hover:opacity-100 will-change-transform"
          >
            <ChevronRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
          </button>
        </>
      )}

      {/* Draggable Area - Infinite Loop Rendering */}
      <motion.div
        onPanEnd={(_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
          const threshold = 50;
          const velocityThreshold = 500;
          if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
            onIndexChange((activeIndex + 1) % bottles.length);
          } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
            onIndexChange((activeIndex - 1 + bottles.length) % bottles.length);
          }
        }}
        className="absolute inset-0 z-10 flex items-center justify-center outline-none will-change-transform"
      >
        {bottles.map((bottle, i) => {
          const distance = getOffset(i, activeIndex, bottles.length);
          const isActive = distance === 0;
          const absDist = Math.abs(distance);

          return (
            <motion.div
              key={`${bottle.id}-${i}`}
              className="absolute left-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center select-none"
              style={{ width: CARD_WIDTH, marginLeft: -(CARD_WIDTH / 2) }}
              onClick={(e) => {
                if (!isActive) {
                  e.stopPropagation();
                  onIndexChange(i);
                }
              }}
              animate={{
                x: distance * STEP,
                scale: isActive ? 1 : 0.7,
                opacity: isActive ? 1 : absDist === 1 ? 0.4 : 0,
                zIndex: bottles.length - absDist
              }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
            >
              <BottleImage bottle={bottle} isActive={isActive} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Numeric Indicator */}
      {bottles.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 pointer-events-none px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
          <span className="text-[#D4A04A] font-medium text-xs tracking-widest font-serif">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-white/20 text-[10px] tracking-widest">/</span>
          <span className="text-white/50 font-medium text-xs tracking-widest font-serif">
            {String(bottles.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
};
/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: BottleDetailCard
   Glassmorphism overlay with wine info and inquiry button.
   ═══════════════════════════════════════════════════════════════ */
interface BottleDetailCardProps {
  bottle: Inventory | null;
  onInquire: () => void;
}

// Skeleton shimmer for individual lines
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded bg-white/[0.06] ${className}`}>
    <motion.div
      className="absolute inset-0"
      style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)" }}
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

import { COMPANY } from "@/lib/site-config";

const BottleDetailCard = ({ bottle, onInquire }: BottleDetailCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const prevBottleId = useRef<string | null>(null);

  // Trigger skeleton briefly when bottle changes
  useEffect(() => {
    if (!bottle) return;
    if (prevBottleId.current === bottle.id) return;
    prevBottleId.current = bottle.id ?? null;
    setIsLoaded(false);
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, [bottle?.id]);

  const description = "An exquisite selection from one of the world's most celebrated estates, distinguished by exceptional terroir expression.";

  return (
    // Card shell never unmounts — no slide-in/out animation on brand switch
    <div className="product-detail-card w-full max-w-sm">
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={24}
        backgroundOpacity={0.06}
        blur={20}
        displace={0}
        className="border border-white/[0.07] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col gap-5 p-6 md:p-8 w-full">
          {/* Category Badge */}
          <div className="flex items-center gap-3 h-6">
            <AnimatePresence mode="wait">
              {!isLoaded || !bottle ? (
                <motion.div key="skel-badge" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3 w-full">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-20" />
                </motion.div>
              ) : (
                <motion.div key="badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="flex items-center gap-3">
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.4em] px-3 py-1 rounded-full border"
                    style={{ color: "#D4A04A", borderColor: "#D4A04A33", backgroundColor: "#D4A04A0D" }}
                  >
                    {bottle.category}
                  </span>
                  {(bottle.quantity ?? 0) > 0 && (
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium">
                      {bottle.quantity ?? 0} available
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wine Name */}
          <div className="flex flex-col gap-2">
            <AnimatePresence mode="wait">
              {!isLoaded || !bottle ? (
                <motion.div key="skel-name" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-2">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                </motion.div>
              ) : (
                <motion.div key="name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.05 }}>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold tracking-tight leading-tight" style={{ color: "#f5e6d0" }}>
                    {bottle.product_name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.35em] mt-2 font-medium" style={{ color: "#D4A04A99" }}>
                    {bottle.brand || COMPANY.name}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 py-4 border-t border-b border-white/[0.06]">
            <AnimatePresence mode="wait">
              {!isLoaded || !bottle ? (
                <motion.div key="skel-specs" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-3">
                  <div className="flex flex-col gap-1"><Skeleton className="h-2 w-10" /><Skeleton className="h-3 w-16" /></div>
                  <div className="flex flex-col gap-1"><Skeleton className="h-2 w-10" /><Skeleton className="h-3 w-12" /></div>
                  <div className="col-span-2 flex flex-col gap-1"><Skeleton className="h-2 w-8" /><Skeleton className="h-4 w-20" /></div>
                </motion.div>
              ) : (
                <motion.div key="specs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.1 }} className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 block mb-1 font-medium">Region</span>
                    <span className="text-xs text-white/80 font-light">{bottle["Country/Region"]}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 block mb-1 font-medium">Case Qty</span>
                    <span className="text-xs text-white/80 font-light">{bottle.case_qnt}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 block mb-1 font-medium">Price</span>
                    <span className="text-sm font-medium" style={{ color: "#D4A04A" }}>₱{bottle.srp?.toLocaleString() ?? '0'}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Description */}
          <div className="min-h-[48px]">
            <AnimatePresence mode="wait">
              {!isLoaded || !bottle ? (
                <motion.div key="skel-desc" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-1.5">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                </motion.div>
              ) : (
                <motion.p key="desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.15 }}
                  className="text-xs text-white/50 font-light leading-relaxed line-clamp-3"
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Inquire Button — always visible */}
          <button
            onClick={onInquire}
            className="w-full py-4 rounded-full border transition-all duration-500 uppercase tracking-[0.3em] text-[11px] font-bold flex items-center justify-center gap-2 group/inquire hover:shadow-lg"
            style={{ borderColor: "#D4A04A40", backgroundColor: "#D4A04A15", color: "#D4A04A" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#D4A04A30";
              e.currentTarget.style.color = "#f5e6d0";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(212, 160, 74, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#D4A04A15";
              e.currentTarget.style.color = "#D4A04A";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Inquire
            <Wine className="w-3.5 h-3.5 transition-transform duration-500 group-hover/inquire:scale-110" />
          </button>
        </div>
      </GlassSurface>
    </div>
  );
};
/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT: ProductSection
   Pinned full-viewport showcase with bottle carousel.
   ═══════════════════════════════════════════════════════════════ */

export function ProductSection({ id, inventory = [] }: { id?: string; inventory?: Inventory[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBottleIndex, setActiveBottleIndex] = useState(0);
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const [, startTransition] = useTransition();
  // Holds the product ID to pre-select in the inquiry modal.
  // Kept separate from mobileDetailBottle so it survives the sheet close animation.
  const [pendingInquiryId, setPendingInquiryId] = useState("");

  // ── Shared cart state — persists across modal open/close ──
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});

  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [mobileDetailBottle, setMobileDetailBottle] = useState<Inventory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBrand, setFilterBrand] = useState<string | null>(null);
  const [isBrandDrawerOpen, setIsBrandDrawerOpen] = useState(false);
  const [brandSearchText, setBrandSearchText] = useState("");
  const [activeScrubberLetter, setActiveScrubberLetter] = useState<string | null>(null);
  const brandListRef = useRef<HTMLDivElement>(null);
  const listScrollRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const MOBILE_PAGE_SIZE = 20;
  const [mobileVisibleCount, setMobileVisibleCount] = useState(MOBILE_PAGE_SIZE);

  // Get unique brands from inventory
  const brands = useMemo(() => {
    return Array.from(new Set(inventory.map(b => b.brand).filter(Boolean))) as string[];
  }, [inventory]);

  const activeBrand = brands[activeBrandIndex] ?? null;

  const handleScrubberTouch = useCallback((e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    
    const element = document.elementFromPoint(clientX, clientY);
    if (element && element.hasAttribute('data-scrubber-letter')) {
      const letter = element.getAttribute('data-scrubber-letter')!;
      if (activeScrubberLetter !== letter) {
        setActiveScrubberLetter(letter);
        const target = letterRefs.current[letter];
        const container = brandListRef.current;
        if (target && container) {
          container.scrollTo({ top: target.offsetTop, behavior: 'instant' });
        }
      }
    }
  }, [activeScrubberLetter]);

  const handleScrubberEnd = useCallback(() => {
    setActiveScrubberLetter(null);
  }, []);

  // Batch brand + bottle index change to avoid double render
  const switchBrand = useCallback((newIndex: number) => {
    startTransition(() => {
      setActiveBrandIndex(newIndex);
      setActiveBottleIndex(0);
    });
    
    // Clear search query globally so brand selection overrides search.
    // Note: window.dispatchEvent must be outside the setState updater to avoid "Cannot update a component while rendering a different component" errors.
    setSearchQuery("");
    window.dispatchEvent(new CustomEvent("navbar-search", { detail: { query: "" } }));
  }, []);

  // Filter inventory based on active filters
  // If global searchQuery is present, we filter globally on both desktop and mobile.
  const filteredBottles = useMemo(() => {
    const filtered = inventory.filter((b: Inventory) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const nameMatch = b.product_name.toLowerCase().includes(q);
        const brandMatch = b.brand?.toLowerCase().includes(q);
        const categoryMatch = b.category?.toLowerCase().includes(q);
        const skuMatch = b.sku?.toLowerCase().includes(q);
        if (!nameMatch && !brandMatch && !categoryMatch && !skuMatch) return false;
      } else {
        if (isMobile) {
          if (filterBrand && b.brand?.toUpperCase() !== filterBrand.toUpperCase()) return false;
        } else {
          if (activeBrand && b.brand?.toUpperCase() !== activeBrand.toUpperCase()) return false;
        }
      }
      if (filterCategory && b.category !== filterCategory) return false;
      return true;
    });
    // Images first, no-image products at the end
    return [
      ...filtered.filter(b => b.image_url),
      ...filtered.filter(b => !b.image_url),
    ];
  }, [inventory, activeBrand, filterCategory, isMobile, filterBrand, searchQuery]);

  // Sync with global navbar search events and scroll to products catalog
  useEffect(() => {
    const handleGlobalSearch = (e: Event) => {
      const { query } = (e as CustomEvent).detail;
      setSearchQuery(query || "");

      if (query) {
        const el = document.getElementById("products");
        if (el) {
          const activeLenis = (window as any).lenis || (window as any).Lenis;
          if (activeLenis) {
            activeLenis.scrollTo(el, {
              duration: 1.5,
              offset: 1000,
              lock: true,
              force: true
            });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };
    window.addEventListener("navbar-search", handleGlobalSearch);
    return () => {
      window.removeEventListener("navbar-search", handleGlobalSearch);
    };
  }, []);

  // Sync with global product selection from mobile fullscreen search overlay
  useEffect(() => {
    const handleOpenDetail = (e: Event) => {
      const { productId, productSku } = (e as CustomEvent).detail;
      const found = inventory.find(b => b.id === productId || b.sku === productSku);
      if (found) {
        setMobileDetailBottle(found);
      }
    };
    window.addEventListener("open-product-detail", handleOpenDetail);
    return () => {
      window.removeEventListener("open-product-detail", handleOpenDetail);
    };
  }, [inventory]);

  // Reset pagination when filters change
  useEffect(() => {
    setMobileVisibleCount(MOBILE_PAGE_SIZE);
  }, [filterCategory, filterBrand, searchQuery]);

  useEffect(() => {
    if (activeBottleIndex >= filteredBottles.length && filteredBottles.length > 0) {
      setActiveBottleIndex(0);
    }
  }, [filteredBottles.length, activeBottleIndex]);

  // Check if scroll indicator is needed
  useEffect(() => {
    const checkScroll = () => {
      if (listScrollRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = listScrollRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 10);
      }
    };
    checkScroll();
    // Re-check on resize
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [filteredBottles]);

  const activeBottle = filteredBottles[activeBottleIndex] || null;

  // Notify MobileNavigation to hide when product section is in view
  useEffect(() => {
    if (!isMobile || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(new CustomEvent("product-section-visible", {
          detail: { visible: entry.isIntersecting }
        }));
      },
      { threshold: 0.01 }
    );
    observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      // Reset navbar visibility when unmounting
      window.dispatchEvent(new CustomEvent("product-section-visible", { detail: { visible: false } }));
    };
  }, [isMobile]);

  // Color cache — keyed by image_url, never recomputed for the same image
  const colorCache = useRef<Map<string, { base: string; mid: string; glow: string }>>(new Map());

  const [extractedColor, setExtractedColor] = useState<{ base: string; mid: string; glow: string }>({
    base: "#050403",
    mid: "rgba(212, 160, 74, 0.15)",
    glow: "rgba(212, 160, 74, 0.3)"
  });

  // Preload all bottle images when inventory loads so switching brands is instant
  useEffect(() => {
    const urls = inventory.map(b => transformDriveUrl(b.image_url)).filter(Boolean) as string[];
    preloadAllImages(urls);
  }, [inventory]);

  useEffect(() => {
    if (!activeBottle?.image_url) {
      setExtractedColor({ base: "#050403", mid: "rgba(212, 160, 74, 0.15)", glow: "rgba(212, 160, 74, 0.2)" });
      return;
    }

    const url = transformDriveUrl(activeBottle.image_url);

    // Return cached result immediately — no canvas work needed
    if (colorCache.current.has(url)) {
      setExtractedColor(colorCache.current.get(url)!);
      return;
    }

    // Debounce: wait 150ms so rapid brand switching doesn't queue canvas work
    const debounce = setTimeout(() => {
      const colorImg = new window.Image();
      colorImg.crossOrigin = "anonymous";
      colorImg.src = url;

      colorImg.onload = () => {
        requestAnimationFrame(() => {
          const canvas = document.createElement("canvas");
          canvas.width = 10;
          canvas.height = 10;
          const ctx = canvas.getContext("2d")
          if (!ctx) return;

          ctx.drawImage(colorImg, 0, 0, 10, 10);
          const data = ctx.getImageData(0, 0, 10, 10).data;

          let r = 0, g = 0, b = 0, count = 0;
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 50) {
              r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
            }
          }

          const fallback = { base: "#0a0805", mid: "rgba(212, 160, 74, 0.15)", glow: "rgba(212, 160, 74, 0.3)" };
          if (count === 0) { colorCache.current.set(url, fallback); setExtractedColor(fallback); return; }

          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);

          const result = {
            base: `rgb(${Math.max(8, Math.round(r * 0.15))}, ${Math.max(6, Math.round(g * 0.15))}, ${Math.max(4, Math.round(b * 0.15))})`,
            mid: `rgba(${r}, ${g}, ${b}, 0.2)`,
            glow: `rgba(${r}, ${g}, ${b}, 0.45)`
          };

          colorCache.current.set(url, result);
          setExtractedColor(result);
        });
      };

      colorImg.onerror = () => {
        const fallback = { base: "#050403", mid: "rgba(212, 160, 74, 0.1)", glow: "rgba(212, 160, 74, 0.2)" };
        colorCache.current.set(url, fallback);
        setExtractedColor(fallback);
      };
    }, 150);

    return () => clearTimeout(debounce);
  }, [activeBottle?.image_url]);

  const activeColor = extractedColor;

  // Reset bottle index when filters change
  const handleFilterChange = useCallback(() => {
    setActiveBottleIndex(0);
  }, []);

  // GSAP ScrollTrigger — pinned section with entrance/exit animations
  useLayoutEffect(() => {
    let ctx: gsap.Context;
    let timer: NodeJS.Timeout;

    // Nav click intro animation defined here to be added/removed properly
    const handleNavIntro = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail !== "product") return;

      // Ensure elements exist before animating to avoid GSAP warnings/errors
      const carousel = document.querySelector(".product-hero-carousel");
      if (!carousel) return;

      const introTl = gsap.timeline();
      introTl.fromTo(
        ".product-hero-carousel",
        { y: 200, scale: 0.7, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
      );
      introTl.fromTo(
        ".product-detail-wrapper",
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
      introTl.fromTo(
        ".product-sidebar",
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      );
    };

    const initAnimation = () => {
      const lenis = (window as any).lenis || (window as any).Lenis;
      if (!lenis) {
        timer = setTimeout(initAnimation, 50);
        return;
      }

      ctx = gsap.context(() => {
        if (!wrapperRef.current || !sectionRef.current) return;

        gsap.config({ force3D: true });
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          const masterTl = gsap.timeline({
            scrollTrigger: {
              scroller: window,
              trigger: sectionRef.current,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${sectionRef.current!.offsetWidth * 1.5}`,
              refreshPriority: 6,
              invalidateOnRefresh: true,
              anticipatePin: 1, // Helps avoid jumps during pin/unpin
            },
          });

          // --- PHASE 1: INTRO ---
          masterTl.to({}, { duration: 1 });
          masterTl.addLabel("intro");

          // Bottle carousel
          masterTl.fromTo(
            ".product-hero-carousel",
            { y: 200, opacity: 0, scale: 0.85 },
            { y: 0, opacity: 1, scale: 1, duration: 2.5, ease: "expo.out", force3D: true, lazy: true },
            "intro+=0.2"
          );

          // Detail card & Sidebar
          masterTl.fromTo(
            ".product-detail-wrapper",
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", force3D: true },
            "intro+=0.6"
          );
          masterTl.fromTo(
            ".product-sidebar",
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", force3D: true },
            "intro+=0.6"
          );

          // --- PHASE 2: DWELL ---
          masterTl.to({}, { duration: 1.5 });

          // --- PHASE 3: OUTRO ---
          masterTl.addLabel("outro");

          masterTl.to(
            ".product-hero-carousel",
            { y: 120, opacity: 0, scale: 0.9, duration: 3, ease: "power2.inOut", force3D: true, lazy: true },
            "outro"
          );

          masterTl.to(
            ".product-detail-wrapper",
            { x: 80, opacity: 0, duration: 2.5, ease: "power2.inOut", force3D: true, lazy: true },
            "outro"
          );
          masterTl.to(
            ".product-sidebar",
            { x: -80, opacity: 0, duration: 2.5, ease: "power2.inOut", force3D: true, lazy: true },
            "outro"
          );
        });

        // Simple animation for mobile
        mm.add("(max-width: 767px)", () => {
          gsap.fromTo(
            ".product-detail-wrapper",
            { opacity: 0, y: 30 },
            { 
              opacity: 1, y: 0, duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: ".product-detail-wrapper",
                start: "top 85%"
              }
            }
          );
        });
      }, sectionRef);

      window.addEventListener("play-section-intro", handleNavIntro);
    };

    initAnimation();

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
      window.removeEventListener("play-section-intro", handleNavIntro);
    };
  }, [isMobile]);

  return (
    <motion.section
      id={id || "product"}
      ref={sectionRef}
      className="h-[100dvh] md:h-screen w-full relative z-20"
      animate={{ backgroundColor: activeColor.base }}
      transition={{ duration: 1.5 }}
    >
      {/* GLOBAL PRODUCT SPOTLIGHT - No Clipping */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${activeColor.glow} 0%, ${activeColor.mid} 35%, ${activeColor.base} 70%)`
        }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Secondary glass frosting layer (optimised blur out to save composite load) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{ opacity: 1 }}
      />

      <div
        ref={wrapperRef}
        className={`relative z-10 flex flex-col h-full w-full pb-4 ${isMobile ? 'pt-2 px-0' : 'pt-24 px-12'}`}
      >
        {/* Main Content Area */}
        <div className={`flex-1 w-full relative min-h-0 ${isMobile ? '' : 'isolate'}`}>
          {/* Bottle Selection Sidebar — Left (Desktop only) */}
          <div
            className="product-sidebar absolute z-40 left-0 lg:left-4 xl:left-12 top-1/2 -translate-y-1/2 w-[280px] hidden lg:flex flex-col max-h-[75vh] items-start will-change-[transform,opacity,filter]"
            style={{ paddingBlock: "10px" }}
          >
            {/* Filter Controls */}
            <div className="w-full flex flex-col gap-3 mb-2 pb-4 border-b border-white/10 shrink-0">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-1">Selections Filters</h3>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveBottleIndex(0);
                    // Do NOT dispatch "navbar-search" here — that would echo back
                    // into the navbar input and steal focus from this field.
                  }}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-8 py-2 rounded-lg border border-white/10 bg-black/30 text-white text-[11px] tracking-wide outline-none placeholder:text-white/40 focus:border-[#D4A04A]/50 transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setActiveBottleIndex(0);
                    }} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-white/40" />
                  </button>
                )}
              </div>

              <div className="flex bg-black/30 border border-white/10 rounded-lg overflow-hidden relative group">
                <select
                  aria-label="Filter by Category"
                  className="w-full bg-transparent text-white/80 text-[10px] uppercase tracking-widest px-3 py-2.5 outline-none appearance-none cursor-pointer focus:border-[#D4A04A] transition-colors"
                  value={filterCategory || "ALL"}
                  onChange={(e) => { setFilterCategory(e.target.value === "ALL" ? null : (e.target.value as any)); setActiveBottleIndex(0); }}
                >
                  <option value="ALL" className="text-black">All Categories</option>
                  {Array.from(new Set(inventory.map(b => b.category))).map(cat => (
                    <option key={cat} value={cat} className="text-black">{cat}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </div>
              </div>
            </div>

            {/* Scrollable Product List */}
            <div 
              ref={listScrollRef}
              className="w-full overflow-y-auto scrollbar-none flex flex-col gap-1 pb-8 flex-1 min-h-0"
              data-lenis-prevent="true"
              onScroll={(e) => {
                const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
                setShowScrollIndicator(scrollTop + clientHeight < scrollHeight - 10);
              }}
            >
              {filteredBottles.map((bottle, idx) => (
                <button
                  key={`${bottle.id}-${idx}`}
                  onClick={() => setActiveBottleIndex(idx)}
                  className={`text-left px-3 py-2.5 rounded-xl text-xs font-serif tracking-wider transition-all duration-300 w-full truncate shrink-0 ${idx === activeBottleIndex
                      ? "font-bold border shadow-[0_0_15px_rgba(212,160,74,0.15)]"
                      : "text-white/40 hover:text-white/80 hover:bg-white/5 border border-transparent"
                    }`}
                  style={
                    idx === activeBottleIndex
                      ? { color: "#D4A04A", borderColor: "#D4A04A55", backgroundColor: "#D4A04A15" }
                      : {}
                  }
                >
                  {bottle.product_name}
                </button>
              ))}
            </div>

            {/* Scroll down indicator */}
            <AnimatePresence>
              {showScrollIndicator && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none flex items-end justify-center pb-1"
                  style={{ background: "linear-gradient(to top, rgba(5,4,3,0.95) 0%, rgba(5,4,3,0.6) 50%, transparent 100%)" }}
                >
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-medium">Scroll</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D4A04A]/50 rotate-90" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Layout — Preview Grid + Bottom Search/Filter/CTA Bar */}
          {isMobile && (() => {
            const PREVIEW_COUNT = 12;
            const previewBottles = filteredBottles.slice(0, PREVIEW_COUNT);
            const totalCount = filteredBottles.length;
            return (
            <div className="relative z-20 flex flex-col w-full h-full overflow-hidden">

               {/* Header */}
               <div className="shrink-0 px-4 pt-4 pb-3">
                 <p className="text-[9px] uppercase tracking-[0.5em] text-[#D4A04A]/60 font-bold mb-0.5">Wine Century Brothers</p>
                 <h2 className="text-2xl font-serif font-bold text-[#f5e6d0] leading-tight">
                   Our Collection
                 </h2>
                 <p className="text-[10px] text-white/30 mt-1 font-light tracking-wide">
                   {filteredBottles.length} products available
                   {filterCategory && <span className="text-[#D4A04A]/70"> · {filterCategory}</span>}
                   {searchQuery && <span className="text-[#D4A04A]/70"> · "{searchQuery}"</span>}
                 </p>
               </div>

               {/* Divider */}
               <div className="shrink-0 mx-4 h-px mb-2" style={{ background: "linear-gradient(to right, rgba(212,160,74,0.3), transparent)" }} />
               <div className="flex-1 overflow-y-auto px-3 pt-3 pb-2 min-h-0" data-lenis-prevent>
                 {filteredBottles.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-full text-white/30 gap-3 py-16">
                     <Wine className="w-8 h-8 opacity-20" />
                     <span className="text-xs tracking-widest uppercase">No products found</span>
                     <button onClick={() => { setSearchQuery(""); setFilterCategory(null); }} className="text-[10px] text-[#D4A04A] uppercase tracking-wider font-bold mt-1">Clear filters</button>
                   </div>
                 ) : (
                   <div className="grid grid-cols-3 gap-2">
                     {previewBottles.map((bottle, idx) => (
                       <motion.button
                         key={`${bottle.id}-${idx}`}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: idx * 0.03, duration: 0.25 }}
                         onClick={() => setMobileDetailBottle(bottle)}
                         className="relative flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden text-left active:scale-[0.96] transition-transform duration-150 group"
                       >
                         <div className="relative aspect-[2/3] w-full bg-zinc-900/60 overflow-hidden">
                           {bottle.image_url ? (
                             <Image src={bottle.image_url} alt={`${bottle.product_name} | Wine Century Brothers`} fill sizes="33vw" className="object-cover opacity-80 group-active:scale-105 transition-transform duration-500" crossOrigin="anonymous" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center"><Wine className="w-5 h-5 text-white/10" /></div>
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                           <div className="absolute bottom-1.5 left-0 right-0 flex justify-center">
                             <span className="text-[8px] font-bold text-[#D4A04A]">₱{bottle.srp?.toLocaleString() ?? '—'}</span>
                           </div>
                         </div>
                         <div className="px-1.5 py-1.5">
                           <p className="text-[8px] font-bold text-[#f5e6d0] leading-tight line-clamp-2">{bottle.product_name}</p>
                         </div>
                       </motion.button>
                     ))}
                   </div>
                 )}
               </div>

               {/* ── BOTTOM BAR: Search + Filter pill + CTA ── */}
               <div
                 className="shrink-0 px-3 pt-2 pb-3 border-t border-white/[0.06] bg-black/80 backdrop-blur-xl flex flex-col gap-2"
                 style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px) + 8px)" }}
               >
                 {/* Row 1: Search + filter pill */}
                 <div className="flex items-center gap-2">
                   <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
                     <input
                       type="text"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       placeholder="Search wines, spirits..."
                       className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-[11px] tracking-wide outline-none placeholder:text-white/25 focus:border-[#D4A04A]/40 transition-colors"
                     />
                     {searchQuery && (
                       <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2" aria-label="Clear search">
                         <X className="w-3.5 h-3.5 text-white/40" />
                       </button>
                     )}
                   </div>
                   {/* Filter pill */}
                   <button
                     onClick={() => setIsBrandDrawerOpen(true)}
                     className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-[9px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-all shrink-0 ${filterCategory ? 'bg-[#D4A04A]/20 border-[#D4A04A]/40 text-[#D4A04A]' : 'bg-white/5 border-white/10 text-white/50'}`}
                   >
                     <Filter className="w-3 h-3" />
                     {filterCategory ?? "Filter"}
                   </button>
                 </div>

                 {/* Row 2: View Full Catalog CTA */}
                 <button
                   onClick={() => setIsModalOpen(true)}
                   className="w-full py-3 rounded-2xl border border-[#D4A04A]/40 bg-[#D4A04A]/10 flex items-center justify-between px-4 active:scale-[0.97] transition-all"
                 >
                   <div className="flex flex-col items-start gap-0.5">
                     <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D4A04A]">View Full Catalog</span>
                     <span className="text-[9px] text-white/30 font-light">
                       {totalCount > PREVIEW_COUNT ? `Showing ${PREVIEW_COUNT} of ${totalCount} — tap to browse all` : `${totalCount} products · place an inquiry`}
                     </span>
                   </div>
                   <div className="w-7 h-7 rounded-full bg-[#D4A04A]/15 border border-[#D4A04A]/30 flex items-center justify-center shrink-0">
                     <ChevronRight className="w-3.5 h-3.5 text-[#D4A04A]" />
                   </div>
                 </button>
               </div>

               {/* Category filter bottom sheet (reuses isBrandDrawerOpen state) */}
               <AnimatePresence>
                 {isBrandDrawerOpen && (
                   <>
                     <motion.div
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                       onClick={() => setIsBrandDrawerOpen(false)}
                       className="fixed inset-0 z-[58] bg-black/60 backdrop-blur-sm"
                     />
                     <motion.div
                       initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                       transition={{ type: "spring", stiffness: 400, damping: 40 }}
                       drag="y"
                       dragConstraints={{ top: 0, bottom: 0 }}
                       dragElastic={{ top: 0, bottom: 0.4 }}
                       dragMomentum={false}
                       onDragEnd={(_, info) => { if (info.offset.y > 60 || info.velocity.y > 400) setIsBrandDrawerOpen(false); }}
                       className="fixed inset-x-0 bottom-0 z-[59] rounded-t-3xl bg-[#0d0b08] border-t border-white/[0.08] touch-none"
                       style={{ paddingBottom: "max(32px, env(safe-area-inset-bottom, 0px) + 16px)" }}
                       onClick={(e) => e.stopPropagation()}
                     >
                       <div className="flex justify-center pt-3 pb-4 cursor-grab active:cursor-grabbing"><div className="w-10 h-1 rounded-full bg-white/20" /></div>
                       <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold px-5 mb-3">Filter by Category</p>
                       <div className="flex flex-wrap gap-2 px-5">
                         <button
                           onClick={() => { setFilterCategory(null); setActiveBottleIndex(0); setIsBrandDrawerOpen(false); }}
                           className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${!filterCategory ? 'bg-[#D4A04A] text-black' : 'bg-white/5 border border-white/10 text-white/50'}`}
                         >All</button>
                         {Array.from(new Set(inventory.map(b => b.category).filter(Boolean))).map(cat => (
                           <button
                             key={cat as string}
                             onClick={() => { setFilterCategory(cat as string); setActiveBottleIndex(0); setSearchQuery(""); setIsBrandDrawerOpen(false); }}
                             className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all ${filterCategory === cat ? 'bg-[#D4A04A] text-black' : 'bg-white/5 border border-white/10 text-white/50'}`}
                           >{cat as string}</button>
                         ))}
                       </div>
                     </motion.div>
                   </>
                 )}
               </AnimatePresence>

               {/* Detail sheet backdrop */}
               <AnimatePresence>
                 {mobileDetailBottle && (
                   <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setMobileDetailBottle(null)} className="fixed inset-0 z-[55] bg-black/80 backdrop-blur-sm" />
                 )}
               </AnimatePresence>

               {/* Detail sheet */}
               <AnimatePresence>
                 {mobileDetailBottle && (() => {
                   const desc = "An exquisite selection from one of the world's most celebrated estates, distinguished by exceptional terroir expression and masterful craftsmanship.";
                   return (
                     <motion.div
                       key="detail-sheet"
                       initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                       transition={{ type: "spring", stiffness: 400, damping: 40 }}
                       drag="y" dragConstraints={{ top: 0, bottom: 2000 }} dragElastic={0.1} dragMomentum={false}
                       onDragEnd={(_, info) => { if (info.offset.y > 100 || info.velocity.y > 500) setMobileDetailBottle(null); }}
                       className="fixed inset-x-0 bottom-0 z-[56] max-h-[92dvh] rounded-t-3xl overflow-hidden flex flex-col will-change-transform"
                       style={{ backgroundColor: "#0a0806" }}
                       onClick={(e) => e.stopPropagation()}
                     >
                       <div className="flex justify-center pt-3 pb-1 shrink-0 touch-none"><div className="w-10 h-1 rounded-full bg-white/20" /></div>
                       <div className="flex-1 overflow-y-auto pb-8" data-lenis-prevent>
                         <div className="relative w-full aspect-[4/5] max-h-[50vh] bg-gradient-to-b from-zinc-900/40 to-[#0a0806] overflow-hidden touch-none">
                           {mobileDetailBottle.image_url ? (
                             <Image src={mobileDetailBottle.image_url} alt={`${mobileDetailBottle.product_name} | Wine Century Brothers`} fill sizes="100vw" priority className="object-cover" crossOrigin="anonymous" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center"><Wine className="w-16 h-16 text-white/10" /></div>
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/40 to-transparent" />
                           <button onClick={() => setMobileDetailBottle(null)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center active:scale-90 transition-transform z-10" aria-label="Close">
                             <X className="w-4 h-4 text-white/70" />
                           </button>
                           <div className="absolute top-3 left-3 z-10">
                             <span className="text-[8px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-[#D4A04A]/30 bg-black/50 backdrop-blur-md text-[#D4A04A]">{mobileDetailBottle.category}</span>
                           </div>
                         </div>
                         <div className="px-5 -mt-6 relative z-10">
                           {mobileDetailBottle.brand && <p className="text-[9px] uppercase tracking-[0.35em] font-bold text-[#D4A04A]/70 mb-2">{mobileDetailBottle.brand}</p>}
                           <h3 className="text-2xl font-serif font-bold text-[#f5e6d0] leading-tight mb-4">{mobileDetailBottle.product_name}</h3>
                           <div className="flex items-baseline gap-2 mb-5">
                             <span className="text-xl font-bold text-[#D4A04A]">₱{mobileDetailBottle.srp?.toLocaleString() ?? '0'}</span>
                             {(mobileDetailBottle.quantity ?? 0) > 0 && <span className="text-[9px] text-emerald-500/80 font-bold uppercase tracking-wider">{mobileDetailBottle.quantity} available</span>}
                           </div>
                           <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-white/[0.06] mb-5">
                             <div className="flex flex-col gap-1"><span className="text-[8px] uppercase tracking-[0.25em] text-white/25 font-bold">Region</span><span className="text-[11px] text-white/80 font-light">{mobileDetailBottle["Country/Region"]}</span></div>
                             <div className="flex flex-col gap-1"><span className="text-[8px] uppercase tracking-[0.25em] text-white/25 font-bold">Case Qty</span><span className="text-[11px] text-white/80 font-light">{mobileDetailBottle.case_qnt}</span></div>
                             <div className="flex flex-col gap-1"><span className="text-[8px] uppercase tracking-[0.25em] text-white/25 font-bold">SKU</span><span className="text-[11px] text-white/80 font-light">{mobileDetailBottle.sku}</span></div>
                           </div>
                           <p className="text-[13px] text-white/50 font-light leading-relaxed mb-6">{desc}</p>
                           <div className="flex flex-col gap-3 pb-4">
                             <button onClick={() => { setPendingInquiryId(mobileDetailBottle.id); setMobileDetailBottle(null); setIsModalOpen(true); }} className="w-full py-4 rounded-2xl border border-[#D4A04A]/40 bg-[#D4A04A]/15 text-[#f5e6d0] text-[11px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2.5 active:scale-[0.97] transition-all">
                               <Wine className="w-4 h-4 text-[#D4A04A]" />Inquire Now
                             </button>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   );
                 })()}
               </AnimatePresence>
            </div>
            );
          })()}

          {/* Hero Bottle Carousel - Desktop Only */}
          {!isMobile && (
            <div className="product-hero-carousel absolute inset-0 z-10 flex items-center justify-center">
              <HeroBottleCarousel
                bottles={filteredBottles}
                activeIndex={activeBottleIndex}
                onIndexChange={setActiveBottleIndex}
                activeColor={activeColor}
              />
            </div>
          )}

          {/* Detail Card — floating right - Desktop Only */}
          {!isMobile && (
            <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-6 lg:pr-12 xl:pr-16 pointer-events-none">
              <div className="product-detail-wrapper w-[90vw] lg:w-[380px] pointer-events-auto will-change-[transform,opacity,filter]">
                <BottleDetailCard
                  bottle={activeBottle}
                  onInquire={() => { setPendingInquiryId(activeBottle?.id ?? ""); setIsModalOpen(true); }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Brand Selection at Bottom Center — Desktop Only */}
        <div className={`product-brand-selector w-full mt-4 md:mt-6 flex-col items-center z-20 relative select-none mb-16 md:mb-0 ${isMobile ? 'hidden' : 'flex'}`}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 w-full justify-center">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, #D4A04A44)` }} />
            <span className="text-[10px] uppercase tracking-[0.5em] font-semibold" style={{ color: "#D4A04A99" }}>
              Select Brand
            </span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, #D4A04A44)` }} />
          </div>

          {/* Brand Carousel — looping, same pan logic as bottle carousel */}
          <div className="relative w-full h-24 overflow-hidden touch-pan-y">
            {/* Carousel Content */}

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              onPanEnd={(_, info) => {
                const threshold = 50;
                const velocityThreshold = 300;
                if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
                  switchBrand((activeBrandIndex + 1) % brands.length);
                } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
                  switchBrand((activeBrandIndex - 1 + brands.length) % brands.length);
                }
              }}
            >
              {brands.map((brandName, idx) => {
                // Wrap distance so carousel loops
                let distance = idx - activeBrandIndex;
                const half = Math.floor(brands.length / 2);
                if (distance > half) distance -= brands.length;
                if (distance < -half) distance += brands.length;

                const isActive = distance === 0;
                const absDist = Math.abs(distance);
                const STEP = 100;

                return (
                  <motion.button
                    key={`${brandName}-${idx}`}
                    className="absolute flex flex-col items-center gap-2 w-[80px]"
                    animate={{
                      x: distance * STEP,
                      scale: isActive ? 1.1 : absDist <= 2 ? 0.85 : 0.7,
                      opacity: isActive ? 1 : absDist === 1 ? 0.6 : absDist === 2 ? 0.3 : 0,
                      zIndex: brands.length - absDist,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    onClick={() => {
                      switchBrand(idx);
                    }}
                  >
                    {/* Brand Logo or Initial */}
                    {BRAND_LOGOS[brandName.toUpperCase()] || BRAND_LOGOS[brandName] ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden border transition-all duration-300"
                        style={{
                          border: isActive ? "1px solid #D4A04A66" : "1px solid rgba(255,255,255,0.1)",
                          boxShadow: isActive ? "0 0 20px #D4A04A30" : "none",
                        }}
                      >
                        <img
                          src={BRAND_LOGOS[brandName.toUpperCase()] || BRAND_LOGOS[brandName] || ""}
                          alt={brandName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold uppercase text-sm border transition-all duration-300"
                        style={{
                          border: isActive ? "1px solid #D4A04A66" : "1px solid rgba(255,255,255,0.1)",
                          background: isActive
                            ? "radial-gradient(circle at 40% 35%, #D4A04A25, transparent 70%), rgba(255,255,255,0.05)"
                            : "rgba(255,255,255,0.02)",
                          color: isActive ? "#f5e6d0" : "rgba(255,255,255,0.8)",
                          boxShadow: isActive ? "0 0 20px #D4A04A30, inset 0 1px 0 #D4A04A40" : "none",
                        }}
                      >
                        {brandName[0]}
                      </div>
                    )}
                    <span
                      className="text-[9px] uppercase tracking-[0.3em] font-medium text-center w-full truncate"
                      style={{ color: isActive ? "#D4A04A" : "rgba(255,255,255,0.5)" }}
                    >
                      {brandName}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Floating Cart Bar ── */}
      <AnimatePresence>
        {(() => {
          const totalItems = Object.values(cartQuantities).reduce((a, b) => a + b, 0);
          const totalPrice = Object.entries(cartQuantities).reduce((total, [id, qty]) => {
            const item = inventory.find(i => i.id === id);
            return total + ((item?.srp || 0) * qty);
          }, 0);
          if (totalItems === 0) return null;
          return (
            <motion.div
              key="floating-cart"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className={`fixed z-50 ${isMobile ? 'bottom-[140px] right-3' : 'bottom-8 right-8'}`}
            >
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-[#D4A04A]/30 bg-[#0a0806]/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(212,160,74,0.1)]">
                <div className="relative">
                  <ShoppingCart className="w-4.5 h-4.5 text-[#D4A04A]" />
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#D4A04A] text-black text-[8px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                  <span className="text-[13px] font-bold text-[#D4A04A] tracking-wide">
                    ₱{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="w-px h-8 bg-white/10 mx-1" />
                <button
                  onClick={() => setCartQuantities({})}
                  className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400/70 hover:border-red-400/30 transition-all"
                  aria-label="Clear cart"
                  title="Clear cart"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#D4A04A]/20 border border-[#D4A04A]/40 text-[#D4A04A] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4A04A]/30 transition-all active:scale-[0.96]"
                >
                  Check Out
                </button>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setPendingInquiryId(""); }}
        defaultOption={pendingInquiryId || (isMobile ? "" : activeBottle?.id ?? "")}
        inventory={inventory}
        quantities={cartQuantities}
        onQuantitiesChange={setCartQuantities}
      />
    </motion.section>
  );
}
