# 4. Remote Procedure Calls (Microservices)

Since you're a backend developer looking into microservices,
this category is incredibly relevant.

- **gRPC / Protocol Buffers:**
  Instead of moving a whole file or an entire HTML page,
  microservices inside a backend infrastructure
  use gRPC to trigger actions on _other_ servers.
  For example, a Billing Server sends a small, binary-encoded payload
  to an Inventory Server saying:
  _"Execute the `checkStock(itemId: 45)` function right now
  and give me the integer result."_
  It’s about executing code blocks across a network,
  not file storage.
