"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import {
  borrowers,
  earlyWarnings,
  migrationMatrix,
  navGroups,
  pdTrend,
  riskBandConfig,
  type Borrower,
  type RiskBand,
} from "@/lib/risk-data";

type IconName =
  | "grid"
  | "building"
  | "pulse"
  | "shield"
  | "card"
  | "file"
  | "case"
  | "chart"
  | "sliders"
  | "database"
  | "users"
  | "search"
  | "bell"
  | "chevron"
  | "arrow"
  | "download"
  | "plus"
  | "close"
  | "menu"
  | "calendar"
  | "refresh"
  | "filter"
  | "external"
  | "check";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    grid: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
    building: "M4 20V5.5L12 3l8 2.5V20M8 20v-6h8v6M8 8h.01M12 8h.01M16 8h.01M12 11h.01",
    pulse: "M3 12h4l2.2-6 4.2 12 2.2-6H21",
    shield: "M12 3 20 6v5c0 4.7-3 8.2-8 10-5-1.8-8-5.3-8-10V6l8-3Zm-3.2 8.7 2.1 2.1 4.4-4.5",
    card: "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11ZM4 9h16M8 15h3",
    file: "M6 3h8l4 4v14H6V3Zm8 0v4h4M9 12h6M9 16h5",
    case: "M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M4 8h16v9.5A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5V8Zm0 4h16M10 12v1h4v-1",
    chart: "M4 19V5m0 14h16M8 16v-4m4 4V8m4 8v-7m4 7V5",
    sliders: "M4 6h16M4 12h16M4 18h16M8 4v4m8 2v4m-5 6v4",
    database: "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6m-14 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6",
    users: "M16 20v-1.5c0-2-1.8-3.5-4-3.5s-4 1.5-4 3.5V20m4-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-5a2.5 2.5 0 0 1 0 5m1 8v-1c0-1.5-.8-2.6-2-3.2",
    search: "m20 20-4.2-4.2M10.8 17a6.2 6.2 0 1 1 0-12.4 6.2 6.2 0 0 1 0 12.4Z",
    bell: "M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4",
    chevron: "m8 10 4 4 4-4",
    arrow: "M5 12h13m-5-5 5 5-5 5",
    download: "M12 3v11m0 0 4-4m-4 4-4-4M5 19h14",
    plus: "M12 5v14M5 12h14",
    close: "m6 6 12 12M18 6 6 18",
    menu: "M4 7h16M4 12h16M4 17h16",
    calendar: "M6 4v3m12-3v3M4 9h16M5.5 5h13A1.5 1.5 0 0 1 20 6.5v12A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5Z",
    refresh: "M19 8a7 7 0 1 0 1 6m-1-6V4m0 4h-4",
    filter: "M4 6h16M7 12h10m-7 6h4",
    external: "M14 5h5v5m0-5-7 7M18 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4",
    check: "m5 12 4 4L19 6",
  };

  return (
    <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
}

function RiskBadge({ band }: { band: RiskBand }) {
  return <span className={`risk-badge risk-${band.toLowerCase().replace(" ", "-")}`}>{band}</span>;
}

function Trend({ value }: { value: Borrower["trend"] }) {
  const improving = value === "Improving";
  const stable = value === "Stable";
  return <span className={`trend trend-${improving ? "up" : stable ? "stable" : "down"}`}><span>{improving ? "↗" : stable ? "→" : "↘"}</span>{value}</span>;
}

function formatPd(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function RiskPlatformShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="platform-shell">
      <aside className={`platform-sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}>
        <div className="sidebar-brand">
          <Link href="/app/overview" className="risk-wordmark" onClick={() => setMobileOpen(false)}>
            <span className="risk-mark">R</span>
            <span className="risk-brand-copy"><strong>MSME Risk<span>360</span></strong><small>Predictive risk platform</small></span>
          </Link>
          <button className="icon-button sidebar-toggle" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <Icon name="chevron" />
          </button>
        </div>

        <div className="bank-scope">
          <span className="scope-dot" />
          <span><strong>IDBI Bank</strong><small>MSME Credit Risk · Production</small></span>
          <Icon name="chevron" size={15} />
        </div>

        <nav className="platform-nav" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map((item) => {
                const active = pathname === item.href || (item.href !== "/app/overview" && pathname.startsWith(item.href));
                const badge = "badge" in item ? item.badge : undefined;
                return <Link key={item.href} href={item.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined} onClick={() => setMobileOpen(false)}>
                  <Icon name={item.icon} /><span>{item.label}</span>{badge ? <em>{badge}</em> : null}
                </Link>;
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="governance-status"><span className="status-dot" /><span><strong>Model status</strong><small>PD model v2.4.1 · Monitored</small></span></div>
          <Link href="/app/settings" className={pathname.startsWith("/app/settings") ? "active" : ""}><Icon name="sliders" /><span>Settings</span></Link>
          <div className="sidebar-user"><span className="avatar avatar-orange">AK</span><span><strong>Ananya Krishnan</strong><small>Risk analyst</small></span><Icon name="chevron" size={15} /></div>
        </div>
      </aside>

      <div className="platform-body">
        <header className="platform-topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen((value) => !value)} aria-label="Open navigation"><Icon name={mobileOpen ? "close" : "menu"} /></button>
          <div className="breadcrumb"><span>Risk operations</span><Icon name="chevron" size={14} /><strong>{pathname.includes("portfolio") ? "MSME Portfolio" : pathname.includes("early-warning") ? "Early Warning" : "Overview"}</strong></div>
          <div className="topbar-actions">
            <label className="global-search"><Icon name="search" size={17} /><input placeholder="Search MSME, CIF or loan account" aria-label="Search MSME, CIF or loan account" /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" aria-label="Notifications"><Icon name="bell" /><i>4</i></button>
            <span className="topbar-divider" />
            <div className="topbar-user"><span className="avatar">AK</span><span><strong>Ananya Krishnan</strong><small>Risk analyst</small></span><Icon name="chevron" size={15} /></div>
          </div>
        </header>
        <main className="platform-main">{children}</main>
      </div>
    </div>
  );
}

function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="page-intro"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function StatCard({ label, value, meta, metaTone = "neutral", icon, accent }: { label: string; value: string; meta: string; metaTone?: "neutral" | "positive" | "warning" | "danger"; icon: IconName; accent?: string }) {
  return <article className="stat-card" style={accent ? { borderTopColor: accent } : undefined}><div className="stat-card-top"><span>{label}</span><span className="stat-icon"><Icon name={icon} size={17} /></span></div><strong>{value}</strong><small className={`meta-${metaTone}`}>{meta}</small></article>;
}

function Panel({ title, subtitle, action, children, className = "" }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`}><div className="panel-heading"><div><h2>{title}</h2>{subtitle ? <p>{subtitle}</p> : null}</div>{action}</div>{children}</section>;
}

export function OverviewDashboard() {
  const [range, setRange] = useState("12 months");
  const [selectedBand, setSelectedBand] = useState("All risk bands");
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredBorrowers = useMemo(() => selectedBand === "All risk bands" ? borrowers : borrowers.filter((borrower) => borrower.band === selectedBand), [selectedBand]);

  return <div className="overview-page">
    <PageIntro eyebrow="Portfolio command centre" title="Risk overview" description="A forward-looking view of MSME credit exposure, default probability and intervention priorities across the bank." action={<div className="intro-actions"><button className="button secondary"><Icon name="calendar" size={16} />20 Jul 2026 <Icon name="chevron" size={15} /></button><button className="button primary"><Icon name="plus" size={16} />Create case</button></div>} />

    <div className="coverage-banner"><span className="coverage-icon"><Icon name="pulse" size={18} /></span><div><strong>Predictive coverage is healthy</strong><span>2,184 of 2,241 active borrowers have a current 12-month PD assessment. 57 records are awaiting fresh data.</span></div><button>View data gaps <Icon name="arrow" size={15} /></button></div>

    <div className="stats-grid">
      <StatCard label="MSME borrowers" value="2,241" meta="↑ 4.8% vs last quarter" metaTone="positive" icon="building" />
      <StatCard label="Credit exposure" value="₹1,284 Cr" meta="Across 3,912 loan facilities" icon="card" />
      <StatCard label="Weighted average PD" value="8.9%" meta="↑ 0.6 pp vs last month" metaTone="warning" icon="pulse" accent="#d39b2f" />
      <StatCard label="High-risk borrowers" value="231" meta="10.3% of portfolio" metaTone="danger" icon="shield" accent="#d44a3a" />
      <StatCard label="Open actions" value="48" meta="12 due in next 7 days" metaTone="warning" icon="case" accent="#e4773a" />
    </div>

    <div className="dashboard-grid dashboard-grid-top">
      <Panel title="Borrowers by risk band" subtitle="Current 12-month PD distribution" className="risk-distribution-panel" action={<button className="text-button">View portfolio <Icon name="arrow" size={15} /></button>}>
        <div className="distribution-content"><div className="donut-chart" style={{ background: "conic-gradient(#187a5a 0deg 143deg, #3b9b75 143deg 218deg, #d39b2f 218deg 291deg, #e4773a 291deg 335deg, #d44a3a 335deg 354deg, #9c2533 354deg 360deg)" }}><div><strong>2,241</strong><span>borrowers</span></div></div><div className="legend-list">{riskBandConfig.map((band, index) => <button key={band.label} className={`legend-row ${selectedBand === band.label ? "selected" : ""}`} onClick={() => setSelectedBand(selectedBand === band.label ? "All risk bands" : band.label)}><span className="legend-label"><i style={{ background: band.color }} />{band.label}</span><strong>{[891, 464, 446, 231, 172, 37][index]}</strong><small>{["39.8%", "20.7%", "19.9%", "10.3%", "7.7%", "1.6%"][index]}</small></button>)}</div></div>
      </Panel>

      <Panel title="Portfolio PD trend" subtitle="Weighted average probability of default" action={<div className="segmented-control">{["1 month", "3 months", "12 months"].map((option) => <button key={option} className={range === option ? "active" : ""} onClick={() => setRange(option)}>{option.replace(" months", "m").replace(" month", "m")}</button>)}</div>}>
        <div className="chart-wrap"><div className="chart-y-labels"><span>10%</span><span>8%</span><span>6%</span><span>4%</span><span>2%</span></div><svg className="trend-chart" viewBox="0 0 600 230" preserveAspectRatio="none" role="img" aria-label={`Portfolio probability of default over ${range}`}><defs><linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#02684f" stopOpacity=".18" /><stop offset="100%" stopColor="#02684f" stopOpacity="0" /></linearGradient></defs><path className="chart-grid-lines" d="M0 26H600M0 71H600M0 116H600M0 161H600M0 206H600" /><path className="chart-area" d="M0 91 L100 82 L200 91 L300 76 L400 62 L500 67 L600 48 L600 206 L0 206 Z" /><path className="chart-line" d="M0 91 L100 82 L200 91 L300 76 L400 62 L500 67 L600 48" />{pdTrend.map((value, index) => <circle key={value + index} cx={index * 100} cy={[91, 82, 91, 76, 62, 67, 48][index]} r="4" className="chart-point" />)}</svg><div className="chart-x-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span></div></div><div className="chart-callout"><span className="callout-line" /><span><strong>8.9%</strong> current weighted average PD</span><em>+0.6 pp since Jun</em></div></Panel>
    </div>

    <div className="dashboard-grid dashboard-grid-bottom">
      <Panel title="Priority attention" subtitle={`${filteredBorrowers.length} borrowers match ${selectedBand.toLowerCase()}`} className="priority-panel" action={<div className="panel-actions"><select className="select-control" value={selectedBand} onChange={(event) => setSelectedBand(event.target.value)} aria-label="Filter by risk band"><option>All risk bands</option>{riskBandConfig.map((band) => <option key={band.label}>{band.label}</option>)}</select><button className={`icon-button bordered ${showFilters ? "selected" : ""}`} onClick={() => setShowFilters((value) => !value)} aria-label="Toggle filters"><Icon name="filter" size={16} /></button><button className="icon-button bordered" aria-label="Export priority attention"><Icon name="download" size={16} /></button></div>}>
        {showFilters ? <div className="filter-strip"><label>Branch<select><option>All branches</option><option>Pune Camp</option><option>Hyderabad Main</option></select></label><label>Product<select><option>All products</option><option>Working capital</option><option>Term loan</option></select></label><button className="text-button">Clear filters</button></div> : null}
        <div className="table-scroll"><table className="risk-table"><thead><tr><th>MSME / branch</th><th>Exposure</th><th>12m PD</th><th>Risk band</th><th>PD change</th><th>Top risk driver</th><th>Owner</th><th /></tr></thead><tbody>{filteredBorrowers.map((borrower) => <tr key={borrower.id}><td><button className="borrower-link" onClick={() => setSelectedBorrower(borrower)}><strong>{borrower.name}</strong><span>{borrower.customerId} · {borrower.branch}</span></button></td><td>{borrower.exposure}</td><td><strong className="pd-value">{formatPd(borrower.pd)}</strong></td><td><RiskBadge band={borrower.band} /><Trend value={borrower.trend} /></td><td><span className={borrower.pd > borrower.previousPd ? "pd-change up" : "pd-change down"}>{borrower.pd > borrower.previousPd ? "+" : "−"}{Math.abs((borrower.pd - borrower.previousPd) * 100).toFixed(1)} pp</span></td><td><span className="driver-cell">{borrower.driver}</span></td><td>{borrower.officer}</td><td><button className="row-action" onClick={() => setSelectedBorrower(borrower)} aria-label={`Review ${borrower.name}`}><Icon name="arrow" size={16} /></button></td></tr>)}</tbody></table></div>
        <div className="panel-footer"><span>Showing {filteredBorrowers.length} of 2,241 borrowers</span><Link href="/app/portfolio" className="text-button">Open full portfolio <Icon name="arrow" size={15} /></Link></div>
      </Panel>

      <Panel title="Early-warning signals" subtitle="Latest signals requiring attention" className="warnings-panel" action={<Link href="/app/early-warning" className="text-button">View all <Icon name="arrow" size={15} /></Link>}>
        <div className="warning-list">{earlyWarnings.slice(0, 4).map((warning) => <button className="warning-row" key={warning.id} onClick={() => { const match = borrowers.find((borrower) => borrower.name === warning.borrower); if (match) setSelectedBorrower(match); }}><span className={`severity-dot severity-${warning.severity.toLowerCase()}`} /><span className="warning-copy"><strong>{warning.title}</strong><small>{warning.borrower} · {warning.time}</small></span><span className="warning-impact">{warning.impact}<small>{warning.status}</small></span><Icon name="chevron" size={15} /></button>)}</div>
        <div className="warning-footer"><span><i className="severity-dot severity-critical" />4 high or critical signals</span><Link href="/app/cases" className="text-button">Review queue <Icon name="arrow" size={15} /></Link></div>
      </Panel>
    </div>

    <div className="dashboard-grid dashboard-grid-bottom">
      <Panel title="Risk migration matrix" subtitle="Previous band → current band · last 90 days" action={<button className="text-button">Explore migration <Icon name="arrow" size={15} /></button>}>
        <div className="matrix-wrap"><table className="migration-table"><thead><tr><th>Previous ↓ / Current →</th><th>Low</th><th>Moderate</th><th>High</th><th>Very high</th><th>Critical</th></tr></thead><tbody>{["Low", "Moderate", "High", "Very high", "Critical"].map((row, rowIndex) => <tr key={row}><th>{row}</th>{migrationMatrix[rowIndex].map((value, index) => <td key={index} className={rowIndex === index ? "matrix-diagonal" : Number(value) > 20 ? "matrix-risk" : ""}>{value}</td>)}</tr>)}</tbody></table><div className="matrix-note"><span className="matrix-legend"><i className="matrix-stable" />Stayed in band <i className="matrix-risk-swatch" />Moved to higher risk</span><strong>72 accounts migrated to higher risk</strong></div></div>
      </Panel>
      <Panel title="Exposure at risk" subtitle="High and critical exposure by industry" action={<button className="text-button">View analysis <Icon name="arrow" size={15} /></button>}>
        <div className="exposure-bars">{[["Auto components", 31, "₹84.2 Cr"], ["Textiles", 24, "₹62.1 Cr"], ["Food processing", 18, "₹47.8 Cr"], ["Engineering", 14, "₹35.6 Cr"], ["Transport", 9, "₹22.9 Cr"]].map(([label, width, amount]) => <div className="exposure-row" key={String(label)}><div><span>{label}</span><strong>{amount}</strong></div><div className="exposure-track"><i style={{ width: `${width}%` }} /></div></div>)}</div>
      </Panel>
    </div>

    {selectedBorrower ? <div className="drawer-backdrop" onClick={() => setSelectedBorrower(null)}><aside className="borrower-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><span className="eyebrow">Risk review</span><h2>{selectedBorrower.name}</h2><p>{selectedBorrower.customerId} · {selectedBorrower.branch}</p></div><button className="icon-button" onClick={() => setSelectedBorrower(null)} aria-label="Close review"><Icon name="close" /></button></div><div className="drawer-pd"><div><span>12-month probability of default</span><strong>{formatPd(selectedBorrower.pd)}</strong><RiskBadge band={selectedBorrower.band} /></div><div className="drawer-change"><span>vs previous</span><strong className={selectedBorrower.pd > selectedBorrower.previousPd ? "up" : "down"}>{selectedBorrower.pd > selectedBorrower.previousPd ? "+" : "−"}{Math.abs((selectedBorrower.pd - selectedBorrower.previousPd) * 100).toFixed(1)} pp</strong><Trend value={selectedBorrower.trend} /></div></div><div className="drawer-section"><h3>Primary risk driver</h3><div className="driver-callout"><span className="severity-dot severity-high" /><div><strong>{selectedBorrower.driver}</strong><p>Observed in the latest {selectedBorrower.product.toLowerCase()} assessment and contributing to the current PD increase.</p><small>Source: Core banking · Updated 18 Jul 2026</small></div></div></div><div className="drawer-section"><h3>Recommended next action</h3><div className="action-callout"><span className="action-number">1</span><div><strong>Schedule relationship-manager follow-up</strong><p>Confirm receivables position and request the latest stock statement within 5 business days.</p></div></div></div><div className="drawer-meta"><div><span>Total exposure</span><strong>{selectedBorrower.exposure}</strong></div><div><span>Open signals</span><strong>{selectedBorrower.alerts}</strong></div><div><span>Days past due</span><strong>{selectedBorrower.dpd}</strong></div><div><span>Model version</span><strong>PD v2.4.1</strong></div></div><div className="drawer-footer"><Link className="button secondary" href={`/app/portfolio/${selectedBorrower.id}`} onClick={() => setSelectedBorrower(null)}>Open MSME profile <Icon name="external" size={15} /></Link><button className="button primary" onClick={() => setSelectedBorrower(null)}>Assign action</button></div></aside></div> : null}
  </div>;
}

export function ModulePage({ module }: { module: string }) {
  const [query, setQuery] = useState("");
  const isPortfolio = module === "portfolio";
  const isWarnings = module === "early-warning";
  const isAssessments = module === "risk-assessments";
  const titles: Record<string, [string, string, string]> = {
    portfolio: ["MSME portfolio", "Portfolio directory", "Search, filter and triage borrower-level default risk across the bank."],
    "early-warning": ["Early warning", "Signal queue", "Review emerging stress signals before they become delinquency events."],
    "risk-assessments": ["Risk assessments", "Assessment register", "Central register of current and historical 12-month probability of default assessments."],
    loans: ["Loan accounts", "Loan risk view", "Monitor facility-level risk, repayment conduct and intervention status."],
    documents: ["Documents", "Evidence vault", "Governed unstructured evidence used to support explainable risk assessments."],
    cases: ["Cases & actions", "Intervention queue", "Coordinate review, follow-up and escalation across risk owners."],
    reports: ["Reports", "Risk reporting", "Build repeatable portfolio, branch and model-performance reports."],
    "model-governance": ["Model governance", "Model control plane", "Monitor model performance, versions, calibration and review obligations."],
    "data-sources": ["Data sources", "Signal coverage", "Track source freshness, availability and contribution to predictive risk."],
    administration: ["Administration", "Access & policy", "Manage bank scopes, roles, risk-band thresholds and workflow policies."],
    settings: ["Settings", "Workspace settings", "Manage notification preferences, defaults and analyst workspace configuration."],
  };
  const [eyebrow, title, description] = titles[module] ?? titles.portfolio;
  const filtered = borrowers.filter((borrower) => `${borrower.name} ${borrower.customerId} ${borrower.branch} ${borrower.industry}`.toLowerCase().includes(query.toLowerCase()));

  return <div className="module-page"><PageIntro eyebrow={eyebrow} title={title} description={description} action={<div className="intro-actions"><button className="button secondary"><Icon name="download" size={16} />Export</button>{(isPortfolio || isWarnings) ? <button className="button primary"><Icon name="plus" size={16} />{isWarnings ? "Create signal" : "Add borrower"}</button> : null}</div>} />
    <div className="module-summary"><div><span>Records in view</span><strong>{isWarnings ? "18" : isAssessments ? "2,184" : isPortfolio ? "2,241" : "48"}</strong><small>Updated 20 Jul 2026 · 09:42 IST</small></div><div><span>Requires attention</span><strong className="summary-warning">{isWarnings ? "12" : isAssessments ? "96" : "231"}</strong><small>Across active bank scope</small></div><div><span>Data freshness</span><strong className="summary-positive">96.4%</strong><small>Current within 30 days</small></div><div><span>Model version</span><strong>PD v2.4.1</strong><small>Production · monitored</small></div></div>
    {isPortfolio || isWarnings || isAssessments ? <Panel title={isWarnings ? "Open signals" : isAssessments ? "Recent assessments" : "All MSME borrowers"} subtitle={isWarnings ? "Sorted by severity and due date" : isAssessments ? "Current production assessments across the portfolio" : "Bank-wide directory"} action={<div className="module-controls"><label className="table-search"><Icon name="search" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isWarnings ? "Search signals" : "Search MSME, CIF or branch"} /></label><button className="icon-button bordered"><Icon name="filter" size={16} /></button></div>}><div className="table-scroll"><table className="risk-table module-table"><thead><tr><th>{isWarnings ? "Signal" : "MSME / customer ID"}</th><th>{isWarnings ? "Severity" : "Branch / industry"}</th><th>{isWarnings ? "Detected" : "Exposure"}</th><th>{isWarnings ? "PD impact" : "12m PD"}</th><th>{isWarnings ? "Status" : "Risk band"}</th><th>{isWarnings ? "Owner" : "Assessment"}</th><th /></tr></thead><tbody>{(isWarnings ? earlyWarnings : filtered).map((row) => "title" in row ? <tr key={row.id}><td><button className="borrower-link"><strong>{row.title}</strong><span>{row.borrower} · {row.source}</span></button></td><td><span className={`severity-label severity-label-${row.severity.toLowerCase()}`}><i className={`severity-dot severity-${row.severity.toLowerCase()}`} />{row.severity}</span></td><td>{row.time}</td><td><strong>{row.impact}</strong></td><td><span className="status-pill">{row.status}</span></td><td>R. Kulkarni</td><td><button className="row-action"><Icon name="arrow" size={16} /></button></td></tr> : <tr key={row.id}><td><button className="borrower-link"><strong>{row.name}</strong><span>{row.customerId}</span></button></td><td><span>{row.branch}</span><small className="table-subtext">{row.industry}</small></td><td>{row.exposure}</td><td><strong className="pd-value">{formatPd(row.pd)}</strong><small className={row.pd > row.previousPd ? "pd-change up" : "pd-change down"}>{row.pd > row.previousPd ? "+" : "−"}{Math.abs((row.pd - row.previousPd) * 100).toFixed(1)} pp</small></td><td><RiskBadge band={row.band} /><Trend value={row.trend} /></td><td>{row.assessed}</td><td><button className="row-action"><Icon name="arrow" size={16} /></button></td></tr>)}</tbody></table></div><div className="panel-footer"><span>Showing {isWarnings ? earlyWarnings.length : filtered.length} records</span><span className="pagination"><button className="icon-button bordered"><Icon name="chevron" size={15} /></button><strong>1</strong><button className="icon-button bordered"><Icon name="chevron" size={15} /></button></span></div></Panel> : <ModuleCards module={module} />}
  </div>;
}

function ModuleCards({ module }: { module: string }) {
  const cards: Record<string, Array<[string, string, string, IconName]>> = {
    loans: [["Working capital facilities", "1,324", "8.2% average PD", "card"], ["Term loans", "812", "6.7% average PD", "card"], ["Secured facilities", "1,776", "5.4% average PD", "shield"]],
    documents: [["Documents indexed", "18,422", "97.2% extraction coverage", "file"], ["Awaiting review", "124", "18 high-impact signals", "pulse"], ["Source freshness", "96.4%", "Within current policy", "database"]],
    cases: [["Open interventions", "48", "12 due this week", "case"], ["Under review", "31", "9 awaiting borrower response", "pulse"], ["Escalated", "7", "2 senior-risk reviews", "shield"]],
    reports: [["Scheduled reports", "16", "Next run today 18:00", "chart"], ["Generated this month", "42", "Across 8 report types", "file"], ["Portfolio PD", "8.9%", "+0.6 pp monthly", "pulse"]],
    "model-governance": [["Production models", "4", "All monitored", "shield"], ["Latest validation", "Passed", "Completed 12 Jul 2026", "check"], ["Drift watchlist", "2", "Feature distribution shift", "pulse"]],
    "data-sources": [["Connected sources", "12", "2 need attention", "database"], ["Current records", "96.4%", "Across active borrowers", "check"], ["Signals this month", "1,842", "Structured + unstructured", "pulse"]],
    administration: [["Active users", "186", "4 pending access reviews", "users"], ["Risk bands", "6", "Configurable thresholds", "sliders"], ["Open audit events", "9", "All within SLA", "file"]],
    settings: [["Notifications", "Enabled", "4 alert categories", "bell"], ["Default horizon", "12 months", "Production policy", "calendar"], ["Workspace scope", "West region", "Change scope", "building"]],
  };
  return <div className="module-card-grid">{(cards[module] ?? cards.settings).map(([label, value, meta, icon]) => <article className="module-card" key={label}><span className="stat-icon"><Icon name={icon} /></span><span>{label}</span><strong>{value}</strong><small>{meta}</small></article>)}</div>;
}

export function BorrowerProfile({ id, tab = "risk" }: { id: string; tab?: string }) {
  const borrower = borrowers.find((item) => item.id === id) ?? borrowers[0];
  const tabs = [["Risk Summary", "risk"], ["Loan Accounts", "loans"], ["Financial Evidence", "financials"], ["Transactions", "transactions"], ["GST & Revenue", "gst"], ["Documents", "documents"], ["Early Warning", "alerts"], ["Cases & Actions", "actions"], ["Timeline", "timeline"]];
  return <div className="profile-page"><div className="profile-breadcrumb"><Link href="/app/portfolio">MSME Portfolio</Link><Icon name="chevron" size={14} /><span>{borrower.name}</span></div><div className="profile-header"><div><span className="eyebrow">MSME risk profile</span><h1>{borrower.name}</h1><p>{borrower.customerId} · {borrower.industry} · {borrower.branch} · Relationship manager: {borrower.officer}</p></div><div className="profile-actions"><button className="button secondary"><Icon name="download" size={16} />Assessment report</button><button className="button primary"><Icon name="plus" size={16} />Create action</button></div></div><div className="profile-strip"><div><span>Total exposure</span><strong>{borrower.exposure}</strong></div><div><span>12-month PD</span><strong className="profile-pd">{formatPd(borrower.pd)}</strong></div><div><span>Risk band</span><RiskBadge band={borrower.band} /></div><div><span>Risk trend</span><Trend value={borrower.trend} /></div><div><span>Current delinquency</span><strong>{borrower.dpd ? `${borrower.dpd} DPD` : "Current"}</strong></div><div><span>Model version</span><strong>PD v2.4.1</strong></div></div><nav className="profile-tabs" aria-label="MSME profile tabs">{tabs.map(([label, slug]) => <Link key={slug} href={`/app/portfolio/${borrower.id}/${slug}`} className={tab === slug ? "active" : ""}>{label}</Link>)}</nav>{tab === "risk" ? <RiskSummary borrower={borrower} /> : <ProfileTabContent tab={tab} borrower={borrower} />}</div>;
}

function RiskSummary({ borrower }: { borrower: Borrower }) {
  return <><div className="profile-grid"><Panel title="12-month probability of default" subtitle="Current borrower-level prediction" className="profile-risk-card"><div className="large-pd"><strong>{formatPd(borrower.pd)}</strong><span>+{((borrower.pd - borrower.previousPd) * 100).toFixed(1)} percentage points since last assessment</span></div><div className="risk-card-meta"><div><span>Risk band</span><RiskBadge band={borrower.band} /></div><div><span>Prediction horizon</span><strong>12 months</strong></div><div><span>Assessment date</span><strong>{borrower.assessed}</strong></div><div><span>Uncertainty range</span><strong>20.1% – 27.6%</strong></div></div><div className="model-note"><Icon name="shield" size={16} /><span><strong>Explainable production output</strong> · Calibrated across working-capital and term-loan portfolios. Data cut-off: 18 Jul 2026.</span></div></Panel><Panel title="Risk trajectory" subtitle="PD and key signals · last 12 months" action={<button className="text-button">View full history <Icon name="arrow" size={15} /></button>}><div className="profile-chart"><svg viewBox="0 0 560 190" preserveAspectRatio="none"><path className="chart-grid-lines" d="M0 28H560M0 76H560M0 124H560M0 172H560" /><path className="chart-line" d="M0 132 L80 126 L160 128 L240 108 L320 114 L400 88 L480 62 L560 42" /><circle className="chart-point" cx="560" cy="42" r="4" /></svg><div className="chart-x-labels"><span>Aug 25</span><span>Oct</span><span>Dec</span><span>Feb 26</span><span>Apr</span><span>Jun</span><span>Jul</span></div></div><div className="trajectory-legend"><span><i className="legend-line pd-line" />Probability of default</span><span><i className="legend-dot warning-line" />Early-warning event</span><span><i className="legend-dot dpd-line" />Delinquency</span></div></Panel></div><div className="profile-grid profile-grid-bottom"><Panel title="Risk-increasing drivers" subtitle="Feature contribution to current PD"><div className="driver-list">{[["Operating cash flow", "₹1.8 Cr", "₹2.5 Cr", "+27% decline", "High"], ["Working-capital utilization", "94%", "76%", "+18 pp", "High"], ["Delayed instalments", "2", "0", "+2 events", "Medium"], ["GST turnover", "₹6.4 Cr", "₹8.1 Cr", "−21% YoY", "Medium"]].map(([feature, value, previous, change, severity]) => <div className="driver-row" key={feature}><div><strong>{feature}</strong><small>{value} <span>vs {previous}</span></small></div><span className="driver-change">{change}</span><span className={`driver-severity ${severity.toLowerCase()}`}>{severity}</span></div>)}</div><Link href="#drivers" className="panel-link">See all model drivers <Icon name="arrow" size={15} /></Link></Panel><Panel title="Risk-reducing factors" subtitle="Signals currently offsetting default risk"><div className="positive-list">{["No overdue interest as of 18 Jul 2026", "Collateral coverage remains above policy threshold", "Customer concentration reduced from 42% to 31%"].map((factor) => <div className="positive-row" key={factor}><span className="positive-check"><Icon name="check" size={14} /></span><span>{factor}</span></div>)}</div><div className="data-note"><Icon name="database" size={15} /><span>Inputs from 8 structured sources and 3 reviewed documents.</span></div></Panel></div></>;
}

function ProfileTabContent({ tab, borrower }: { tab: string; borrower: Borrower }) {
  const labels: Record<string, [string, string]> = { loans: ["Loan accounts", "Facility-level exposure, repayment conduct and collateral coverage."], financials: ["Financial evidence", "Financial statements and ratios are supporting evidence for the risk prediction."], transactions: ["Transactions", "Account conduct, credits, debits and behavioural anomalies."], gst: ["GST & revenue", "Turnover, filing regularity and revenue consistency signals."], documents: ["Documents", "Reviewed and pending evidence used by the risk model."], alerts: ["Early-warning signals", "Signals detected for this borrower and their review status."], actions: ["Cases & actions", "Interventions, owners, due dates and audit history."], timeline: ["Timeline", "Chronological record of assessments, signals and interventions."] };
  const [title, description] = labels[tab] ?? labels.risk;
  return <Panel title={title} subtitle={description} action={<button className="button primary"><Icon name="plus" size={16} />Add record</button>}><div className="tab-empty"><span className="tab-empty-icon"><Icon name={tab === "documents" ? "file" : tab === "alerts" ? "pulse" : tab === "actions" ? "case" : "database"} size={22} /></span><h3>{tab === "alerts" ? `${borrower.alerts} open signals` : "Supporting data is ready"}</h3><p>This view is wired to the shared MSME risk profile and keeps evidence, signals and actions connected to the current {formatPd(borrower.pd)} PD assessment.</p><button className="button secondary">Open workspace <Icon name="arrow" size={15} /></button></div></Panel>;
}

export { Icon, RiskBadge, Trend, formatPd };
