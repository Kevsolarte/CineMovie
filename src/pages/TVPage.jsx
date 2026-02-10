import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ModalMedia from "../components/FrontApi/Modals/ModalMedia";
import MediaSkeleton from "../components/common/MediaSkeleton";
import { gettvpopular } from "../Api/tvApi";
import { useState } from "react";
import { useMedia } from "../hooks/useMedia";
import {
  FaStar,
  FaCalendarAlt,
  FaFilter,
  FaTimes,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUpAlt,
  FaTv
} from "react-icons/fa";


export default function TVShowsPage() {
  const {
    items: filteredShows,
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
  } = useMedia(gettvpopular, 'name', 'first_air_date');

  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const genres = [
    { id: 10759, name: "Acción y Aventura" },
    { id: 16, name: "Animación" },
    { id: 35, name: "Comedia" },
    { id: 80, name: "Crimen" },
    { id: 99, name: "Documental" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Familia" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Misterio" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" }
  ];

  const openModal = (show) => {
    setSelectedShow(show);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShow(null);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="pt-24 px-4 max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Series de TV Populares
            </h1>
            <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
              Descubre las series más populares, filtradas por género, año de lanzamiento y más.
            </p>
          </div>

          <section className="flex flex-col lg:flex-row w-full gap-8">
            {/* Filtros - Sticky Sidebar */}
            <aside className="lg:sticky lg:top-24 self-start bg-gray-900/60 backdrop-blur-xl w-full lg:w-80 h-fit rounded-2xl p-6 flex flex-col gap-6 border border-white/10 shadow-2xl z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-xl font-bold flex items-center gap-2">
                  <FaFilter className="text-purple-400" /> Filtros
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
                    placeholder="Breaking Bad..."
                    className="w-full p-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all pl-10"
                    autoComplete="off"
                  />
                  <FaSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
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
                    className="p-2.5 rounded-xl border border-white/10 bg-black/40 text-white focus:outline-none focus:border-purple-500 transition-all cursor-pointer appearance-none"
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
                    className="p-2.5 rounded-xl border border-white/10 bg-black/40 text-white focus:outline-none focus:border-purple-500 transition-all cursor-pointer appearance-none"
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
                    className="col-span-2 p-2.5 rounded-xl border border-white/10 bg-black/40 text-white focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
                  >
                    <option value="popularity">Popularidad</option>
                    <option value="rating">Calificación</option>
                    <option value="name">Título</option>
                    <option value="date">Fecha de estreno</option>
                  </select>

                  <button
                    onClick={() => setSortOrder("asc")}
                    className={`p-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${ sortOrder === "asc"
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                      }`}
                  >
                    <FaSortAmountDown /> Asc
                  </button>

                  <button
                    onClick={() => setSortOrder("desc")}
                    className={`p-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${ sortOrder === "desc"
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
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
                {filteredShows.length.toLocaleString()} {filteredShows.length === 1 ? 'SERIE ENCONTRADA' : 'SERIES ENCONTRADAS'}
              </div>
            </aside>

            {/* Lista de series */}
            <main
              ref={mainRef}
              className="flex-1 min-h-screen"
            >
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-8 backdrop-blur-md">
                  {error}
                </div>
              )}

              {loading && filteredShows.length === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(12)].map((_, i) => (
                    <MediaSkeleton key={i} />
                  ))}
                </div>
              )}

              {filteredShows.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                  <div className="text-6xl mb-4 bg-white/5 p-8 rounded-full">🎬</div>
                  <h3 className="text-2xl font-bold text-white">No se encontraron series</h3>
                  <p className="mt-2 text-center max-w-sm">
                    Intenta ajustar tus filtros o busca algo diferente
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                  {filteredShows.map((show) => (
                    <div
                      key={show.id}
                      className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-500 shadow-xl hover:shadow-purple-500/10"
                    >
                      <div className="relative overflow-hidden aspect-[2/3]">
                        {show.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${ show.poster_path }`}
                            alt={show.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out cursor-pointer"
                            loading="lazy"
                            onClick={() => openModal(show)}
                          />
                        ) : (
                          <div className="bg-gray-800 w-full h-full flex items-center justify-center text-gray-600">
                            <FaTv className="text-5xl" />
                          </div>
                        )}

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-6">
                          <p className="text-xs text-gray-300 line-clamp-3 mb-2 transform translateY(20px) group-hover:translateY(0) transition-transform duration-500">
                            {show.overview || "Sin descripción disponible."}
                          </p>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-sm font-bold flex items-center gap-1.5 border border-white/10">
                            <FaStar className="text-yellow-400" />
                            <span className="text-white">{show.vote_average.toFixed(1)}</span>
                          </div>
                        </div>

                        {show.in_production && (
                          <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-md text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg tracking-tighter">
                            LIVE
                          </div>
                        )}
                      </div>

                      <div className="p-5 bg-gradient-to-b from-transparent to-black/20">
                        <div className="flex justify-between items-start gap-4">
                          <h3
                            className="text-white font-bold text-lg leading-tight group-hover:text-purple-400 transition-colors line-clamp-1 cursor-pointer"
                            title={show.name}
                            onClick={() => openModal(show)}
                          >
                            {show.name}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between mt-2.5">
                          <span className="text-gray-500 text-sm font-medium">
                            {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
                          </span>
                          <button
                            onClick={() => openModal(show)}
                            className="text-white/40 hover:text-purple-400 transition-colors font-medium text-sm"
                          >
                            Detalles →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {loading && filteredShows.length > 0 && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              )}

              {!loading && page < totalPages && filteredShows.length > 0 && (
                <div className="text-center py-6 text-gray-500 font-medium animate-pulse">
                  Desplázate hacia abajo para cargar más series...
                </div>
              )}
            </main>
          </section>
        </div>
      </div>
      {isModalOpen && (
        <ModalMedia
          media={selectedShow}
          mediaType="tv"
          closeModal={closeModal}
        />
      )}
      <Footer />
    </>
  );
}