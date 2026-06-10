# Simple FTP

**You open a raw TCP pipeline between two computers,
read a file off the disk of computer A as a stream of raw bytes,
and pour those bytes directly into the network pipe.
Computer B catches those bytes on the other side
and writes them straight onto its own disk.**

Let's build the absolute minimal,
raw version of this using two simple Node.js files:
a server that receives the file, and a client that sends the file.

---

## 1. The Receiver (`server.js`)

_Run this on the computer that will **receive** the file
(e.g., your primary machine `192.168.0.199`)._

This script sets up a raw TCP server.
The very second a client connects,
it assumes whatever bytes are coming through the pipe are
the raw contents of the file,
and it streams them directly into a file on your disk.

```javascript
import net from "net";
import fs from "fs";

// Create a raw TCP Server
const server = net.createServer((socket) => {
  console.log("📡 Client connected! Preparing to receive raw byte stream...");

  // Create a write stream to save the incoming data as 'received_secret.md'
  const fileWriteStream = fs.createWriteStream("received_secret.md");

  // Pipe the raw incoming network socket data directly onto the hard drive
  socket.pipe(fileWriteStream);

  socket.on("end", () => {
    console.log("🏁 Client closed connection. File transfer complete safely!");
    server.close(); // Shut down the server script automatically
  });

  socket.on("error", (err) => {
    console.error("❌ Network error during transfer:", err.message);
  });
});

// Listen on port 4000
server.listen(4000, () => {
  console.log("🚀 Receiver Server is open and waiting on port 4000...");
});
```

---

## 2. The Sender (`client.js`)

_Run this on the computer that **has** the file
(e.g., your second machine `192.168.0.108`)._

This script creates a dummy `secret.md` file,
opens a raw TCP connection to the receiver machine,
reads the file off the disk, and dumps it directly down the wire.

```javascript
import net from "net";
import fs from "fs";

const TARGET_SERVER_IP = "192.168.0.199"; // Replace with the receiver's real IP
const PORT = 4000;

// 1. Create a dummy file locally to test the transfer
fs.writeFileSync(
  "secret.md",
  "# Mission Success\nThis file traveled over a raw, un-abstracted Layer 4 TCP byte stream!",
);
console.log("📝 Created local secret.md file.");

// 2. Open a raw network connection directly to the receiver's port
console.log(`🔗 Connecting to receiver at ${TARGET_SERVER_IP}:${PORT}...`);
const socket = net.createConnection(
  { port: PORT, host: TARGET_SERVER_IP },
  () => {
    console.log(
      "⚡ Connected! Reading file from disk and blasting it into the pipe...",
    );

    // Create a read stream for our file
    const fileReadStream = fs.createReadStream("secret.md");

    // Pipe the file data straight out into the network socket stream!
    fileReadStream.pipe(socket);

    fileReadStream.on("end", () => {
      console.log("📤 All bytes sent down the wire. Closing connection.");
      socket.end(); // Tell the server we are completely finished
    });
  },
);

socket.on("error", (err) => {
  console.error("❌ Failed to send file:", err.message);
});
```

---

## How to Execution Across Your Machines

1. On **Computer 1** (The receiver), start the server:

```bash
node server.js

```

1. On **Computer 2** (The sender), start the client script:

```bash
node client.js

```

### What Happens Under the Hood?

The moment `client.js` executes:

1. Node asks the Linux Kernel to establish a standard **Layer 4 TCP connection** to Computer 1 on Port 4000.

2. Once the 3-way handshake finishes, the pipe is wide open.

3. Node reads `secret.md` in small chunks of raw bytes (binary numbers)
   and passes them to the network card.

4. On Computer 1,
   the raw server catches those exact same bytes coming out of the socket
   and hands them directly to the file system stream (`fs.createWriteStream`).

5. When the client hits the end of the file,
   it kills the socket connection (`socket.end()`),
   which alerts the server to close its file stream cleanly.
