import { describe, it, expect } from "vitest";
import { updateTaskInArray } from "../../../../src/utils/services/update-task-in-array.js";

describe("updateTaskInArray Utility", () => {
  // Mock data for our tests
  const mockTasks = [
    { id: 1, description: "Task 1", status: "not-done" },
    { id: 2, description: "Task 2", status: "not-done" },
  ];

  it("should update a task's description when a valid ID is provided", () => {
    const updateData = { id: 1, description: "Updated Task 1" };

    const result = updateTaskInArray(mockTasks, updateData);

    expect(result).toBeDefined();
    expect(result.description).toBe("Updated Task 1");
    expect(mockTasks[0].description).toBe("Updated Task 1"); // Check if original array mutated
  });

  it("should update a task's status when provided", () => {
    const updateData = { id: 2, status: "done" };

    const result = updateTaskInArray(mockTasks, updateData);

    expect(result.status).toBe("done");
    expect(result.description).toBe("Task 2"); // Ensure description was preserved
  });

  it("should return null if the task ID does not exist", () => {
    const updateData = { id: 999, description: "Ghost Task" };

    const result = updateTaskInArray(mockTasks, updateData);

    expect(result).toBeNull();
  });

  it("should handle numeric strings for IDs (common in CLI inputs)", () => {
    const updateData = { id: "1", description: "String ID test" };

    const result = updateTaskInArray(mockTasks, updateData);

    expect(result).not.toBeNull();
    expect(result.id).toBe(1);
  });
});
