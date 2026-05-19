# CoolCream Landing Page — Design Spec
Date: 2026-05-18

## Overview
Single-page retro 50s diner landing site for ice cream shop "CoolCream". Vanilla HTML/CSS/JS, GSAP + ScrollTrigger via CDN. No build step. Cinematic scroll-hijack animation style with an SVG ice cream scoop-drop sequence.

## Tech Stack
- HTML5 / CSS3 / vanilla JS
- GSAP 3 (gsap, ScrollTrigger, CustomEase) via CDN
- Google Fonts: Playfair Display, Special Elite

## Visual Style
- **Palette:** cream `#FFF8E7`, cherry red `#C0392B`, muted mint `#27AE60`, dark brown `#3E1F00`, off-white `#FAF3E0`
- **Decorative:** checkerboard stripe dividers, halftone dot texture overlay, starburst badges
- **Vibe:** 50s American diner — vintage, warm, nostalgic

## File Structure
```
index.html
style.css
main.js
```

## Sections

### 1. Hero (full viewport, pinned)
- Background: dark brown with halftone dot texture
- Center: SVG ice cream cone illustration
- Scoop-drop animation: 3 SVG scoops fall one-by-one onto cone on page load (GSAP timeline, bounce/elastic ease)
- Logo "CoolCream" slams in from above with elastic ease after scoops land
- Tagline typewriter effect below logo
- Retro marquee scrolling text strip at bottom of hero ("Est. 1958 • Homemade Daily • Best in Town •")
- Parallax: background dots layer moves slower than foreground on scroll

### 2. Menu Highlights (scroll-triggered)
- Checkerboard divider separates from hero
- 3 flavor cards in a row: e.g. "Classic Vanilla", "Cherry Bomb", "Mint Chip"
- Cards stagger-reveal from below on ScrollTrigger enter
- Each card: flavor name, short description, starburst price badge
- Hover: 3D tilt effect (GSAP quickTo on mousemove)
- Section panel slides/pushes in like old film reel transition

### 3. Contact (scroll-triggered)
- Address, opening hours, simple contact form (name + message + send)
- Whole section slides up from bottom on ScrollTrigger
- Tagline animates in with split-text stagger

## GSAP Animations Summary
| Animation | Trigger | Details |
|---|---|---|
| Logo entrance | page load | `from: y:-200, ease: elastic.out(1,0.5)` |
| Scoop drop | page load, timeline | Each scoop: `from: y:-300, ease: bounce.out`, staggered 0.4s |
| Tagline typewriter | after logo | Split chars, stagger reveal |
| Marquee strip | continuous | `xPercent` loop, seamless |
| Hero parallax | scroll | Background layer `y` moves at 0.3x scroll speed |
| Film reel transition | scroll | Panels `xPercent` push horizontally |
| Menu cards stagger | ScrollTrigger | `from: y:80, opacity:0`, stagger 0.15s |
| Card 3D tilt | mousemove | `gsap.quickTo` rotateX/Y, max ±15deg |
| Contact slide-up | ScrollTrigger | `from: y:100, opacity:0` |

## Constraints
- Mobile-responsive: scroll hijack disabled on mobile (touch), fallback to standard scroll
- No backend: contact form is static (no submission handler)
- All assets inline SVG or CSS — no external image files required
