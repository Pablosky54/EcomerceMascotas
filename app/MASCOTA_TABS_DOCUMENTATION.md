# Sistema de Navegación por Pestañas - Catálogo de Mascotas

## 📋 Overview

Se ha implementado un sistema completo de navegación por pestañas (Tabs) para el catálogo de mascotas en **Pedigree Palace**. El sistema permite filtrar entre perros y gatos con animaciones suaves tipo Stagger usando GSAP y un diseño Glassmorphism en los botones activos.

---

## 🎯 Componentes Creados

### 1. **MascotaTabs.tsx** (`src/components/`)

Componente de navegación que proporciona las pestañas (Dogs/Cats) con diseño Luxury.

#### Props:
```typescript
interface MascotaTabsProps {
  activeTab: 'dog' | 'cat';          // Pestaña activa
  onTabChange: (tab: 'dog' | 'cat') => void;  // Callback al cambiar
}
```

#### Características:
- ✅ **Glassmorphism Design**: Botones con efecto backdrop blur y bordes semitransparentes
- ✅ **Iconos Lucide-React**: Iconos minimalistas de perro y gato
- ✅ **Animación GSAP**: Entrada elástica al montar el componente
- ✅ **Responsive**: Botones escalables para mobile y desktop
- ✅ **Accesibilidad**: Labels ARIA para lectores de pantalla

#### Clases Tailwind Aplicadas:
```jsx
// Estado Activo (Glassmorphism)
bg-white/20 backdrop-blur-md border border-white/40 text-[var(--pp-gold)] shadow-lg

// Estado Inactivo
bg-white/5 backdrop-blur-sm border border-white/10 text-[var(--pp-text-secondary)] hover:bg-white/10
```

#### Animaciones GSAP:
```typescript
// Entrada al montar
gsap.fromTo(buttons, 
  { opacity: 0, y: -12, scale: 0.95 },
  { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
);
```

---

### 2. **SectionStoreCatalog.tsx** Actualizada (`src/sections/`)

Sección completamente rediseñada para mostrar mascotas con filtrado por tipo.

#### Estado Componente:
```typescript
const [activeTab, setActiveTab] = useState<'dog' | 'cat'>('dog');
```

#### Datos de Mascotas Mock:
```typescript
const petsData: Pet[] = [
  {
    id: 'pet-1',
    name: 'Luna',
    breed: 'Golden Retriever',
    type: 'dog',
    size: 'large',
    price: 2500000,
    image: '/s2_dog_white.jpg',
    description: 'Hermosa Golden Retriever con linaje certificado',
    available: true,
  },
  // ... más mascotas
];
```

#### Lógica de Filtrado:
```typescript
const filteredPets = useCallback(
  () => petsData.filter(pet => pet.type === activeTab),
  [activeTab]
);
```

#### Animaciones al Cambiar Tab:

1. **Salida (Exit Animation)**:
```typescript
gsap.to(cards, {
  duration: 0.3,
  y: 20,
  opacity: 0,
  stagger: 0.04,
  ease: 'power2.in',
});
```

2. **Entrada (Stagger Animation)**:
```typescript
gsap.to(cards, {
  duration: 0.4,
  y: 0,
  opacity: 1,
  stagger: 0.08,
  ease: 'elastic.out(1, 0.6)',
});
```

---

## 🎨 Diseño Visual

### Paleta de Colores
- **Fondo**: Negro mate `#111111` (CSS variable: `var(--pp-bg)`)
- **Dorado**: `#D4AF37` (CSS variable: `var(--pp-gold)`)
- **Textos**: Gris claro (CSS variable: `var(--pp-text-secondary)`)

### Grid Responsivo
- **Mobile**: 1 columna (100%)
- **Tablet**: 2 columnas (`calc(50% - 12px)`)
- **Desktop**: 3 columnas (ancho fijo `280px`)

```jsx
className="w-full sm:w-[calc(50%-12px)] lg:w-[280px]"
```

### Tarjetas de Mascotas
```jsx
{/* Card Layout */}
<div className="relative w-full sm:w-[calc(50%-12px)] lg:w-[280px] bg-white group cursor-pointer">
  {/* Botón de Favoritos */}
  <button onClick={() => toggleFavorite(pet.id, 'pet')}>
    <Heart className={isFav(pet.id) ? 'text-red-500 fill-red-500' : 'text-secondary'} />
  </button>

  {/* Badge de Disponibilidad */}
  <div className="px-2 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full">
    Disponible
  </div>

  {/* Imagen */}
  <img src={pet.image} className="transition-transform duration-500 group-hover:scale-105" />

  {/* Info: Nombre, Raza, Precio, Tamaño */}
  <div className="p-4">
    <h3>{pet.name}</h3>
    <p className="text-[var(--pp-text-secondary)]">{pet.breed}</p>
    <p className="text-gold font-semibold">${pet.price.toLocaleString('es-CO')}</p>
  </div>

  {/* Overlay en Hover */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100">
    <p className="text-white text-sm">{pet.description}</p>
  </div>
</div>
```

---

## 🔄 Integración con Sistema de Favoritos

El componente mantiene total compatibilidad con `useFavorites` hook:

```typescript
// Hook disponible
const { toggleFavorite, isFav } = useFavorites();

// Uso en botón
<button onClick={() => toggleFavorite(pet.id, 'pet')}>
  <Heart className={isFav(pet.id) ? 'text-red-500 fill-red-500' : 'text-secondary'} />
</button>
```

✅ Los favoritos se guardan en `localStorage` con key: `pedigree_palace_favorites`
✅ Listo para migración a MySQL cuando backend esté disponible

---

## 📱 Responsive Behavior

### Mobile (< 768px)
- Pestañas stacked verticalmente
- Grid de 1 columna
- Botones amplios con padding

```jsx
className="px-4 py-2.5 lg:px-6 lg:py-3"
```

### Desktop (≥ 1024px)
- Pestañas horizontales alineadas a la izquierda
- Grid de 3 columnas
- Botones más compactos

### Labels Dinámicas
```jsx
<span className="label-micro">
  {activeTab === 'dog' ? 'PERROS PREMIUM' : 'GATOS ARISTOCRACIA'}
</span>
```

---

## 🚀 Cómo Usar

### En SectionStoreCatalog:
```tsx
import MascotaTabs from '@/components/MascotaTabs';

// En el JSX
<MascotaTabs 
  activeTab={activeTab} 
  onTabChange={handleTabChange}
/>
```

### Agregar Nuevas Mascotas:
Edita el array `petsData` en `SectionStoreCatalog.tsx`:
```typescript
const petsData: Pet[] = [
  {
    id: 'pet-N',
    name: 'Nombre',
    breed: 'Raza',
    type: 'dog' | 'cat',
    size: 'small' | 'medium' | 'large',
    price: 1500000,
    image: '/path/to/image.jpg',
    description: 'Descripción',
    available: true,
  },
  // ...
];
```

### Conectar a API (Futuro):
Reemplaza `petsData` con un fetch:
```typescript
const [petsData, setPetsData] = useState<Pet[]>([]);

useEffect(() => {
  fetch('/api/pets')
    .then(res => res.json())
    .then(setPetsData);
}, []);
```

---

## 🎬 Animaciones Implementadas

### 1. Entrada de Pestañas (al montar)
- **Tipo**: Elastic easing
- **Duración**: 0.6s
- **Efecto**: Escala + opacidad + traslación Y
- **Stagger**: 80ms entre botones

### 2. Cambio de Tab - Salida
- **Duración**: 0.3s
- **Efecto**: Traslación Y + opacidad (fade out)
- **Easing**: power2.in
- **Stagger**: 40ms entre tarjetas

### 3. Cambio de Tab - Entrada
- **Duración**: 0.4s
- **Efecto**: Elastic bounce
- **Easing**: elastic.out(1, 0.6)
- **Stagger**: 80ms entre tarjetas

### 4. Scroll Principal (ScrollTrigger)
- **Entrada**: 0-30% → Tarjetas suben desde abajo
- **Salida**: 70-100% → Tarjetas descienden con fade out

---

## 🔧 Customización

### Cambiar Colores
Edita las variables CSS en `index.css` o en el componente:
```jsx
className="bg-white/20 backdrop-blur-md border border-white/40 text-[var(--pp-gold)]"
```

### Modificar Duración de Animaciones
En `MascotaTabs.tsx`:
```typescript
gsap.fromTo(buttons, ..., { duration: 0.6 }); // Cambiar 0.6
```

En `SectionStoreCatalog.tsx`:
```typescript
gsap.to(cards, { duration: 0.4, stagger: 0.08 }); // Cambiar duración
```

### Agregar Más Filtros
Expande el tipo de `activeTab`:
```typescript
const [activeTab, setActiveTab] = useState<'dog' | 'cat' | 'exotic'>('dog');
```

Agrega nuevos botones en `MascotaTabs`:
```jsx
<button onClick={() => handleTabChange('exotic')}>
  {/* Icono exótico */}
</button>
```

---

## ✅ Validación del Build

```bash
✓ 1735 modules transformed
✓ built in 9.14s
```

El proyecto compila sin errores TypeScript. Listo para producción.

---

## 📊 Datos Mock Incluidos

| ID | Nombre | Raza | Tipo | Tamaño | Precio | Imagen |
|-----|--------|------|------|--------|--------|--------|
| pet-1 | Luna | Golden Retriever | dog | large | $2.500.000 | s2_dog_white.jpg |
| pet-2 | Max | Bulldog Francés | dog | small | $1.800.000 | s4_frenchie.jpg |
| pet-3 | Bella | Beagle | dog | medium | $1.500.000 | s3_beagle.jpg |
| pet-4 | Cleopatra | Gato Persa | cat | small | $1.200.000 | s2_cat_orange.jpg |
| pet-5 | Sphinx | Gato Exótico | cat | small | $2.000.000 | s9_cat_exotic.jpg |
| pet-6 | Whiskers | Gato Tricolor | cat | small | $1.400.000 | s12_cat_tricolor.jpg |

---

## 🎯 Próximos Pasos

1. **Conectar API**: Reemplaza `petsData` con llamadas a `/api/pets`
2. **Agregar Filtros Adicionales**: Tamaño, precio, disponibilidad
3. **Detalles de Mascota**: Modal o página dedicada
4. **Carrito de Compras**: Integrar sistema de checkout
5. **Búsqueda**: Campo de búsqueda por nombre/raza

---

**Proyecto**: Pedigree Palace 🐾👑  
**Stack**: React 19 + TypeScript + Tailwind CSS + GSAP + Lucide Icons  
**Última Actualización**: Mayo 2026
