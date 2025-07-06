// Import necessary components
import { display, paragraph } from "./pamplets_care.js";
import { footer } from "./footer.js";

// Location functionality
let currentLocation = 'Detecting...';

// Initialize footer immediately when script loads
const footerContainer = document.getElementById('footer');
if (footerContainer && typeof footer === 'function') {
  footerContainer.innerHTML = footer();
}

// Function to get user's current location
function getCurrentLocation() {
  const locationElement = document.getElementById('care-location');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Use reverse geocoding to get city name
        const { latitude, longitude } = position.coords;
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
          .then(response => response.json())
          .then(data => {
            currentLocation = data.city || data.locality || 'Your Location';
            if (locationElement) {
              locationElement.textContent = currentLocation;
              // Store in localStorage for future use
              localStorage.setItem('userLocation', currentLocation);
            }
          })
          .catch(error => {
            console.error('Error getting location:', error);
            setDefaultLocation(locationElement);
          });
      },
      (error) => {
        console.error('Geolocation error:', error);
        setDefaultLocation(locationElement);
      }
    );
  } else {
    setDefaultLocation(locationElement);
  }
}

function setDefaultLocation(locationElement) {
  const savedLocation = localStorage.getItem('userLocation');
  currentLocation = savedLocation || 'Bangalore';
  if (locationElement) {
    locationElement.textContent = currentLocation;
  }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Navbar scroll effect
  const navbar = document.getElementById('care-navbar');
  let lastScroll = 0;

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        return;
      }

      if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      }

      lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    navbar.prepend(mobileMenuBtn);

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';

    const navPages = document.getElementById('care-pages').cloneNode(true);
    const navFunctions = document.getElementById('care-functions').cloneNode(true);

    mobileMenu.appendChild(navPages);
    mobileMenu.appendChild(navFunctions);
    document.body.appendChild(mobileMenu);

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  }

  // Active nav link highlighting
  const navLinks = document.querySelectorAll('.care-nav-link');
  const sections = document.querySelectorAll('section');

  function setActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 100 < sections[index].offsetTop) { }

    navLinks.forEach(link => link.classList.remove('active'));
    if (navLinks[index]) navLinks[index].classList.add('active');
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // Initialize FAQ functionality
  initFAQ();

  // Initialize existing functionality
  initExistingFeatures();
});

// Initialize existing features from the original file
function initExistingFeatures() {
  // Slideshow functionality
  let arr = [
    "https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_1440,ar_2880:595/dpr_2/image/vm/5202889c-e166-40eb-8a1e-e3cf3aa57632.png",
    "https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_1440,ar_2880:595/dpr_2/image/vm/dc6538da-9ee5-4326-ad26-f3cee3a6322e.png",
  ];

  let i = 0;
  const movingImage = document.getElementById("moveing");

  if (movingImage) {
    setInterval(() => {
      if (i >= arr.length) {
        i = 0;
      }
      movingImage.src = arr[i];
      i++;
    }, 2000);
  }

  // Fetch care data
  fetch("http://127.0.0.1:3000/api/careData")
    .then((res) => res.json())
    .then((res) => {
      console.log("Care data loaded:", res);
      if (typeof display === 'function') {
        display(res, "cards");
      }
    })
    .catch(error => console.error("Error fetching care data:", error));

  // Set paragraph content if paragraph function exists
  const paraElement = document.getElementById("para");
  if (paraElement && typeof paragraph === 'function') {
    paraElement.innerHTML = paragraph();
  }

  // Set footer content if footer function exists
  const footerElement = document.getElementById("footer");
  if (footerElement && typeof footer === 'function') {
    footerElement.innerHTML = footer();
  }

  // Initialize location
  const locationElement = document.getElementById('care-location');
  if (locationElement) {
    // First try to get saved location
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      locationElement.textContent = savedLocation;
      currentLocation = savedLocation;
    } else {
      // If no saved location, try to detect it
      locationElement.textContent = 'Detecting...';
      getCurrentLocation();
    }

    // Add click handler for location change
    const locationContainer = document.querySelector('.care-location-container');
    if (locationContainer) {
      locationContainer.addEventListener('click', (e) => {
        e.preventDefault();
        const newLocation = prompt('Enter your location:', currentLocation);
        if (newLocation && newLocation.trim() !== '') {
          currentLocation = newLocation.trim();
          locationElement.textContent = currentLocation;
          localStorage.setItem('userLocation', currentLocation);
        }
      });
    }
  }
}

// Enhanced FAQ functionality
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-question');

  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    const answerId = toggle?.id;

    if (answerId) {
      const answer = document.getElementById(`ans${answerId}`);

      if (answer) {
        // Make the question clickable
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => toggleAnswer(toggle, answer));

        // Add click handler to the toggle button
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleAnswer(toggle, answer);
        });

        // Add animation classes
        answer.style.transition = 'all 0.3s ease-in-out';
      }
    }
  });

  // Keep the global fun function for backward compatibility
  window.fun = function (id) {
    const answer = document.getElementById(`ans${id}`);
    const toggle = document.getElementById(id);

    if (answer && toggle) {
      toggleAnswer(toggle, answer);
    }
  };
}

// Toggle FAQ answer visibility
function toggleAnswer(toggle, answer) {
  const isHidden = answer.style.display === 'none' || !answer.style.display;

  // Toggle answer visibility with animation
  if (isHidden) {
    answer.style.display = 'block';
    answer.style.maxHeight = answer.scrollHeight + 'px';
  } else {
    answer.style.maxHeight = '0';
    setTimeout(() => {
      answer.style.display = 'none';
    }, 300);
  }

  // Toggle icon rotation
  const icon = toggle.querySelector('i');
  if (icon) {
    icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0)';
  }

  // Add/remove active class to parent for styling
  const question = toggle.closest('.faq-question');
  if (question) {
    question.classList.toggle('active', isHidden);
  }
}
