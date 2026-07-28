import {
  ArrowDown,
  ArrowRight,
  Check,
  Gauge,
  LockKeyhole,
  Minus,
  Printer,
  Smartphone,
  TimerReset,
  X,
} from "lucide-react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  athlete,
  cumulativeCheckpoints,
  formatDuration,
} from "../data";
import {
  ActionButton,
  PageHeader,
  SectionTitle,
  StatusPill,
} from "../components/Primitives";

const scenarioOptions = [
  { id: "sled", label: "Sled Push −15%", gain: 65 },
  { id: "roxzone", label: "Roxzone −40 sec", gain: 40 },
  { id: "wallballs", label: "Fewer Wall Ball breaks", gain: 52 },
];

function effectLabel(seconds) {
  if (seconds === 0) return "0:00";
  return `${seconds > 0 ? "−" : "+"}${formatDuration(
    Math.abs(seconds),
    false,
  )}`;
}

function RaceCardDialog({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    return undefined;
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="race-card-dialog"
      onClose={onClose}
      onCancel={onClose}
    >
      <div className="race-card">
        <div className="race-card-top">
          <div>
            <span>RACE / 21 SEP 2026</span>
            <strong>MUMBAI · MEN OPEN</strong>
          </div>
          <button
            className="icon-button icon-button--light"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close race card"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="race-card-target">
          <span>Execute for</span>
          <strong>1:24:30</strong>
          <small>5:00–5:20/km · Confidence 78%</small>
        </div>

        <div className="race-card-splits">
          {cumulativeCheckpoints.map((phase) => (
            <div key={phase.id}>
              <span>0{phase.id}</span>
              <p>
                <strong>{formatDuration(phase.runSeconds, false)}</strong>
                <small>{phase.run}</small>
              </p>
              <p>
                <strong>{formatDuration(phase.stationSeconds, false)}</strong>
                <small>{phase.station}</small>
              </p>
              <p className="race-card-checkpoint">
                <strong>{formatDuration(phase.seconds)}</strong>
                <small>Checkpoint</small>
              </p>
            </div>
          ))}
        </div>

        <div className="race-card-rules">
          <span>Three rules</span>
          <ol>
            <li>Nothing faster than 4:55/km before Station 4.</li>
            <li>Leave the sled pull controlled, not emptied.</li>
            <li>Open Wall Balls 20–20, never 30.</li>
          </ol>
        </div>

        <button className="race-card-save" onClick={() => window.print()}>
          <Printer size={17} aria-hidden="true" />
          Save or print race card
        </button>
      </div>
    </dialog>
  );
}

export default function Strategy() {
  const [paceDelta, setPaceDelta] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [raceCardOpen, setRaceCardOpen] = useState(false);

  const simulation = useMemo(() => {
    const directSaving = -paceDelta * 8;
    const fatigueEffect =
      paceDelta < 0
        ? -Math.abs(paceDelta) * 4.2
        : paceDelta > 0
          ? paceDelta * 2.5
          : 0;
    const scenarioSaving = scenarioOptions
      .filter((option) => scenarios.includes(option.id))
      .reduce((total, option) => total + option.gain, 0);
    const netSaving = Math.round(directSaving + fatigueEffect + scenarioSaving);

    return {
      directSaving: Math.round(directSaving),
      fatigueEffect: Math.round(fatigueEffect),
      scenarioSaving,
      netSaving,
      finish: athlete.forecastSeconds - netSaving,
    };
  }, [paceDelta, scenarios]);

  function toggleScenario(id) {
    setScenarios((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <div className="page page--strategy">
      <PageHeader
        kicker="Mumbai · 21 Sep · Race plan v1.4"
        title="Make every split intentional."
        description="The goal is not the fastest possible first half. It is the fastest finish your current fitness can sustain."
        action={
          <ActionButton onClick={() => setRaceCardOpen(true)}>
            Open race card
          </ActionButton>
        }
      />

      <section className="simulator-console">
        <div className="simulator-outcome">
          <div className="simulator-status">
            <StatusPill tone="signal">Live scenario</StatusPill>
            <span>Model confidence 78%</span>
          </div>
          <p>Expected finish under this strategy</p>
          <AnimatePresence mode="popLayout">
            <Motion.strong
              key={simulation.finish}
              initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {formatDuration(simulation.finish)}
            </Motion.strong>
          </AnimatePresence>
          <div className="simulation-delta">
            <span>Against current forecast</span>
            <b
              className={
                simulation.netSaving > 0
                  ? "is-positive"
                  : simulation.netSaving === 0
                    ? "is-neutral"
                    : ""
              }
            >
              {simulation.netSaving === 0
                ? "No change"
                : `${simulation.netSaving > 0 ? "−" : "+"}${formatDuration(
                    Math.abs(simulation.netSaving),
                    false,
                  )}`}
            </b>
          </div>

          <div className="interaction-equation" aria-label="Simulation effect">
            <div>
              <span>Direct run effect</span>
              <strong>{effectLabel(simulation.directSaving)}</strong>
            </div>
            <i>+</i>
            <div>
              <span>Fatigue interaction</span>
              <strong>{effectLabel(simulation.fatigueEffect)}</strong>
            </div>
            <i>+</i>
            <div>
              <span>Selected gains</span>
              <strong>
                {simulation.scenarioSaving === 0
                  ? "0:00"
                  : `−${formatDuration(simulation.scenarioSaving, false)}`}
              </strong>
            </div>
          </div>
        </div>

        <div className="simulator-controls">
          <div className="control-heading">
            <Gauge size={20} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <strong>Run pace adjustment</strong>
              <span>
                {paceDelta === 0
                  ? "Current plan"
                  : `${Math.abs(paceDelta)} sec/km ${
                      paceDelta < 0 ? "faster" : "slower"
                    }`}
              </span>
            </div>
          </div>

          <input
            className="pace-range"
            type="range"
            min="-15"
            max="10"
            step="1"
            value={paceDelta}
            onChange={(event) => setPaceDelta(Number(event.target.value))}
            aria-label="Run pace adjustment in seconds per kilometre"
          />
          <div className="range-labels" aria-hidden="true">
            <span>−15 sec</span>
            <span>Current</span>
            <span>+10 sec</span>
          </div>

          <fieldset className="scenario-list">
            <legend>Layer improvement scenarios</legend>
            {scenarioOptions.map((option) => {
              const checked = scenarios.includes(option.id);
              return (
                <label key={option.id} className={checked ? "is-selected" : ""}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleScenario(option.id)}
                  />
                  <span className="scenario-check">
                    {checked ? (
                      <Check size={13} aria-hidden="true" />
                    ) : (
                      <Minus size={13} aria-hidden="true" />
                    )}
                  </span>
                  <span>{option.label}</span>
                  <strong>−{formatDuration(option.gain, false)}</strong>
                </label>
              );
            })}
          </fieldset>

          <p className="simulator-note">
            Faster running is not free. The model applies downstream fatigue
            based on your previous decay pattern.
          </p>
        </div>
      </section>

      <section className="split-blueprint">
        <SectionTitle
          title="Split blueprint"
          detail="Run, station, transition, and cumulative checkpoints."
          action={
            <span className="locked-plan">
              <LockKeyhole size={14} aria-hidden="true" /> Plan locked
            </span>
          }
        />

        <div className="split-table" role="table" aria-label="Race split plan">
          <div className="split-table-head" role="row">
            <span role="columnheader">Phase</span>
            <span role="columnheader">Run</span>
            <span role="columnheader">Station</span>
            <span role="columnheader">Roxzone</span>
            <span role="columnheader">Checkpoint</span>
            <span role="columnheader">Effort ceiling</span>
          </div>
          {cumulativeCheckpoints.map((phase, index) => (
            <div className="split-row" role="row" key={phase.id}>
              <span className="split-phase" role="cell">
                <b>{String(phase.id).padStart(2, "0")}</b>
                <span>
                  <strong>{phase.run}</strong>
                  <small>{phase.station}</small>
                </span>
              </span>
              <strong role="cell">
                {formatDuration(phase.runSeconds, false)}
                <small>/km</small>
              </strong>
              <strong role="cell">
                {formatDuration(phase.stationSeconds, false)}
              </strong>
              <span role="cell">
                {formatDuration(phase.transitionSeconds, false)}
              </span>
              <strong className="split-checkpoint" role="cell">
                {formatDuration(phase.seconds)}
              </strong>
              <span className="effort-ceiling" role="cell">
                <i style={{ "--effort": `${64 + index * 4}%` }} />
                RPE {Math.min(9, 6 + Math.floor(index / 2))}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="execution-plan">
        <SectionTitle
          title="Execution, not motivation"
          detail="Three decisions with the largest downstream effect."
        />
        <div className="execution-flow">
          <article>
            <span>START → SLED PULL</span>
            <h3>Stay under the ceiling.</h3>
            <p>
              Run 4:55–5:08/km. Let faster athletes leave. Your race begins
              after the sled pull.
            </p>
            <strong>RPE 6–7</strong>
            <ArrowDown size={18} aria-hidden="true" />
          </article>
          <article>
            <span>BURPEES → LUNGES</span>
            <h3>Protect the run shape.</h3>
            <p>
              Shorten stride for 150 m after each station, then settle. Never
              turn station exit into walking recovery.
            </p>
            <strong>RPE 7–8</strong>
            <ArrowDown size={18} aria-hidden="true" />
          </article>
          <article>
            <span>RUN 8 → FINISH</span>
            <h3>Spend what remains.</h3>
            <p>
              Run 8 may reach 5:20/km. Wall Balls open 20–20, then controlled
              sets of 15 and 10.
            </p>
            <strong>RPE 9</strong>
            <ArrowRight size={18} aria-hidden="true" />
          </article>
        </div>
        <button className="mobile-card-cta" onClick={() => setRaceCardOpen(true)}>
          <Smartphone size={18} aria-hidden="true" />
          Preview mobile race card
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </section>

      <RaceCardDialog open={raceCardOpen} onClose={() => setRaceCardOpen(false)} />
    </div>
  );
}
