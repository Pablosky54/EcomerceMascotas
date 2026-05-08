/**
 * Section 5: Metrics Strip
 * Flowing section with animated counters
 * Pin: false - this is a resting moment between pinned scenes
 */
import { useScrollCounter } from '@/hooks/useScrollCounter';

interface MetricRowProps {
  value: string;
  numericValue: number;
  suffix?: string;
  label: string;
}

function MetricRow({ numericValue, suffix = '', label }: MetricRowProps) {
  const { ref, display } = useScrollCounter(numericValue, 2000, suffix);

  return (
    <div className="py-4 sm:py-8 border-b border-[var(--pp-border)]">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 sm:gap-0 px-4 sm:px-6 lg:px-20" ref={ref}>
        <span className="heading-xl text-gold text-3xl sm:text-5xl md:text-7xl lg:text-8xl">
          {display}
        </span>
        <span className="font-heading text-[var(--pp-text)] text-sm sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function SectionMetrics() {
  const metrics = [
    { value: '+9', numericValue: 9, suffix: '', label: 'Años de experiencia' },
    { value: '216', numericValue: 216, suffix: '', label: 'Mascotas entregadas' },
    { value: '100%', numericValue: 100, suffix: '%', label: 'Clientes satisfechos' },
    { value: '+50', numericValue: 50, suffix: '', label: 'Razas disponibles' },
  ];

  return (
    <section
      id="nosotros"
      className="relative w-full py-16 z-[14]"
      style={{ background: 'var(--pp-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        {metrics.map((m, i) => (
          <MetricRow key={i} {...m} />
        ))}
      </div>
    </section>
  );
}
