/**
 * MenuOverlay Component
 * Full-screen navigation overlay with smooth scroll to sections
 */
import { X } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'INICIO', href: '#inicio' },
  { label: 'PERROS', href: '#perros' },
  { label: 'GATOS', href: '#gatos' },
  { label: 'TIENDA', href: '#tienda' },
  { label: 'ENVÍOS', href: '#envios' },
  { label: 'NOSOTROS', href: '#nosotros' },
  { label: 'CONTACTO', href: '#contacto' },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const handleClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-[var(--pp-bg-dark)] transition-all duration-500"
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'all' : 'none',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white hover:text-gold transition-colors z-10"
        aria-label="Cerrar menú"
      >
        <X size={24} className="sm:size-28" />
      </button>

      {/* Menu content */}
      <div className="h-full flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="mb-8 sm:mb-12">
          <svg
            width="60"
            height="60"
            className="sm:w-20 sm:h-20"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M60 50 L75 30 L90 45 L100 20 L110 45 L125 30 L140 50 L130 55 L70 55 Z" fill="#D4AF37" />
            <circle cx="100" cy="20" r="6" fill="#D4AF37" />
            <circle cx="75" cy="30" r="5" fill="#D4AF37" />
            <circle cx="125" cy="30" r="5" fill="#D4AF37" />
            <path d="M40 60 Q40 140 100 170 Q160 140 160 60 Z" stroke="#D4AF37" strokeWidth="3" fill="none" />
            <path d="M55 130 Q50 100 65 85 Q70 80 75 82 Q80 70 90 75 Q95 78 92 85 Q98 90 95 105 Q92 115 85 125 Q80 135 70 132 Q60 130 55 130Z" fill="#D4AF37" />
            <path d="M115 130 Q110 110 118 95 Q122 88 128 90 Q132 85 138 88 Q142 90 140 98 Q145 100 143 110 Q141 120 135 128 Q130 135 122 132 Q118 130 115 130Z" fill="#D4AF37" />
            <text x="100" y="115" textAnchor="middle" fill="#D4AF37" fontSize="22" fontFamily="'Playfair Display', serif" fontWeight="600">QP</text>
          </svg>
        </div>

        {/* Menu items */}
        <nav className="flex flex-col items-center gap-4 sm:gap-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleClick(item.href)}
              className="font-heading text-lg sm:text-2xl md:text-3xl text-white hover:text-gold transition-colors tracking-wider"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Social links */}
        <div className="absolute bottom-6 sm:bottom-8 flex gap-6 sm:gap-8 label-micro text-[var(--pp-text-secondary)] text-xs sm:text-sm">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">INSTAGRAM</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">FACEBOOK</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">TIKTOK</a>
        </div>
      </div>
    </div>
  );
}
