# How to transform nodejs app from a script into a CLI tool

## My Question

I start a big challenge from Roadmap.sh
Build a CLI app to track your tasks and manage your to-do list.
The project name "Task-Tracker"
They tell me the app should be work in terminal like this

```bash
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

```

So i will build this app using node.js
But how to build nodejs cli app without using node command
I mean when a user start using my app
He should just write in terminal

```bash
task-cli arg1 arg2
```

But when i building my app i use it like this

```bash
node app.js arg1 arg2
```

So what is the solution?

---

## Gemini Answer

To make your Node.js script behave like a native Linux binary (like ls or grep),
you need to handle three things:
the Shebang,
the bin field in your package metadata,
and NPM Linking.

Since you are building "Task-Tracker,"
here is exactly how to transform it from a script into a CLI tool.

---

### 1. The "Shebang" (The Most Important Line)

On Linux/Arch,
the terminal doesn't know that a .js file should be run with Node.
You have to tell it.
Add this exact line to the very top of your entry file (e.g., index.js or app.js):

```bash
#!/usr/bin/env node

// Your code starts here...
console.log("Welcome to Task-Tracker!");
```

- What it does:
  It tells the shell,
  "Hey, use the node executable
  found in the user's environment to run this file."

---

### 2. Configure package.json

You need to map the command name (task-cli)
to your script file.
Open your package.json and add the bin object:

```json
{
  "name": "task-tracker",
  "version": "1.0.0",
  "description": "Roadmap.sh CLI Challenge",
  "main": "index.js",
  "bin": {
    "task-cli": "./index.js"
  },
  "type": "module"
}
```

- Key: The command the user types (task-cli).
- Value: The path to the file containing your Shebang.

---

### 3. The Magic Command: `npm link`

During development on your Arch machine,
you don't want to publish to NPM just to test it.
Use `npm link`.

1. Open your terminal in the project root.
2. Run:

   ```bash
   sudo npm link
   # On Arch,
   # depending on your Node setup,
   # you might not need sudo,
   # but usually,
   # it's required to symlink to /usr/bin
   ```

---

### Now, from ANY folder in your terminal, you can just type

```bash
task-cli add "Buy milk"
```

---

### 4. Accessing the Arguments

Since you aren't using node app.js,
how do you get the "add" or "Buy groceries" parts? You use `process.argv`.

```js
#!/usr/bin/env node

const args = process.argv.slice(2);
const command = args[0]; // "add"
const taskDescription = args[1]; // "Buy groceries"

if (command === "add") {
  console.log(`Task added successfully (ID: 1): ${taskDescription}`);
}
```

- Why `.slice(2)`? `*` `argv[0]` is the path to the Node executable.
  - `argv[1]` is the path to your script.
  - `argv[2]` is your first real argument.
