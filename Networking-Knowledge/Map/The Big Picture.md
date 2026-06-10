# The Big Picture: Re-Wrapping the Entire OSI Model

Now that we have gone from Layer 1 all the way to Layer 7,
let's look at exactly how an entire request executes across your stack when a user accesses your app.

Imagine a user submits a form on a frontend app to hit your `/api/dashboard` endpoint:

1. **Layer 7 (Application):** The browser creates an `HTTP GET` request with an `Authorization: Bearer <token>` header.
2. **Layer 6 (Presentation):** The string data is encoded into `UTF-8` and encrypted using `TLS (HTTPS)`.
3. **Layer 5 (Session):** The OS manages the open WebSocket or application connection stream.
4. **Layer 4 (Transport):** The data is split into segments, tagged with the destination port `443` (HTTPS), using `TCP` to ensure zero data loss.
5. **Layer 3 (Network):** The TCP segments are wrapped in packets containing your server's destination `IP Address`.
6. **Layer 2 (Data Link):** The packets are wrapped in frames containing the physical `MAC Address` of your local network gateway switch.
7. **Layer 1 (Physical):** The frames are converted into high-frequency **electrical voltages or light pulses** and blasted across the internet infrastructure to your server.
