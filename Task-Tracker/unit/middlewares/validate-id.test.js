import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { validateId } from "../../../src/middlewares/validate-id.js";

describe("validateId Middleware", () => {
  beforeEach(() => {
    vi.spyOn(process, "exit").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Should not call process.exit if id is Integer and positive and not 0", async () => {
    const id = 1;
    await validateId(id);
    expect(process.exit).not.toHaveBeenCalled();
  });

  it("Should not call process.exit if id is numeric string", async () => {
    const id = "1";
    await validateId(id);
    expect(process.exit).not.toHaveBeenCalled();
  });

  it("Should call process.exit(1) if id is not defined", async () => {
    await validateId();
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("Should call process.exit(1) if id is not a number", async () => {
    const id = "some text";
    await validateId(id);
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("Should call process.exit(1) if id is floating number", async () => {
    const id = 1.5;
    await validateId(id);
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("Should call process.exit(1) if id is nigative number", async () => {
    const id = -1;
    await validateId(id);
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("Should call process.exit(1) if id is 0", async () => {
    const id = 0;
    await validateId(id);
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
