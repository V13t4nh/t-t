import { getMovies, getGenres } from './dataService.js';

export async function fetchMovies() {
  return await getMovies();
}

export async function fetchGenres() {
  return await getGenres();
}

export function createMovieCard(movie, compact = false) {
  const article = document.createElement('article');
  article.className = compact ? 'movie-card compact' : 'movie-card';
  article.innerHTML = `
    <div class="movie-poster">
      <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
      <div class="movie-overlay">
        <button class="${compact ? 'play-btn small' : 'play-btn'}">
          <svg width="${compact ? 16 : 20}" height="${compact ? 16 : 20}" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21"></polygon>
          </svg>
          ${compact ? 'Xem' : 'Xem Ngay'}
        </button>
      </div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      ${compact ? '' : `<p class="movie-genre">${movie.genre.join(', ')}</p>`}
      <div class="movie-meta">
        <div class="meta-left">
          <div class="rating">
            <svg class="star-icon" width="${compact ? 12 : 16}" height="${compact ? 12 : 16}" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
            </svg>
            <span>${movie.rating}</span>
          </div>
          <span class="year">${movie.year}</span>
        </div>
        ${compact ? '' : `<span class="duration">${movie.duration}</span>`}
      </div>
    </div>
  `;
  return article;
}
