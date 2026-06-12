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
