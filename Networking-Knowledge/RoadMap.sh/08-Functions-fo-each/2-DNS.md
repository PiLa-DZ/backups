# DNS `Domain Name System`

DNS is the automated directory service
that translates human-readable words
into machine-readable IP addresses.

---

## The Distributed Tree Hunt (ASCII Art)

When you type a domain name into your browser,
your machine doesn't just ask one massive computer for the answer.
DNS is built as a hierarchical **Tree topology** split across different server layers worldwide.

```text
       [ YOUR BROWSER ]
              │
              │ 1. "Hey, what is the IP for api.nabil.com?"
              ▼
   +──────────────────────+
   |   DNS RESOLVER       | <-- Usually run by your ISP or Google (8.8.8.8)
   +───┬──────────────────+
       │       ▲
       │ 2.    │ 3. "I don't know, but ask the COM guys."
       ▼       │
   +──────────────────────+
   |  ROOT HINT SERVER    | <-- The "." top-tier directory
   +──────────────────────+
       │       ▲
       │ 4.    │ 5. "I don't know the exact machine, but ask Nabil's host."
       ▼       │
   +──────────────────────+
   |  TLD SERVER (.com)   | <-- Handles all ".com", ".net", ".org" registries
   +──────────────────────+
       │       ▲
       │ 6.    │ 7. "Got it! The live backend IP is 192.168.1.50!"
       ▼       │
   +──────────────────────+
   | AUTHORITATIVE SERVER | <-- Your personal domain host settings (e.g., Cloudflare)
   +──────────────────────+

```

---

## How It Works Exactly: The 4-Step Hierarchy Lookup

When you make a request to a domain name like `api.nabil.com`, a backend component called the **DNS Resolver** carries out a strategic, top-down search across the internet infrastructure:

### 1. The DNS Resolver (The Detective)

Your computer checks its local cache memory first. If it doesn't know the address, it forwards the question to its configured **DNS Resolver** (which was handed to your machine by the DHCP server we talked about earlier!). This resolver acts as a digital detective running errands on your behalf.

### 2. The Root Server (The Starting Line)

The resolver goes to the absolute top of the global domain hierarchy: the **Root Nameserver** (represented by a hidden trailing dot at the end of every URL). The Root server doesn't know your specific domain, but it reads the text from right to left. It looks at `.com` and says: _"I don't know who `nabil.com` is, but here is the IP address for the **TLD (Top-Level Domain)** servers who manage all the `.com` sites on earth."_

### 3. The TLD Server (The Category Folder)

The resolver shifts focus and asks the **TLD Server** for `.com` domains. The TLD server reads the next section of the word: `nabil`. It says: _"I don't keep track of individual backend APIs, but I know who owns that domain name registry. Go ask Cloudflare's server at this specific IP address."_

### 4. The Authoritative Server (The Source of Truth)

Finally, the resolver hits the **Authoritative Nameserver**. This is the exact server where you, the backend engineer, configured your domain settings. This server reads the final subdomain (`api`) and answers instantly: _"Yes! I own the master DNS zone record for that domain. The exact IP address for `api.nabil.com` is `192.168.1.50`!"_

The resolver runs back to your web browser with that number, your machine wraps its HTTP data packets inside that destination IP address, and the connection goes live!

---

## The Concept of DNS Caching & TTL

Because running this four-step global hunt for every single asset, image, and script on a website would slow the internet down to a crawl, the system heavily utilizes **Caching**.

Every time a DNS record is looked up, it comes with a timer called a **TTL (Time to Live)**, measured in seconds (e.g., `3600` seconds = 1 hour).

- Your local browser or operating system will save that IP mapping inside its local memory cache until the TTL countdown hits zero.
- During that hour, your machine will instantly connect to the cached IP address without sending any background DNS queries out to the internet, keeping your network performance lightning-fast.

---

## The Master Summary

DNS functions as the ultimate routing translation map of the web. It takes human text domains, splits them into a hierarchical tree structure, resolves them top-down through specialized server clusters, and returns raw IP addresses back to your software configurations so routing can happen over physical switches and cables.

Now that your machine knows how to fetch automated configurations using **DHCP** and map text names using **DNS**, what concept would you like to drop into next? We can look at how **NAT (Network Address Translation)** allows multiple local machines to share one global public address, or move on to another function!
