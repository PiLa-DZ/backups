# Layer 7: Application Layer

- Identifying Communication Partners: Is the server alive?
- Synchronizing Cooperating Applications: Is the client and server agree on the rules
- Protocol-Specific Logic:
  - `HTTP / HTTPS`: `Hypertext Transfer Protocol` The foundation of the World Wide Web.
  - `DNS`: `Domain Name System` Translates human-readable names (`github.com`) into Layer 3 IP addresses.
  - `SSH`: `Secure Shell` Allows you to securely log into and manage remote Linux servers from your terminal.
  - `FTP / SFTP`: `Secure File Transfer Protocol` Used for transferring files securely between a client and a server.
  - `SMTP / IMAP`: `Mail Protocols` Used for sending and receiving emails.

---

## 1. The Core Responsibilities of Layer 7

Meaningful human-and-software application interaction

### Identifying Communication Partners

Layer 7 determines the availability of the target destination machine
(e.g., Is the server alive and ready to accept an HTTP request?).

### Synchronizing Cooperating Applications

It ensures that the client and server agree on the rules of the application task
(e.g., Did the client send the correct HTTP Headers?
Does the server support `multipart/form-data` for a file upload?).

### Protocol-Specific Logic

It interprets the actual intent of the communication whether that is fetching a web page,
sending an email,
downloading a file via SFTP,
or executing a database query.

---

## 2. The Titans of Layer 7

You use these protocols daily to build, test, and deploy applications:

| Protocol         | Full Name                     | Use Case                                                                            |
| ---------------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| **HTTP / HTTPS** | Hypertext Transfer Protocol   | The foundation of the World Wide Web. Powers your Express REST APIs.                |
| **DNS**          | Domain Name System            | Translates human-readable names (`github.com`) into Layer 3 IP addresses.           |
| **SSH**          | Secure Shell                  | Allows you to securely log into and manage remote Linux servers from your terminal. |
| **FTP / SFTP**   | Secure File Transfer Protocol | Used for transferring files securely between a client and a server.                 |
| **SMTP / IMAP**  | Mail Protocols                | Used for sending and receiving emails.                                              |

---

## 3. The Linux & Backend Connection

Layer 7 is where you implement security, data validation, business logic, and error handling.

### In Your Express Code

When you handle headers,
cookies,
status codes,
and routing,
you are executing pure Layer 7 logic.

```typescript
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

// Layer 7 Action: Authenticating based on an Application Protocol construct (HTTP Header)
app.get("/api/dashboard", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // Layer 7 Action: Returning a standardized Application Status Code (401 Unauthorized)
    return res.status(401).json({ error: "Missing access token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    res.json({ message: "Welcome to the secure dashboard!", user });
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" }); // 403 Forbidden
  }
});
```

### In Your Testing Tools

When you use **Supertest** or **Vitest** to verify your API endpoints,
you are writing tests that simulate Layer 7 clients hitting your application layer:

```typescript
import request from "supertest";
import { expect, it } from "vitest";
import app from "./app"; // your express app

it("should reject unauthenticated requests to dashboard at Layer 7", async () => {
  const response = await request(app)
    .get("/api/dashboard")
    .set("Accept", "application/json"); // Setting Layer 7 Application Headers

  expect(response.status).toBe(401);
  expect(response.body.error).toBe("Missing access token");
});
```

---
