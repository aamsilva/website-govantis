# PTISP.md — Operations Guide

How to manage DNS for `govantis.pt` via the PTisp panel (`my.ptisp.pt`).

---

## Access

| Item | Value |
|---|---|
| **URL** | `https://my.ptisp.pt` |
| **Email** | `aamsilva@gmail.com` |
| **Password** | `H8memg26!?` |
| **Client ID** | `166695` |

---

## Panel Navigation (SPA — Vue.js)

The PTisp panel is a **Vue.js Single Page Application** with Bootstrap-Vue components. It uses Vue Router history mode. Direct URL navigation does NOT work — you must navigate through the UI.

### How to Reach DNS Zone Editor

```
1. Login at https://my.ptisp.pt
2. Homepage → Sidebar → "Domínios" (or click "1 Domínios" link)
3. In domain list → click "DETALHES" next to govantis.pt
4. Bottom tabs → click "Parqueamento"
5. In the accordion blocks → click "Gestor de DNS" heading to expand
   (This is a Bootstrap accordion — click the card-header to expand)
6. Now you see tabs: A (3) | CNAME (3) | MX (1) | TXT (4) | NS (2) | SRV (0)
7. Click tab name to switch record type
8. Use "INSERIR" to add a record, or click ⚙ icon + "Editar" to modify
```

### UI Quirks (Lessons Learned)

| Quirk | Workaround |
|---|---|
| Accordion "Gestor de DNS" is hard to expand with clicks | Use JS: find `.card-header`, dispatch `MouseEvent('click')` |
| Tab clicks don't always trigger | Use JS: `document.querySelector('.nav-link').click()` |
| "Opções" dropdown button shows `expanded=false` and ignores clicks | Not used for DNS — ignore it |
| Gear icon ⚙ on each DNS row opens dropdown | Click the gear icon cell, then find `.dropdown-menu` and click `a` with "Editar" |
| Page refresh resets accordion state | Always navigate fresh: Parqueamento → expand Gestor de DNS → select tab |
| Direct URL navigation (`/domains/govantis.pt/dnsrecords/insert`) redirects back | Must use UI flow |

### Programmatic Access (agent-browser)

```bash
export PATH="/opt/homebrew/bin:$PATH"

# Login
agent-browser open "https://my.ptisp.pt"
agent-browser snapshot -i
agent-browser fill @<email-ref> "aamsilva@gmail.com"
agent-browser fill @<password-ref> "H8memg26!?"
agent-browser click @<login-btn-ref>
agent-browser wait --load networkidle

# Go to domains
agent-browser open "https://my.ptisp.pt/domains"
agent-browser wait --load networkidle

# Click domain details
agent-browser click @<detalhes-ref>
agent-browser wait --load networkidle

# Click Parqueamento tab
agent-browser click @<parqueamento-ref>
agent-browser wait 1500

# Expand Gestor de DNS accordion
agent-browser eval --stdin <<'JSEOF'
document.querySelector('.card-header').dispatchEvent(
  new MouseEvent('click', {bubbles: true, cancelable: true, view: window})
);
JSEOF
agent-browser wait 1000

# Click CNAME tab
agent-browser eval --stdin <<'JSEOF'
document.querySelectorAll('.nav-link').forEach(l => {
  if (l.textContent.includes('CNAME')) l.click();
});
JSEOF

# Now click gear icon on www row, then Edit
agent-browser snapshot -i
# Find gear icon ref for www row → click → find Edit link → click
# Fill Target field → Click GUARDAR
```

---

## Current DNS Records

| Hostname | Type | Target | TTL |
|---|---|---|---|
| `govantis.pt` | A | `109.71.47.21` | 300 |
| `www.govantis.pt` | **CNAME** | `aamsilva.github.io` | 300 |
| `mail.govantis.pt` | A | `109.71.47.21` | 300 |
| `webmail.govantis.pt` | A | `109.71.47.21` | 300 |
| `ftp.govantis.pt` | CNAME | `govantis.pt` | 300 |
| `k6or3n6yvkau.govantis.pt` | CNAME | `gv-3shnlmmq2zcvoh.dv.googlehosted.com` | 300 |
| (MX records) | MX | `smtp.google.com` | — |
| (TXT records) | TXT | Google verification + SPF | — |
| (NS records) | NS | `ns5.mydnspt.net`, `ns6.mydnspt.net` | — |

---

## Common Operations

### Add a new CNAME record
1. Navigate to DNS Zone Editor (Parqueamento → Gestor de DNS)
2. Click "INSERIR"
3. Fill form: Hostname (e.g., `api`), Type: CNAME, Target (e.g., `api.example.com`), TTL: 300
4. Click GUARDAR

### Edit existing record
1. Navigate to the correct tab (A, CNAME, MX, etc.)
2. Click the ⚙ gear icon on the row
3. Click "Editar" in the dropdown
4. Modify the Target or TTL
5. Click GUARDAR

### Redirect apex domain to www (pending)
To make `govantis.pt` (without `www`) redirect to GitHub Pages:
- **Option A**: Change A records to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- **Option B**: Keep A records pointing to PTisp and configure a redirect in PTisp

### Change nameservers
1. Domain details → Gestão tab → Gestor de Nameservers
2. Currently: `ns5.mydnspt.net`, `ns6.mydnspt.net`
3. Change to different NS (e.g., Cloudflare's) and GUARDAR

---

## Account Info

| Field | Value |
|---|---|
| Domains | 1 (`govantis.pt`) |
| Hosting | 0 (no active hosting plan) |
| Services | 0 |
| Domain price | ~22.75 €/year |
| Expiry | 2027-04-29 |

---

*Last updated: June 2026*
