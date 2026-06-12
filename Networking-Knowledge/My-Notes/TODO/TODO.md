- Data Link Layer
  - MAC (Media Access Control) MAC address
  - LLC (Logical Link Control) IP address

- Network Layer
  - Routing: `Destination IP address` --> `Routing Table` --> `the next router`
  - Hardware Router: `local network (LAN)` <--> `outside world (WAN)`

- Transport Layer
  - `TCP` (Transmission Control Protocol) – "Reliable & Ordered":
  - `UDP` (User Datagram Protocol) – "Fast & Unreliable"

- Presentation Layer
  - Data Encryption & Decryption: `SSL/TLS (Secure Sockets Layer / Transport Layer Security)`

## TODO

1. **Inspect Live Traffic:**
   Since you are comfortable with Linux and the CLI,
   install `tcpdump` or open `Wireshark`.
   Fire up one of your Express projects,
   hit an endpoint with `curl` or Supertest,
   and watch the actual TCP handshake (`SYN`, `SYN-ACK`, `ACK`)
   and HTTP payloads happen in real-time.

2. **Break Your DNS:**
   Mess around with your `/etc/hosts` file to see how local DNS resolution overrides network DNS.

3. **Dig into Node.js Core:**
   Look at the built-in Node.js `net` and `dns` modules.
   Build a bare-minimum TCP server using `net.createServer()` instead of Express
   just to see how raw TCP streams behave before HTTP abstracting takes over.
