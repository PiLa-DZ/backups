# TODO: Blogging Platform API

## 📋 Project Overview & Feature Goals

Create a robust RESTful CRUD API to manage personal blog posts,
featuring input validation,
standard HTTP status codes,
precise search filtering,
and centralized error handling.

---

## 🛠️ Implementation Phases

### 📦 Phase 1: Project Setup & Initial Read Operations

Lay down the API foundation and implement data retrieval.

- [ ] **Commit 1: Setup & Fetch All Posts**
  - **Feature**: Retrieve a list of all existing blog posts.
  - **Action**: `GET /posts`
  - **Inputs**: None.
  - **Outputs**:
    - **Success (200 OK)**: Array of post objects.
    - **Empty State (200 OK)**: Empty array `[]` (not an error).
  - **Security**: Prevent route pollution; sanitize the output structure.
  - **Error Handling**: Handle server errors gracefully with a standard internal server response.

- [ ] **Commit 2: Fetch Single Post by ID**
  - **Feature**: Retrieve a specific blog post using its unique ID.
  - **Action**: `GET /posts/:id`
  - **Inputs**: Route parameter `id` (must be a valid identifier).
  - **Outputs**:
    - **Success (200 OK)**: A single post object with `id`, `title`, `content`, `category`, `tags`, `createdAt`, `updatedAt`.
    - **Not Found (404 Not Found)**: JSON payload explaining that the post does not exist.
  - **Security**: Sanitize route parameter inputs against injection vulnerabilities.
  - **Error Handling**: Catch type/format mismatches for the `id` (e.g., passing text instead of an integer/UUID).

---

### ✍️ Phase 2: Create & Validate Posts

Handle the data entry aspect of our CRUD system with strict validation.

- [ ] **Commit 3: Create New Blog Post**
  - **Feature**: Allow submission of new blog posts.
  - **Action**: `POST /posts`
  - **Inputs**: JSON request body containing:
    - `title` (String, required)
    - `content` (String, required)
    - `category` (String, required)
    - `tags` (Array of strings, required)
  - **Outputs**:
    - **Success (201 Created)**: Returns the newly created post with auto-generated fields (`id`, `createdAt`, `updatedAt`).
    - **Validation Failure (400 Bad Request)**: Detailed JSON array listing any missing or malformed fields.
  - **Security**:
    - Sanitize `title` and `content` text to prevent script injection (XSS).
    - Limit payload size to avoid memory exhaustion attacks.
  - **Error Handling**:
    - Catch malformed JSON formatting errors in incoming request bodies.

---

### 🔄 Phase 3: Modify & Remove Posts

Enable updates and deletions of existing data.

- [ ] **Commit 4: Update Post by ID**
  - **Feature**: Completely overwrite or modify an existing post.
  - **Action**: `PUT /posts/:id`
  - **Inputs**: Route parameter `id`, and a JSON request body with updated `title`, `content`, `category`, and `tags`.
  - **Outputs**:
    - **Success (200 OK)**: Returns the fully updated post object with the current `updatedAt` timestamp.
    - **Validation Failure (400 Bad Request)**: If input fields do not meet constraints.
    - **Not Found (404 Not Found)**: If the post ID does not exist.
  - **Security**: Validate that the payload matches the original entity structure.
  - **Error Handling**: Handle race conditions (e.g., updating a post that gets deleted simultaneously).

- [ ] **Commit 5: Delete Post by ID**
  - **Feature**: Delete a specific post from the database.
  - **Action**: `DELETE /posts/:id`
  - **Inputs**: Route parameter `id`.
  - **Outputs**:
    - **Success (204 No Content)**: Returns no body content upon successful deletion.
    - **Not Found (404 Not Found)**: If the post ID does not exist.
  - **Security**: Prevent ID tampering or unauthorized resource deletion.
  - **Error Handling**: Standardize error returns if database connectivity fails mid-operation.

---

### 🔍 Phase 4: Querying & Searching

Advanced data retrieval to filter posts dynamically.

- [ ] **Commit 6: Wildcard Term Search**
  - **Feature**: Filter blog posts using a search term query.
  - **Action**: `GET /posts?term=value`
  - **Inputs**: Query parameter `term` (string).
  - **Outputs**:
    - **Success (200 OK)**: Returns an array of blog posts that contain the term inside their `title`, `content`, or `category`.
  - **Security**: Use parameterized queries or ORM sanitizers to protect against database injection.
  - **Error Handling**: Ensure the server does not crash if the term is empty or exclusively contains whitespace.

---

### 🧹 Phase 5: Error Handling & Documentation

Consolidate operations for production deployment.

- [ ] **Commit 7: Final Polish**
  - **Feature**: App-wide error handling middleware and final API validation.
  - **Action**: Centralized JSON handling for 404 paths and unhandled server runtime exceptions.
  - **Outputs**: Clean JSON error responses across all scenarios.
  - **Security**: Strip out raw stack traces in production environments.
