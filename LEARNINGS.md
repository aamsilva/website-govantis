# LEARNINGS.md — Lessons Learned

Hard-won insights from building, deploying, breaking, and fixing govantis.pt across 4 versions.

---

## 1. GitHub Pages

### Force Pushes Kill the Custom Domain
**Problem**: Every `git push --force` to the `gh-pages` branch **removes** the custom domain CNAME configuration.  
**Symptom**: Site reverts to `aamsilva.github.io/website-govantis/` or shows GitHub's 404.  
**Fix**: After every force push, re-run:
```bash
curl -s -X PUT -H "Authorization: token $GH_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/aamsilva/website-govantis/pages" \
  -H "Content-Type: application/json" \
  -d '{"cname":"www.govantis.pt"}'
```
**Prevention**: Use `git push origin HEAD:gh-pages` without `--force` if possible. Only force-push when the branch history must be rewritten.

### Build Status "errored" is Often Benign
**Problem**: GitHub Pages shows `status: errored` repeatedly.  
**Cause**: The custom domain CNAME addition triggers a new build commit that can conflict with existing state. Also, missing `.nojekyll` file causes Jekyll to try processing the site and fail on module scripts.  
**Fix**: Add `.nojekyll` to the gh-pages branch root. The site often works despite the "errored" status — always test with `curl` or a browser.
```bash
touch .nojekyll
git add .nojekyll
git commit -m "Disable Jekyll"
git push origin HEAD:gh-pages --force
```

### Custom Domain HTTPS Takes Time
**Problem**: After adding custom domain, HTTPS shows certificate mismatch (GitHub's `*.github.io` cert served for `www.govantis.pt`).  
**Cause**: Let's Encrypt cert provisioning is async — takes minutes to hours after DNS CNAME is detected.  
**Fix**: Wait. Check `https_enforced` in the Pages API. If it stays false after 24h, remove and re-add the custom domain.

### 404.html Must Be at Root
**Problem**: Custom 404 page works only for the custom domain, not for `.github.io` URL.  
**Cause**: GitHub serves custom 404.html only when accessed via the configured custom domain.  
**Fix**: Always test 404 pages via `https://www.govantis.pt/nonexistent`, not via the `.github.io` URL.

### gh-pages Branch Structure Dictates URL Structure
**Problem**: `/v1/index.html` requires visiting `/v1/`, not `/v1`.  
**Cause**: GitHub Pages serves directories based on `index.html` files. Without trailing slash, it may not resolve.  
**Fix**: Always use trailing slashes in internal links (`/v1/`, not `/v1`).

---

## 2. PTisp Panel

### SPA Navigation is Fragile
**Problem**: The Vue.js SPA ignores direct URL navigation and `element.click()` events.  
**Cause**: Vue Router history mode + Bootstrap-Vue accordion components use custom event handlers that native `click()` doesn't trigger.  
**Fix**: Use `dispatchEvent(new MouseEvent(...))` or the Vue 2 router instance directly: `document.querySelector('#app').__vue__.$router.push(...)`.

### Gestor de DNS is Hidden Under "Parqueamento"
**Problem**: DNS Zone Editor is not in "Gestão" tab — it's in "Parqueamento" tab → "Gestor de DNS" accordion.  
**Discovery**: Took extensive trial and error to find. The accordion is collapsed by default and the click target is the `.card-header` div, not the visible text.

### Accordion Expansion Needs MouseEvent, Not click()
**Problem**: Clicking the "Gestor de DNS" heading with `element.click()` doesn't expand.  
**Cause**: MDBootstrap accordion uses `data-toggle="collapse"` and requires a full mouse event cycle.  
**Fix**: Dispatch `mousedown`, `mouseup`, `click`, and `pointerdown` events sequentially:
```js
['click', 'mousedown', 'mouseup', 'pointerdown'].forEach(type => {
  header.dispatchEvent(new MouseEvent(type, {bubbles: true, cancelable: true, view: window}));
});
```

### Tab Switching Needs DOM-level Click
**Problem**: Clicking CNAME tab doesn't change the visible table.  
**Cause**: The tab component updates Vue state, not DOM directly. Native `click()` may not trigger Vue's event system.  
**Fix**: Use `document.querySelector('.nav-link').click()` AND `.dispatchEvent(new MouseEvent(...))` together. Sometimes removing `.active` class and re-adding it programmatically also works as fallback.

### No Hosting = No FTP
**Problem**: No way to upload files to PTisp server.  
**Cause**: Account has 0 active hosting services — domain-only plan.  
**Impact**: Cannot use PTisp for hosting. GitHub Pages is the only option. DNS management works at domain level via nameservers.

---

## 3. Brand & Content

### Two Logos = Brand Confusion
**Problem**: v2 used a Gemini-generated SVG shields logo. v1, v3, v4 use the duplo-quadrado logo.  
**Impact**: Visitor seeing v2 sees a different brand mark. Inconsistent brand = amateur perception.  
**Fix**: Document the duplo-quadrado as the single source of truth in AGENTS.md and MANIFEST.md. Deprecate v2 or fix its logo.

### "Advisory" is a Phantom Word
**Problem**: After deciding to remove "Consulting" and "Advisory" from the brand, remnants persisted in v1 (C-level advisory), v2 (Govantis Advisory in footer), and v3 (European advisory in hero).  
**Root cause**: Changes applied incrementally across versions without regression check.  
**Fix**: grep all deployed files for forbidden terms before every deploy.

### External Images Break
**Problem**: Unsplash image URLs were embedded in v2, v3, v4. If Unsplash goes down, images break. If the specific photo ID changes, the image breaks.  
**Fix**: Replace all external images with inline SVGs (self-contained, zero network dependency). Created `telecom-infra.svg` and `ai-network.svg` as permanent replacements.

### Vite Favicon Doesn't Exist in Deploy
**Problem**: v1's `dist/index.html` references `/vite.svg` which is a Vite dev artifact. It doesn't exist in production.  
**Fix**: Replace `<link rel="icon" href="/vite.svg">` with an inline SVG data URI in the HTML template.

---

## 4. Security

### CSP Is the Most Impactful Single Control
**Problem**: All 4 versions shipped without CSP. XSS blast radius = unlimited.  
**Fix**: Added `Content-Security-Policy` meta tag to every page. Pragmatic policy: `'unsafe-inline'` for scripts/styles (required for inline CSS/JS in static sites), strict on other directives.

### SRI is Impractical for Static Sites on GitHub Pages
**Problem**: CDN resources (Google Fonts, Font Awesome) lack Subresource Integrity hashes.  
**Constraint**: GitHub Pages is static hosting — no build pipeline to compute hashes dynamically.  
**Acceptance**: The risk is accepted. Google and Cloudflare are trusted CDN providers. Mitigations: `preconnect` hints for performance, CSP restricts which domains can load.

### GDPR Requires Privacy Policy
**Problem**: European company (Lisbon-based) without privacy policy = non-compliant.  
**Fix**: Created privacy policy covering: identity, data collection (none), third-party services (Google Fonts, Font Awesome CDN, GitHub Pages), user rights under GDPR. Hosted at `/privacy`.

### `frame-ancestors 'none'` Prevents Clickjacking
**Problem**: Site can be embedded in iframes (clickjacking risk).  
**Fix**: Added to CSP: `frame-ancestors 'none'`. This prevents any framing of the site.

---

## 5. DevOps & Automation

### Agent-Browser Can Automate SPA Interactions
**Problem**: PTisp panel is a Vue SPA that resists conventional automation.  
**Solution**: `agent-browser` with snapshot → click/type on refs → re-snapshot workflow can navigate SPAs that curl/selenium struggle with. Key: always re-snapshot after navigation because refs are invalidated.

### Node.js is Not Always Available
**Problem**: `npm run build` fails if Node.js is not in PATH.  
**Discovery**: Node.js v25.6.1 exists at `/opt/homebrew/bin/node` but is not on default PATH in the AI agent environment.  
**Fix**: Always prefix commands with `export PATH="/opt/homebrew/bin:$PATH"` when using node/npm.

### Deploy via Temp Git Repo for Clean gh-pages
**Problem**: The main repo's node_modules contaminates git operations.  
**Solution**: Use a separate `/tmp/gh-pages-deploy` directory initialized as a fresh git repo, with only the files that should be on the gh-pages branch. Push with `origin HEAD:gh-pages --force`.

### Version Subdirectories Need Base Path
**Problem**: v1 React build with `base: '/v1/'` in vite.config.js. Without it, JS assets point to wrong paths.  
**Solution**: Always set `base: '/v{N}/'` in vite.config.js before build. For static HTML, ensure internal links use relative paths (`../v2/`) where possible, or absolute paths from root (`/v2/`).

---

## 6. Content & Messaging

### Naming Technologies > Generic Claims
**Problem**: "Deep technical expertise" sounds like every other consulting firm.  
**Insight**: "RDK, prplOS, OpenWrt, Android TV" communicates more in one line than 10 paragraphs of generic claims. The right readers recognize these names instantly.  
**Lesson**: Always favor specific references over adjectives.

### Stakeholder Filtering Reduces Audience
**Problem**: v3's "Whether you're a CEO... or a CTO..." implies those are the only people who should contact us.  
**Insight**: A platform decision in a telco involves 20+ stakeholders. Filtering by title alienates potential champions.  
**Fix**: v4's "Who It's For" section lists 4+ persona groups and ends with "and everyone who touches platform strategy."

### "View Case Studies" Without Case Studies Hurts Credibility
**Problem**: v1 has a "View Case Studies" button that goes nowhere.  
**Insight**: A broken promise is worse than no promise. Every dead link tells the visitor "we cut corners."  
**Fix**: Remove or link to actual content. Never deploy a link that doesn't resolve.

---

## 7. DNS

### Apex Domain is Different from WWW
**Problem**: `www.govantis.pt` → CNAME → GitHub Pages works. But `govantis.pt` (apex) → A → PTisp IP still shows the PTisp placeholder.  
**Lesson**: Always check both `www` and apex. For apex redirect on GitHub Pages, use A records pointing to GitHub Pages IPs or configure a redirect at the DNS level.

### DNS TTL = 300 Means Fast Propagation
**Problem**: DNS changes took effect within 5 minutes.  
**Insight**: PTisp's default TTL of 300 seconds is low — good for rapid iteration. No need to wait 24h.

### Google Workspace MX/TXT Must Be Preserved
**Problem**: When modifying DNS, don't touch MX and TXT records.  
**Insight**: The domain has Google verification records. Removing them breaks email.  
**Lesson**: Always snapshot all DNS records before making changes.

---

## 8. Agent Collaboration

### Agents Need Clear Briefs
**Problem**: Giving "full creative freedom" to Content Creator without specifying factual boundaries led to hallucinated text ("debugged production outages at 3 AM").  
**Fix**: Always provide factual context. Creative freedom = freedom in how to present facts, not freedom to invent them.

### Agent Hierarchy Prevents Conflicts
**Problem**: Multiple design agents could propose conflicting color schemes.  
**Solution**: Brand Guardian has final authority on identity. UX Architect has final authority on layout. This prevents circular debates.

### Security Should Never Be Optional
**Problem**: First 3 versions shipped without CSP, nosniff, or privacy policy.  
**Solution**: Security Architect + Compliance Auditor must review every version before deploy. Add to the deploy checklist.

---

---

## 8. Text Wrapping in Constrained Grids

### `clamp()` at Large Sizes + Hyphenated Text = Unintended Wrap
**Problem**: `.stat .num` used `font-size: clamp(2rem, 4vw, 3.5rem)` inside a 3-column grid. "C-Level" (7 chars with hyphen) rendered at ~51px in a ~140px column, causing a line break at the hyphen ("C-" on line 1, "Level" on line 2). The hyphen is a valid soft-hyphen breakpoint that browsers use for overflow prevention.

**Root cause**: Font-size uses fluid `vw` units that grow faster than the grid column width shrinks. No agent validated actual text rendering at real viewport widths — content length vs. container width vs. font-size is a **cross-cutting concern** between UX Architect (layout), UI Designer (typography), and Content Creator (copy length). No single agent owned this intersection.

**Fix**: `white-space: nowrap` on `.stat .num` prevents any stat value from wrapping, regardless of viewport or font-size.

**Lesson**: Any text at `clamp(≥2rem, vw, ≥3rem)` in a multi-column grid must be checked for wrapping. Add `white-space: nowrap` by default on stat/hero number elements — they are single-value displays, not paragraphs. Add a checklist item: "Verify all stat blocks render on one line across breakpoints."

**Affected**: v7–v14 (all had the same bug). Fixed in v15.

---

*Last updated: June 2026*
