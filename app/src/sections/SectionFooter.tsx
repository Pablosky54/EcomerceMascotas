/**
 * Section 13: Contact + Footer
 * Flowing section with WhatsApp CTA and footer
 * Pin: false
 */
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Instagram, Facebook, Music2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SectionFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const phoneNumber = '573001234567';
  const message = encodeURIComponent('¡Hola Pedigree Palace! Me interesa conocer más sobre sus mascotas premium.');
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <footer
      ref={sectionRef}
      id="contacto"
      className="relative w-full z-[22]"
      style={{ background: 'var(--pp-bg)' }}
    >
      {/* Main contact area */}
      <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-20">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <h2 className="heading-xl text-[var(--pp-text)] text-2xl sm:text-4xl md:text-6xl lg:text-7xl mb-4">
            HABLEMOS
          </h2>
          <p className="text-[var(--pp-text-secondary)] text-base sm:text-lg mb-8">
            Escríbenos por WhatsApp o déjanos un mensaje.
          </p>

          {/* WhatsApp CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-filled inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3"
          >
            <Phone size={16} className="sm:size-18" />
            <span className="hidden sm:inline">ESCRIBIR POR WHATSAPP</span>
            <span className="sm:hidden">WHATSAPP</span>
          </a>

          <p className="label-micro text-[var(--pp-text-secondary)] mt-6 text-xs sm:text-sm">
            Horario: Lunes a Sábado · 9:00 a 19:00
          </p>

          {/* Shipping times banner */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto">
            <div className="border border-[var(--pp-border)] p-4 sm:p-6 text-center">
              <MapPin size={18} className="sm:size-20 text-gold mx-auto mb-2" />
              <p className="font-heading text-[var(--pp-text)] text-base sm:text-lg uppercase">Medellín</p>
              <p className="text-gold font-semibold text-xl sm:text-2xl mt-1">2 días</p>
              <p className="label-micro text-[var(--pp-text-secondary)] mt-1 text-xs">Envío express</p>
            </div>
            <div className="border border-[var(--pp-border)] p-4 sm:p-6 text-center">
              <MapPin size={18} className="sm:size-20 text-gold mx-auto mb-2" />
              <p className="font-heading text-[var(--pp-text)] text-base sm:text-lg uppercase">Nacional</p>
              <p className="text-gold font-semibold text-xl sm:text-2xl mt-1">4 días</p>
              <p className="label-micro text-[var(--pp-text-secondary)] mt-1 text-xs">Envío estándar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-[var(--pp-border)] px-4 sm:px-6 lg:px-20 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo + copyright */}
          <div className="flex items-center gap-2 sm:gap-4 text-center sm:text-left">
            <svg
              width="30"
              height="30"
              className="sm:w-10 sm:h-10"
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
            <span className="label-micro text-[var(--pp-text-secondary)] text-xs sm:text-sm">
              © 2024 Pedigree Palace
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pp-text-secondary)] hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} className="sm:size-20" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pp-text-secondary)] hover:text-gold transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} className="sm:size-20" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--pp-text-secondary)] hover:text-gold transition-colors"
              aria-label="TikTok"
            >
              <Music2 size={18} className="sm:size-20" />
            </a>
          </div>

          {/* Contact info */}
          <div className="flex items-center gap-2 sm:gap-6 label-micro text-[var(--pp-text-secondary)] text-xs sm:text-sm">
            <a href="mailto:info@pedigreepalace.co" className="hover:text-gold transition-colors flex items-center gap-1 sm:gap-2">
              <Mail size={14} className="hidden sm:block" />
              <span className="hidden sm:inline">info@pedigreepalace.co</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
