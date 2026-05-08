/**
 * Shipping Times Banner
 * Simple banner showing delivery times for Medellin and National
 * Displayed as part of the footer flow
 */
import { MapPin } from 'lucide-react';

export default function SectionShippingTimes() {
  return (
    <section
      className="relative w-full py-12 z-[22]"
      style={{ background: 'var(--pp-bg-dark)' }}
    >
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
        <div className="flex items-center gap-4">
          <MapPin size={24} className="text-gold" />
          <div>
            <p className="label-micro text-white/60">MEDELLÍN</p>
            <p className="font-heading text-gold text-2xl">2 días</p>
          </div>
        </div>
        <div className="w-px h-10 bg-white/20 hidden sm:block" />
        <div className="flex items-center gap-4">
          <MapPin size={24} className="text-gold" />
          <div>
            <p className="label-micro text-white/60">NACIONAL</p>
            <p className="font-heading text-gold text-2xl">4 días</p>
          </div>
        </div>
      </div>
    </section>
  );
}
