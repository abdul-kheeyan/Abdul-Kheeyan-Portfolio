document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById('nav-links');
  const navItems = navLinks.querySelectorAll('a');

  // Toggle hamburger menu
  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    menuIcon.classList.toggle('open'); // optional: animate icon
  });

  // Smooth scroll + auto close menu
  navItems.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      const navHeight = document.querySelector('nav').offsetHeight;

      // Smooth scroll
      window.scrollTo({
        top: targetSection.offsetTop - navHeight,
        behavior: 'smooth'
      });

      // Close menu after scroll starts
      navLinks.classList.remove('show');
      menuIcon.classList.remove('open'); // optional: close icon
    });
  });
});
