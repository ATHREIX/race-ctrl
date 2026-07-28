import { motion as Motion, useReducedMotion } from "motion/react";
import { phases } from "../data";

const runPaces = phases.map((phase) => phase.runSeconds);
const minPace = Math.min(...runPaces) - 4;
const maxPace = Math.max(...runPaces) + 4;

function toPath(values, width = 800, height = 180) {
  const xStep = width / (values.length - 1);
  return values
    .map((value, index) => {
      const normalized = (value - minPace) / (maxPace - minPace);
      const x = index * xStep;
      const y = 18 + normalized * (height - 36);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export function RaceTrace({ compact = false }) {
  const reduceMotion = useReducedMotion();
  const target = [299, 301, 304, 307, 309, 313, 316, 318];
  const predicted = phases.map((phase) => phase.runSeconds);

  return (
    <div className={`race-trace${compact ? " race-trace--compact" : ""}`}>
      <div className="trace-legend" aria-hidden="true">
        <span>
          <i className="trace-key trace-key--predicted" /> Predicted
        </span>
        <span>
          <i className="trace-key trace-key--target" /> Target
        </span>
      </div>
      <svg
        viewBox="0 0 800 180"
        role="img"
        aria-label="Predicted running pace gradually slows from five minutes to five minutes twenty seconds per kilometre"
        preserveAspectRatio="none"
      >
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1="0"
            x2="800"
            y1={18 + line * 48}
            y2={18 + line * 48}
            className="trace-grid-line"
          />
        ))}
        <Motion.path
          d={toPath(target)}
          className="trace-line trace-line--target"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <Motion.path
          d={toPath(predicted)}
          className="trace-line trace-line--predicted"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.25,
            delay: reduceMotion ? 0 : 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        {predicted.map((value, index) => {
          const x = index * (800 / 7);
          const normalized = (value - minPace) / (maxPace - minPace);
          const y = 18 + normalized * 144;
          return (
            <Motion.circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              className="trace-point"
              initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.45 + index * 0.055 }}
            />
          );
        })}
      </svg>
      <div className="trace-axis" aria-hidden="true">
        {phases.map((phase) => (
          <span key={phase.id}>R{phase.id}</span>
        ))}
      </div>
    </div>
  );
}

export function RaceSequence({ activePhase = 3 }) {
  return (
    <div className="race-sequence" aria-label="Eight HYROX race phases">
      {phases.map((phase) => (
        <div
          className={`sequence-phase${
            phase.id === activePhase ? " is-focus" : ""
          }`}
          key={phase.id}
        >
          <span className="sequence-number">{String(phase.id).padStart(2, "0")}</span>
          <span className="sequence-run">1K</span>
          <i aria-hidden="true" />
          <span className="sequence-station">{phase.station}</span>
        </div>
      ))}
    </div>
  );
}

export function ReadinessScale({ value }) {
  return (
    <div className="readiness-scale">
      <div className="readiness-track" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, index) => (
          <i key={index} className={index < Math.round(value / 5) ? "is-on" : ""} />
        ))}
      </div>
      <div className="readiness-labels">
        <span>Rebuild</span>
        <span>Competitive</span>
        <span>Peak</span>
      </div>
    </div>
  );
}

export function LossStack({ areas }) {
  const total = areas.reduce((sum, area) => sum + area.seconds, 0);
  return (
    <div className="loss-stack">
      <div
        className="loss-bar"
        role="img"
        aria-label={`Time-loss contribution chart totalling ${Math.round(
          total / 60,
        )} minutes`}
      >
        {areas.map((area, index) => (
          <Motion.i
            key={area.name}
            className={`loss-bar-segment loss-bar-segment--${area.type}`}
            style={{ width: `${(area.seconds / total) * 100}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            title={`${area.name}: ${area.label}`}
          />
        ))}
      </div>
      <div className="loss-legend">
        {areas.map((area) => (
          <div key={area.name}>
            <i className={`loss-dot loss-dot--${area.type}`} aria-hidden="true" />
            <span>{area.name}</span>
            <strong>{area.label}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CausalChain() {
  const events = [
    { time: "R1", title: "−0:17", detail: "Ahead of plan", tone: "warning" },
    { time: "S2", title: "+1:22", detail: "Sled overload", tone: "danger" },
    { time: "R6–8", title: "+2:06", detail: "Pace decay", tone: "danger" },
    { time: "S8", title: "+1:41", detail: "14 breaks", tone: "danger" },
  ];

  return (
    <div className="causal-chain">
      {events.map((event, index) => (
        <Motion.div
          className={`causal-event causal-event--${event.tone}`}
          key={event.time}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.35,
            delay: index * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span>{event.time}</span>
          <strong>{event.title}</strong>
          <small>{event.detail}</small>
          {index < events.length - 1 && <i aria-hidden="true" />}
        </Motion.div>
      ))}
    </div>
  );
}

export function MiniDeltaTrace({ values }) {
  const max = Math.max(...values.map(Math.abs), 1);
  const width = 240;
  const height = 56;
  const step = width / (values.length - 1);
  const points = values
    .map((value, index) => {
      const x = index * step;
      const y = height / 2 + (value / max) * (height / 2 - 4);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      className="mini-delta-trace"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Late race pace loss trend"
      preserveAspectRatio="none"
    >
      <line x1="0" x2={width} y1={height / 2} y2={height / 2} />
      <Motion.polyline
        points={points}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
