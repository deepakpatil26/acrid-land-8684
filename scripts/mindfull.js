/**
 * Mindfull.js - Main JavaScript for Mind Page
 * Handles UI interactions and content rendering for the Mind section
 */

// Constants
const MEDITATION_PROGRAMS = {
  featured: [
    {
      id: 'covid-recovery',
      img: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_212,ar_0.82,c_fill/dpr_2/image/diy/00a5f2c0-5e37-45fb-b869-f880d17d5763',
      name: 'Covid Recovery',
      description: 'Gentle stretches and meditation to help recover from physical and mental stress caused by COVID-19.',
      duration: '30 min',
      level: 'All Levels'
    },
    {
      id: 'running-programs',
      img: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_212,ar_0.82,c_fill/dpr_2/image/diy/8e929664-cd36-4b5d-8c6c-ca135c678a84',
      name: 'Running Programs',
      description: 'Enhance your running performance with guided running programs.',
      duration: '20-45 min',
      level: 'Beginner to Advanced'
    },
    {
      id: 'quick-meditation',
      img: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_212,ar_0.82,c_fill/dpr_2/image/diy/f5e214b7-243b-4fec-b821-8e6400d49213',
      name: '5 Min Meditation',
      description: 'Quick meditation sessions to reduce stress and anxiety.',
      duration: '5 min',
      level: 'All Levels'
    }
  ],
  sleep: [
    {
      id: 'sleep-stories',
      img: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_212,ar_0.82,c_fill/dpr_2/image/diy/936125f4-ffc8-4e52-943b-efe9d068b758',
      name: 'Sleep Stories',
      description: 'Relaxing stories to help you fall into a peaceful sleep.',
      duration: '15-30 min',
      level: 'All Ages'
    },
    {
      id: 'yoga-nidra',
      img: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_212,ar_0.82,c_fill/dpr_2/image/diy/94cf3985-f59e-48b3-88b3-fb1fef54d39a',
      name: '30 Minutes Yoga Nidra',
      description: 'Deep relaxation practice for complete mind-body restoration.',
      duration: '30 min',
      level: 'All Levels'
    }
  ],
  focus: [
    {
      id: 'focus-meditation',
      img: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_212,ar_0.82,c_fill/dpr_2/image/diy/c86a5d9a-e631-4f51-83eb-5231a27335ac.jpg',
      name: 'Focus Meditation',
      description: 'Improve concentration and attention span with guided focus techniques.',
      duration: '10-20 min',
      level: 'All Levels'
    },
    {
      id: 'stress-relief',
      img: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_212,ar_0.82,c_fill/dpr_2/image/diy/8acb1c22-4cde-45ae-b2f9-14042fdd408c.jpg',
      name: 'Beat the Stress Program',
      description: 'Techniques to manage and reduce stress in daily life.',
      duration: '15-30 min',
      level: 'All Levels'
    }
  ]
};

// DOM Elements
const dom = {
  navbarToggle: null,
  dropdownMenu: null,
  dropdownArrow: null,
  meditationContainer: null,
  loadingIndicator: null,
};

// State
const state = {
  isMenuOpen: false,
  isLoading: false,
  activeTab: 'featured',
  favorites: new Set()
};

/**
 * Initialize the application
 */
function init() {
  try {
    // Cache DOM elements
    cacheDomElements();

    // Set up event listeners
    setupEventListeners();

    // Load initial content
    loadInitialContent();

    console.log('Mind page initialized successfully');
  } catch (error) {
    console.error('Error initializing mind page:', error);
    showError('Failed to initialize page. Please refresh to try again.');
  }
}

/**
 * Cache frequently used DOM elements
 */
function cacheDomElements() {
  dom.navbarToggle = document.getElementById('spet');
  dom.dropdownMenu = document.getElementById('headDropDown');
  dom.dropdownArrow = document.getElementById('dropdown-arrow');
  dom.meditationContainer = document.querySelector('.meditation-programs');
  dom.loadingIndicator = document.getElementById('loading-indicator');
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // Navbar toggle
  if (dom.navbarToggle) {
    dom.navbarToggle.addEventListener('click', toggleNavbar);
  }

  // Tab navigation
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });

  // Favorite button
  document.addEventListener('click', (e) => {
    if (e.target.closest('.favorite-btn')) {
      const programId = e.target.closest('.favorite-btn').dataset.id;
      toggleFavorite(programId);
    }
  });
}

/**
 * Toggle navbar dropdown
 */
function toggleNavbar() {
  try {
    state.isMenuOpen = !state.isMenuOpen;

    if (dom.dropdownMenu) {
      dom.dropdownMenu.style.display = state.isMenuOpen ? 'flex' : 'none';
    }

    if (dom.dropdownArrow) {
      dom.dropdownArrow.style.transform = state.isMenuOpen
        ? 'rotate(180deg)'
        : 'rotate(0deg)';
    }
  } catch (error) {
    console.error('Error toggling navbar:', error);
  }
}

/**
 * Handle tab click events
 * @param {Event} event - The click event
 */
function handleTabClick(event) {
  try {
    const tabId = event.currentTarget.dataset.tab;
    if (!tabId) return;

    // Update active tab
    state.activeTab = tabId;

    // Update UI
    updateActiveTabIndicator(tabId);
    renderPrograms(tabId);
  } catch (error) {
    console.error('Error handling tab click:', error);
  }
}

/**
 * Update active tab indicator
 * @param {string} tabId - ID of the active tab
 */
function updateActiveTabIndicator(tabId) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    if (tab.dataset.tab === tabId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

/**
 * Render programs for the active tab
 * @param {string} category - Program category to render
 */
function renderPrograms(category) {
  if (!dom.meditationContainer) return;

  const programs = MEDITATION_PROGRAMS[category] || [];

  if (programs.length === 0) {
    dom.meditationContainer.innerHTML = '<p class="no-programs">No programs found in this category.</p>';
    return;
  }

  const html = programs.map(program => createProgramCard(program)).join('');
  dom.meditationContainer.innerHTML = html;

  // Add lazy loading to images
  const lazyImages = document.querySelectorAll('.program-card img[data-src]');
  lazyLoadImages(lazyImages);
}

/**
 * Create HTML for a program card
 * @param {Object} program - Program data
 * @returns {string} HTML string for the program card
 */
function createProgramCard(program) {
  const isFavorite = state.favorites.has(program.id);

  return `
    <div class="program-card" data-id="${program.id}">
      <div class="program-image">
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" 
          data-src="${program.img}" 
          alt="${program.name}" 
          loading="lazy"
        >
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                data-id="${program.id}" 
                aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
          <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <span class="duration">${program.duration}</span>
      </div>
      <div class="program-details">
        <h3>${program.name}</h3>
        <p>${program.description}</p>
        <div class="program-meta">
          <span class="level">${program.level}</span>
          <button class="btn-start" data-id="${program.id}">Start</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Toggle favorite status of a program
 * @param {string} programId - ID of the program
 */
function toggleFavorite(programId) {
  try {
    if (state.favorites.has(programId)) {
      state.favorites.delete(programId);
    } else {
      state.favorites.add(programId);
    }

    // Update UI
    const favoriteBtn = document.querySelector(`.favorite-btn[data-id="${programId}"]`);
    if (favoriteBtn) {
      const icon = favoriteBtn.querySelector('i');
      favoriteBtn.classList.toggle('active');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');

      // Update aria-label
      const isFavorite = favoriteBtn.classList.contains('active');
      favoriteBtn.setAttribute('aria-label', isFavorite ? 'Remove from favorites' : 'Add to favorites');
    }

    // In a real app, you would save to localStorage or API here
    // saveFavoritesToStorage();
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
}

/**
 * Lazy load images
 * @param {NodeList} images - List of image elements to lazy load
 */
function lazyLoadImages(images) {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support IntersectionObserver
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Show loading state
 * @param {boolean} show - Whether to show loading state
 */
function setLoading(show) {
  state.isLoading = show;
  if (dom.loadingIndicator) {
    dom.loadingIndicator.style.display = show ? 'block' : 'none';
  }
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  // In a real app, you would show this in the UI
  console.error(message);

  const errorContainer = document.getElementById('error-container');
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';

    // Hide after 5 seconds
    setTimeout(() => {
      errorContainer.style.display = 'none';
    }, 5000);
  }
}

/**
 * Load initial content
 */
function loadInitialContent() {
  // Show loading state
  setLoading(true);

  try {
    // In a real app, you might fetch this from an API
    setTimeout(() => {
      renderPrograms(state.activeTab);
      setLoading(false);
    }, 500);
  } catch (error) {
    console.error('Error loading content:', error);
    showError('Failed to load content. Please try again later.');
    setLoading(false);
  }
}

// Initialize the app when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for testing or other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    toggleNavbar,
    toggleFavorite,
    renderPrograms,
    MEDITATION_PROGRAMS
  };
}
