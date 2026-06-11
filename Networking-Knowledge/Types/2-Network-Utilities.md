# 2. Network Utilities & Translators (Crucial Infrastructure)

These protocols don't move user files;
they move tiny, structural control packets
that keep the internet from collapsing.

- **DNS (Domain Name System - Port 53):**
  The phonebook of the web.
  When you type `google.com`,
  your browser uses the DNS protocol to send a tiny text query asking,
  _"What is the IP address for this text string?"_
  The server replies with an IP address (like `142.250.190.46`).
  No files are transferred;
  it’s pure,
  fast key-value lookups over UDP.

- **DHCP (Dynamic Host Configuration Protocol - Ports 67/68):**
  When your phone connects to your home Wi-Fi,
  it uses DHCP to yell out to the router,
  _"Hey, I'm new here! What should my local IP address be, and where is the gateway?"_
  The router assigns it an IP like `192.168.0.185`.
