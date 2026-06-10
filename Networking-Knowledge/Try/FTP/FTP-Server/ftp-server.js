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
