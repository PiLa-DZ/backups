import net from "net";

// 1. Create a raw Layer 4 TCP Server
const server = net.createServer((socket) => {
  console.log("🚨 A browser opened a physical network connection!");

  // 2. Listen for the raw data strings the browser sends us
  socket.on("data", (rawIncomingBuffer) => {
    const requestText = rawIncomingBuffer.toString();

    // Print exactly what the browser sent us down the wire
    console.log("--- RAW REQUEST FROM BROWSER ---");
    console.log(requestText);
    console.log("--------------------------------");

    // 3. Manually construct our Layer 7 HTTP Response string
    // CRITICAL: Every line must end with \r\n (Carriage Return + Line Feed)
    // There MUST be an empty line (\r\n\r\n) between the headers and the body!
    const body = JSON.stringify({
      message: "Hello directly from raw TCP bytes!",
    });

    const httpResponse =
      "HTTP/1.1 200 OK\r\n" +
      "Content-Type: application/json\r\n" +
      `Content-Length: ${Buffer.byteLength(body)}\r\n` +
      "Connection: close\r\n" +
      "\r\n" + // <-- The crucial empty line that signals "Headers are done, here comes the payload!"
      body;

    // 4. Blast the raw text strings straight into the network socket
    socket.write(httpResponse);

    // 5. Hang up the physical connection according to our contract
    socket.end();
  });
});

// Bind to Port 8080 (A standard HTTP testing port)
server.listen(8080, () => {
  console.log("Manual HTTP Server listening on http://localhost:8080");
});
