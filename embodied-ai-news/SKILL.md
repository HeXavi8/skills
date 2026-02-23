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
- Requests a daily/weekly/monthly robotics briefing
- Mentions wanting to know what's happening in embodied AI / robotics
- Asks about specific companies: Tesla Optimus, Figure, Unitree, AGIBOT, Boston Dynamics, etc.
- Asks about specific technologies: VLA models, diffusion policy, sim-to-real, dexterous manipulation
- Wants a summary of recent robotics research papers
- Asks about robotics funding, deployments, or supply chain
- Asks about simulation platforms, benchmarks, or datasets
- Asks about robotics policy, safety standards, or export controls
- Requests a monthly trend report or competitive analysis
- Says: "给我今天的具身智能资讯" (Give me today's embodied AI news)
- Says: "机器人行业有什么新动态" (What's new in the robot industry)
- Says: "最近有什么人形机器人的消息" (Any recent humanoid robot news)
- Says: "这个月的具身智能趋势报告" (This month's embodied AI trend report)
- Says: "embodied AI updates", "robot learning news", "humanoid robot news"

### Trigger Keywords

**English**: `embodied AI`, `humanoid robot`, `robot news`, `robotics update`, `robot learning`, `VLA model`, `diffusion policy`, `dexterous manipulation`, `sim-to-real`, `robot deployment`, `robotics funding`, `Figure AI`, `Tesla Optimus`, `Unitree`, `AGIBOT`, `Boston Dynamics`, `1X`, `Physical Intelligence`, `Skild AI`, `robot hand`, `quadruped robot`, `Isaac Sim`, `world model robot`, `robot benchmark`, `robot safety`, `robot regulation`, `monthly robot report`

**Chinese**: `具身智能`, `人形机器人`, `机器人资讯`, `灵巧操作`, `仿真到真实`, `机器人部署`, `宇树`, `智元`, `优必选`, `银河通用`, `傅利叶`, `机器人融资`, `灵巧手`, `四足机器人`, `机器人大模型`, `机器人月报`, `机器人安全`, `机器人政策`

---

## Reference Files

This skill relies on 5 companion reference files. Always consult them during execution:

```
📁 references/
├── 📰 news_source.md        — WHERE to find information (tiered source list)
├── 🔍 search_queries.md     — HOW to search (query templates & recipes)
├── 📝 output_templates.md   — WHAT format to output (6+ template variants)
├── 📊 taxonomy.md           — SHARED LANGUAGE (categories, keywords, company list)
└── 🧭 workflow.md           — WHEN and in what ORDER to execute (SOP for daily/weekly/monthly)
```

| File                  | When to Consult                                                                         |
| --------------------- | --------------------------------------------------------------------------------------- |
| `news_source.md`      | Phase 1 — choosing which sites to fetch; selecting tier-appropriate sources             |
| `search_queries.md`   | Phase 1 — building search queries; selecting recipe by briefing type                    |
| `taxonomy.md`         | Phase 3 — classifying stories; Phase 1 — looking up company aliases & tech terms        |
| `output_templates.md` | Phase 5 — rendering final output; selecting template by user request                    |
| `workflow.md`         | All Phases — orchestrating the end-to-end workflow; time budgeting; monthly maintenance |

### File Interconnection Map

```
┌─────────────────┐     ┌──────────────────┐     ┌───────────────┐     ┌──────────────────┐
│  search_queries  │────▶│  news_source      │────▶│  Classify &   │────▶│ output_templates  │
│  (discover)      │     │  (browse & verify) │     │  Prioritize   │     │  (generate)       │
└─────────────────┘     └──────────────────┘     └───────────────┘     └──────────────────┘
        ▲                        ▲                       ▲                        ▲
        │                        │                       │                        │
        └────────────────────────┴───────────────────────┴────────────────────────┘
                                      workflow.md
                                 (orchestrates all phases)
                                      taxonomy.md
                                  (shared vocabulary for all)
```

---

## Workflow Overview

> Refer to `workflow.md` for the full Standard Operating Procedure including time budgets and checklists.

```
Phase 1: Information Gathering
  ├─ 1.1 Fetch robotics media sites (3-5 sources)
  ├─ 1.2 Execute domain-specific web searches (3-5 queries)
  ├─ 1.3 Scan arXiv for recent papers (1-2 queries)
  └─ 1.4 Fetch full articles for top candidates (8-15 URLs)
      ↓
Phase 2: Content Filtering
  ├─ Recency filter (24-48h for daily, 7d for weekly, 30d for monthly)
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
  └─ Select top 6-10 stories for daily, 12-18 for weekly, 15-25 for monthly
      ↓
Phase 5: Output Formatting
  └─ Render using output_templates.md
      (Standard for daily, Deep for weekly, Monthly Report for monthly)
```

### Workflow Variants (from `workflow.md`)

| Variant              | Time Budget | Query Recipes                | Output Template   | Trigger Examples                            |
| -------------------- | ----------- | ---------------------------- | ----------------- | ------------------------------------------- |
| **Daily**            | ~30 min     | Recipe A (5 queries)         | Standard or Brief | "今日资讯", "daily briefing"                |
| **Weekly**           | ~90 min     | Recipe A + B + C + D (8-11)  | Deep              | "这周总结", "weekly deep dive"              |
| **Monthly**          | ~3 hours    | All Recipes + Thematic Dives | Monthly Report    | "月度报告", "monthly trend report"          |
| **Company-Specific** | ~20 min     | Company-specific (§8)        | By-Company        | "Figure AI最新消息", "Tesla Optimus update" |
| **Research-Only**    | ~30 min     | Recipe B (4 queries)         | Research-Focused  | "只看论文", "research papers only"          |
| **China-Only**       | ~20 min     | Recipe D (2-3 queries)       | China Ecosystem   | "中国机器人消息", "China ecosystem"         |

---

## Phase 1: Information Gathering

### Step 1.1: Fetch Primary Embodied AI Sources

Use `mcp__web_reader__webReader` to fetch content from **3-5 sources** per session.

**Source Selection** (refer to `news_source.md` for the full 6-tier source hierarchy):

| Priority | Source                 | URL                                         | Tier | Why                               |
| -------- | ---------------------- | ------------------------------------------- | ---- | --------------------------------- |
| Always   | The Robot Report       | `https://www.therobotreport.com/`           | T1   | Best dedicated robotics news site |
| Always   | IEEE Spectrum Robotics | `https://spectrum.ieee.org/topic/robotics/` | T1   | Authoritative, technical depth    |
| Always   | TechCrunch Robotics    | `https://techcrunch.com/category/robotics/` | T1   | Funding, launches, business       |
| Rotate   | VentureBeat AI         | `https://venturebeat.com/category/ai/`      | T4   | Industry analysis                 |
| Rotate   | Synced Review          | `https://syncedreview.com/`                 | T6   | China + global AI research        |
| Rotate   | QbitAI (量子位)        | `https://www.qbitai.com/`                   | T6   | China ecosystem (Chinese)         |
| Rotate   | Hugging Face Blog      | `https://huggingface.co/blog`               | T2   | Open-source model releases        |
| Rotate   | NVIDIA Blog            | `https://developer.nvidia.com/blog/`        | T2   | Isaac / GR00T updates             |

> **Full source list**: See `news_source.md` for all 6 tiers (Core Media → Company Blogs → Academic → General Tech → Podcasts → China/Regional), including RSS feeds, social accounts, and evaluation criteria.

**Parameters**:

- `return_format`: markdown
- `with_images_summary`: false
- `timeout`: 20 seconds per source

**Selection Rule**: Always fetch the 3 "Always" sources. Rotate among the "Rotate" sources based on the user's focus area or the day of the week. For weekly/monthly briefings, expand to 5-8 sources.

---

### Step 1.2: Execute Web Search Queries

Use `WebSearch` with domain-specific queries from `search_queries.md`.

**For Daily Briefing** — use **Recipe A** (5 queries):

```
Q1 — General (§1.1):
("embodied AI" OR "humanoid robot") AND ("news" OR "announcement") after:[yesterday]

Q2 — Foundation Models (§2.1–2.8):
("robot foundation model" OR "VLA" OR "diffusion policy") AND ("new" OR "paper") after:[yesterday]

Q3 — Key Companies (§8):
("Tesla Optimus" OR "Figure AI" OR "Boston Dynamics" OR "Unitree" OR "AGIBOT") after:[yesterday]

Q4 — Funding (§6.1–6.2):
("robotics funding" OR "robot startup") AND ("raise" OR "funding") after:[7 days ago]

Q5 — Core Media:
site:therobotreport.com OR site:spectrum.ieee.org ("robot") after:[yesterday]
```

**For Weekly Deep Dive** — add **Recipe B** (research) + **Recipe C** (commercial):

```
Q6 — arXiv Research (§9):
site:arxiv.org ("cs.RO") AND ("embodied" OR "VLA" OR "manipulation" OR "humanoid") after:[7 days ago]

Q7 — Algorithms (§2.2–2.10):
("diffusion policy" OR "world model" OR "imitation learning") AND ("robot") after:[7 days ago]

Q8 — Deployments (§5.1–5.6):
("robot deployment" OR "robot factory" OR "warehouse robot") AND ("humanoid" OR "embodied") after:[7 days ago]

Q9 — Supply Chain (§3.8):
("robot actuator" OR "dexterous hand" OR "robot supply chain") after:[7 days ago]
```

**For China Focus** — add **Recipe D** (§8 Chinese Companies):

```
Q10: ("Unitree" OR "AGIBOT" OR "UBTECH" OR "Galbot" OR "Fourier") after:[7 days ago]
Q11: ("China humanoid robot" OR "China embodied AI" OR "具身智能" OR "人形机器人") after:[7 days ago]
```

**For Simulation & Infrastructure Focus** — use queries from `search_queries.md` §4:

```
Q12: ("Isaac Sim" OR "Isaac Lab" OR "MuJoCo" OR "SAPIEN" OR "Genesis simulator") AND ("robot" OR "update") after:[7 days ago]
Q13: ("robot benchmark" OR "manipulation benchmark" OR "SIMPLER" OR "ManiSkill") after:[7 days ago]
```

**For Policy & Safety Focus** — use queries from `search_queries.md` §7:

```
Q14: ("robot safety" OR "robot regulation" OR "EU AI Act") AND ("robot" OR "embodied") after:[30 days ago]
Q15: ("robot export control" OR "chip export" OR "robotics sanctions") AND ("China" OR "US") after:[30 days ago]
```

> **Full query library**: See `search_queries.md` for 50+ pre-built query templates organized into 9 sections, with noise exclusion filters and date variable rules.

**Date Variable Rules**:

- `[yesterday]` = current date minus 1 day, format: YYYY-MM-DD
- `[7 days ago]` = current date minus 7 days
- `[30 days ago]` = current date minus 30 days
- Always compute dynamically based on the current date at execution time

**Best Practices**:

- Execute 3-5 queries for daily, 8-11 queries for weekly, 12-15 queries for monthly
- Limit to top 10 results per query
- Prioritize results from last 24-48 hours for daily
- Append noise exclusion filter from `search_queries.md` §1.4 when results are noisy

---

### Step 1.3: Scan arXiv for Recent Papers

Use `WebSearch` with arXiv-specific queries (from `search_queries.md` §9):

```
site:arxiv.org ("cs.RO" OR "cs.AI" OR "cs.LG") AND ("embodied" OR "humanoid" OR "manipulation" OR "VLA" OR "diffusion policy" OR "world model") after:[yesterday]
```

For promising papers found, use `mcp__arxiv__readURL` to fetch full paper content:

- Extract title, authors, abstract, key contributions
- Note if code/model weights are released (open-source flag)
- Check if from a Tier 1 lab (see `taxonomy.md` § 4.3)
- Cross-reference with `taxonomy.md` § 2 (Technology Taxonomy) for proper classification

---

### Step 1.4: Fetch Full Articles

For the top **8-15 most relevant stories** from Steps 1.1-1.3:

- Extract URLs from search results and site fetches
- Use `mcp__web_reader__webReader` to fetch full article content
- This ensures accurate summarization vs. relying on snippets

**Priority for full fetch**:

1. Stories appearing in multiple search results (high signal)
2. Stories from Tier 1 sources (see `news_source.md` § Tier 1)
3. Stories mentioning key companies or technologies (see `taxonomy.md` § 4 & § 2)
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

**Technology Sub-Classification** (reference `taxonomy.md` § 2):

For 🧠 Foundation Models stories, further classify by:

- **Learning Paradigm**: IL / RL / VLA / Diffusion Policy / World Model / Hybrid
- **Architecture**: Transformer / Diffusion / Flow Matching / ACT / LLM Planner
- **Perception Stack**: Vision / Tactile / 3D / Multimodal

For 🦾 Hardware stories, further classify by (reference `taxonomy.md` § 3):

- **Form Factor**: Humanoid / Quadruped / Mobile Manipulator / Tabletop Arm
- **Component Type**: Actuator / Hand / Sensor / Compute / Full Platform

---

## Phase 4: Prioritization

### Scoring Criteria

Score each story on 4 dimensions (each 1-5):

| Dimension             | 5 (Highest)                                     | 3 (Medium)                         | 1 (Lowest)                 |
| --------------------- | ----------------------------------------------- | ---------------------------------- | -------------------------- |
| **Source Tier**       | Tier 1 (Robot Report, IEEE) or company official | Tier 2-3 (TechCrunch, VentureBeat) | Tier 4+ (aggregator, blog) |
| **Recency**           | Today                                           | Yesterday                          | 3-7 days ago               |
| **Discussion Volume** | Trending on X, >5 outlets covering              | 2-3 outlets                        | Single source              |
| **Novelty**           | First-ever, paradigm shift                      | Incremental improvement            | Expected update            |

**Composite Score** = Source Tier + Recency + Discussion Volume + Novelty (max 20)

### Selection Thresholds

| Briefing Type    | Target Stories | Minimum Score |
| ---------------- | -------------- | ------------- |
| Daily (Brief)    | 5-6            | ≥ 12          |
| Daily (Standard) | 8-10           | ≥ 10          |
| Weekly (Deep)    | 12-18          | ≥ 8           |
| Monthly (Report) | 15-25          | ≥ 6           |

### Must-Include Rules (override scoring)

- Any story with **>$100M funding** → always include
- Any **new humanoid robot** launch → always include
- Any **open-source model/dataset** release from a Tier 1 lab → always include
- Any **real-world deployment** with unit numbers → always include
- Any **government policy** directly targeting humanoid robots → always include
- Any **new simulation platform** or **major benchmark update** → always include (for weekly/monthly)

---

## Phase 5: Output Formatting

### Template Selection

| User Request                 | Template                    | Reference                                                 |
| ---------------------------- | --------------------------- | --------------------------------------------------------- |
| Default daily briefing       | **Standard Format**         | `output_templates.md` § Standard                          |
| "简短一点" / "quick summary" | **Brief Format**            | `output_templates.md` § Brief                             |
| Weekly deep dive             | **Deep Format**             | `output_templates.md` § Deep                              |
| Research focus               | **Research-Focused Format** | `output_templates.md` § Research                          |
| Specific company             | **By-Company Format**       | `output_templates.md` § Company                           |
| China ecosystem              | **China Ecosystem Format**  | `output_templates.md` § China                             |
| Monthly trend report         | **Monthly Report Format**   | `output_templates.md` § Monthly + `workflow.md` § Monthly |

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

## 🌐 Simulation & Infrastructure

### [Headline]

[Same structure, with sim-specific metadata:]

- 🖥️ Platform: [Isaac Sim / MuJoCo / SAPIEN / Genesis / Other]
- 🎯 Use Case: [Sim-to-Real / Data Gen / Benchmarking / Digital Twin]
- 🔓 Open Source: [Yes / No / Partial]

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

[Same structure, with policy-specific metadata:]

- 🌐 Region: [US / EU / China / Global]
- 📋 Policy Type: [Regulation / Standard / Export Control / Safety Framework]

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

## Monthly Workflow

> Full details in `workflow.md` § Monthly Workflow (~3 hours)

The monthly workflow consists of two parts:

### Part A: Monthly Trend Report

**Goal**: Produce a comprehensive monthly analysis covering the top stories, thematic deep dives, and forward-looking insights.

| Step | Action                                   | Time   | Reference Files                                  |
| ---- | ---------------------------------------- | ------ | ------------------------------------------------ |
| 1    | Review all weekly reports from the month | 20 min | Previous outputs                                 |
| 2    | Thematic deep dives (choose 2-3 themes)  | 60 min | `search_queries.md` all sections                 |
| 3    | Generate monthly report                  | 40 min | `output_templates.md` § Deep + Monthly structure |

**Common Monthly Themes** (from `workflow.md`):

| Theme                     | What to Analyze                                 |
| ------------------------- | ----------------------------------------------- |
| Model Architecture Trends | VLA vs. Diffusion vs. World Model traction      |
| Hardware Race             | New platforms, spec comparisons, price trends   |
| Deployment Scoreboard     | Total units deployed, new verticals             |
| Funding Landscape         | Total $ raised, valuation trends, new entrants  |
| China vs. US              | Capability gap, policy divergence, supply chain |
| Open Source Momentum      | New releases, community adoption metrics        |

**Monthly Report Structure**:

```
# 📊 Embodied AI Monthly Report — [Month Year]

## Executive Summary (5 bullets)
## Top 5 Stories of the Month
## Thematic Deep Dive 1: [Theme]
## Thematic Deep Dive 2: [Theme]
## Thematic Deep Dive 3: [Theme]
## Funding & Deal Tracker (table)
## Deployment Tracker (table)
## Paper Highlights (top 5 papers)
## What to Watch Next Month
## Monthly Statistics Dashboard
```

### Part B: System Maintenance

> Performed monthly to keep the system current. See `workflow.md` § Part B for full checklist.

| Step | Action                                                                   | Time   |
| ---- | ------------------------------------------------------------------------ | ------ |
| 1    | Update `news_source.md` — add new sources, retire inactive ones, re-tier | 20 min |
| 2    | Update `search_queries.md` — add new keywords, refine queries            | 15 min |
| 3    | Update `taxonomy.md` — add new companies, models, terms                  | 15 min |
| 4    | Review `output_templates.md` — adjust metadata fields if needed          | 10 min |

---

## Customization Options

After providing the initial briefing, offer customization:

### 1. Focus Areas

"Would you like me to focus on specific topics?"

- 🧠 Research papers & foundation models only
- 🦾 Hardware & new robot launches only
- 🏭 Deployments & commercial news only
- 💰 Funding & business news only
- 🌐 Simulation & infrastructure only
- 🌍 Policy, safety & regulation only
- 🇨🇳 China ecosystem only
- 🏢 Specific companies (Tesla / Figure / Unitree / AGIBOT / etc.)
- 🔧 Specific technologies (VLA / Diffusion Policy / Sim-to-Real / Dexterous Hands / World Models)

### 2. Depth Level

"How detailed should I go?"

- **Brief**: Headlines + 1-sentence summary (5-6 stories)
- **Standard**: Summary + key points + metadata (8-10 stories, default)
- **Deep**: Full analysis + expert reactions + benchmarks + implications (12-18 stories)
- **Monthly Report**: Trend analysis + thematic deep dives + trackers (15-25 stories)

### 3. Time Range

"What timeframe?"

- Last 24 hours (default for daily)
- Last 3 days
- Last week (default for weekly)
- Last month (default for monthly)
- Custom range

### 4. Format Preference

"How would you like this organized?"

- By category (default — using the 8-category taxonomy)
- Chronological (newest first)
- By company (competitive intelligence view)
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
2. Execute Recipe B queries from `search_queries.md` § 2
3. Filter to 🧠 category only

### User: "中国机器人有什么消息" (China robot news)

**Action**:

1. Switch to China Ecosystem template from `output_templates.md`
2. Execute Recipe D queries from `search_queries.md` § 8 (Chinese Companies)
3. Filter to 🇨🇳 category, include Chinese-language sources from `news_source.md` § Tier 6
4. Use bilingual format (Chinese summaries, English source links where applicable)

### User: "This week's summary" / "这周总结"

**Action**:

1. Switch to Deep template from `output_templates.md`
2. Expand date range to 7 days
3. Execute Recipe A + B + C + D from `search_queries.md`
4. Include trend analysis and "What to Watch" section
5. Follow `workflow.md` § Weekly Workflow steps

### User: "Monthly report" / "月度报告"

**Action**:

1. Switch to Monthly Report format
2. Expand date range to 30 days
3. Execute all query recipes from `search_queries.md`
4. Choose 2-3 thematic deep dives based on the month's dominant stories
5. Include Funding & Deal Tracker table, Deployment Tracker table
6. Follow `workflow.md` § Monthly Workflow Part A steps

### User: "What benchmarks exist for [task]?"

**Action**:

1. Reference `taxonomy.md` § 6 for benchmark & simulation taxonomy
2. Search for latest benchmark results using `search_queries.md` § 4.3
3. Build a comparison table with platforms, metrics, and leaderboard standings

### User: "[Company] news" / "[公司名]最新消息"

**Action**:

1. Look up company in `taxonomy.md` § 4 for aliases and search terms
2. Execute company-specific query from `search_queries.md` § 8
3. Render using By-Company template from `output_templates.md`
4. Include company profile, latest robot specs, funding history

---

## Quality Standards

### Validation Checklist

Before delivering any briefing, verify:

- [ ] **Links**: All URLs are valid and lead to the correct article
- [ ] **Dates**: All publication dates are accurate and within the stated coverage period
- [ ] **Categories**: Every story has exactly 1 primary category and 0-2 secondary tags
- [ ] **Deduplication**: No duplicate stories (same event from different outlets)
- [ ] **Balance**: Coverage spans multiple categories (not all from one bucket)
- [ ] **Metadata**: Domain-specific metadata fields are filled for each story
- [ ] **Key Takeaways**: 3 actionable takeaways are provided
- [ ] **Daily Pulse**: Statistics table is populated with accurate counts
- [ ] **Language**: Output language matches user's language preference
- [ ] **Template**: Correct template is used based on user request

### Source Attribution Standards

- Always include the **publication name** and **publication date**
- Always include a **direct link** to the original article
- For research papers, include **arXiv ID** and **GitHub link** if available
- For company announcements, prefer the **official blog/press release** as primary source
- When multiple sources cover the same story, cite the **most authoritative** and note alternatives

### Accuracy Standards

- **Funding amounts**: Always verify with at least 2 sources; note if unconfirmed
- **Technical claims**: Cross-reference benchmark numbers with the original paper
- **Deployment numbers**: Distinguish between "announced" vs. "deployed" vs. "planned"
- **Dates**: Use the original publication date, not the date you found it
- **Company names**: Use official English name + Chinese name (if applicable) from `taxonomy.md` § 4

### Freshness Standards

- Daily briefings must contain **at least 60%** stories from the last 24 hours
- Weekly briefings must contain **at least 80%** stories from the last 7 days
- Monthly reports must contain **at least 90%** stories from the last 30 days
- Flag any story older than the coverage window with a note explaining why it's included

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
