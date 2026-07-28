import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
  Crosshair,
  TimerReset,
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { athlete, formatDuration } from "../data";
import {
  ConfidenceMeter,
  StatusPill,
} from "../components/Primitives";
import {
  RaceSequence,
  RaceTrace,
  ReadinessScale,
} from "../components/Visuals";

export default function PreRaceHome({ navigate }) {
  return (
    <div className="page track-overview pre-overview">
      <header className="track-overview-intro">
        <div>
          <p>Mumbai · 21 September · Men Open</p>
          <h1>Build a race you can execute.</h1>
        </div>
        <div className="track-overview-meta">
          <CalendarDays size={17} strokeWidth={1.6} aria-hidden="true" />
          <span>
            <strong>{athlete.daysToRace} days</strong>
            <small>Until race day</small>
          </span>
        </div>
      </header>

      <section className="pre-model" aria-labelledby="pre-model-title">
        <div className="pre-model-outcome">
          <div className="pre-model-label">
            <StatusPill tone="signal">Model updated</StatusPill>
            <span>Confidence {athlete.confidence}%</span>
          </div>
          <p id="pre-model-title">Your current build centers at</p>
          <Motion.strong
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {formatDuration(athlete.forecastSeconds)}
          </Motion.strong>
          <div className="pre-model-window">
            <span>
              <small>Optimistic</small>
              <b>1:21:40</b>
            </span>
            <i aria-hidden="true" />
            <span>
              <small>Conservative</small>
              <b>1:28:10</b>
            </span>
          </div>
          <ConfidenceMeter
            value={athlete.confidence}
            label="Prediction confidence"
          />
        </div>

        <div className="pre-model-trace">
          <div>
            <span>Run 1 → Run 8</span>
            <strong>+20 sec/km</strong>
          </div>
          <RaceTrace />
          <p>
            The model expects controlled decay—not collapse. Protect the race
            through the sleds.
          </p>
        </div>
      </section>

      <section className="pre-sequence">
        <div className="pre-sequence-head">
          <span>Race architecture</span>
          <button onClick={() => navigate("pre/strategy")}>
            Open every split <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <RaceSequence activePhase={2} />
      </section>

      <section className="pre-decisions" aria-label="Pre-race priorities">
        <article className="pre-readiness">
          <div className="decision-icon">
            <Crosshair size={19} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <span>Race readiness</span>
          <strong>
            {athlete.readiness}<small>/100</small>
          </strong>
          <p>
            Running is ahead of station durability. Your plan should protect
            strength endurance.
          </p>
          <ReadinessScale value={athlete.readiness} />
        </article>

        <article className="pre-next-action">
          <div className="decision-icon">
            <TimerReset size={19} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <span>Next best action</span>
          <h2>Compromised sled + 1 km</h2>
          <p>
            Your current sled evidence is 43 days old and recorded fresh.
            Retesting can tighten the finish window by 18%.
          </p>
          <button onClick={() => navigate("pre/assess")}>
            Open guided benchmark <ArrowRight size={16} aria-hidden="true" />
          </button>
        </article>

        <article className="pre-risk">
          <div className="decision-icon decision-icon--warning">
            <CircleAlert size={19} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <span>One rule to protect</span>
          <blockquote>
            Nothing faster than <strong>4:55/km</strong> before Station 4.
          </blockquote>
          <button onClick={() => navigate("pre/strategy")}>
            See pacing logic <ArrowRight size={16} aria-hidden="true" />
          </button>
        </article>
      </section>
    </div>
  );
}
