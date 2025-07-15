import { getActors } from './dataService.js';
import { formatNumber } from './utils.js';

let actors = [];
let currentPage = 1;
const PER_PAGE = 20;

function renderPagination(total) {
  const totalPages = Math.ceil(total / PER_PAGE);
  const info = document.querySelector('.page-info');
  if (info) info.textContent = `${currentPage} / ${totalPages}`;
  document.querySelector('.prev-page').disabled = currentPage === 1;
  document.querySelector('.next-page').disabled = currentPage === totalPages;
}

function renderActors() {
  const container = document.querySelector('.actors-grid');
  container.innerHTML = '';
  const start = (currentPage - 1) * PER_PAGE;
  const pageActors = actors.slice(start, start + PER_PAGE);
  pageActors.forEach((actor) => {
    const card = document.createElement('article');
    card.className = 'card card--actor';
    card.innerHTML = `
      <img src="${actor.avatar}" alt="${actor.name}" loading="lazy">
      <h3 class="card-title">${actor.name}</h3>
      <p class="card-count">${formatNumber(actor.totalMovies)} phim</p>
    `;
    container.appendChild(card);
  });
  renderPagination(actors.length);
}

function changePage(delta) {
  const totalPages = Math.ceil(actors.length / PER_PAGE);
  currentPage = Math.min(Math.max(1, currentPage + delta), totalPages);
  renderActors();
}

document.addEventListener('DOMContentLoaded', async () => {
  actors = await getActors();
  renderActors();
  document.querySelector('.prev-page').addEventListener('click', () => changePage(-1));
  document.querySelector('.next-page').addEventListener('click', () => changePage(1));
  const loadMore = document.querySelector('.load-more');
  if (loadMore) {
    loadMore.addEventListener('click', () => changePage(1));
  }
});
