# Idoom 4G LTE Router\*\*

- Inside that plastic shell is a full:
  - `micro-sized motherboard`
  - `lightweight embedded operating system`
  - `a stripped-down version of Linux`

---

## The Idoom Router Layer Stack (ASCII Art)

```text
                  [ IDOOM 4G LTE CPE ROUTER ]

   (Local Home LAN)                          (Algérie Télécom WAN)
 ┌──────────────────┐                      ┌──────────────────┐
 │ Layer 7: Web GUI │                      │ Layer 7: TR-069  │ <── Remote Config
 └────────┬─────────┘                      └────────┬─────────┘
          │                                         │
 ┌────────v─────────┐                      ┌────────v─────────┐
 │ Layer 4: NAT/PAT │                      │ Layer 4: TCP/UDP │ <── Firewalls
 └────────┬─────────┘                      └────────┬─────────┘
          │                                         │
 ┌────────v─────────┐                      ┌────────v─────────┐
 │ Layer 3: DHCP/IP │                      │ Layer 3: 4G IP   │ <── Dynamic WAN IP
 └────────┬─────────┘                      └────────┬─────────┘
          │                                         │
 ┌────────v─────────┐                      ┌────────v─────────┐
 │ Layer 2: Wi-Fi   │                      │ Layer 2: LTE MAC │ <── SIM Authentication
 └────────┬─────────┘                      └────────┬─────────┘
          │                                         │
 ┌────────v─────────┐                      ┌────────v─────────┐
 │ Layer 1: Antennas│                      │ Layer 1: 4G RF   │ <── Radio Waves to Tower
 └──────────────────┘                      └──────────────────┘

```

---

## 1. Layers 1 & 2: The Dual-Interface Foundation

Your router maintains two completely separate physical and data link identities:

- **The LAN Side:**
  - It uses its **Layer 1** internal Wi-Fi antennas to vibrate the airwaves inside your room
    (or the physical RJ45 yellow Ethernet copper ports).
  - At **Layer 2**, it processes local MAC addresses to pass frames cleanly
    between your laptop and your phone.

- **The WAN Side:**
  - Its internal **Layer 1** cellular antennas modulate radio frequencies
    between 700 MHz and 3.5 GHz to shoot signals out your window to the cell tower.
  - At **Layer 2**, it manages the specialized **LTE MAC layer**,
    using your Algérie Télécom SIM card to cryptographically handle the cellular handshake
    and lock onto the network tower.

## 2. Layer 3: The Routing Engine

This is the core brain of the device.

- It runs an internal **DHCP Server**
  to actively manage your private IP space,
  dynamically parsing out local IPs like `192.168.8.X` to your domestic devices.
- It tracks an internal **IP Routing Table**.
  If you try to access a website or update packages on your Arch system,
  the Layer 3 processor realizes the destination is external
  and prepares to pass the packet out to the WAN `wide area network`.

## 3. Layer 4: The Translation Gate (NAT & Port Management)

Your router runs an active Layer 4 parsing engine
to handle `**Network Address Translation (NAT / PAT)**`.

- When your Arch laptop opens a connection to a remote server,
  it sets a local Layer 4 port (e.g., source port `43210`).

- Your Idoom router actively intercepts this Layer 4 segment,
  changes the source IP to its single Algérie Télécom public WAN IP,
  rewrites the source port to track it inside its dynamic internal `**NAT Translation Table**`,
  and recalculates the TCP checksum header before blasting it out to the cell tower.
  Without this Layer 4 computational engine,
  only one device in your house could use the internet at a time!

## 4. Layer 7: The Control Interface (The Software Apps)

Your router runs user-facing software applications directly inside its embedded chip:

- **The Admin Dashboard:**
  When you type `192.168.0.1` into your browser
  to log into the white-and-blue configuration web interface,
  check your 4G signal strength bars,
  read SMS messages sent to your SIM card,
  or change your Wi-Fi password,
  you are interacting directly with a lightweight **Layer 7 HTTP Web Server**
  running inside the router's memory.

- **Remote Management (TR-069):**
  Most ISP-provided routers run a background protocol called TR-069
  at the application layer.
  This allows Algérie Télécom engineers to push remote firmware updates,
  activate your subscription tier,
  or debug connection faults on your node from their central data center in Algiers.

---

## Summary Matrix: The Internal Systems of Your Router

| OSI Layer                 | What it runs inside your Idoom box                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Layer 7 (Application)** | The `192.168.8.1` configurations webpage dashboard, SMS reception logic, and remote ISP provisioning tools. |
| **Layer 4 (Transport)**   | The heavy-duty NAT/PAT tracking tables, stateful firewall packet filters, and TCP connection track modules. |
| **Layer 3 (Network)**     | The dynamic DHCP IP assignment engine, local routing tables, and WAN packet forwarding logic.               |
| **Layer 2 (Data Link)**   | Local Wi-Fi framing algorithms, Ethernet tracking, and the SIM-authenticated 4G LTE cellular framework.     |
| **Layer 1 (Physical)**    | Copper Ethernet jacks, 2.4GHz/5GHz Wi-Fi radio transmitters, and 4G LTE wireless antennas.                  |
