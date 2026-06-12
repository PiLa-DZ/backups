# DHCP `Dynamic Host Configuration Protocol`

DHCP automates the process of assigning IP addresses to network endpoints
so they can communicate with other network devices over IP.
Whenever a device joins a network with a DHCP server for the first time,
DHCP automatically assigns it a new IP address
and continues to do so each time a device moves locations on the network.

Without DHCP,
network administrators must manually assign IP addresses to each new device.

When a device connects to a network,
a DHCP handshake takes place.
In this handshake process,
the device and DHCP server communicate using the following steps:

1. The device establishes a connection
   and sends a DHCP broadcast request on the LAN to find a DHCP server
   that could assign an IP address to it.

2. One or more DHCP servers respond, offering available IP addresses.

3. The device selects an address and formally requests it.

4. If the server approves,
   it acknowledges the request and records the device's IP address,
   MAC address and other relevant details,
   such as the hostname and subnet mask.

5. The IP address is leased to the device for a short period,
   after which the lease expires.

6. Once 50% of the lease time has elapsed,
   the device can begin requesting a lease renewal.

Besides dynamically assigning IP addresses,
a DHCP server also passes essential network configuration information,
such as subnet masks,
default gateways,
DNS server addresses and domain names,
to the requesting device.
This enables devices to communicate seamlessly within both local and external networks.
