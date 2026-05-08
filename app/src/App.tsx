/**
 * Pedigree Palace - Main Application Component
 * Integrates all sections with global scroll snap system
 * Uses GSAP ScrollTrigger for pinned section animations
 */
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Header from '@/components/Header';
import WhatsAppButton from '@/components/WhatsAppButton';
import Chatbot from '@/components/Chatbot';
import MenuOverlay from '@/components/MenuOverlay';

// Sections
import SectionHero from '@/sections/SectionHero';
import SectionSplitPortrait from '@/sections/SectionSplitPortrait';
import SectionDelivery from '@/sections/SectionDelivery';
import SectionDogSpotlight from '@/sections/SectionDogSpotlight';
import SectionMetrics from '@/sections/SectionMetrics';
import SectionStoreIntro from '@/sections/SectionStoreIntro';
import SectionStoreCatalog from '@/sections/SectionStoreCatalog';
import SectionInternational from '@/sections/SectionInternational';
import SectionCatSpotlight from '@/sections/SectionCatSpotlight';
import SectionEcoPackaging from '@/sections/SectionEcoPackaging';
import SectionTracking from '@/sections/SectionTracking';
import SectionCatTricolor from '@/sections/SectionCatTricolor';
import SectionFooter from '@/sections/SectionFooter';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all section ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges with settle centers
      const settleRatios: Record<number, number> = {
        0: 0.35,  // Hero
        1: 0.52,  // Split
        2: 0.50,  // Delivery
        3: 0.50,  // Dog spotlight
        4: 0.50,  // Store intro
        5: 0.50,  // Store catalog
        6: 0.50,  // International
        7: 0.50,  // Cat spotlight
        8: 0.50,  // Eco packaging
        9: 0.50,  // Tracking
        10: 0.50, // Cat tricolor
      };

      const pinnedRanges = pinned.map((st, i) => {
        const start = st.start / maxScroll;
        const end = (st.end ?? st.start) / maxScroll;
        const settleRatio = settleRatios[i] ?? 0.5;
        const center = start + (end - start) * settleRatio;
        return { start, end, center };
      });

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cleanup ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Header */}
      <Header onMenuOpen={() => setMenuOpen(true)} />

      {/* Menu overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main content */}
      <main className="relative">
        <SectionHero />
        <SectionSplitPortrait />
        <SectionDelivery />
        <SectionDogSpotlight />
        <SectionMetrics />
        <SectionStoreIntro />
        <SectionStoreCatalog />
        <SectionInternational />
        <SectionCatSpotlight />
        <SectionEcoPackaging />
        <SectionTracking />
        <SectionCatTricolor />
        <SectionFooter />
      </main>

      {/* Floating buttons */}
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
}
