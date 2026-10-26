# Anthropic IPO Dashboard

An interactive pre-IPO analysis of **Anthropic, PBC's Form S-1**, filed with the SEC on **October 26, 2026** (Nasdaq: `ANT`), built the way a top-tier ECM / pre-IPO banker would frame the equity story.

**Live dashboard:** https://andcalcagnonyc.github.io/anthropic-ipo-dashboard/

Designed by [Andrea Calcagno](https://www.linkedin.com/in/andreacalcagno/).

## What's inside

| # | Section | What it answers |
|---|---------|-----------------|
| 01 | Overview | Six headline KPIs: scale, growth, profitability, expansion, liquidity, run-rate |
| 02 | Revenue & mix | Quarterly and annual revenue, consumption vs subscription, cloud-marketplace channel, $100K+ customers, concentration |
| 03 | Costs & margins | Cost mix as % of revenue, GAAP vs adjusted margin, revenue per $1 of compute, full statement of operations |
| 04 | Investment & capital | Compute commitments by counterparty and terms, cash, operating cash flow, vendor financing |
| 05 | People | Headcount, revenue per employee, personnel cost and SBC |
| 06 | Cap table & control | Votes vs economics, co-founder stakes, estimated ownership, price and liquidation preference by round, what control means for IPO buyers |
| 07 | Management & governance | Board and officers, Long-Term Benefit Trust trustees, 2025 executive compensation, governance assessment |
| 08 | Strategy | Seven growth pillars from the S-1 |
| 09 | Top 5 product priorities | Ranked product bets with the KPI to watch for each |
| 10 | Direct competition | OpenAI, Google, SpaceXAI, Meta and open-weight models: scale, overlap, edge |
| 11 | Risks | 10 S-1 risk factors on a likelihood × impact matrix with mitigants |
| 12 | Forecast | Bear / base / bull and probability-weighted revenue to FY2028 |
| 13 | Sensitivity | Valuation grid (growth × multiple), tornado of value drivers, compute-bill coverage |
| 14 | Valuation & verdict | Reference valuations, multiples, bull/bear case, diligence checklist |

## Open data

Every number on the page is read from the 22 open datasets in [`data/`](data/), in both JSON and CSV. [`data/datasets.json`](data/datasets.json) lists each dataset with its title, description, basis and columns.

| Dataset | Basis |
|---|---|
| `annual_pl`, `channel_mix`, `customers`, `people`, `sbc`, `commitments`, `q_opinc` | S-1 as filed (Q1 2026 operating income derived as H1 − Q2) |
| `founders`, `captable_facts`, `funding_rounds`, `board`, `trustees`, `exec_comp` | S-1 as filed (stockholders, preferred stock note, management, governance, compensation) |
| `quarterly`, `kpis`, `compute_eff`, `pricing_mix` | S-1 plus press reporting of the S-1 (Q3 2026 revenue, quarterly compute) |
| `valuation`, `competitors` | Press-reported figures (Series H, IPO marks, OpenAI, Google Cloud) |
| `risks`, `product_priorities`, `forecast_assumptions` | **Analyst estimates**, not company data or guidance |

Derived figures (ratios, totals, multiples, forecasts and sensitivities) are computed in the page from these datasets; see the `dash.calc` definitions in `index.html`.

## Run locally

It is a static site with no build step:

```bash
git clone https://github.com/andcalcagnonyc/anthropic-ipo-dashboard.git
cd anthropic-ipo-dashboard
python3 -m http.server 8000
# open http://localhost:8000
```

`runtime.js` is a ~70-line loader that fetches the datasets and runs the page's calculations; charts use [d3 v7](https://d3js.org).

## Sources

- Anthropic, PBC — Form S-1, SEC accession 0001628280-26-067168: https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm
- Press coverage of the filing and of competitors (CNBC, Yahoo Finance, Reuters / Financial Times, Bloomberg, Axios, Futurum, Cape Fear Advisors, ZeroHedge), as noted per dataset.

## Licenses

- Code (`index.html`, `runtime.js`): [MIT](LICENSE)
- Data (`data/`): [CC BY 4.0](data/LICENSE) — free to reuse with attribution to "Anthropic IPO Dashboard by Andrea Calcagno". Underlying S-1 figures are public SEC filings.

## Disclaimer

For information and research only. **Not investment advice.** Forecasts, sensitivities, risk scores and priority rankings are illustrative analyst estimates. Figures reported by the press may differ from final amended filings; the S-1 price range, share count and Q3 2026 results were blank at the time of writing.
