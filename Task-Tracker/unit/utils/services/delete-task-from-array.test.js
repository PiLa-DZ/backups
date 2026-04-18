import { describe, it, expect, beforeEach } from "vitest";
import { deleteTaskFromArray } from "../../../../src/utils/services/delete-task-from-array.js";

describe("deleteTaskFromArray Utility", () => {
  let mockTasks; // 1. Declare the variable here so it's accessible to all tests

  beforeEach(() => {
    // 2. Assign the fresh data here. This runs before EACH "it" block.
    mockTasks = [
      { id: 1, description: "Task 1" },
      { id: 2, description: "Task 2" },
      { id: 3, description: "Task 3" },
    ];
  });

  it("Should return deleted task", () => {
    const id = 1;

    const result = deleteTaskFromArray(mockTasks, id);

    expect(result.id).toBe(1);
    expect(result.description).toBe("Task 1");
  });

  it("Should delete task from original array", () => {
    const id = 1;

    deleteTaskFromArray(mockTasks, id);

    expect(mockTasks.length).toBe(2);
  });

  it("Should return null if id not found", () => {
    const id = 999;

    const result = deleteTaskFromArray(mockTasks, id);

    expect(result).toBeNull();
  });

  it("Should handle numeric strings for IDs", () => {
    const id = "1";

    const result = deleteTaskFromArray(mockTasks, id);

    expect(result.id).toBe(1);
    expect(result.description).toBe("Task 1");
    expect(mockTasks.length).toBe(2);
  });
});
