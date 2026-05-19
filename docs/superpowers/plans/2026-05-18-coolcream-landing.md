# CoolCream Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page retro 50s diner landing site for CoolCream ice cream shop with cinematic GSAP animations including an SVG scoop-drop sequence, scroll-hijack transitions, and 3D card tilts.

**Architecture:** Three files — `index.html` (structure + inline SVG), `style.css` (retro visual system), `main.js` (all GSAP animation logic). No build step; GSAP loaded via CDN. Scroll hijack disabled on mobile via matchMedia.

**Tech Stack:** HTML5, CSS3, vanilla JS, GSAP 3 (ScrollTrigger, CustomEase) via CDN, Google Fonts (Playfair Display, Special Elite).

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | All markup, inline SVG cone+scoops, section structure |
| `style.css` | Retro design system — palette, typography, checkerboard dividers, halftone texture, starburst badges, card layout, responsive |
| `main.js` | All GSAP: scoop-drop timeline, logo slam, typewriter, marquee loop, parallax, film-reel scroll, card stagger + tilt, contact slide-up |

---

### Task 1: HTML Skeleton + Google Fonts

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html with full document structure**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CoolCream — Homemade Ice Cream Since 1958</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Special+Elite&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- HERO -->
  <section class="hero" id="hero">
    <div class="hero__halftone"></div>

    <div class="hero__cone-wrap">
      <!-- SVG inserted in Task 2 -->
    </div>

    <div class="hero__content">
      <h1 class="hero__logo">CoolCream</h1>
      <p class="hero__tagline">Handcrafted happiness, one scoop at a time.</p>
    </div>

    <div class="marquee-strip">
      <div class="marquee-track">
        <span>Est. 1958&nbsp;•&nbsp;Homemade Daily&nbsp;•&nbsp;Best in Town&nbsp;•&nbsp;Est. 1958&nbsp;•&nbsp;Homemade Daily&nbsp;•&nbsp;Best in Town&nbsp;•&nbsp;Est. 1958&nbsp;•&nbsp;Homemade Daily&nbsp;•&nbsp;Best in Town&nbsp;•&nbsp;</span>
        <span aria-hidden="true">Est. 1958&nbsp;•&nbsp;Homemade Daily&nbsp;•&nbsp;Best in Town&nbsp;•&nbsp;Est. 1958&nbsp;•&nbsp;Homemade Daily&nbsp;•&nbsp;Best in Town&nbsp;•&nbsp;Est. 1958&nbsp;•&nbsp;Homemade Daily&nbsp;•&nbsp;Best in Town&nbsp;•&nbsp;</span>
      </div>
    </div>
  </section>

  <!-- CHECKERBOARD DIVIDER -->
  <div class="divider-checker"></div>

  <!-- MENU HIGHLIGHTS -->
  <section class="menu" id="menu">
    <h2 class="menu__title">Our Signature Scoops</h2>
    <div class="menu__cards">

      <div class="menu__card" data-flavor="vanilla">
        <div class="card__scoop" style="background:#F5E6C8"></div>
        <div class="card__badge">$4.50</div>
        <h3 class="card__name">Classic Vanilla</h3>
        <p class="card__desc">Pure Madagascar vanilla bean, slow-churned to perfection.</p>
      </div>

      <div class="menu__card" data-flavor="cherry">
        <div class="card__scoop" style="background:#C0392B"></div>
        <div class="card__badge">$4.75</div>
        <h3 class="card__name">Cherry Bomb</h3>
        <p class="card__desc">Tart cherries swirled into rich dark chocolate cream.</p>
      </div>

      <div class="menu__card" data-flavor="mint">
        <div class="card__scoop" style="background:#27AE60"></div>
        <div class="card__badge">$4.50</div>
        <h3 class="card__name">Mint Chip</h3>
        <p class="card__desc">Garden-fresh mint with hand-shaved chocolate flakes.</p>
      </div>

    </div>
  </section>

  <!-- CHECKERBOARD DIVIDER -->
  <div class="divider-checker divider-checker--flip"></div>

  <!-- CONTACT -->
  <section class="contact" id="contact">
    <div class="contact__info">
      <h2 class="contact__title">Find Us</h2>
      <p class="contact__line">123 Sundae Street, Sweet Town, ST 10001</p>
      <p class="contact__line">Mon–Sun: 11am – 10pm</p>
      <p class="contact__line">(555) 867-5309</p>
    </div>
    <form class="contact__form" onsubmit="return false;">
      <input class="form__input" type="text" placeholder="Your name" />
      <textarea class="form__textarea" placeholder="Your message" rows="4"></textarea>
      <button class="form__btn" type="submit">Send It</button>
    </form>
  </section>

  <!-- GSAP CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open index.html in browser, verify blank page loads without errors**

Open file in browser. DevTools console should show no errors. Page is unstyled — that's fine.

---

### Task 2: Inline SVG Ice Cream Cone

**Files:**
- Modify: `index.html` — replace `<!-- SVG inserted in Task 2 -->` inside `.hero__cone-wrap`

- [ ] **Step 1: Replace the SVG placeholder comment with the cone SVG**

Replace:
```html
      <!-- SVG inserted in Task 2 -->
```
With:
```html
      <svg id="ice-cream-svg" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" width="200" height="320">
        <!-- Cone -->
        <polygon id="cone-body" points="100,320 30,160 170,160" fill="#C8860A" />
        <line x1="100" y1="320" x2="65" y2="200" stroke="#A0660A" stroke-width="2"/>
        <line x1="100" y1="320" x2="100" y2="165" stroke="#A0660A" stroke-width="2"/>
        <line x1="100" y1="320" x2="135" y2="200" stroke="#A0660A" stroke-width="2"/>
        <!-- Cone rim -->
        <ellipse id="cone-rim" cx="100" cy="160" rx="70" ry="12" fill="#D4940F"/>

        <!-- Scoop 1 (bottom) — Mint -->
        <g id="scoop-1" opacity="0">
          <ellipse cx="100" cy="148" rx="60" ry="50" fill="#2ECC71"/>
          <ellipse cx="100" cy="125" rx="60" ry="30" fill="#27AE60"/>
        </g>

        <!-- Scoop 2 (middle) — Cherry -->
        <g id="scoop-2" opacity="0">
          <ellipse cx="100" cy="100" rx="52" ry="44" fill="#E74C3C"/>
          <ellipse cx="100" cy="80" rx="52" ry="26" fill="#C0392B"/>
        </g>

        <!-- Scoop 3 (top) — Vanilla -->
        <g id="scoop-3" opacity="0">
          <ellipse cx="100" cy="58" rx="44" ry="38" fill="#F5E6C8"/>
          <ellipse cx="100" cy="40" rx="44" ry="22" fill="#EDD9A3"/>
          <!-- Cherry on top -->
          <circle cx="100" cy="24" r="8" fill="#C0392B"/>
          <line x1="100" y1="24" x2="108" y2="10" stroke="#27AE60" stroke-width="2"/>
        </g>
      </svg>
```

- [ ] **Step 2: Verify in browser** — SVG cone shape visible in hero section (scoops invisible until JS runs — that's correct).

---

### Task 3: CSS — Retro Design System

**Files:**
- Create: `style.css`

- [ ] **Step 1: Create style.css**

```css
/* ── Reset & Base ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream:      #FFF8E7;
  --red:        #C0392B;
  --mint:       #27AE60;
  --brown:      #3E1F00;
  --dark-brown: #1A0A00;
  --off-white:  #FAF3E0;
  --gold:       #D4940F;
}

html { scroll-behavior: smooth; }
body { background: var(--cream); color: var(--brown); font-family: 'Special Elite', cursive; overflow-x: hidden; }

/* ── Hero ── */
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  background: var(--dark-brown);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Halftone dot texture */
.hero__halftone {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,248,231,0.12) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
  z-index: 0;
}

.hero__cone-wrap {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  filter: drop-shadow(0 8px 32px rgba(0,0,0,0.5));
}

.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 160px;
}

.hero__logo {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 900;
  color: var(--cream);
  text-shadow: 4px 4px 0 var(--red), 8px 8px 0 rgba(0,0,0,0.3);
  letter-spacing: -2px;
  line-height: 1;
  opacity: 0;
  transform: translateY(-100px);
}

.hero__tagline {
  font-family: 'Special Elite', cursive;
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: var(--gold);
  margin-top: 1rem;
  letter-spacing: 2px;
  opacity: 0;
}

/* Marquee */
.marquee-strip {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--red);
  padding: 10px 0;
  overflow: hidden;
  z-index: 3;
}

.marquee-track {
  display: flex;
  white-space: nowrap;
  will-change: transform;
}

.marquee-track span {
  font-family: 'Special Elite', cursive;
  font-size: 0.95rem;
  color: var(--cream);
  letter-spacing: 3px;
  text-transform: uppercase;
  padding-right: 2rem;
}

/* ── Checkerboard Divider ── */
.divider-checker {
  height: 24px;
  background-image:
    repeating-linear-gradient(
      90deg,
      var(--brown) 0px,
      var(--brown) 24px,
      var(--cream) 24px,
      var(--cream) 48px
    );
}

.divider-checker--flip {
  background-image:
    repeating-linear-gradient(
      90deg,
      var(--cream) 0px,
      var(--cream) 24px,
      var(--brown) 24px,
      var(--brown) 48px
    );
}

/* ── Menu ── */
.menu {
  background: var(--off-white);
  padding: 80px 40px;
  text-align: center;
}

.menu__title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--brown);
  margin-bottom: 3rem;
  text-decoration: underline;
  text-decoration-color: var(--red);
  text-underline-offset: 8px;
}

.menu__cards {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1100px;
  margin: 0 auto;
}

.menu__card {
  position: relative;
  background: white;
  border: 3px solid var(--brown);
  border-radius: 4px;
  padding: 2.5rem 1.5rem 2rem;
  width: 300px;
  box-shadow: 6px 6px 0 var(--brown);
  cursor: default;
  will-change: transform;
  opacity: 0;
  transform: translateY(80px);
}

.card__scoop {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 1.2rem;
  border: 3px solid var(--brown);
  box-shadow: 3px 3px 0 var(--brown);
}

.card__badge {
  position: absolute;
  top: -18px;
  right: -18px;
  width: 54px;
  height: 54px;
  background: var(--red);
  color: white;
  font-family: 'Playfair Display', serif;
  font-size: 0.9rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Starburst via clip-path */
  clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
}

.card__name {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: var(--brown);
  margin-bottom: 0.5rem;
}

.card__desc {
  font-size: 0.9rem;
  color: #6b4226;
  line-height: 1.6;
}

/* ── Contact ── */
.contact {
  background: var(--brown);
  color: var(--cream);
  padding: 80px 40px;
  display: flex;
  gap: 4rem;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(100px);
}

.contact__title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: var(--gold);
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
}

.contact__line {
  font-size: 1rem;
  letter-spacing: 1px;
  margin-bottom: 0.6rem;
  color: var(--cream);
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 280px;
}

.form__input,
.form__textarea {
  background: transparent;
  border: 2px solid var(--gold);
  color: var(--cream);
  font-family: 'Special Elite', cursive;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  resize: none;
  outline: none;
}

.form__input::placeholder,
.form__textarea::placeholder { color: rgba(255,248,231,0.4); }

.form__btn {
  background: var(--red);
  color: white;
  border: none;
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.8rem 2rem;
  cursor: pointer;
  letter-spacing: 2px;
  text-transform: uppercase;
  box-shadow: 4px 4px 0 var(--gold);
  transition: box-shadow 0.1s, transform 0.1s;
}

.form__btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--gold);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .menu__cards { flex-direction: column; align-items: center; }
  .contact { flex-direction: column; align-items: center; text-align: center; }
}
```

- [ ] **Step 2: Verify in browser** — retro styling visible. Hero dark brown, cream text, red marquee strip, off-white menu section, brown contact section.

---

### Task 4: GSAP — Scoop Drop Timeline + Logo Entrance

**Files:**
- Create: `main.js`

- [ ] **Step 1: Create main.js with GSAP registration and scoop-drop + logo animation**

```js
gsap.registerPlugin(ScrollTrigger);

// ── Scoop Drop + Logo Timeline ──
const heroTl = gsap.timeline({ defaults: { ease: 'bounce.out' } });

heroTl
  .to('#scoop-1', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'bounce.out',
    fromVars: { opacity: 0, y: -280 }
  })
  .from('#scoop-1', { opacity: 0, y: -280, duration: 0.7, ease: 'bounce.out' }, 0)
  .from('#scoop-2', { opacity: 0, y: -280, duration: 0.7, ease: 'bounce.out' }, '+=0.15')
  .set('#scoop-2', { opacity: 1 }, '<')
  .from('#scoop-3', { opacity: 0, y: -280, duration: 0.7, ease: 'bounce.out' }, '+=0.15')
  .set('#scoop-3', { opacity: 1 }, '<')
  .from('.hero__logo', {
    y: -200,
    opacity: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.2')
  .to('.hero__logo', { opacity: 1, duration: 0 }, '<')
  .from('.hero__tagline', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
  .to('.hero__tagline', { opacity: 1, duration: 0 }, '<');
```

Wait — the SVG `<g>` elements have `opacity="0"` set in HTML. GSAP `.from()` animates FROM the given state back to computed state, so we need `.fromTo()` for clarity. Replace the entire main.js with:

```js
gsap.registerPlugin(ScrollTrigger);

// ── Scoop Drop Timeline ──
const heroTl = gsap.timeline();

heroTl
  .fromTo('#scoop-1', { opacity: 0, y: -280 }, { opacity: 1, y: 0, duration: 0.8, ease: 'bounce.out' })
  .fromTo('#scoop-2', { opacity: 0, y: -280 }, { opacity: 1, y: 0, duration: 0.8, ease: 'bounce.out' }, '+=0.1')
  .fromTo('#scoop-3', { opacity: 0, y: -280 }, { opacity: 1, y: 0, duration: 0.8, ease: 'bounce.out' }, '+=0.1')
  // Logo slams in
  .fromTo('.hero__logo',
    { y: -200, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
    '-=0.3'
  )
  // Tagline fades in
  .fromTo('.hero__tagline',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
    '-=0.4'
  );
```

- [ ] **Step 2: Open browser, refresh** — scoops drop onto cone one-by-one with bounce, logo slams from top with elastic, tagline fades in.

---

### Task 5: GSAP — Marquee Loop

**Files:**
- Modify: `main.js` — append after heroTl

- [ ] **Step 1: Append marquee animation to main.js**

```js
// ── Marquee Loop ──
const track = document.querySelector('.marquee-track');
const trackWidth = track.scrollWidth / 2; // two identical spans

gsap.to(track, {
  x: -trackWidth,
  duration: 18,
  ease: 'none',
  repeat: -1,
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % trackWidth)
  }
});
```

- [ ] **Step 2: Verify in browser** — red strip at bottom of hero scrolls text continuously left, seamlessly loops.

---

### Task 6: GSAP — Hero Parallax (desktop only)

**Files:**
- Modify: `main.js` — append

- [ ] **Step 1: Append parallax ScrollTrigger to main.js**

```js
// ── Hero Parallax (desktop only) ──
const mm = gsap.matchMedia();

mm.add('(min-width: 769px)', () => {
  // Halftone dots move slower than scroll
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

  // Cone moves slightly upward on scroll (parallax depth)
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
});
```

- [ ] **Step 2: Verify** — scroll down from hero slowly. Dots and cone move at different speeds, creating depth.

---

### Task 7: GSAP — Menu Cards Stagger + 3D Tilt

**Files:**
- Modify: `main.js` — append

- [ ] **Step 1: Append menu card animations to main.js**

```js
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
```

- [ ] **Step 2: Add perspective to menu in style.css for 3D tilt to work**

Append to `style.css`:
```css
.menu__cards { perspective: 1000px; }
.menu__card { transform-style: preserve-3d; }
```

- [ ] **Step 3: Verify** — scroll to menu, cards stagger up. Hover card — it tilts in 3D toward cursor.

---

### Task 8: GSAP — Contact Section Slide-Up

**Files:**
- Modify: `main.js` — append

- [ ] **Step 1: Append contact animation to main.js**

```js
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
```

- [ ] **Step 2: Verify** — scroll to contact section. Whole section slides up and fades in from below.

---

### Task 9: GSAP — Film Reel Section Transition

**Files:**
- Modify: `main.js` — append
- Modify: `style.css` — append

- [ ] **Step 1: Add overflow hidden to body in style.css to prevent horizontal scroll during transition**

Append to `style.css`:
```css
/* Film reel transition wrapper */
.section-panel {
  position: relative;
  overflow: hidden;
}
```

- [ ] **Step 2: Add film-reel class to sections in index.html**

In `index.html`, change:
```html
  <section class="menu" id="menu">
```
To:
```html
  <section class="menu section-panel" id="menu">
```

And change:
```html
  <section class="contact" id="contact">
```
To:
```html
  <section class="contact section-panel" id="contact">
```

- [ ] **Step 3: Append film reel horizontal wipe to main.js**

```js
// ── Film Reel Wipe Transition for Menu ──
mm.add('(min-width: 769px)', () => {
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
```

- [ ] **Step 4: Verify** — on desktop, menu section wipes in horizontally like a film reel cut when scrolled into view.

---

### Task 10: Polish — Responsive + Final Review

**Files:**
- Modify: `style.css` — verify mobile styles
- Modify: `main.js` — verify mm.add guards on scroll-hijack animations

- [ ] **Step 1: Verify mobile responsiveness** — resize browser to 375px wide. Cards stack vertically, contact stacks vertically, text readable, no horizontal overflow.

- [ ] **Step 2: Verify all animations on desktop at 1440px width**

Checklist:
- [ ] Scoops drop on load ✓
- [ ] Logo slams elastic ✓
- [ ] Tagline fades ✓
- [ ] Marquee loops ✓
- [ ] Parallax on scroll ✓
- [ ] Film reel wipe on menu ✓
- [ ] Cards stagger in ✓
- [ ] Card 3D tilt on hover ✓
- [ ] Contact slides up ✓

- [ ] **Step 3: Fix any z-index or overflow issues found**

Common fix if needed — append to `style.css`:
```css
#hero { z-index: 0; }
.divider-checker { position: relative; z-index: 1; }
```

- [ ] **Step 4: Done** — site complete, open `index.html` directly in browser, no server needed.
