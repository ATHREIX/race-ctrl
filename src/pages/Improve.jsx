import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Dumbbell,
  Footprints,
  RefreshCw,
  Target,
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { useState } from "react";
import { opportunities } from "../data";
import {
  ActionButton,
  PageHeader,
  SectionTitle,
  StatusPill,
} from "../components/Primitives";

const allocations = [
  { name: "Compromised running", value: 35, icon: Footprints },
  { name: "Sled strength endurance", value: 25, icon: Dumbbell },
  { name: "Wall Ball density", value: 20, icon: Target },
  { name: "Transitions", value: 10, icon: RefreshCw },
  { name: "Maintenance", value: 10, icon: CircleGauge },
];

const weekPlans = {
  4: {
    label: "Four-week sharpen",
    sessions: "18 key exposures",
    forecast: "1:24:10–1:26:00",
  },
  6: {
    label: "Six-week rebuild",
    sessions: "27 key exposures",
    forecast: "1:22:50–1:24:30",
  },
  8: {
    label: "Eight-week development",
    sessions: "36 key exposures",
    forecast: "1:21:40–1:23:20",
  },
};

export default function Improve({ navigate }) {
  const [weeks, setWeeks] = useState(6);
  const plan = weekPlans[weeks];
  const maxGain = Math.max(...opportunities.map((item) => item.gain));

  return (
    <div className="page page--improve">
      <PageHeader
        kicker="Next block · Starts 28 Jul"
        title="Train the minutes that matter."
        description="Your plan is ranked by recoverable race time—not by the station you enjoy training most."
        action={<ActionButton>Start next block</ActionButton>}
      />

      <section className="improvement-outcome">
        <div className="outcome-copy">
          <StatusPill tone="positive">3:17 realistic gain</StatusPill>
          <p>If you complete the selected six-week focus</p>
          <strong>{plan.forecast}</strong>
          <div className="outcome-route">
            <span>
              <small>Current potential</small>
              <b>1:24:30</b>
            </span>
            <ArrowRight size={21} aria-hidden="true" />
            <span>
              <small>Revised potential</small>
              <b>{plan.forecast.split("–")[0]}</b>
            </span>
          </div>
        </div>
        <div className="block-selector">
          <span>Training block</span>
          <div className="segmented-control" role="group" aria-label="Training block length">
            {[4, 6, 8].map((option) => (
              <button
                key={option}
                className={weeks === option ? "is-active" : ""}
                onClick={() => setWeeks(option)}
                aria-pressed={weeks === option}
              >
                {option} weeks
              </button>
            ))}
          </div>
          <Motion.div
            className="block-detail"
            key={weeks}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <strong>{plan.label}</strong>
            <span>{plan.sessions} · Retest in week {weeks}</span>
          </Motion.div>
          <p>
            Forecast assumes 85% adherence and no material change in event
            conditions.
          </p>
        </div>
      </section>

      <section className="roi-section">
        <SectionTitle
          title="Time-return ranking"
          detail="Expected recoverable time over this block, adjusted for confidence and training cost."
        />
        <div className="roi-list">
          {opportunities.map((item, index) => (
            <Motion.article
              className="roi-row"
              key={item.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.34,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="roi-rank">{String(item.rank).padStart(2, "0")}</span>
              <div className="roi-name">
                <strong>{item.name}</strong>
                <span>{item.reason}</span>
              </div>
              <div className="roi-bar">
                <Motion.i
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: item.gain / maxGain }}
                  transition={{
                    duration: 0.72,
                    delay: 0.12 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
              <div className="roi-effort">
                <span>{item.effort}</span>
                <small>{item.confidence} confidence</small>
              </div>
              <div className="roi-gain">
                <span>Gain</span>
                <strong>−{item.gainLabel}</strong>
              </div>
            </Motion.article>
          ))}
        </div>
        <p className="roi-conclusion">
          <strong>Decision:</strong> maintain Row speed. Additional Row work has
          the lowest expected return for your next result.
        </p>
      </section>

      <section className="prescription-section">
        <div className="allocation-panel">
          <SectionTitle
            title={`${weeks}-week focus allocation`}
            detail="Share of quality training attention—not total weekly minutes."
          />
          <div className="allocation-bar" aria-label="Training allocation">
            {allocations.map((item, index) => (
              <Motion.i
                key={item.name}
                className={`allocation-segment allocation-segment--${index + 1}`}
                style={{ width: `${item.value}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>
          <div className="allocation-list">
            {allocations.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.name}>
                  <span className={`allocation-key allocation-key--${index + 1}`}>
                    <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <strong>{item.value}%</strong>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="priority-session">
          <div className="priority-topline">
            <span>Priority session · Week 1</span>
            <StatusPill tone="signal">Tue</StatusPill>
          </div>
          <h2>Sled exit durability</h2>
          <p>
            Train the transition from high local force demand back into
            sustainable running rhythm.
          </p>
          <ol>
            <li>
              <span>01</span>
              <p>
                <strong>1 km run</strong>
                <small>5:05/km · controlled</small>
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>Sled Push</strong>
                <small>Race load · 2 × 25 m</small>
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                <strong>800 m run</strong>
                <small>Hold form under 4:58/km</small>
              </p>
            </li>
            <li>
              <span>04</span>
              <p>
                <strong>Repeat × 3</strong>
                <small>3 min between rounds</small>
              </p>
            </li>
          </ol>
          <button className="session-button">
            Add to training week
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="retest-section">
        <SectionTitle
          title="Retest contract"
          detail="The model updates only when the evidence changes."
          action={
            <span className="retest-date">
              <CalendarCheck size={16} aria-hidden="true" /> 08 Sep 2026
            </span>
          }
        />
        <div className="retest-targets">
          {[
            {
              name: "Sled Push",
              current: "6:12",
              target: "5:25",
              change: "−0:47",
            },
            {
              name: "100 Wall Balls",
              current: "7:21",
              target: "6:15",
              change: "−1:06",
            },
            {
              name: "Final 3 km avg.",
              current: "5:49",
              target: "5:28",
              change: "−0:21/km",
            },
          ].map((target) => (
            <article key={target.name}>
              <div>
                <CheckCircle2 size={18} strokeWidth={1.6} aria-hidden="true" />
                <strong>{target.name}</strong>
              </div>
              <span>
                <small>Current</small>
                <b>{target.current}</b>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
              <span>
                <small>Target</small>
                <b>{target.target}</b>
              </span>
              <StatusPill tone="positive">{target.change}</StatusPill>
            </article>
          ))}
        </div>
        <div className="retest-footer">
          <p>
            This is a performance prescription, not medical or injury advice.
            Adjust load when recovery or pain signals require it.
          </p>
          <button onClick={() => navigate("assess")}>
            Schedule benchmarks <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
