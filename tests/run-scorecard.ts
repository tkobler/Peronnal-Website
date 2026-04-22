/**
 * Run Scorecard — Aggregates all test results and prints the UX scorecard.
 *
 * Usage: npx tsx tests/run-scorecard.ts
 */
import * as path from "path";
import { buildScorecard, renderScorecard, saveScorecard } from "./utils/scorecard";

const resultsDir = path.resolve(__dirname, "results");
const scorecard = buildScorecard(resultsDir);

console.log("\n");
console.log(renderScorecard(scorecard));
console.log("\n");

saveScorecard(scorecard, resultsDir);
console.log(`Scorecard saved to ${resultsDir}/scorecard.json`);
console.log(`Text version saved to ${resultsDir}/scorecard.txt`);

// Exit with non-zero if overall score is below threshold
const MINIMUM_SCORE = 50;
if (scorecard.overall < MINIMUM_SCORE) {
  console.log(`\nWARNING: Overall score ${scorecard.overall} is below minimum threshold ${MINIMUM_SCORE}`);
  process.exit(1);
}
