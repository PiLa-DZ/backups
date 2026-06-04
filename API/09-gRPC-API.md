# gRPC

- Built by Google in 2015
- High-performance RPC (Remote Procedure Call) Protocol Buffers (Protobuf)

- No JSON and XML
- strongly-typed **binary format (raw 1s and 0s)**.

- No Browser
- Backend Server --> Backend Server microservices grid

- HTTP/2

---

## 1. Is gRPC a concept or a protocol?

gRPC is a **real, open-source high-performance RPC (Remote Procedure Call) framework and protocol**.

Just like SOAP, it goes back to the **RPC model**,
where the client simply fires a request to execute a specific function sitting inside a remote server
as if that function were living locally right inside its own code.

---

## 2. The gRPC Secret Sauce: Protocol Buffers (Protobuf)

If you look at the formats we have discussed so far, they all use text:

- REST uses **JSON** strings: `{"id":"123","name":"Nabil"}`
- SOAP uses **XML** markup strings: `<user><id>123</id></user>`

Text strings are heavy and slow for a computer CPU to parse.
Google solved this by inventing **Protocol Buffers (Protobuf)**.

Protobuf completely replaces JSON and XML text with a hyper-compressed,
strongly-typed **binary format (raw 1s and 0s)**.

Before you write any server code,
you open Neovim and define your data schemas
and server functions inside a strict blueprint file called a `.proto` file:

```protobuf
// schema.proto
syntax = "proto3";

// The request payload configuration
message UserRequest {
  string user_id = 1;
}

// The response payload configuration
message UserProfile {
  string first_name = 1;
  string email = 2;
}

// The service contract defining the executable functions
service UserService {
  rpc GetUserProfile (UserRequest) returns (UserProfile);
}

```

---

## 3. Automatic Code Generation (The Compiler Step)

Once you write your `.proto` file,
you run it through the gRPC compiler tool (`protoc`).

The compiler looks at your protobuf blueprint
and **instantly writes the networking client and server code for you**
in almost any programming language you want (TypeScript, Go, Python, Java, C++).

- For you as a developer,
  this means you get **100% strict type-safety across completely different servers**.
  If your Go-language authentication server wants to talk to your Node.js Workout Tracker server,
  they can share the exact same `.proto` file,
  and your editor will autocomplete the function names and type variables perfectly!

---

## 4. It Runs on HTTP/2 (True Streaming)

Standard REST APIs run on old HTTP/1.1 protocols,
where a browser opens a request, waits for a response, and then closes it.

gRPC strictly mandates **HTTP/2**. This unlocks massive network capabilities:

- **Multiplexing:**
  A client can send hundreds of requests concurrently over a single,
  open TCP network connection without blocking each other.

- **Bi-directional Streaming:**
  The client and server can open a continuous, live binary stream.
  The client can stream a continuous feed of binary upload data,
  while the server simultaneously streams back live response
  packets over the exact same connection line.

---

## 5. The Catch: Why isn't it used for everything?

If gRPC is so incredibly fast,
light on network bandwidth, and perfectly type-safe,
why do we still write REST APIs?

As you correctly noted earlier, **gRPC is not native to web browsers.**
Standard web browsers (like Chrome or Firefox)
do not expose enough control over low-level HTTP/2 frames for JavaScript
to unpack raw binary Protobuf streams seamlessly
without complex front-end proxy workarounds (like gRPC-Web).

Because of this, the modern industry standard rule of thumb is:

- Use **REST/JSON** or **GraphQL**
  for the external public web (Browser --> Gateway Server).

- Use **gRPC**
  for the internal private web
  (Backend Server --> Backend Server microservices grid).
