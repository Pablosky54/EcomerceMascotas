# 🚀 Quick Reference - Sistema de Pestañas

## Archivos Modificados/Creados

### ✅ Creados
- `src/components/MascotaTabs.tsx` - Componente de pestañas

### 📝 Modificados
- `src/sections/SectionStoreCatalog.tsx` - Sección con catálogo de mascotas

---

## 📐 Estructura de Código

### MascotaTabs.tsx - Props & Interface
```typescript
interface MascotaTabsProps {
  activeTab: 'dog' | 'cat';
  onTabChange: (tab: 'dog' | 'cat') => void;
}

export default function MascotaTabs({ activeTab, onTabChange }: MascotaTabsProps)
```

### SectionStoreCatalog.tsx - Estado & Filtrado
```typescript
const [activeTab, setActiveTab] = useState<'dog' | 'cat'>('dog');

// Filtrado
const filteredPets = useCallback(
  () => petsData.filter(pet => pet.type === activeTab),
  [activeTab]
);

// Manejador de cambio
const handleTabChange = (tab: 'dog' | 'cat') => {
  // Exit animation
  gsap.to(cards, {
    duration: 0.3,
    y: 20,
    opacity: 0,
    stagger: 0.04,
    ease: 'power2.in',
    onComplete: () => setActiveTab(tab),
  });
};
```

---

## 🎨 Clases Tailwind - Glassmorphism

### Botón Activo
```jsx
className="bg-white/20 backdrop-blur-md border border-white/40 text-[var(--pp-gold)] shadow-lg"
```

### Botón Inactivo
```jsx
className="bg-white/5 backdrop-blur-sm border border-white/10 text-[var(--pp-text-secondary)] hover:bg-white/10"
```

---

## 🎬 Snippets GSAP - Animaciones

### Animación Entrada Pestañas (elastic)
```typescript
gsap.fromTo(
  buttons,
  { opacity: 0, y: -12, scale: 0.95 },
  { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
);
```

### Animación Salida Tarjetas
```typescript
gsap.to(cards, {
  duration: 0.3,
  y: 20,
  opacity: 0,
  stagger: 0.04,
  ease: 'power2.in',
});
```

### Animación Entrada Tarjetas (Stagger)
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

## 📦 Datos de Mascotas

```typescript
interface Pet {
  id: string;                    // Identificador único
  name: string;                  // Nombre (Luna, Max, etc)
  breed: string;                 // Raza (Golden Retriever, etc)
  type: 'dog' | 'cat';          // Tipo de mascota
  size: 'small' | 'medium' | 'large';  // Tamaño
  price: number;                 // Precio en COP
  image: string;                 // Path de imagen (/s7_product1.jpg)
  description: string;           // Descripción para hover
  available: boolean;            // Disponibilidad
}
```

---

## 🎯 Casos de Uso

### Agregar Nueva Mascota
```typescript
const petsData: Pet[] = [
  {
    id: 'pet-7',
    name: 'Rocky',
    breed: 'Rottweiler',
    type: 'dog',
    size: 'large',
    price: 3000000,
    image: '/s_rocky.jpg',
    description: 'Rottweiler imponente de pedigree europeo',
    available: true,
  },
  // ...
];
```

### Usar Favoritos
```typescript
const { toggleFavorite, isFav } = useFavorites();

<button onClick={() => toggleFavorite(pet.id, 'pet')}>
  <Heart className={isFav(pet.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
</button>
```

### Cambiar de Pestaña
```typescript
// En SectionStoreCatalog
<MascotaTabs activeTab={activeTab} onTabChange={handleTabChange} />

// En MascotaTabs
const handleTabChange = (tab: 'dog' | 'cat') => {
  if (activeTab === tab) return;
  const activeButton = tab === 'dog' ? dogsButtonRef.current : catsButtonRef.current;
  if (activeButton) {
    gsap.to(activeButton, { duration: 0.3, ease: 'power2.out' });
  }
  onTabChange(tab);
};
```

---

## 🔍 Debugging

### Verificar Filtrado
```typescript
console.log('Mascotas filtradas:', filteredPets());
console.log('Tab activo:', activeTab);
console.log('Mascotas totales:', petsData.length);
```

### Verificar Animaciones
Abre DevTools y observa el panel GSAP:
```bash
// En consola
gsap.globalTimeline.getChildren();
```

### Verificar Favoritos
```typescript
localStorage.getItem('pedigree_palace_favorites');
// Output: [{"id":"pet-1","type":"pet","addedAt":"2026-05-04T..."}]
```

---

## 🎪 Layout Responsivo

```jsx
{/* Grid Container */}
<div className="flex flex-wrap items-center justify-center gap-6 px-4 lg:px-8 pt-32 lg:pt-0">

  {/* Tarjetas */}
  <div className="relative w-full sm:w-[calc(50%-12px)] lg:w-[280px] max-w-xs">
    {/* Contenido tarjeta */}
  </div>

</div>
```

### Breakpoints
| Breakpoint | Ancho | Columnas |
|-----------|-------|----------|
| Mobile | 100% | 1 |
| sm (640px) | calc(50% - 12px) | 2 |
| lg (1024px) | 280px | 3 |

---

## ⚙️ Configuración CSS Variables

```css
/* Verificar en index.css o App.css */
--pp-bg: #111111;          /* Negro mate */
--pp-gold: #D4AF37;        /* Dorado */
--pp-text: #FFFFFF;        /* Blanco */
--pp-text-secondary: #A0A0A0;  /* Gris claro */
```

---

## 🧪 Testing Checklist

- [ ] Pestañas aparecen al montar (animación elástica)
- [ ] Cambio de tab ejecuta exit/entry animations
- [ ] Filtrado funciona (3 perros, 3 gatos)
- [ ] Botón favoritos funciona
- [ ] localStorage guarda favoritos
- [ ] Responsive en mobile/tablet/desktop
- [ ] Hover effects funcionan
- [ ] Descripciones aparecen en overlay
- [ ] Precios formateados correctamente (COP)
- [ ] Build sin errores ✅

---

**Nota**: Para cambiar a API real, reemplaza:
```typescript
const petsData: Pet[] = [...]
```

Con:
```typescript
const [petsData, setPetsData] = useState<Pet[]>([]);
useEffect(() => {
  fetch('/api/pets').then(r => r.json()).then(setPetsData);
}, []);
```
