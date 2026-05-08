/**
 * Section 1: Hero (Wordmark Entry)
 * Gold wordmark with royal logo mark and scroll line
 * Pinned section with entrance animation on load + scroll-driven exit
 */
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wordmark = wordmarkRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    const micro = microRef.current;
    if (!section || !wordmark || !logo || !line || !micro) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ delay: 0.3 });
      loadTl
        .fromTo(wordmark, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        .fromTo(logo, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.65')
        .fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: 'power2.out', transformOrigin: 'top' }, '-=0.45')
        .fromTo(micro, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set(wordmark, { opacity: 1, y: 0 });
            gsap.set(logo, { opacity: 1, y: 0, scale: 1 });
            gsap.set(line, { scaleY: 1, opacity: 1 });
            gsap.set(micro, { opacity: 1, y: 0 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(wordmark, { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(logo, { y: 0, scale: 1, opacity: 1 }, { y: '-10vh', scale: 0.98, opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(line, { scaleY: 1, opacity: 1 }, { scaleY: 0.2, opacity: 0.2, ease: 'power2.in' }, 0.7)
        .fromTo(micro, { opacity: 1, y: 0 }, { opacity: 0, y: -10, ease: 'power2.in' }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full h-screen overflow-hidden z-10"
      style={{ background: 'var(--pp-bg)' }}
    >
      {/* Content centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 gap-8 sm:gap-12">
        {/* Wordmark */}
        <div ref={wordmarkRef} className="text-center">
          <h1 className="heading-xl text-gold text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none">
            PEDIGREE
          </h1>
          <h1 className="heading-xl text-gold text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mt-2 sm:mt-3">
            PALACE
          </h1>
        </div>

        {/* Logo mark */}
        <div ref={logoRef} className="mt-0 sm:mt-4">
          <svg
            width="60"
            height="60"
            viewBox="0 0 200 200"
            fill="none"
            className="sm:w-20 sm:h-20 md:w-24 md:h-24"
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

        {/* Tagline */}
        <div ref={microRef} className="text-center space-y-2 max-w-md">
          <p className="font-heading text-[var(--pp-text)] text-lg sm:text-2xl md:text-3xl">
            Mascotas Premium · Raza Pura
          </p>
          <p className="label-micro text-[var(--pp-text-secondary)] text-xs sm:text-sm">
            Entrega confiable a nivel nacional
          </p>
        </div>

        {/* CTA Button */}
        <div ref={lineRef} className="mt-4 sm:mt-8">
          <a
            href="#catalogo-mascotas"
            className="btn-gold-filled inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>VER CATÁLOGO</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
