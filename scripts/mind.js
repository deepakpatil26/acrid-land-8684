// Import necessary modules
import { navbar, getLocation } from './navbar.js';

// DOM Elements
const navbar1 = document.getElementById('navbar1');
const faqButtons = document.querySelectorAll('.faq-btn');

// Initialize the page
function init() {
  // Initialize navbar
  if (navbar1) {
    navbar1.innerHTML = navbar();
    getLocation();
  }

  // Initialize FAQ accordion
  initFAQAccordion();

  // Add any other initialization code here
  document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    lazyLoadImages();
  });
}

// Initialize FAQ Accordion
function initFAQAccordion() {
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Close all other open accordion items
      document.querySelectorAll('.faq-btn').forEach(btn => {
        if (btn !== button) {
          btn.setAttribute('aria-expanded', 'false');
          btn.nextElementSibling.style.maxHeight = '0';
          btn.querySelector('.fa-chevron-down').classList.remove('rotate-180');
        }
      });

      // Toggle current item
      button.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
        button.querySelector('.fa-chevron-down').classList.add('rotate-180');
      } else {
        content.style.maxHeight = '0';
        button.querySelector('.fa-chevron-down').classList.remove('rotate-180');
      }
    });
  });
}

// Lazy load images
function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// Handle consultation type selection
function setupConsultationSelection() {
  const consultationTypes = document.querySelectorAll('.consultation-card');

  consultationTypes.forEach(type => {
    type.addEventListener('click', () => {
      // Remove active class from all types
      consultationTypes.forEach(t => t.classList.remove('active'));
      // Add active class to selected type
      type.classList.add('active');
    });
  });
}

// Initialize the page
init();

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    initFAQAccordion,
    lazyLoadImages,
    setupConsultationSelection
  };
}
