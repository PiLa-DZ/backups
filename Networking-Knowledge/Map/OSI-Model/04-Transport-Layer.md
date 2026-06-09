# Layer 4: Transport Layer

Managing **end-to-end communication, reliability, and multiplexing (ports)**.

- Structured chunks called **Segments** (for TCP) or **Datagrams** (for UDP).
  - Port Numbers: `0 to 65535`
  - Reliability & Flow Control: manages how data loss is handled

- TCP (Transmission Control Protocol) – "Reliable & Ordered":
  - **SYN:** `(_"Hey, I want to connect."_)`
  - **SYN-ACK:** `(_"I hear you, let's connect."_)`
  - **ACK:** `(_"Awesome, connection established!"_)`

- UDP (User Datagram Protocol) – "Fast & Unreliable"
  - Video streaming, live gaming, DNS lookups, and real-time metrics collection (like StatsD)

```bash
# -------------------------------------------------------------
### Tool 1: Inspecting Bound TCP/UDP Ports (`ss` / `netstat`)
# If your Express server is up, you’ll see a line showing a process named `node` bound to `*:8080`.
ss -tlnp
# - `-t`: Show **TCP** sockets.
# - `-l`: Show **listening** sockets (services waiting for connections).
# - `-n`: Show numeric port numbers instead of resolving service names.
# - `-p`: Show the Linux **process** PID using the port.

# -------------------------------------------------------------
### Tool 2: Testing Port Connectivity (`nc` / netcat)
nc -zv 192.168.0.108 3306
# Output:
# Connection to 192.168.0.108 3306 port [tcp/mysql] succeeded!
```

---

## 1. The Two Core Responsibilities of Layer 4

The Transport Layer takes data from your application
and chops it into structured chunks called **Segments** (for TCP) or **Datagrams** (for UDP).

### Port Numbers (Multiplexing)

Layer 4 introduces **Ports** (0 to 65535).
While an IP address identifies a specific machine on a network,
a Port identifies a specific software process running _inside_ that machine.

- When your Express app executes `app.listen(8080)`,
  it tells the Linux kernel's Layer 4 stack:
  _"Any incoming transport segments addressed to port 8080 belong to me."_

### Reliability & Flow Control

Depending on the protocol chosen at this layer,
Layer 4 manages how data loss is handled,
ensures data segments are reassembled in the correct order,
and prevents a fast sender from overwhelming a slow receiver.

---

## 2. The Two Titans of Layer 4: TCP vs. UDP

When writing backend systems,
you must choose between two vastly different
Layer 4 protocols depending on your application's requirements.

### TCP (Transmission Control Protocol) – "Reliable & Ordered"

TCP is a **connection-oriented** protocol.
Before any data can be sent,
it forces the client and server to
perform a strict greeting ritual known as the **TCP 3-Way Handshake**:

1. **SYN:** Client sends a synchronization request (_"Hey, I want to connect."_)
2. **SYN-ACK:** Server responds acknowledging the request (_"I hear you, let's connect."_)
3. **ACK:** Client acknowledges the server's response (_"Awesome, connection established!"_)

- **Features:**
  Guaranteed delivery (drops are automatically retransmitted),
  error checking, and strict ordering
  (if Segment 2 arrives after Segment 3,
  TCP holds onto it until Segment 2 shows up so your application reads it in order).

- **Where you use it:**
  Express HTTP/HTTPS APIs, database connections (MariaDB/PostgreSQL), SSH, and Git.
  You cannot afford to lose a single byte of a JSON payload or a database record.

### UDP (User Datagram Protocol) – "Fast & Unreliable"

UDP is a **connectionless** protocol.
It doesn't do a handshake,
it doesn't track sequence numbers,
and it never retransmits lost data.
It simply fires packets at the destination and forgets about them.

- **Features:** Zero overhead, ultra-low latency, completely fire-and-forget.

- **Where you use it:**
  Video streaming, live gaming, DNS lookups, and real-time metrics collection (like StatsD).
  If a single audio frame drops during a VoIP call,
  you don't want the system to freeze while waiting for a retransmission
  you just want the stream to keep moving.

---

## 3. The Linux & Backend Connection

As a Node.js developer, you are constantly binding to and connecting via Layer 4 ports.

### Tool 1: Inspecting Bound TCP/UDP Ports (`ss` / `netstat`)

To see exactly what Layer 4 ports are actively listening
or established on your Arch Linux machine, run:

```bash
ss -tlnp

```

- `-t`: Show **TCP** sockets.
- `-l`: Show **listening** sockets (services waiting for connections).
- `-n`: Show numeric port numbers instead of resolving service names.
- `-p`: Show the Linux **process** PID using the port.

If your Express server is up, you’ll see a line showing a process named `node` bound to `*:8080`.

### Tool 2: Testing Port Connectivity (`nc` / netcat)

When debugging database connections,
instead of running your whole Node.js app just to see if the database is reachable,
test the raw Layer 4 port directly using Netcat (`nc`):

```bash
nc -zv 192.168.1.50 3306

```

This bypasses application logic entirely
and tells you instantly whether a raw TCP connection can successfully be opened
to the MariaDB port on that IP address.

---

## 4. Let's Build a Raw TCP Server in Node.js

To truly understand Layer 4 without the heavy abstractions of Layer 7 (Express/HTTP),
you can spin up a raw TCP socket server using Node's built-in `net` module.

Create a file named `server.ts` or `server.js`:

```javascript
import net from "net";

// Create a raw Layer 4 TCP Server
const server = net.createServer((socket) => {
  console.log("Client connected at Layer 4!");

  // Handle incoming stream data
  socket.on("data", (data) => {
    console.log(`Received raw bits: ${data.toString()}`);

    // Write data back straight into the TCP socket stream
    socket.write("Hello straight from Layer 4 TCP!\n");
  });

  socket.on("end", () => {
    console.log("Client disconnected.");
  });
});

// Bind to Port 4000
server.listen(4000, () => {
  console.log("TCP Socket Server listening on port 4000");
});
```

If you run this server, you can open a second terminal and talk to it using netcat:

```bash
nc localhost 4000

```

Type anything and press enter.
You are bypassing HTTP entirely—communicating using raw, bidirectional TCP streams.
