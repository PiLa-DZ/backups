# Layer 2: Data Link Layer

- Framing: Frame(the physical source and destination addresses) trailer(used to check for errors)
- Physical Addressing (MAC Addresses): `00:1a:2b:3c:4d:5e`
- Media Access Control & Collision Avoidance
- Hardware: The Network Switch
- The Two Sublayers:
  - **LLC (Logical Link Control):** (IPv4 or IPv6) --> Layer 3
  - **MAC (Media Access Control):** (appends the hardware MAC addresses to the frame) --> Layer 1

> [!NOTE] ARP (Address Resolution Protocol)

```bash
# -------------------------------------------------------------
# Tool 1: Finding Your Hardware MAC Address
# Look for the line that says **`link/ether`** followed by a 6-byte hexadecimal address.
# That is your physical Layer 2 MAC address:
ip link show
ip address

# -------------------------------------------------------------
# Tool 2: The ARP Table (`ip neigh` or `arp`)
ip neigh
arp

# -------------------------------------------------------------
# This shows a direct map of local IP addresses (Layer 3) to physical MAC addresses (Layer 2)
# currently residing on your local network network.
arp -an
```

---

## 1. The Core Responsibilities of Layer 2

Layer 2 doesn't care about the internet, routing, or website domains.
It only cares about its immediate neighbors on the local network (LAN).
It has three primary jobs:

### Framing

Layer 2 takes the data packets coming down from Layer 3 (IP packets)
and wraps them in a **Frame**.
It adds a header (containing the physical source and destination addresses)
and a trailer (used to check for errors).

```text
+-----------------+-----------------------------------+-----------------+
| Layer 2 Header  |       Layer 3 Data Payload        | Layer 2 Trailer |
| (Source/Dest    |    (IP Packet containing your     | (Error Checking |
|  MAC Addresses) |     Express JSON HTTP data)       |      FCS)       |
+-----------------+-----------------------------------+-----------------+

```

### Physical Addressing (MAC Addresses)

Every network interface card (NIC) manufactured in the world comes burned with a unique,
permanent hardware identification numbers called a **MAC (Media Access Control) Address**.

- An example looks like this: `00:1a:2b:3c:4d:5e`.
- While IP addresses change depending on what network you connect to,
  your MAC address stays the same because it belongs to the physical hardware.

### Media Access Control & Collision Avoidance

If two computers on the same network switch
try to talk at the exact same microsecond over the same wire,
their electrical signals collide and corrupt the data.
Layer 2 protocols define the rules of the road so devices know when it's safe to transmit data.

---

## 2. Layer 2 Hardware: The Network Switch

The primary hardware device operating at Layer 2 is the **Network Switch**.

Unlike an old-school Layer 1 Hub (which blindly broadcasts data to every single device plugged into it),
a Switch is smart.
It inspects the incoming Layer 2 Frame,
reads the **Destination MAC address**,
keeps an internal table of which MAC address is plugged into which physical port,
and sends the frame _only_ to the intended recipient.

---

## 3. The Two Sublayers of Layer 2

To bridge the gap between hardware and software,
Layer 2 is split into two distinct sublayers:

1. **LLC (Logical Link Control):**
   The top half.
   It talks directly to the Network Layer (Layer 3) above it.
   It identifies the network protocol being used (usually IPv4 or IPv6)
   and handles flow control and error checking.

2. **MAC (Media Access Control):**
   The bottom half.
   It talks directly to the Physical Layer (Layer 1) below it.
   It manages access to the physical medium and appends the hardware MAC addresses to the frame.

---

## 4. The Linux & Backend Connection

As a developer using Arch Linux,
you can interact directly with Layer 2 using your terminal.

### Tool 1: Finding Your Hardware MAC Address

You can view the MAC addresses assigned to your local network cards using the `ip link` or `ip address` command:

```bash
ip link show
ip address
```

Look for the line that says **`link/ether`** followed by a 6-byte hexadecimal address. That is your physical Layer 2 MAC address:

```text
2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether a8:a1:59:bf:31:c2 brd ff:ff:ff:ff:ff:ff

```

### Tool 2: The ARP Table (`ip neigh` or `arp`)

How does your operating system know which MAC address belongs to your local gateway router's IP address?
It uses a Layer 2 protocol called **ARP (Address Resolution Protocol)**.

Your machine broadcasts an ARP request asking: _"Who has IP 192.168.1.1? Tell me your MAC address."_
Once it gets a reply, it caches it.
You can inspect your local ARP cache right now by running:

```bash
ip neigh

```

_(Alternatively, run `arp -an`)._
This shows a direct map of local IP addresses (Layer 3) to physical MAC addresses (Layer 2)
currently residing on your local network network.
