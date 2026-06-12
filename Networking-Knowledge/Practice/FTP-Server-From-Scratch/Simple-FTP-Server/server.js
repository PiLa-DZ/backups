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
