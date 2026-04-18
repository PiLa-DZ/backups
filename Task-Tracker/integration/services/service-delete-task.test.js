import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { writeFile, readFile, unlink } from "node:fs/promises";
import { serviceDeleteTask } from "../../../src/services/service-delete-task.js";
import { FULL_PATH } from "../../../src/repository/db-config.js";

describe("serviceDeleteTask Service", () => {
  beforeEach(async () => {
    const mockTasks = [
      { id: 1, description: "Task 1" },
      { id: 4, description: "Task 4" },
      { id: 3, description: "Task 3" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));
  });
  afterEach(async () => {
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should delete task if id found", async () => {
    const idToDelete = 1;

    await serviceDeleteTask(idToDelete);

    const loadFile = await readFile(FULL_PATH);
    const tasks = JSON.parse(loadFile);

    expect(tasks.length).toBe(2);
    // Verify ID 1 is really gone
    const found = tasks.find((t) => t.id === idToDelete);
    expect(found).toBeUndefined();
  });

  it("Should return null if id not found", async () => {
    const id = 999;

    const result = await serviceDeleteTask(id);

    expect(result).toBeNull();
  });
});
