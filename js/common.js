/* ===== Common JS - Shared across all pages ===== */

document.addEventListener('DOMContentLoaded', function() {

  // ===== Mobile Menu Toggle =====
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ===== Scroll to Top Button =====
  var scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== Active Nav Link Highlight =====
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, #mobile-menu a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.style.color = '#FF6B6B';
      link.style.fontWeight = '600';
    }
  });

  // ===== Header shadow on scroll =====
  var pageHeader = document.querySelector('header.premium-header, header.glass-header');
  if (pageHeader) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 30) {
        pageHeader.classList.add('scrolled');
      } else {
        pageHeader.classList.remove('scrolled');
      }
    });
  }

  // ===== Toast Notification Helper =====
  window.showToast = function(message, type) {
    type = type || 'success';
    var icons = {
      success: 'ri-checkbox-circle-fill',
      error: 'ri-close-circle-fill',
      info: 'ri-information-fill'
    };
    var container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<i class="' + (icons[type] || icons.info) + '"></i><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(function() {
      toast.classList.add('hide');
      setTimeout(function() { toast.remove(); }, 300);
    }, 2800);
  };

  // ===== Scroll Reveal =====
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length > 0) {
    if ('IntersectionObserver' in window) {
      revealEls.forEach(function(el) { el.classList.add('reveal-hidden'); });
      var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-hidden');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function(el) { revealObserver.observe(el); });
    }
    // Fallback: if IntersectionObserver unavailable, elements stay visible.
  }

});
