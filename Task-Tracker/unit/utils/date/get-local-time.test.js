// *** Mocking the System Clock ***
// To test time correctly,
// we tell Vitest to "freeze" time.
// This way, we know exactly what the result should be.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getLocalTime } from "../../../../src/utils/date/get-local-time.js";

describe("get-local-time Utility", () => {
  beforeEach(() => {
    // 1. Tell Vitest to use a "fake" clock
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 2. Restore the real clock so other tests aren't affected
    vi.useRealTimers();
  });

  it("should return a string in the correct local ISO format (without the Z)", () => {
    // 3. Set the clock to a specific moment (e.g., Jan 1st, 2026, at 12:00 UTC)
    const mockDate = new Date("2026-01-01T12:00:00Z");
    vi.setSystemTime(mockDate);

    const result = getLocalTime();

    // 4. Since Algeria is UTC+1, 12:00 UTC should be 13:00 Local
    // We check the format: YYYY-MM-DDTHH:mm:ss.sss (no Z at the end)
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/);

    // 5. Check if the "T" is present (ISO standard)
    expect(result).toContain("T");

    // 6. Ensure the 'Z' (UTC marker) has been removed by your .slice(0, -1)
    expect(result.endsWith("Z")).toBe(false);
  });
});
