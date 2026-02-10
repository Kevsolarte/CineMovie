import Header from "../components/layout/Header";

import Footer from "../components/layout/Footer";
import ModalMedia from "../components/FrontApi/Modals/ModalMedia";
import MediaSkeleton from "../components/common/MediaSkeleton";
import { useState } from "react";
import { useMedia } from "../hooks/useMedia";
import { getPopularMovies } from "../Api/moviesApi";
import {
  FaStar,
  FaCalendarAlt,
  FaFilter,
  FaTimes,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUpAlt,
  FaFilm
} from "react-icons/fa";

export default function MoviesPage() {
  const {
    items: filteredMovies,
    loading,
    error,
    page,
    totalPages,
    searchTitle,
    setSearchTitle,
    filterYear,
    setFilterYear,
    filterGenre,
    setFilterGenre,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    mainRef,
    uniqueYears,
    clearFilters
  } = useMedia(getPopularMovies, 'title', 'release_date');

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const genres = [
    { id: 28, name: "Acción" },
    { id: 12, name: "Aventura" },
    { id: 16, name: "Animación" },
    { id: 35, name: "Comedia" },
    { id: 80, name: "Crimen" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Familia" },
    { id: 14, name: "Fantasía" },
    { id: 36, name: "Historia" },
    { id: 27, name: "Terror" },
    { id: 10402, name: "Música" },
    { id: 9648, name: "Misterio" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Ciencia ficción" },
    { id: 10770, name: "Película TV" },
    { id: 53, name: "Suspense" },
    { id: 10752, name: "Bélica" },
    { id: 37, name: "Western" }
  ];

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };


  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="pt-24 px-4 max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Películas Populares
            </h1>
            <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
              Descubre las películas más populares, filtradas por género, año de lanzamiento y más.
            </p>
          </div>

          <section className="flex flex-col lg:flex-row w-full gap-8">
            {/* Filtros - Sticky Sidebar */}
            <aside className="lg:sticky lg:top-24 self-start bg-gray-900/60 backdrop-blur-xl w-full lg:w-80 h-fit rounded-2xl p-6 flex flex-col gap-6 border border-white/10 shadow-2xl z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-xl font-bold flex items-center gap-2">
                  <FaFilter className="text-blue-400" /> Filtros
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all active:scale-95 border border-white/10"
                  aria-label="Limpiar filtros"
                >
                  <FaTimes /> Limpiar
                </button>
              </div>

              {/* Buscador */}
              <div className="flex flex-col gap-2">
                <label htmlFor="searchTitle" className="text-gray-400 text-sm font-medium ml-1">
                  BUSCAR POR TÍTULO
                </label>
                <div className="relative group">
                  <input
                    id="searchTitle"
                    type="text"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    placeholder="Avengers..."
                    className="w-full p-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all pl-10"
                    autoComplete="off"
                  />
                  <FaSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Filtro por año */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="filterYear" className="text-gray-400 text-sm font-medium ml-1">
                    AÑO
                  </label>
                  <select
                    id="filterYear"
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="p-2.5 rounded-xl border border-white/10 bg-black/40 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer appearance-none"
                  >
                    <option value="">Todos</option>
                    {uniqueYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Filtro por género */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="filterGenre" className="text-gray-400 text-sm font-medium ml-1">
                    GÉNERO
                  </label>
                  <select
                    id="filterGenre"
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    className="p-2.5 rounded-xl border border-white/10 bg-black/40 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer appearance-none"
                  >
                    <option value="">Todos</option>
                    {genres.map(genre => (
                      <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ordenamiento */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-400 text-sm font-medium ml-1">
                  ORDENAR POR
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="col-span-2 p-2.5 rounded-xl border border-white/10 bg-black/40 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="popularity">Popularidad</option>
                    <option value="rating">Calificación</option>
                    <option value="title">Título</option>
                    <option value="date">Fecha de estreno</option>
                  </select>

                  <button
                    onClick={() => setSortOrder("asc")}
                    className={`p-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${ sortOrder === "asc"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                      }`}
                  >
                    <FaSortAmountDown /> Asc
                  </button>

                  <button
                    onClick={() => setSortOrder("desc")}
                    className={`p-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${ sortOrder === "desc"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                      }`}
                  >
                    <FaSortAmountUpAlt /> Desc
                  </button>
                </div>
              </div>

              <div className="mt-2 bg-white/10 h-px"></div>

              {/* Contador de resultados */}
              <div className="text-center text-xs font-medium text-gray-500 tracking-wider">
                {filteredMovies.length.toLocaleString()} {filteredMovies.length === 1 ? 'PELÍCULA ENCONTRADA' : 'PELÍCULAS ENCONTRADAS'}
              </div>
            </aside>

            {/* Lista de películas */}
            <main
              ref={mainRef}
              className="flex-1 min-h-screen"
            >
              {error && (
                <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-4 rounded-2xl mb-8 backdrop-blur-md">
                  {error}
                </div>
              )}

              {loading && filteredMovies.length === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(12)].map((_, i) => (
                    <MediaSkeleton key={i} />
                  ))}
                </div>
              )}

              {filteredMovies.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                  <div className="text-6xl mb-4 bg-white/5 p-8 rounded-full">🎬</div>
                  <h3 className="text-2xl font-bold text-white">No se encontraron películas</h3>
                  <p className="mt-2 text-center max-w-sm">
                    Intenta ajustar tus filtros o busca algo diferente
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                  {filteredMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-500 shadow-xl hover:shadow-blue-500/10"
                    >
                      <div className="relative overflow-hidden aspect-[2/3]">
                        {movie.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${ movie.poster_path }`}
                            alt={movie.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out cursor-pointer"
                            loading="lazy"
                            onClick={() => openModal(movie)}
                          />
                        ) : (
                          <div className="bg-gray-800 w-full h-full flex items-center justify-center text-gray-600">
                            <FaFilm className="text-5xl" />
                          </div>
                        )}

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-6">
                          <p className="text-xs text-gray-300 line-clamp-3 mb-2 transform translateY(20px) group-hover:translateY(0) transition-transform duration-500">
                            {movie.overview || "Sin descripción disponible."}
                          </p>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3">
                          <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-sm font-bold flex items-center gap-1.5 border border-white/10">
                            <FaStar className="text-yellow-400" />
                            <span className="text-white">{movie.vote_average.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 bg-gradient-to-b from-transparent to-black/20">
                        <div className="flex justify-between items-start gap-4">
                          <h3
                            className="text-white font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer"
                            title={movie.title}
                            onClick={() => openModal(movie)}
                          >
                            {movie.title}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between mt-2.5">
                          <span className="text-gray-500 text-sm font-medium">
                            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                          </span>
                          <button
                            onClick={() => openModal(movie)}
                            className="text-white/40 hover:text-blue-400 transition-colors font-medium text-sm"
                          >
                            Detalles →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {loading && filteredMovies.length > 0 && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}

              {!loading && page < totalPages && filteredMovies.length > 0 && (
                <div className="text-center py-6 text-gray-500 font-medium animate-pulse">
                  Desplázate hacia abajo para cargar más películas...
                </div>
              )}
            </main>
          </section>
        </div>
      </div>
      {isModalOpen && (
        <ModalMedia
          media={selectedMovie}
          mediaType="movie"
          closeModal={closeModal}
        />
      )}
      <Footer />
    </>
  );
}

