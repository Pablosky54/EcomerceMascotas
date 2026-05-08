/**
 * Header Component
 * Fixed header with centered logo and menu button
 * Logo scales down on scroll
 */
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuOpen: () => void;
}

export default function Header({ onMenuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(245, 245, 242, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
        {/* Wordmark left */}
        <div
          className="label-micro text-gold transition-all duration-500 text-xs sm:text-sm"
          style={{ opacity: scrolled ? 1 : 0 }}
        >
          PEDIGREE PALACE
        </div>

        {/* Center logo */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-500"
          style={{
            transform: `translateX(-50%) scale(${scrolled ? 0.5 : 0.75})`,
            top: scrolled ? '0.25rem' : '0.75rem',
          }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 200 200"
            fill="none"
            className="sm:w-15 sm:h-15 lg:w-16 lg:h-16"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Crown */}
            <path
              d="M60 50 L75 30 L90 45 L100 20 L110 45 L125 30 L140 50 L130 55 L70 55 Z"
              fill="#D4AF37"
            />
            <circle cx="100" cy="20" r="6" fill="#D4AF37" />
            <circle cx="75" cy="30" r="5" fill="#D4AF37" />
            <circle cx="125" cy="30" r="5" fill="#D4AF37" />
            {/* Shield outline */}
            <path
              d="M40 60 Q40 140 100 170 Q160 140 160 60 Z"
              stroke="#D4AF37"
              strokeWidth="3"
              fill="none"
            />
            {/* Dog silhouette */}
            <path
              d="M55 130 Q50 100 65 85 Q70 80 75 82 Q80 70 90 75 Q95 78 92 85 Q98 90 95 105 Q92 115 85 125 Q80 135 70 132 Q60 130 55 130Z"
              fill="#D4AF37"
            />
            {/* Cat silhouette */}
            <path
              d="M115 130 Q110 110 118 95 Q122 88 128 90 Q132 85 138 88 Q142 90 140 98 Q145 100 143 110 Q141 120 135 128 Q130 135 122 132 Q118 130 115 130Z"
              fill="#D4AF37"
            />
            {/* QP letters */}
            <text
              x="100"
              y="115"
              textAnchor="middle"
              fill="#D4AF37"
              fontSize="22"
              fontFamily="'Playfair Display', serif"
              fontWeight="600"
            >
              QP
            </text>
          </svg>
        </div>

        {/* Menu button right */}
        <button
          onClick={onMenuOpen}
          className="label-micro text-[var(--pp-text)] flex items-center gap-1 sm:gap-2 hover:text-gold transition-colors text-xs sm:text-sm"
          aria-label="Abrir menú"
        >
          <Menu size={16} className="sm:size-18" />
          <span className="hidden sm:inline">MENÚ</span>
        </button>
      </div>
    </header>
  );
}
