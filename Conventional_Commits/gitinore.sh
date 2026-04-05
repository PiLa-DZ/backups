# Conventional Commits standard

# =========================================================
# For .gitignore changes

# Recommended:
git commit -m "chore(.gitignore): ignore track.md and tasks.json"
# Alternative:
git commit -m "build(git): add local database files to ignore"

# chore is a task that helps the developer
# but doesn't change the app's functionality.

# =========================================================
# For README.md

# First time adding the file
git commit -m "docs(readme): add project overview"

# Adding install instructions
git commit -m "docs(readme): add installation and usage guide"

# Fixing a typo
git commit -m "docs(readme): fix typo in task-cli examples"

# Updating the Roadmap
git commit -m "docs(readme): update project roadmap and features"

# =========================================================
# for package.json

# First time creating it:
git commit -m "chore: initialize package.json"

# Adding the bin command:
git commit -m "chore(cli): add task-cli binary mapping"

# Changing to ES Modules:
git commit -m "chore: switch to es modules"

# Note:
# We use chore because a package.json update is a "Developer Task,"
# not a new feature for the person using the app.

# =========================================================
# For Testing

# Creating the file for the first time
git commit -m "test: add manual test suite for task logic"
# "Adding tests for the ""Add"" command"
git commit -m "test(commands): add unit tests for task creation"
# Testing edge cases (empty inputs)
git commit -m "test(cli): add validation tests for empty arguments"
# Fixing a test that was failing
git commit -m "test: fix broken assertion in list command test"
