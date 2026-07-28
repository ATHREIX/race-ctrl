import {
  ArrowRight,
  CircleCheck,
  GitBranch,
  ScanSearch,
  TrendingUp,
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { lossAreas } from "../data";
import { StatusPill } from "../components/Primitives";
import { CausalChain, LossStack } from "../components/Visuals";

export default function PostRaceHome({ navigate }) {
  return (
    <div className="page track-overview post-overview">
      <header className="track-overview-intro">
        <div>
          <p>Bengaluru · 12 July · Official result</p>
          <h1>Make the result useful.</h1>
        </div>
        <div className="track-overview-meta track-overview-meta--complete">
          <CircleCheck size={17} strokeWidth={1.6} aria-hidden="true" />
          <span>
            <strong>Race imported</strong>
            <small>16 splits verified</small>
          </span>
        </div>
      </header>

      <section className="post-result" aria-labelledby="post-result-title">
        <div className="post-result-time">
          <StatusPill tone="danger">+7:12 outside model</StatusPill>
          <p id="post-result-title">Official finish</p>
          <Motion.strong
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            1:31:42
          </Motion.strong>
          <div>
            <span>
              <small>Predicted</small>
              <b>1:24:30</b>
            </span>
            <ArrowRight size={18} aria-hidden="true" />
            <span>
              <small>Finish</small>
              <b>1:31:42</b>
            </span>
          </div>
        </div>

        <div className="post-verdict">
          <div className="post-verdict-icon">
            <ScanSearch size={24} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <span>Primary diagnosis</span>
          <h2>Pacing amplified a strength-endurance weakness.</h2>
          <p>
            Wall Balls exposed the cost. The first meaningful cause appeared
            54 minutes earlier.
          </p>
          <button onClick={() => navigate("post/debrief")}>
            Open full analysis <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="post-loss">
        <div className="post-section-head">
          <div>
            <span>Time attribution</span>
            <h2>Where 7:12 went</h2>
          </div>
          <button onClick={() => navigate("post/debrief")}>
            Every split <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <LossStack areas={lossAreas} />
      </section>

      <section className="post-cause">
        <div className="post-cause-copy">
          <GitBranch size={21} strokeWidth={1.5} aria-hidden="true" />
          <span>Cause, not symptom</span>
          <h2>One aggressive decision multiplied.</h2>
          <p>
            The model connects an over-fast opening, elevated sled cost,
            late-run decay, and frequent Wall Ball breaks into one chain.
          </p>
        </div>
        <CausalChain />
      </section>

      <section className="post-next">
        <div>
          <TrendingUp size={22} strokeWidth={1.5} aria-hidden="true" />
          <span>Next result potential</span>
          <h2>1:22:50–1:24:30</h2>
          <p>
            Achievable if the next block hits the three highest-return
            targets.
          </p>
        </div>
        <div className="post-next-priorities">
          {[
            ["01", "Sled Push", "−1:05"],
            ["02", "Wall Balls", "−0:52"],
            ["03", "Runs 6–8", "−0:47"],
          ].map(([index, name, gain]) => (
            <span key={name}>
              <small>{index}</small>
              <strong>{name}</strong>
              <b>{gain}</b>
            </span>
          ))}
        </div>
        <button onClick={() => navigate("post/improve")}>
          Build the next block <ArrowRight size={17} aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
