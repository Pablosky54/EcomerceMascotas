/**
 * Section 10: Eco Packaging (Empaque Ecológico)
 * Collage left + headline right + box badge
 */
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SectionEcoPackaging() {
  const sectionRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

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
        .fromTo(collageRef.current, { x: '-12vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(headlineRef.current, { x: '12vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05)
        .fromTo(badgeRef.current, { scale: 0.85, rotate: -8, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, ease: 'none' }, 0.15);

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(collageRef.current, { x: 0, opacity: 1 }, { x: '-10vw', opacity: 0.35, ease: 'power2.in' }, 0.7);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-[19]"
      style={{ background: 'var(--pp-bg)' }}
    >
      {/* Gold frame */}
      <div className="gold-frame" />

      {/* Left collage */}
      <div
        ref={collageRef}
        className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[45%] h-[80%] grid grid-cols-2 grid-rows-2 gap-3"
      >
        <div className="overflow-hidden">
          <img src="/s10_puppy_bed.jpg" alt="Cachorro durmiendo" className="img-cover" />
        </div>
        <div className="overflow-hidden row-span-2">
          <img src="/s10_owner_dog.jpg" alt="Dueña con mascota" className="img-cover" />
        </div>
        <div className="overflow-hidden">
          <img src="/s10_dog_sofa.jpg" alt="Perro en sofá" className="img-cover" />
        </div>
      </div>

      {/* Right headline */}
      <div
        ref={headlineRef}
        className="absolute right-[8%] top-1/2 -translate-y-1/2 text-right"
      >
        <h2 className="heading-xl text-[var(--pp-text)] text-4xl sm:text-6xl md:text-7xl">
          EMPAQUE
        </h2>
        <h2 className="heading-xl text-gold text-4xl sm:text-6xl md:text-7xl">
          ECOLOGICO
        </h2>
        <div className="mt-8">
          <a href="#nosotros" className="btn-gold">
            CONOCER MÁS
          </a>
        </div>
      </div>

      {/* Box badge */}
      <div
        ref={badgeRef}
        className="absolute bottom-[10%] right-[8%] flex flex-col items-center gap-2"
      >
        <div className="badge-circle">
          <Package size={24} className="text-gold" />
        </div>
        <p className="label-micro text-[var(--pp-text-secondary)] text-center max-w-[120px]">
          SEGURO, HIGIÉNICO Y AMIGABLE
        </p>
      </div>
    </section>
  );
}
