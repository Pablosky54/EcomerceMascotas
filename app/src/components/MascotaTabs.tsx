/**
 * MascotaTabs Component
 * Segmented control for pet type selection (Dogs vs Cats)
 * Features: Clear visual separation, smooth transitions, responsive design
 */
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Dog, Cat } from 'lucide-react';

interface MascotaTabsProps {
  activeTab: 'dog' | 'cat';
  onTabChange: (tab: 'dog' | 'cat') => void;
}

export default function MascotaTabs({ activeTab, onTabChange }: MascotaTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const dogsButtonRef = useRef<HTMLButtonElement>(null);
  const catsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animate entrance on mount
    const buttons = containerRef.current?.querySelectorAll('button');
    if (buttons) {
      gsap.fromTo(
        buttons,
        { opacity: 0, y: -12, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
      );
    }
  }, []);

  const handleTabChange = (tab: 'dog' | 'cat') => {
    if (activeTab === tab) return;
    onTabChange(tab);
    
    // Animate indicator
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute top-10 sm:top-12 left-4 sm:left-8 right-4 sm:right-8 lg:left-16 lg:right-16 z-20 flex gap-2 sm:gap-3"
    >
      {/* Segmented Control Container */}
      <div className="relative flex gap-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 sm:p-1.5">
        {/* Animated Background Indicator */}
        <div
          ref={indicatorRef}
          className={`absolute top-1 sm:top-1.5 w-1/2 h-[calc(100%-8px)] sm:h-[calc(100%-12px)] rounded-full bg-white/20 backdrop-blur transition-all duration-300 ${
            activeTab === 'dog' ? 'left-1 sm:left-1.5' : 'left-1/2 sm:left-[calc(50%+6px)]'
          }`}
        />

        {/* Dogs Tab */}
        <button
          ref={dogsButtonRef}
          onClick={() => handleTabChange('dog')}
          className={`
            relative z-10 px-3 sm:px-5 lg:px-6 py-2.5 lg:py-3 rounded-full font-semibold 
            text-xs sm:text-sm lg:text-base transition-all duration-300
            flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none justify-center
            ${
              activeTab === 'dog'
                ? 'text-[var(--pp-gold)] drop-shadow-lg'
                : 'text-white/70 hover:text-white'
            }
          `}
          aria-label="Ver mascotas tipo perro"
        >
          <Dog size={18} className="sm:size-20 lg:size-22" />
          <span className="hidden sm:inline font-playfair">Caninos</span>
        </button>

        {/* Cats Tab */}
        <button
          ref={catsButtonRef}
          onClick={() => handleTabChange('cat')}
          className={`
            relative z-10 px-3 sm:px-5 lg:px-6 py-2.5 lg:py-3 rounded-full font-semibold 
            text-xs sm:text-sm lg:text-base transition-all duration-300
            flex items-center gap-1 sm:gap-2 flex-1 sm:flex-none justify-center
            ${
              activeTab === 'cat'
                ? 'text-[var(--pp-gold)] drop-shadow-lg'
                : 'text-white/70 hover:text-white'
            }
          `}
          aria-label="Ver mascotas tipo gato"
        >
          <Cat size={18} className="sm:size-20 lg:size-22" />
          <span className="hidden sm:inline font-playfair">Felinos</span>
        </button>
      </div>

      {/* Optional: Description below tabs */}
      <div className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 flex justify-center">
        <p className="text-xs text-white/50 font-light">
          {activeTab === 'dog' ? 'Caninos Reales' : 'Felinos Exóticos'}
        </p>
      </div>
    </div>
  );
}
