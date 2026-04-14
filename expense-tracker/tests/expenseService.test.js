import { test } from "node:test";
import assert from "node:assert";
import { getAllExpenses } from "../src/services/expenseService.js";

test("ExpenseService - State Validation", async () => {
  // 1. Run the real function (no mocks)
  const result = await getAllExpenses();

  // 2. Logic: It must be an array
  assert.ok(Array.isArray(result), "Result should always be an array");

  if (result.length === 0) {
    // Scenario: Data file is missing or empty
    assert.deepStrictEqual(result, [], "Expected an empty array");
    console.log("ℹ Info: Testing empty state (File not found or empty)");
  } else {
    // Scenario: Data file has expenses
    assert.ok(result.length > 0);
    assert.ok(
      result[0].hasOwnProperty("id"),
      "Expense objects should have an ID",
    );
    console.log(
      `ℹ Info: Testing populated state (${result.length} expenses found)`,
    );
  }
});
