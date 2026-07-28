import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  TimerReset,
  TrendingDown,
} from "lucide-react";
import { motion as Motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { BrandMark } from "../components/Primitives";

function PreRaceSignal() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      className="gateway-signal"
      viewBox="0 0 520 110"
      role="img"
      aria-label="Eight race phases progressing toward a predicted finish"
      preserveAspectRatio="none"
    >
      <line x1="0" x2="520" y1="72" y2="72" className="gateway-signal-base" />
      <Motion.path
        d="M 0 72 C 72 72, 90 42, 154 42 S 236 66, 294 49 S 388 26, 520 26"
        className="gateway-signal-live"
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
      />
      {[0, 74, 148, 222, 296, 370, 444, 520].map((x, index) => (
        <Motion.circle
          key={x}
          cx={x}
          cy={index < 2 ? 72 : index < 4 ? 42 : index < 6 ? 49 : 26}
          r="4"
          className="gateway-signal-point"
          initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.25 + index * 0.07 }}
        />
      ))}
    </svg>
  );
}

function PostRaceSignal() {
  const values = [18, 9, 44, 27, 8, 16, 61, 79];
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="gateway-variance"
      role="img"
      aria-label="Race segment variance rising sharply in the final phases"
    >
      {values.map((value, index) => (
        <Motion.i
          key={index}
          initial={reduceMotion ? false : { scaleY: 0 }}
          animate={{ scaleY: value / 100 }}
          transition={{
            duration: 0.8,
            delay: reduceMotion ? 0 : index * 0.055,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}

const tracks = [
  {
    id: "pre",
    index: "01",
    phase: "Before the start",
    title: "Pre‑Race",
    statement: "Build the race before you enter it.",
    description:
      "Benchmark your current engine, predict the finish, and leave with an exact pacing plan.",
    icon: TimerReset,
    metrics: [
      ["1:24:30", "Current forecast"],
      ["78%", "Confidence"],
      ["56 days", "To Mumbai"],
    ],
  },
  {
    id: "post",
    index: "02",
    phase: "After the finish",
    title: "Post‑Race",
    statement: "Turn one result into the next result.",
    description:
      "Find where the time went, trace the first cause, and rank the training that pays back most.",
    icon: TrendingDown,
    metrics: [
      ["1:31:42", "Official finish"],
      ["+7:12", "Outside model"],
      ["3:17", "Recoverable"],
    ],
  },
];

export default function Gateway({ navigate }) {
  const [activeTrack, setActiveTrack] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    <main id="main-content" className="gateway" tabIndex="-1">
      <header className="gateway-header">
        <BrandMark />
        <div className="gateway-identity">
          <span>Private athlete model</span>
          <button aria-label="Open athlete profile">AB</button>
        </div>
      </header>

      <section className="gateway-intro">
        <Motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          HYROX performance intelligence
        </Motion.p>
        <Motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          Where are you
          <br />
          in the race?
        </Motion.h1>
        <Motion.div
          className="gateway-intro-note"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.35, duration: 0.5 }}
        >
          <CircleDot size={15} strokeWidth={1.7} aria-hidden="true" />
          Choose a track. You can switch at any time.
        </Motion.div>
      </section>

      <section
        className="gateway-tracks"
        aria-label="Choose your performance track"
        data-active={activeTrack ?? "none"}
      >
        {tracks.map((track, index) => {
          const Icon = track.icon;
          return (
            <Motion.button
              key={track.id}
              className={`gateway-track gateway-track--${track.id}`}
              onPointerEnter={() => setActiveTrack(track.id)}
              onPointerLeave={() => setActiveTrack(null)}
              onFocus={() => setActiveTrack(track.id)}
              onBlur={() => setActiveTrack(null)}
              onClick={() => navigate(track.id)}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.62,
                delay: reduceMotion ? 0 : 0.18 + index * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="gateway-track-fill" aria-hidden="true" />
              <span className="gateway-track-head">
                <span>
                  {track.index} <i /> {track.phase}
                </span>
                <span className="gateway-track-icon">
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                </span>
              </span>

              <span className="gateway-track-copy">
                <span className="gateway-track-title">{track.title}</span>
                <strong>{track.statement}</strong>
                <span className="gateway-track-description">
                  {track.description}
                </span>
              </span>

              <span className="gateway-track-metrics">
                {track.metrics.map(([value, label]) => (
                  <span key={label}>
                    <b>{value}</b>
                    <small>{label}</small>
                  </span>
                ))}
              </span>

              <span className="gateway-track-visual" aria-hidden="true">
                {track.id === "pre" ? <PreRaceSignal /> : <PostRaceSignal />}
              </span>

              <span className="gateway-track-action">
                Enter {track.title}
                <span>
                  <ArrowRight size={18} aria-hidden="true" />
                </span>
              </span>
            </Motion.button>
          );
        })}
      </section>

      <footer className="gateway-footer">
        <span>
          <CheckCircle2 size={14} aria-hidden="true" />
          Model updated 2 days ago
        </span>
        <span>Singles · Men Open · 25–29</span>
      </footer>
    </main>
  );
}
