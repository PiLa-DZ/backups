# MAN `Metropolitan Area Network`

If a --> LAN `Local Area Network` is the network inside your single room or building,
and a -> WAN `Wide Area Network` is the massive global internet mesh crossing oceans,
a -----> MAN `Metropolitan Area Network` is the sweet spot right in the middle.

It is a high-speed network engineered specifically to span
**one single city or municipality**.

---

## The City Connector (ASCII Art)

A MAN typically acts as a high-speed backbone
that links together multiple distinct LANs scattered across town
(like different university campuses, municipal buildings, or corporate offices)
so they can talk to each other as if they were in the same room.

```text
       +-------------------------------------------------------+
       |             METROPOLITAN AREA NETWORK (MAN)           |
       |                   (City-Wide Fiber Ring)              |
       +───┬───────────────────────┬───────────────────────┬───+
           │                       │                       │
           │ (High-Speed Link)     │ (High-Speed Link)     │ (High-Speed Link)
           ▼                       ▼                       ▼
     +-----+------+          +-----+-------+          +-----+------+
     |  CAMPUS A  |          | HEADQUARTERS|          | DATA CENTER|
     |  Local LAN |          |  Local LAN  |          |  Local LAN |
     +------------+          +-------------+          +------------+

```

---

## Real-World Scenarios: Who Builds a MAN?

You interact with MANs all the time,
even if you don't see them.
Here are the most common real-world use cases:

### 1. Smart Cities & Municipalities

A city government will dig up the streets and lay their own private fiber-optic cables to create a MAN.
This network connects the local police stations,
fire departments, traffic light control systems,
and city hall together.
Because it is their private city-wide network,
they don't have to pay a commercial ISP for data transmission,
and the speeds are blazing fast.

### 2. University Campuses

Imagine a large university that has a Medical Campus on the north side of the city
and an Engineering Campus on the south side.
Instead of routing sensitive student data and research over the public internet,
the university rents or builds a high-speed MAN to link the two campuses directly.

### 3. Cable Television & Local Fiber Providers

Your local cable TV or high-speed fiber internet provider uses a MAN to distribute data.
They run a massive city-wide fiber ring that connects their main distribution facility (the "headend")
to all the smaller neighborhood distribution boxes
we talked about when looking at the Internet's Tree topology.

---

## The Core Technology: How MANs Fly

Because a MAN has to cover an entire city (roughly 5 to 50 kilometers) without slowing down,
it can't use standard copper Ethernet cables (which lose their signal after just 100 meters).

- **The Medium:**
  MANs are built almost entirely out of **Dark Fiber**
  (underground fiber-optic cables shooting high-powered lasers).

- **The Topology:**
  MANs heavily rely on the **Dual-Ring Topology** or **Partial Mesh** layouts.
  They lay two parallel rings of fiber around the city spinning in opposite directions.
  If a construction crew accidentally digs up a street and severs one line,
  the MAN instantly heals itself by reversing the data down the secondary ring,
  keeping the whole city online.

---

## Network Scale Comparison: The Big Picture

To keep your mental map of network scaling completely organized,
think of them in terms of physical boundaries:

| Scale Type | Full Name                 | Geographic Reach                            | Real-World Example                                |
| ---------- | ------------------------- | ------------------------------------------- | ------------------------------------------------- |
| **LAN**    | Local Area Network        | A room, a home, or a single building        | Your home Wi-Fi or a server rack cluster          |
| **MAN**    | Metropolitan Area Network | A town, a city, or a single municipality    | A university network linking campuses across town |
| **WAN**    | Wide Area Network         | Countries, continents, or the entire planet | The global internet backbone mesh                 |
