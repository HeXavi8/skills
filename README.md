# Skills

A modular collection of agent skills — self-contained utilities designed for automation and integration. Each skill includes a comprehensive `SKILL.md` with usage documentation and examples.

## Available Skills

### [QR Code Generator](qrcode/SKILL.md)

Generate customizable QR codes in multiple formats (SVG/PNG/JPG) from text or URLs. Features include color customization, dot/eye shape options, and adjustable error correction levels.
🔗 [ClawHub Page](https://clawhub.ai/HeXavi8/qrcode)

### [Embodied AI News Aggregator](embodied-ai-news/SKILL.md)

Automatically aggregates and summarizes the latest news in embodied AI and robotics. Supports daily/weekly briefings with customizable source recipes and templates.
🔗 [ClawHub Page](https://clawhub.ai/HeXavi8/embodied-ai-news)

### [Daily Stock Analysis](daily-stock-analysis/SKILL.md)

Deterministic global-market daily stock analysis skill designed for stable output across different models. Includes next-trading-day close prediction, recommendation output (Buy/Hold/Sell/Watch), prior forecast review, rolling forecast-accuracy tracking, and explicit self-improvement actions. 🔗 [ClawHub Page](https://clawhub.ai/HeXavi8/daily-stock-analysis)

### [File Compression](file-compression/SKILL.md)

Compress PDF and image files with Python-first workflows and Node.js fallback. Supports PDF presets (`screen/ebook/printer/prepress`), image quality/format/resize options, transparent execution progress messaging, and retry strategies when compression results are poor. 🔗 [ClawHub Page](https://clawhub.ai/HeXavi8/file-compression)

## Getting Started

Each skill can be run independently by following its `SKILL.md`.

- Node.js skills: run `npm install` in the skill directory when dependencies are required.
- Python skills: ensure a compatible Python version is available and install required packages from the skill instructions.

## License

MIT License - see [LICENSE](LICENSE) for details.
