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
