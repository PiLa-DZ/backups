# Networking protocols are categorized into three main types

1. Communication protocols that facilitate data exchange between devices,

1. Management protocols that oversee and control network operations,

1. Security protocols that ensure the protection, authentication and integrity of data during transmission.

---

- Two fundamental networking models:
  - Open Systems Interconnection (OSI)
  - Transmission Control Protocol/Internet Protocol (TCP/IP).

---

- TCP/IP, on the other hand,
  is the most widely used model,
  powering the internet and most private networks.
  It provides a standardized framework that lets devices easily communicate,
  ensuring efficient and seamless data exchange.

- TCP/IP is typically divided into four layers,
  with each layer representing a different set of protocols and having a distinct purpose:

1. Application layer.
   The application layer interacts directly with end users
   and provides them with network services, including web browsing,
   file transfers and email communication.
   Protocols such as domain name system (DNS),
   Dynamic Host Configuration Protocol (DHCP),
   File Transfer Protocol (FTP),
   Hypertext Transfer Protocol (HTTP),
   Simple Mail Transfer Protocol (SMTP),
   Simple Network Management Protocol (SNMP),
   Secure Shell (SSH)
   Telnet operate at this layer.

2. Transport layer.
   The transport layer provides end-to-end communication
   between hosts and ensures data delivery.
   Protocols such as TCP and User Datagram Protocol (UDP)
   operate at this layer. However,
   while TCP is designed to be reliable,
   transport layer protocols aren't always reliable.

3. Internet layer.
   Also known as the network layer,
   the internet layer is responsible for routing data packets from source
   to destination across networks.
   It uses logical IP addresses to determine the best path
   to send data to its destination.
   IP is the primary protocol operating at this layer,
   but other protocols, such as Address Resolution Protocol (ARP)
   and Internet Control Message Protocol (ICMP),
   also operate there.

4. Link layer.
   Also known as the data link layer,
   this layer is responsible for the physical transmission
   of data over network hardware,
   using protocols such as Ethernet for wired networks
   or a variation of 802.11 for wireless
   or Wi-Fi networks.

---

- routing protocols,
  - Border Gateway Protocol (BGP)
  - Open Shortest Path First (OSPF).
