  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.slider-dot');
  let currentTestimonial = 0;

  function showTestimonial(index) {
      testimonials.forEach(testimonial => testimonial.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentTestimonial = index;
  }

  dots.forEach(dot => {
      dot.addEventListener('click', () => {
          const index = parseInt(dot.getAttribute('data-index'));
          showTestimonial(index);
      });
  });

  // Auto-rotate testimonials
  setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
  }, 5000);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Form submission
  const searchForm = document.querySelector('.search-form');
  const newsletterForm = document.querySelector('.newsletter-form');

  searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Search functionality would be implemented here!');
  });

  newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input').value;
      if (email) {
          alert(`Thank you for subscribing with ${email}!`);
          newsletterForm.querySelector('input').value = '';
      } else {
          alert('Please enter your email address.');
      }
  });

  // Animation on scroll
  window.addEventListener('scroll', () => {
      const features = document.querySelectorAll('.feature-card');
      const destinations = document.querySelectorAll('.destination-card');
      
      features.forEach((feature, index) => {
          const featurePosition = feature.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (featurePosition < screenPosition) {
              feature.style.transitionDelay = `${index * 0.1}s`;
              feature.style.opacity = '1';
              feature.style.transform = 'translateY(0)';
          }
      });
      
      destinations.forEach((destination, index) => {
          const destinationPosition = destination.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (destinationPosition < screenPosition) {
              destination.style.transitionDelay = `${index * 0.1}s`;
              destination.style.opacity = '1';
              destination.style.transform = 'translateY(0)';
          }
      });
  });

  // Trigger animations on page load
  window.addEventListener('load', () => {
      const features = document.querySelectorAll('.feature-card');
      const destinations = document.querySelectorAll('.destination-card');
      
      features.forEach(feature => {
          feature.style.opacity = '0';
          feature.style.transform = 'translateY(20px)';
      });
      
      destinations.forEach(destination => {
          destination.style.opacity = '0';
          destination.style.transform = 'translateY(20px)';
      });
      
      // Trigger the scroll event to check initial positions
      window.dispatchEvent(new Event('scroll'));
  });
