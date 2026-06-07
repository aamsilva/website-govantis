# OPS.md — Operations Runbook

How to evolve, deploy, secure, and maintain the Govantis website.

---

## Quick Reference

| Resource | Location |
|---|---|
| **Website** | `https://www.govantis.pt` |
| **GitHub repo** | `github.com/aamsilva/website-govantis` |
| **DNS panel** | `my.ptisp.pt` (see PTISP.md for credentials) |
| **Deploy branch** | `gh-pages` |
| **Source branch** | `main` (v1 React source) |
| **Deploy worksapce** | `/tmp/gh-pages-deploy/` |
| **HTML versions (v2/v3/v4)** | `/tmp/govantis-v{N}/index.html` |
| **Brand assets** | `/tmp/govantis-assets/` |
| **Node.js** | `/opt/homebrew/bin/node` |

---

## Deploy Checklist

Before every deploy, verify:

- [ ] No "Advisory" or "Consultancy" in HTML text
- [ ] Email is `info@govantis.pt` everywhere
- [ ] Address is `Rua Castilho, n.º 39, 8.º E, 1250-068 Santo António, Lisboa`
- [ ] No external image URLs (no `unsplash.com`, no `vite.svg`)
- [ ] CSP meta tag present
- [ ] `nosniff` meta tag present
- [ ] `frame-ancestors 'none'` in CSP
- [ ] `<main>` landmark wrapping content
- [ ] `focus-visible` styles present
- [ ] Privacy link in footer
- [ ] Logo is duplo-quadrado (NOT the SVG shields from v2)
- [ ] All links resolve (no dead `href="#"` on CTAs)
- [ ] No hallucinated claims ("3 AM debugging", "presented roadmaps to boards", etc.)
- [ ] `.nojekyll` file present in gh-pages root
- [ ] 404.html present in gh-pages root

---

## Deploy Workflows

### Deploy Static HTML (v2, v3, v4)

```bash
# 1. Edit the version file
nano /tmp/govantis-v{N}/index.html

# 2. Copy to deploy workspace
cp /tmp/govantis-v{N}/index.html /tmp/gh-pages-deploy/v{N}/

# 3. Deploy
cd /tmp/gh-pages-deploy
git add -A
git commit -m "Update v{N}: describe change"
git push origin HEAD:gh-pages --force

# 4. Re-add custom domain (ALWAYS after force push)
curl -s -X PUT \
  -H "Authorization: token $GH_TOKEN" \
  "https://api.github.com/repos/aamsilva/website-govantis/pages" \
  -H "Content-Type: application/json" \
  -d '{"cname":"www.govantis.pt"}'

# 5. Wait for build (30-60s) then verify
sleep 20
curl -sL "https://www.govantis.pt/v{N}/" | head -5
```

### Rebuild v1 (React)

```bash
# 1. Edit source
nano ~/Desktop/website-govantis/src/App.jsx

# 2. Rebuild
export PATH="/opt/homebrew/bin:$PATH"
cd ~/Desktop/website-govantis
npm run build

# 3. Copy dist to deploy workspace
cp -r dist/* /tmp/gh-pages-deploy/v1/

# 4. Deploy (same as static deploy above)
cd /tmp/gh-pages-deploy
git add -A
git commit -m "Rebuild v1: describe change"
git push origin HEAD:gh-pages --force

# 5. Commit source to main
cd ~/Desktop/website-govantis
git add -A
git commit -m "v1 source: describe change"
git push origin main

# 6. Re-add custom domain
curl -s -X PUT \
  -H "Authorization: token $GH_TOKEN" \
  "https://api.github.com/repos/aamsilva/website-govantis/pages" \
  -H "Content-Type: application/json" \
  -d '{"cname":"www.govantis.pt"}'
```

### Create New Version (e.g., v5)

```bash
# 1. Create version directory
mkdir -p /tmp/govantis-v5

# 2. Write index.html (copy from v4 as template, or create new)
cp /tmp/govantis-v4/index.html /tmp/govantis-v5/index.html

# 3. Edit the new version
nano /tmp/govantis-v5/index.html

# 4. Deploy
cp /tmp/govantis-v5/index.html /tmp/gh-pages-deploy/v5/
cd /tmp/gh-pages-deploy
git add v5/
git commit -m "Add v5.0 deployment"
git push origin HEAD:gh-pages --force

# 5. Add to root selector
# Edit /tmp/gh-pages-deploy/index.html → add v5 link → deploy again

# 6. If using React: set base path in vite.config.js to '/v5/' before build
```

### Update Root Version Selector

```bash
nano /tmp/gh-pages-deploy/index.html
# Add/remove version links, deploy
cd /tmp/gh-pages-deploy
git add index.html
git commit -m "Update version selector"
git push origin HEAD:gh-pages --force
```

---

## DNS Operations (via PTisp)

See [PTISP.md](PTISP.md) for full credentials and navigation.

### Quick DNS Change

```bash
# The DNS zone editor is at:
# PTisp → Domínios → govantis.pt DETALHES → Parqueamento → Gestor de DNS accordion → [tab] → INSERIR or gear icon → Editar

# For automated DNS changes, use agent-browser:
export PATH="/opt/homebrew/bin:$PATH"
# (Follow the PTISP.md agent-browser workflow)
```

### Redirect apex → www (pending)

The apex domain `govantis.pt` still points to PTisp IP. To redirect to GitHub Pages:

**Option A — Change A records to GitHub Pages IPs:**
```
govantis.pt A 185.199.108.153
govantis.pt A 185.199.109.153
govantis.pt A 185.199.110.153
govantis.pt A 185.199.111.153
```

**Option B — Keep A records, configure PTisp redirect:**
Check PTisp "Redirecionar" option under Parqueamento tab.

---

## Troubleshooting

### Site shows PTisp placeholder
1. Check DNS: `dig www.govantis.pt CNAME +short` → should return `aamsilva.github.io`
2. Check GitHub Pages status: `curl -s -H "Authorization: token $GH_TOKEN" "https://api.github.com/repos/aamsilva/website-govantis/pages" | python3 -c "import json,sys;d=json.load(sys.stdin);print(d.get('cname'),d.get('status'))"`
3. If CNAME is missing, re-add custom domain (see deploy workflow step 4)
4. If DNS is wrong, fix in PTisp panel

### Site shows "Site not found · GitHub Pages"
1. Check gh-pages branch has content: verify `index.html`, `.nojekyll` and version subdirs exist
2. Check Pages API status (see above)
3. Try `git push origin HEAD:gh-pages --force` to trigger rebuild

### HTTPS certificate error
1. Check `https_enforced` in Pages API
2. Wait (Let's Encrypt provisioning takes minutes to hours)
3. If stuck > 24h, remove and re-add custom domain

### Build status "errored"
1. Check if `.nojekyll` exists in gh-pages root
2. Check build error: `curl -s -H "Authorization: token $GH_TOKEN" "https://api.github.com/repos/aamsilva/website-govantis/pages/builds" | python3 -c "import json,sys;b=json.load(sys.stdin)[0];print(b.get('error',{}).get('message','no error'))"`
3. Force push a new commit (even dummy) to trigger fresh build

### 404 page shows white background
1. Verify `404.html` exists: `curl -s "https://raw.githubusercontent.com/aamsilva/website-govantis/gh-pages/404.html" | head -5`
2. Verify CSP allows inline styles: should have `style-src 'self' 'unsafe-inline'`
3. Verify background color: `grep '#020617' 404.html`
4. Test: `curl -sL "https://www.govantis.pt/nonexistent" | grep '020617'`

---

## Monitoring

### Health Check Commands

```bash
# Check all versions are alive
for v in v1 v2 v3 v4; do
  code=$(curl -sL -o /dev/null -w "%{http_code}" "https://www.govantis.pt/$v/")
  echo "$v: $code"
done

# Check 404 page
curl -sL -o /dev/null -w "%{http_code}" "https://www.govantis.pt/this-does-not-exist"

# Check privacy policy
curl -sL -o /dev/null -w "%{http_code}" "https://www.govantis.pt/privacy"

# Check DNS
dig www.govantis.pt CNAME +short

# Check GitHub Pages status
curl -s -H "Authorization: token $GH_TOKEN" \
  "https://api.github.com/repos/aamsilva/website-govantis/pages" | \
  python3 -c "import json,sys;d=json.load(sys.stdin);print(d.get('status'),d.get('cname'))"
```

---

## Security Runbook

### Rotate GitHub Token
If the token is compromised:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Revoke `$GH_TOKEN`
3. Generate new token with `repo` scope
4. Update all references in:
   - `/tmp/gh-pages-deploy` git remote
   - All curl commands in this runbook
   - PTisp automation scripts

### Review deployed secrets
```bash
# Check no secrets in deployed files
grep -r "gho_\|ghp_\|sk-\|eyJ" /tmp/gh-pages-deploy/
# Should return nothing
```

### Update CSP if adding new CDN
If adding a new CDN dependency, update the CSP in the meta tag to include the new domain in `style-src`, `font-src`, or `script-src`.

---

## Agent Workflow

### Before Asking Agents for Changes
1. Specify which agents to use (or "all 14")
2. Provide factual context (no fictional details)
3. Define constraints (tone, content boundaries, technical limits)
4. Ask agents to document their decisions

### Agent Authority Chain
```
Brand Guardian → Final say on identity, color, typography
PR & Comms Manager → Final say on tone, messaging
Security Architect → Final say on CSP, headers, hardening
UX Architect → Final say on layout, IA, responsiveness
Content Creator → Final say on copy, CTAs
```


*Last updated: June 2026*
