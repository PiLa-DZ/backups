import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { validateDescription } from "../../../src/middlewares/validate-description.js";

describe("validateDescription Middleware", () => {
  beforeEach(() => {
    vi.spyOn(process, "exit").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Happy Path: Should description to be a string and not empty and not whitespace", async () => {
    const desc = "Task 1";

    await validateDescription(desc);

    expect(process.exit).not.toHaveBeenCalled();
  });

  it("Should call process.exit(1) if description is number", async () => {
    await validateDescription(1);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
  it("Should call process.exit(1) if description is null", async () => {
    await validateDescription(null);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
  it("Should call process.exit(1) if description is undefined", async () => {
    await validateDescription(undefined);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
  it("Should call process.exit(1) if description is true", async () => {
    await validateDescription(true);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
  it("Should call process.exit(1) if description is false", async () => {
    await validateDescription(false);
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("Should call process.exit(1) if description is empty", async () => {
    await validateDescription("");
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("Should call process.exit(1) if description not defined", async () => {
    await validateDescription();
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("Should call process.exit(1) if description is only whitespace", async () => {
    await validateDescription("   ");
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
