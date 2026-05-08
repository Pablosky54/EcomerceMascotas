# 🏗️ Arquitectura Visual - Sistema de Filtrado Avanzado

## 1️⃣ Jerarquía de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│          SectionStoreCatalog (Contenedor Principal)         │
│                                                             │
│  State:                                                     │
│  ├─ filterState: FilterState                              │
│  ├─ petsData: Pet[]                                        │
│  └─ refs: sectionRef, cardsRef, etc.                       │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                    FilterBar                          │ │
│  │  ─────────────────────────────────────────────────   │ │
│  │  Props:                                               │ │
│  │  ├─ filterState (lectura)                             │ │
│  │  ├─ filterConfig (lectura)                            │ │
│  │  ├─ onFilterChange (callback)                         │ │
│  │  ├─ totalResults, filteredResults                     │ │
│  │  └─ hasActiveFilters                                  │ │
│  │                                                       │ │
│  │  UI Sections:                                         │ │
│  │  ├─ Header (Refinar Búsqueda + Contador)             │ │
│  │  ├─ Tabs (Type: Dog/Cat)                             │ │
│  │  ├─ Search Input                                      │ │
│  │  ├─ Breed Multi-Select                                │ │
│  │  ├─ Price Range Sliders                               │ │
│  │  ├─ Size Buttons                                       │ │
│  │  └─ Action Bar (Clear Filters)                        │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              Pet Cards Grid                           │ │
│  │  ─────────────────────────────────────────────────   │ │
│  │  Grid: 1 col (mobile) → 2 col (tablet) → 3 (desktop)│ │
│  │  Gap: 24px                                            │ │
│  │  Items: filteredPets.length                           │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │           Pet Card Component                    │ │ │
│  │  │  ─────────────────────────────────────────────  │ │ │
│  │  │  ├─ Image (hover: scale-110)                    │ │ │
│  │  │  ├─ Badge (Disponible/Reservado)                │ │ │
│  │  │  ├─ Certifications (FCI, TICA, etc)             │ │ │
│  │  │  ├─ Favorite Button (Heart)                     │ │ │
│  │  │  ├─ Name, Breed, Price                          │ │ │
│  │  │  ├─ Details (Size, Age, Origin)                 │ │ │
│  │  │  ├─ Temperament (italic text)                   │ │ │
│  │  │  └─ Hover Overlay (Description)                 │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              CTA Button                               │ │
│  │  "CONSULTAR DISPONIBILIDAD"                           │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 2️⃣ Flujo de Datos (Data Flow)

```
┌─────────────────────────────────────────────────────────┐
│         petsData: Pet[] (12 mascotas mock)              │
│  [Luna, Max, Bella, ..., Mystic, Princess, Elegance]   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│   filterState: FilterState                             │
│   {                                                    │
│     petType: 'dog' | 'cat',                           │
│     selectedBreeds: string[],                          │
│     priceRange: [number, number],                      │
│     selectedSizes: string[],                           │
│     searchTerm: string                                 │
│   }                                                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│   useAdvancedFiltering(petsData, filterState)          │
│   ─────────────────────────────────────────────────   │
│   Lógica:                                              │
│   1. Filtrar por petType                               │
│   2. Filtrar por selectedBreeds (si aplica)            │
│   3. Filtrar por priceRange                            │
│   4. Filtrar por selectedSizes (si aplica)             │
│   5. Filtrar por searchTerm (if/text match)            │
│   6. Ordenar por availability + price                  │
│                                                        │
│   Returns: {                                           │
│     filteredPets: Pet[],      ← Mascotas finales      │
│     filterConfig: FilterConfig,← Opciones dinámicas   │
│     totalCount: number,       ← Total del tipo actual  │
│     filteredCount: number,    ← Resultados post-filtro│
│     hasActiveFilters: boolean ← ¿Mostrar Clear?       │
│   }                                                    │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┴────────────┐
         │                        │
         ▼                        ▼
┌──────────────────┐   ┌──────────────────────────┐
│   FilterBar      │   │   Grid de Tarjetas      │
│  ─────────────   │   │ ──────────────────────  │
│ • Lee filterState│   │ • Itera filteredPets   │
│ • Lee filterConf │   │ • Renderiza Pet Cards   │
│ • Callback para  │   │ • Anima con GSAP       │
│   actualizaciones│   │ • Integra useFavorites │
└──────────────────┘   └──────────────────────────┘
         │                        │
         └────────────┬───────────┘
                      │
                      ▼
            ┌──────────────────────┐
            │  Evento del Usuario  │
            │  ──────────────────  │
            │  • Click tab         │
            │  • Cambio slider     │
            │  • Input búsqueda    │
            │  • Click favorito    │
            └──────────────────────┘
                      │
                      ▼
            onFilterChange() callback
                      │
                      ▼
            setFilterState() actualiza
                      │
                      ▼
            Re-calcula todo el flujo
```

---

## 3️⃣ Ciclo de Vida del Componente

```
┌─ MOUNT ──────────────────────────────────────┐
│ 1. React renderiza SectionStoreCatalog       │
│ 2. useState inicializa filterState           │
│ 3. useAdvancedFiltering calcula initial      │
│ 4. FilterBar monta y anima ENTRADA           │
│    gsap.fromTo(container, opacity: 0 → 1)   │
│ 5. Pet cards se renderiza (6 de 6)          │
│ 6. useLayoutEffect → ScrollTrigger           │
│ 7. GSAP timeline crea animación scroll       │
└──────────────────────────────────────────────┘
              COMPONENTE LISTO
                     │
         ┌───────────┴───────────┐
         │                       │
    INTERACCIÓN            NO INTERACCIÓN
         │                       │
         ▼                       ▼
  Usuario click            Scroll página
  en filtro                     │
         │                       ▼
         ▼              ScrollTrigger activa
  onFilterChange()       GSAP timeline:
  setFilterState()       • 0-30%: Entrada
         │               • 70-100%: Salida
         ▼
  useAdvancedFiltering
  recalcula:
  • filterConfig
  • filteredPets ← memoized
  • counts
         │
         ▼
  useLayoutEffect detecta
  cambio en filteredPets
         │
         ▼
  GSAP Stagger:
  gsap.fromTo(cards,
    {opacity:0, y:20},
    {opacity:1, y:0, stagger:0.06})
         │
         ▼
  Grid re-renderiza
  con nuevas tarjetas
         │
         ▼
  ANIMACIÓN COMPLETA
```

---

## 4️⃣ Estructura de Interfaces

```
┌──────────────────────────────────────────────────┐
│                    Pet                           │
│  ──────────────────────────────────────────────  │
│  id: string                                      │
│  name: string                                    │
│  breed: string                ← Filtrable       │
│  type: 'dog' | 'cat'          ← Filtrable       │
│  size: 'small' | 'medium' | 'large' ← Filtrable│
│  price: number                ← Filtrable       │
│  image: string                                   │
│  description: string          ← Searchable      │
│  available: boolean                              │
│  ▼ NUEVO ▼                                       │
│  origin?: string                                 │
│  temperament?: string                            │
│  age?: number                                    │
│  certifications?: string[]                       │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│              FilterState                         │
│  ──────────────────────────────────────────────  │
│  petType: 'dog' | 'cat'  ← Nivel 1             │
│  selectedBreeds: string[]← Nivel 2              │
│  priceRange: [number, number] ← Nivel 2         │
│  selectedSizes: string[] ← Nivel 2              │
│  searchTerm: string      ← Nivel 2              │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│            FilterConfig                          │
│  ──────────────────────────────────────────────  │
│  breeds: string[]    ← Dinámico por petType      │
│  priceRange: {                                   │
│    min: number       ← Dinámico                 │
│    max: number       ← Dinámico                 │
│  }                                               │
│  sizes: string[]     ← Dinámico                 │
└──────────────────────────────────────────────────┘
```

---

## 5️⃣ Orden de Filtrado

```
┌─ Entrada ─────────────────────────┐
│ petsData [12 mascotas]            │
│ filterState [configuración]       │
└───────────────┬─────────────────────┘
                │
                ▼
        ┌─ Filtro 1 ─────────┐
        │ Por Type (dog/cat) │
        │ 12 → 6 mascotas   │
        └────────┬───────────┘
                 │
                 ▼
     ┌─ Filtro 2 ──────────────┐
     │ Por Breeds seleccionados│
     │ (si hay selección)      │
     │ 6 → 2-6 mascotas       │
     └──────────┬──────────────┘
                │
                ▼
      ┌─ Filtro 3 ──────────────┐
      │ Por Price Range          │
      │ (rango seleccionado)     │
      │ N → N-2 mascotas        │
      └──────────┬──────────────┘
                 │
                 ▼
       ┌─ Filtro 4 ───────────────┐
       │ Por Sizes seleccionados  │
       │ (si hay selección)       │
       │ N → 1-N mascotas        │
       └──────────┬───────────────┘
                  │
                  ▼
        ┌─ Filtro 5 ──────────────┐
        │ Por Search Term          │
        │ (búsqueda text)          │
        │ • Nombre                 │
        │ • Raza                   │
        │ • Descripción            │
        │ N → 1-N mascotas        │
        └──────────┬──────────────┘
                   │
                   ▼
          ┌─ Sort ──────────────┐
          │ 1. Por availability  │
          │ 2. Por price (ASC)   │
          └──────────┬───────────┘
                     │
                     ▼
        ┌─ Salida ──────────────────┐
        │ filteredPets: Pet[] final │
        └────────────────────────────┘
```

---

## 6️⃣ Memoización & Performance

```
┌─────────────────────────────────────────────────────┐
│         useAdvancedFiltering Hook                   │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  filterConfig = useMemo(() => {                    │
│    // Re-calcula solo si:                         │
│    // • pets cambia                               │
│    // • filterState.petType cambia                │
│    dependencies: [pets, filterState.petType]      │
│  })                                                │
│                                                     │
│  filteredPets = useMemo(() => {                    │
│    // Re-calcula solo si:                         │
│    // • pets cambia                               │
│    // • filterState cambia (CUALQUIER campo)      │
│    dependencies: [pets, filterState]              │
│  })                                                │
│                                                     │
│  totalCount = useMemo(() => {                      │
│    // Re-calcula solo si:                         │
│    // • pets cambia                               │
│    // • filterState.petType cambia                │
│    dependencies: [pets, filterState.petType]      │
│  })                                                │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│      handleFilterChange useCallback                 │
│  ─────────────────────────────────────────────────  │
│  • Se recrea solo 1 vez (en mount)                 │
│  • No se recrea en cada render                     │
│  • Prevent re-render de FilterBar                  │
│  dependencies: []                                   │
└─────────────────────────────────────────────────────┘
```

---

## 7️⃣ Timeline de Animaciones GSAP

```
┌─ Entrada FilterBar ──────────────────────┐
│ Duración: 0.6s                           │
│ Easing: power2.out                       │
│                                          │
│ opacity: 0 ────────────────────→ 1       │
│ y (top): -20px ─────────────────→ 0      │
└──────────────────────────────────────────┘
        │
        ▼ (Usuario interactúa)
┌─ Salida de Tarjetas ─────────────────────┐
│ Duración: 0.3s                           │
│ Easing: power2.in                        │
│ Stagger: 0.04s entre tarjetas           │
│                                          │
│ opacity: 1 ────────────────────→ 0       │
│ y: 0 ──────────────────────────→ +20px   │
└──────────────────────────────────────────┘
        │
        ▼ (setFilterState)
┌─ Entrada de Tarjetas ────────────────────┐
│ Duración: 0.5s                           │
│ Easing: elastic.out(1, 0.6)              │
│ Stagger: 0.06s entre tarjetas           │
│                                          │
│ opacity: 0 ────────────────────→ 1       │
│ y: 20px ───────────────────────→ 0       │
│ (con bounce final)                       │
└──────────────────────────────────────────┘
```

---

## 8️⃣ Estados de FilterBar

### Estado Inicial

```
petType: 'dog'
selectedBreeds: []
priceRange: [1.3M, 2.8M]  ← Rango de perros
selectedSizes: []
searchTerm: ''

Resultado: 6 perros mostrados
```

### Con Filtros Activos

```
petType: 'dog'
selectedBreeds: ['Golden Retriever']
priceRange: [2.4M, 2.6M]
selectedSizes: ['large']
searchTerm: ''

Resultado: 1 perro (Luna)
Botón "Limpiar Filtros" visible
```

### Con Búsqueda

```
petType: 'dog'
selectedBreeds: []
priceRange: [1.3M, 2.8M]
selectedSizes: []
searchTerm: 'poodle'

Resultado: 1 perro (Charlie - Poodle)
```

---

## 9️⃣ Integración de Hooks

```
SectionStoreCatalog
├─ useState(filterState)
│  └─ Maneja el estado de filtros
│
├─ useAdvancedFiltering(petsData, filterState)
│  ├─ useMemo para filterConfig
│  ├─ useMemo para filteredPets
│  ├─ useMemo para totalCount
│  └─ useCallback para hasActiveFilters
│
├─ useFavorites()
│  ├─ toggleFavorite(id, type)
│  └─ isFav(id)
│
├─ useRef (sectionRef, cardsRef, etc.)
│  └─ Para GSAP animations
│
└─ useLayoutEffect (2x)
   ├─ 1. ScrollTrigger + pinned animations
   └─ 2. Stagger animation al cambiar filteredPets
```

---

**Arquitectura Completa - Sistema de Filtrado Avanzado**  
**Pedigree Palace | Mayo 2026**
