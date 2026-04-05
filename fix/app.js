#!/usr/bin/env node

import { Task } from "./task-class.js";
import { help } from "./help.js";

const args = process.argv.slice(2);
const [command, secondArg, thirdArg] = args;

// Using an async function to allow 'await'
async function run() {
  switch (command?.toLowerCase()) {
    case "add":
      // If you refactor to the static create() we discussed:
      await Task.create(secondArg);
      break;
    case "update":
      await Task.update(+secondArg, thirdArg);
      break;
    case "delete":
      await Task.delete(+secondArg);
      break;
    case "mark":
      await Task.mark(+secondArg, thirdArg);
      break;
    case "list":
      const filter = secondArg?.toLowerCase();
      if (filter === "done") await Task.listDone();
      else if (filter === "not-done") await Task.listNotDone();
      else if (filter === "in-progress") await Task.listInProgress();
      else await Task.list();
      break;
    default:
      help();
      break;
  }
}

run();
// FIX: Normalize the input.
// const firstArg = args[0]?.toLowerCase();
