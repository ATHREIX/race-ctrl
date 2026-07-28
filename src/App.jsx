import {
  AnimatePresence,
  motion as Motion,
  useReducedMotion,
} from "motion/react";
import { useEffect, useMemo, useState } from "react";
import TrackShell from "./components/TrackShell";
import Assess from "./pages/Assess";
import Debrief from "./pages/Debrief";
import Gateway from "./pages/Gateway";
import Improve from "./pages/Improve";
import PostRaceHome from "./pages/PostRaceHome";
import PreRaceHome from "./pages/PreRaceHome";
import Strategy from "./pages/Strategy";

const routeConfig = {
  pre: { track: "pre", title: "Pre‑Race", component: PreRaceHome },
  "pre/assess": {
    track: "pre",
    title: "Benchmarks",
    component: Assess,
  },
  "pre/strategy": {
    track: "pre",
    title: "Race Plan",
    component: Strategy,
  },
  post: { track: "post", title: "Post‑Race", component: PostRaceHome },
  "post/debrief": {
    track: "post",
    title: "Analysis",
    component: Debrief,
  },
  "post/improve": {
    track: "post",
    title: "Improve",
    component: Improve,
  },
};

const routeAliases = {
  "": "gateway",
  home: "gateway",
  control: "pre",
  assess: "pre/assess",
  strategy: "pre/strategy",
  debrief: "post/debrief",
  improve: "post/improve",
};

function normalizeRoute(value) {
  const clean = value.replace(/^#/, "").replace(/^\/+|\/+$/g, "");
  const route = routeAliases[clean] ?? clean;
  return route === "gateway" || routeConfig[route] ? route : "gateway";
}

function routeFromLocation() {
  return normalizeRoute(window.location.hash);
}

export default function App() {
  const [route, setRoute] = useState(routeFromLocation);
  const reduceMotion = useReducedMotion();
  const config = routeConfig[route];
  const surfaceKey = route === "gateway" ? "gateway" : config.track;
  const ActivePage = config?.component;

  const pageTitle = useMemo(() => {
    if (route === "gateway") return "RACE/CTRL — Choose Your Track";
    return `${config.title} — RACE/CTRL`;
  }, [config, route]);

  function navigate(destination) {
    const nextRoute = normalizeRoute(destination);
    if (nextRoute === route) return;

    const nextUrl =
      nextRoute === "gateway"
        ? `${window.location.pathname}${window.location.search}`
        : `#${nextRoute}`;

    window.history.pushState({ route: nextRoute }, "", nextUrl);
    setRoute(nextRoute);
  }

  useEffect(() => {
    const syncRoute = () => setRoute(routeFromLocation());
    window.addEventListener("popstate", syncRoute);
    window.addEventListener("hashchange", syncRoute);
    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("hashchange", syncRoute);
    };
  }, []);

  useEffect(() => {
    document.title = pageTitle;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pageTitle, reduceMotion, route]);

  return (
    <div className="app-shell app-shell--tracks">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <AnimatePresence mode="wait" initial={false}>
        <Motion.div
          key={surfaceKey}
          className="app-surface"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 0.992,
                  filter: "blur(12px)",
                  clipPath: "inset(1.5% 1.5% 1.5% 1.5%)",
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            filter: "none",
            clipPath: "none",
          }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.006, filter: "blur(5px)" }
          }
          transition={{
            duration: reduceMotion ? 0.12 : 0.58,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {route === "gateway" ? (
            <Gateway navigate={navigate} />
          ) : (
            <TrackShell
              track={config.track}
              route={route}
              navigate={navigate}
            >
              <ActivePage navigate={navigate} />
            </TrackShell>
          )}
        </Motion.div>
      </AnimatePresence>
    </div>
  );
}
