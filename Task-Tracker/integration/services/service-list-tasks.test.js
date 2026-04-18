import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { writeFile, unlink } from "node:fs/promises";
import { serviceListTasks } from "../../../src/services/service-list-tasks.js";
import { FULL_PATH } from "../../../src/repository/db-config";

describe("serviceListTasks Service", () => {
  // BUG: *** The problem happen when i run all tasks at one because all test trying to write to one file ***
  //
  // beforeEach(async () => {
  //   const mockTasks = [
  //     { id: 1, description: "Learn JavaScript", status: "done" },
  //     { id: 2, description: "Learn C++", status: "not-done" },
  //     { id: 3, description: "Learn Python", status: "not-done" },
  //     { id: 4, description: "Learn GitLab", status: "in-progress" },
  //     { id: 5, description: "Learn TypeScript", status: "done" },
  //   ];
  //   await writeFile(FULL_PATH, JSON.stringify(mockTasks));
  // });
  // afterEach(async () => {
  //   try {
  //     await unlink(FULL_PATH);
  //   } catch (e) {}
  // });

  it("Should return all tasks if no argment pass", async () => {
    const mockTasks = [
      { id: 1, description: "Learn JavaScript", status: "done" },
      { id: 2, description: "Learn C++", status: "not-done" },
      { id: 3, description: "Learn Python", status: "not-done" },
      { id: 4, description: "Learn GitLab", status: "in-progress" },
      { id: 5, description: "Learn TypeScript", status: "done" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));
    const result = await serviceListTasks();
    expect(result).toBeDefined();
    expect(result.length).toBe(5);
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should return just tasks with status done if an argment done", async () => {
    const mockTasks = [
      { id: 1, description: "Learn JavaScript", status: "done" },
      { id: 2, description: "Learn C++", status: "not-done" },
      { id: 3, description: "Learn Python", status: "not-done" },
      { id: 4, description: "Learn GitLab", status: "in-progress" },
      { id: 5, description: "Learn TypeScript", status: "done" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));
    const result = await serviceListTasks("done");
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result[0].status).toBe("done");
    expect(result[1].status).toBe("done");
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should return just tasks with status in-progress if an argment in-progress", async () => {
    const mockTasks = [
      { id: 1, description: "Learn JavaScript", status: "done" },
      { id: 2, description: "Learn C++", status: "not-done" },
      { id: 3, description: "Learn Python", status: "not-done" },
      { id: 4, description: "Learn GitLab", status: "in-progress" },
      { id: 5, description: "Learn TypeScript", status: "done" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));
    const result = await serviceListTasks("in-progress");
    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0].status).toBe("in-progress");
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should return just tasks with status not-done if an argment not-done", async () => {
    const mockTasks = [
      { id: 1, description: "Learn JavaScript", status: "done" },
      { id: 2, description: "Learn C++", status: "not-done" },
      { id: 3, description: "Learn Python", status: "not-done" },
      { id: 4, description: "Learn GitLab", status: "in-progress" },
      { id: 5, description: "Learn TypeScript", status: "done" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));
    const result = await serviceListTasks("not-done");
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result[0].status).toBe("not-done");
    expect(result[1].status).toBe("not-done");
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should return empty array if no task found", async () => {
    const mockTasks = [];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));

    const result = await serviceListTasks();
    expect(result).toBeDefined();
    expect(result.length).toBe(0);
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should return empty array if no task found with status done", async () => {
    const mockTasks = [
      { id: 2, description: "Learn C++", status: "not-done" },
      { id: 3, description: "Learn Python", status: "not-done" },
      { id: 4, description: "Learn GitLab", status: "in-progress" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));

    const result = await serviceListTasks("done");

    expect(result).toBeDefined();
    expect(result.length).toBe(0);
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should return empty array if no task found with status in-progress", async () => {
    const mockTasks = [
      { id: 1, description: "Learn JavaScript", status: "done" },
      { id: 2, description: "Learn C++", status: "not-done" },
      { id: 3, description: "Learn Python", status: "not-done" },
      { id: 5, description: "Learn TypeScript", status: "done" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));

    const result = await serviceListTasks("in-progress");

    expect(result).toBeDefined();
    expect(result.length).toBe(0);
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });

  it("Should return empty array if no task found with status not-done", async () => {
    const mockTasks = [
      { id: 1, description: "Learn JavaScript", status: "done" },
      { id: 4, description: "Learn GitLab", status: "in-progress" },
      { id: 5, description: "Learn TypeScript", status: "done" },
    ];
    await writeFile(FULL_PATH, JSON.stringify(mockTasks));

    const result = await serviceListTasks("not-done");

    expect(result).toBeDefined();
    expect(result.length).toBe(0);
    try {
      await unlink(FULL_PATH);
    } catch (e) {}
  });
});
