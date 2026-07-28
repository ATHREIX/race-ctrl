import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  CircleDashed,
  Download,
  Footprints,
  GitBranch,
  ScanSearch,
} from "lucide-react";
import { lossAreas, formatDuration, phases } from "../data";
import {
  ActionButton,
  PageHeader,
  SectionTitle,
  StatusPill,
  TextButton,
} from "../components/Primitives";
import { CausalChain, LossStack, MiniDeltaTrace } from "../components/Visuals";

const segmentRows = phases.flatMap((phase) => [
  {
    id: `run-${phase.id}`,
    phase: `0${phase.id}`,
    type: "Run",
    name: phase.run,
    predicted: phase.runSeconds,
    actual: phase.actualRun,
    percentile: Math.max(38, 78 - phase.id * 4),
  },
  {
    id: `station-${phase.id}`,
    phase: `0${phase.id}`,
    type: "Station",
    name: phase.station,
    predicted: phase.stationSeconds,
    actual: phase.actualStation,
    percentile:
      phase.station === "Sled Push"
        ? 36
        : phase.station === "Wall Balls"
          ? 29
          : 58 + ((phase.id * 5) % 23),
  },
]);

function deltaLabel(actual, predicted) {
  const delta = actual - predicted;
  if (delta === 0) return "0:00";
  return `${delta > 0 ? "+" : "−"}${formatDuration(Math.abs(delta), false)}`;
}

export default function Debrief({ navigate }) {
  return (
    <div className="page page--debrief">
      <PageHeader
        kicker="Bengaluru · 12 Jul 2026 · Official result"
        title="The race did not break at Wall Balls."
        description="Wall Balls exposed the loss. The first cause appeared 54 minutes earlier."
        action={
          <ActionButton variant="secondary">
            Export report
          </ActionButton>
        }
      />

      <section className="debrief-summary">
        <div className="debrief-result">
          <StatusPill tone="danger">+7:12 outside model</StatusPill>
          <div className="result-comparison">
            <div>
              <span>Predicted</span>
              <strong>1:24:30</strong>
            </div>
            <ArrowRight size={22} aria-hidden="true" />
            <div>
              <span>Official finish</span>
              <strong>1:31:42</strong>
            </div>
          </div>
          <p>
            Your first half was 1:08 ahead of plan. It produced only 0:21 of
            net gain and contributed to the late-race cost.
          </p>
        </div>

        <div className="debrief-verdict">
          <div className="verdict-icon">
            <ScanSearch size={26} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <span>Primary diagnosis</span>
          <h2>Pacing-amplified strength endurance failure</h2>
          <p>
            This does not look like a pure Wall Ball weakness. Early run
            intensity raised the cost of the sleds, and that fatigue remained
            visible through Runs 6–8.
          </p>
          <div className="diagnosis-confidence">
            <span>Diagnostic confidence</span>
            <strong>82%</strong>
          </div>
        </div>
      </section>

      <section className="loss-analysis">
        <SectionTitle
          title="Where 7:12 went"
          detail="Attributed against your predicted race, including downstream effects."
        />
        <LossStack areas={lossAreas} />
      </section>

      <section className="cause-analysis">
        <div className="cause-copy">
          <div className="cause-heading">
            <GitBranch size={21} strokeWidth={1.5} aria-hidden="true" />
            <span>Cause chain</span>
          </div>
          <h2>One aggressive choice multiplied.</h2>
          <p>
            Run 1 was 17 seconds faster than plan. On its own, that is small.
            Against your current sled durability, the model estimates it
            increased local fatigue enough to change every later decision.
          </p>
          <blockquote>
            Visible loss: <strong>Wall Balls +1:41</strong>
            <br />
            Likely first cause: <strong>early intensity × sled weakness</strong>
          </blockquote>
          <TextButton onClick={() => navigate("improve")}>
            Turn this into training
          </TextButton>
        </div>
        <div className="cause-visual">
          <CausalChain />
          <div className="cause-note">
            <CircleDashed size={17} aria-hidden="true" />
            <p>
              Performance attribution, not medical diagnosis. Confidence
              improves with heart-rate and break-pattern data.
            </p>
          </div>
        </div>
      </section>

      <section className="segment-analysis">
        <SectionTitle
          title="Predicted vs actual"
          detail="Every race segment, ranked against athletes in your finish-time band."
          action={
            <button className="filter-button">
              Similar finishers <ArrowDownRight size={15} aria-hidden="true" />
            </button>
          }
        />

        <div className="segment-table" role="table" aria-label="Predicted versus actual splits">
          <div className="segment-table-head" role="row">
            <span role="columnheader">Segment</span>
            <span role="columnheader">Predicted</span>
            <span role="columnheader">Actual</span>
            <span role="columnheader">Difference</span>
            <span role="columnheader">Peer percentile</span>
          </div>
          {segmentRows.map((row) => {
            const delta = row.actual - row.predicted;
            return (
              <div
                className={`segment-row${Math.abs(delta) >= 40 ? " is-critical" : ""}`}
                role="row"
                key={row.id}
              >
                <span className="segment-name" role="cell">
                  <small>{row.phase}</small>
                  <span>
                    <strong>{row.name}</strong>
                    <small>{row.type}</small>
                  </span>
                </span>
                <span role="cell">{formatDuration(row.predicted, false)}</span>
                <strong role="cell">{formatDuration(row.actual, false)}</strong>
                <span
                  className={`segment-delta${
                    delta <= 0 ? " segment-delta--positive" : ""
                  }`}
                  role="cell"
                >
                  {deltaLabel(row.actual, row.predicted)}
                </span>
                <span className="percentile-cell" role="cell">
                  <i>
                    <b style={{ "--percentile": `${row.percentile}%` }} />
                  </i>
                  <small>{row.percentile}th</small>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="peer-history">
        <article className="peer-panel">
          <span>Against similar finishers</span>
          <h2>Your running is not the main weakness.</h2>
          <div className="peer-metrics">
            <div>
              <strong>68th</strong>
              <span>Running percentile</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </div>
            <div>
              <strong>41st</strong>
              <span>Station percentile</span>
              <ArrowDownRight size={16} aria-hidden="true" />
            </div>
            <div>
              <strong>34th</strong>
              <span>Roxzone percentile</span>
              <ArrowDownRight size={16} aria-hidden="true" />
            </div>
          </div>
        </article>

        <article className="history-panel">
          <span>Race-to-race signal</span>
          <div className="history-title">
            <h2>Late-run decay is improving.</h2>
            <StatusPill tone="positive">−0:19/km</StatusPill>
          </div>
          <MiniDeltaTrace values={[5, 7, 10, 14, 19, 23, 31, 35]} />
          <div className="history-footer">
            <span>
              <CircleCheck size={15} aria-hidden="true" /> 2 races imported
            </span>
            <button onClick={() => navigate("improve")}>
              View progression <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
