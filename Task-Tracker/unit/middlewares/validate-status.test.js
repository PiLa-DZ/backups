import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { validateStatus } from "../../../src/middlewares/validate-status.js";

describe("validateStatus Middleware", () => {
  beforeEach(() => {
    vi.spyOn(process, "exit").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Happy Path: status must be 'done' or 'not-done' or 'in-progress'", async () => {
    await validateStatus("done");
    await validateStatus("not-done");
    await validateStatus("in-progress");
    expect(process.exit).not.toHaveBeenCalled();
  });

  it("Should call process.exit(1) if status is not 'done' or 'not-done' or 'in-progress'", async () => {
    await validateStatus("any randome test");
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
