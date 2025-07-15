import { fetchMovies, createMovieCard, fetchGenres } from './movies.js';

document.addEventListener('DOMContentLoaded', async () => {
  const movies = await fetchMovies();
  const featured = document.getElementById('featured-grid');
  const trending = document.getElementById('trending-grid');
  if (featured) {
    movies.slice(0, 3).forEach(m => featured.appendChild(createMovieCard(m)));
  }
  if (trending) {
    movies.slice(3, 7).forEach(m => trending.appendChild(createMovieCard(m, true)));
  }
  const genreGrid = document.querySelector('.genre-grid');
  if (genreGrid) {
    const genres = await fetchGenres();
    genres.slice(0, 6).forEach(g => {
      const card = document.createElement('a');
      card.href = 'genres.html';
      card.className = 'genre-card';
      card.style.backgroundColor = g.color;
      card.innerHTML = `<div class="genre-overlay"></div><h3>${g.englishName}</h3>`;
      genreGrid.appendChild(card);
    });
  }
});
