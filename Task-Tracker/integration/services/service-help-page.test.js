import { describe, it, expect } from "vitest";
import { serviceHelpPage } from "../../../src/services/service-help-page.js";

describe("serviceHelpPage", () => {
  it("should return the help content object", async () => {
    const result = await serviceHelpPage();

    // Check if the help object has the keys we expect (like 'commands')
    expect(result).toBeDefined();
    expect(result).toHaveProperty("commands");
  });
});
