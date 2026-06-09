# Layer 1: The Physical Layer

- Bit representation: `0V, 5v` <--> `0, 1`
- Speed / Data rate: `1000Mb/s` `10Mb/s`
- Synchronization: When bit starts and ends
- Transmission mode: (Simplex, Half-Duplex, Full-Duplex)
- Hardware Cables: (Ethernet, Fiber-Optic)
- Hardware Wireless: (RF, Wi-Fi)
- Hardware Devices: `Network Interface Card (NIC)`, `Hubs`, `Repeaters / Signal Boosters`

```bash
# check your network interfaces
ip link
# To look deeper at the physical capabilities of your network card
sudo ethtool enp3s0
# NOTE: Replace `enp3s0` with your actual ethernet interface name
```

---

## 1. What Layer 1 Actually Does

The Physical Layer has one simple but brutal job:
**Move raw bits (1s and 0s) from one device to another.**

It doesn't know what an IP address is,
it doesn't care about HTTP headers,
and it has no concept of a JSON object.
It only deals with:

- **Bit representation:**
  How a 1 or a 0 is encoded into a physical signal (+5V for a 1, 0V for a 0).

- **Data rate:** How many bits can be sent per second (bandwidth).

- **Synchronization:**
  Making sure the sender and receiver clocks match perfectly
  so they know exactly when a bit starts and ends.

- **Transmission mode:**
  Simplex (one direction),
  Half-Duplex (two directions, but one at a time),
  or Full-Duplex (both directions simultaneously).

---

## 2. The Hardware of Layer 1

Here are the physical components you'll interact with in a server rack,
a home lab, or your local machine:

### Cables & Media

- **Ethernet Cables (Copper / RJ45):**
  Uses electrical voltages over twisted pairs of copper wires.
  You’ll hear terms like **Cat5e**, **Cat6**, or **Cat6a**.

- **Fiber-Optic Cables:**
  Uses pulses of **light** traveling through incredibly thin glass or plastic strands.
  This is what handles massive backbones (like undersea internet cables)
  because light travels long distances with almost zero signal degradation.

- **Wireless (RF / Wi-Fi):**
  Uses electromagnetic radio waves to transmit bits through the air.

### Devices

- **Network Interface Card (NIC):**
  The hardware chip on your motherboard (or PCIe card) that plugs into the network.
  It takes the digital data from your OS and transforms it into physical signals.

- **Hubs:**
  Old-school hardware that simply duplicates any incoming electrical signal
  on one port and blasts it out to all other ports.
  (Modern networks use _Switches_ at Layer 2 instead because hubs cause too many data collisions).

- **Repeaters / Signal Boosters:**
  Simple devices that take a degrading electrical or light signal,
  amplify it, and pass it along to extend the cable distance limit.

---

## 3. The Linux & Backend Connection

Even though Layer 1 is hardware,
you still manage and troubleshoot it from the command line on your Linux backend servers.

### Tool 1: Checking the Physical Link (`ip link` or `ethtool`)

If your backend server suddenly can't reach the database,
your very first troubleshooting step isn't checking the code;
it’s checking if the wire is actually plugged in.

You can check your network interfaces in Linux using:

```bash
ip link

```

Look for the state of your network interface (like `enp3s0` or `wlan0`).
If it says **`LOWER_UP`**, it means Layer 1 is physically connected
(the cable is plugged in and detects an electrical link).
If it says **`NO-CARRIER`**, the wire is physically unplugged or broken.

To look deeper at the physical capabilities of your network card, use:

```bash
sudo ethtool enp3s0

```

_(Replace `enp3s0` with your actual ethernet interface name)._
This will output the physical speed capacity (e.g., `1000Mb/s` or 1Gbps),
whether it's running in `Full Duplex`, and if it detects a physical link.
