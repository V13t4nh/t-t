import { fetchMovies, createMovieCard } from './movies.js';

document.addEventListener('DOMContentLoaded', async () => {
  const movies = await fetchMovies();
  const sorted = movies.slice().sort((a, b) => b.rating - a.rating);
  const top = document.querySelector('.top-featured-movies');
  const list = document.querySelector('.rankings-list');
  if (top) {
    sorted.slice(0, 3).forEach((m, i) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'ranking-card-wrapper';
      wrapper.innerHTML = `<div class="ranking-badge top-${i + 1}">${i + 1}</div>`;
      wrapper.appendChild(createMovieCard(m));
      top.appendChild(wrapper);
    });
  }
  if (list) {
    sorted.slice(3, 10).forEach((m, i) => {
      const item = document.createElement('div');
      item.className = 'ranking-item';
      item.innerHTML = `
        <div class="ranking-number rank-${i + 4}">${i + 4}</div>
        <div class="ranking-poster"><img src="${m.poster}" alt="${m.title}" loading="lazy"></div>
        <div class="ranking-info">
          <h3 class="ranking-movie-title">${m.title}</h3>
          <p class="ranking-movie-meta">${m.genre.join(', ')} • ${m.year}</p>
        </div>
        <div class="ranking-details">
          <div class="ranking-rating"><span class="font-bold">${m.rating}</span></div>
          <p class="ranking-duration">${m.duration}</p>
        </div>`;
      list.appendChild(item);
    });
  }
});
