import {
  CalendarDays,
  ChevronRight,
  CircleAlert,
  Crosshair,
  TimerReset,
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { athlete, formatDuration } from "../data";
import {
  ActionButton,
  ConfidenceMeter,
  PageHeader,
  SectionTitle,
  StatusPill,
  TextButton,
} from "../components/Primitives";
import {
  RaceSequence,
  RaceTrace,
  ReadinessScale,
} from "../components/Visuals";

export default function Control({ navigate }) {
  return (
    <div className="page page--control">
      <PageHeader
        kicker={`${athlete.date} · ${athlete.division} · ${athlete.ageGroup}`}
        title={`Race control, ${athlete.name}.`}
        description={`${athlete.daysToRace} days until ${athlete.event}. Your model updated after Saturday’s compromised run.`}
        action={
          <ActionButton onClick={() => navigate("strategy")}>
            Open race plan
          </ActionButton>
        }
      />

      <section className="forecast-console" aria-labelledby="forecast-title">
        <div className="forecast-heading">
          <div>
            <StatusPill tone="signal">Model updated</StatusPill>
            <p id="forecast-title">Current race forecast</p>
          </div>
          <span className="forecast-version">PERSONAL MODEL · V1.4</span>
        </div>

        <div className="forecast-layout">
          <div className="forecast-outcome">
            <p>Your current build points to</p>
            <Motion.strong
              key={athlete.forecastSeconds}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {formatDuration(athlete.forecastSeconds)}
            </Motion.strong>
            <div className="forecast-range">
              <span>Likely window</span>
              <b>1:21:40</b>
              <i aria-hidden="true" />
              <b>1:28:10</b>
            </div>
            <ConfidenceMeter
              value={athlete.confidence}
              label="Prediction confidence"
            />
          </div>

          <div className="forecast-trajectory">
            <div className="trajectory-copy">
              <span>Running trajectory</span>
              <strong>+20 sec/km</strong>
              <small>Expected decay, Run 1 → Run 8</small>
            </div>
            <RaceTrace />
          </div>
        </div>

        <RaceSequence />
      </section>

      <section className="control-grid" aria-label="Athlete briefing">
        <article className="readiness-panel">
          <div className="panel-topline">
            <span>Readiness</span>
            <StatusPill>On track</StatusPill>
          </div>
          <div className="readiness-score">
            <strong>{athlete.readiness}</strong>
            <span>/100</span>
          </div>
          <p>
            Your running engine is ahead of your station durability. Avoid
            adding more easy mileage this week.
          </p>
          <ReadinessScale value={athlete.readiness} />
          <button className="inline-link" onClick={() => navigate("assess")}>
            See score inputs <ChevronRight size={15} aria-hidden="true" />
          </button>
        </article>

        <article className="next-test-panel">
          <div className="panel-icon">
            <TimerReset size={21} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <p className="panel-label">Next recommended test</p>
          <h2>Compromised sled + 1 km</h2>
          <p>
            Your sled benchmark is 43 days old and was recorded fresh. This
            test will tighten your finish range by an estimated 18%.
          </p>
          <div className="test-meta">
            <span>
              <CalendarDays size={14} aria-hidden="true" /> Tue · 42 min
            </span>
            <span>Race load required</span>
          </div>
          <TextButton onClick={() => navigate("assess")}>
            Open protocol
          </TextButton>
        </article>

        <article className="limiter-panel">
          <div className="panel-icon">
            <Crosshair size={21} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <p className="panel-label">Highest-return limiter</p>
          <h2>Sled strength endurance</h2>
          <div className="opportunity-readout">
            <span>Realistic gain</span>
            <strong>1:05</strong>
          </div>
          <p>
            Improving sled exit quality should also protect Runs 3–5. The
            value is downstream, not only inside the station.
          </p>
          <TextButton onClick={() => navigate("improve")}>
            See improvement plan
          </TextButton>
        </article>

        <article className="race-rule-panel">
          <div className="panel-topline">
            <span>Race rule 01</span>
            <CircleAlert size={18} strokeWidth={1.6} aria-hidden="true" />
          </div>
          <blockquote>
            “Do not run below <strong>4:55/km</strong> before Station 4.”
          </blockquote>
          <p>
            Your previous race opened 17 seconds ahead of plan. The model
            connects that decision to 3:47 of downstream loss.
          </p>
          <TextButton onClick={() => navigate("debrief")}>
            Trace the cause
          </TextButton>
        </article>
      </section>

      <section className="system-loop">
        <SectionTitle
          title="Your performance loop"
          detail="Every test and race makes the next prediction more personal."
        />
        <div className="loop-steps">
          {["Benchmark", "Predict", "Pace", "Race", "Analyse", "Prescribe"].map(
            (step, index) => (
              <div key={step} className={index < 4 ? "is-complete" : ""}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                <i aria-hidden="true" />
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
