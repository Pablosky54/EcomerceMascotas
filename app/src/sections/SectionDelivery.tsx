/**
 * Section 3: Delivery Promise (Compromiso de Entrega)
 * Collage left + headline right + truck badge
 */
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SectionDelivery() {
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
        .fromTo(headlineRef.current, { x: '10vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05)
        .fromTo(badgeRef.current, { scale: 0.85, rotate: -8, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, ease: 'none' }, 0.15);

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '10vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(collageRef.current, { x: 0, opacity: 1 }, { x: '-10vw', opacity: 0.35, ease: 'power2.in' }, 0.7)
        .fromTo(badgeRef.current, { scale: 1, opacity: 1 }, { scale: 0.9, opacity: 0.2, ease: 'power2.in' }, 0.8);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-[12]"
      style={{ background: 'var(--pp-bg)' }}
    >
      {/* Gold frame */}
      <div className="gold-frame" />

      {/* Left collage - hidden on small mobile */}
      <div
        ref={collageRef}
        className="absolute hidden sm:grid left-[5%] top-1/2 -translate-y-1/2 w-[45%] h-[80%] grid-cols-2 grid-rows-2 gap-3"
      >
        <div className="overflow-hidden">
          <img src="/s3_corgi.jpg" alt="Corgi" className="img-cover" />
        </div>
        <div className="overflow-hidden row-span-2">
          <img src="/s3_owner_dog.jpg" alt="Dueña con mascota" className="img-cover" />
        </div>
        <div className="overflow-hidden">
          <img src="/s3_beagle.jpg" alt="Beagle puppy" className="img-cover" />
        </div>
      </div>

      {/* Right headline block */}
      <div
        ref={headlineRef}
        className="absolute inset-0 sm:inset-auto sm:right-[8%] top-1/2 -translate-y-1/2 text-center sm:text-right px-6 sm:px-0"
      >
        <h2 className="heading-xl text-[var(--pp-text)] text-2xl sm:text-4xl md:text-6xl lg:text-7xl">
          COMPROMISO
        </h2>
        <p className="font-heading text-[var(--pp-text-secondary)] text-lg sm:text-2xl md:text-3xl mt-2 italic">
          de entrega
        </p>
        <div className="mt-8">
          <a href="#envios" className="btn-gold text-xs sm:text-sm">
            CONOCER PROCESO
          </a>
        </div>
      </div>

      {/* Truck badge */}
      <div
        ref={badgeRef}
        className="absolute bottom-[10%] right-[8%] flex flex-col items-center gap-2"
      >
        <div className="badge-circle">
          <Truck size={24} className="text-gold" />
        </div>
        <p className="label-micro text-[var(--pp-text-secondary)] text-center max-w-[120px]">
          GARANTÍA DE ENTREGA A NIVEL NACIONAL
        </p>
      </div>
    </section>
  );
}
