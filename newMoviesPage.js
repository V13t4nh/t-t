import { fetchMovies, createMovieCard } from './movies.js';

document.addEventListener('DOMContentLoaded', async () => {
  const movies = await fetchMovies();
  const container = document.getElementById('new-grid');
  if (container) {
    movies.forEach(m => container.appendChild(createMovieCard(m, true)));
  }
});
