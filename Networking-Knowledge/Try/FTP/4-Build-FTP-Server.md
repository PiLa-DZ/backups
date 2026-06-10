# Build your own custom FTP server from scratch

By building it yourself,
you will write the exact JavaScript code that listens for those `USER`, `PASS`,
and file transfer commands we just discussed,
and you can connect to it from your other Arch Linux machine
using a standard FTP client or another Node.js script.

---

## The Catch: Why FTP is Trickier than HTTP

Before we look at the code,
there is a fascinating quirk about the FTP protocol contract that you must know.

Unlike HTTP, which does everything over a single connection,
**FTP uses two completely different TCP connections simultaneously**:

1. **The Command Channel (Port 21):**
   This is the permanent connection where the client sends text commands
   (`USER`, `PASS`, `PORT`, `QUIT`)
   and receives text status numbers
   (`220`, `331`, `230`).
   **No file data ever moves over this pipe.**

2. **The Data Channel (Dynamic Port):**
   The absolute second the client asks to download a file,
   upload a file, or even just ask for a directory list (`ls`),
   a **brand new, temporary TCP connection**
   is opened exclusively to transmit those raw file bytes.
   Once the file finishes moving,
   this second pipe is destroyed.

---

## 1. Building the Custom FTP Server (`ftp-server.js`)

Let's build a lightweight JavaScript FTP server using Node's
`net` module that handles login authentication and basic directory mapping.

```javascript
import net from "net";

// Hardcoded user authentication contract
const AUTH_USER = "nabil";
const AUTH_PASS = "archlinux";

const server = net.createServer((commandSocket) => {
  console.log(`📡 New client connected from: ${commandSocket.remoteAddress}`);

  // Track the state of this specific client connection
  let currentUsername = "";
  let isAuthenticated = false;

  // Rule 1: Send the mandatory greeting banner immediately upon connection
  commandSocket.write("220 Welcome to Nabil's Custom JS FTP Server\r\n");

  commandSocket.on("data", (chunk) => {
    const rawInput = chunk.toString().trim();
    console.log(`[Client Command]: ${rawInput}`);

    // Split the incoming text into the Command (e.g., USER) and the Argument (e.g., nabil)
    const [command, arg] = rawInput.split(" ");

    switch (command.toUpperCase()) {
      case "USER":
        currentUsername = arg;
        commandSocket.write("331 User name okay, need password.\r\n");
        break;

      case "PASS":
        if (currentUsername === AUTH_USER && arg === AUTH_PASS) {
          isAuthenticated = true;
          commandSocket.write("230 User logged in, proceed.\r\n");
        } else {
          commandSocket.write("530 Not logged in, invalid credentials.\r\n");
        }
        break;

      case "SYST":
        commandSocket.write("215 UNIX Type: L8\r\n");
        break;

      case "PWD":
        if (!isAuthenticated)
          return commandSocket.write("530 Please log in first.\r\n");
        commandSocket.write('257 "/" is the current directory.\r\n');
        break;

      case "QUIT":
        commandSocket.write("221 Goodbye.\r\n");
        commandSocket.end();
        break;

      default:
        commandSocket.write("502 Command not implemented yet.\r\n");
        break;
    }
  });

  commandSocket.on("end", () => console.log("🔌 Client disconnected."));
});

// Bind to Port 2121 (Standard port 21 requires root sudo privileges)
server.listen(2121, () => {
  console.log("🚀 Custom FTP Protocol Server running on port 2121...");
});
```

---

## 2. Connecting From Your Second Arch Linux Computer

Once you run `node ftp-server.js` on your primary computer,
grab your second Arch Linux machine.
You don't need to write any client code to test it;
you can use the official standard command-line FTP client built into Linux.

### Step A: Install the FTP client on the second machine

If you don't have it installed on your secondary Arch system,
download it via `pacman`:

```bash
sudo pacman -S inetutils

```

### Step B: Initiate the connection across your local Wi-Fi

Run the client command,
targeting your primary machine's local network IP and our custom port `2121`:

```bash
ftp -p 192.168.0.XXX 2121

```

_(Replace `192.168.0.XXX` with the actual private IP of the computer running your Node.js script)._

### Step C: Watch the Protocol Execute

Your terminal will instantly prompt you for your credentials:

1. Type `nabil` when it asks for the name.
2. Type `archlinux` when it asks for the password.

Look back at your server terminal!
You will watch the raw `USER` and `PASS` text evaluation
fire inside your JavaScript `switch` block in real time as the client logs in successfully.

---

## The Next Level: Implementing Data Channels

The code template above handles the **Command Channel**.
If you want to expand this to actually move real files across your local network,
your JavaScript code must listen for commands like `PORT` or `PASV`.

These commands tell your server:
_"Hey, prepare to launch a brand new `net.createServer()` loop
on a temporary port right now so I can send you the file bytes."_

Would you like to see how to expand this script to handle the `PASV` command
to actually transfer raw file streams between your two Arch machines,
or would you prefer to explore another Metasploitable protocol target next?
