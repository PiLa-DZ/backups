The Local Hacker Way (Using mkcert)
Cost: 100% Free.

Setup: You install a tool on your Arch Linux machine called mkcert. It acts as a local Certificate Authority right inside your operating system.

The Command: You just run this in your terminal:

Bash
mkcert localhost 127.0.0.1 192.168.1.50
Result: It instantly drops a valid, trusted digital certificate directly onto your hard drive for your local development IPs. You plug those certificate files right into your Express or gRPC server code, and your local browser trusts it instantly without any red warning screens.
