# NTS Hotels – Prueba Técnica (Backend + Frontend)

> **Stack:** Node.js (ESM + TypeScript) · Express · Prisma · PostgreSQL · React (Vite + TS) · React Query · Tailwind

Este repositorio contiene **dos aplicaciones**:

* **`nts-hotels-backend/`**: API REST para listar/filtrar y CRUD de hoteles.
* **`nts-hotels-frontend/`**: SPA en React que consume la API y muestra el listado con filtros.

---

## 🗂️ Estructura del repositorio

```
prueba/
├─ nts-hotels-backend/
│  ├─ src/
│  │  ├─ app.ts
│  │  ├─ index.ts
│  │  ├─ prisma/client.ts
│  │  ├─ services/hotels.service.ts
│  │  ├─ controllers/hotels.controller.ts
│  │  └─ routes/hotels.routes.ts
│  ├─ prisma/
│  │  └─ schema.prisma
│  ├─ src/scripts/seed.ts        # script de seed
│  ├─ .env                       # variables de entorno (no subir)
│  └─ package.json
│
└─ nts-hotels-frontend/
   ├─ src/
   │  ├─ api/{http.ts,hotels.ts}
   │  ├─ app/queryClient.ts
   │  ├─ components/{Filters.tsx,HotelCard.tsx,Pagination.tsx}
   │  ├─ pages/HotelsPage.tsx
   │  ├─ types/filters.ts
   │  ├─ main.tsx, App.tsx, index.css
   ├─ .env                       # VITE_API_URL (no subir)
   └─ package.json
```

---

## 🚀 Requisitos

* **Node.js 20+** (se recomienda ≥ 20.19.0)
* **npm 9+**
* **PostgreSQL 14+** (local o Docker)

---

## ⚙️ Backend – API REST (Node + Express + Prisma + PostgreSQL)

### 1) Variables de entorno

Crea `nts-hotels-backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/datagovix?schema=public"
PORT=3000
```

> Ajusta usuario/clave/host/puerto/DB si tu Postgres es distinto.

### 2) Instalar dependencias

```bash
cd nts-hotels-backend
npm install
```

### 3) Prisma – generar cliente y migrar

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4) Cargar datos de ejemplo (seed)

```bash
npm run seed
```

### 5) Levantar el servidor en dev

```bash
npm run dev
```

La API queda en: **[http://localhost:3000](http://localhost:3000)**

---

### 📚 Endpoints principales

Base: `/api/hotels`

* `GET /api/hotels` — Listado con filtros, paginación y orden.
* `GET /api/hotels/:id` — Obtener un hotel por ID.
* `POST /api/hotels` — Crear hotel.
* `PUT /api/hotels/:id` — Editar hotel.
* `DELETE /api/hotels/:id` — Eliminar hotel.

#### Parámetros de filtro (querystring)

* `q` → búsqueda por nombre (contains, case-insensitive)
* `city` → ciudad exacta (case-insensitive)
* `stars` → lista de enteros separados por coma (ej: `3,4,5`)
* `amenities` → lista de strings separados por coma (ej: `wifi,pool`)
* `priceMin`, `priceMax` → límites de precio (numéricos)
* `from`, `to` → rango de fechas; devuelve hoteles con disponibilidad que cruza ese rango
* `page`, `pageSize` → paginación (por defecto `1` y `12`)
* `sort` → `campo:dir` (`pricePerNight:asc|desc`, `stars:asc|desc`, ...)

#### Ejemplos (cURL)

```bash
# Listado simple
curl http://localhost:3000/api/hotels

# Filtrado por ciudad, estrellas y amenidades
curl "http://localhost:3000/api/hotels?city=Bogotá&stars=3,4,5&amenities=wifi"

# Crear
curl -X POST http://localhost:3000/api/hotels \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Costa Azul",
    "city":"Santa Marta",
    "stars":4,
    "pricePerNight":"150.00",
    "amenities":["wifi","pool"],
    "images":["https://picsum.photos/seed/4/600/400"]
  }'

# Obtener por id
curl http://localhost:3000/api/hotels/1

# Editar
curl -X PUT http://localhost:3000/api/hotels/1 \
  -H "Content-Type: application/json" \
  -d '{"pricePerNight":"199.99","stars":5}'

# Eliminar
curl -X DELETE http://localhost:3000/api/hotels/1
```

---

## 🖥️ Frontend – React (Vite + TS + React Query + Tailwind)

### 1) Variables de entorno

Crea `nts-hotels-frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

### 2) Instalar dependencias y (opcional) Tailwind

```bash
cd ../nts-hotels-frontend
npm install

# (opcional) si no está creado: tailwind + postcss + autoprefixer
npm i -D tailwindcss postcss autoprefixer
```

### 3) Levantar en dev

```bash
npm run dev
```

App en: **[http://localhost:5173](http://localhost:5173)**

> Asegúrate de que el **backend** esté corriendo y que `VITE_API_URL` apunte al puerto correcto.

## 👤 Autor

* **Nombre**: Oscar Fabian Rincon
* **Email**: Fabianrincon.ofrh@gmail.com

> Si el evaluador necesita acceso a un deploy en la nube, se puede publicar rápidamente en Railway/Render (API) y en Netlify/Vercel (Front) ajustando `DATABASE_URL` y `VITE_API_URL`.
