//  FIX: task-class.js refactor:
// git commit -m "refactor(task): use static factory method and optimize updates"
// Remove the constructor logic and use this instead:

class Task {
  static async create(description = "Empty Task") {
    const id = await Task.autoIncrement();
    const newTask = {
      id,
      description,
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await Task.save(newTask);
    console.log(`Task added successfully (ID: ${id})`);
    return newTask;
  }

  static async save(obj) {
    const tasks = await db.read();
    tasks.push(obj);
    await db.write(tasks);
  }
}

// FIX:
// 2. Efficiency Tip: .filter() vs .forEach()
// In your update and mark methods, you are using .filter() to iterate through tasks and change a property.
// The issue: .filter() is meant to create a new array, not to modify objects inside one.
// The Fix: Use .find() or just the findTask index you already calculated! It’s faster and cleaner.
// Inside update(id, description)
const task = Tasks[findTask]; // You already found the index!
task.description = description;
task.updatedAt = new Date();
