# Layer 3: Network Layer

- Packets: <-- chunks <-- Layer 4
- Logical Addressing (IP Addresses)
- Routing: `Destination IP address` --> `Routing Table` --> `the next router`

- Hardware Router: `local network (LAN)` `outside world (WAN)`
- Protocols:
  - ICMP (Internet Control Message Protocol)
  - IPsec

```bash
# Inspecting Routing Tables
ip route
# Tracking the Path
traceroute google.com

```

---

## 1. The Core Responsibilities of Layer 3

The Network Layer takes the data chunks from Layer 4 (Transport)
and packages them into **Packets**.
It has two primary, critical responsibilities:

### Logical Addressing (IP Addresses)

Unlike MAC addresses which are physically burned into the hardware,
**IP (Internet Protocol) addresses** are logical.
They are assigned by software
and change based on _where_ you are connected.

- An IP address serves two purposes:
  identifying the specific device
  and indicating what network that device belongs to.

- You are likely running
  **IPv4** (e.g., `192.168.1.50`)
  or modern **IPv6** (e.g., `2001:db8::ff00:42:8329`).

### Routing

Routing is the process of moving a packet
from a source network
to a destination network
across a web of interconnected routers.
Layer 3 routers inspect the **Destination IP address** of an incoming packet,
look at an internal mapping called a **Routing Table**,
and decide the next optimal "hop" (the next router)
to send the packet closer to its final destination.

---

## 2. Layer 3 Hardware: The Router

The undisputed champion of Layer 3 is the **Router**.

Think of a router as a border checkpoint between two countries.
A router has at least two network interfaces:
one plugged into your local network (LAN)
and one plugged into the outside world (WAN).
Its entire job is to look at packets and say:
_"This packet is meant for a machine inside my local network,
I'll pass it to Layer 2"_
or _"This packet is destined for the outside world,
I'll forward it out to the next internet router."_

---

## 3. Important Protocols at Layer 3

While **IP** handles the heavy lifting of carrying data payloads,
Layer 3 utilizes other vital protocols:

- **ICMP (Internet Control Message Protocol):**
  Used by network devices to send error messages and operational information.
  This is what powers diagnostic commands like `ping` and `traceroute`.

- **IPsec:**
  Used to secure Internet Protocol communications
  by authenticating and encrypting each IP packet
  in a data stream (heavily used in modern secure VPN tunnels).

---

## 4. The Linux & Backend Connection

As a backend engineer deploying apps to cloud platforms or local Linux instances,
you will run into Layer 3 troubleshooting constantly.

### Tool 1: Inspecting Routing Tables (`ip route`)

If your backend server cannot connect to an external service,
you need to check if your operating system even knows _how_ to exit the local network.
Run this in your Arch terminal:

```bash
ip route

```

You will see an output similar to this:

```text
default via 192.168.1.1 dev enp3s0 proto dhcp src 192.168.1.100 metric 100
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.100 metric 100

```

- The line starting with **`default via`** is your **Default Gateway**.
  This tells your Linux kernel:
  _"If an Express app requests an IP address that isn't inside our local network (`192.168.1.0/24`),
  throw that packet directly to the router at `192.168.1.1` and let it handle the heavy lifting."_

### Tool 2: Tracking the Path (`traceroute` / `traceroute2`)

When you make a network call to an external service,
your data doesn't jump directly there;
it hops across multiple routers.
You can watch this happen in real-time
by installing `traceroute` and mapping the path to an external destination:

```bash
traceroute google.com
# traceroute to google.com (142.251.208.238), 30 hops max, 60 byte packets
#  1  _gateway (192.168.0.1)  5.343 ms  5.274 ms  5.258 ms
#  2  10.231.54.131 (10.231.54.131)  1344.037 ms 10.231.54.130 (10.231.54.130)  1344.026 ms 10.231.54.131 (10.231.54.131)  1343.961 ms
#  3  10.231.54.16 (10.231.54.16)  1344.171 ms  1344.148 ms  1344.126 ms
#  4  10.50.50.16 (10.50.50.16)  1344.101 ms 10.16.16.16 (10.16.16.16)  1344.080 ms 10.50.150.16 (10.50.150.16)  1344.053 ms
#  5  172.28.50.2 (172.28.50.2)  1431.792 ms  1431.775 ms  1431.524 ms
#  6  10.105.116.42 (10.105.116.42)  1431.047 ms  1426.169 ms  1427.876 ms
#  7  10.105.116.45 (10.105.116.45)  1427.987 ms 10.105.116.18 (10.105.116.18)  1456.185 ms 10.105.116.21 (10.105.116.21)  1458.560 ms
#  8  142.250.163.34 (142.250.163.34)  1494.725 ms 10.105.116.45 (10.105.116.45)  806.764 ms  806.905 ms
#  9  192.178.110.73 (192.178.110.73)  822.691 ms * *
# 10  142.251.78.84 (142.251.78.84)  828.631 ms 72.14.233.38 (72.14.233.38)  828.673 ms 192.178.110.148 (192.178.110.148)  829.068 ms
# 11  192.178.110.134 (192.178.110.134)  829.038 ms * 142.251.78.81 (142.251.78.81)  828.562 ms
# 12  192.178.105.81 (192.178.105.81)  828.462 ms 142.251.78.81 (142.251.78.81)  828.424 ms 142.251.79.237 (142.251.79.237)  1350.549 ms
# 13  142.251.78.83 (142.251.78.83)  1350.177 ms 142.251.254.74 (142.251.254.74)  1350.433 ms ncmrsa-aq-in-f14.1e100.net (142.251.208.238)  322.727 ms
```

This will print out a list of every single router interface (Layer 3 hop)
your packet passes through, along with the latency times, until it reaches its final destination.
