gsap.registerPlugin(ScrollTrigger);

// ── Scoop Drop Timeline ──
const heroTl = gsap.timeline();

heroTl
  .fromTo('#scoop-1', { opacity: 0, y: -280 }, { opacity: 1, y: 0, duration: 0.8, ease: 'bounce.out' })
  .fromTo('#scoop-2', { opacity: 0, y: -280 }, { opacity: 1, y: 0, duration: 0.8, ease: 'bounce.out' }, '+=0.1')
  .fromTo('#scoop-3', { opacity: 0, y: -280 }, { opacity: 1, y: 0, duration: 0.8, ease: 'bounce.out' }, '+=0.1')
  .fromTo('.hero__logo',
    { y: -200, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
    '-=0.3'
  )
  .fromTo('.hero__tagline',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
    '-=0.4'
  );

// ── Marquee Loop ──
const track = document.querySelector('.marquee-track');
const trackWidth = track.scrollWidth / 2;

gsap.to(track, {
  x: -trackWidth,
  duration: 18,
  ease: 'none',
  repeat: -1,
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % trackWidth)
  }
});

// ── Desktop-only animations ──
const mm = gsap.matchMedia();

mm.add('(min-width: 768px)', () => {
  // Hero Parallax
  gsap.to('.hero__halftone', {
    y: 120,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.hero__cone-wrap', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Film Reel Wipe for Menu
  gsap.fromTo('#menu',
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: '#menu',
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    }
  );
});

// ── Menu Title Reveal ──
gsap.from('.menu__title', {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.menu__title',
    start: 'top 85%',
    toggleActions: 'play none none none'
  }
});

// ── Menu Cards Stagger Reveal ──
gsap.to('.menu__card', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: 'power3.out',
  stagger: 0.15,
  scrollTrigger: {
    trigger: '.menu__cards',
    start: 'top 80%',
    toggleActions: 'play none none none'
  }
});

// ── Card 3D Tilt on Hover ──
document.querySelectorAll('.menu__card').forEach(card => {
  const rotX = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power1.out' });
  const rotY = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power1.out' });

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotY(dx * 15);
    rotX(-dy * 15);
  });

  card.addEventListener('mouseleave', () => {
    rotX(0);
    rotY(0);
  });
});

// ── Contact Form ──
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('form-success');
  form.style.display = 'none';
  success.classList.add('is-visible');
  setTimeout(() => {
    success.classList.remove('is-visible');
    form.style.display = '';
    form.reset();
  }, 3500);
});

// ── Contact Slide-Up ──
gsap.to('.contact', {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact',
    start: 'top 85%',
    toggleActions: 'play none none none'
  }
});
