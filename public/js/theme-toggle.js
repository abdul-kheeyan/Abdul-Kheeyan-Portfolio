const body = document.getElementById("body");
const toggleBtn = document.getElementById("theme-toggle");

// Function to update icon
function updateIcon() {
  if (!toggleBtn) return;

  const isLight = body.classList.contains("light-mode");
  toggleBtn.innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// On page load: check saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    body.classList.add("light-mode");
  }

  updateIcon(); // apply correct icon
});

// Toggle on button click
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    const isLight = body.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");

    updateIcon();
  });
}

  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.getElementById('nav-links');

  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
