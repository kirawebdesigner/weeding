// ===== WEDDING INVITATION - INTERACTIVITY =====

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initCarousel();
  initScrollReveal();
  initParticles();
  initRSVP();
  initSmoothScroll();
});

// ===== COUNTDOWN TIMER =====
function initCountdown() {
  const weddingDate = new Date('2026-01-25T17:00:00').getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  function update() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      document.getElementById('countdown-heading').textContent = '🎉 THE BIG DAY IS HERE!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ===== PHOTO CAROUSEL =====
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!track || !dots.length) return;

  let current = 0;
  const total = track.children.length;
  let autoplayInterval;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      resetAutoplay();
    });
  });

  // Touch/swipe support
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && current < total - 1) goTo(current + 1);
      else if (diff < 0 && current > 0) goTo(current - 1);
    }
    resetAutoplay();
  }, { passive: true });

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      goTo((current + 1) % total);
    }, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ===== FLOATING PARTICLES =====
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.animation = `float ${8 + Math.random() * 12}s linear ${Math.random() * 10}s infinite`;
    p.style.width = (2 + Math.random() * 4) + 'px';
    p.style.height = p.style.width;
    container.appendChild(p);
  }
}

// ===== RSVP FORM =====
function initRSVP() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show success state
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      RSVP SENT!
    `;
    btn.style.background = 'linear-gradient(135deg, #2D8B4E, #38A169)';
    btn.disabled = true;

    console.log('RSVP Data:', data);

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ===== SMOOTH SCROLL FOR NAV =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== DOWNLOAD QR CODE =====
function downloadQR() {
  const qrImg = document.getElementById('qr-image');
  if (!qrImg) return;
  
  const link = document.createElement('a');
  link.download = 'wedding-entry-pass.png';
  link.href = qrImg.src;
  link.click();
}
