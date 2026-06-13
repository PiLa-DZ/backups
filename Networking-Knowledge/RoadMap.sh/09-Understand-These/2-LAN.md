# LAN `Local Area Network`

## The Confined Boundary (ASCII Art)

A LAN is defined by its small, private perimeter.
It bundles your end-user devices and your local backend servers together
under one shared, private environment.

```text
+-------------------------------------------------------------------------+
|                        LOCAL AREA NETWORK (LAN)                         |
|                 (Your Private Home or Office Perimeter)                 |
|                                                                         |
|  +------------------+      +------------------+      +---------------+  |
|  |  Developer PC    |      |  Backend Server  |      | Database Node |  |
|  | (Arch Linux/Zsh) |      | (Node.js/Express)|      |   (MariaDB)   |  |
|  +--------+---------+      +--------+---------+      +-------+-------+  |
|           |                         |                        |          |
|           |                         |                        |          |
|           +-------------------------+------------------------+          |
|                                     | (Internal High-Speed LAN Switch)  |
|                                     v                                   |
|                          +--------------------+                         |
|                          |    LOCAL ROUTER    |                         |
|                          +----------+---------+                         |
+-------------------------------------|-----------------------------------+
                                      |
                                      │ [ GATEWAY ]
                                      ▼
                             (To the Public WAN / Internet)
```

---

## The Three Core Rules of a LAN

### 1. Private Ownership and Control

A LAN is completely owned and managed by a single entity
(you at home, or a specific company in their office building).
You don't need permission from an ISP to add a new server,
change your IP address layout,
or set up a local network share.
You are the absolute administrator of this space.

### 2. High Speed, Low Latency, and Low Cost

Because the physical distances inside a LAN are tiny (usually within 100 meters),
data doesn't have to travel across massive city fiber loops or undersea cables.

- **The Gear:**
  It uses cheap, high-speed copper Category 6 (Cat6) Ethernet cables or local Wi-Fi bands.

- **The Performance:**
  Data transfers happen at blindingly fast hardware speeds (typically 1 Gbps to 10 Gbps)
  with near-zero latency (usually under 1 to 2 milliseconds).
  This is why your local database queries run instantly compared
  to hitting a cloud database across the ocean.

### 3. Shared Resources & Private Address Space

Devices inside a LAN communicate using a special set of non-routable IP addresses called
**Private IPs** (most commonly ranges starting with `192.168.x.x` or `10.x.x.x`).

- Because these addresses are private,
  a computer on the global internet cannot see
  or talk directly to your backend database server.

- Your local router shields the entire LAN from the outside world,
  acting as a gateway border guard.

---

## Why LANs Matter to a Backend Engineer

When you write backend code,
your architecture changes completely based
on whether your traffic stays inside the LAN or leaves it:

- **Microservices and Databases:**
  Inside your production LAN data center,
  your Node.js API container can talk to your MariaDB database cluster
  or a gRPC microservice over raw, unencrypted channels if necessary,
  because the physical network is private, secure,
  and incredibly fast.

- **The Border Guard:**
  The exact moment data needs to leave the LAN to talk to a client out on the public internet,
  it must pass through a firewall,
  scale up to the public Wide Area Network (WAN),
  and force compliance with security protocols like TLS/HTTPS.
