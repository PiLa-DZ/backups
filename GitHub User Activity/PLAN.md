# GitHub User Activity

Use GitHub API to fetch user activity and display it in the terminal.

## Goal Definition

- **Core Problem:**
  simple command line interface (CLI)
  to fetch the recent activity of a GitHub user
  and display it in the terminal.

- **MVP (Minimum Viable Product):**
  - The application should run from the command line,
  - Accept the GitHub username as an argument,
  - fetch the user's recent activity using the GitHub API, and display it in the terminal.
  - The user should be able to:
    - Provide the GitHub username as an argument when running the CLI.

      ```bash
      github-activity <username>
      ```

    - Fetch the recent activity of the specified GitHub user using the GitHub API.
      You can use the following endpoint to fetch the user's activity:

      ```bash
      # https://api.github.com/users/<username>/events
      # Example: https://api.github.com/users/kamranahmedse/events
      ```

    - Display the fetched activity in the terminal.

      ```bash
      Output:
      - Pushed 3 commits to kamranahmedse/developer-roadmap
      - Opened a new issue in kamranahmedse/developer-roadmap
      - Starred kamranahmedse/developer-roadmap
      - ...
      ```
