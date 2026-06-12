# UDP `User Datagram Protocol`

UDP is an alternative to TCP and also works with IP to transmit time-sensitive data.
UDP enables low-latency data transmissions between internet applications,
making it ideal for real-time applications where low latency is important,
but some data loss is acceptable,
such as with VoIP,
audio or video streaming,
and online gaming.

Unlike TCP, UDP is connectionless and doesn't wait for all packets to arrive.
Instead, UDP transmits all packets even if some haven't arrived.

UDP solely transmits packets and doesn't offer packet sequencing,
organizing or retransmission. TCP, on the other hand,
transmits, organizes and ensures the packets arrive.
While UDP is a lightweight protocol
and works faster than TCP,
it's also less reliable.
