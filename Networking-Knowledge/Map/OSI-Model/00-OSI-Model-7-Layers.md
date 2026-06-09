# The 7 Layers: From Code to Copper

- Layer 7: Application Layer
- Layer 6: Presentation Layer
- Layer 5: Session Layer
- Layer 4: Transport Layer
- Layer 3: Network Layer
- Layer 2: Data Link Layer
- Layer 1: Physical Layer

---

## OSI Model

The OSI (Open Systems Interconnection) model

Is a conceptual framework that standardizes
the functions of a telecommunication or computing system

Into seven distinct layers.

Each layer performs a specific set of network functions,

And communicates with the layers above and below it.

This model provides a structured way to understand
How information travels from one application to another
Over a network.

---

## Layer 7: Application

This is your backyard.
This layer interacts directly with the software application.
When you write an Express route, you are working right here.

- **Protocols:** HTTP, HTTPS, DNS, SSH, FTP.

- **Backend Relevance:**
  Your `app.get('/api/users', ...)` handles HTTP requests.
  When you use Zod to validate an incoming JSON payload,
  you are validating data delivered at the Application layer.

---

## Layer 6: Presentation

This layer is responsible for translating, encrypting,
and compressing data so that the application layer can understand it.
It ensures data is in a readable format.

- **Concepts:** JSON parsing, SSL/TLS encryption, string encoding (UTF-8).

- **Backend Relevance:**
  When you use `express.json()` middleware to parse an incoming string
  into a JavaScript object, or when TLS encrypts your JWT cookies
  before they leave the server, Layer 6 is at work.

---

## Layer 5: Session

This layer establishes, manages,
and terminates connections (sessions) between local and remote applications.

- **Protocols/Concepts:** Sockets, session restoration, authentication handshakes.

- **Backend Relevance:**
  While you use cookie-based auth or JWTs at the application level
  to keep track of a user's _state_, Layer 5 manages the literal network session/connection
  lifetime between the client's browser and your Node.js server.

---

## Layer 4: Transport

This layer handles host-to-host communication,
data flow control, and error detection. It decides _how_ data is sent.

- **Protocols:** TCP (Transmission Control Protocol) and UDP (User Datagram Protocol).

- **Backend Relevance:**
  Node's Express framework runs on top of HTTP,
  which relies on **TCP**. TCP ensures that if you send a chunk of data,
  it arrives completely, without errors, and in the exact order it was sent.
  If a packet drops, TCP automatically retries.
  (Supertest abstracts this away, but every API test you run spins up a temporary TCP connection).

---

## Layer 3: Network

This layer is responsible for packet routing—finding the best physical path
for the data to travel from one device to another across different networks.

- **Protocols/Concepts:** IP (IPv4, IPv6), Routers, ICMP (`ping`).

- **Backend Relevance:**
  When your Node app connects to a MariaDB instance on a remote server,
  Layer 3 handles routing those packets across the internet
  or your cloud provider's network using IP addresses.

---

## Layer 4 vs Layer 3 Visualized

To easily remember the difference between Transport (Layer 4)
and Network (Layer 3), imagine shipping a package:

- **Layer 3 (IP):**
  Is the address written on the box.
  It tells the postal service _where_ the package needs to go.

- **Layer 4 (TCP):**
  Is the delivery confirmation and tracking.
  It ensures the contents inside the box arrive intact,
  and if a box goes missing, it requests a replacement.

---

## Layer 2: Data Link

This layer provides node-to-node data transfer within the _same_ local network.
It packages data from the Network layer into "frames" and handles physical addressing.

- **Protocols/Hardware:** MAC Addresses, Switches, Ethernet.

- **Backend Relevance:**
  If your backend server and your database are sitting on the same local network switch,
  they communicate directly via Layer 2 using their hardware MAC addresses.

---

## Layer 1: Physical

The actual physical hardware that transmits raw unstructured bitstreams over a physical medium.

- **Hardware:**
  Fiber optic cables, Ethernet cables (Cat6),
  radio waves (Wi-Fi), network interface cards (NICs).

- **Backend Relevance:**
  This is the actual electricity, light,
  or radio frequency carrying your `1`s and `0`s
  out of your server's ethernet port.

---

## Data Encapsulation: How Your Code Travels

When you send a response from Express,
like `res.json({ success: true })`,
it goes through a process called **Encapsulation**.

As your data moves down the stack,
each layer wraps the data from the previous layer
with its own header information (like nesting Russian dolls):

```text
[ Layer 7: HTTP Data (JSON) ]
       ↓
[ Layer 4 Header (TCP Port 8080) ] + [ HTTP Data ]
       ↓
[ Layer 3 Header (Source/Dest IP) ] + [ TCP Header ] + [ HTTP Data ]
       ↓
[ Layer 2 Header (MAC Address) ] + [ IP Header ] + [ TCP Header ] + [ HTTP Data ] + [ Trailer ]
       ↓
[ Layer 1: 01011010011010101... sent over the wire ]

```

When the client receives those bits,
the reverse process happens (**Decapsulation**)—each layer strips
off its corresponding header until the client's browser
is left with just the raw HTTP JSON data.

---

## Put it into Practice

Since you use Linux and write backend code,
you can see these layers in action right now using your terminal:

1. **Layer 3 Check:**
   Run `ping 8.8.8.8` in your terminal.
   This sends an ICMP packet directly to Google's DNS server
   to test if Layer 3 (IP routing) is working between you and them.

2. **Layer 4 Check:**
   Run `ss -tlnp` (or `netstat`).
   This will show you all the active **TCP ports** currently listening on your machine.
   When your Express server is running on port `3000`,
   you will see it bound here at Layer 4.

Would you like to write a quick, raw TCP server in Node.js
using the native `net` module to see how Layer 4 operates without the abstraction of Express (Layer 7)?
