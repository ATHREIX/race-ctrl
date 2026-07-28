import {
  Activity,
  ArrowUpRight,
  ChartNoAxesCombined,
  Gauge,
  Route,
  ScanLine,
  TrendingUp,
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { athlete, navItems } from "../data";

const navIcons = {
  control: Gauge,
  assess: Activity,
  strategy: Route,
  debrief: ScanLine,
  improve: TrendingUp,
};

export function BrandMark({ compact = false }) {
  return (
    <div className={`brand-mark${compact ? " brand-mark--compact" : ""}`}>
      <span className="brand-glyph" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="brand-word">
        RACE<span>/</span>CTRL
      </span>
    </div>
  );
}

export function DesktopNav({ active, onChange }) {
  return (
    <aside className="desktop-nav" aria-label="Primary navigation">
      <div>
        <BrandMark />
        <p className="brand-descriptor">HYROX performance intelligence</p>
      </div>

      <nav className="nav-stack">
        {navItems.map((item, index) => {
          const Icon = navIcons[item.id];
          const selected = active === item.id;
          return (
            <button
              className={`nav-item${selected ? " is-active" : ""}`}
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={selected ? "page" : undefined}
            >
              {selected && (
                <Motion.span
                  className="nav-active-rail"
                  layoutId="nav-active-rail"
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="nav-index">0{index + 1}</span>
              <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="nav-athlete">
        <span className="athlete-avatar">AB</span>
        <span>
          <strong>{athlete.name} B.</strong>
          <small>
            {athlete.division} · {athlete.ageGroup}
          </small>
        </span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </div>
    </aside>
  );
}

export function MobileHeader() {
  return (
    <header className="mobile-header">
      <BrandMark compact />
      <button className="avatar-button" aria-label="Open athlete profile">
        AB
      </button>
    </header>
  );
}

export function MobileNav({ active, onChange }) {
  return (
    <nav className="mobile-nav" aria-label="Primary navigation">
      {navItems.map((item) => {
        const Icon = navIcons[item.id];
        const selected = active === item.id;
        return (
          <button
            key={item.id}
            className={selected ? "is-active" : ""}
            onClick={() => onChange(item.id)}
            aria-current={selected ? "page" : undefined}
          >
            <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
            <span>{item.label}</span>
            {selected && (
              <Motion.i
                layoutId="mobile-nav-dot"
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

export function PageHeader({
  title,
  description,
  kicker,
  action,
  compact = false,
}) {
  return (
    <header className={`page-header${compact ? " page-header--compact" : ""}`}>
      <div>
        {kicker && <p className="section-kicker">{kicker}</p>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </header>
  );
}

export function SectionTitle({ title, detail, action }) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {detail && <p>{detail}</p>}
      </div>
      {action}
    </div>
  );
}

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  icon = true,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`action-button action-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      {icon && <ArrowUpRight size={17} aria-hidden="true" />}
    </button>
  );
}

export function TextButton({ children, onClick, icon = true }) {
  return (
    <button className="text-button" onClick={onClick}>
      <span>{children}</span>
      {icon && <ArrowUpRight size={15} aria-hidden="true" />}
    </button>
  );
}

export function StatusPill({ children, tone = "neutral" }) {
  return <span className={`status-pill status-pill--${tone}`}>{children}</span>;
}

export function ConfidenceMeter({ value, label = "Data confidence" }) {
  return (
    <div className="confidence-meter">
      <div className="confidence-copy">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div
        className="confidence-track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <Motion.i
          initial={{ scaleX: 0 }}
          animate={{ scaleX: value / 100 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export function EmptyStateIcon() {
  return (
    <span className="empty-state-icon" aria-hidden="true">
      <ChartNoAxesCombined size={21} strokeWidth={1.6} />
    </span>
  );
}

export function ScreenReaderText({ children }) {
  return <span className="sr-only">{children}</span>;
}
