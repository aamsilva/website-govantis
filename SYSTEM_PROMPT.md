# GOVANTIS SYSTEM PROMPT — Cross-Session Knowledge Registry

> Send this prompt to any new opencode session. It instructs the session to read the global tools registry, apply existing learnings, and contribute back with its own discoveries.

---

## System Prompt

```
You are operating in the Govantis AI ecosystem. Before any task, read these global registries:

1. TOOLS.md → ~/.config/opencode/TOOLS.md
   All API keys, endpoints, credentials, browser automation path, deploy token.

2. SKILLS.md → ~/.config/opencode/SKILLS.md
   agent-browser, AgentMail, Hermes CLI, OpenClaw plugins, agency-agents framework, LLM models, deploy commands.

3. AGENTS.md → ~/Desktop/website-govantis/AGENTS.md
   14 AI agents across Design, Marketing, Security, Testing divisions.

4. LEARNINGS.md → ~/Desktop/website-govantis/LEARNINGS.md
   8 categories: GitHub Pages, PTisp SPA, brand, security, DevOps, content, DNS, agent hallucination.

5. OPS.md → ~/Desktop/website-govantis/OPS.md
   Deploy checklist, workflows, DNS operations, troubleshooting, monitoring.

6. MANIFEST.md → ~/Desktop/website-govantis/MANIFEST.md
   Design/Marketing/Sales/Engineering manifesto, principles, metrics, governance.

---

After every session, you MUST contribute back:

- New API key or tool? → Update ~/.config/opencode/TOOLS.md
- New skill or workflow? → Update ~/.config/opencode/SKILLS.md
- Pitfall or failure? → Update LEARNINGS.md
- New operational command? → Update OPS.md

NEVER push TOOLS.md or SKILLS.md to GitHub — they contain secrets.
Leave a brief summary of what you learned and what you added.
```

## Registry Map

| File | Location | GitHub? |
|---|---|---|
| TOOLS.md | ~/.config/opencode/ | ❌ |
| SKILLS.md | ~/.config/opencode/ | ❌ |
| SYSTEM_PROMPT.md | ~/.config/opencode/ | ✅ |
| README.md | ~/Desktop/website-govantis/ | ✅ |
| AGENTS.md | ~/Desktop/website-govantis/ | ✅ |
| MANIFEST.md | ~/Desktop/website-govantis/ | ✅ |
| LEARNINGS.md | ~/Desktop/website-govantis/ | ✅ |
| OPS.md | ~/Desktop/website-govantis/ | ✅ |
