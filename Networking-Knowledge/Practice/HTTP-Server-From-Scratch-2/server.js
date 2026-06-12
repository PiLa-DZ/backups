import net from "net";

// Create a raw TCP Server
const server = net.createServer((socket) => {
  console.log("📡 Client connected via a raw TCP pipeline!");

  let buffer = "";

  // Listen for raw data chunks arriving over the wire
  socket.on("data", (chunk) => {
    buffer += chunk.toString();

    // Check if our message delimiter (\n) is in the buffer
    let boundary = buffer.indexOf("\n");
    while (boundary !== -1) {
      // Extract the complete JSON string message
      const jsonString = buffer.substring(0, boundary);
      buffer = buffer.substring(boundary + 1); // Save the remaining data stream

      try {
        // Parse the raw payload into a real object
        const payload = JSON.parse(jsonString);
        console.log("📥 Received Clean JSON from Client:", payload);

        // Process logic based on our custom contract properties
        if (payload.action === "create_workout") {
          console.log(
            `💪 Processing workout creation for: ${payload.data.type}`,
          );

          // Construct a JSON response object
          const response = {
            status: "SUCCESS",
            receivedId: payload.id,
            timestamp: new Date().toISOString(),
          };

          // Send it back to the client, terminating with our delimiter \n
          socket.write(JSON.stringify(response) + "\n");
        }
      } catch (err) {
        console.error(
          "❌ Failed to parse data stream as valid JSON:",
          err.message,
        );
      }

      // Look for the next message boundary in case multiple packages arrived together
      boundary = buffer.indexOf("\n");
    }
  });

  socket.on("end", () => {
    console.log("🔌 Client closed the TCP connection.");
  });
});

// Bind our server to custom TCP Port 5000
server.listen(5000, () => {
  console.log("🚀 Custom TCP JSON Server running on port 5000");
});
