# Govantis — Website

**www.govantis.pt** · `info@govantis.pt`  
Rua Castilho, n.º 39, 8.º E · 1250-068 Santo António, Lisboa

Bridging Platform Strategy with AI-Native Execution.

---

## 🚀 Deployment

| Item | Detail |
|---|---|
| **Hosting** | GitHub Pages (free) |
| **Domain** | `www.govantis.pt` (DNS: CNAME → `aamsilva.github.io`) |
| **HTTPS** | Enforced via GitHub Pages |
| **Repo** | [aamsilva/website-govantis](https://github.com/aamsilva/website-govantis) (public) |
| **Deploy branch** | `gh-pages` (root `/`) |
| **Source branch** | `main` (React source for v1) |

---

## 📦 Version History

### v4.0 — `www.govantis.pt/v4/` _(current flagship)_
**"From Platform Complexity to Business Outcomes"**

Multi-stakeholder landing page. 6 sections: Hero, Who We Are, Who It's For (4 personas), What We Do (3 pillars), How We Work (3 steps), Why Govantis (3 value props). Glassmorphism + canvas animation + animated duplo-quadrado logo. Tone: executive, inclusive, no jargon.

### v3.0 — `www.govantis.pt/v3/`
**"Platform Strategy & AI-Native Execution"**

First version with the duplo-quadrado brand logo and full glassmorphism design. 5 sections. First version to establish the Lisbon-only address.

### v2.0 — `www.govantis.pt/v2/`
**"Platform Strategy Advisory"**

Static HTML from Gemini-generated content. Different logo (SVG shields — deprecated). First version with canvas particle animation and glassmorphism cards.

### v1.0 — `www.govantis.pt/v1/`
**"AI-Native Solutions"**

Original React + Vite + Tailwind build. Blue electric theme. First version deployed. Contains the original duplo-quadrado animated logo (the brand mark).

---

## 🛠 Local Development

```bash
cd ~/Desktop/website-govantis
npm install
npm run dev    # → http://localhost:5173
npm run build  # → dist/
```

### Deploy static HTML versions (v2/v3/v4)
Edit the HTML file in `/tmp/govantis-v{N}/index.html`, then:

```bash
cp /tmp/govantis-v{N}/index.html /tmp/gh-pages-deploy/v{N}/
cd /tmp/gh-pages-deploy
git add -A && git commit -m "Update v{N}" && git push origin HEAD:gh-pages --force
```

---

## 🔒 Security

### Hardened (all versions)
- ✅ Content-Security-Policy meta tag (XSS protection)
- ✅ `X-Content-Type-Options: nosniff` (MIME sniffing)
- ✅ `frame-ancestors 'none'` (clickjacking protection)
- ✅ `focus-visible` styles (keyboard accessibility)
- ✅ `<main>` semantic landmark (screen reader navigation)
- ✅ Privacy Policy at `/privacy`
- ✅ Branded 404 page at `/404.html`
- ✅ HTTPS enforced via GitHub Pages

### Accepted risks
- Google Fonts + Font Awesome loaded from CDN (no SRI — static site limitation)
- Email addresses in `mailto:` links (legitimate contact information)

---

## 🎨 Brand Assets

| Asset | URL |
|---|---|
| Logo 512px SVG | `/brand/govantis-icon-512.svg` |
| Logo 256px PNG | `/brand/govantis-icon-256.png` |
| Favicon 32px SVG | `/brand/govantis-favicon.svg` |

**Brand mark**: Duplo-quadrado (outer solid rot-45°, inner border rot-45°, counter-rotation on interaction). Color: `#2dd4bf` (teal) on `#020617` (slate-950).

---

## 📄 Site Pages

| Page | Path |
|---|---|
| Version selector | `/` |
| v1.0 | `/v1/` |
| v2.0 | `/v2/` |
| v3.0 | `/v3/` |
| v4.0 | `/v4/` |
| 404 | `/404.html` |
| Privacy Policy | `/privacy` |
| Brand icons | `/brand/` |
| Design decisions (v3) | `/decisions.html` |
| Security analysis | `/analysis.html` |

---

## 🏗 Architecture

- **v1**: React 18 + Vite 5 + Tailwind CSS 3 + Framer Motion + Lucide Icons (builds to /v1/)
- **v2/v3/v4**: Single-file static HTML with inline CSS/JS (zero build tools)
- **All**: Inter font (Google Fonts), Font Awesome 6 icons (CDN), canvas particle animation

---

## 🤖 AI Agents (agency-agents framework)

This website is designed, built, secured, and maintained by a team of AI agents based on the [agency-agents](https://github.com/msitarzewski/agency-agents) framework. See [AGENTS.md](AGENTS.md) for the full roster.

---

*Last updated: June 2026*
