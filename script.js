// Global variables
let currentLanguage = "vi"
let isMobileMenuOpen = false

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Initialize application
function initializeApp() {
  setupEventListeners()
  setupIntersectionObserver()
  setupImageLazyLoading()
}

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  const searchInputs = document.querySelectorAll(".search-input")
  searchInputs.forEach((input) => {
    input.addEventListener("input", handleSearch)
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(this.value)
      }
    })
  })

  // Movie card hover effects
  const movieCards = document.querySelectorAll(".movie-card")
  movieCards.forEach((card) => {
    card.addEventListener("mouseenter", handleMovieCardHover)
    card.addEventListener("mouseleave", handleMovieCardLeave)
  })

  // Play button clicks
  const playButtons = document.querySelectorAll(".play-btn")
  playButtons.forEach((button) => {
    button.addEventListener("click", handlePlayClick)
  })

  // Genre card clicks
  const genreCards = document.querySelectorAll(".genre-card")
  genreCards.forEach((card) => {
    card.addEventListener("click", handleGenreClick)
  })

  // Actor/Studio card clicks
  const actorCards = document.querySelectorAll(".actor-card, .studio-card")
  actorCards.forEach((card) => {
    card.addEventListener("click", handleProfileClick)
  })

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", handleSmoothScroll)
  })
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  const hamburgerLines = document.querySelectorAll(".hamburger")

  isMobileMenuOpen = !isMobileMenuOpen

  if (isMobileMenuOpen) {
    mobileMenu.classList.add("active")
    hamburgerLines[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    hamburgerLines[1].style.opacity = "0"
    hamburgerLines[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
    document.body.style.overflow = "hidden"
  } else {
    mobileMenu.classList.remove("active")
    hamburgerLines.forEach((line) => {
      line.style.transform = ""
      line.style.opacity = ""
    })
    document.body.style.overflow = ""
  }
}

// Language toggle
function toggleLanguage() {
  const languageTexts = document.querySelectorAll("#language-text")

  if (currentLanguage === "vi") {
    currentLanguage = "en"
    languageTexts.forEach((text) => (text.textContent = "EN"))
    updateLanguage("en")
  } else {
    currentLanguage = "vi"
    languageTexts.forEach((text) => (text.textContent = "VI"))
    updateLanguage("vi")
  }
}

// Update language content
function updateLanguage(lang) {
  const translations = {
    vi: {
      "search-placeholder": "Tìm kiếm phim...",
      "watch-now": "Xem Ngay",
      "more-info": "Thông Tin",
      "featured-movies": "Phim Nổi Bật",
      trending: "Xu Hướng",
      genres: "Thể Loại",
      "new-movies": "Phim Mới",
      rankings: "Bảng Xếp Hạng",
      actors: "Diễn Viên",
      studios: "Hãng Sản Xuất",
    },
    en: {
      "search-placeholder": "Search movies...",
      "watch-now": "Watch Now",
      "more-info": "More Info",
      "featured-movies": "Featured Movies",
      trending: "Trending",
      genres: "Genres",
      "new-movies": "New Movies",
      rankings: "Rankings",
      actors: "Actors",
      studios: "Studios",
    },
  }

  // Update search placeholders
  const searchInputs = document.querySelectorAll(".search-input")
  searchInputs.forEach((input) => {
    input.placeholder = translations[lang]["search-placeholder"]
  })

  // Update button texts
  const watchButtons = document.querySelectorAll(".btn-primary")
  watchButtons.forEach((button) => {
    if (button.textContent.includes("Xem") || button.textContent.includes("Watch")) {
      button.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21"></polygon>
                </svg>
                ${translations[lang]["watch-now"]}
            `
    }
  })

  // Update section titles
  const sectionTitles = document.querySelectorAll(".section-title")
  sectionTitles.forEach((title) => {
    const text = title.textContent.trim()
    if (text === "Phim Nổi Bật" || text === "Featured Movies") {
      title.textContent = translations[lang]["featured-movies"]
    } else if (text === "Xu Hướng" || text === "Trending") {
      title.textContent = translations[lang]["trending"]
    } else if (text === "Thể Loại" || text === "Genres") {
      title.textContent = translations[lang]["genres"]
    }
  })
}

// Search functionality
function handleSearch(e) {
  const query = e.target.value.toLowerCase()
  if (query.length > 2) {
    // Debounce search
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      performSearch(query)
    }, 300)
  }
}

function performSearch(query) {
  console.log("Searching for:", query)
  // Implement search logic here
  // This would typically make an API call to search for movies

  // For demo purposes, show a simple alert
  if (query.trim()) {
    // In a real app, this would redirect to search results page
    // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  }
}

// Movie card interactions
function handleMovieCardHover(e) {
  const card = e.currentTarget
  const overlay = card.querySelector(".movie-overlay")
  if (overlay) {
    overlay.style.opacity = "1"
  }
}

function handleMovieCardLeave(e) {
  const card = e.currentTarget
  const overlay = card.querySelector(".movie-overlay")
  if (overlay) {
    overlay.style.opacity = "0"
  }
}

function handlePlayClick(e) {
  e.preventDefault()
  e.stopPropagation()

  const movieCard = e.target.closest(".movie-card")
  const movieTitle = movieCard?.querySelector(".movie-title")?.textContent

  console.log("Playing movie:", movieTitle)

  // Show loading state
  const button = e.currentTarget
  const originalContent = button.innerHTML
  button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        Loading...
    `

  // Simulate loading
  setTimeout(() => {
    button.innerHTML = originalContent
    // In a real app, this would open the video player
    alert(`Now playing: ${movieTitle}`)
  }, 1500)
}

function handleGenreClick(e) {
  e.preventDefault()
  const genreName = e.currentTarget.querySelector("h3").textContent
  console.log("Selected genre:", genreName)

  // Add click animation
  e.currentTarget.style.transform = "scale(0.95)"
  setTimeout(() => {
    e.currentTarget.style.transform = ""
  }, 150)

  // In a real app, this would navigate to genre page
  // window.location.href = `genres.html?genre=${encodeURIComponent(genreName)}`;
}

function handleProfileClick(e) {
  const card = e.currentTarget
  const name = card.querySelector(".actor-name, .studio-name")?.textContent
  console.log("Viewing profile:", name)

  // Add click animation
  card.style.transform = "scale(0.98)"
  setTimeout(() => {
    card.style.transform = ""
  }, 150)

  // In a real app, this would open detailed profile
  // window.location.href = `profile.html?name=${encodeURIComponent(name)}`;
}

function handleSmoothScroll(e) {
  e.preventDefault()
  const targetId = e.currentTarget.getAttribute("href")
  const targetElement = document.querySelector(targetId)

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Intersection Observer for animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".movie-card, .genre-card, .actor-card, .studio-card")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Lazy loading for images
function setupImageLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]')

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Performance monitoring
function measurePerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log("Page load time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
    })
  }
}

// Initialize performance monitoring
measurePerformance()

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  // In production, you might want to send this to an error tracking service
})

// Handle offline/online status
window.addEventListener("online", () => {
  console.log("Connection restored")
  // Show notification or refresh content
})

window.addEventListener("offline", () => {
  console.log("Connection lost")
  // Show offline notification
})
