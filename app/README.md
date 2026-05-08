# Pedigree Palace - README

## Descripcion del Proyecto

Pedigree Palace es una plataforma web premium para la distribucion de mascotas con pedigree. El sitio presenta un diseno de lujo (Pet-Luxury) con paleta de colores dorado y negro mate, ofreciendo una experiencia visual elegante y sofisticada orientada al mercado de mascotas de alta gama.

### Caracteristicas Principales

- **Diseno Pet-Luxury**: Paleta de colores dorado (#D4AF37) y negro mate (#111111) con tipografia Playfair Display e Inter
- **Navegacion inmersiva**: Secciones con scroll pinned y animaciones GSAP ScrollTrigger
- **Catalogo de mascotas**: Grid de tarjetas con sistema de favoritos (corazon)
- **Sistema de favoritos**: Clase StorageManager con localStorage, lista para migracion a API MySQL
- **Rastreo de pedidos**: Buscador con 3 estados (En preparacion, En camino, Entregado)
- **Envios internacionales**: Seccion con cotizacion via WhatsApp
- **Boton WhatsApp flotante**: Redireccion a chat con mensaje predefinido
- **Chatbot visual**: Componente decorativo que redirige a WhatsApp
- **Empaque ecologico**: Seccion destacando packaging Pet-Friendly
- **SEO optimizado**: Meta tags, Open Graph y configuracion regional es-CO
- **Responsive**: Adaptable a desktop, tablet y mobile

---

## Guia de Ejecucion en Localhost

### Opcion 1: VS Code Live Server (Recomendado)

1. Instala la extension **Live Server** en VS Code
2. Abre la carpeta del proyecto en VS Code
3. Haz clic derecho en el archivo `index.html` y selecciona **"Open with Live Server"**
4. El sitio se abrira automaticamente en `http://127.0.0.1:5500`

### Opcion 2: Servidor Python

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```
Luego abre `http://localhost:8080` en tu navegador.

### Opcion 3: Node.js (Desarrollo)

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo Vite
npm run dev

# Build para produccion
npm run build
```

### Opcion 4: PHP

```bash
php -S localhost:8080
```

---

## Documentacion de LocalStorage

### Clase StorageManager

La clase `StorageManager` maneja todas las operaciones de almacenamiento de favoritos. Esta disenada con una interfaz basada en promesas para facilitar la futura migracion a una API REST con base de datos MySQL.

#### Estructura de Datos

```typescript
interface FavoriteItem {
  id: string;        // ID del item (pet o product)
  type: 'pet' | 'product';  // Tipo de item
  addedAt: string;   // Fecha de adicion (ISO 8601)
}
```

#### Metodos Disponibles

| Metodo | Descripcion | Retorno |
|--------|-------------|---------|
| `getFavorites()` | Obtiene todos los favoritos | `Promise<FavoriteItem[]>` |
| `saveFavorites(favorites)` | Guarda la lista completa | `Promise<void>` |
| `addFavorite(id, type)` | Agrega un item a favoritos | `Promise<void>` |
| `removeFavorite(id)` | Elimina un item de favoritos | `Promise<void>` |
| `isFavorite(id)` | Verifica si un item es favorito | `Promise<boolean>` |

#### Clave de Almacenamiento

```javascript
const STORAGE_KEY = 'pedigree_palace_favorites';
```

Los datos se almacenan en localStorage como un array JSON en la clave `pedigree_palace_favorites`.

#### Migracion a MySQL (Futuro)

Para migrar a una base de datos MySQL, solo es necesario reemplazar el cuerpo de cada metodo con llamadas a la API:

```typescript
// Ejemplo de migracion
static async getFavorites(): Promise<FavoriteItem[]> {
  const response = await fetch('/api/favorites', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
}

static async addFavorite(id: string, type: 'pet' | 'product'): Promise<void> {
  await fetch('/api/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, type })
  });
}
```

#### Hook useFavorites

El hook `useFavorites` proporciona una interfaz React-friendly para el StorageManager:

```typescript
const { favorites, loading, toggleFavorite, isFav } = useFavorites();
```

- `favorites`: Array de items favoritos actuales
- `loading`: Estado de carga inicial
- `toggleFavorite(id, type)`: Agrega/elimina de favoritos
- `isFav(id)`: Verifica si un ID es favorito

---

## Estructura del Proyecto

```
├── public/                    # Assets estaticos
│   ├── favicon.svg           # Favicon del sitio
│   ├── s2_dog_white.jpg      # Imagen seccion perros
│   ├── s2_cat_orange.jpg     # Imagen seccion gatos
│   ├── s3_corgi.jpg          # Collage delivery
│   ├── s3_beagle.jpg         # Collage delivery
│   ├── s3_owner_dog.jpg      # Collage delivery
│   ├── s4_frenchie.jpg       # Spotlight Bulldog Frances
│   ├── s6_circle_puppy.jpg   # Tienda intro
│   ├── s7_product1.jpg       # Producto 1
│   ├── s7_product2.jpg       # Producto 2
│   ├── s7_product3.jpg       # Producto 3
│   ├── s8_*.jpg              # Envios internacionales
│   ├── s9_cat_exotic.jpg     # Gato Exotico
│   ├── s10_*.jpg             # Empaque ecologico
│   ├── s11_*.jpg             # Rastreo de pedidos
│   └── s12_cat_tricolor.jpg  # Gato Tricolor
│
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── Header.tsx        # Header fijo con logo
│   │   ├── WhatsAppButton.tsx # Boton flotante WhatsApp
│   │   ├── Chatbot.tsx       # Chatbot visual
│   │   └── MenuOverlay.tsx   # Menu de navegacion
│   │
│   ├── sections/             # Secciones del sitio
│   │   ├── SectionHero.tsx          # Seccion 1: Hero
│   │   ├── SectionSplitPortrait.tsx # Seccion 2: Perros y Gatos
│   │   ├── SectionDelivery.tsx      # Seccion 3: Compromiso de entrega
│   │   ├── SectionDogSpotlight.tsx  # Seccion 4: Bulldog Frances
│   │   ├── SectionMetrics.tsx       # Seccion 5: Metricas
│   │   ├── SectionStoreIntro.tsx    # Seccion 6: Tienda intro
│   │   ├── SectionStoreCatalog.tsx  # Seccion 7: Catalogo
│   │   ├── SectionInternational.tsx # Seccion 8: Envios internacionales
│   │   ├── SectionCatSpotlight.tsx  # Seccion 9: Gato Exotico
│   │   ├── SectionEcoPackaging.tsx  # Seccion 10: Empaque ecologico
│   │   ├── SectionTracking.tsx      # Seccion 11: Rastreo
│   │   ├── SectionCatTricolor.tsx   # Seccion 12: Gato Tricolor
│   │   └── SectionFooter.tsx        # Seccion 13: Contacto
│   │
│   ├── hooks/                # Custom hooks
│   │   ├── useFavorites.ts   # Hook de favoritos + StorageManager
│   │   └── useScrollCounter.ts # Hook de contadores animados
│   │
│   ├── types/                # Tipos TypeScript
│   │   └── index.ts          # Definiciones de tipos
│   │
│   ├── App.tsx               # Componente principal
│   ├── main.tsx              # Punto de entrada
│   └── index.css             # Estilos globales
│
├── index.html                # HTML con meta tags SEO
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Stack Tecnologico

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui
- **Animations**: GSAP + ScrollTrigger
- **Icons**: Lucide React
- **Routing**: React Router

---

## SEO Implementado

- Meta description con keywords relevantes
- Open Graph tags (Facebook)
- Twitter Card tags
- Canonical URL
- Language tag: `es-CO`
- Robots: index, follow
- Favicon SVG personalizado

---

## Licencia

© 2024 Pedigree Palace. Todos los derechos reservados.
