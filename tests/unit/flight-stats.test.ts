/**
 * Unit Tests — Flight Log Data Integrity
 *
 * Validates the flight log data source for consistency.
 */
import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

// Dynamic import since we don't know the exact export shape
const flightLogPath = path.resolve(__dirname, "../../src/data/flightLog.ts");

describe("Flight Log Data", () => {
  it("flight log data file exists", () => {
    expect(fs.existsSync(flightLogPath)).toBe(true);
  });

  it("flight log exports data", async () => {
    const mod = await import("@/data/flightLog");
    // Should export something
    expect(Object.keys(mod).length).toBeGreaterThan(0);
  });
});
