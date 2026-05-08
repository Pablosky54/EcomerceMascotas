/**
 * Section 2: Split Portrait (Perros y Gatos)
 * Split-screen with dog left / cat right
 * Center headline overlay with caption block
 */
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionSplitPortrait() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(leftPanelRef.current, { x: '-55vw' }, { x: 0, ease: 'none' }, 0)
        .fromTo(rightPanelRef.current, { x: '55vw' }, { x: 0, ease: 'none' }, 0)
        .fromTo(headlineRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(captionRef.current, { x: '10vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(frameRef.current, { opacity: 0, scaleX: 0.9 }, { opacity: 1, scaleX: 1, ease: 'none' }, 0.15);

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(headlineRef.current, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(captionRef.current, { x: 0, opacity: 1 }, { x: '8vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(leftPanelRef.current, { x: 0, opacity: 1 }, { x: '-12vw', opacity: 0.4, ease: 'power2.in' }, 0.7)
        .fromTo(rightPanelRef.current, { x: 0, opacity: 1 }, { x: '12vw', opacity: 0.4, ease: 'power2.in' }, 0.7)
        .fromTo(frameRef.current, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.85);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="perros"
      className="relative w-full h-screen overflow-hidden z-[11]"
      style={{ background: 'var(--pp-bg)' }}
    >
      {/* Gold frame - hidden on mobile */}
      <div ref={frameRef} className="gold-frame hidden sm:block" />

      {/* Left panel - Dog */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-full sm:w-1/2 h-1/2 sm:h-full overflow-hidden"
      >
        <img
          src="/s2_dog_white.jpg"
          alt="Perro blanco de raza pura"
          className="img-cover"
        />
      </div>

      {/* Right panel - Cat */}
      <div
        ref={rightPanelRef}
        className="absolute top-1/2 sm:top-0 right-0 left-0 sm:left-auto w-full sm:w-1/2 h-1/2 sm:h-full overflow-hidden"
      >
        <img
          src="/s2_cat_orange.jpg"
          alt="Gato naranja de raza pura"
          className="img-cover"
        />
      </div>

      {/* Center headline overlay */}
      <div
        ref={headlineRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <div className="text-center px-4">
          <h2 className="heading-xl text-[var(--pp-text)] text-3xl sm:text-5xl md:text-7xl lg:text-8xl drop-shadow-lg"
            style={{ textShadow: '0 2px 20px rgba(245,245,242,0.8)' }}
          >
            PERROS
          </h2>
          <h2 className="heading-xl text-[var(--pp-text)] text-3xl sm:text-5xl md:text-7xl lg:text-8xl drop-shadow-lg"
            style={{ textShadow: '0 2px 20px rgba(245,245,242,0.8)' }}
          >
            Y GATOS
          </h2>
        </div>
      </div>

      {/* Right caption block */}
      <div
        ref={captionRef}
        className="absolute bottom-[15%] sm:bottom-[15%] right-[5%] left-[5%] sm:left-auto z-10 text-center sm:text-right px-4 sm:px-0"
      >
        <p className="heading-lg text-[var(--pp-text)] text-lg sm:text-2xl md:text-3xl mb-1">
          RAZA PURA
        </p>
        <p className="label-micro text-[var(--pp-text-secondary)] mb-4">
          Grado superior
        </p>
        <a href="#catalogo-mascotas" className="btn-gold inline-flex text-xs sm:text-sm">
          VER CATALOGO
        </a>
      </div>
    </section>
  );
}
