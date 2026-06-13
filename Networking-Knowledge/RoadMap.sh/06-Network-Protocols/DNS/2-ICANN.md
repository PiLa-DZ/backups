# global internet governance

- ICANN `Internet Corporation for Assigned Names and Numbers`
  or
- IANA `Internet Assigned Numbers Authority`

## The Master Chain of Command (ASCII Art)

The authority over domain names flows top-down through three distinct layers:

```text
               +─────────────────────────────────────────+
               |          ICANN / IANA (Global)          | <-- The Supreme Court of the Internet
               |  (Maintains the Master Root Zone File)  |     (Keeps track of all 1,500+ TLDs)
               +────────────────────┬────────────────────+
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼ (Delegation)             ▼ (Delegation)             ▼ (Delegation)
+───────────────────+      +───────────────────+      +───────────────────+
|      NIC.DZ       |      |       CIRA        |      |     VERISIGN      |
|     (Algeria)     |      |     (Canada)      |      |   (Commercial)    |
+─────────┬─────────+      +─────────┬─────────+      +─────────┬─────────+
          │                          │                          │
          ▼                          ▼                          ▼
   Controls: `.dz`            Controls: `.ca`            Controls: `.com`

```

---

## Layer 1: The Supreme Court (ICANN / IANA)

At the absolute top sits a global non-profit organization based in California called
**ICANN** (Internet Corporation for Assigned Names and Numbers),
and its technical wing, **IANA** (Internet Assigned Numbers Authority).

They own the **Master Root Zone Ledger**.
This ledger is a simple, highly protected file that lists every single TLD in existence
(`.dz`, `.ca`, `.com`, `.org`)
and the exact IP address of the servers responsible for managing them.
ICANN doesn't sell individual domains;
they simply dictate who has the authority over each suffix.

---

## Layer 2: The Registry Operators (One for Each Territory)

ICANN delegates total sovereign control of specific extensions
to regional entities called **Registry Operators**.
This is where the servers break out geographically:

### 1. The Algeria Domain Server Node (`.dz`)

ICANN handed the exclusive keys for `.dz` to
**CERIST** (Center for Research on Scientific and Technical Information) in Algiers,
which operates **NIC.DZ**.
They own and run the physical Authoritative Nameservers located within Algerian territory.
When a router anywhere on earth wants to look up a `.dz` domain,
it is physically routed across the internet mesh to connect directly to CERIST’s servers in Algeria.

### 2. The Canada Domain Server Node (`.ca`)

ICANN handed the keys for `.ca` to a non-profit called
**CIRA** (Canadian Internet Registration Authority).
They run their own independent server clusters across Canada
to handle all Canadian addresses.

### 3. The Commercial Giant (`.com`)

What about `.com`? ICANN delegated `.com` and `.net` to an American corporate
tech giant called **Verisign**. Verisign runs massive, high-security data centers
loaded with hundreds of server racks to handle the immense
traffic of over 150 million `.com` domains registered worldwide.

---

## Layer 3: The Registrars (The Shops Where You Buy)

Because Verisign, CERIST, and CIRA are high-level database operators,
they don't want to deal with retail customers or build websites.
They delegate selling rights down to companies you’ve probably heard of called **Registrars**
(like Cloudflare, Namecheap, or local telecoms like Algérie Télécom).

- When you purchase a domain name at a shop like Namecheap,
  Namecheap sends an automated API request up to the Registry
  (like Verisign for `.com`),
  paying them a fee to lock your name into their database.

---

## The Root Server Infrastructure: Redundancy at Scale

You might wonder:
_If ICANN controls the absolute top ledger,
what happens if their servers crash? Does the whole world go dark?_

To prevent global collapse,
the master Root Ledger is copied and hosted identically across
**13 logical root server addresses** (named `a.root-servers.net` through `m.root-servers.net`).

These aren't just 13 physical computers.
Using a smart networking routing technique called **Anycast**,
these 13 identities are copied onto
**thousands of physical backup servers distributed in almost every country on earth.**
There are physical root backup nodes sitting right inside internet exchange points in Algeria,
France, Canada, and everywhere else. When your home router needs to look up the root directory,
it automatically routes you to the physically closest backup server sitting in your region,
keeping your latency tiny and making the global network almost impossible to destroy.
