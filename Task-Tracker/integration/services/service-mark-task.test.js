import { describe, it, expect } from "vitest";
import { readFile, writeFile, unlink } from "node:fs/promises";
import { FULL_PATH } from "../../../src/repository/db-config.js";
import { serviceMarkTask } from "../../../src/services/service-mark-task.js";

describe("serviceMarkTask Service", () => {
  it("Should update task status to be 'done' if id found", async () => {
    const mockTasks = [
      { id: 1, status: "not-done" },
      { id: 2, status: "not-done" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));

    const result = await serviceMarkTask(1, "done");

    const leadFile = await readFile(FULL_PATH, "utf-8");
    const tasks = JSON.parse(leadFile);
    const getUpdatedTask = tasks.find((elm) => elm.id === 1);
    const getNotUpdatedTask = tasks.find((elm) => elm.id === 2);

    expect(result.id).toBe(1);
    expect(result.status).toBe("done");

    expect(getUpdatedTask.id).toBe(1);
    expect(getUpdatedTask.status).toBe("done");

    expect(getNotUpdatedTask.id).toBe(2);
    expect(getNotUpdatedTask.status).toBe("not-done");
    expect(tasks.length).toBe(2);

    try {
      unlink(FULL_PATH);
    } catch (e) {}
  });
  it("Should update task status to be 'in-progress' if id found", async () => {
    const mockTasks = [
      { id: 1, status: "not-done" },
      { id: 2, status: "not-done" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));

    const result = await serviceMarkTask(1, "in-progress");

    const leadFile = await readFile(FULL_PATH, "utf-8");
    const tasks = JSON.parse(leadFile);
    const getUpdatedTask = tasks.find((elm) => elm.id === 1);
    const getNotUpdatedTask = tasks.find((elm) => elm.id === 2);

    expect(result.id).toBe(1);
    expect(result.status).toBe("in-progress");

    expect(getUpdatedTask.id).toBe(1);
    expect(getUpdatedTask.status).toBe("in-progress");

    expect(getNotUpdatedTask.id).toBe(2);
    expect(getNotUpdatedTask.status).toBe("not-done");
    expect(tasks.length).toBe(2);

    try {
      unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should update task status to be 'not-done' if id found", async () => {
    const mockTasks = [
      { id: 1, status: "done" },
      { id: 2, status: "done" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));

    const result = await serviceMarkTask(1, "not-done");

    const leadFile = await readFile(FULL_PATH, "utf-8");
    const tasks = JSON.parse(leadFile);
    const getUpdatedTask = tasks.find((elm) => elm.id === 1);
    const getNotUpdatedTask = tasks.find((elm) => elm.id === 2);

    expect(result.id).toBe(1);
    expect(result.status).toBe("not-done");

    expect(getUpdatedTask.id).toBe(1);
    expect(getUpdatedTask.status).toBe("not-done");

    expect(getNotUpdatedTask.id).toBe(2);
    expect(getNotUpdatedTask.status).toBe("done");
    expect(tasks.length).toBe(2);

    try {
      unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should return null if id not found", async () => {
    const mockTasks = [];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));

    const result = await serviceMarkTask(999, "done");

    expect(result).toBeNull();

    try {
      unlink(FULL_PATH);
    } catch (e) {}
  });
});
