/**
 * Section 4: French Bulldog Spotlight
 * Full-bleed dog image with bottom black band and title
 */
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionDogSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
        .fromTo(imageRef.current, { scale: 1.06, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(bandRef.current, { y: '22vh' }, { y: 0, ease: 'none' }, 0.05)
        .fromTo(titleRef.current, { x: '-8vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(ctaRef.current, { x: '6vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.15);

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(bandRef.current, { y: 0, opacity: 1 }, { y: '18vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(imageRef.current, { y: 0, opacity: 1 }, { y: '-10vh', opacity: 0.45, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gatos"
      className="relative w-full h-screen overflow-hidden z-[13]"
      style={{ background: 'var(--pp-bg)' }}
    >
      {/* Gold frame */}
      <div className="gold-frame" />

      {/* Full-bleed dog image */}
      <div
        ref={imageRef}
        className="absolute inset-0"
      >
        <img
          src="/s4_frenchie.jpg"
          alt="Bulldog Francés"
          className="img-cover"
        />
      </div>

      {/* Bottom black band */}
      <div
        ref={bandRef}
        className="absolute bottom-0 left-0 right-0 h-[22vh] black-band flex items-center justify-between px-8 lg:px-16"
      >
        <h2
          ref={titleRef}
          className="heading-xl text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          BULLDOG FRANCES
        </h2>
        <div className="flex flex-col items-end gap-2">
          <a
            ref={ctaRef}
            href="https://wa.me/573001234567?text=Hola,%20me%20interesa%20comprar%20un%20Bulldog%20Francés"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            COMPRA
          </a>
          <p className="text-white/60 text-xs italic hidden md:block">
            Cachorros vacunados con pedigree.
          </p>
        </div>
      </div>
    </section>
  );
}
