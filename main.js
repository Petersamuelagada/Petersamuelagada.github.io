// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// ===== SCROLL REVEAL — ALL SECTIONS =====
const revealAll = document.querySelectorAll(
  '.reveal, .card, .testimonial, .blog-card, .portfolio-card, .for-card, .faq-item, .service-row, .section-header, .proof-item'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealAll.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  revealObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration, suffix) {
  let start = 0;
  const isDecimal = target % 1 !== 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal ? start.toFixed(1) + suffix : Math.floor(start) + suffix;
  }, 16);
}

const statSpans = document.querySelectorAll('.hstat span, .proof-num, .hi-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const text = el.textContent.trim();
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      const suffix = text.replace(/[0-9.]/g, '');
      if (!isNaN(num) && num > 0) {
        el.textContent = '0' + suffix;
        setTimeout(() => animateCounter(el, num, 1800, suffix), 200);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statSpans.forEach(el => counterObserver.observe(el));

// ===== TYPING EFFECT ON BADGE =====
const badge = document.querySelector('.badge');
if (badge) {
  const badgeText = badge.textContent.trim();
  badge.textContent = '';
  badge.style.opacity = '1';
  let i = 0;
  setTimeout(() => {
    const typeTimer = setInterval(() => {
      badge.textContent += badgeText[i];
      i++;
      if (i >= badgeText.length) clearInterval(typeTimer);
    }, 45);
  }, 500);
}

// Hero headline smooth fade in
const heroH1 = document.querySelector('.hero-text h1');
if (heroH1) {
  heroH1.style.opacity = '0';
  heroH1.style.transform = 'translateY(20px)';
  setTimeout(() => {
    heroH1.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    heroH1.style.opacity = '1';
    heroH1.style.transform = 'translateY(0)';
  }, 400);
}

// Hero sub and buttons
const heroSub = document.querySelector('.hero-sub');
const heroBtns = document.querySelector('.hero-btns');
if (heroSub) {
  heroSub.style.opacity = '0';
  heroSub.style.transform = 'translateY(20px)';
  setTimeout(() => {
    heroSub.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    heroSub.style.opacity = '1';
    heroSub.style.transform = 'translateY(0)';
  }, 700);
}
if (heroBtns) {
  heroBtns.style.opacity = '0';
  heroBtns.style.transform = 'translateY(20px)';
  setTimeout(() => {
    heroBtns.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    heroBtns.style.opacity = '1';
    heroBtns.style.transform = 'translateY(0)';
  }, 950);
}

// ===== FLOATING PARTICLES =====
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.6;';
  hero.style.position = 'relative';
  hero.style.overflow = 'hidden';
  hero.insertBefore(canvas, hero.firstChild);

  const heroGrid = hero.querySelector('.hero-grid');
  if (heroGrid) { heroGrid.style.position = 'relative'; heroGrid.style.zIndex = '1'; }

  const ctx = canvas.getContext('2d');
  let W = canvas.width = hero.offsetWidth;
  let H = canvas.height = hero.offsetHeight;

  window.addEventListener('resize', () => {
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  });

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.4 + 0.1,
    color: Math.random() > 0.5 ? '27,79,216' : '96,165,250',
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      particles.slice(i + 1).forEach(q => {
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(27,79,216,${0.07 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      });
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

if (document.querySelector('.hero')) createParticles();

// ===== CARD TILT ON HOVER =====
document.querySelectorAll('.card, .testimonial, .blog-card, .portfolio-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -5;
    const rotateY = ((x - rect.width / 2) / rect.width) * 5;
    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.cat === filter) ? 'block' : 'none';
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#22C55E';
    btn.style.borderColor = '#22C55E';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.style.borderColor = '';
      contactForm.reset();
    }, 3000);
  });
}
