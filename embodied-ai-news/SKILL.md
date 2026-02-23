---
name: embodied-ai-news
description: "Aggregates and summarizes the latest Embodied AI / Robotics news from multiple sources including robotics media, arXiv, company blogs, and web search. Covers humanoid robots, foundation models (VLA, Diffusion Policy, World Model), hardware breakthroughs, commercial deployments, funding, and China ecosystem developments. Provides concise news briefs with direct links to original articles. Activates when user asks for 'embodied AI news', 'robot news', 'humanoid robot updates', '具身智能资讯', or mentions wanting a robotics briefing."
homepage: https://github.com/HeXavi8/skills
---

# Embodied AI News Briefing

> Aggregates the latest Embodied AI & Robotics news from multiple sources and delivers concise summaries with direct links. Covers the full stack: algorithms, hardware, simulation, deployment, funding, policy, and the China ecosystem.

## When to Use This Skill

Activate this skill when the user:

- Asks for embodied AI news, robot news, or humanoid robot updates
- Requests a daily/weekly robotics briefing
- Mentions wanting to know what's happening in embodied AI / robotics
- Asks about specific companies: Tesla Optimus, Figure, Unitree, AGIBOT, Boston Dynamics, etc.
- Asks about specific technologies: VLA models, diffusion policy, sim-to-real, dexterous manipulation
- Wants a summary of recent robotics research papers
- Asks about robotics funding, deployments, or supply chain
- Says: "给我今天的具身智能资讯" (Give me today's embodied AI news)
- Says: "机器人行业有什么新动态" (What's new in the robot industry)
- Says: "最近有什么人形机器人的消息" (Any recent humanoid robot news)
- Says: "embodied AI updates", "robot learning news", "humanoid robot news"

### Trigger Keywords

**English**: `embodied AI`, `humanoid robot`, `robot news`, `robotics update`, `robot learning`, `VLA model`, `diffusion policy`, `dexterous manipulation`, `sim-to-real`, `robot deployment`, `robotics funding`, `Figure AI`, `Tesla Optimus`, `Unitree`, `AGIBOT`, `Boston Dynamics`, `1X`, `Physical Intelligence`, `robot hand`, `quadruped robot`, `Isaac Sim`, `world model robot`

**Chinese**: `具身智能`, `人形机器人`, `机器人资讯`, `灵巧操作`, `仿真到真实`, `机器人部署`, `宇树`, `智元`, `优必选`, `银河通用`, `傅利叶`, `机器人融资`, `灵巧手`, `四足机器人`, `机器人大模型`

---

## Reference Files

This skill relies on 4 companion reference files. Always consult them during execution:

```
📁 references/
├── 📰 news_sources.md       — WHERE to find information (tiered source list)
├── 🔍 search_queries.md     — HOW to search (query templates & recipes)
├── 📝 output_templates.md   — WHAT format to output (6 template variants)
└── 📊 taxonomy.md           — SHARED LANGUAGE (categories, keywords, company list)
```

| File                  | When to Consult                                                     |
| --------------------- | ------------------------------------------------------------------- |
| `news_sources.md`     | Phase 1 — choosing which sites to fetch                             |
| `search_queries.md`   | Phase 1 — building search queries                                   |
| `taxonomy.md`         | Phase 3 — classifying stories; Phase 1 — looking up company aliases |
| `output_templates.md` | Phase 5 — rendering final output                                    |

---

## Workflow Overview

```
Phase 1: Information Gathering
  ├─ 1.1 Fetch robotics media sites (3-5 sources)
  ├─ 1.2 Execute domain-specific web searches (3-5 queries)
  ├─ 1.3 Scan arXiv for recent papers (1-2 queries)
  └─ 1.4 Fetch full articles for top candidates (8-15 URLs)
      ↓
Phase 2: Content Filtering
  ├─ Recency filter (24-48h for daily, 7d for weekly)
  ├─ Relevance filter (must be embodied AI / robotics)
  ├─ Noise exclusion (Roomba, RPA, chatbot, crypto, self-driving)
  └─ Deduplication (same event across multiple outlets)
      ↓
Phase 3: Classification
  └─ Assign each story to 1 primary + 0-2 secondary categories
      (using taxonomy.md § 1: News Category Taxonomy)
      ↓
Phase 4: Prioritization
  ├─ Score: source tier × recency × discussion volume × novelty
  └─ Select top 6-10 stories for daily, 12-18 for weekly
      ↓
Phase 5: Output Formatting
  └─ Render using output_templates.md
      (Standard for daily, Deep for weekly, Brief if user requests)
```

---

## Phase 1: Information Gathering

### Step 1.1: Fetch Primary Embodied AI Sources

Use `mcp__web_reader__webReader` to fetch content from **3-5 sources** per session.

**Source Selection** (refer to `news_sources.md` for full list):

| Priority | Source                 | URL                                         | Why                               |
| -------- | ---------------------- | ------------------------------------------- | --------------------------------- |
| Always   | The Robot Report       | `https://www.therobotreport.com/`           | Best dedicated robotics news site |
| Always   | IEEE Spectrum Robotics | `https://spectrum.ieee.org/topic/robotics/` | Authoritative, technical depth    |
| Always   | TechCrunch Robotics    | `https://techcrunch.com/category/robotics/` | Funding, launches, business       |
| Rotate   | VentureBeat AI         | `https://venturebeat.com/category/ai/`      | Industry analysis                 |
| Rotate   | Synced Review          | `https://syncedreview.com/`                 | China + global AI research        |
| Rotate   | QbitAI (量子位)        | `https://www.qbitai.com/`                   | China ecosystem (Chinese)         |
| Rotate   | Hugging Face Blog      | `https://huggingface.co/blog`               | Open-source model releases        |
| Rotate   | NVIDIA Blog            | `https://developer.nvidia.com/blog/`        | Isaac / GR00T updates             |

**Parameters**:

- `return_format`: markdown
- `with_images_summary`: false
- `timeout`: 20 seconds per source

**Selection Rule**: Always fetch the 3 "Always" sources. Rotate among the "Rotate" sources based on the user's focus area or the day of the week.

---

### Step 1.2: Execute Web Search Queries

Use `WebSearch` with domain-specific queries from `search_queries.md`.

**For Daily Briefing** — use **Recipe A** (5 queries):

```
Q1 — General:
("embodied AI" OR "humanoid robot") AND ("news" OR "announcement") after:[yesterday]

Q2 — Foundation Models:
("robot foundation model" OR "VLA" OR "diffusion policy") AND ("new" OR "paper") after:[yesterday]

Q3 — Key Companies:
("Tesla Optimus" OR "Figure AI" OR "Boston Dynamics" OR "Unitree" OR "AGIBOT") after:[yesterday]

Q4 — Funding:
("robotics funding" OR "robot startup") AND ("raise" OR "funding") after:[7 days ago]

Q5 — Core Media:
site:therobotreport.com OR site:spectrum.ieee.org ("robot") after:[yesterday]
```

**For Weekly Deep Dive** — add **Recipe B** (research) + **Recipe C** (commercial):

```
Q6 — arXiv Research:
site:arxiv.org ("cs.RO") AND ("embodied" OR "VLA" OR "manipulation" OR "humanoid") after:[7 days ago]

Q7 — Algorithms:
("diffusion policy" OR "world model" OR "imitation learning") AND ("robot") after:[7 days ago]

Q8 — Deployments:
("robot deployment" OR "robot factory" OR "warehouse robot") AND ("humanoid" OR "embodied") after:[7 days ago]

Q9 — Supply Chain:
("robot actuator" OR "dexterous hand" OR "robot supply chain") after:[7 days ago]
```

**For China Focus** — add **Recipe D**:

```
Q10: ("Unitree" OR "AGIBOT" OR "UBTECH" OR "Galbot" OR "Fourier") after:[7 days ago]
Q11: ("China humanoid robot" OR "China embodied AI" OR "具身智能" OR "人形机器人") after:[7 days ago]
```

**Date Variable Rules**:

- `[yesterday]` = current date minus 1 day, format: YYYY-MM-DD
- `[7 days ago]` = current date minus 7 days
- `[30 days ago]` = current date minus 30 days
- Always compute dynamically based on the current date at execution time

**Best Practices**:

- Execute 3-5 queries for daily, 8-11 queries for weekly
- Limit to top 10 results per query
- Prioritize results from last 24-48 hours for daily

---

### Step 1.3: Scan arXiv for Recent Papers

Use `WebSearch` with arXiv-specific queries:

```
site:arxiv.org ("cs.RO" OR "cs.AI" OR "cs.LG") AND ("embodied" OR "humanoid" OR "manipulation" OR "VLA" OR "diffusion policy" OR "world model") after:[yesterday]
```

For promising papers found, use `mcp__arxiv__readURL` to fetch full paper content:

- Extract title, authors, abstract, key contributions
- Note if code/model weights are released (open-source flag)
- Check if from a Tier 1 lab (see `taxonomy.md` § 4.3)

---

### Step 1.4: Fetch Full Articles

For the top **8-15 most relevant stories** from Steps 1.1-1.3:

- Extract URLs from search results and site fetches
- Use `mcp__web_reader__webReader` to fetch full article content
- This ensures accurate summarization vs. relying on snippets

**Priority for full fetch**:

1. Stories appearing in multiple search results (high signal)
2. Stories from Tier 1 sources (see `news_sources.md`)
3. Stories mentioning key companies or technologies (see `taxonomy.md`)
4. Stories with funding amounts, deployment numbers, or benchmark results

---

## Phase 2: Content Filtering

### 2.1 Recency Filter

| Briefing Type | Keep             | Remove             |
| ------------- | ---------------- | ------------------ |
| Daily         | Last 24-48 hours | Older than 3 days  |
| Weekly        | Last 7 days      | Older than 10 days |
| Monthly       | Last 30 days     | Older than 45 days |

Exception: Keep older content if it's a landmark paper or announcement that hasn't been covered yet.

### 2.2 Relevance Filter

**Must be about at least one of**:

- Humanoid / legged / mobile manipulation robots
- Robot learning (VLA, RL, IL, diffusion policy, world model)
- Robot hardware (actuators, hands, sensors, compute)
- Robot simulation & benchmarks
- Robot deployment in real-world settings
- Robotics funding, M&A, or market analysis
- Robot safety, regulation, or policy
- Embodied AI research from top labs

**Exclude** (noise exclusion — append to queries if needed):

```
NOT "Roomba" NOT "RPA" NOT "software robot" NOT "chatbot"
NOT "crypto" NOT "blockchain" NOT "trading bot"
NOT "autonomous vehicle" NOT "self-driving" (unless explicitly about robot-vehicle crossover)
NOT "drone delivery" (unless about manipulation-capable drones)
```

### 2.3 Deduplication

When the same event appears in multiple sources:

- **Keep** the most comprehensive / authoritative version
- **Note** alternative sources as secondary links
- **Priority**: Company blog > dedicated robotics media > general tech media > aggregators
- **Merge** if two articles cover different angles of the same story

---

## Phase 3: Classification

Assign each story to **exactly 1 primary category** and **0-2 secondary tags**.

Use the category system from `taxonomy.md` § 1:

| Category                           | Icon | Assign When...                                                                                    |
| ---------------------------------- | ---- | ------------------------------------------------------------------------------------------------- |
| **Major Announcements**            | 🔥   | New product launch, paradigm-shifting demo, >$500M funding, first-ever milestone                  |
| **Foundation Models & Algorithms** | 🧠   | New model release, SOTA result, open-source drop, novel architecture                              |
| **Hardware & Platforms**           | 🦾   | New robot, component breakthrough, spec upgrade, supply chain                                     |
| **Simulation & Infrastructure**    | 🌐   | Sim platform update, new benchmark, dataset release, ROS update                                   |
| **Deployments & Commercial**       | 🏭   | Real-world deployment, customer announcement, performance metrics                                 |
| **Funding, M&A & Business**        | 💰   | Funding round, acquisition, IPO, market report                                                    |
| **Policy, Safety & Ethics**        | 🌍   | Regulation, safety standard, export control, labor impact                                         |
| **China Ecosystem**                | 🇨🇳   | China-specific company, policy, supply chain (as primary only when China angle is the main story) |

**Classification Rules**:

- "Unitree raises $500M" → Primary: 💰, Secondary: 🇨🇳, 🦾
- "New VLA paper from Stanford" → Primary: 🧠
- "Figure deploys 100 robots at BMW" → Primary: 🏭, Secondary: 🔥
- "NVIDIA releases Isaac Lab 2.0" → Primary: 🌐
- "EU proposes robot safety framework" → Primary: 🌍
- When in doubt: ask "What would the reader want to learn from this?" — that's the primary

---

## Phase 4: Prioritization

### Scoring Criteria

Score each story on 4 dimensions (each 1-5):

| Dimension             | 5 (Highest)                                     | 3 (Medium)                       | 1 (Lowest)                |
| --------------------- | ----------------------------------------------- | -------------------------------- | ------------------------- |
| **Source Tier**       | Tier 1 (Robot Report, IEEE) or company official | Tier 2 (TechCrunch, VentureBeat) | Tier 3 (aggregator, blog) |
| **Recency**           | Today                                           | Yesterday                        | 3-7 days ago              |
| **Discussion Volume** | Trending on X, >5 outlets covering              | 2-3 outlets                      | Single source             |
| **Novelty**           | First-ever, paradigm shift                      | Incremental improvement          | Expected update           |

**Composite Score** = Source Tier + Recency + Discussion Volume + Novelty (max 20)

### Selection Thresholds

| Briefing Type    | Target Stories | Minimum Score |
| ---------------- | -------------- | ------------- |
| Daily (Brief)    | 5-6            | ≥ 12          |
| Daily (Standard) | 8-10           | ≥ 10          |
| Weekly (Deep)    | 12-18          | ≥ 8           |

### Must-Include Rules (override scoring)

- Any story with **>$100M funding** → always include
- Any **new humanoid robot** launch → always include
- Any **open-source model/dataset** release from a Tier 1 lab → always include
- Any **real-world deployment** with unit numbers → always include
- Any **government policy** directly targeting humanoid robots → always include

---

## Phase 5: Output Formatting

### Template Selection

| User Request                 | Template                    | Reference                        |
| ---------------------------- | --------------------------- | -------------------------------- |
| Default daily briefing       | **Standard Format**         | `output_templates.md` § Standard |
| "简短一点" / "quick summary" | **Brief Format**            | `output_templates.md` § Brief    |
| Weekly deep dive             | **Deep Format**             | `output_templates.md` § Deep     |
| Research focus               | **Research-Focused Format** | `output_templates.md` § Research |
| Specific company             | **Company-Specific Format** | `output_templates.md` § Company  |
| China ecosystem              | **China Ecosystem Format**  | `output_templates.md` § China    |

### Standard Daily Output Template

```markdown
# 🤖 Embodied AI Daily Briefing

**Date**: [Current Date, e.g., February 23, 2026]
**Sources**: [X] articles from [Y] sources
**Coverage**: Last 24 hours

---

## 📊 Daily Pulse

| Metric                    | Count |
| ------------------------- | ----- |
| 🧠 New Papers / Models    | X     |
| 🦾 Hardware Announcements | X     |
| 🏭 Deployment Updates     | X     |
| 💰 Funding Events         | X     |
| 🇨🇳 China Ecosystem        | X     |

---

## 🔥 Major Announcements

### [Headline]

**Summary**: [One-sentence overview]

**Key Points**:

- [Important detail 1]
- [Important detail 2]
- [Important detail 3]

**Domain Metadata**:

- 🤖 Robot/Platform: [e.g., Figure 02]
- 🧠 Tech Stack: [e.g., VLA + LLM planning]
- 📊 Key Metric: [e.g., 95% grasp success rate]

**Impact**: [Why this matters — 1-2 sentences]

📅 **Source**: [Publication Name] • [Date]
🔗 **Link**: [URL]

---

## 🧠 Foundation Models & Algorithms

### [Headline]

[Same structure as above, with research-specific metadata:]

- 📄 Paper: [arXiv link if applicable]
- 🏛️ Lab: [e.g., Stanford IRIS Lab]
- 🔓 Open Source: [Yes — code + weights / Code only / No]
- 📊 Benchmark: [e.g., SIMPLER: 87.3% → 92.1%]

---

## 🦾 Hardware & Platforms

### [Headline]

[Same structure, with hardware-specific metadata:]

- 🤖 Robot: [Name, Generation]
- 📐 Specs: [DoF, Payload, Height, Weight]
- 🏭 Production: [Prototype / Small batch / Mass production]
- 💲 Price: [If announced]

---

## 🏭 Deployments & Commercial

### [Headline]

[Same structure, with deployment-specific metadata:]

- 🏢 Customer: [Company name]
- 📍 Location: [Factory/Warehouse/Hospital]
- 📊 Scale: [Number of units]
- ✅ Tasks: [Pick-and-place, assembly, etc.]

---

## 💰 Funding, M&A & Business

### [Headline]

[Same structure, with business-specific metadata:]

- 💵 Amount: [$XXM Series X]
- 📈 Valuation: [$X.XB post-money]
- 🏦 Investors: [Lead + notable participants]
- 🎯 Use of Funds: [R&D / Manufacturing / Hiring]

---

## 🌍 Policy, Safety & Ethics

### [Headline]

[Same structure]

---

## 🇨🇳 China Ecosystem

### [Headline]

[Same structure, with China-specific metadata:]

- 🏢 Company: [Chinese name + English name]
- 🏛️ Policy: [Ministry / Local government]
- 🔗 Context: [How this connects to global trends]

---

## 🎯 Key Takeaways

1. [The biggest news of the day — 1 sentence]
2. [Second most important development — 1 sentence]
3. [An emerging trend worth watching — 1 sentence]

---

**Generated on**: [Timestamp]
**Next update**: Check back tomorrow for the latest embodied AI news
```

---

## Customization Options

After providing the initial briefing, offer customization:

### 1. Focus Areas

"Would you like me to focus on specific topics?"

- 🧠 Research papers & foundation models only
- 🦾 Hardware & new robot launches only
- 🏭 Deployments & commercial news only
- 💰 Funding & business news only
- 🇨🇳 China ecosystem only
- 🏢 Specific companies (Tesla / Figure / Unitree / AGIBOT / etc.)
- 🔧 Specific technologies (VLA / Diffusion Policy / Sim-to-Real / Dexterous Hands)

### 2. Depth Level

"How detailed should I go?"

- **Brief**: Headlines + 1-sentence summary (5-6 stories)
- **Standard**: Summary + key points + metadata (8-10 stories, default)
- **Deep**: Full analysis + expert reactions + benchmarks + implications (12-18 stories)

### 3. Time Range

"What timeframe?"

- Last 24 hours (default for daily)
- Last 3 days
- Last week (default for weekly)
- Last month
- Custom range

### 4. Format Preference

"How would you like this organized?"

- By category (default — using the 8-category taxonomy)
- Chronological (newest first)
- By company
- By significance (highest impact first)
- By technology stack

### 5. Language

"What language?"

- Chinese (中文) — default when user writes in Chinese
- English — default when user writes in English
- Bilingual — Chinese summaries with English source links

---

## Follow-up Interactions

### User: "Tell me more about [story X]"

**Action**:

1. Use `mcp__web_reader__webReader` to fetch the full article
2. Provide detailed summary (5-8 paragraphs)
3. Add technical analysis if it's a research story
4. Offer to find expert reactions on X/Twitter

### User: "Read this paper: [arXiv URL]"

**Action**:

1. Use `mcp__arxiv__readURL` to fetch the paper
2. Summarize: motivation, method, key results, limitations
3. Compare with related work (reference `taxonomy.md` § 2 for context)
4. Note if code/weights are available

### User: "What are experts saying about [topic Y]?"

**Action**:

1. Search for expert opinions, X/Twitter reactions, blog posts
2. Summarize the consensus and dissenting views
3. Attribute quotes to specific researchers

### User: "Compare [Company A] vs [Company B]"

**Action**:

1. Look up both companies in `taxonomy.md` § 4
2. Search for latest news on both
3. Build a comparison table (robot specs, funding, deployment, tech stack)

### User: "What happened at [Conference X]?"

**Action**:

1. Reference `taxonomy.md` § 7 for conference details
2. Search for conference highlights and best papers
3. Summarize top 5-10 papers/demos

### User: "Only show research papers" / "只看论文"

**Action**:

1. Switch to Research-Focused template from `output_templates.md`
2. Execute Recipe B queries from `search_queries.md`
3. Filter to 🧠 category only

### User: "中国机器人有什么消息" (China robot news)

**Action**:

1. Switch to China Ecosystem template from `output_templates.md`
2. Execute Recipe D queries from `search_queries.md`
3. Filter to 🇨🇳 category, include Chinese-language sources
4. Use bilingual format (Chinese summaries, English source links where applicable)

### User: "This week's summary" / "这周总结"

**Action**:

1. Switch to Deep template from `output_templates.md`
2. Expand date range to 7 days
3. Execute Recipe A + B + C + D from `search_queries.md`
4. Include trend analysis and "What to Watch" section

---

## Quality Standards

### Validation Checklist

Before delivering any briefing, verify:

- [ ] **Links**: All URLs are valid and lead to the correct article
- [ ] **Dates**: All publication dates are accurate and within the stated coverage period
- [ ] **No Duplicates**: Same event not covered twice across categories
- [ ] **Accuracy**: Summaries match actual article content (no hallucination)
- [ ] **Source Diversity**: Not all stories from a single publication (aim for ≥3 sources)
- [ ] **Category Balance**: At least 2 categories represented (ideally 4+)
- [ ] **Metadata Completeness**: Domain-specific metadata fields filled for each story
- [ ] **Key Takeaways**: 3 bullets that capture the day's most important signals
- [ ] **Daily Pulse**: Stats table is populated with accurate counts
- [ ] **Company Names**: Chinese companies include both English and Chinese names

### Embodied AI-Specific Quality Rules

| Rule                                                        | Why                                                             |
| ----------------------------------------------------------- | --------------------------------------------------------------- |
| Always distinguish "demo video" from "real deployment"      | Demos are common; real deployments are rare and more newsworthy |
| Always note if a paper includes open-source code/weights    | This is a key differentiator for the community                  |
| Always include robot name + generation for hardware stories | Readers need to track which version is being discussed          |
| Always convert funding to USD for consistency               | Chinese companies often announce in RMB                         |
| Always note sim-only vs. real-robot results for research    | Sim results alone are less impactful                            |
| Flag "first-ever" claims with appropriate skepticism        | Verify against `taxonomy.md` to check if it's truly novel       |

---

## Error Handling

| Error                               | Cause                                               | Recovery                                                                                                |
| ----------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `webReader` fails for a URL         | Site down, paywall, timeout                         | Skip and try next source; note "could not access"                                                       |
| Search returns 0 results            | Query too narrow or date too recent                 | Expand date range to 3 days; broaden terms                                                              |
| Search returns >50 results          | Query too broad                                     | Add domain-specific terms; add NOT filters                                                              |
| Too few stories (<3)                | Slow news day                                       | Expand to 48h window; add more source sites; include "developing stories" from earlier                  |
| Too many stories (>15)              | Major event or conference                           | Raise significance threshold; group related stories; use Brief format                                   |
| Paywall blocks content              | Premium publication                                 | Use available excerpt; note "[Full article behind paywall]"; try alternative source                     |
| arXiv paper fetch fails             | URL format issue                                    | Verify URL starts with `https://arxiv.org/abs/`; retry                                                  |
| Chinese source returns garbled text | Encoding issue                                      | Try alternative Chinese source; use English coverage of same story                                      |
| Cannot determine publication date   | Missing metadata                                    | Check article body for date references; if uncertain, mark as "[Date unconfirmed]"                      |
| Story relevance is ambiguous        | Edge case (e.g., autonomous vehicle + manipulation) | Include if it involves physical manipulation or embodied learning; exclude if purely navigation/driving |

---

## Execution Time Estimates

| Briefing Type  | Queries | Sources Fetched            | Stories Output | Total Time |
| -------------- | ------- | -------------------------- | -------------- | ---------- |
| Daily Brief    | 3-5     | 3-5 sites + 8-10 articles  | 5-6            | ~3-5 min   |
| Daily Standard | 5       | 3-5 sites + 10-15 articles | 8-10           | ~5-8 min   |
| Weekly Deep    | 8-11    | 5-8 sites + 15-20 articles | 12-18          | ~10-15 min |

---

## Examples

### Example 1: Basic Daily Request

**User**: "给我今天的具身智能资讯"

**Action**:

1. Determine language: Chinese → output in Chinese, source links in original language
2. Determine scope: "今天" → daily, last 24 hours
3. Determine depth: not specified → Standard (default)
4. Execute Phase 1-5 with Recipe A queries
5. Output Standard Format template in Chinese

---

### Example 2: English Weekly Request

**User**: "What happened in embodied AI this week?"

**Action**:

1. Language: English
2. Scope: "this week" → 7 days
3. Depth: not specified but weekly → Deep (default for weekly)
4. Execute Phase 1-5 with Recipe A + B + C + D queries, date range = 7 days
5. Output Deep Format template in English
6. Include trend analysis and "What to Watch" section

---

### Example 3: Company-Specific Request

**User**: "Unitree最近有什么消息？"

**Action**:

1. Language: Chinese
2. Scope: "最近" → default to 7 days
3. Focus: Unitree → Company-Specific template
4. Execute targeted queries:
   - `("Unitree" OR "宇树" OR "Unitree G1" OR "Unitree H1") after:[7 days ago]`
5. Output Company-Specific Format with Unitree context from `taxonomy.md` § 4.1

---

### Example 4: Research-Focused Request

**User**: "Any interesting robot learning papers this week?"

**Action**:

1. Language: English
2. Scope: "this week" → 7 days
3. Focus: research → Research-Focused template
4. Execute Recipe B queries from `search_queries.md`
5. For each paper: fetch via arXiv reader, extract key contributions
6. Output Research-Focused Format with paper metadata

---

### Example 5: Follow-up Deep Dive

**User**: "Tell me more about the Figure AI deployment at BMW"

**Action**:

1. Search for the specific story: `"Figure AI" AND "BMW" AND "deployment"`
2. Fetch full article(s) via `webReader`
3. Provide detailed summary (5-8 paragraphs)
4. Include: number of units, tasks performed, timeline, technical details
5. Add context: Figure's previous deployments, BMW's automation strategy
6. Offer: "Want me to compare this with Tesla's factory deployment?"

---

### Example 6: China Ecosystem Request

**User**: "中国人形机器人行业最近怎么样？"

**Action**:

1. Language: Chinese
2. Scope: "最近" → 7 days
3. Focus: China → China Ecosystem template
4. Execute Recipe D queries + additional Chinese-language searches
5. Cover: company updates, policy, funding, supply chain
6. Output China Ecosystem Format in Chinese

---

## Appendix: Quick Query Reference

For rapid execution, here are the most commonly used query patterns:

### Daily (copy-paste ready, replace dates)

```
("embodied AI" OR "humanoid robot") AND ("news" OR "announcement") after:2026-02-22
("VLA" OR "diffusion policy" OR "robot foundation model") after:2026-02-22
("Tesla Optimus" OR "Figure AI" OR "Boston Dynamics" OR "Unitree" OR "AGIBOT") after:2026-02-22
("robotics funding" OR "robot startup") after:2026-02-16
site:therobotreport.com OR site:spectrum.ieee.org ("robot") after:2026-02-22
```

### Weekly Research (copy-paste ready, replace dates)

```
site:arxiv.org ("cs.RO") AND ("embodied" OR "VLA" OR "manipulation" OR "humanoid") after:2026-02-16
("diffusion policy" OR "world model" OR "imitation learning") AND ("robot") after:2026-02-16
("open source" OR "GitHub") AND ("robot model" OR "robot policy") after:2026-02-16
```

### China Focus (copy-paste ready, replace dates)

```
("Unitree" OR "AGIBOT" OR "UBTECH" OR "Galbot" OR "Fourier") after:2026-02-16
("China humanoid robot" OR "具身智能" OR "人形机器人") after:2026-02-16
```

---

## Safety, Compliance & Neutrality Standards

### Content Safety Requirements

Before including any story in the briefing, verify:

- [ ] **Legal Compliance**: Content does not violate local laws or regulations
- [ ] **No Sensitive Information**: Excludes classified, confidential, or proprietary technical details not publicly disclosed
- [ ] **No Misinformation**: Claims are cross-verified with authoritative sources
- [ ] **No Harmful Content**: Excludes content promoting violence, discrimination, illegal activities, or harm
- [ ] **Respect Embargoes**: Honors publication embargoes and non-disclosure agreements
- [ ] **Age-Appropriate**: Suitable for general professional audience

**If any safety concern is detected → exclude the story and log for review.**

---

### Geopolitical Neutrality

Maintain strict objectivity when covering international topics:

**Neutral Language Guidelines:**

| Topic                     | ❌ Avoid                      | ✅ Use                             |
| ------------------------- | ----------------------------- | ---------------------------------- |
| International competition | "China threatens US lead"     | "China expands robotics capacity"  |
| Technology development    | "US dominates AI research"    | "US institutions publish X papers" |
| Policy & regulation       | "Restrictive export controls" | "New export control regulations"   |
| Market dynamics           | "Winning the robotics race"   | "Growth in robotics deployment"    |

**When covering regional ecosystems:**

- Treat all regions (US, China, EU, etc.) with equal journalistic standards
- Present facts and metrics without "winning/losing" framing
- Include diverse perspectives when covering policy or competition
- Avoid amplifying nationalist rhetoric from any side

---

### Source Compliance

**Respect website policies and legal requirements:**

#### Paywalls & Access Control

- **Never circumvent** paywalls or access restrictions
- If content is paywalled: note "[Full article behind paywall]" and provide legitimate access link
- Use only publicly available excerpts or abstracts

#### Web Scraping Ethics

- **Always respect** `robots.txt` directives
- **Rate limiting**: Maximum 1 request per second per domain
- **User-Agent**: Identify as a news aggregation bot
- **Comply** with each source's Terms of Service

#### Copyright & Attribution

- Provide summaries, not full reproductions
- Always link to the original source
- Attribute quotes and data to the original publication
- Respect Creative Commons and other licenses

---

### Data Privacy

**Protect personal information:**

- **No Personal Data Collection**: Do not collect or display emails, phone numbers, physical addresses, or other PII
- **Anonymize**: Remove any accidentally scraped personal identifiers before output
- **GDPR/CCPA Compliance**: If user data is stored for personalization, obtain explicit consent
- **Researcher Privacy**: Use institutional affiliations, not personal contact info

---

### Sensitive Topics Handling

**Exercise extra caution with:**

#### Military & Defense Applications

- **Only report** publicly disclosed information from official sources
- **Exclude** leaked or classified defense technology details
- **Context**: Note civilian applications when covering dual-use technologies

#### Surveillance & Privacy

- **Highlight** privacy implications and regulatory status
- **Balance**: Present both capability announcements and ethical concerns
- **Transparency**: Note if technology is used in controversial applications

#### Labor & Economic Impact

- **Multiple perspectives**: Include views from workers, companies, and economists
- **Avoid sensationalism**: Use measured language about automation impact
- **Context**: Note retraining programs and new job creation alongside displacement

#### Safety Incidents

- **Verify first**: Only report confirmed incidents from official sources
- **No speculation**: Avoid unverified claims about causes or responsibility
- **Follow-up**: Update when official investigation results are published

---

### Content Exclusion Rules

**Automatically exclude:**

1. **Illegal Content**
   - Violations of export control laws (ITAR, EAR, Wassenaar)
   - Leaked confidential documents or trade secrets
   - Content promoting illegal activities

2. **Misinformation**
   - Unverified rumors about companies, personnel, or financials
   - Content from sources with known misinformation track records
   - Viral claims without credible source confirmation

3. **Harmful Content**
   - Explicit weapon systems (unless official government announcement)
   - Content promoting discrimination or violence
   - Malicious code or security exploits

4. **Privacy Violations**
   - Doxxing or personal information exposure
   - Unauthorized disclosure of private communications
   - Non-consensual personal data sharing

**When in doubt → exclude and flag for human review.**

---

### Verification Protocol

**For high-impact stories (funding >$100M, major deployments, safety incidents):**

1. **Multi-source verification**: Require 2+ independent authoritative sources
2. **Official confirmation**: Prefer company announcements or regulatory filings
3. **Expert validation**: Cross-check technical claims against domain expertise
4. **Temporal verification**: Ensure information is current, not recycled old news

**Confidence levels:**

- ✅ **Confirmed**: 3+ independent sources OR official company/government announcement
- ⚠️ **Likely**: 2 sources OR 1 highly authoritative source (e.g., SEC filing)
- ❓ **Unverified**: Single source, no corroboration → mark as "[Unconfirmed]" or exclude

---

### Compliance Checklist

Before delivering any briefing, verify:

- [ ] All sources are legally accessible and comply with their ToS
- [ ] No paywalls were circumvented
- [ ] Rate limits were respected (max 1 req/sec per domain)
- [ ] No personal data (PII) is included in output
- [ ] Language is geopolitically neutral
- [ ] No sensitive military/classified information is disclosed
- [ ] All high-impact claims are verified with multiple sources
- [ ] Copyright and attribution requirements are met
- [ ] No misinformation or unverified rumors are included

**If any item fails → review and correct before delivery.**

---
