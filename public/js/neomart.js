// Toggle Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Dark/Light Mode Toggle
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

// Check localStorage for saved mode preference
const savedMode = localStorage.getItem('mode');
if (savedMode === 'dark') {
  body.classList.add('dark-mode');
  modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  body.classList.remove('dark-mode');
  modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle Dark/Light Mode
modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('mode', 'dark'); // Save preference to localStorage
  } else {
    modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('mode', 'light'); // Save preference to localStorage
  }
});


// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
    navMenu.classList.remove('active'); // Close mobile menu after clicking a link
  });
});

// Scroll Animations
const animateElements = document.querySelectorAll('[data-animate]');

const checkScroll = () => {
  animateElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight * 0.85) {
      element.classList.add('animate');
    }
  });
};

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Buy Now Button Functionality
const buyNowButtons = document.querySelectorAll('.buy-now');

buyNowButtons.forEach(button => {
  button.addEventListener('click', () => {
    alert('Thank you for your purchase! Redirecting to checkout...');
    // Simulate redirect to a checkout page
    window.location.href = 'checkout.html'; // Replace with your actual checkout page URL
  });
});

// Add to Cart Button Functionality (Optional)
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    alert('Product added to cart!');
    // Add your cart logic here
  });
});

// // Toggle nav menu
// const menuToggle = document.getElementById("menuToggle");
// const navMenu = document.getElementById("navMenu");

// menuToggle.addEventListener("click", () => {
//   navMenu.classList.toggle("active");
// });
