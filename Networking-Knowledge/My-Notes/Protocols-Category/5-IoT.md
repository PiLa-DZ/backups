# 5. IoT & Real-Time Event Streaming

- **MQTT (Message Queuing Telemetry Transport - Port 1883):**
  Used by smart-home gadgets (like smart lightbulbs or smart fridges).
  A smart bulb doesn't need to stream files;
  it listens to an MQTT broker for a tiny 1-byte message:
  `ON` or `OFF`.
  It is optimized to run on tiny microcontrollers with almost zero battery power.

- **NTP (Network Time Protocol - Port 123):**
  Keeps your computer's clock perfectly accurate down
  to the millisecond by constantly syncing with atomic clocks
  across the world using highly specialized timing calculations.
