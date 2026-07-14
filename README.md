# Quant Developer Portfolio

70 quantitative trading projects organized by tier — anchored by a live automated scanner and
execution system running on AWS, with real fills, a Postgres trade journal, and pre-trade risk
controls already in production (paper trading).

Live site: `docs/index.html` (deploy via GitHub Pages or Netlify — see below).

## Structure

| Tier | Focus | Projects |
|------|-------|----------|
| [Tier 1](#tier-1--data--market-intelligence) | Data & Market Intelligence | 01–10 |
| [Tier 2](#tier-2--backtesting--strategy) | Backtesting & Strategy | 11–20 |
| [Tier 3](#tier-3--execution--infrastructure) | Execution & Infrastructure | 21–30 |
| [Tier 4](#tier-4--risk--portfolio-management) | Risk & Portfolio Management | 31–40 |
| [Tier 5](#tier-5--agentic-ai) | Agentic AI | 41–50 |
| [Tier 6](#tier-6--trading--execution) | Trading & Execution | 51–55 |
| [Tier 7](#tier-7--machine-learning) | Machine Learning | 56–59 |
| [Tier 8](#tier-8--fixed-income--macro) | Fixed Income & Macro | 60–64 |
| [Tier 9](#tier-9--alternative-data) | Alternative Data | 65–67 |

Status is tracked per-project in [`docs/projects.json`](docs/projects.json) and kept in sync with
[`update_project.py`](update_project.py) — see [Updating status](#updating-a-projects-status) below.

## Tier 1 — Data & Market Intelligence

| # | Project | Tech | Status |
|---|---------|------|--------|
| 01 | **Multi-Source Market Data Pipeline** | Python, Polygon.io, Alpaca, PostgreSQL, Docker | ✅ Complete |
| 02 | **Options Chain & Greeks Analyzer** | Python, Polygon.io, NumPy, SciPy | ✅ Complete |
| 03 | **Dark Pool & Block Trade Tracker** | Python, Polygon.io, Telegram Bot API | ✅ Complete |
| 04 | **Econ Calendar & News Sentiment Feed** | Python, VADER, Alpaca News API, PostgreSQL, Docker | ✅ Complete |
| 05 | **Unusual Options Activity Scanner** | Python, Polygon.io, PostgreSQL | ✅ Complete |
| 06 | **Sector & Correlation Heatmap** | Python, Pandas, Flask, Plotly | ✅ Complete |
| 07 | **Real-Time Order Book Depth Visualizer** | Python, Alpaca, WebSockets, Flask | ✅ Complete |
| 08 | **Historical Volatility & IV Rank Database** | Python, Polygon.io, PostgreSQL, Cron | ✅ Complete |
| 09 | **Insider Trading & 13F Filing Tracker** | Python, SEC EDGAR API, PostgreSQL | ✅ Complete |
| 10 | **Macro Dashboard (Fed, CPI, Yields)** | Python, FRED API, Flask | ✅ Complete |

## Tier 2 — Backtesting & Strategy

| # | Project | Tech | Status |
|---|---------|------|--------|
| 11 | Vectorized Backtesting Engine | Python, Pandas, NumPy | 📋 |
| 12 | Walk-Forward Optimization Framework | Python, Pandas, NumPy | 📋 |
| 13 | Monte Carlo Strategy Stress Tester | Python, NumPy, Matplotlib | 📋 |
| 14 | Mean-Reversion Pairs Trading Bot | Python, Alpaca, statsmodels | 📋 |
| 15 | Momentum Factor Strategy Library | Python, Pandas, PostgreSQL | 📋 |
| 16 | Options Credit Spread Screener & Backtester | Python, Polygon.io, Pandas | 📋 |
| 17 | Machine-Learning Signal Classifier | Python, XGBoost, scikit-learn | 📋 |
| 18 | Regime Detection Model (HMM) | Python, hmmlearn, NumPy | 📋 |
| 19 | Strategy Performance Attribution Engine | Python, PostgreSQL, Pandas | 📋 |
| 20 | Parameter Sensitivity & Overfitting Auditor | Python, Pandas, Matplotlib | 📋 |

## Tier 3 — Execution & Infrastructure

| # | Project | Tech | Status |
|---|---------|------|--------|
| 21 | Smart Order Router | Python, Alpaca, Interactive Brokers | 📋 |
| 22 | Order Execution Quality Analyzer | Python, PostgreSQL, Pandas | 📋 |
| 23 | Multi-Broker Abstraction Layer | Python, Alpaca, Interactive Brokers, Tradier | 📋 |
| 24 | Redis-Backed Signal Cache & Pub/Sub | Python, Redis | 📋 |
| 25 | Dockerized Multi-Strategy Orchestrator | Docker, Docker Compose, Python | 📋 |
| 26 | Infrastructure Health & Uptime Monitor | Prometheus, Grafana, Docker, Telegram Bot API | 📋 |
| 27 | Automated Deploy Pipeline for the Scanner | GitHub Actions, Docker, AWS EC2 | 📋 |
| 28 | WebSocket Live Price Feed Service | Python, WebSockets, Redis, Alpaca | 📋 |
| 29 | **Risk Pre-Trade Checker** | Python, Alpaca, PostgreSQL, Telegram Bot API | ✅ Complete |
| 30 | Disaster Recovery & State Snapshotting | Python, AWS S3, AWS EC2 | 📋 |

## Tier 4 — Risk & Portfolio Management

| # | Project | Tech | Status |
|---|---------|------|--------|
| 31 | **Trade Journal Database** | Python, PostgreSQL, Alpaca, Docker | ✅ Complete |
| 32 | Portfolio VaR & Drawdown Monitor | Python, PostgreSQL, NumPy | 📋 |
| 33 | Kelly/Vol-Target Position Sizing Optimizer | Python, NumPy, PostgreSQL | 📋 |
| 34 | Correlated Exposure Dashboard | Python, Flask, Alpaca | 📋 |
| 35 | **Daily P&L & Risk Report Generator** | Python, PostgreSQL, WeasyPrint | ✅ Complete |
| 36 | Strategy Capital Allocation Engine | Python, Pandas, PostgreSQL | 📋 |
| 37 | Stress-Test & Scenario Simulator | Python, Pandas, NumPy | 📋 |
| 38 | Kill-Switch & Circuit Breaker Service | Python, Alpaca, PostgreSQL | 📋 |
| 39 | Portfolio Rebalancing Scheduler | Python, Alpaca, PostgreSQL, Cron | 📋 |
| 40 | Compliance & Audit Trail Logger | Python, PostgreSQL | 📋 |

## Tier 5 — Agentic AI

| # | Project | Tech | Status |
|---|---------|------|--------|
| 41 | LLM Trade Journal Analyst Agent | Python, Claude API, PostgreSQL | 📋 |
| 42 | Natural-Language Strategy Query Bot | Python, Claude API, Telegram Bot API, PostgreSQL | 📋 |
| 43 | Autonomous Backtest-and-Report Agent | Python, Claude API, Pandas | 📋 |
| 44 | RAG Pipeline over SEC Filings & Earnings Calls | Python, pgvector, Claude API | 📋 |
| 45 | **Signal Explainability Agent** | Python, Claude API, PostgreSQL | ✅ Complete |
| 46 | Anomaly Detection Agent for Regime Shifts | Python, Claude API, Telegram Bot API | 📋 |
| 47 | Multi-Agent Strategy Research Team | Python, Claude Agent SDK | 📋 |
| 48 | Automated Code Review Agent for Strategy Changes | Python, Claude API, GitHub Actions | 📋 |
| 49 | Voice-Briefed Morning Market Prep Agent | Python, Claude API, Text-to-Speech | 📋 |
| 50 | Self-Tuning Parameter Agent | Python, Claude API | 📋 |

## Tier 6 — Trading & Execution

| # | Project | Tech | Status |
|---|---------|------|--------|
| 51 | Real-time Bid/Ask Spread Analyzer | Python, Alpaca, WebSockets, Pandas | 📋 |
| 52 | Order Slicing & Execution Algorithm (TWAP/VWAP) | Python, Alpaca, Pandas | 📋 |
| 53 | Latency Benchmarking Tool | Python, Alpaca, AWS EC2 | 📋 |
| 54 | Order Flow Toxicity Detector (VPIN) | Python, Polygon.io, NumPy | 📋 |
| 55 | Microstructure Noise Filter | Python, NumPy, Pandas | 📋 |

## Tier 7 — Machine Learning

| # | Project | Tech | Status |
|---|---------|------|--------|
| 56 | LSTM Price Direction Predictor | Python, TensorFlow/Keras, Pandas | 📋 |
| 57 | Random Forest Feature Importance Ranker | Python, scikit-learn, Pandas | 📋 |
| 58 | Sentiment Analysis on Fed Statements/FOMC Minutes | Python, Claude API, NLTK | 📋 |
| 59 | Reinforcement Learning Position Sizer | Python, Stable-Baselines3, NumPy | 📋 |

## Tier 8 — Fixed Income & Macro

| # | Project | Tech | Status |
|---|---------|------|--------|
| 60 | Yield Curve Monitor (2s10s Spread) | Python, FRED API, Pandas | 📋 |
| 61 | Credit Spread Tracker (HYG/LQD Ratio) | Python, yfinance, Pandas | 📋 |
| 62 | Macro Regime Dashboard (Growth/Inflation Quadrant) | Python, FRED API, Pandas | 📋 |
| 63 | Real Rate Monitor (TIPS vs Nominal) | Python, FRED API, Pandas | 📋 |
| 64 | Dollar Index Impact Analyzer | Python, FRED API, yfinance, Pandas | 📋 |

## Tier 9 — Alternative Data

| # | Project | Tech | Status |
|---|---------|------|--------|
| 65 | Retail Sentiment Tracker (Reddit/StockTwits Flow) | Python, Reddit API, StockTwits API, VADER | 📋 |
| 66 | Satellite Data Proxy (Shipping ETF Momentum) | Python, yfinance, Pandas | 📋 |
| 67 | Google Trends Signal Generator | Python, pytrends, Pandas | 📋 |

## Updating a project's status

```bash
python update_project.py 29 complete
python update_project.py 12 in-progress --github https://github.com/Joevue123/pairs-trading-bot
```

Updates `docs/projects.json` in place — no build step, no dependencies beyond the standard library.
Commit and push, and the live site picks it up on next load.

## Deployment

**GitHub Pages** (default): Settings → Pages → Source: GitHub Actions. The included workflow
(`.github/workflows/pages.yml`) deploys `docs/` on every push to `main`.

**Netlify**: point it at this repo with publish directory `docs` and no build command — it's
already static.
