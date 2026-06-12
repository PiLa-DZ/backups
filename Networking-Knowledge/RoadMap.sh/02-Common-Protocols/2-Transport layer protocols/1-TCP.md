# TCP `Transmission Control Protocol`

TCP is a connection-oriented transport layer protocol
that offers reliable delivery through packet sequencing,
retransmission of lost packets and flow control.

It arranges packets in order after IP has delivered them.
TCP numbers individual packets because IP can send packets
to their destinations through different routes and get them out of order.
TCP checks and reassembles the packets at the destination before delivering them to the application.
IP's job is complete once the packet reaches the destination host;
TCP's job begins at this point.
It takes over to ensure reliable and in-order delivery to the application.

TCP also detects errors in the sending process,
including if any packets are missing based on TCP's numbered system,
and it requires IP to retransmit missing packets.
Through this process,
the TCP/IP suite controls communication across the internet.
