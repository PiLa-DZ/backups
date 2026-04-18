import { describe, it, expect } from "vitest";
import { generateId } from "../../../../src/utils/services/auto-increment-id.js";

describe("autoIncrementId Utility", () => {
  it("should return 1 if the tasks array is empty", () => {
    const tasks = [];
    const nextId = generateId(tasks);
    expect(nextId).toBe(1);
  });

  it("should return the highest ID + 1", () => {
    const tasks = [
      { id: 1, description: "First" },
      { id: 5, description: "Fifth" },
      { id: 2, description: "Second" },
    ];
    // It should find 5 as the max and return 6
    const nextId = generateId(tasks);
    expect(nextId).toBe(6);
  });

  it("should handle IDs stored as strings", () => {
    const tasks = [{ id: "10" }];

    const nextId = generateId(tasks);

    // We want the result to be the number 11, not the string "101"
    expect(nextId).toBe(11);
  });

  it("should handle an array with a single task", () => {
    const tasks = [{ id: 10 }];
    const nextId = generateId(tasks);
    expect(nextId).toBe(11);
  });
});
