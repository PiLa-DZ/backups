# Layer 5: Session Layer

- Session Setup, Maintenance, and Teardown
- Dialog Control: `Simplex`, `Half-Duplex`, `Full-Duplex`
- Synchronization: `Checkpoints`
- Real-World:
  - Backend microservices `RPC (Remote Procedure Call) / gRPC`
  - proxy server `SOCKS (Socket Secure)` Protocol
  - Windows networks `NetBIOS (Network Basic Input/Output System)` old-school protocol

- Network Sessions vs. Web Sessions
- WebSockets: True Layer 5/7 Hybrid
- Backend Connection: Server <-`Connection Pool`-> Database

> [!NOTE]
> This shows you every active, continuous application session currently maintained
> between your backend application processes and the database server.

```sql
SHOW PROCESSLIST;
```

---

## 1. The Core Responsibilities of Layer 5

Layer 4 (Transport) is responsible for opening a physical pipeline (like a TCP connection) between two devices.
Layer 5 takes that pipeline and manages the **dialogue** across it.
Its job is to establish, manage, synchronize,
and gracefully terminate the conversation (a **session**) between two specific applications.

It focuses on three main things:

### Session Setup, Maintenance, and Teardown

It ensures that when an application wants to talk,
a formal session is built,
kept alive while data is moving,
and torn down cleanly when finished so resources aren't wasted.

### Dialog Control

It determines who speaks when and for how long.

- **Simplex:** One-way communication.
- **Half-Duplex:** Two-way, but alternating (one speaks, the other listens, then swap).
- **Full-Duplex:** Simultaneous two-way communication.

### Synchronization (Checkpoints)

Imagine your backend needs to download a massive 5GB database backup file from an external cloud storage bucket.
If the network drops at 4.8GB without Layer 5 checkpointing,
you would have to restart the download from 0MB.

Layer 5 allows the protocol to insert **checkpoints** into the data stream.
If the underlying TCP connection drops,
Layer 5 can re-establish the connection and resume transferring from the last known checkpoint.

---

## 2. Real-World Layer 5 Protocols

While you rarely write "Layer 5 code" directly, you utilize infrastructure and protocols that depend on it:

- **RPC (Remote Procedure Call) / gRPC:**
  This is massive for modern backend microservices.
  Instead of making standard HTTP requests,
  gRPC allows one server to execute a function on another server as if it were local.
  Layer 5 manages that persistent, underlying execution session.

- **SOCKS (Socket Secure):** A protocol used to route network packets through a proxy server.

- **NetBIOS (Network Basic Input/Output System):**
  An old-school protocol used in Windows networks
  to allow applications on different computers to communicate over a local area network.

---

## 3. The Big Backend Confusion: Network Sessions vs. Web Sessions

This is where many backend developers trip up.

When you use Express,
you often implement **cookie-based sessions**
or **JWTs (JSON Web Tokens)** to remember if a user is logged in.

- **The Reality:**
  Standard HTTP is completely **stateless**.
  Every single request an Express server receives is treated as a brand new interaction.
  To fix this, we implement state _manually_ using tokens and databases at **Layer 7 (Application Layer)**.

- **The Difference:**
  True **Layer 5 Sessions** are network-driven connections
  managed by the operating system or specific protocol libraries.

However, there is one major modern web technology where the web session and Layer 5 collide: **WebSockets**.

### WebSockets: True Layer 5/7 Hybrid

When you use a library like `Socket.io` or the native WebSocket API in Node.js,
your backend opens a persistent, bi-directional, full-duplex session with the client browser.

1. The connection _starts_ as a standard Layer 7 HTTP request.

2. The client asks to "Upgrade" the connection.

3. Once accepted, the HTTP layer steps aside,
   and a permanent **session** is held wide open.
   Both client and server can push data back and forth instantly
   without the overhead of creating new TCP handshakes for every single message.

---

## 4. The Linux & Backend Connection

How do we see Layer 5 in action?
We look at persistent application sessions managed by the OS.

### Tool 1: Inspecting Active Database Connections

When your Node.js application connects to MariaDB using an ORM like Prisma,
Prisma doesn't open and close a connection for every single query
that would be incredibly slow.
Instead, it creates a **Connection Pool**.

It holds open a collection of active,
persistent Layer 5 application sessions to the database.
You can see these open sessions inside your MariaDB CLI by running:

```sql
SHOW PROCESSLIST;

```

This shows you every active, continuous application session currently maintained
between your backend application processes and the database server.
