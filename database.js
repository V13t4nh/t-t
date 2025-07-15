// Database Management
class MovieDatabase {
    constructor() {
        this.data = null;
        this.loaded = false;
    }

    async loadDatabase() {
        try {
            const response = await fetch('database.json');
            this.data = await response.json();
            this.loaded = true;
            return this.data;
        } catch (error) {
            return null;
        }
    }

    // Movie methods
    getMovies() {
        return this.data?.movies || [];
    }

    getFeaturedMovies() {
        return this.data?.movies?.filter(movie => movie.featured) || [];
    }

    getMovieById(id) {
        return this.data?.movies?.find(movie => movie.id === id);
    }

    searchMovies(query) {
        if (!query) return [];
        const movies = this.getMovies();
        return movies.filter(movie => 
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.originalTitle.toLowerCase().includes(query.toLowerCase())
        );
    }

    getMoviesByGenre(genre) {
        return this.data?.movies?.filter(movie => 
            movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        ) || [];
    }

    // Actor methods
    getActors() {
        return this.data?.actors || [];
    }

    getActorById(id) {
        return this.data?.actors?.find(actor => actor.id === id);
    }

    searchActors(query) {
        if (!query) return [];
        const actors = this.getActors();
        return actors.filter(actor => 
            actor.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Studio methods
    getStudios() {
        return this.data?.studios || [];
    }

    getStudioById(id) {
        return this.data?.studios?.find(studio => studio.id === id);
    }

    searchStudios(query) {
        if (!query) return [];
        const studios = this.getStudios();
        return studios.filter(studio => 
            studio.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Genre methods
    getGenres() {
        return this.data?.genres || [];
    }

    getGenreById(id) {
        return this.data?.genres?.find(genre => genre.id === id);
    }

    // Ranking methods
    getRankings() {
        return this.data?.rankings || [];
    }

    // Search methods
    searchAll(query) {
        if (!query) return { movies: [], actors: [], studios: [] };
        
        return {
            movies: this.searchMovies(query),
            actors: this.searchActors(query),
            studios: this.searchStudios(query)
        };
    }

    // Utility methods
    getRandomMovies(count = 6) {
        const movies = this.getMovies();
        const shuffled = movies.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    getMoviesByYear(year) {
        return this.data?.movies?.filter(movie => movie.year === year) || [];
    }

    getMoviesByRating(minRating = 7.0) {
        return this.data?.movies?.filter(movie => movie.rating >= minRating) || [];
    }
}

// Global database instance
const db = new MovieDatabase();

// Initialize database when page loads
document.addEventListener('DOMContentLoaded', async () => {
    await db.loadDatabase();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize page-specific functionality
    initializePageSpecific();
});

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(async (e) => {
            const query = e.target.value.trim();
            if (query.length < 2) return;
            
            const results = db.searchAll(query);
            displaySearchResults(results, e.target);
        }, 300));
    });
}

function displaySearchResults(results, inputElement) {
    // Create or update search results dropdown
    let dropdown = document.querySelector('.search-results-dropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'search-results-dropdown';
        inputElement.parentNode.appendChild(dropdown);
    }
    
    if (results.movies.length === 0 && results.actors.length === 0 && results.studios.length === 0) {
        dropdown.style.display = 'none';
        return;
    }
    
    let html = '<div class="search-results">';
    
    // Movies
    if (results.movies.length > 0) {
        html += '<div class="search-section"><h4>Phim</h4>';
        results.movies.slice(0, 3).forEach(movie => {
            html += `<div class="search-item" onclick="goToMovie(${movie.id})">${movie.title} (${movie.year})</div>`;
        });
        html += '</div>';
    }
    
    // Actors
    if (results.actors.length > 0) {
        html += '<div class="search-section"><h4>Diễn viên</h4>';
        results.actors.slice(0, 3).forEach(actor => {
            html += `<div class="search-item" onclick="goToActor(${actor.id})">${actor.name}</div>`;
        });
        html += '</div>';
    }
    
    // Studios
    if (results.studios.length > 0) {
        html += '<div class="search-section"><h4>Hãng phim</h4>';
        results.studios.slice(0, 3).forEach(studio => {
            html += `<div class="search-item" onclick="goToStudio(${studio.id})">${studio.name}</div>`;
        });
        html += '</div>';
    }
    
    html += '</div>';
    dropdown.innerHTML = html;
    dropdown.style.display = 'block';
}

// Navigation functions
function goToMovie(movieId) {
    // In a real app, this would navigate to movie detail page
    alert(`Chuyển đến trang chi tiết phim ${movieId}`);
}

function goToActor(actorId) {
    // In a real app, this would navigate to actor detail page
    alert(`Chuyển đến trang chi tiết diễn viên ${actorId}`);
}

function goToStudio(studioId) {
    // In a real app, this would navigate to studio detail page
    alert(`Chuyển đến trang chi tiết hãng phim ${studioId}`);
}

// Page-specific initialization
function initializePageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
            loadFeaturedMovies();
            break;
        case 'new-movies.html':
            loadNewMovies();
            break;
        case 'rankings.html':
            loadRankings();
            break;
        case 'genres.html':
            loadGenres();
            break;
        case 'actors.html':
            loadActors();
            break;
        case 'studios.html':
            loadStudios();
            break;
    }
}

// Load featured movies for homepage
function loadFeaturedMovies() {
    const featuredMovies = db.getFeaturedMovies();
}

// Load new movies
function loadNewMovies() {
    const recentMovies = db.getMovies().filter(movie => movie.year >= 2022);
}

// Load rankings
function loadRankings() {
    const rankings = db.getRankings();
}

// Load genres
function loadGenres() {
    const genres = db.getGenres();
}

// Load actors
function loadActors() {
    const actors = db.getActors();
}

// Load studios
function loadStudios() {
    const studios = db.getStudios();
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for use in other scripts
window.MovieDatabase = MovieDatabase;
window.db = db; 