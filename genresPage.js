import { fetchGenres } from './movies.js';

document.addEventListener('DOMContentLoaded', async () => {
  const genres = await fetchGenres();
  const grid = document.querySelector('.genre-grid');
  if (grid) {
    grid.innerHTML = '';
    genres.forEach(g => {
      const card = document.createElement('a');
      card.href = 'genres.html';
      card.className = 'genre-card';
      card.style.backgroundColor = g.color;
      card.innerHTML = `<div class="genre-overlay"></div><h3>${g.englishName}</h3>`;
      grid.appendChild(card);
    });
  }
});
