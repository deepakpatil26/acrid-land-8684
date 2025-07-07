// Enhanced Mind Page JavaScript with comprehensive functionality
import { navbar, getLocation } from './navbar.js';
import { footer } from './footer.js';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
});

function initializePage() {
  // Setup navbar and footer
  setupNavbarAndFooter();
  
  // Initialize all features
  initializeLoadingScreen();
  initializeCounters();
  initializeFAQAccordion();
  initializeTestimonialSlider();
  initializeScrollEffects();
  initializeConsultationCards();
  initializeExpertCards();
  initializeFormValidation();
  
  // Get location
  getLocation();
}

// Setup navbar and footer
function setupNavbarAndFooter() {
  const navbarElement = document.getElementById('navbar');
  const footerElement = document.getElementById('footer');
  
  if (navbarElement) {
    navbarElement.innerHTML = navbar();
  }
  
  if (footerElement && typeof footer === 'function') {
    footerElement.innerHTML = footer();
  }
}

// Loading Screen
function initializeLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  
  // Remove preload class after a short delay
  setTimeout(() => {
    document.body.classList.remove('preload');
  }, 100);
  
  // Hide loading screen after animation
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }, 3000);
}

// Counter Animations
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const count = parseInt(counter.innerText);
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target.toLocaleString();
      }
    });
  };
  
  // Trigger animation when hero section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });
  
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    observer.observe(heroStats);
  }
}

// FAQ Accordion
function initializeFAQAccordion() {
  const faqButtons = document.querySelectorAll('.faq-btn');
  
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      // Close all other open accordion items
      faqButtons.forEach(btn => {
        if (btn !== button) {
          btn.setAttribute('aria-expanded', 'false');
          const otherContent = btn.nextElementSibling;
          if (otherContent) {
            otherContent.style.maxHeight = '0';
          }
        }
      });
      
      // Toggle current item
      button.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
      
      // Add visual feedback
      button.style.transform = 'scale(0.98)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    });
  });
}

// Testimonial Slider
function initializeTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.testimonial-btn.prev');
  const nextBtn = document.querySelector('.testimonial-btn.next');
  let currentSlide = 0;
  
  function showSlide(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current testimonial and activate corresponding dot
    if (testimonials[index]) {
      testimonials[index].classList.add('active');
    }
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    showSlide(currentSlide);
  }
  
  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // Auto-play slider
  setInterval(nextSlide, 5000);
  
  // Initialize first slide
  showSlide(0);
}

// Scroll Effects
function initializeScrollEffects() {
  const backToTopButton = document.getElementById('backToTop');
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    // Back to top button visibility
    if (scrollTop > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
    
    // Navbar background on scroll
    if (navbar) {
      if (scrollTop > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
      }
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && scrollTop < window.innerHeight) {
      const parallaxSpeed = scrollTop * 0.5;
      heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
    }
  });
  
  // Back to top functionality
  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Consultation Cards
function initializeConsultationCards() {
  const consultationCards = document.querySelectorAll('.consultation-card');
  
  consultationCards.forEach(card => {
    card.addEventListener('click', function() {
      const consultationType = this.getAttribute('data-consultation-type');
      const cardTitle = this.querySelector('h3').textContent;
      const price = this.querySelector('.price').textContent;
      
      // Add selection animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Show notification
      showNotification(`${cardTitle} selected! Price: ${price}`, 'success');
      
      // Store selection
      localStorage.setItem('selectedConsultation', JSON.stringify({
        type: consultationType,
        title: cardTitle,
        price: price
      }));
      
      // Simulate booking process
      setTimeout(() => {
        showNotification('Redirecting to booking form...', 'info');
        // Here you would redirect to booking page
        // window.location.href = './mind_consultation.html';
      }, 2000);
    });
    
    // Hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Expert Cards
function initializeExpertCards() {
  const expertCards = document.querySelectorAll('.expert-card');
  
  expertCards.forEach(card => {
    const bookButton = card.querySelector('.btn');
    
    if (bookButton) {
      bookButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const expertName = card.querySelector('h3').textContent;
        const specialty = card.querySelector('.expert-specialty').textContent;
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
        
        // Show notification
        showNotification(`Booking session with ${expertName} (${specialty})`, 'success');
        
        // Store expert selection
        localStorage.setItem('selectedExpert', JSON.stringify({
          name: expertName,
          specialty: specialty
        }));
        
        // Simulate booking process
        setTimeout(() => {
          showNotification('Redirecting to consultation booking...', 'info');
          // Here you would redirect to booking page
          // window.location.href = './mind_consultation.html';
        }, 2000);
      });
    }
  });
}

// Form Validation (for future contact forms)
function initializeFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          showNotification(`Please fill in the ${field.name} field`, 'error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (isValid) {
        showNotification('Form submitted successfully!', 'success');
        this.reset();
      }
    });
  });
}

// Intersection Observer for animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.service-card, .expert-card, .consultation-card');
  animateElements.forEach(el => observer.observe(el));
}

// Utility Functions
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#00b5b7'};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
    font-family: inherit;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    removeNotification(notification);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}

function removeNotification(notification) {
  notification.style.transform = 'translateX(100%)';
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Lazy load images
function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  }
}

// Initialize animations after DOM load
document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
  lazyLoadImages();
});

// Global functions for external access
window.mindPageFunctions = {
  showNotification,
  initializePage
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializePage,
    initializeFAQAccordion,
    initializeTestimonialSlider,
    showNotification
  };
}