import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  Footprints,
  Pencil,
  Plus,
  ShieldCheck,
  Timer,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { benchmarkRows } from "../data";
import {
  ActionButton,
  ConfidenceMeter,
  PageHeader,
  SectionTitle,
  StatusPill,
} from "../components/Primitives";

function qualityTone(quality) {
  if (quality >= 85) return "positive";
  if (quality >= 70) return "neutral";
  return "warning";
}

function BenchmarkDialog({ item, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
    return undefined;
  }, [item]);

  return (
    <dialog
      ref={dialogRef}
      className="benchmark-dialog"
      onClose={onClose}
      onCancel={onClose}
    >
      {item && (
        <form method="dialog" className="benchmark-sheet">
          <div className="dialog-topline">
            <div>
              <span>Edit benchmark</span>
              <strong>{item.name}</strong>
            </div>
            <button
              className="icon-button"
              value="cancel"
              aria-label="Close benchmark editor"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <label className="field">
            <span>Completion time</span>
            <input defaultValue={item.value} inputMode="numeric" />
          </label>

          <div className="field-pair">
            <label className="field">
              <span>Effort state</span>
              <select defaultValue={item.context.includes("Fresh") ? "fresh" : "fatigued"}>
                <option value="fresh">Fresh</option>
                <option value="fatigued">After running</option>
                <option value="simulation">Race simulation</option>
              </select>
            </label>
            <label className="field">
              <span>RPE</span>
              <input defaultValue="8" inputMode="numeric" />
            </label>
          </div>

          <label className="field">
            <span>Conditions</span>
            <input defaultValue={item.context} />
          </label>

          <label className="field">
            <span>Break pattern or notes</span>
            <textarea
              rows="3"
              defaultValue={
                item.id === "wall-balls"
                  ? "20-20-15-15-10-10-10"
                  : "Official distance completed"
              }
            />
          </label>

          <div className="dialog-confidence">
            <ConfidenceMeter value={item.quality} label="Benchmark quality" />
            <p>
              Quality changes how heavily this result influences your race
              forecast.
            </p>
          </div>

          <button className="action-button action-button--primary" value="save">
            <span>Save benchmark</span>
            <Check size={17} aria-hidden="true" />
          </button>
        </form>
      )}
    </dialog>
  );
}

export default function Assess() {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const visibleRows = showAll ? benchmarkRows : benchmarkRows.slice(0, 6);

  return (
    <div className="page page--assess">
      <PageHeader
        kicker="Model inputs"
        title="Measure what survives fatigue."
        description="Fresh gym numbers are useful. Comparable race-condition evidence is better."
        action={
          <ActionButton
            onClick={() => setSelected(benchmarkRows[0])}
            variant="primary"
          >
            Add benchmark
          </ActionButton>
        }
      />

      <section className="assessment-status">
        <div className="assessment-score">
          <span>Assessment coverage</span>
          <strong>
            8<span>/10</span>
          </strong>
          <p>Enough data for a medium-high confidence prediction.</p>
        </div>
        <div className="coverage-signals">
          <div>
            <span>Recent evidence</span>
            <strong>7 of 10</strong>
            <i style={{ "--score": "70%" }} />
          </div>
          <div>
            <span>Race-load verified</span>
            <strong>6 of 8</strong>
            <i style={{ "--score": "75%" }} />
          </div>
          <div>
            <span>Fatigued evidence</span>
            <strong>3 of 8</strong>
            <i style={{ "--score": "38%" }} />
          </div>
        </div>
        <div className="assessment-callout">
          <ShieldCheck size={21} strokeWidth={1.6} aria-hidden="true" />
          <div>
            <strong>Fastest confidence gain</strong>
            <p>
              Retest Sled Push and Wall Balls after running. Your prediction
              window could tighten by 1:12.
            </p>
          </div>
        </div>
      </section>

      <section className="benchmark-section">
        <SectionTitle
          title="Benchmark ledger"
          detail="Quality is based on recency, completeness, race load, and fatigue state."
          action={
            <button className="filter-button">
              All inputs <ChevronRight size={15} aria-hidden="true" />
            </button>
          }
        />

        <div className="benchmark-table" role="table" aria-label="Athlete benchmarks">
          <div className="benchmark-table-head" role="row">
            <span role="columnheader">Capability</span>
            <span role="columnheader">Result</span>
            <span role="columnheader">Conditions</span>
            <span role="columnheader">Quality</span>
            <span role="columnheader">Tested</span>
            <span role="columnheader" className="sr-only">
              Edit
            </span>
          </div>
          {visibleRows.map((item) => (
            <button
              className="benchmark-row"
              role="row"
              key={item.id}
              onClick={() => setSelected(item)}
            >
              <span className="benchmark-name" role="cell">
                <small>{item.group}</small>
                <strong>{item.name}</strong>
              </span>
              <strong className="benchmark-value" role="cell">
                {item.value}
              </strong>
              <span className="benchmark-context" role="cell">
                {item.context}
              </span>
              <span className="benchmark-quality" role="cell">
                <StatusPill tone={qualityTone(item.quality)}>
                  {item.quality} · {item.status}
                </StatusPill>
              </span>
              <span className="benchmark-tested" role="cell">
                {item.tested}
              </span>
              <span className="benchmark-edit" role="cell">
                <Pencil size={15} aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
        <button className="show-more-button" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show priority inputs" : "Show all 10 benchmarks"}
          <Plus
            size={16}
            className={showAll ? "is-rotated" : ""}
            aria-hidden="true"
          />
        </button>
      </section>

      <section className="protocol-section">
        <div className="protocol-intro">
          <StatusPill tone="signal">Recommended next</StatusPill>
          <h2>HYROX fatigue calibration</h2>
          <p>
            One controlled session to measure how sled work changes your
            running—and how much running changes your sled.
          </p>
          <div className="protocol-meta">
            <span>
              <Clock3 size={15} aria-hidden="true" /> 42 minutes
            </span>
            <span>
              <Dumbbell size={15} aria-hidden="true" /> Official race load
            </span>
          </div>
          <ActionButton variant="secondary">Start guided test</ActionButton>
        </div>

        <ol className="protocol-timeline">
          {[
            {
              icon: Footprints,
              title: "1 km controlled run",
              detail: "Target 5:05/km · RPE 6",
            },
            {
              icon: Dumbbell,
              title: "Sled Push",
              detail: "Official load · Full distance",
            },
            {
              icon: Timer,
              title: "90 sec recovery",
              detail: "Remain standing · No phone",
            },
            {
              icon: Footprints,
              title: "1 km best sustainable",
              detail: "Record HR and RPE",
            },
          ].map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <span className="protocol-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <strong>{step.title}</strong>
                  <small>{step.detail}</small>
                </div>
                <ArrowRight size={17} aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </section>

      <BenchmarkDialog item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
