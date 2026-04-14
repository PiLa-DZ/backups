#!/usr/bin/env node

/**
 * Entry point for the Expense Tracker CLI application.
 * Configures commands and parses arguments using 'commander'.
 */

import { Command } from "commander";

const program = new Command();

program
  .name("expense-tracker")
  .description("A simple CLI-based expense tracker")
  .version("1.0.0");

// Register 'add' command
program
  .command("add")
  .description("Add a new expense")
  .requiredOption("--description <desc>", "Description of the expense")
  .requiredOption("--amount <amount>", "Amount of the expense")
  .action((options) => {
    // Logic:
    // 1. Validate amount is a positive number
    // 2. Delegate to ExpenseService to persist data
    // 3. Output result using UI Formatter
    console.log(`Adding expense: ${options.description} - $${options.amount}`);
  });

// Register 'list' command
program
  .command("list")
  .description("List all expenses")
  .action(() => {
    // Logic:
    // 1. Fetch data from ExpenseService
    // 2. Render as a table using UI Formatter
    console.log("Listing all expenses...");
  });

// Register 'delete' command
program
  .command("delete")
  .description("Delete an expense")
  .requiredOption("--id <id>", "ID of the expense to delete")
  .action((options) => {
    // Logic:
    // 1. Verify ID exists
    // 2. Delegate deletion to ExpenseService
    console.log(`Deleting expense ID: ${options.id}`);
  });

// Register 'summary' command
program
  .command("summary")
  .description("Show total expenses")
  .option("--month <month>", "Summary for a specific month (1-12)")
  .action((options) => {
    // Logic:
    // 1. Fetch filtered/aggregated data from SummaryService
    // 2. Output result
    console.log(`Showing summary... Month: ${options.month || "All"}`);
  });

// Parse arguments
program.parse(process.argv);
