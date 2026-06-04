# OpenAPI

- OpenAPI Specification (OAS)
- Only for **REST APIs**.
- API Description Standard

- `openapi.yaml` or `openapi.json` file
- "Swagger" refers to the visual UI tools,
- "OpenAPI" refers to the code specification itself.

---

## 1. What is OpenAPI Specification (OAS)?

OpenAPI is an **API Description Standard**.
It is a set of rules on how to write a single blueprint file
(usually named `openapi.yaml` or `openapi.json`)
that describes your entire REST API down to the absolute last detail.

It was originally called **Swagger**,
but in 2015, the company that owned it donated the core language specification
to an open-source coalition called the Linux Foundation,
which renamed it to the **OpenAPI Specification**.
Today, "Swagger" refers to the visual UI tools,
while "OpenAPI" refers to the code specification itself.

---

## 2. What Does It Describe?

Your OpenAPI file acts as a single source of truth
that answers every question a frontend developer could possibly ask about your server:

- What are all the available URL paths (endpoints)?
- What HTTP methods (`GET`, `POST`, `DELETE`) does each path accept?
- What parameters are required in the URL query string or headers?
- What does the request JSON body look like?
- What are all the possible HTTP status code
  responses (`200 OK`, `401 Unauthorized`)
  and the exact JSON data returned by each?

---

## 3. A Concrete Code Example (`openapi.yaml`)

Instead of writing a long Markdown wiki file,
you write a structured **YAML** or **JSON** file.
Here is exactly how we would write an OpenAPI blueprint
for the secure `/api/auth/facebook`
route you just built on your Arch machine:

```yaml
openapi: 3.0.3
info:
  title: Workout Tracker Dev Suite API
  version: 1.0.0
  description: High-performance stateful cookie session authentication engine.
servers:
  - url: http://localhost:3000/api
paths:
  /auth/facebook:
    post:
      summary: Authenticate a user via Facebook OAuth token
      operationId: facebookLogin
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - token
              properties:
                token:
                  type: string
                  description: The live access token supplied by Meta's frontend SDK.
      responses:
        "200":
          description: Session created successfully. Secure signed HTTP-only cookie injected.
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: success
                  message:
                    type: string
                    example: Secure hashed session array built successfully
        "401":
          description: Token authentication link with Facebook Graph API failed.
```

---

## 4. The Magic Powers: Why We Use It 🪄

Writing this file takes a bit of time,
but the moment you save it,
you unlock incredible automated workflows:

### Power A: Auto-Generated Interactive UI (Swagger UI)

You feed this `openapi.yaml` file to a free UI tool like **Swagger UI** or **RapiDoc**.
It instantly compiles your text blueprint into a gorgeous,
interactive documentation website.

Frontend developers can click on an endpoint,
see the exact parameters required, and click a live
"Try it out" button to make real API requests directly from the web browser without writing code.

### Power B: Instant SDK Generation

If you change a response payload key or add a new parameter,
you don't have to manually notify your team.
Frontend developers can run an open-source tool called `openapi-generator`.
It reads your YAML file and **instantly automatically writes all the
TypeScript fetch/axios functions and interfaces for the frontend application**.

### Power C: Automated Testing (Contract Testing)

You can plug your OpenAPI spec file into your backend testing suite (like Vitest and Supertest).
The test runner will hit your live Express routes and mathematically verify
that your actual JavaScript object responses match your OpenAPI schema perfectly.
If you accidentally remove a field from a JSON response in your controller,
your tests will break instantly,
preventing you from ever shipping a broken API to production.
