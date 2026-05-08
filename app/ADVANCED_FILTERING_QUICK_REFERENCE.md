# ⚡ Guía Rápida - Sistema de Filtrado Avanzado

## 🎯 Overview en 30 segundos

- **3 Componentes Principales**:
  1. `FilterBar.tsx` - UI de filtrado
  2. `useAdvancedFiltering.ts` - Lógica optimizada
  3. `SectionStoreCatalog.tsx` - Integración

- **12 Mascotas Mock** (6 perros + 6 gatos)
- **5 Tipos de Filtros**: Tipo, Raza, Precio, Tamaño, Búsqueda
- **Animaciones GSAP** al cambiar resultados
- **Performance Optimizado** con useMemo + useCallback

---

## 🚀 Importar y Usar

```typescript
import { useAdvancedFiltering } from '@/hooks/useAdvancedFiltering';
import FilterBar from '@/components/FilterBar';
import type { FilterState } from '@/types';

// En componente
const [filterState, setFilterState] = useState<FilterState>({
  petType: 'dog',
  selectedBreeds: [],
  priceRange: [1100000, 2800000],
  selectedSizes: [],
  searchTerm: '',
});

const { filteredPets, filterConfig, filteredCount, totalCount } = 
  useAdvancedFiltering(petsData, filterState);

<FilterBar
  filterState={filterState}
  filterConfig={filterConfig}
  onFilterChange={(updates) => setFilterState(prev => ({ ...prev, ...updates }))}
  totalResults={totalCount}
  filteredResults={filteredCount}
  hasActiveFilters={hasActiveFilters}
/>
```

---

## 📊 Estructura de Datos

### FilterState

```typescript
{
  petType: 'dog',                           // 'dog' | 'cat'
  selectedBreeds: ['Golden Retriever'],     // string[]
  priceRange: [1500000, 2500000],           // [min, max]
  selectedSizes: ['large', 'medium'],       // ('small'|'medium'|'large')[]
  searchTerm: 'golden'                      // string
}
```

### FilterConfig (Calculada dinámicamente)

```typescript
{
  breeds: [                                 // Razas del tipo actual
    'Beagle',
    'Bulldog Francés',
    'Golden Retriever',
    'Dóberman',
    'Poodle',
    'Rottweiler'
  ],
  priceRange: {
    min: 1300000,                           // Min del tipo actual
    max: 2800000                            // Max del tipo actual
  },
  sizes: ['small', 'medium', 'large']      // Tamaños disponibles
}
```

---

## 🎨 Componentes Quick Reference

### FilterBar Props

```typescript
interface FilterBarProps {
  filterState: FilterState;                    // ← Pasar estado
  filterConfig: FilterConfig;                  // ← Config dinámica
  onFilterChange: (newState: Partial<FilterState>) => void;  // ← Callback
  totalResults: number;                        // ← ej: 6 (total perros)
  filteredResults: number;                     // ← ej: 3 (después filtros)
  hasActiveFilters: boolean;                   // ← Mostrar botón Limpiar
}
```

### Ejemplo de Uso Completo

```typescript
import { useState, useCallback } from 'react';
import { useAdvancedFiltering } from '@/hooks/useAdvancedFiltering';
import FilterBar from '@/components/FilterBar';
import type { Pet, FilterState } from '@/types';

const petsData: Pet[] = [...];

export default function CatalogPage() {
  const [filterState, setFilterState] = useState<FilterState>({
    petType: 'dog',
    selectedBreeds: [],
    priceRange: [1100000, 2800000],
    selectedSizes: [],
    searchTerm: '',
  });

  const { filteredPets, filterConfig, filteredCount, totalCount, hasActiveFilters } =
    useAdvancedFiltering(petsData, filterState);

  const handleFilterChange = useCallback((updates: Partial<FilterState>) => {
    setFilterState(prev => {
      const newState = { ...prev, ...updates };
      
      // Auto-reset precio al cambiar tipo
      if (updates.petType && updates.petType !== prev.petType) {
        const typedPets = petsData.filter(p => p.type === updates.petType);
        newState.priceRange = [
          Math.min(...typedPets.map(p => p.price)),
          Math.max(...typedPets.map(p => p.price)),
        ];
      }
      
      return newState;
    });
  }, []);

  return (
    <section>
      <FilterBar
        filterState={filterState}
        filterConfig={filterConfig}
        onFilterChange={handleFilterChange}
        totalResults={totalCount}
        filteredResults={filteredCount}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map(pet => (
          <div key={pet.id} className="pet-card">
            {/* Card content */}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 🔄 Flujo de Datos

```
User Input (Click, Change)
         ↓
onFilterChange() llamado
         ↓
setFilterState() actualiza
         ↓
useAdvancedFiltering recalcula:
  • filterConfig (dinámico)
  • filteredPets (useMemo)
  • filteredCount
  • hasActiveFilters
         ↓
FilterBar re-renders con nuevos valores
         ↓
Grid de mascotas re-renders
         ↓
GSAP Stagger Animation
```

---

## 📝 Extensiones Comunes

### Agregar Búsqueda en Tiempo Real

```typescript
<input
  type="text"
  placeholder="Buscar..."
  value={filterState.searchTerm}
  onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
/>
// Ya está implementado en FilterBar
```

### Agregar Filtro de Origen

```typescript
// 1. Extender FilterState
interface FilterState {
  // ... existing
  selectedOrigins?: string[];
}

// 2. En useAdvancedFiltering
if (filterState.selectedOrigins?.length > 0) {
  result = result.filter(pet =>
    filterState.selectedOrigins.includes(pet.origin || '')
  );
}

// 3. En FilterBar UI
<select multiple value={filterState.selectedOrigins || []}>
  {filterConfig.origins?.map(o => (
    <option key={o}>{o}</option>
  ))}
</select>
```

### Guardar Filtros en URL

```typescript
// Cambiar estado en URL params
const [searchParams, setSearchParams] = useSearchParams();

const handleFilterChange = (updates: Partial<FilterState>) => {
  setFilterState(prev => ({ ...prev, ...updates }));
  
  // Guardar en URL
  const params = new URLSearchParams(searchParams);
  params.set('type', updates.petType || filterState.petType);
  if (updates.searchTerm) params.set('search', updates.searchTerm);
  setSearchParams(params);
};

// Leer de URL al montar
useEffect(() => {
  const type = searchParams.get('type') as 'dog' | 'cat' | null;
  if (type) setFilterState(prev => ({ ...prev, petType: type }));
}, [searchParams]);
```

---

## 🎬 Animaciones

### Default (Ya implementado)

```typescript
// Entrada de tarjetas
gsap.fromTo(
  cards,
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'elastic.out(1, 0.6)' }
);
```

### Personalizado (Ejemplo)

```typescript
useLayoutEffect(() => {
  if (filteredPets.length === 0) {
    // Si no hay resultados
    gsap.to(cardsRef.current, { opacity: 0.5, duration: 0.3 });
  }
}, [filteredPets]);
```

---

## 🔍 Debugging

### Verificar filtrado

```typescript
console.log('Filter State:', filterState);
console.log('Filtered Pets:', filteredPets);
console.log('Total:', totalCount, 'Filtrados:', filteredCount);
console.log('Config:', filterConfig);
```

### Verificar performance

```typescript
// En consola del navegador
const start = performance.now();
useAdvancedFiltering(petsData, filterState);
console.log('Filtering took:', performance.now() - start, 'ms');
```

### Verificar memoization

```typescript
// Si ves re-renders innecesarios:
console.log('FilterBar render');  // En FilterBar.tsx
// Debería logear solo 1 vez al montar, no en cada cambio
```

---

## 📱 Responsive Clases

```jsx
{/* FilterBar grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Automático: 1 col mobile, 2 tablet, 4 desktop */}
</div>

{/* Pet cards grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Automático: 1 col mobile, 2 sm, 3 lg */}
</div>
```

---

## 🚨 Troubleshooting

### Problema: Filtrado no funciona
**Solución**: Verificar que `filterState` se actualiza en Redux DevTools
```typescript
console.log(filterState);  // Debe cambiar al interactuar
```

### Problema: Animaciones lentas
**Solución**: Reducir stagger o cambiar easing
```typescript
stagger: 0.03,  // De 0.06 a 0.03 (más rápido)
ease: 'power1.out'  // De elastic.out a power1
```

### Problema: No ve nuevas razas
**Solución**: `filterConfig` solo recalcula si cambia `petType`
```typescript
// Debe haber razas diferentes entre perros y gatos en petsData
```

---

## ✅ Checklist de Integración

- [ ] Importar `useAdvancedFiltering`
- [ ] Importar `FilterBar` component
- [ ] Crear `filterState` con useState
- [ ] Pasar `filterState` a `useAdvancedFiltering`
- [ ] Implementar `handleFilterChange`
- [ ] Pasar props a `FilterBar`
- [ ] Renderizar grid con `filteredPets`
- [ ] Probar todos los filtros
- [ ] Verificar animaciones
- [ ] Build sin errores

---

## 🎯 Casos de Uso

### 1. Usuario busca "Luna"
```
FilterBar input: "Luna"
→ onFilterChange({ searchTerm: 'Luna' })
→ filteredPets: [Luna mascota]
```

### 2. Usuario selecciona dos razas
```
Breed dropdown: ['Golden Retriever', 'Bulldog Francés']
→ onFilterChange({ selectedBreeds: [...] })
→ filteredPets: [Luna, Max, ...filtrados]
```

### 3. Usuario cambia rango de precio
```
Slider: 1.5M - 2.0M
→ onFilterChange({ priceRange: [1500000, 2000000] })
→ filteredPets: [mascotas en rango]
```

### 4. Usuario limpia filtros
```
Click "Limpiar Filtros"
→ Todos los filtros resetean
→ Muestra todos los 6 del tipo
```

---

**Pedigree Palace - Quick Reference v1.0**  
**Última actualización: Mayo 2026**
