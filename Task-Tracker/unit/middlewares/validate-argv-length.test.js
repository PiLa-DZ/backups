import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { validateArgvLength } from "../../../src/middlewares/validate-argv-length.js";

describe("validateArgvLength Middleware", () => {
  beforeEach(() => {
    vi.spyOn(process, "exit").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call process.exit(1) if the input array is empty", () => {
    const mockInputs = [];

    validateArgvLength(mockInputs);

    // 4. We check if process.exit was called with 1
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("should NOT call process.exit if arguments are provided", () => {
    const mockInputs = ["add", "buy milk"];

    validateArgvLength(mockInputs);

    // 5. We ensure it didn't fail
    expect(process.exit).not.toHaveBeenCalled();
  });
});
