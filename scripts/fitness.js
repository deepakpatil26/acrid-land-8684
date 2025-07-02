// Enhanced Fitness Page JavaScript
import { navbar, getLocation } from "./navbar.js";
import { footer } from "./footer.js";

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
});

function initializePage() {
  // Setup navbar and footer
  document.getElementById("navbar").innerHTML = navbar();
  document.getElementById("footer").innerHTML = footer();
  
  // Initialize all features
  initializeLoadingScreen();
  initializeCounters();
  initializeTabFunctionality();
  initializeScrollEffects();
  initializeModal();
  initializeGymLocator();
  initializeCountdownTimer();
  initializePlanSelection();
  initializeStoryCards();
  
  // Get location
  window.onload = getLocation();
}

// Loading Screen
function initializeLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
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
  
  // Trigger animation when stats are visible
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

// Tab Functionality
function initializeTabFunctionality() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.category-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetCategory = button.getAttribute('data-category');
      
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      button.classList.add('active');
      const targetPane = document.getElementById(targetCategory);
      if (targetPane) {
        targetPane.classList.add('active');
      }
      
      // Add animation effect
      button.style.transform = 'scale(1.05)';
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
      
      // Show notification
      showNotification(`Switched to ${targetCategory} workouts`, 'info');
    });
  });
}

// Scroll Effects
function initializeScrollEffects() {
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    // Back to top button visibility
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
    
    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.pageYOffset > 100) {
        navbar.style.background = 'rgba(21, 23, 28, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'blur(10px)';
      }
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
}

// Modal Functionality
function initializeModal() {
  const modal = document.getElementById('workout-modal');
  const closeBtn = document.querySelector('.modal-close');
  
  // Close modal when clicking close button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Global function to open modal
  window.openWorkoutModal = function() {
    modal.style.display = 'block';
    showNotification('Loading workout preview...', 'info');
  };
}

// Gym Locator
function initializeGymLocator() {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      showNotification('Geolocation is not supported by this browser.', 'error');
    }
  }
  
  function success(pos) {
    const crd = pos.coords;
    loadMap(crd.latitude, crd.longitude);
  }
  
  function error() {
    showNotification('Unable to retrieve your location', 'error');
    // Load default map (Mumbai coordinates)
    loadMap(19.0760, 72.8777);
  }
  
  function loadMap(lat, long) {
    const mapUrl = `https://maps.google.com/maps?q=${lat},${long}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    const mapFrame = document.getElementById('gym-map');
    const mapOverlay = document.querySelector('.map-overlay');
    
    if (mapFrame) {
      mapFrame.src = mapUrl;
      
      // Hide overlay after map loads
      setTimeout(() => {
        if (mapOverlay) {
          mapOverlay.style.opacity = '0';
          setTimeout(() => {
            mapOverlay.style.display = 'none';
          }, 500);
        }
      }, 2000);
    }
  }
  
  // Initialize location
  getLocation();
}

// Countdown Timer
function initializeCountdownTimer() {
  // Set countdown date (24 hours from now)
  const countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
  
  const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (hoursElement) hoursElement.innerHTML = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.innerHTML = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.innerHTML = seconds.toString().padStart(2, '0');
    
    // If countdown finished
    if (distance < 0) {
      clearInterval(timer);
      if (hoursElement) hoursElement.innerHTML = "00";
      if (minutesElement) minutesElement.innerHTML = "00";
      if (secondsElement) secondsElement.innerHTML = "00";
    }
  }, 1000);
}

// Plan Selection
function initializePlanSelection() {
  const planCards = document.querySelectorAll('.plan-card');
  const planButtons = document.querySelectorAll('.plan-cta');
  
  planButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      const planCard = this.closest('.plan-card');
      const planType = planCard.querySelector('.plan-header h2').textContent;
      const planPrice = planCard.querySelector('.amount').textContent;
      
      // Add selection animation
      planCard.style.transform = 'scale(1.05)';
      setTimeout(() => {
        planCard.style.transform = '';
      }, 300);
      
      // Show success message
      showNotification(`${planType} plan selected! Price: ₹${planPrice}/month`, 'success');
      
      // Store selection in localStorage
      localStorage.setItem('selectedPlan', JSON.stringify({
        type: planType,
        price: planPrice
      }));
      
      // Simulate redirect after 2 seconds
      setTimeout(() => {
        showNotification('Redirecting to checkout...', 'info');
        // window.location.href = '../html/payments.html';
      }, 2000);
    });
  });
  
  // Sale CTA
  const saleCta = document.querySelector('.sale-cta');
  if (saleCta) {
    saleCta.addEventListener('click', function() {
      showNotification('Flash sale offer claimed! Redirecting to Elite plan...', 'success');
      setTimeout(() => {
        document.getElementById('membership-plans').scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 1500);
    });
  }
}

// Story Cards
function initializeStoryCards() {
  const storyPlayButtons = document.querySelectorAll('.story-play-btn');
  
  storyPlayButtons.forEach(button => {
    button.addEventListener('click', function() {
      const storyCard = this.closest('.story-card');
      const storyTitle = storyCard.querySelector('h3').textContent;
      
      // Add play animation
      this.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 300);
      
      showNotification(`Playing: ${storyTitle}`, 'info');
      
      // You could open a video modal here
      setTimeout(() => {
        window.openWorkoutModal();
      }, 1000);
    });
  });
}

// Workout Play Buttons
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('play-btn') || e.target.closest('.play-btn')) {
    const workoutCard = e.target.closest('.workout-card');
    const workoutTitle = workoutCard.querySelector('h3').textContent;
    
    showNotification(`Starting ${workoutTitle} workout...`, 'info');
    
    // Add animation
    const playBtn = e.target.classList.contains('play-btn') ? e.target : e.target.closest('.play-btn');
    playBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
      playBtn.style.transform = 'scale(1)';
    }, 300);
    
    // Open workout modal
    setTimeout(() => {
      window.openWorkoutModal();
    }, 1000);
  }
});

// Global Functions
window.scrollToPlans = function() {
  document.getElementById('membership-plans').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
};

window.joinCommunity = function() {
  showNotification('Redirecting to Facebook community...', 'info');
  setTimeout(() => {
    window.open('https://www.facebook.com/cultfitofficial', '_blank');
  }, 1500);
};

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
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
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

// Enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to cards
  const cards = document.querySelectorAll('.plan-card, .workout-card, .story-card, .info-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add parallax effect to hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.getElementById('hero-image');
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
});

// Export functions for global access
export { showNotification };