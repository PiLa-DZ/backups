# OSI Model The 7 Layers

## 1 Physical Layer: `0V, 5v` <--> `0, 1` | `Digital signals` <--> `Analog signals`

## 2 Data Link Layer: `MAC (Media Access Control)`, `LLC (Logical Link Control)`

## 3 Network Layer

- Routing: `Destination IP address` --> `Routing Table` --> `the next router`
- Hardware Router: `local network (LAN)` <--> `outside world (WAN)`

## 4 Transport Layer

- `TCP` (Transmission Control Protocol) – "Reliable & Ordered":
- `UDP` (User Datagram Protocol) – "Fast & Unreliable"

## 5 Session Layer

- Session Setup
- Synchronization: `Checkpoints`
- Real-World:
  - Backend microservices `RPC (Remote Procedure Call) / gRPC`
  - proxy server `SOCKS (Socket Secure)` Protocol
  - Windows networks `NetBIOS (Network Basic Input/Output System)` old-school protocol
- Network Sessions vs. Web Sessions
- WebSockets: True Layer 5/7 Hybrid
- Backend Connection: Server <-`Connection Pool`-> Database

## 6 Presentation Layer

- Data Translation / Formatting: Example `JSON or Protocol Buffers`
- Data Encryption & Decryption: `SSL/TLS (Secure Sockets Layer / Transport Layer Security)`
- Data Compression: Example `Gzip or Brotli compression algorithms`

- Serialization / Formatting: `JSON`, `XML`, `Protocol Buffers` Turning memory objects into transmittable wire formats.
- Character Encoding: `UTF-8`, `ASCII` Ensuring emojis don't turn into corrupted text over the wire.
- Security: `TLS 1.2`, `TLS 1.3` Handling the encryption of sensitive data `passwords` `JWT tokens`.
- Compression: `Gzip`, `Deflate`, `Brotli` Minimizing payload sizes to optimize network speeds. |

## 7 Application Layer

- Identifying Communication Partners: Is the server alive?
- Synchronizing Cooperating Applications: Is the client and server agree on the rules
- Protocol-Specific Logic:
  - `HTTP / HTTPS`: `Hypertext Transfer Protocol` The foundation of the World Wide Web.
  - `DNS`: `Domain Name System` Translates human-readable names (`github.com`) into Layer 3 IP addresses.
  - `SSH`: `Secure Shell` Allows you to securely log into and manage remote Linux servers from your terminal.
  - `FTP / SFTP`: `Secure File Transfer Protocol` Used for transferring files securely between a client and a server.
  - `SMTP / IMAP`: `Mail Protocols` Used for sending and receiving emails.
