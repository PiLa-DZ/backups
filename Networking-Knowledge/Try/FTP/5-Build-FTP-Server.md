# The original network engineers in 1971 designed it this way

---

## 1. Why Separate the Commands from the Data?

Imagine a network cable back in the 1970s or 1980s.
Bandwidth was incredibly tiny.
If you wanted to download a massive 50MB} file,
it could take hours.

If everything ran on **one single pipe** (like HTTP does),
the moment you started downloading that file,
that pipe would be 100% full of raw file bits.

- What if you realized 5 minutes in that you clicked the wrong file
  and wanted to cancel? You couldn't.
  You couldn't send a "STOP" command
  because the pipe was choked full of the file data.
  You would have to physically unplug your network cable.

- What if you wanted to check how many bytes were left while it was downloading?
  You couldn't ask the server, because the server was busy blasting file bytes.

By creating **two separate channels**, FTP solves this:

1. **The Command Channel**
   stays completely clear and lightweight.
   It passes tiny text strings like `USER` and `QUIT`.
   Even if a huge file is transferring on the other channel,
   the command channel is wide awake,
   listening for you to type `ABOR` (Abort) to kill the transfer instantly.

2. **The Data Channel**
   acts like a temporary workforce.
   It turns on, burns maximum network bandwidth to dump the raw file bytes
   directly into your file system, and disappears the second the file is done.

---

## 2. Let's Build the Real Deal: Transferring a File

To make our Node.js server transfer files,
we have to implement the **`PASV` (Passive Mode)** command.

When the client types `ls`
or tries to download/upload a file,
it sends `PASV` down the Command Channel.
Our server must respond by spinning up a _brand new, temporary TCP server_
on a random port and telling the client:
_"Hey, go connect to this new secret port to get your file data."_

### Updated `ftp-server.js` (With Real File Reading!)

Update your server code to handle the `PASV`
logic and the `RETR` (Retrieve/Download file) command:

```javascript
import net from "net";
import fs from "fs";
import path from "path";

const AUTH_USER = "nabil";
const AUTH_PASS = "archlinux";

const server = net.createServer((commandSocket) => {
  console.log(
    `📡 Connected to Command Channel: ${commandSocket.remoteAddress}`,
  );

  let isAuthenticated = false;
  let currentUsername = "";

  // Track our temporary Data Channel Server
  let dataServer = null;
  let dataPort = null;

  commandSocket.write("220 Welcome to Nabil's Real File FTP Server\r\n");

  commandSocket.on("data", (chunk) => {
    const rawInput = chunk.toString().trim();
    console.log(`[Client Command]: ${rawInput}`);
    const [command, ...args] = rawInput.split(" ");
    const arg = args.join(" ");

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
          commandSocket.write("530 Invalid credentials.\r\n");
        }
        break;

      case "SYST":
        commandSocket.write("215 UNIX Type: L8\r\n");
        break;

      case "PWD":
        commandSocket.write('257 "/" is the current directory.\r\n');
        break;

      case "TYPE":
        // The client says: "I want binary mode (I)" or "ASCII text mode (A)"
        commandSocket.write("200 Type set to binary.\r\n");
        break;

      case "PASV":
        if (!isAuthenticated)
          return commandSocket.write("530 Log in first.\r\n");

        // 1. Pick a random high port for our temporary data channel
        dataPort = Math.floor(Math.random() * (60000 - 50000) + 50000);

        // 2. Start a temporary Layer 4 TCP server just for this data transaction
        dataServer = net.createServer();
        dataServer.listen(dataPort, () => {
          console.log(
            `🔥 Temporary Data Channel listening on port ${dataPort}`,
          );
        });

        // 3. Format the crazy IP/Port contract response that FTP expects
        // It needs your IP split by commas, plus the port broken into two 8-bit integers.
        // For testing locally, we'll tell the client to look at the same IP on our custom port.
        const p1 = Math.floor(dataPort / 256);
        const p2 = dataPort % 256;

        // Hardcode your server IP layout here (e.g., 192,168,0,199)
        commandSocket.write(
          `227 Entering Passive Mode (192,168,0,199,${p1},${p2})\r\n`,
        );
        break;

      case "RETR": // RETR means Retrieve (Download a file)
        if (!isAuthenticated)
          return commandSocket.write("530 Log in first.\r\n");

        const fileName = arg;
        console.log(`🎯 Client wants to download file: ${fileName}`);

        // Signal back on the Command channel that we accept the transfer request
        commandSocket.write(
          "150 Opening BINARY mode data connection for file transfer.\r\n",
        );

        // Wait for the client to physically connect to our temporary Data Server
        dataServer.on("connection", (dataSocket) => {
          console.log("⚡ Data Channel Socket Established! Streaming bytes...");

          // Read the file off your Arch Linux disk as raw bytes
          const filePath = path.resolve(fileName);
          const fileStream = fs.createReadStream(filePath);

          // Pipe the file data straight out into the temporary data socket!
          fileStream.pipe(dataSocket);

          fileStream.on("end", () => {
            dataSocket.end(); // Close the data connection when file is done
            dataServer.close(); // Destroy the temporary data server completely

            // Tell the client over the primary command channel: "We are totally finished!"
            commandSocket.write("226 Transfer complete.\r\n");
          });

          fileStream.on("error", (err) => {
            console.error("File Error:", err.message);
            commandSocket.write("550 File not found or unreadable.\r\n");
            dataSocket.end();
            dataServer.close();
          });
        });
        break;

      case "QUIT":
        commandSocket.write("221 Goodbye.\r\n");
        commandSocket.end();
        break;

      default:
        commandSocket.write("502 Command not supported.\r\n");
        break;
    }
  });
});

server.listen(2121, () => {
  console.log("🚀 Real FTP Server running on port 2121...");
});
```

---

## 3. Let's Test Moving a Real File

1. On your Server machine (`192.168.0.199`),
   create a dummy text file inside your script folder called `secret.txt`:

```bash
echo "This text traveled over a custom JavaScript Layer 4 FTP Data Channel!" > secret.txt

```

1. Start your updated server: `node ftp-server.js`
2. Go to your client Arch computer (`192.168.0.108`) and log in:

```bash
ftp -p 192.168.0.199 2121

```

1. Log in with `nabil` and `archlinux`.
2. Now, download your file using the standard FTP download command **`get`**:

```text
ftp> get secret.txt

```

### Watch the output

Your client terminal will show a beautiful progress update confirming bytes were transferred, and your server terminal will log the exact moment the second, temporary data socket port ignited in memory to push the raw file stream out before shutting itself down!

Exit the ftp client, run `cat secret.txt` on your client machine, and read your successfully transferred file. You just fully implemented a multi-channel enterprise application protocol with your own hands!
