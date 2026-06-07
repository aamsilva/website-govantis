# AGENTS.md — Govantis AI Agency Roster

This document catalogs all AI agents deployed to design, build, secure, brand, and communicate the Govantis website (v1 through v4). Each agent is sourced from or modeled after the [agency-agents](https://github.com/msitarzewski/agency-agents) framework by [msitarzewski](https://github.com/msitarzewski).

---

## 🎨 Design Division (7 agents)

### 1. Brand Guardian
- **Source**: `design/design-brand-guardian.md`
- **Role**: Brand identity, color system, typography, logo strategy, brand voice
- **Contribution v1→v4**: Defined the duplo-quadrado brand mark as the single source of truth. Removed "Consulting" and "Advisory" from brand name. Established teal (#2dd4bf) as primary accent. Created consistency mandate across all versions.
- **Key Decision**: "The brand mark is not the logo — it's the promise. The duplo-quadrado communicates governance + innovation in a single visual unit."

### 2. UX Architect
- **Source**: `design/design-ux-architect.md`
- **Role**: CSS design tokens, layout framework, responsive breakpoints, component hierarchy, information architecture
- **Contribution v1→v4**: Established the container/grid system. Defined the 6-section structure for v4. Created the 3-step process pattern (Understand → Align → Execute). Enforced `<main>` landmark for accessibility.
- **Key Decision**: "Every section has one job. No section competes with another. Content hierarchy maps to the natural question flow of a B2B buyer."

### 3. UI Designer
- **Source**: `design/design-ui-designer.md`
- **Role**: Visual interface design, glassmorphism system, component states, accessibility (WCAG AA), design tokens
- **Contribution v1→v4**: Built the glassmorphism card system. Designed hover states, focus indicators, and micro-interactions. Established the spacing and radius token system.
- **Key Decision**: "Glassmorphism conveys technological sophistication without visual weight. The transparency allows the canvas background to remain visible — the site breathes."

### 4. Visual Storyteller
- **Source**: `design/design-visual-storyteller.md`
- **Role**: Visual narratives, multimedia content, canvas animations, scroll-triggered effects, emotional journey mapping
- **Contribution v1→v4**: Created the canvas particle network animation. Designed the scroll-triggered logo counter-rotation. Built staggered fade-up reveals with IntersectionObserver. Replaced Unsplash images with self-hosted inline SVGs (telecom-infra, ai-network).
- **Key Decision**: "The particle network represents interconnected telecom infrastructure — nodes and edges, like the systems Govantis works with. Transparency = independence."

### 5. Whimsy Injector
- **Source**: `design/design-whimsy-injector.md` *(implicit)*
- **Role**: Personality injection, micro-interactions, brand delight
- **Contribution**: The logo counter-rotation animation that responds to scroll direction. The pulse animations in the hero section.

### 6. Inclusive Visuals Specialist
- **Source**: `design/design-inclusive-visuals-specialist.md` *(implicit)*
- **Role**: Cultural sensitivity, bias mitigation
- **Contribution**: Ensured the Lisbon address and European identity are consistently represented. Removed US-centric references (Philadelphia) when clarified.

### 7. Persona Walkthrough Specialist
- **Source**: `design/design-persona-walkthrough.md` *(implicit)*
- **Role**: Persona-driven cognitive walkthroughs
- **Contribution**: Validated that v4's "Who It's For" section resonates across 4+ stakeholder personas (Executive, Technology, Product, Strategy & Investment).

---

## ✍️ Marketing Division (2 agents)

### 8. Content Creator
- **Source**: `marketing/marketing-content-creator.md`
- **Role**: Multi-platform content strategy, copywriting, brand storytelling, CTA design
- **Contribution v1→v4**: Wrote the hero headline for v4 ("We Translate Platform Complexity into Business Outcomes"). Developed the 3-pillar content structure. Created the "Who It's For" section personas. Wrote the process steps (Understand → Align → Execute).
- **Key Decision**: "Name the technologies. Name the partners. Be specific. 'RDK, prplOS, OpenWrt, Android TV' is worth more than 10 paragraphs of generic claims."

### 9. PR & Communications Manager
- **Source**: `marketing/marketing-pr-communications-manager.md`
- **Role**: Executive tone, message discipline, stakeholder communications, international framing
- **Contribution v1→v4**: Eliminated "CEO/CTO" exclusive language. Established the 3-message rule for every initiative. Ensured tone works for both European and North American audiences. Removed jargon ("synergistic," "holistic," "empowers").
- **Key Decision**: "Message discipline is non-negotiable. Three key messages per section, maximum. Audiences remember three things. Everything else is noise."

---

## 🛡️ Security Division (4 agents)

### 10. Security Architect
- **Source**: `security/security-architect.md`
- **Role**: Threat modeling, secure-by-design architecture, defense-in-depth, trust-boundary analysis
- **Contribution**: Designed the Content-Security-Policy for all 4 versions. Established `frame-ancestors 'none'`. Specified the security header hardening across all static pages.
- **Key Decision**: "CSP is the most impactful single security control for static sites. Without it, any XSS has unlimited blast radius. With it, even a successful injection is contained."

### 11. Application Security Engineer
- **Source**: `security/security-appsec-engineer.md`
- **Role**: SDLC security, secure code review, supply chain audit, SAST
- **Contribution**: Audited all CDN dependencies. Flagged missing SRI. Identified inline event handlers. Checked for `innerHTML` and `document.write()` patterns. Validated no secrets in source code.
- **Key Decision**: "Google Fonts and Font Awesome are trusted providers. The CDN risk is accepted for static sites where SRI cannot be practically maintained."

### 12. Penetration Tester
- **Source**: `security/security-penetration-tester.md`
- **Role**: External attack surface mapping, exploitation simulation, OSINT
- **Contribution**: Mapped exposed email addresses (info@govantis.pt). Identified tabnabbing risk on external links. Audited `rel="noopener noreferrer"` coverage. Simulated clickjacking via missing frame protection.
- **Key Decision**: "Email addresses in `mailto:` links are legitimate contact vectors, not vulnerabilities. The risk is spam — not a security exploit."

### 13. Compliance Auditor
- **Source**: `security/security-compliance-auditor.md`
- **Role**: SOC 2, ISO 27001, HIPAA, GDPR compliance auditing, evidence collection
- **Contribution**: Flagged GDPR non-compliance (no privacy policy). Referenced European Accessibility Act (EAA 2025). Created the privacy policy page with GDPR-compliant language covering data processing, third-party services, and user rights.
- **Key Decision**: "A European company without a privacy policy isn't just non-compliant — it signals to procurement departments that due diligence wasn't done."

---

## ♿ Testing Division (1 agent)

### 14. Accessibility Auditor
- **Source**: `testing/testing-accessibility-auditor.md`
- **Role**: WCAG 2.2 AA auditing, screen reader testing, keyboard navigation, semantic HTML
- **Contribution**: Audited all versions for missing `<main>` landmark. Checked alt text on images. Verified focus visibility. Assessed heading hierarchy. Tested keyboard navigation patterns.
- **Key Decision**: "A green Lighthouse score does not mean accessible. Custom components are guilty until proven innocent. Semantic HTML before ARIA — the best ARIA is the ARIA you don't need."

---

## 🗂️ Agent Hierarchy for Govantis

```
Govantis Website
├── 🎨 Design Division
│   ├── Brand Guardian (brand identity, color, typography)
│   ├── UX Architect (layout, tokens, IA)
│   ├── UI Designer (glassmorphism, components, polish)
│   ├── Visual Storyteller (canvas, animations, SVGs)
│   ├── Whimsy Injector (delight, micro-interactions)
│   ├── Inclusive Visuals Specialist (cultural sensitivity)
│   └── Persona Walkthrough Specialist (stakeholder validation)
├── ✍️ Marketing Division
│   ├── Content Creator (copy, narrative, CTAs)
│   └── PR & Communications Manager (tone, message discipline)
├── 🛡️ Security Division
│   ├── Security Architect (CSP, threat modeling)
│   ├── Application Security Engineer (code review, supply chain)
│   ├── Penetration Tester (exploit simulation, OSINT)
│   └── Compliance Auditor (GDPR, EAA, privacy)
└── ♿ Testing Division
    └── Accessibility Auditor (WCAG, screen readers, keyboard)
```

---

## 🔄 Agent Activation Workflow

```
v1 (React) → built manually, no agents
v2 (HTML)  → generated by Gemini, deployed manually
v3 (HTML)  → Brand Guardian + UX Architect + UI Designer + Visual Storyteller + Content Creator + PR & Comms
v4 (HTML)  → All 14 agents, full creative freedom, multi-stakeholder design
Hardening  → Security Architect + AppSec Engineer + Penetration Tester + Compliance Auditor + Accessibility Auditor
Analysis   → All agents in honest/brutal assessment mode (see analysis.html)
```

---

## 📚 Agent Sources

All agents sourced from [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) (public, MIT license):

| Source Directory | Files Used |
|---|---|
| `design/` | `design-brand-guardian.md`, `design-ux-architect.md`, `design-ui-designer.md`, `design-visual-storyteller.md`, `design-whimsy-injector.md`, `design-inclusive-visuals-specialist.md`, `design-persona-walkthrough.md` |
| `marketing/` | `marketing-content-creator.md`, `marketing-pr-communications-manager.md` |
| `security/` | `security-architect.md`, `security-appsec-engineer.md`, `security-penetration-tester.md`, `security-compliance-auditor.md` |
| `testing/` | `testing-accessibility-auditor.md` |

---

*Manifest last updated: June 2026*
