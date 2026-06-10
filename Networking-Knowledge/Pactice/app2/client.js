import net from "net";

// Open a physical Layer 4 TCP connection directly to our server
const client = net.createConnection({ port: 5000 }, () => {
  console.log("🔗 Connected to the raw TCP server successfully!");

  // Define our data payload object
  const workoutData = {
    id: "req_102938",
    action: "create_workout",
    data: {
      type: "Chest Day",
      durationMinutes: 45,
      exercises: ["Bench Press", "Incline Dumbbell Flyes"],
    },
  };

  // Convert object to string and append our mandatory \n delimiter rule
  const rawPayload = JSON.stringify(workoutData) + "\n";

  console.log("📤 Blasting raw JSON text down the wire...");
  client.write(rawPayload);
});

// Listen for incoming responses from the server
let buffer = "";
client.on("data", (chunk) => {
  buffer += chunk.toString();

  const boundary = buffer.indexOf("\n");
  if (boundary !== -1) {
    const jsonResponseString = buffer.substring(0, boundary);

    const responseObj = JSON.parse(jsonResponseString);
    console.log("📥 Server Responded with custom protocol rules:", responseObj);

    // Close down the communication loop gracefully once we have our answer
    client.end();
  }
});

client.on("close", () => {
  console.log("🔒 Connection closed safely.");
});
