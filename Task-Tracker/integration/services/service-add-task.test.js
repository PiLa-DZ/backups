import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs/promises";
import { serviceAddTask } from "../../../src/services/service-add-task.js";
import { FULL_PATH } from "../../../src/repository/db-config.js";

describe("serviceAddTask Integration", () => {
  beforeEach(async () => {
    // Ensure the test starts with a clean database
    await fs.writeFile(FULL_PATH, JSON.stringify([]));
  });

  afterEach(async () => {
    // Optional: Clean up the test file so your data folder stays tidy
    try {
      await fs.unlink(FULL_PATH);
    } catch (e) {}
  });

  it("should write a new task to the test database file", async () => {
    const desc = "Buy coffee for Nabil";

    // Act
    await serviceAddTask(desc);

    // Assert: Read the actual file from the disk
    const rawData = await fs.readFile(FULL_PATH, "utf-8");
    const tasks = JSON.parse(rawData);

    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe(desc);
    expect(FULL_PATH).toContain("tasks.test.json"); // Just to be 100% sure!
  });
});
