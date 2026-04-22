/**
 * UX Interaction Scorecard Engine
 *
 * Aggregates test results from all tiers and produces a 0-100 score per category,
 * plus an overall weighted score.
 */

import * as fs from "fs";
import * as path from "path";

// ── Types ──────────────────────────────────────────────────────────────────

export interface TierResult {
  tier: string;
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  score: number; // 0-100
}

export interface Scorecard {
  timestamp: string;
  tiers: TierResult[];
  overall: number;
}

// ── Weights ────────────────────────────────────────────────────────────────

const TIER_WEIGHTS: Record<string, number> = {
  "Interaction Flows":   0.25,
  "Responsive Matrix":   0.20,
  "Animation Perf":      0.15,
  "Accessibility":       0.25,
  "Visual Regression":   0.15,
};

// ── Score Calculation ──────────────────────────────────────────────────────

export function computeScore(passed: number, total: number): number {
  if (total === 0) return 100;
  return Math.round((passed / total) * 100);
}

export function computeOverall(tiers: TierResult[]): number {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const tier of tiers) {
    const weight = TIER_WEIGHTS[tier.tier] ?? 0.2;
    weightedSum += tier.score * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
}

// ── Render ─────────────────────────────────────────────────────────────────

function progressBar(score: number, width = 10): string {
  const filled = Math.round((score / 100) * width);
  const empty = width - filled;
  return "\u2588".repeat(filled) + "\u2591".repeat(empty);
}

export function renderScorecard(scorecard: Scorecard): string {
  const lines: string[] = [];
  const W = 43;

  lines.push("\u250C" + "\u2500".repeat(W) + "\u2510");
  lines.push("\u2502  UX INTERACTION SCORECARD" + " ".repeat(W - 27) + "\u2502");
  lines.push("\u251C" + "\u2500".repeat(W) + "\u2524");

  for (const tier of scorecard.tiers) {
    const label = tier.tier.padEnd(22);
    const bar = progressBar(tier.score);
    const scoreStr = String(tier.score).padStart(3);
    const line = `\u2502  ${label}${bar} ${scoreStr} \u2502`;
    lines.push(line);
  }

  lines.push("\u251C" + "\u2500".repeat(W) + "\u2524");
  const overallLine = `  OVERALL UX SCORE` + " ".repeat(14) + `${scorecard.overall}/100`;
  lines.push("\u2502" + overallLine.padEnd(W) + "\u2502");
  lines.push("\u2514" + "\u2500".repeat(W) + "\u2518");

  return lines.join("\n");
}

// ── Persistence ────────────────────────────────────────────────────────────

export function saveScorecard(scorecard: Scorecard, outDir: string): void {
  fs.mkdirSync(outDir, { recursive: true });

  // JSON
  const jsonPath = path.join(outDir, "scorecard.json");
  fs.writeFileSync(jsonPath, JSON.stringify(scorecard, null, 2));

  // Terminal-printable
  const txtPath = path.join(outDir, "scorecard.txt");
  fs.writeFileSync(txtPath, renderScorecard(scorecard));
}

// ── Parse Playwright JSON Report ───────────────────────────────────────────

interface PlaywrightSuite {
  title: string;
  suites?: PlaywrightSuite[];
  specs?: Array<{
    title: string;
    tests: Array<{
      status: "expected" | "unexpected" | "flaky" | "skipped";
    }>;
  }>;
}

interface PlaywrightReport {
  suites: PlaywrightSuite[];
}

function countResults(
  suites: PlaywrightSuite[]
): { passed: number; failed: number; skipped: number } {
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const suite of suites) {
    if (suite.specs) {
      for (const spec of suite.specs) {
        for (const test of spec.tests) {
          if (test.status === "expected") passed++;
          else if (test.status === "skipped") skipped++;
          else failed++;
        }
      }
    }
    if (suite.suites) {
      const sub = countResults(suite.suites);
      passed += sub.passed;
      failed += sub.failed;
      skipped += sub.skipped;
    }
  }

  return { passed, failed, skipped };
}

export function parseTierFromReport(
  reportPath: string,
  tierName: string
): TierResult | null {
  if (!fs.existsSync(reportPath)) return null;
  const report: PlaywrightReport = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
  const { passed, failed, skipped } = countResults(report.suites);
  const total = passed + failed + skipped;

  return {
    tier: tierName,
    passed,
    failed,
    skipped,
    total,
    score: computeScore(passed, total),
  };
}

// ── Main: aggregate all tier results ───────────────────────────────────────

export function buildScorecard(resultsDir: string): Scorecard {
  const tierFiles: Array<{ file: string; name: string }> = [
    { file: "e2e-results.json",          name: "Interaction Flows" },
    { file: "responsive-results.json",   name: "Responsive Matrix" },
    { file: "perf-results.json",         name: "Animation Perf" },
    { file: "a11y-results.json",         name: "Accessibility" },
    { file: "visual-results.json",       name: "Visual Regression" },
  ];

  const tiers: TierResult[] = [];

  for (const { file, name } of tierFiles) {
    const result = parseTierFromReport(path.join(resultsDir, file), name);
    if (result) {
      tiers.push(result);
    } else {
      tiers.push({ tier: name, passed: 0, failed: 0, skipped: 0, total: 0, score: 0 });
    }
  }

  const overall = computeOverall(tiers);

  return {
    timestamp: new Date().toISOString(),
    tiers,
    overall,
  };
}

// ── CLI entry point ────────────────────────────────────────────────────────

if (require.main === module) {
  const resultsDir = path.resolve(__dirname, "../results");
  const scorecard = buildScorecard(resultsDir);
  console.log(renderScorecard(scorecard));
  saveScorecard(scorecard, resultsDir);
  console.log(`\nScorecard saved to ${resultsDir}/scorecard.json`);
}
