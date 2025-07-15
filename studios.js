import { getStudios } from './dataService.js';

let studios = [];
let loaded = 0;
const BATCH = 4;

function renderStudios() {
  const container = document.querySelector('.studios-grid');
  const slice = studios.slice(0, loaded);
  container.innerHTML = '';
  slice.forEach((studio) => {
    const card = document.createElement('article');
    card.className = 'card card--studio';
    card.innerHTML = `
      <img src="${studio.logo}" alt="${studio.name}" loading="lazy">
      <h3 class="card-title">${studio.name}</h3>
    `;
    container.appendChild(card);
  });
  if (loaded >= studios.length) {
    document.querySelector('.load-more').style.display = 'none';
  }
}

function loadMore() {
  loaded = Math.min(loaded + BATCH, studios.length);
  renderStudios();
}

document.addEventListener('DOMContentLoaded', async () => {
  studios = await getStudios();
  loadMore();
  document.querySelector('.load-more').addEventListener('click', loadMore);
});
