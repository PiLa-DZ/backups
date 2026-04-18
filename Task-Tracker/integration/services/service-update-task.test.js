import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"; // 1. Import 'vi'
import { readFile, writeFile, unlink } from "node:fs/promises";
import { serviceUpdateTask } from "../../../src/services/service-update-task.js";
import { FULL_PATH } from "../../../src/repository/db-config.js";

describe("serviceUpdateTask Service", () => {
  // BUG: *** The problem happen when i run all tasks at one because all test trying to write to one file ***
  //
  // beforeEach(async () => {
  //   // 2. Freeze time to a specific moment
  //   vi.useFakeTimers();
  //   const mockDate = new Date("2026-04-18T10:00:00.000Z");
  //   vi.setSystemTime(mockDate);
  //
  //   const mockTasks = [
  //     { id: 1, description: "Task 1", updatedAt: "old-time" },
  //     { id: 2, description: "Task 2", updatedAt: "old-time" },
  //   ];
  //   await writeFile(FULL_PATH, JSON.stringify(mockTasks));
  // });
  //
  // afterEach(async () => {
  //   // 3. Restore real time
  //   vi.useRealTimers();
  //   try {
  //     await unlink(FULL_PATH);
  //   } catch (e) {}
  // });
  //
  it("Should update description if id found", async () => {
    vi.useFakeTimers();
    const mockDate = new Date("2026-04-18T10:00:00.000Z");
    vi.setSystemTime(mockDate);

    const mockTasks = [
      { id: 1, description: "Task 1", updatedAt: "old-time" },
      { id: 2, description: "Task 2", updatedAt: "old-time" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));
    const updatedTask = { id: 2, description: "Updated Task 2" };

    await serviceUpdateTask(updatedTask.id, updatedTask.description);

    const loadTasks = await readFile(FULL_PATH, "utf-8");
    const tasks = JSON.parse(loadTasks);

    console.log(tasks);

    const getNotUpdatedTask = tasks.find((elm) => elm.id === 1);
    expect(getNotUpdatedTask.description).toBe("Task 1");

    const getUpdatedTask = tasks.find((elm) => elm.id === 2);
    expect(getUpdatedTask.description).toBe("Updated Task 2");
    vi.useRealTimers();
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should return updated task if id found", async () => {
    vi.useFakeTimers();
    const mockDate = new Date("2026-04-18T10:00:00.000Z");
    vi.setSystemTime(mockDate);

    const mockTasks = [
      { id: 1, description: "Task 1", updatedAt: "old-time" },
      { id: 2, description: "Task 2", updatedAt: "old-time" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));
    const updatedTask = { id: 2, description: "Updated Task 2" };

    const result = await serviceUpdateTask(
      updatedTask.id,
      updatedTask.description,
    );

    expect(result.description).toBe("Updated Task 2");
    expect(result.id).toBe(2);
    vi.useRealTimers();
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should update updatedAt date if id found", async () => {
    vi.useFakeTimers();
    const mockDate = new Date("2026-04-18T10:00:00.000Z");
    vi.setSystemTime(mockDate);

    const mockTasks = [
      { id: 1, description: "Task 1", updatedAt: "old-time" },
      { id: 2, description: "Task 2", updatedAt: "old-time" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));
    // The time we expect (Algeria is UTC+1, so 10:00Z becomes 11:00)
    // Your getLocalTime utility handles this math
    // BUG: *** If someone in another country run this code it will be fail ***
    const expectedTime = "2026-04-18T11:00:00.000";

    await serviceUpdateTask(2, "New Description");

    const loadTasks = await readFile(FULL_PATH, "utf-8");
    const tasks = JSON.parse(loadTasks);

    // Verify the first task still has the old time (isolation)
    const getNotUpdatedTask = tasks.find((elm) => elm.id === 1);
    expect(getNotUpdatedTask.updatedAt).toBe("old-time");

    // Verify the second task has the new time
    const getUpdatedTask = tasks.find((elm) => elm.id === 2);
    expect(getUpdatedTask.updatedAt).toBe(expectedTime);
    vi.useRealTimers();
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should return null if id not found", async () => {
    vi.useFakeTimers();
    const mockDate = new Date("2026-04-18T10:00:00.000Z");
    vi.setSystemTime(mockDate);

    const mockTasks = [
      { id: 1, description: "Task 1", updatedAt: "old-time" },
      { id: 2, description: "Task 2", updatedAt: "old-time" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));
    const result = await serviceUpdateTask(999, "Update Task 999");

    expect(result).toBeNull();
    vi.useRealTimers();
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });
});
