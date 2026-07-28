import {
  Activity,
  ArrowLeft,
  Gauge,
  Route,
  ScanLine,
  TrendingUp,
} from "lucide-react";
import {
  AnimatePresence,
  motion as Motion,
  useReducedMotion,
} from "motion/react";
import { BrandMark } from "./Primitives";

const trackConfig = {
  pre: {
    label: "Pre‑Race",
    tabs: [
      { route: "pre", label: "Overview", icon: Gauge },
      { route: "pre/assess", label: "Benchmarks", icon: Activity },
      { route: "pre/strategy", label: "Race Plan", icon: Route },
    ],
  },
  post: {
    label: "Post‑Race",
    tabs: [
      { route: "post", label: "Overview", icon: Gauge },
      { route: "post/debrief", label: "Analysis", icon: ScanLine },
      { route: "post/improve", label: "Improve", icon: TrendingUp },
    ],
  },
};

export default function TrackShell({
  track,
  route,
  navigate,
  children,
}) {
  const config = trackConfig[track];
  const reduceMotion = useReducedMotion();

  return (
    <div className={`track-shell track-shell--${track}`}>
      <header className="track-header">
        <button
          className="track-brand"
          onClick={() => navigate("gateway")}
          aria-label="Return to track selection"
        >
          <BrandMark compact />
          <span>
            <ArrowLeft size={13} aria-hidden="true" /> Tracks
          </span>
        </button>

        <nav className="track-switcher" aria-label="Race phase">
          {["pre", "post"].map((item) => {
            const selected = item === track;
            return (
              <button
                key={item}
                className={selected ? "is-active" : ""}
                onClick={() => navigate(item)}
                aria-current={selected ? "page" : undefined}
              >
                {selected && (
                  <Motion.i
                    layoutId="track-switch-active"
                    transition={{
                      duration: 0.38,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                )}
                <span>{trackConfig[item].label}</span>
              </button>
            );
          })}
        </nav>

        <button className="track-profile" aria-label="Open athlete profile">
          <span>AB</span>
          <i aria-hidden="true" />
        </button>
      </header>

      <nav className="track-tabs track-tabs--desktop" aria-label={`${config.label} navigation`}>
        {config.tabs.map((tab) => {
          const selected = route === tab.route;
          return (
            <button
              key={tab.route}
              onClick={() => navigate(tab.route)}
              className={selected ? "is-active" : ""}
              aria-current={selected ? "page" : undefined}
            >
              {selected && (
                <Motion.i
                  layoutId={`track-tab-${track}`}
                  transition={{
                    duration: 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              )}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <main id="main-content" className="app-main track-main" tabIndex="-1">
        <AnimatePresence mode="wait" initial={false}>
          <Motion.div
            key={route}
            className="page-stage"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, filter: "blur(4px)" }
            }
            transition={{
              duration: reduceMotion ? 0.12 : 0.46,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {children}
          </Motion.div>
        </AnimatePresence>
      </main>

      <nav className="track-tabs track-tabs--mobile" aria-label={`${config.label} navigation`}>
        {config.tabs.map((tab) => {
          const Icon = tab.icon;
          const selected = route === tab.route;
          return (
            <button
              key={tab.route}
              onClick={() => navigate(tab.route)}
              className={selected ? "is-active" : ""}
              aria-current={selected ? "page" : undefined}
            >
              <Icon size={19} strokeWidth={1.65} aria-hidden="true" />
              <span>{tab.label}</span>
              {selected && (
                <Motion.i
                  layoutId={`track-mobile-tab-${track}`}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
