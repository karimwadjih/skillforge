import type { CSSProperties, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function AppShell({
  children,
  nav
}: {
  children: ReactNode;
  nav: ReactNode;
}) {
  return (
    <div className="sf-app">
      <div className="sf-shell">
        <nav className="sf-nav">{nav}</nav>
        {children}
        <footer className="sf-footer">
          Portable skill packages with visible standards, review posture, and maturity labels that mean what they say.
        </footer>
      </div>
    </div>
  );
}

export function Brand() {
  return (
    <div className="sf-brand">
      <span className="sf-brand-mark">Curated Skill Registry</span>
      <span className="sf-brand-name">Skillforge</span>
    </div>
  );
}

export function NavLinks({
  items
}: {
  items: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="sf-nav-links">
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </div>
  );
}

export function Hero({
  kicker,
  title,
  subtitle,
  aside
}: {
  kicker: string;
  title: string;
  subtitle: string;
  aside?: ReactNode;
}) {
  return (
    <section className="sf-hero">
      <div className="sf-hero-grid">
        <div>
          <div className="sf-kicker">{kicker}</div>
          <h1 className="sf-title">{title}</h1>
          <p className="sf-subtitle">{subtitle}</p>
        </div>
        {aside ? <div className="sf-grid">{aside}</div> : null}
      </div>
    </section>
  );
}

export function Panel({
  children,
  className,
  style
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section className={cx("sf-panel", className)} style={style}>
      {children}
    </section>
  );
}

export function Badge({
  label,
  tone = "default"
}: {
  label: string;
  tone?: "default" | "certified" | "frontier" | "experimental" | "scaffold";
}) {
  return <span className={cx("sf-badge", tone !== "default" && `sf-badge-${tone}`)}>{label}</span>;
}

export function StatCard({
  label,
  value,
  note
}: {
  label: string;
  value: string | number;
  note?: string;
}) {
  return (
    <div className="sf-panel sf-stat">
      <span className="sf-stat-label">{label}</span>
      <span className="sf-stat-value">{value}</span>
      {note ? <span className="sf-text-muted">{note}</span> : null}
    </div>
  );
}

export function SkillCard({
  href,
  name,
  summary,
  category,
  maturity,
  tier,
  score
}: {
  href: string;
  name: string;
  summary: string;
  category: string;
  maturity: string;
  tier: string;
  score: number;
}) {
  return (
    <a href={href} className="sf-card">
      <div className="sf-card-top">
        <div className="sf-badges">
          <Badge label={maturity} tone={maturity as "certified" | "frontier" | "experimental" | "scaffold"} />
          <Badge label={tier} />
        </div>
        <span className="sf-card-score">Score {score}</span>
      </div>
      <div>
        <h3>{name}</h3>
        <p>{summary}</p>
      </div>
      <div className="sf-card-meta">
        <span className="sf-card-category">{category}</span>
        <span>Open skill</span>
      </div>
    </a>
  );
}

export function MarkdownArticle({ source }: { source: string }) {
  return (
    <div className="sf-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  );
}

export function CompareTable({
  rows
}: {
  rows: Array<{
    label: string;
    left: ReactNode;
    right: ReactNode;
  }>;
}) {
  return (
    <div className="sf-compare-scroll">
      <table className="sf-compare-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Left</th>
            <th>Right</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{row.left}</td>
              <td>{row.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
