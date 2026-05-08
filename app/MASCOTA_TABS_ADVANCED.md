# 🎓 Guía Avanzada - Sistema de Pestañas

## Casos de Uso Avanzados

### 1. Agregar Filtros Adicionales

```typescript
// SectionStoreCatalog.tsx
const [activeTab, setActiveTab] = useState<'dog' | 'cat'>('dog');
const [sizesFilter, setSizesFilter] = useState<'all' | 'small' | 'medium' | 'large'>('all');

const filteredPets = useCallback(() => {
  let filtered = petsData.filter(pet => pet.type === activeTab);
  
  if (sizesFilter !== 'all') {
    filtered = filtered.filter(pet => pet.size === sizesFilter);
  }
  
  return filtered;
}, [activeTab, sizesFilter]);
```

### 2. Integración con React Router

```typescript
import { useNavigate, useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams();
const navigate = useNavigate();

const handleTabChange = (tab: 'dog' | 'cat') => {
  setSearchParams({ type: tab });
  setActiveTab(tab);
};

// Leer desde URL en mount
useEffect(() => {
  const type = searchParams.get('type') as 'dog' | 'cat' | null;
  if (type && ['dog', 'cat'].includes(type)) {
    setActiveTab(type);
  }
}, [searchParams]);
```

### 3. Conexión a API con Carga Dinámica

```typescript
const [petsData, setPetsData] = useState<Pet[]>([]);
const [loading, setLoading] = useState(false);

const fetchPets = useCallback(async (type: 'dog' | 'cat') => {
  setLoading(true);
  try {
    const response = await fetch(`/api/pets?type=${type}`);
    const data = await response.json();
    setPetsData(data);
  } catch (error) {
    console.error('Error fetching pets:', error);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  fetchPets(activeTab);
}, [activeTab, fetchPets]);
```

### 4. Animación Personalizada con Timeline

```typescript
const masterTimeline = useRef<gsap.core.Timeline | null>(null);

const createTabAnimation = (direction: 'in' | 'out') => {
  const cards = cardsRef.current?.children;
  const buttons = containerRef.current?.querySelectorAll('button');
  
  if (!masterTimeline.current) {
    masterTimeline.current = gsap.timeline();
  }
  
  masterTimeline.current
    .clear()
    .to(buttons, { duration: 0.2, scale: 0.95 }, 0)
    .to(cards, { 
      duration: 0.3, 
      y: direction === 'out' ? 30 : 0,
      opacity: direction === 'out' ? 0 : 1,
      stagger: 0.05
    }, 0.1);
};
```

### 5. Búsqueda en Tiempo Real

```typescript
const [searchTerm, setSearchTerm] = useState('');

const filteredPets = useCallback(() => {
  let filtered = petsData.filter(pet => pet.type === activeTab);
  
  if (searchTerm) {
    filtered = filtered.filter(pet =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  return filtered;
}, [activeTab, searchTerm]);

return (
  <>
    <MascotaTabs activeTab={activeTab} onTabChange={handleTabChange} />
    
    <input
      type="text"
      placeholder="Buscar mascota..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  </>
);
```

### 6. Ordenamiento Dinámico

```typescript
const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');

const getSortedPets = (pets: Pet[]): Pet[] => {
  const sorted = [...pets];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};

const filteredAndSorted = getSortedPets(filteredPets());
```

### 7. Animación Carrito de Compras (Add to Cart)

```typescript
const handleAddToCart = (pet: Pet, event: React.MouseEvent) => {
  const button = event.currentTarget as HTMLElement;
  
  // Crear elemento flotante
  const rect = button.getBoundingClientRect();
  const floatingElement = document.createElement('div');
  floatingElement.textContent = pet.name;
  floatingElement.style.cssText = `
    position: fixed;
    left: ${rect.left}px;
    top: ${rect.top}px;
    pointer-events: none;
    background: var(--pp-gold);
    color: black;
    padding: 8px 16px;
    border-radius: 24px;
    font-weight: bold;
  `;
  document.body.appendChild(floatingElement);
  
  // Animar al carrito
  gsap.to(floatingElement, {
    left: window.innerWidth - 50,
    top: 50,
    opacity: 0,
    scale: 0.5,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      document.body.removeChild(floatingElement);
    },
  });
};
```

### 8. Favoritos Sincronizados

```typescript
const { favorites, toggleFavorite, isFav } = useFavorites();

const getFilteredFavoritePets = useCallback(() => {
  return filteredPets().map(pet => ({
    ...pet,
    isFavorite: isFav(pet.id),
  }));
}, [filteredPets, isFav]);

// Mostrar badge con cantidad de favoritos
<span className="badge">
  Favoritos: {favorites.filter(f => f.type === 'pet').length}
</span>
```

---

## 🎨 Estilos Personalizados

### Theme Dark Luxury

```css
:root {
  --pp-bg: #0a0e27;        /* Azul oscuro */
  --pp-gold: #f9c74f;      /* Dorado cálido */
  --pp-accent: #c74e1f;    /* Naranja accent */
  --pp-text: #ffffff;
  --pp-text-secondary: #b0b0b0;
}
```

### Animación Personalizada Tailwind

```tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        tabGlow: {
          '0%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0)' },
        },
      },
      animation: {
        tabGlow: 'tabGlow 2s infinite',
      },
    },
  },
};
```

Luego en componente:
```jsx
<button className="animate-tabGlow">Perros</button>
```

---

## 🔄 Sincronización de Estado Global

### Con Context API

```typescript
// PetContext.tsx
import { createContext, useState } from 'react';

interface PetContextType {
  activeTab: 'dog' | 'cat';
  setActiveTab: (tab: 'dog' | 'cat') => void;
}

export const PetContext = createContext<PetContextType | undefined>(undefined);

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<'dog' | 'cat'>('dog');
  
  return (
    <PetContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </PetContext.Provider>
  );
}

export function usePetContext() {
  const context = useContext(PetContext);
  if (!context) throw new Error('usePetContext must be used within PetProvider');
  return context;
}
```

Uso:
```typescript
// En App.tsx
<PetProvider>
  <SectionStoreCatalog />
</PetProvider>

// En componentes
const { activeTab, setActiveTab } = usePetContext();
```

### Con Zustand (más ligero)

```typescript
// store/petStore.ts
import { create } from 'zustand';

interface PetStore {
  activeTab: 'dog' | 'cat';
  setActiveTab: (tab: 'dog' | 'cat') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const usePetStore = create<PetStore>((set) => ({
  activeTab: 'dog',
  setActiveTab: (tab) => set({ activeTab: tab }),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
```

Uso:
```typescript
const { activeTab, setActiveTab } = usePetStore();
```

---

## 📊 Animación de Contadores

```typescript
const useCounterAnimation = (endValue: number) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!countRef.current) return;
    
    gsap.to({ value: 0 }, {
      value: endValue,
      duration: 2,
      ease: 'power2.out',
      onUpdate: (self) => {
        setCount(Math.floor(self.progress() * endValue));
      },
    });
  }, [endValue]);
  
  return <span ref={countRef}>{count}</span>;
};

// Uso
<div>
  {useCounterAnimation(150)} mascotas disponibles
</div>
```

---

## 🎯 Validación y Manejo de Errores

```typescript
const handleTabChange = async (tab: 'dog' | 'cat') => {
  try {
    // Validar
    if (!['dog', 'cat'].includes(tab)) {
      throw new Error('Tab inválido');
    }
    
    // Animación de salida
    const cards = cardsRef.current?.children;
    if (cards?.length) {
      await gsap.to(cards, {
        duration: 0.3,
        y: 20,
        opacity: 0,
        stagger: 0.04,
      });
    }
    
    // Cambiar tab
    setActiveTab(tab);
    
    // Animación de entrada
    if (cards?.length) {
      gsap.to(cards, {
        duration: 0.4,
        y: 0,
        opacity: 1,
        stagger: 0.08,
      });
    }
  } catch (error) {
    console.error('Error changing tab:', error);
    showNotification('Error al cambiar de pestaña', 'error');
  }
};
```

---

## 🧪 Testing con Jest/Vitest

```typescript
// SectionStoreCatalog.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import SectionStoreCatalog from './SectionStoreCatalog';

describe('SectionStoreCatalog', () => {
  it('renderiza pestañas de perros y gatos', () => {
    render(<SectionStoreCatalog />);
    
    expect(screen.getByLabelText('Filtrar mascotas por perros')).toBeInTheDocument();
    expect(screen.getByLabelText('Filtrar mascotas por gatos')).toBeInTheDocument();
  });
  
  it('filtra mascotas al cambiar de pestaña', () => {
    render(<SectionStoreCatalog />);
    
    const catTab = screen.getByLabelText('Filtrar mascotas por gatos');
    fireEvent.click(catTab);
    
    expect(screen.getByText('Gatos', { selector: '.label-micro' })).toBeInTheDocument();
  });
  
  it('toglea favorito correctamente', () => {
    render(<SectionStoreCatalog />);
    
    const favoriteButton = screen.getByLabelText(/Agregar.*a favoritos/);
    fireEvent.click(favoriteButton);
    
    expect(favoriteButton.querySelector('.text-red-500')).toBeInTheDocument();
  });
});
```

---

## 📈 Performance Optimization

### Lazy Loading

```typescript
import { lazy, Suspense } from 'react';

const MascotaTabs = lazy(() => import('@/components/MascotaTabs'));

export default function SectionStoreCatalog() {
  return (
    <Suspense fallback={<div className="skeleton" />}>
      <MascotaTabs activeTab={activeTab} onTabChange={handleTabChange} />
    </Suspense>
  );
}
```

### Memoización

```typescript
import { memo, useMemo } from 'react';

const PetCard = memo(({ pet, onFavorite, isFav }: PetCardProps) => (
  <div className="pet-card">
    {/* Card content */}
  </div>
), (prevProps, nextProps) => {
  return prevProps.pet.id === nextProps.pet.id &&
         prevProps.isFav === nextProps.isFav;
});

// En componente padre
const petCards = useMemo(
  () => filteredPets().map(pet => (
    <PetCard key={pet.id} pet={pet} onFavorite={toggleFavorite} isFav={isFav(pet.id)} />
  )),
  [filteredPets, toggleFavorite, isFav]
);
```

### Virtual Scrolling para Listas Grandes

```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={filteredPets().length}
  itemSize={300}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <PetCard pet={filteredPets()[index]} />
    </div>
  )}
</FixedSizeList>
```

---

**Proyecto**: Pedigree Palace 🐾👑  
**Documentación Avanzada v1.0**  
**Última Actualización**: Mayo 2026
