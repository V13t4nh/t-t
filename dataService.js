let dataCache = null;

async function loadData() {
  if (!dataCache) {
    const res = await fetch('database.json');
    dataCache = await res.json();
  }
  return dataCache;
}

export async function getActors() {
  const data = await loadData();
  return data.actors || [];
}

export async function getStudios() {
  const data = await loadData();
  return data.studios || [];
}
