# Part 1: The 6 Strict Rules of REST

1. Client-Server Separation
2. Statelessness (Stateless)
3. Cacheability
4. Layered System
5. Uniform Interface
   - **Resource Identification:** clean URL layout (e.g., `/api/workouts`).
   - **Manipulation through Representations:** has enough information
   - **Self-Descriptive Messages:** data types `Content-Type` and HTTP Status Codes `200 OK`
6. Code on Demand (Optional) send executable code scripts

---

## 1. Client-Server Separation

- **The Rule:**
  The frontend application (Client) and the backend data store (Server)
  must be completely independent of each other.

- **Why it matters:**
  The browser shouldn't care how your MariaDB database organizes its tables,
  and your Express server shouldn't care if the frontend is built with React,
  HTML, or an Android mobile app.
  As long as they both speak HTTP,
  you can change your entire database setup or rewrite your frontend without breaking the system.

---

## 2. Statelessness (Stateless)

- **The Rule:**
  The server must **never** store any context about the client's current step in memory.
  Every single request sent from the browser must contain 100%
  of the information required to understand and complete that request.

- **Why it matters:**
  In a stateless system, Request #2 doesn't depend on Request #1.
  This makes scaling incredibly easy.
  If your application grows and you deploy 5 clones of your server,
  a user's request can hit _any_ of those 5 servers,
  and it will process perfectly because all the authentication data
  (like a token or signed session key)
  is present directly inside the incoming request headers or cookies.

---

## 3. Cacheability

- **The Rule:**
  The server must explicitly tell the browser whether a response
  can be cached (saved locally) or not, and for how long.

- **Why it matters:**
  If a user requests a static list of workout exercises (`GET /api/exercises`),
  that data rarely changes. By adding an HTTP header like `Cache-Control: max-age=3600`,
  the browser will save the data in its local disk cache for an hour.
  The next time the user loads the page,
  the browser reads it from disk instantly instead of hitting your Express server over the network.

---

## 4. Layered System

- **The Rule:**
  A client cannot tell whether it is connected directly to the end server
  or to an intermediate box along the way.

- **Why it matters:**
  You can insert network layers like Load Balancers,
  API Gateways, or Reverse Proxies (like Nginx) right in front of your Express application
  to handle security and traffic routing.
  The browser has no idea it's talking to a middleman;
  it just sends standard HTTP requests seamlessly.

---

## 5. Uniform Interface

This is the most famous rule that defines the day-to-day work of writing endpoints.
It states that all interactions across your API must follow a standardized,
predictable contract. It relies on 4 sub-rules:

- **Resource Identification:**
  Everything is a noun resource mapped to a clean URL layout (e.g., `/api/workouts`).

- **Manipulation through Representations:**
  If a client holds a JSON representation of a workout log,
  it has enough information to modify or delete it on the server using its unique ID.

- **Self-Descriptive Messages:**
  Every packet explicitly labels its data types (using `Content-Type` headers like `application/json`)
  and indicates the outcome using standard HTTP Status Codes
  (`200 OK`, `401 Unauthorized`, `404 Not Found`).

- **HATEOAS (Hypermedia As The Engine Of Application State):**
  The server should ideally return links inside its responses
  telling the client what actions it can perform next.
  _(Note: This is the only sub-rule that most modern development teams skip
  in production because it adds immense payload overhead)._

---

## 6. Code on Demand (Optional)

- **The Rule:**
  The server can optionally send executable code scripts down to the browser
  to execute dynamic logic directly inside the client engine.

- **Why it's optional:**
  Most APIs just send raw data strings,
  but sometimes a server might transmit a compiled block of client-side JavaScript
  or a WebAssembly binary for the browser to run on the fly.
