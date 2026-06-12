# 1. The History: SSL vs. TLS (The Name Confusion)

> **Goal**: Encrypting the pipe

They are just old and new versions of the exact same technology.

- **SSL (Secure Sockets Layer):**
  Created by Netscape in the 1990s.
  It had version 1.0, 2.0, and 3.0. Over time, hackers found massive math flaws in it.
  **SSL is completely dead and deprecated.**

- **TLS (Transport Layer Security):**
  The upgrade. When the internet engineering community took over fixing SSL 3.0,
  they renamed it TLS 1.0 to avoid trademark issues.
  We are currently using **TLS 1.2** and **TLS 1.3** today.

> **The Reality:**
> Even though everyone uses TLS today,
> the tech industry is stubborn and lazy.
> People still say "SSL certificate" or "SSL connection"
> when they actually mean **TLS**.
> They are talking about the exact same goal: encrypting the pipe.

---

## 2. The Three Core Jobs of TLS

Whenever you see `https://` or connect via `SFTP`,
TLS steps in to guarantee three specific things using math:

### A. Encryption (Confidentiality)

It hides the data.
If a hacker intercepts your packets mid-flight,
they won't see your password or code.
They will just see a chaotic string of random numbers and symbols like
`0x8F3A91CE...`.

### B. Authentication (Identity)

How do you know that `192.168.0.199` is _actually_ your other computer,
and not a hacker spoofing your router to steal your traffic?
TLS uses **Digital Certificates**.
The server presents a cryptographic identity card to prove it is exactly who it claims to be.

### C. Integrity (Anti-Tampering)

TLS attaches a dynamic mathematical checksum (a fingerprint) to every packet.
If a hacker on your Wi-Fi tries to intercept a packet,
alter the contents, and forward it along,
the receiver’s TLS layer will instantly notice the mathematical fingerprint
doesn't match and drop the connection.

---

## 3. How It Works: The TLS Handshake

Before your browser sends a single byte of an HTTP `GET /index.html` request,
the client and server must perform a **TLS Handshake**
to set up the rules.
Think of it like two secret agents meeting in an alleyway to agree on a secret code layout:

1. **The Hello:**
   The client tells the server:
   _"Hey, I want to talk securely.
   Here is a list of encryption math formulas (Cipher Suites) I support."_

2. **The Proof:**
   The server replies:
   _"Awesome. Let's use this specific math formula.
   Also, here is my Digital Certificate containing my public key to prove my identity."_

3. **The Secret Key:**
   The client verifies the certificate.
   Then, the client and server use advanced asymmetric math to generate a temporary,
   shared **Symmetric Secret Key**.

4. **The Lock:**
   Both sides turn on encryption.
   From this exact millisecond forward,
   all Layer 7 data passing between them is wrapped using that shared secret key.

---

## Why this matters to you right now

Think back to the protocols you just set up on your phone:

- When you used your phone's
  **FTP server**, you skipped the TLS handshake completely.
  Everything traveled exposed.

- When you used
  **Material Files over SFTP**,
  or when you type an `https://` website,
  the system pauses for a fraction of a millisecond
  to run this exact TLS handshake before passing data down
  to your Arch Linux kernel network stack.
