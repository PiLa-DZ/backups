# 3. Text & Communication Protocols

These protocols are designed for hyper-low-latency messaging
or structured text formatting, not binary file streaming.

- **SSH (Secure Shell - Port 22):**
  While we used it via SFTP to move files,
  the _core_ SSH protocol is actually for **remote terminal execution**.
  When you SSH into your target box,
  you aren't downloading anything.
  Your laptop sends your keystrokes down the wire,
  the target machine executes them in its Arch Linux bash shell,
  and it sends back just the raw text output to display on your screen.

- **SMTP / IMAP (Email Protocols - Ports 25 / 993):**
  Built specifically for routing, queuing,
  and pulling down electronic mail messages.

- **IRC / XMPP (Instant Messaging):**
  Old-school and modern chat protocols
  designed to broadcast text strings across chat rooms instantly.
