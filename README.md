# 🎬 CineMovie!

**CineMovie!** es una plataforma moderna para explorar las películas y series de televisión más populares, desarrollada con las últimas tecnologías en el ecosistema de React. Este proyecto fue diseñado pensando en el rendimiento, la escalabilidad y una experiencia de usuario (UX) premium.

## ✨ Características Principales

- **Exploración de Contenido**: Listado infinito de películas y series de televisión populares.
- **Búsqueda Inteligente**: buscador en tiempo real con debounce integrado en el encabezado.
- **Filtrado Avanzado**: Filtra resultados por género, año de lanzamiento y múltiples opciones de ordenamiento.
- **UX Premium**:
  - **Skeleton Loaders**: Estados de carga elegantes para una percepción de velocidad mejorada.
  - **Infinite Scroll**: Navegación fluida sin interrupciones por paginación tradicional.
  - **Backdrop Blur & Glassmorphism**: Diseño moderno siguiendo las últimas tendencias estéticas.
- **Arquitectura Modular**: Uso de **Custom Hooks** genéricos (`useMedia`) para centralizar la lógica de estado y efectos.
- **Seguridad**: Gestión de API Keys mediante variables de entorno protegidas.

## 🛠️ Stack Tecnológico

- **Frontend**: React 19, Vite 6
- **Estilos**: Tailwind CSS 4
- **Iconos**: React Icons (Fa, Hi)
- **Animaciones**: Swiper, AOS
- **API**: [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)

## 📦 Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/cinemovie.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz con lo siguiente:
   ```env
   VITE_TMDB_API_KEY=tu_api_key
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_TOKEN=tu_bearer_token
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 📸 Screenshots

*(Espacio reservado para tus capturas de pantalla de la Home, Películas y Series)*

---
Desarrollado con ❤️ para mi portafolio de LinkedIn.
