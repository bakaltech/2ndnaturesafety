// ============================================
// MAIN.JS - Core functionality (mobile menu, sticky header, carousel)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // ---------- Mobile Menu ----------
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    // Toggle menu on button click
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      mobileMenu.classList.toggle('hidden');

      // Change icon between hamburger and X
      const icon = menuBtn.querySelector('svg');
      if (icon) {
        if (mobileMenu.classList.contains('hidden')) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
        }
      }
    });

    // Close menu when a link inside it is clicked
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('svg');
        if (icon) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        }
      });
    });

    // ---------- Close mobile menu on scroll ----------
    window.addEventListener('scroll', function() {
      // If menu is open, close it
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('svg');
        if (icon) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        }
      }
    });
  } else {
    console.warn('Mobile menu elements not found');
  }

  // ---------- Sticky Header ----------
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ---------- Update Copyright Year ----------
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ---------- Carousel for About Page ----------
  if (document.getElementById('about-carousel')) {
    initCarousel();
  }
});

// Carousel function (unchanged)
function initCarousel() {
  const images = document.querySelectorAll('.carousel-image');
  const indicators = document.querySelectorAll('.carousel-indicator');
  if (!images.length) return;

  let currentIndex = 0;
  const total = images.length;

  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
    indicators.forEach((ind, i) => {
      if (i === index) {
        ind.classList.add('active');
        ind.style.backgroundColor = '#4CAF50';
        ind.style.width = '2rem';
      } else {
        ind.classList.remove('active');
        ind.style.backgroundColor = 'rgba(255,255,255,0.5)';
        ind.style.width = '0.5rem';
      }
    });
    currentIndex = index;
  }

  let interval = setInterval(() => {
    let next = (currentIndex + 1) % total;
    showSlide(next);
  }, 5000);

  indicators.forEach((ind, idx) => {
    ind.addEventListener('click', () => {
      clearInterval(interval);
      showSlide(idx);
      interval = setInterval(() => {
        let next = (currentIndex + 1) % total;
        showSlide(next);
      }, 5000);
    });
  });

  showSlide(0);
}