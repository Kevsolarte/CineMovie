// src/api/moviesApi.js
import { tmdbFetch } from './fetchUtils';
import { TMDB_TOKEN } from './tmdbConfig';

export const getPopularMovies = async (page = 1) => {
  return tmdbFetch('/movie/popular', { page });
};
// Ejemplo de otras funciones que puedes añadir:
export const getMovieDetails = async (movieId) => {
  return tmdbFetch(`/movie/${ movieId }`, {
    append_to_response: 'videos,credits'
  });
};

export const imagenMovie = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${ movieId }/images`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ TMDB_TOKEN }`,
        'accept': 'application/json'
      }
    }
  );
  return await response.json();
};

export const searchMovies = async (query) => {
  return tmdbFetch('/search/movie', { query });
};
export const getMovieReviews = async (movieId, page = 1) => {
  return tmdbFetch(`/movie/${ movieId }/reviews`, { page });
};