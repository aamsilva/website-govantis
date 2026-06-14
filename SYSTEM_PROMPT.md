# Govantis Website — Full Context for AI Sessions

> Copy this block into any new opencode session to load full Govantis project context.

```
================================================================================
 GOVANTIS WEBSITE — COMPLETE PROJECT CONTEXT
================================================================================

## 1. PROJECT OVERVIEW
Govantis is an AI-native platform strategy consultancy for telecom operators.
Website: www.govantis.pt
Tagline: "Bridging Platform Strategy with AI-Native Execution"
Contact: info@govantis.pt
Office: Rua Castilho, n.º 39, 8.º E, 1250-068 Santo António, Lisboa
Brand: "Govantis" only — no "Consulting" or "Advisory" suffix
Founders: Augusto Silva + Pedro Caldeira dos Santos

## 2. DOMAIN & DNS
- Domain: govantis.pt (registered at PTisp/AlmourolTec)
- DNS panel: https://my.ptisp.pt (login: aamsilva@gmail.com)
- Nameservers: ns5.mydnspt.net / ns6.mydnspt.net
- Hosting: GitHub Pages (free, custom domain, HTTPS via Let's Encrypt)
- CNAME: www.govantis.pt → aamsilva.github.io
- DNS record at PTisp: www.govantis.pt CNAME → aamsilva.github.io
  (set via PTisp DNS manager under "Parqueamento" → "Gestor de DNS")
- GitHub Pages API token: see ~/.config/opencode/TOOLS.md (never commit to repo)

## 3. GIT REPOSITORY
- Remote: https://github.com/aamsilva/website-govantis (public)
- Local: ~/Desktop/website-govantis/ (branch: main)
- Deploy: gh-pages branch (force-push from /tmp/gh-pages-deploy/)
- .nojekyll file in gh-pages root (disables Jekyll processing)

## 4. URL STRUCTURE
www.govantis.pt/             → v16 (current release candidate — clean, no version links)
www.govantis.pt/to_test/     → Archive landing page (links to all archived versions)
www.govantis.pt/to_test/v1/  → v1  (React/Vite build)
www.govantis.pt/to_test/v2/  → v2  (Static HTML)
...
www.govantis.pt/to_test/v15/ → v15 (previous release candidate)
www.govantis.pt/privacy      → Privacy policy (static HTML)
www.govantis.pt/404.html     → Branded 404 page
www.govantis.pt/brand/       → Brand assets (SVG logo, PNG favicon)

IMPORTANT: After every force-push to gh-pages, the custom domain MUST be
re-added via the GitHub Pages API:
  curl -s -X PUT -H "Authorization: token $GH_TOKEN" \
    "https://api.github.com/repos/aamsilva/website-govantis/pages" \
    -H "Content-Type: application/json" \
    -d '{"cname":"www.govantis.pt"}'

## 5. VERSION HISTORY

v1  — React + Vite + Tailwind, first deploy, fixed email/vite.svg/brand
v2  — Static HTML from Gemini content, platform strategy advisory
v3  — Glassmorphism, animated logo, new content strategy
v4  — Multi-stakeholder landing page, "Who It's For" section
v5  — (skipped)
v6  — Founders section, 4 insight placeholder pages
v7  — Dual-mode light/dark via prefers-color-scheme — BASE DESIGN
v8  — Improved light mode readability, lighter palette
v9  — Sora+Manrope type, refined tokens (Anthropic frontend skill)
v10 — Electric-mint accent, 3D scroll-tilt hero, artistic SVGs (Agency skill)
v11 — Cinematic, massive type (H1 115px), bold SVGs, navy-indigo
v12 — Aubergine+coral+gold, Space Grotesk, layered wave SVGs
v13 — Blue palette (navy #060b24 + electric blue + cyan), Plus Jakarta Sans,
      Problem/Solution pillars, "Platform-to-Outcome Method" named methodology
v14 — v7 design, whitepapers section removed entirely
v15 — v7 design, refined copy across all sections, updated insights (2 whitepapers
      kept + 2 "Coming Soon"), nav alignment fix, stat wrap fix
v16 — CURRENT RELEASE CANDIDATE. Em dashes removed from all visible copy,
      "submarine cable" → "infrastructure monitoring", subtitle "One outcome:
      results" → "Built for your platform", Who We Are grammar fix ("that the
      industry runs on" → "the industry's most critical platforms depend on"),
      ALL 4 insight cards converted to "Coming Soon" with titles only.

## 6. DESIGN SYSTEM (v7 base, used by v14/v15/v16)

### Colors (Dark Mode — default)
- Background: #020617 (deep navy)
- Surface: #0f172a
- Accent (teal): #2dd4bf
- Accent2 (blue): #3b82f6
- Text: #f8fafc
- Text2: #94a3b8

### Colors (Light Mode — prefers-color-scheme: light)
- Background: #f1f5f9
- Surface: #e2e8f0
- Accent: #0d9488 (dark teal)
- Accent2: #2563eb
- Text: #0f172a
- Text2: #475569

### Typography
- Body/UI: Inter, system-ui, sans-serif
- Monospace/Labels: JetBrains Mono
- H1: clamp(2.4rem, 5.5vw, 4.8rem)
- H2: clamp(1.7rem, 3.8vw, 2.6rem)
- H3: clamp(1.15rem, 1.6vw, 1.5rem)
- CSS class .grad: gradient accent→accent2 text (teal→blue)
- CSS class .label: uppercase JetBrains Mono, accent color, 0.72rem

### Logo (duplo-quadrado)
- .outer: solid square, accent color, 7px border-radius, rotate(45deg), opacity 0.18
- .inner: border square, 17px, 3px border-radius, rotate(45deg)
- On hover: .outer rotates to 90deg, .inner rotates to 0deg
- Scroll animation: on scroll-down, .outer/.inner animate; on scroll-up, reverse

### Layout
- Container max-width: 1180px, padding 0 5%
- .grid2: 2-column grid
- .grid3: 3-column grid (collapses to 1 col at 992px)
- .glass cards: backdrop-filter blur(24px), border 1px, border-radius 16px
- .sec padding: clamp(4rem, 8vw, 7rem)
- .sec-alt: surface background for alternating sections

## 7. PAGE SECTIONS (v16 order)
1. Header (fixed, logo + nav: Who We Are, Founders, What We Do, Insights, Contact)
2. Hero (full viewport, gradient orbs, CTA buttons)
3. Who We Are (grid2: text + SVG, partner badges, stat block)
4. Founders (grid2: Augusto + Pedro cards)
5. What We Do (grid3: 3 pillars with icons)
6. How We Work (grid2: 3-step process + SVG)
7. Why Govantis (grid3: 3 glass cards)
8. Insights (grid2: 4 "Coming Soon" cards — titles only)
9. Contact (CTA card with email + LinkedIn)
10. Footer (logo, office address, connect links, privacy)

## 8. KEY DECISIONS
- No Unsplash/external images — all images are inline SVGs
- No mention of Hexa Labs (Augusto no longer there)
- No mention of Netsilica (competitor analysis is confidential)
- No external dependencies except Google Fonts + Font Awesome CDN
- Single HTML file per version (no build tools after v1)
- Versioned subdirectories for experimentation
- Em dashes "—" are a telltale sign of AI-generated copy — avoid in visible text

## 9. SECURITY HARDENING
- Content-Security-Policy (default-src 'none', specific allowlists)
- X-Content-Type-Options: nosniff
- frame-ancestors 'none' (anti-clickjacking)
- :focus-visible outlines on all interactive elements
- Privacy policy at /privacy (GDPR compliant)
- Branded 404 page at /404.html
- All external links: rel="noopener noreferrer", target="_blank"
- No secrets in source code (token masked in commits)
- Semantic HTML: <main> landmark, heading hierarchy

## 10. DEPLOY PROCEDURE
The deploy workflow is:
1. Create version at /tmp/govantis-v{N}/index.html
2. Clone gh-pages: git clone --branch gh-pages <repo> /tmp/gh-pages-deploy
3. Copy new version to /tmp/gh-pages-deploy/index.html (or archive prev to to_test/)
4. git add, git commit, git push origin HEAD:gh-pages (use --force if needed)
5. Re-add custom domain via GitHub Pages API (see section 4)
6. Wait ~30-120s for GitHub Pages CDN propagation
7. Verify with agent-browser or curl

## 11. LESSONS LEARNED (summary)
- Force push kills custom domain — always re-add via API
- PTisp DNS SPA panel needs browser automation (dispatch 'input' + submit)
- Text at clamp(>=2rem, vw) in constrained grids needs white-space:nowrap
- Nav items without padding misalign with bordered cta-link — use uniform
  padding + align-items:center
- Footer version switcher removed from release candidate for clean presentation
- Git clone at /tmp/gh-pages-deploy gets corrupted on macOS if .git/HEAD is lost
- Always update both source copy (/tmp/govantis-v{N}/) and deploy copy

## 12. AVAILABLE TOOLS & SKILLS
- agent-browser: headless browser automation (/opt/homebrew/bin/agent-browser)
- opencli-rs: social/content site interaction via Chrome login
- GitHub Pages API: deploy custom domain management
- curl: DNS, API, and HTTP header inspection

## 13. CRITICAL ADDRESSES
- PTisp: aamsilva@gmail.com
- GitHub: aamsilva (token in ~/.config/opencode/TOOLS.md)
- Linkedin: /company/govant-is
- Email: info@govantis.pt

## 14. FILES REFERENCED
- ~/Desktop/website-govantis/AGENTS.md — 14-agent roster
- ~/Desktop/website-govantis/LEARNINGS.md — 8 categories of lessons
- ~/Desktop/website-govantis/MANIFEST.md — Design/Marketing/Sales/Engineering manifesto
- ~/Desktop/website-govantis/OPS.md — operations runbook
- ~/Desktop/website-govantis/PTISP.md — DNS panel guide
- ~/Desktop/website-govantis/SYSTEM_PROMPT.md — this file
- /tmp/govantis-v{N}/index.html — source copy of each version N
- /tmp/gh-pages-deploy/ — gh-pages branch working copy
- ~/.config/opencode/TOOLS.md — all API keys (local only)
- ~/.config/opencode/SKILLS.md — skills inventory (local only)

================================================================================
```

After any session, append a brief summary of changes made, new versions created,
and any issues encountered to the version history section above.
