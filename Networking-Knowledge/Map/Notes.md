## OSI Model The 7 Layers

- 1 Physical Layer: `0V, 5v` <--> `0, 1` | `Digital signals` <--> `Analog signals`

- 2 Data Link Layer: `MAC (Media Access Control)`, `LLC (Logical Link Control)`

- 3 Network Layer:
  - Routing: `Destination IP address` --> `Routing Table` --> `the next router`
  - Hardware Router: `local network (LAN)` <--> `outside world (WAN)`

- 4 Transport Layer:
  - TCP (Transmission Control Protocol) – "Reliable & Ordered":
  - UDP (User Datagram Protocol) – "Fast & Unreliable"

- 5 Session Layer:
  - Session Setup
  - Synchronization: `Checkpoints`
  - Real-World:
    - Backend microservices `RPC (Remote Procedure Call) / gRPC`
    - proxy server `SOCKS (Socket Secure)` Protocol
    - Windows networks `NetBIOS (Network Basic Input/Output System)` old-school protocol
  - Network Sessions vs. Web Sessions
  - WebSockets: True Layer 5/7 Hybrid
  - Backend Connection: Server <-`Connection Pool`-> Database
