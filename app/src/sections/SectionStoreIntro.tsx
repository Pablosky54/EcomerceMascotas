/**
 * Section 6: Store Intro (Tienda Online)
 * Circular image left + stacked headline right
 */
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionStoreIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

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
        .fromTo(circleRef.current, { x: '-18vw', scale: 0.92, opacity: 0 }, { x: 0, scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(headlineRef.current, { x: '10vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05);

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(circleRef.current, { x: 0, opacity: 1 }, { x: '-14vw', opacity: 0.35, ease: 'power2.in' }, 0.7)
        .fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '12vw', opacity: 0, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tienda"
      className="relative w-full h-screen overflow-hidden z-[15]"
      style={{ background: 'var(--pp-bg)' }}
    >
      {/* Gold frame - hidden on mobile */}
      <div className="gold-frame hidden sm:block" />

      {/* Left circular image - hidden on small mobile */}
      <div
        ref={circleRef}
        className="absolute hidden sm:block left-[5%] lg:left-[10%] top-1/2 -translate-y-1/2 w-[35vw] sm:w-[40vw] max-w-[500px] aspect-square rounded-full overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
      >
        <img
          src="/s6_circle_puppy.jpg"
          alt="Cachorro en manos"
          className="img-cover"
        />
      </div>

      {/* Right headline */}
      <div
        ref={headlineRef}
        className="absolute inset-0 sm:inset-auto sm:right-[8%] top-1/2 -translate-y-1/2 text-center sm:text-right px-4 sm:px-0"
      >
        <h2 className="heading-xl text-[var(--pp-text)] text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
          VISITA
        </h2>
        <h2 className="heading-xl text-[var(--pp-text)] text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
          NUESTRA
        </h2>
        <h2 className="heading-xl text-[var(--pp-text)] text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
          TIENDA
        </h2>
        <h2 className="heading-xl text-gold text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
          ONLINE
        </h2>
      </div>
    </section>
  );
}
