/**
 * Section 11: Order Tracking (Rastreo de Pedidos)
 * Collage left + headline right + clock badge
 * Includes order tracking search functionality
 */
import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Search, Package, Truck, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type OrderStatus = 'preparing' | 'shipping' | 'delivered' | null;

const statusConfig: Record<string, { label: string; color: string; icon: typeof Package }> = {
  preparing: { label: 'En preparación', color: '#D4AF37', icon: Package },
  shipping: { label: 'En camino', color: '#D4AF37', icon: Truck },
  delivered: { label: 'Entregado', color: '#22c55e', icon: CheckCircle },
};

export default function SectionTracking() {
  const sectionRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(null);
  const [searching, setSearching] = useState(false);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setSearching(true);
    // Simulate API call - in production this would connect to backend
    setTimeout(() => {
      const statuses: OrderStatus[] = ['preparing', 'shipping', 'delivered'];
      const hash = orderId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
      setOrderStatus(statuses[hash % 3]);
      setSearching(false);
    }, 800);
  };

  const StatusIcon = orderStatus ? statusConfig[orderStatus].icon : Package;
  const statusInfo = orderStatus ? statusConfig[orderStatus] : null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-[20]"
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
          <img src="/s11_cat_sofa.jpg" alt="Gato en sofá" className="img-cover" />
        </div>
        <div className="overflow-hidden row-span-2">
          <img src="/s11_cat_close.jpg" alt="Gato de cerca" className="img-cover" />
        </div>
        <div className="overflow-hidden">
          <img src="/s11_dog_tongue.jpg" alt="Perro feliz" className="img-cover" />
        </div>
      </div>

      {/* Right content */}
      <div
        ref={headlineRef}
        className="absolute right-[8%] top-1/2 -translate-y-1/2 text-right"
      >
        <h2 className="heading-xl text-[var(--pp-text)] text-4xl sm:text-6xl md:text-7xl">
          RASTREO DE
        </h2>
        <h2 className="heading-xl text-[var(--pp-text)] text-4xl sm:text-6xl md:text-7xl">
          PEDIDOS
        </h2>

        {/* Tracking search */}
        <form onSubmit={handleSearch} className="mt-8 flex gap-2 justify-end">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Número de pedido"
            className="px-4 py-3 border border-[var(--pp-border)] bg-transparent text-sm w-48 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-gold hover:bg-[var(--pp-gold-dark)] transition-colors"
            aria-label="Buscar pedido"
          >
            <Search size={18} color="#111" />
          </button>
        </form>

        {/* Status result */}
        {orderStatus && !searching && (
          <div className="mt-4 flex items-center justify-end gap-3">
            <StatusIcon size={20} style={{ color: statusInfo?.color }} />
            <span className="font-heading text-lg" style={{ color: statusInfo?.color }}>
              {statusInfo?.label}
            </span>
          </div>
        )}

        {searching && (
          <p className="mt-4 text-[var(--pp-text-secondary)] text-sm">Buscando...</p>
        )}

        <div className="mt-6">
          <a href="#contacto" className="btn-gold">
            RASTREAR MI PEDIDO
          </a>
        </div>
      </div>

      {/* Clock badge */}
      <div
        ref={badgeRef}
        className="absolute bottom-[10%] right-[8%] flex flex-col items-center gap-2"
      >
        <div className="badge-circle">
          <Clock size={24} className="text-gold" />
        </div>
        <p className="label-micro text-[var(--pp-text-secondary)] text-center max-w-[120px]">
          NOTIFICACIONES EN TIEMPO REAL
        </p>
      </div>
    </section>
  );
}
