Yes, it works **exactly the same way** fundamentally,
but with one major twist in how the final hardware hop delivers the internet into your home!

Since you are using **Idoom 4G LTE from Algérie Télécom**,
you are using what network engineers call **Fixed Wireless Access (FWA)**.

Here is exactly how the hardware,
the network cards,
and the topologies shift in your specific setup.

---

## The Idoom 4G LTE Data Path (ASCII Art)

Instead of the cellular modem chip sitting inside your phone or laptop,
the mobile network card is housed inside your **Idoom 4G LTE CPE Router**
(the white box sitting near your window).

```text
  [ INSIDE YOUR HOUSE ]                                    [ OUTSIDE / ALGERIE TELECOM ]

  +-------------------+
  | Your Arch Laptop  |
  +--------+----------+
           |
     Wi-Fi | (Local WLAN / Star)
           v
  +-------------------+                     +--------------------+
  |  IDOOM 4G ROUTER  |                     | Algérie Télécom    |
  |                   |                     | Cell Tower         |
  | 📱 SIM Inside     +====================>| (Antenna on Hills/ |
  | 📟 Cellular Modem |   ((( 4G LTE )))    |  Buildings)        |
  +-------------------+   Radio Signals     +---------+----------+
                                                      |
                                                      | (Underground Fiber Trunk)
                                                      v
                                            +--------------------+
                                            | Algiers Core Node  |
                                            | (DHCP / IPAM / WAN)|
                                            +---------+----------+
                                                      |
                                                      v
                                           (To Sea Cables / Internet)

```

---

## 1. The Hardware Split: Where the Network Cards Live

In your specific setup,
your phone or laptop isn't talking directly to Algérie Télécom.
The work is split between two different devices:

### Step A: The Local LAN / WLAN (Inside Your House)

Your Arch Linux laptop connects to the Idoom 4G router using its standard **Wi-Fi network card**
(or a yellow Ethernet cable).
At this exact moment,
you are running a standard **Private LAN / WLAN** in a **Star Topology**.
Your Idoom router acts as the central landlord (DHCP)
and hands your laptop a local IP like `192.168.8.100`.

### Step B: The Hardware Bridge (The Idoom Router)

This is where the magic happens.
Inside that white Idoom 4G router box,
there is an **Algérie Télécom SIM card** slotted into the hardware,
alongside a powerful, industrial-grade **Cellular Modem chip**.

The router acts as a bridge:

1. It collects your local Wi-Fi packets.
2. It strips away the local Wi-Fi wrapper.
3. It hands the data to its internal **4G LTE Cellular Modem**.
4. The router's large internal antennas blast that data out
   as a high-powered 4G radio signal through your window,
   traveling straight to the nearest **Algérie Télécom cell tower** in your neighborhood.

---

## 2. The Algérie Télécom Core (The WAN Layer)

Once your Idoom router's radio signal hits the cell tower,
it immediately re-enters the massive network architecture we just mapped out:

- **The Wire Backbone:**
  The cell tower takes the 4G signal from your router,
  converts it back into light pulses,
  and shoots it down a high-speed underground
  fiber-optic cable run by Algérie Télécom.

- **The Core Routing Network:**
  The packet travels across Algeria's regional **MAN and WAN infrastructure**
  until it reaches a massive central data core (likely in Algiers).
- **The Undersea Leap:**
  If you are running `pacman -Syu` to update your Arch system,
  those update packets travel from the Algiers core network straight
  down into the **undersea fiber-optic cables**
  (like the _SeaMeWe-4_ or _Medex_ cables resting on the Mediterranean sea floor)
  to fetch the software packages from servers sitting in Europe.
