```bash
~/Github/backups/Networking-Knowledge/Pactice/app2 (main ✗) node server.js
🚀 Custom TCP JSON Server running on port 5000
📡 Client connected via a raw TCP pipeline!
📥 Received Clean JSON from Client: {
  id: 'req_102938',
  action: 'create_workout',
  data: {
    type: 'Chest Day',
    durationMinutes: 45,
    exercises: [ 'Bench Press', 'Incline Dumbbell Flyes' ]
  }
}
💪 Processing workout creation for: Chest Day
🔌 Client closed the TCP connection.
```

```bash
~/Github/backups/Networking-Knowledge/Pactice/app2 (main ✗) node client.js
🔗 Connected to the raw TCP server successfully!
📤 Blasting raw JSON text down the wire...
📥 Server Responded with custom protocol rules: {
  status: 'SUCCESS',
  receivedId: 'req_102938',
  timestamp: '2026-06-10T09:12:06.931Z'
}
🔒 Connection closed safely.
```
