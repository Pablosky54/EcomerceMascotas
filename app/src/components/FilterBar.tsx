/**
 * FilterBar Component
 * Advanced filtering UI for pet catalog
 * Features: Tabs, Breed dropdown, Price slider, Size buttons, Search input
 * Design: Luxury minimalist with Playfair Display typography
 */
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Search, X, Check, ChevronDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { FilterState, FilterConfig } from '@/types';

interface FilterBarProps {
  filterState: FilterState;
  filterConfig: FilterConfig;
  onFilterChange: (newState: Partial<FilterState>) => void;
  totalResults: number;
  filteredResults: number;
  hasActiveFilters: boolean;
}

export default function FilterBar({
  filterState,
  filterConfig,
  onFilterChange,
  totalResults,
  filteredResults,
  hasActiveFilters,
}: FilterBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [breedPopoverOpen, setBreedPopoverOpen] = useState(false);

  /**
   * Animate entrance on mount
   */
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  /**
   * Handle tab toggle
   */
  const handleTypeChange = (type: 'dog' | 'cat') => {
    onFilterChange({
      petType: type,
      selectedBreeds: [],
      selectedSizes: [],
    });
  };

  /**
   * Handle breed multi-select
   */
  const handleBreedToggle = (breed: string) => {
    const updated = filterState.selectedBreeds.includes(breed)
      ? filterState.selectedBreeds.filter(b => b !== breed)
      : [...filterState.selectedBreeds, breed];
    onFilterChange({ selectedBreeds: updated });
  };

  /**
   * Handle price range change
   */
  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filterState.priceRange] as [
      number,
      number
    ];
    newRange[index] = value;

    // Ensure min is less than max
    if (index === 0 && value <= newRange[1]) {
      onFilterChange({ priceRange: newRange });
    } else if (index === 1 && value >= newRange[0]) {
      onFilterChange({ priceRange: newRange });
    }
  };

  /**
   * Handle size toggle
   */
  const handleSizeToggle = (size: 'small' | 'medium' | 'large') => {
    const updated = filterState.selectedSizes.includes(size)
      ? filterState.selectedSizes.filter(s => s !== size)
      : [...filterState.selectedSizes, size];
    onFilterChange({ selectedSizes: updated });
  };

  /**
   * Handle search input
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchTerm: e.target.value });
  };

  /**
   * Clear all filters
   */
  const handleClearFilters = () => {
    onFilterChange({
      selectedBreeds: [],
      priceRange: [filterConfig.priceRange.min, filterConfig.priceRange.max],
      selectedSizes: [],
      searchTerm: '',
    });
  };

  const sizeLabels = {
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-black/40 backdrop-blur-md border border-[var(--pp-gold)]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 z-20 w-full overflow-hidden"
    >
      {/* Header with title and result count */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        <h3 className="font-playfair text-lg sm:text-2xl text-[var(--pp-gold)]">
          Refinar Búsqueda
        </h3>
        <div className="text-xs sm:text-sm text-[var(--pp-text-secondary)]">
          <span className="font-semibold">{filteredResults}</span> de{' '}
          <span className="font-semibold">{totalResults}</span>
        </div>
      </div>

      {/* Section 1: Main Tabs */}
      <div className="space-y-2 sm:space-y-3">
        <label className="block text-xs uppercase tracking-widest text-[var(--pp-text-secondary)]">
          Categoría Principal
        </label>
        <div className="flex gap-2 sm:gap-3">
          {(['dog', 'cat'] as const).map(type => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`
                flex-1 px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300
                border-2
                ${
                  filterState.petType === type
                    ? 'bg-[var(--pp-gold)]/20 border-[var(--pp-gold)] text-[var(--pp-gold)]'
                    : 'bg-transparent border-[var(--pp-gold)]/30 text-[var(--pp-text-secondary)] hover:border-[var(--pp-gold)]/50'
                }
              `}
            >
              {type === 'dog' ? '🐕 Caninos' : '🐈 Felinos'}
              <span className="hidden sm:inline">{type === 'dog' ? ' Reales' : ' Exóticos'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Search Input */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs uppercase tracking-widest text-[var(--pp-text-secondary)] mb-2">
            Buscar
          </label>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--pp-gold)]/50"
            />
            <input
              type="text"
              placeholder="Raza..."
              value={filterState.searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-black/60 border border-[var(--pp-gold)]/30 rounded-lg pl-8 pr-3 py-2 sm:py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--pp-gold)] transition-colors text-xs sm:text-sm"
            />
            {filterState.searchTerm && (
              <button
                onClick={() => onFilterChange({ searchTerm: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--pp-gold)]/50 hover:text-[var(--pp-gold)]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

{/* Breed Combobox */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs uppercase tracking-widest text-[var(--pp-text-secondary)] mb-2">
            Raza
          </label>
          <Popover open={breedPopoverOpen} onOpenChange={setBreedPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                className="w-full bg-black/60 border border-[var(--pp-gold)]/30 rounded-lg px-3 py-2 sm:py-2.5 text-white focus:outline-none focus:border-[var(--pp-gold)] transition-colors text-xs sm:text-sm flex items-center justify-between"
              >
                <span className="truncate">
                  {filterState.selectedBreeds.length === 0
                    ? 'Seleccionar razas...'
                    : `${filterState.selectedBreeds.length} seleccionada${filterState.selectedBreeds.length > 1 ? 's' : ''}`}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 bg-black/90 border-[var(--pp-gold)]/30" align="start">
              <Command>
                <CommandInput
                  placeholder="Buscar razas..."
                  className="border-0 focus:ring-0 text-white placeholder:text-gray-400"
                />
                <CommandList className="max-h-[200px]">
                  <CommandEmpty>No se encontraron razas.</CommandEmpty>
                  <CommandGroup>
                    {filterConfig.breeds.map((breed) => (
                      <CommandItem
                        key={breed}
                        onSelect={() => handleBreedToggle(breed)}
                        className="flex items-center gap-2 cursor-pointer text-white hover:bg-[var(--pp-gold)]/20"
                      >
                        <Check
                          className={cn(
                            "h-4 w-4",
                            filterState.selectedBreeds.includes(breed)
                              ? "opacity-100 text-[var(--pp-gold)]"
                              : "opacity-0"
                          )}
                        />
                        <span className="truncate">{breed}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {filterState.selectedBreeds.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1 sm:gap-2">
              {filterState.selectedBreeds.slice(0, 3).map(breed => (
                <button
                  key={breed}
                  onClick={() => handleBreedToggle(breed)}
                  className="text-xs bg-[var(--pp-gold)]/20 border border-[var(--pp-gold)] text-[var(--pp-gold)] px-2 py-1 rounded flex items-center gap-1 hover:bg-[var(--pp-gold)]/30 transition-colors"
                >
                  {breed.length > 10 ? `${breed.slice(0, 10)}...` : breed}
                  <X size={12} />
                </button>
              ))}
              {filterState.selectedBreeds.length > 3 && (
                <span className="text-xs text-[var(--pp-text-secondary)]">+{filterState.selectedBreeds.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {/* Price Range Slider */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs uppercase tracking-widest text-[var(--pp-text-secondary)] mb-2">
            Precio
          </label>
          <div className="space-y-2 text-xs text-[var(--pp-text-secondary)]">
            <div className="flex justify-between">
              <span>${filterState.priceRange[0].toLocaleString()}</span>
              <span>${filterState.priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={filterConfig.priceRange.min}
              max={filterConfig.priceRange.max}
              value={filterState.priceRange[0]}
              onChange={e => handlePriceChange(0, parseInt(e.target.value))}
              className="w-full h-1 sm:h-2 bg-[var(--pp-gold)]/20 rounded-lg appearance-none cursor-pointer accent-[var(--pp-gold)]"
            />
            <input
              type="range"
              min={filterConfig.priceRange.min}
              max={filterConfig.priceRange.max}
              value={filterState.priceRange[1]}
              onChange={e => handlePriceChange(1, parseInt(e.target.value))}
              className="w-full h-1 sm:h-2 bg-[var(--pp-gold)]/20 rounded-lg appearance-none cursor-pointer accent-[var(--pp-gold)]"
            />
          </div>
        </div>

        {/* Size Filter Buttons */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-xs uppercase tracking-widest text-[var(--pp-text-secondary)] mb-2">
            Tamaño
          </label>
          <div className="flex gap-1 sm:gap-2">
            {filterConfig.sizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`
                  flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300
                  border-2
                  ${
                    filterState.selectedSizes.includes(size)
                      ? 'bg-[var(--pp-gold)]/20 border-[var(--pp-gold)] text-[var(--pp-gold)]'
                      : 'bg-transparent border-[var(--pp-gold)]/30 text-[var(--pp-text-secondary)] hover:border-[var(--pp-gold)]/50'
                  }
                `}
              >
                {sizeLabels[size].slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-[var(--pp-gold)]/10">
        <div className="text-xs text-[var(--pp-text-secondary)]">
          {hasActiveFilters ? (
            <span>Filtros: {filteredResults} resultados</span>
          ) : (
            <span>Total: {totalResults} resultados</span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-xs uppercase tracking-widest text-[var(--pp-gold)] hover:text-white transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <X size={14} />
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
