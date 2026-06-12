# FTP `File Transfer Protocol`

> [!WARNING]
> Security Warning

FTP is a client-server protocol
that transfers files between a client and a server and operates over TCP/IP.

It uses two communication channels:
the command channel and the data channel.
Clients request files through the command channel
and receive access to download,
edit and copy the file,
among other actions, through the data channel.

While FTP is a file-transferring protocol,
it doesn't encrypt data and sends it in plaintext,
making it vulnerable to security risks.
Therefore, most businesses opt for file transfer protocols that are secure,
such as `Secure FTP`, to safely transfer files over a network.
