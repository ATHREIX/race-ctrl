export const athlete = {
  name: "Aryan",
  event: "HYROX Mumbai",
  eventShort: "Mumbai",
  date: "21 Sep 2026",
  daysToRace: 56,
  division: "Men Open",
  ageGroup: "25–29",
  forecastSeconds: 5070,
  targetSeconds: 4920,
  confidence: 78,
  readiness: 73,
};

export const phases = [
  {
    id: 1,
    run: "Run 1",
    station: "SkiErg",
    runSeconds: 300,
    stationSeconds: 258,
    transitionSeconds: 40,
    actualRun: 288,
    actualStation: 255,
  },
  {
    id: 2,
    run: "Run 2",
    station: "Sled Push",
    runSeconds: 302,
    stationSeconds: 290,
    transitionSeconds: 55,
    actualRun: 296,
    actualStation: 372,
  },
  {
    id: 3,
    run: "Run 3",
    station: "Sled Pull",
    runSeconds: 305,
    stationSeconds: 250,
    transitionSeconds: 58,
    actualRun: 310,
    actualStation: 298,
  },
  {
    id: 4,
    run: "Run 4",
    station: "Burpee Broad Jump",
    runSeconds: 308,
    stationSeconds: 330,
    transitionSeconds: 50,
    actualRun: 316,
    actualStation: 355,
  },
  {
    id: 5,
    run: "Run 5",
    station: "Row",
    runSeconds: 310,
    stationSeconds: 270,
    transitionSeconds: 48,
    actualRun: 322,
    actualStation: 268,
  },
  {
    id: 6,
    run: "Run 6",
    station: "Farmer’s Carry",
    runSeconds: 314,
    stationSeconds: 120,
    transitionSeconds: 55,
    actualRun: 333,
    actualStation: 126,
  },
  {
    id: 7,
    run: "Run 7",
    station: "Sandbag Lunges",
    runSeconds: 318,
    stationSeconds: 300,
    transitionSeconds: 62,
    actualRun: 348,
    actualStation: 338,
  },
  {
    id: 8,
    run: "Run 8",
    station: "Wall Balls",
    runSeconds: 320,
    stationSeconds: 340,
    transitionSeconds: 67,
    actualRun: 353,
    actualStation: 441,
  },
];

export const benchmarkRows = [
  {
    id: "run-5k",
    group: "Run",
    name: "5 km time",
    value: "23:42",
    context: "Outdoor · Flat",
    quality: 92,
    status: "Strong",
    tested: "8d ago",
  },
  {
    id: "run-compromised",
    group: "Run",
    name: "Compromised 1 km",
    value: "05:18",
    context: "After 3 stations",
    quality: 64,
    status: "Retest",
    tested: "31d ago",
  },
  {
    id: "ski",
    group: "Station",
    name: "1,000 m SkiErg",
    value: "04:09",
    context: "Fresh · RPE 8",
    quality: 84,
    status: "Good",
    tested: "12d ago",
  },
  {
    id: "sled-push",
    group: "Station",
    name: "Sled Push",
    value: "05:18",
    context: "Race load · Turf",
    quality: 58,
    status: "Low confidence",
    tested: "43d ago",
  },
  {
    id: "sled-pull",
    group: "Station",
    name: "Sled Pull",
    value: "04:33",
    context: "Race load · Fresh",
    quality: 76,
    status: "Good",
    tested: "18d ago",
  },
  {
    id: "burpees",
    group: "Station",
    name: "80 m Burpee Broad Jump",
    value: "05:31",
    context: "Full distance · RPE 9",
    quality: 87,
    status: "Strong",
    tested: "9d ago",
  },
  {
    id: "row",
    group: "Station",
    name: "1,000 m Row",
    value: "04:19",
    context: "After 1 km run",
    quality: 95,
    status: "Strong",
    tested: "6d ago",
  },
  {
    id: "farmers",
    group: "Station",
    name: "200 m Farmer’s Carry",
    value: "02:08",
    context: "Race load · 1 break",
    quality: 81,
    status: "Good",
    tested: "15d ago",
  },
  {
    id: "lunges",
    group: "Station",
    name: "100 m Sandbag Lunges",
    value: "05:24",
    context: "Race load · Fresh",
    quality: 72,
    status: "Good",
    tested: "22d ago",
  },
  {
    id: "wall-balls",
    group: "Station",
    name: "100 Wall Balls",
    value: "06:42",
    context: "Fresh · 20/20/15…",
    quality: 62,
    status: "Retest",
    tested: "28d ago",
  },
];

export const lossAreas = [
  { name: "Late-run decay", seconds: 126, label: "+2:06", type: "run" },
  { name: "Wall Balls", seconds: 104, label: "+1:44", type: "station" },
  { name: "Sled Push", seconds: 92, label: "+1:32", type: "station" },
  { name: "Roxzone", seconds: 51, label: "+0:51", type: "transition" },
  { name: "Other variance", seconds: 59, label: "+0:59", type: "other" },
];

export const opportunities = [
  {
    rank: 1,
    name: "Sled Push",
    gain: 65,
    gainLabel: "1:05",
    confidence: "High",
    effort: "2 sessions / week",
    reason: "Strength endurance",
  },
  {
    rank: 2,
    name: "Wall Balls",
    gain: 52,
    gainLabel: "0:52",
    confidence: "High",
    effort: "3 density blocks / week",
    reason: "Break frequency",
  },
  {
    rank: 3,
    name: "Runs 6–8",
    gain: 47,
    gainLabel: "0:47",
    confidence: "Medium",
    effort: "1 compromised run / week",
    reason: "Late-race durability",
  },
  {
    rank: 4,
    name: "Roxzone",
    gain: 38,
    gainLabel: "0:38",
    confidence: "High",
    effort: "10 min / session",
    reason: "Entry and exit habits",
  },
  {
    rank: 5,
    name: "Row",
    gain: 9,
    gainLabel: "0:09",
    confidence: "Low",
    effort: "Maintenance only",
    reason: "Already efficient",
  },
];

export const navItems = [
  { id: "control", label: "Control" },
  { id: "assess", label: "Assess" },
  { id: "strategy", label: "Strategy" },
  { id: "debrief", label: "Debrief" },
  { id: "improve", label: "Improve" },
];

export const formatDuration = (totalSeconds, includeHours = true) => {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (includeHours && hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  }

  return `${String(minutes + hours * 60).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
};

export const cumulativeCheckpoints = phases.reduce((acc, phase) => {
  const previous = acc.at(-1)?.seconds ?? 0;
  acc.push({
    ...phase,
    seconds:
      previous +
      phase.runSeconds +
      phase.stationSeconds +
      phase.transitionSeconds,
  });
  return acc;
}, []);
