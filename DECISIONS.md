# Govantis v3.0 — Design, Communication & UX Decisions

## Agency Agents Involved

This version was built by synthesizing 6 specialized AI agents from the [agency-agents](https://github.com/msitarzewski/agency-agents) framework:

| Agent | Role | Contribution |
|---|---|---|
| 🎨 **Brand Guardian** | Brand strategy & identity | Color system, typography, logo evolution, brand voice, consistency |
| 📐 **UX Architect** | Technical architecture & UX | CSS tokens, layout grid, responsive breakpoints, component hierarchy |
| 🎨 **UI Designer** | Visual interface design | Glassmorphism cards, borders, hover states, spacing system, accessibility |
| 🎬 **Visual Storyteller** | Visual narrative & multimedia | Canvas animation, scroll-triggered logo, fade-up reveals, visual pacing |
| ✍️ **Content Creator** | Content strategy & copy | Messaging architecture, 3-pillar content, CTA copy, section structure |
| 📣 **PR & Comms Manager** | Positioning & tone | Executive tone, message discipline (3 rules), international framing |

---

## 1. Brand Strategy (Brand Guardian)

### Brand Foundation
- **Name**: Govantis (no suffix — no "Consulting", no "Advisory" in the brand name)
- **Purpose**: Bridge platform strategy with AI-native execution for critical telecom infrastructure
- **Positioning**: European advisory with global reach — strictly vendor-independent, technically-grounded
- **Personality**: Confident, precise, international, understated. No marketing fluff.

### Color System
| Token | Hex | Usage |
|---|---|---|
| `--bg-deep` | `#020617` | Page background (Slate 950 — darkest, professional) |
| `--bg-surface` | `rgba(15,23,42,0.6)` | Card surfaces (glassmorphism base) |
| `--accent-teal` | `#2dd4bf` | Primary accent — innovation, AI, action |
| `--accent-blue` | `#3b82f6` | Secondary accent — trust, stability, depth |
| `--text-primary` | `#f8fafc` | Primary text (white, high contrast) |
| `--text-secondary` | `#94a3b8` | Body text (Slate 400) |
| `--text-muted` | `#64748b` | Meta text (Slate 500) |

**Rationale**: Dark theme signals technical depth and executive positioning. Teal + blue gradient bridges innovation (AI) with trust (governance). The palette works equally well for a Lisbon CEO and a Philadelphia CTO — no cultural color conflicts.

### Typography
- **Font**: Inter (geometric sans-serif, variable weight)
- **Scale**: Responsive via `clamp()` — 2.5rem→5rem for H1, 1.8rem→2.75rem for H2
- **Weights**: 300 (light text), 400 (body), 500 (nav), 600-700 (headings), 800 (gradient highlights)

**Rationale**: Inter is the standard for B2B tech. It renders cleanly at all sizes, supports variable weights, and projects professionalism without looking like a template. The gradient text treatment (`.gradient-text`) creates visual hierarchy without additional color tokens.

### Logo
- **Design**: Dual overlapping shields — a larger dark shield (governance) and a smaller teal shield (AI) cutting through
- **Animation (v1 heritage)**: On scroll, the outer square rotates +90° while the inner square rotates -90°, creating a kinetic counter-rotation effect. This communicates adaptability and precision — core Govantis values.
- **Implementation**: Pure CSS transforms, no JavaScript animation library needed. 0.6s cubic-bezier transition.

---

## 2. UX Architecture (UX Architect)

### Layout System
- **Container**: 1200px max-width, 5% horizontal padding
- **Grid**: 2-column for content+image, 3-column for cards/pillars
- **Breakpoints**: 992px (grid collapse), 768px (nav collapse)
- **Spacing**: Section padding `var(--space-24)` = 6rem vertical rhythm

### Content Hierarchy
```
1. HEADER (fixed, glass) → Logo + Navigation
2. HERO (full viewport) → Tagline + H1 + CTA
3. WHO WE ARE → Image + Text + Partner grid + Stats
4. WHAT WE DO → 3 Pillar cards
5. WHY GOVANTIS → 3 Value props
6. CONTACT → CTA card
7. FOOTER → Offices + Contact + Legal
```

**Rationale**: The hierarchy follows the natural question flow of a B2B buyer: "Who are you?" → "What do you do?" → "Why should I trust you?" → "How do I reach you?" Each section has one job. No section competes with another.

### Visual Weight
- H1 gets the gradient treatment (highest visual weight)
- Section labels use monospace-style uppercase in teal (scannable anchors)
- Cards use glassmorphism for depth without visual noise
- CTAs use solid teal gradient (maximum contrast against dark background)

### Responsive Strategy
- Mobile-first with `clamp()` typography
- Grid collapses to single column at 992px
- Navigation hides at 768px (future: hamburger menu)
- Canvas particle count scales with viewport area (performance-conscious)

---

## 3. UI Design (UI Designer)

### Glassmorphism System
- `backdrop-filter: blur(20px)` on all card surfaces
- `border: 1px solid rgba(255,255,255,0.06)` for structure
- `box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4)` for depth
- Hover: border changes to teal, slight lift (`translateY(-4px)`)

**Rationale**: Glassmorphism conveys technological sophistication without the weight of solid cards. It integrates with the canvas background to create a cohesive spatial experience. The transparency also allows the animated particle network to remain visible, reinforcing the "living system" metaphor.

### Interaction Design
- **Scroll-triggered logo animation**: Rotates on scroll-down, reverses on scroll-up. Creates a tactile, responsive feel that signals precision engineering.
- **Fade-up reveals**: Content sections animate in as they enter the viewport (IntersectionObserver, threshold 0.1). Creates progressive disclosure without overwhelming.
- **Hover states**: All cards and links have 0.3s transitions. Cards lift, borders brighten, colors shift.
- **Button feedback**: Primary CTAs lift 3px with expanded glow shadow on hover.

### Accessibility (WCAG AA)
- All text meets minimum contrast ratios against dark background
- Semantic HTML: `<header>`, `<nav>`, `<section>`, `<footer>`
- Keyboard-navigable: all interactive elements are standard HTML elements
- Font scales with browser zoom (uses `clamp()` + `rem` units)
- `prefers-reduced-motion`: animations respect system preference (future enhancement)

### Design Tokens
```
--space-1: 4px    --radius-sm: 8px    --transition-fast: 150ms
--space-2: 8px    --radius-md: 12px   --transition-base: 300ms
--space-4: 16px   --radius-lg: 16px   --transition-slow: 600ms
--space-8: 32px   --radius-xl: 24px
--space-12: 48px
--space-24: 96px
```

---

## 4. Visual Storytelling (Visual Storyteller)

### Narrative Arc
1. **Hero** — The hook: "Bridging Platform Strategy with AI-Native Execution." Immediately establishes the value prop.
2. **Heritage** — The credibility: Deep telecom DNA, named partners, European roots. "We've been in your shoes."
3. **Pillars** — The proof: Three concrete areas of capability, each with specific technologies named.
4. **Value Props** — The differentiator: Vendor agnostic, engineers-not-just-advisors, global independence.
5. **CTA** — The invitation: Direct, personal, email-based. No forms, no friction.

### Emotional Journey
The site moves from **aspiration** (hero gradient, large type) → **trust** (partner logos, heritage) → **confidence** (specific technologies, named capabilities) → **action** (direct email contact).

### Visual Metaphors
- **Particle network**: Represents interconnected telecom infrastructure — nodes and edges, just like the networks Govantis works with
- **Dual shields logo**: Governance (protection) + AI (innovation) layered together
- **Glassmorphism**: Transparency = independence ("nothing to hide")
- **Gradient text**: Bridging two colors = bridging strategy and execution

---

## 5. Communication Strategy (Content Creator + PR & Comms)

### Tone Guidelines
| Dimension | Approach |
|---|---|
| **Voice** | Executive, direct, confident. No adverbs. No superlatives. |
| **Vocabulary** | Technical but accessible. "Platform governance" not "synergistic solutions." |
| **Cultural neutrality** | Works for both European and North American audiences. No regional idioms. |
| **Message discipline** | 3 pillars, 3 value props, 1 CTA. Nothing more. |

### Key Messages (Message Architecture)
1. **Govantis bridges platform strategy with AI-native execution.** (Hero)
2. **We bring decades of direct telecom experience — Deutsche Telekom, Vodafone, BT, NOS, RDK, prpl.** (Heritage)
3. **We deliver: Governance & Strategy. Complex Delivery. AI Products.** (Pillars)
4. **We're vendor-agnostic, engineer-led, and globally independent.** (Value Props)
5. **Contact: info@govantis.pt — Lisbon and Philadelphia.** (CTA)

### What We Removed (from v1/v2)
- ❌ "Consulting" / "Consultancy" / "Advisory" in the brand name
- ❌ "AI Tech Consultancy" badge
- ❌ Generic "Contact Us" — replaced with specific email
- ❌ "Heritage in Excellence" — replaced with concrete partner names
- ❌ Jargon like "empowers," "synergistic," "holistic"

### What We Added
- ✅ Concrete technology names (RDK, prplOS, OpenWrt, Android TV)
- ✅ Named partners (Deutsche Telekom, Vodafone, BT, NOS)
- ✅ Geographic specificity (Lisbon, Philadelphia)
- ✅ Quantified claims (100% vendor independent)
- ✅ Direct email (info@govantis.pt — no form friction)

---

## 6. Technical Architecture

### Stack
- **Single HTML file** — zero build tools, instant deployment
- **CSS Custom Properties** — design tokens in `:root`, consistent theming
- **IntersectionObserver** — scroll-triggered animations, no scroll-jacking
- **Canvas API** — procedural particle network, performance-optimized (`requestAnimationFrame`)
- **Font Awesome 6** — CDN-loaded icon library
- **Google Fonts** — Inter variable font, subset-loaded via `<link>`

### Performance
- No JavaScript frameworks (0 KB bundle)
- No build step required
- Images lazy-loaded (`loading="lazy"`)
- Canvas particle count capped at 90 maximum
- CSS animations use `transform` and `opacity` only (GPU-accelerated)
- Font Awesome loaded from CDN with `preconnect` hints

### Future Enhancements
- [ ] Hamburger menu for mobile navigation
- [ ] `prefers-reduced-motion` support for accessibility
- [ ] Formal case studies section
- [ ] Team member profiles
- [ ] Blog / insights section
- [ ] Multi-language support (PT/EN)

---

## 7. Version History

| Version | Path | Description |
|---|---|---|
| v1.0 | `/v1/` | React + Vite + Tailwind. "AI-Native Solutions." Blue gradient theme. |
| v2.0 | `/v2/` | Static HTML. "Platform Strategy Advisory." Canvas animation, Unsplash images, glassmorphism. |
| v3.0 | `/v3/` | Static HTML. v2 design + v1 logo animation + new content strategy. Best of both worlds. |

**All versions remain accessible.** The root page (`/`) shows a version selector.

---

*Document generated by synthesizing agency-agents: Brand Guardian, UX Architect, UI Designer, Visual Storyteller, Content Creator, PR & Communications Manager.*
