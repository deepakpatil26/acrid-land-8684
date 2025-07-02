// Enhanced script.js with improved functionality
import { navbar, getLocation } from "./navbar.js";
import { footer } from "./footer.js";

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
});

function initializePage() {
  // Setup footer
  document.getElementById("footer").innerHTML = footer();
  
  // Initialize loading screen
  initializeLoadingScreen();
  
  // Initialize interactive features
  initializeInteractiveFeatures();
  
  // Initialize cart functionality
  initializeCart();
  
  // Initialize scroll effects
  initializeScrollEffects();
  
  // Initialize counter animations
  initializeCounters();
  
  // Initialize tab functionality
  initializeTabs();
}

// Loading Screen
function initializeLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  
  // Simulate loading time
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 3000);
}

// Interactive Features
function initializeInteractiveFeatures() {
  // Smooth scroll for CTA buttons
  window.scrollToPlans = function() {
    document.getElementById('card_3').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
  
  // Video play functionality
  window.playVideo = function() {
    const video = document.getElementById('myVideo');
    if (video.paused) {
      video.play();
      video.muted = false;
    } else {
      video.pause();
      video.muted = true;
    }
  };
  
  // Newsletter subscription
  window.subscribeNewsletter = function() {
    const email = document.getElementById('newsletter-email').value;
    if (email && validateEmail(email)) {
      // Simulate subscription
      showNotification('Thank you for subscribing!', 'success');
      document.getElementById('newsletter-email').value = '';
    } else {
      showNotification('Please enter a valid email address', 'error');
    }
  };
  
  // Plan selection
  document.querySelectorAll('.plan-cta').forEach(button => {
    button.addEventListener('click', function() {
      const planCard = this.closest('.kEliteCard');
      const planType = planCard.querySelector('h1').textContent;
      showNotification(`${planType} plan selected! Redirecting to checkout...`, 'success');
      
      // Add selection animation
      planCard.style.transform = 'scale(1.05)';
      setTimeout(() => {
        planCard.style.transform = '';
      }, 300);
      
      // Simulate redirect after 2 seconds
      setTimeout(() => {
        window.location.href = './html/fitness.html';
      }, 2000);
    });
  });
  
  // Story card interactions
  document.querySelectorAll('.story-card .play-button').forEach(button => {
    button.addEventListener('click', function() {
      const storyCard = this.closest('.story-card');
      const storyTitle = storyCard.querySelector('h3').textContent;
      showNotification(`Playing: ${storyTitle}`, 'info');
      
      // Add play animation
      this.style.transform = 'translate(-50%, -50%) scale(1.2)';
      setTimeout(() => {
        this.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 300);
    });
  });
  
  // Learn more buttons
  document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', function() {
      const benefitCard = this.closest('.benefit-card');
      const benefitTitle = benefitCard.querySelector('h5').textContent;
      showNotification(`Learning more about: ${benefitTitle}`, 'info');
      
      // Simulate navigation
      setTimeout(() => {
        window.location.href = './html/fitness.html';
      }, 1500);
    });
  });
}

// Enhanced Cart Functionality
function initializeCart() {
  const menuToggle = document.querySelector("#toggle");
  const cartCount = document.querySelector("#cart-count");
  
  // Update cart count on page load
  updateCartCount();
  
  menuToggle.addEventListener("click", () => {
    console.log("Cart clicked");
    const div = document.getElementById("cart_space");
    div.style.visibility = "visible";

    const content = `
      <div class="cart-box">
        <button id="closedCart">╳</button>
        <div class="whole-cart-window hide">
          <h2>Your cart</h2>
          <div class="cart-wrapper" id="cartAdd"></div>
          <div class="subtotal">
            <strong>Total: ₹<span id="cart-total">0</span></strong>
          </div>
          <div class="checkout"><button id="kcheckoutBtn">BUY NOW</button></div>
        </div>
      </div>`;
    div.innerHTML = content;

    const wholeCartWindow = document.querySelector(".whole-cart-window");
    if (wholeCartWindow.classList.contains("hide"))
      wholeCartWindow.classList.remove("hide");

    const closedCart = document.querySelector("#closedCart");
    closedCart.addEventListener("click", () => {
      console.log("Closing cart");
      wholeCartWindow.classList.add("hide");
      div.style.visibility = "hidden";
      setTimeout(() => {
        div.innerHTML = "";
      }, 300);
    });

    displayCartItems();

    document.querySelector("#kcheckoutBtn").addEventListener("click", function () {
      const cartItems = JSON.parse(localStorage.getItem("cart_Item")) || [];
      if (cartItems.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
      }
      showNotification('Redirecting to checkout...', 'success');
      setTimeout(() => {
        window.location.href = "html/payments.html";
      }, 1500);
    });
  });
}

function displayCartItems() {
  let cart_page_details = JSON.parse(localStorage.getItem("cart_Item")) || [];
  let cartAdd = document.getElementById("cartAdd");
  let total = 0;

  if (cart_page_details.length === 0) {
    cartAdd.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Your cart is empty</p>';
    document.getElementById("cart-total").textContent = "0";
    return;
  }

  cartAdd.innerHTML = '';

  cart_page_details.forEach(function (el, index) {
    let div = document.createElement("div");
    div.setAttribute("class", "cart-item");

    let eachCross = document.createElement("h3");
    eachCross.innerText = "╳";
    eachCross.className = "cancel";
    eachCross.addEventListener("click", function () {
      cart_page_details.splice(index, 1);
      localStorage.setItem("cart_Item", JSON.stringify(cart_page_details));
      updateCartCount();
      displayCartItems();
      showNotification('Item removed from cart', 'info');
    });

    let image = document.createElement("img");
    image.src = el.image || 'https://via.placeholder.com/80x80?text=No+Image';
    image.setAttribute("id", "cart-image");

    let div1 = document.createElement("div");

    let title = document.createElement("h4");
    title.innerText = el.discription || el.title || 'Product';
    title.setAttribute("id", "cart-title");

    let price = document.createElement("p");
    const itemPrice = parseInt(el.offer || el.price || 0);
    price.innerText = "₹" + itemPrice;
    price.setAttribute("id", "cart-price");
    total += itemPrice;

    div1.append(title, price);
    div.append(image, div1, eachCross);
    cartAdd.append(div);
  });

  document.getElementById("cart-total").textContent = total;
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart_Item")) || [];
  const cartCount = document.querySelector("#cart-count");
  if (cartCount) {
    cartCount.textContent = cartItems.length;
    cartCount.style.display = cartItems.length > 0 ? 'block' : 'none';
  }
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
    if (window.pageYOffset > 100) {
      navbar.style.background = 'rgba(0, 0, 0, 0.9)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.backdropFilter = 'none';
    }
  });
  
  // Back to top functionality
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Counter Animations
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // Animation speed
  
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

// Tab Functionality
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      button.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');
      }
      
      // Add animation effect
      button.style.transform = 'scale(1.05)';
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
    });
  });
}

// Utility Functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

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

// Enhanced navbar interactions
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const underline = this.querySelector('.nav-underline');
      if (underline) {
        underline.style.width = '100%';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      const underline = this.querySelector('.nav-underline');
      if (underline) {
        underline.style.width = '0%';
      }
    });
  });
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to images
  const hoverImages = document.querySelectorAll('.bigcart_hover img, .kAniCard img');
  
  hoverImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});

// Export functions for global access
window.scrollToPlans = function() {
  document.getElementById('card_3').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
};

window.playVideo = function() {
  const video = document.getElementById('myVideo');
  if (video.paused) {
    video.play();
    video.muted = false;
    showNotification('Video unmuted and playing', 'info');
  } else {
    video.pause();
    video.muted = true;
    showNotification('Video paused and muted', 'info');
  }
};

window.subscribeNewsletter = function() {
  const email = document.getElementById('newsletter-email').value;
  if (email && validateEmail(email)) {
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    document.getElementById('newsletter-email').value = '';
  } else {
    showNotification('Please enter a valid email address', 'error');
  }
};