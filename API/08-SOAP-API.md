# SOAP (Simple Object Access Protocol) XML Only zero freedom `Massive enterprise systems`

- SOAP
  - Simple Object Access Protocol
  - XML Only
  - zero freedom
  - Massive enterprise systems
  - It is so rigid and heavy

---

## 1. Is SOAP a concept, a rule, or what?

Unlike REST (which is just a conceptual architectural style/blueprint),
**SOAP is a strict, official protocol**.

It was created by tech giants (including Microsoft and IBM) in the late 1990s. Because it is a protocol,
it has an official, rigid specification document managed by the W3C (World Wide Web Consortium).

If you build a SOAP API,
you have **zero freedom**.
You cannot decide to use JSON,
you cannot invent your own error formats,
and you don't use clean URLs like `/api/workouts`.
You must follow a highly complex, mathematical set of specifications for every single byte of data.

---

## 2. The Golden Rule of SOAP: XML Only 📄

SOAP completely forbids JSON.
It communicates **strictly and exclusively using XML** (Extensible Markup Language).

Every single request and response must be wrapped
inside a giant structural layout known as the **SOAP Envelope**.

A standard SOAP message is split into four strict XML tags:

1. `<soap:Envelope>`: The mandatory outer wrapper that tells the computer: _"Hey, this is an official SOAP packet."_
2. `<soap:Header>`: An optional section containing routing data, extra security credentials, or corporate compliance metadata.
3. `<soap:Body>`: The mandatory section containing the actual function name you want to run and its parameters.
4. `<soap:Fault>`: A standardized error block that automatically triggers if something breaks inside the server application.

---

## 3. How a SOAP Request Actually Looks

In REST, you use HTTP verbs (`GET`, `POST`, `DELETE`) to target resource paths.

In SOAP, you don't care about HTTP verbs.
Almost everything is sent as a **POST** request to a single endpoint,
and you specify what function you want to execute right inside the XML body.
This design pattern is called an **RPC (Remote Procedure Call)**.

If a corporate banking system wants to fetch a user profile using SOAP,
the XML packet sent over the wire looks like this:

```xml
<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Header>
    <m:AuthToken xmlns:m="http://www.example.org/security">Token_XYZ_123</m:AuthToken>
  </soap:Header>
  <soap:Body>
    <m:GetUserProfileRequest xmlns:m="http://www.example.org/users">
      <m:UserId>7de83be6</m:UserId>
    </m:GetUserProfileRequest>
  </soap:Body>
</soap:Envelope>

```

---

## 4. The "WSDL" Contract (The Core of SOAP)

In the REST world,
documenting an API is optional (or you write an OpenAPI spec file later).

In SOAP, a service **cannot exist** without
a contract file called a **WSDL** (pronounced _"Wiz-dull"_),
which stands for **Web Services Description Language**.

A WSDL is a massive,
incredibly complex XML file that lists every single function the server possesses,
the exact data type of every parameter,
and the exact response schema.

- Because it is strictly typed,
  advanced enterprise compilers (like Java or .NET backend systems)
  read the WSDL file and **automatically generate the complete client networking code**
  with 100% type safety.
  If a client attempts to send an integer when the WSDL file expects a string,
  the code won't even compile.

---

## 5. If SOAP is so rigid and heavy, why does anyone use it?

You won't find startup developers using SOAP to build mobile workout trackers.
XML is incredibly text-heavy, meaning it consumes massive amounts of cellular data
and requires a lot of CPU power to parse.

However, SOAP is still the backbone of global infrastructure for three key reasons:

1. **Enterprise Security (WS-Security):**
   SOAP doesn't just rely on standard SSL/HTTPS.
   It has an enterprise standard built right into
   the header that can encrypt individual XML tags _inside_ the payload,
   ensuring that even if a middleman router opens the packet,
   they can't read sensitive bank details.

2. **ACID Transaction Integrity:**
   If an API needs to transfer $1,000,000 from Bank A to Bank B,
   a network drop mid-request could cause an architectural nightmare.
   SOAP has built-in transaction retries and compliance rules (WS-ReliableMessaging)
   that ensure operations either complete 100% perfectly or roll back entirely as if nothing happened.

3. **Transport Independence:**
   While REST _must_ run over HTTP/HTTPS,
   SOAP can travel across any transport layer—
   including HTTP, raw TCP sockets, SMTP (Email protocols),
   or enterprise message queues (JMS).
